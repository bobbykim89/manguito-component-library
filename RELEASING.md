# Releasing

Maintainer runbook for publishing the packages in this monorepo to npm.

For contributor-facing guidance (how to write a changeset for your PR), see
[CONTRIBUTING.md](./CONTRIBUTING.md).

## Release model

- **11 published packages**, each versioned independently:
  `@bobbykim/manguito-theme` plus ten `@bobbykim/mcl-*` packages under
  `src/components/`. `@mcl/test-utils` (`src/utils/test`) is private and never
  published.
- **[Changesets](https://github.com/changesets/changesets)** decides what gets
  bumped. A package is only released if a pending changeset names it, or if it
  depends on a package being released (`updateInternalDependencies: "patch"`).
- **`master` is protected.** It accepts changes only through a pull request
  whose `ci` check passed. Nobody can push to it directly, the owner included
  (`.github/rulesets/master.json`).
- **A release has two halves.**
  1. The version bump changes files, so it goes through a **release pull
     request** on a `release/<date>` branch (`/release-pr` or
     `scripts/release-pr.sh`). You merge it like any other.
  2. Publishing changes no files, so it runs **manually on `master`** after the
     merge. `changeset publish` uploads to npm and creates one git tag per
     package; you push only the tags, which the ruleset does not cover.
- **Turborepo** builds the packages in topological order. `manguito-theme`
  always builds before the packages that depend on it.

## Prerequisites

| Requirement                                                   | Check            |
| ------------------------------------------------------------- | ---------------- |
| Node.js >= 24                                                 | `node -v`        |
| pnpm 10.32.1 (pinned via `packageManager`)                    | `pnpm -v`        |
| GitHub CLI (`gh`), authenticated, to open the PR and check CI | `gh auth status` |
| `jq`, used by the release script                              | `jq --version`   |
| Logged in to npm as a publisher for the `@bobbykim` scope     | `npm whoami`     |
| An authenticator to hand, if your npm account enforces 2FA    | —                |

## 1. Add a changeset

On your feature branch, for any change that should ship:

```bash
pnpm changeset
```

Pick the affected packages and a bump level (see the table in
[CONTRIBUTING.md](./CONTRIBUTING.md#describing-your-change-with-a-changeset);
packages below 1.0 take breaking changes as `minor`). Commit the changeset file
with your change, open a pull request, and merge it once `ci` passes.
Changesets accumulate on `master` until you release.

Changes to files that do not ship inside a package (root `README.md`, `docs/**`,
`.github/**`) need no changeset.

## 2. Open the release pull request

When the changesets you want to release are on `master`:

```bash
git checkout master
git pull
scripts/release-pr.sh        # or run the /release-pr skill in Claude Code
```

The script checks that you are on `master`, the tree is clean, `master` equals
`origin/master`, and at least one published package has a pending changeset. It
refuses otherwise, with a message naming the fix. Then it:

1. **Warns** about packages under `src/components/` that changed since the last
   `chore(release): version packages` commit but have no pending release. A change that does not
   ship may legitimately need no changeset; one that does needs one before you
   continue.
2. **Creates `release/<date>`** (it adds `-2`, `-3` if that name exists locally
   or on GitHub).
3. **Runs `pnpm run package:version`**, then `pnpm install`. The lockfile
   normally stays unchanged; if it changes, it goes into the commit.
4. **Commits** `chore(release): version packages`, with a body listing each
   package with its own changeset (_Changed_) and each one bumped only because a
   dependency changed. Private packages are left out.
5. **Prints** the commit body, each consumed changeset, and the diff stat, then
   asks `Push and open the PR? [y/N]`. On a yes it pushes the branch and opens
   the PR, whose body carries the list and each package's new changelog
   section. On anything else it leaves the branch local and prints how to
   continue or discard it.

The halves also run separately: `scripts/release-pr.sh prepare` stops after the
commit, and `scripts/release-pr.sh open` pushes and opens the PR (add
`--dry-run` to print the push command and PR body without running anything).

**The `/release-pr` skill** runs the same script through Claude Code. Before
asking for your yes it reads each changeset's summary against its bump level
and flags mismatches. It never publishes.

### Doing it by hand

```bash
git checkout master && git pull
git checkout -b release/<date>
pnpm run package:version
pnpm install
git add -A
git commit -m "chore(release): version packages"
git push -u origin release/<date>
gh pr create --base master --title "chore(release): version packages (<date>)" --body "Version Packages"
```

Keep the `chore(release): version packages` subject: the coverage check finds the previous release
by it. CI installs with `--frozen-lockfile`, so commit any lockfile change.

## 3. Merge it

Merge once `ci` passes, in the GitHub UI or with:

```bash
gh pr merge release/<date> --merge
```

If `ci` fails, fix it on the release branch and push again, as with any pull
request. Never edit a consumed changeset on the release branch; to fix a bump
level, discard the branch, correct the changeset on a feature branch, merge
that, and start again from step 2.

## 4. Publish from master

```bash
git checkout master
git pull
gh run list --branch master --workflow CI --commit "$(git rev-parse HEAD)" --limit 1
```

The run for the merge commit must show `success` (wait with `gh run watch <id>`
if it is still running). Then install, build and publish:

```bash
pnpm install --frozen-lockfile
pnpm run package:build
pnpm changeset publish              # add --otp=123456 if your npm account enforces 2FA
```

`pnpm run package:build` is required first: each package ships only its `dist`.
Do not use `pnpm run package:publish` if you need to pass an OTP; it runs the
build and the publish in one command.

What `changeset publish` does:

- Publishes only packages whose current version does not already exist on npm,
  so re-running is safe.
- Shells out to `pnpm publish --access public --tag latest --no-git-checks` per
  package. Because pnpm does the packing, `workspace:*` is replaced with the
  exact version of the just-released `manguito-theme`.
- Creates one **annotated** git tag per published package, named like
  `@bobbykim/mcl-cards@0.10.1`. It does not push them, and it makes no commit.

**Caveat: packages publish in parallel.** A `mcl-*` package can land on npm a
moment before the `manguito-theme` version it pins. The release still succeeds;
a consumer installing in that few-second window could fail to resolve. Verify
right after.

Any package listed as failed did **not** publish; see [Recovery](#recovery).

## 5. Push tags

```bash
git push --follow-tags
```

Your local `master` matches `origin/master` after step 4's pull, so this pushes
only the new tags. The ruleset protects `refs/heads/master` only. If publishing
partially failed, push anyway: tags exist only for packages that published.

## Verify

```bash
# versions live on npm
for p in manguito-theme mcl-cards mcl-carousel mcl-collapse mcl-container \
         mcl-dropdown mcl-footer mcl-forms mcl-header mcl-hero mcl-tabs; do
  printf '%-24s ' "$p"; npm view "@bobbykim/$p" version
done

# workspace:* was substituted, not published literally
npm view @bobbykim/mcl-cards dependencies
```

That second check should show a real range such as
`@bobbykim/manguito-theme: 1.0.1`. If it shows `workspace:*`, the package was
packed by something other than pnpm — treat the release as broken and publish a
corrected patch.

Optional install smoke test, outside the repo:

```bash
cd "$(mktemp -d)" && npm init -y >/dev/null
npm i @bobbykim/mcl-cards
node -e "console.log(Object.keys(require('@bobbykim/mcl-cards')))"
```

## Docs site

The Storybook site at <https://manguito-component-library.bobbykim.dev/> is served
from this repo through Vercel. If the Vercel project is linked to GitHub, the
merge to `master` triggers a redeploy — confirm the site reflects the release
rather than assuming it. To reproduce the deployed build locally:

```bash
pnpm run story:build      # turbo run build, then storybook build -o dist
```

## Recovery

| Situation                                                                                            | What to do                                                                                                                                                                                                        |
| ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `publish` failed partway, some packages published, some did not                                      | Run `pnpm changeset publish` again. Already-published versions are skipped; only the stragglers go out. Then push tags.                                                                                           |
| The release PR merged, but publish never ran                                                         | Do **not** re-run `package:version`; the bump is already on `master`. Start at step 4.                                                                                                                            |
| `No unpublished projects to publish`                                                                 | Every version in the repo already exists on npm. Nothing to do; the release is complete.                                                                                                                          |
| OTP expired mid-run                                                                                  | Re-run `pnpm changeset publish --otp=<fresh code>`.                                                                                                                                                               |
| Published a broken version                                                                           | Do not unpublish. Fix forward with a new patch release, then mark the bad one: `npm deprecate '@bobbykim/mcl-cards@0.10.1' "Broken release, use 0.10.2"`.                                                         |
| Tarball is missing `dist/`                                                                           | Each package's `files` field ships `dist` only, so the build must precede the publish. Run `pnpm run package:build`, check `dist/` exists, then republish.                                                        |
| Suspect a stale Turborepo cache                                                                      | `pnpm turbo run build --force`.                                                                                                                                                                                   |
| A leftover tag from a failed attempt blocks a retry                                                  | `git tag -d '@bobbykim/mcl-cards@0.10.1'` (delete locally only; never delete a pushed release tag).                                                                                                               |
| Need a prerelease                                                                                    | `pnpm changeset pre enter next`, then version and publish as usual; packages go out under the `next` dist-tag. Exit with `pnpm changeset pre exit`.                                                               |
| Push to `master` rejected (`GH013: Repository rule violations`)                                      | You committed on `master` locally. Move the commit to a branch without touching the working tree: `git checkout -b <branch> && git branch -f master origin/master`, then push the branch and open a pull request. |
| `prepare` failed after creating the release branch (e.g. `package:version` or `pnpm install` failed) | `git checkout -- . && git clean -fd && git checkout master && git branch -D release/<date>`, then fix the cause and re-run.                                                                                       |
| CI failed at Install with `ERR_PNPM_OUTDATED_LOCKFILE`                                               | The lockfile no longer matches a `package.json`. On the branch run `pnpm install`, commit `pnpm-lock.yaml`, and push.                                                                                             |

## When CI or the ruleset blocks you

- **A pull request waits forever for `ci`.** The check never reported. Usual
  causes: the head commit's message contains `[skip ci]`; the job in
  `.github/workflows/ci.yml` was renamed; the workflow gained a `paths` filter.
  Push a new commit, or fix the workflow, so `ci` runs. The required check name
  is coupled to `.github/rulesets/master.json`.
- **CI is broken by something outside the repo** (a GitHub Actions outage) and
  you must merge anyway. As a repo admin, open **Settings, Rules, Rulesets,
  master-protection** and set **Enforcement status** to **Disabled**. Merge,
  then restore the protection from the committed file:

  ```bash
  scripts/apply-ruleset.sh            # --dry-run shows what it will do
  ```

  The script finds the ruleset by name and puts every setting back. Re-running
  it is also how you undo any other hand edit to the ruleset.

## Reference

### Scripts

| Script                     | Runs                                   | Purpose                                                    |
| -------------------------- | -------------------------------------- | ---------------------------------------------------------- |
| `pnpm run package:build`   | `turbo run build`                      | Build all packages, topologically, with cache.             |
| `pnpm run package:version` | `changeset version`                    | Consume changesets, bump versions, write changelogs.       |
| `pnpm run package:publish` | `turbo run build && changeset publish` | Build, then publish anything not yet on npm.               |
| `scripts/release-pr.sh`    | —                                      | Branch, version, commit, and open the release PR.          |
| `scripts/apply-ruleset.sh` | —                                      | Create or restore the `master` ruleset from its file.      |
| `pnpm changeset status`    | —                                      | Show what a release would bump, without changing anything. |

### What ships

`manguito-theme` publishes `dist`, `README.md`, and `CHANGELOG.md`. The ten
`mcl-*` packages publish `dist` only — so their npm pages render no readme.
Worth fixing by adding `README.md` to each `files` array, but it is not a
release blocker.

The theme's CSS ships as a separate entry, copied into `dist` by its build
script, and consumers import it explicitly:

```ts
import '@bobbykim/manguito-theme/mcl-theme-v4.css'
```

### Configuration

`.changeset/config.json`:

| Setting                      | Value    | Effect                                                                              |
| ---------------------------- | -------- | ----------------------------------------------------------------------------------- |
| `access`                     | `public` | Scoped packages publish publicly.                                                   |
| `baseBranch`                 | `master` | What `changeset status --since` compares against.                                   |
| `updateInternalDependencies` | `patch`  | A dependent gets at least a patch bump when a dependency is released.               |
| `commit`                     | `false`  | Changesets never commits for you; `scripts/release-pr.sh` makes the release commit. |
