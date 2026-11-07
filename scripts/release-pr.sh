#!/usr/bin/env bash
#
# Prepares and opens a release pull request (RELEASING.md step 2):
#
#   scripts/release-pr.sh                    prepare, ask, then open on a yes
#   scripts/release-pr.sh prepare            branch, `pnpm run package:version`, commit; nothing leaves this machine
#   scripts/release-pr.sh open [--dry-run]   push the prepared release branch and open its PR
#
# `master` is protected, so the version bump reaches it through this pull
# request. Publishing stays manual:
# RELEASING.md steps 3-5, after the pull request merges.
#
# Needs `gh` (authenticated), `jq`, and the repo's pnpm install.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

BASE_BRANCH="master"
SUBJECT="chore(release): version packages"

die() {
  echo "✖ $*" >&2
  exit 1
}

# Names of every workspace package that publishes, as a JSON array. A package
# is private when its own package.json says so; private packages are bumped by
# `changeset version` but never released, so they stay out of the lists.
published_packages_json() {
  local manifest
  for manifest in src/components/*/package.json src/utils/*/package.json; do
    jq -r 'select(.private != true) | .name' "$manifest"
  done | jq -R . | jq -s .
}

# Writes `changeset status` for the pending changesets to $1.
write_status() {
  pnpm exec changeset status --output "$1" >/dev/null 2>&1 ||
    die "\`changeset status\` failed. Run \`pnpm exec changeset status\` to see why."
}

# Warns (stderr, never fails) about published packages whose directory changed
# since the last release commit but that have no pending release. $1 = status file.
coverage_warnings() {
  local sha short dirs dir manifest name pending
  sha="$(git log --grep '^chore(release)' -1 --format=%H || true)"
  if [ -z "$sha" ]; then
    echo "note: no previous chore(release) commit; skipping the coverage check" >&2
    return 0
  fi
  short="$(git rev-parse --short "$sha")"
  dirs="$(git diff --name-only "$sha"..HEAD -- src/components | cut -d/ -f3 | sort -u || true)"
  pending="$(jq -r '.releases[] | select(.type != "none") | .name' "$1" || true)"
  for dir in $dirs; do
    manifest="src/components/$dir/package.json"
    [ -f "$manifest" ] || continue
    jq -e '.private != true' "$manifest" >/dev/null || continue
    name="$(jq -r .name "$manifest")"
    if ! grep -qxF -- "$name" <<<"$pending"; then
      echo "warning: $name changed since $short but has no pending release" >&2
    fi
  done
  return 0
}

# Release lines for published packages, from a status file ($1).
#   $2 = "changed": packages with their own changeset
#   $2 = "dependency": packages bumped only because a dependency changed
release_lines() {
  jq -r --argjson published "$(published_packages_json)" --arg kind "$2" '
    .releases[]
    | select(.type != "none")
    | select(.name as $n | $published | index($n))
    | select(if $kind == "changed" then (.changesets | length) > 0 else (.changesets | length) == 0 end)
    | if $kind == "changed"
      then "- \(.name) \(.oldVersion) → \(.newVersion) (\(.type))"
      else "- \(.name) \(.oldVersion) → \(.newVersion)"
      end
  ' "$1"
}

# The first free branch name for today: release/YYYY-MM-DD, then -2, -3, ...
next_branch_name() {
  local base candidate n=2
  base="release/$(date +%F)"
  candidate="$base"
  while git show-ref --verify --quiet "refs/heads/$candidate" ||
    git ls-remote --exit-code --heads origin "$candidate" >/dev/null 2>&1; do
    candidate="$base-$n"
    n=$((n + 1))
  done
  echo "$candidate"
}

prepare() {
  local current status changed dependency branch message warnings
  current="$(git symbolic-ref --quiet --short HEAD || true)"
  [ "$current" = "$BASE_BRANCH" ] ||
    die "You are on '${current:-a detached HEAD}'. A release starts from an up-to-date $BASE_BRANCH: run it on master."
  [ -z "$(git status --porcelain)" ] ||
    die "The working tree has uncommitted changes. Commit or stash them first."
  git fetch --quiet origin "$BASE_BRANCH"
  [ "$(git rev-parse HEAD)" = "$(git rev-parse "origin/$BASE_BRANCH")" ] ||
    die "Local $BASE_BRANCH differs from origin/master. Run \`git pull\` (or move local commits to a branch) first."

  status="$(mktemp)"
  trap 'rm -f "$status"' RETURN
  write_status "$status"
  changed="$(release_lines "$status" changed)"
  dependency="$(release_lines "$status" dependency)"
  [ -n "$changed" ] ||
    die "There are no pending changesets for published packages, so there is nothing to release. Add one with \`pnpm changeset\` on a feature branch."

  warnings="$(coverage_warnings "$status" 2>&1)"
  [ -z "$warnings" ] || echo "$warnings" >&2

  branch="$(next_branch_name)"
  git checkout --quiet -b "$branch"
  echo "Created $branch. Running \`pnpm run package:version\`…"
  pnpm run package:version >/dev/null
  # Internal dependencies are workspace:*, so this normally changes nothing.
  # If the lockfile does change, it belongs in the release commit.
  pnpm install >/dev/null

  message="$SUBJECT"$'\n\n'"Changed:"$'\n'"$changed"
  if [ -n "$dependency" ]; then
    message+=$'\n\n'"Bumped because a dependency changed:"$'\n'"$dependency"
  fi
  git add -A
  git commit --quiet -F - <<<"$message"

  echo
  echo "Prepared $branch (local only; nothing pushed):"
  echo
  git log -1 --format=%b
  echo
  echo "Changesets in this release:"
  jq -r '.changesets[] | "- \(.id): " + ([.releases[] | "\(.name) \(.type)"] | join(", ")) + "\n    " + (.summary | gsub("\n"; "\n    "))' "$status"
  echo
  git diff --stat HEAD~1 HEAD
  if [ -n "$warnings" ]; then
    echo
    echo "$warnings"
  fi
}

# The newest version section of a CHANGELOG.md ($1), without its heading.
latest_changelog_section() {
  awk '/^## /{n++; next} n==1' "$1"
}

open_pr() {
  local dry_run=false branch title body manifest dir
  if [ "${1:-}" = "--dry-run" ]; then
    dry_run=true
  elif [ $# -gt 0 ]; then
    die "usage: release-pr.sh open [--dry-run]"
  fi

  branch="$(git symbolic-ref --quiet --short HEAD || true)"
  [[ "$branch" == release/* ]] ||
    die "'${branch:-a detached HEAD}' is not a release branch. Run \`scripts/release-pr.sh prepare\` first."
  [ "$(git log -1 --format=%s)" = "$SUBJECT" ] ||
    die "The last commit on $branch is not '$SUBJECT'. Run \`scripts/release-pr.sh prepare\` from $BASE_BRANCH."
  [ -z "$(git status --porcelain)" ] ||
    die "The working tree has uncommitted changes. Commit or discard them first."

  title="$SUBJECT (${branch#release/})"
  body="$(mktemp)"
  trap 'rm -f "$body"' RETURN
  {
    git log -1 --format=%b
    echo
    echo "## Changelog"
    for manifest in $(git diff --name-only HEAD~1 HEAD -- '*/package.json' | sort); do
      jq -e '.private != true' "$manifest" >/dev/null || continue
      dir="$(dirname "$manifest")"
      [ -f "$dir/CHANGELOG.md" ] || continue
      echo
      echo "### $(jq -r .name "$manifest") $(jq -r .version "$manifest")"
      latest_changelog_section "$dir/CHANGELOG.md"
    done
    echo
    echo "After this merges, publish from $BASE_BRANCH: RELEASING.md steps 3–5."
  } >"$body"

  if [ "$dry_run" = true ]; then
    echo "dry run: would run"
    echo "  git push -u origin $branch"
    echo "  gh pr create --base $BASE_BRANCH --head $branch --title \"$title\" --body-file <body below>"
    echo
    cat "$body"
    return 0
  fi

  gh auth status >/dev/null 2>&1 || die "\`gh\` is not authenticated. Run \`gh auth login\`."
  git push --quiet -u origin "$branch"
  gh pr create --base "$BASE_BRANCH" --head "$branch" --title "$title" --body-file "$body"
}

case "${1:-}" in
  prepare)
    shift
    [ $# -eq 0 ] || die "usage: release-pr.sh prepare"
    prepare
    ;;
  open)
    shift
    open_pr "$@"
    ;;
  "")
    prepare
    echo
    answer=""
    if [ -t 0 ]; then
      read -r -p "Push and open the PR? [y/N] " answer || true
    else
      read -r answer || true
    fi
    if [[ "$answer" =~ ^[Yy]$ ]]; then
      open_pr
    else
      branch="$(git symbolic-ref --short HEAD)"
      echo "Left $branch local. To continue: scripts/release-pr.sh open"
      echo "To discard it: git checkout $BASE_BRANCH && git branch -D $branch"
    fi
    ;;
  *)
    die "usage: release-pr.sh [prepare | open [--dry-run]]"
    ;;
esac
