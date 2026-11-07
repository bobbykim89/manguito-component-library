#!/usr/bin/env bash
#
# Applies .github/rulesets/master.json to this repository's GitHub settings:
#
#   scripts/apply-ruleset.sh            create or update the ruleset
#   scripts/apply-ruleset.sh --dry-run  print what it would do; write nothing
#
# Safe to re-run. It finds the ruleset by name and updates it in place, so a
# second run never creates a duplicate, and a run after someone edited the
# ruleset in the UI restores the file's settings. Needs `gh` authenticated with
# admin rights on the repo, and `jq`. See RELEASING.md, section "When CI or the ruleset blocks you".

set -euo pipefail

RULESET_NAME="master-protection"
# Resolved from the script's own location, so it works from any directory.
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RULESET_FILE="$ROOT/.github/rulesets/master.json"

dry_run=false
if [ "${1:-}" = "--dry-run" ]; then
  dry_run=true
elif [ $# -gt 0 ]; then
  echo "usage: apply-ruleset.sh [--dry-run]" >&2
  exit 2
fi

# The lookup below matches by name. If the file's name drifted from it, every
# run would miss the existing ruleset and create another one.
file_name="$(jq -r .name "$RULESET_FILE")"
if [ "$file_name" != "$RULESET_NAME" ]; then
  echo "✖ $RULESET_FILE is named '$file_name'; expected '$RULESET_NAME'." >&2
  exit 1
fi

repo="$(gh repo view --json nameWithOwner --jq .nameWithOwner)"
existing_ids="$(gh api "repos/$repo/rulesets" --jq ".[] | select(.name == \"$RULESET_NAME\") | .id")"

if [ "$(printf '%s' "$existing_ids" | grep -c .)" -gt 1 ]; then
  echo "✖ $repo has more than one ruleset named '$RULESET_NAME' (ids: ${existing_ids//$'\n'/ }). Delete the extras in Settings → Rules, then re-run." >&2
  exit 1
fi

if [ -n "$existing_ids" ]; then
  method=PUT
  endpoint="repos/$repo/rulesets/$existing_ids"
else
  method=POST
  endpoint="repos/$repo/rulesets"
fi

if [ "$dry_run" = true ]; then
  echo "dry run: would $method $endpoint with $RULESET_FILE"
  exit 0
fi

result="$(gh api --method "$method" "$endpoint" --input "$RULESET_FILE")"
echo "✔ $method $endpoint"
echo "  id:  $(jq -r .id <<<"$result")"
echo "  url: $(jq -r ._links.html.href <<<"$result")"
