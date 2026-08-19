# Releasing

Maintainer runbook for publishing the packages in this monorepo to npm.

For contributor-facing guidance (how to write a changeset for your PR), see
[CONTRIBUTING.md](./CONTRIBUTING.md).

## Release model

- **11 packages**, each versioned independently: `@bobbykim/manguito-theme` plus
  ten `@bobbykim/mcl-*` packages under `src/components/`.
- **[Changesets](https://github.com/changesets/changesets)** decides what gets
  bumped. A package is only released if a pending changeset names it, or if it
  depends on a package being released (`updateInternalDependencies: "patch"`).
- **Manual and local.** There is no release CI. Every release is run from a
  maintainer's machine against a clean `master`.
- **Turborepo** builds the packages in topological order — `manguito-theme`
  always builds before the packages that depend on it.

## Prerequisites

| Requirement                                                | Check        |
| ---------------------------------------------------------- | ------------ |
| Node.js >= 22                                              | `node -v`    |
| pnpm 10.32.1 (pinned via `packageManager`)                 | `pnpm -v`    |
| Logged in to npm as a publisher for the `@bobbykim` scope  | `npm whoami` |
| An authenticator to hand, if your npm account enforces 2FA | —            |

## Step 0 — Pre-flight

Never release from a dirty tree or a feature branch.

```bash
git checkout master
git pull --ff-only origin master
git status --short          # must print nothing

pnpm install               # sync the lockfile
pnpm test                  # unit tests
pnpm run package:build     # all 11 packages must build
```

Then see what is queued:

```bash
pnpm changeset status
```

This lists the packages to be bumped, grouped by `patch` / `minor` / `major`.
Read it as the release manifest — if a package is missing here, it will **not**
be published, no matter what changed in it.

`No changesets present` means there is nothing to release. Stop.

**Confirm coverage.** A merged change to a package without a changeset is a
change that silently never ships. Compare what changed since the last release
against what the status output claims:

```bash
# the previous release commit
git log --oneline --grep "chore(release)" -1

# packages touched since then
git diff --name-only <that-commit>..HEAD -- src/components | cut -d/ -f3 | sort -u
```

Every package in that list should appear in `changeset status`. If one is
missing and it needs to ship, add a changeset now (`pnpm changeset`) and commit
it before continuing.

## Step 1 — Version the packages

```bash
pnpm run package:version      # = changeset version
```

This does four things, all local:

1. Reads every `.changeset/*.md` file and computes the new version per package.
2. Bumps `version` in each affected `package.json`.
3. Writes or extends `CHANGELOG.md` in each affected package, grouped by bump
   type, from your changeset descriptions.
4. Deletes the consumed changeset files.

Internal `"@bobbykim/manguito-theme": "workspace:*"` dependencies stay written
as `workspace:*` in the repo — the real version is substituted at publish time
(see Step 2).

**Review before committing.** This is the last point where a mistake is cheap:

```bash
git diff --stat
git diff -- '**/package.json'      # are the version bumps the ones you expected?
git diff -- '**/CHANGELOG.md'      # do the entries read well for consumers?
```

Then commit, following the repo's convention:

```bash
pnpm commit        # type: chore, scope: release, message: version packages
```

That produces the `chore(release): version packages` commit that Step 0 looks
for on the next release.

## Step 2 — Publish to npm

```bash
pnpm run package:publish      # = turbo run build && changeset publish
```

If your npm account enforces 2FA, run the two halves explicitly so the OTP
reaches the right command:

```bash
pnpm run package:build
pnpm changeset publish --otp=123456
```

What `changeset publish` does here:

- Publishes only packages whose current version does not already exist on npm.
  Anything already published is skipped, which makes re-running safe.
- Shells out to `pnpm publish --access public --tag latest --no-git-checks` per
  package. Because it is **pnpm** doing the packing, `workspace:*` is replaced
  with the exact version of the just-released `manguito-theme` in the published
  manifest.
- Creates one **annotated** git tag per successful publish, named
  `@bobbykim/mcl-cards@0.10.1`. It does not push them.

**Caveat — packages publish in parallel.** Changesets fires all publishes
concurrently rather than in dependency order, so a `mcl-*` package can land on
npm a moment before the `manguito-theme` version it pins. npm does not validate
that, so the release still succeeds; it only means a consumer installing during
that few-second window could fail to resolve. Verify right after (Step 4).

Read the summary it prints. Any package listed as failed did **not** publish —
go to [Recovery](#recovery).

## Step 3 — Push the release

The version commit and the tags are still only on your machine:

```bash
git push origin master --follow-tags
```

`--follow-tags` is correct here — Changesets deliberately creates annotated tags
so this works. If publishing partially failed, push anyway: tags exist only for
packages that actually published.

## Step 4 — Verify

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

## Step 5 — Docs site

The Storybook site at <https://manguito-component-library.vercel.app/> is served
from this repo through Vercel. If the Vercel project is linked to GitHub, the
push in Step 3 triggers a redeploy — confirm the site reflects the release
rather than assuming it. To reproduce the deployed build locally:

```bash
pnpm run story:build      # turbo run build, then storybook build -o dist
```

## Recovery

| Situation                                                        | What to do                                                                                                                                                    |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `publish` failed partway — some packages published, some did not | Just run `pnpm run package:publish` again. Already-published versions are skipped; only the stragglers go out.                                                |
| Versions bumped and committed, but publish never ran             | Do **not** re-run `package:version` — it would bump a second time. Run `pnpm run package:publish` on the existing commit.                                     |
| `No unpublished projects to publish`                             | Every version in the repo already exists on npm. Nothing to do; the release is complete.                                                                      |
| OTP expired mid-run                                              | Re-run `pnpm changeset publish --otp=<fresh code>`.                                                                                                           |
| Published a broken version                                       | Do not unpublish. Fix forward with a new patch release, then mark the bad one: `npm deprecate '@bobbykim/mcl-cards@0.10.1' "Broken release, use 0.10.2"`.     |
| Tarball is missing `dist/`                                       | Each package's `files` field ships `dist` only, so the build must precede the publish. Run `pnpm run package:build` and check `dist/` exists, then republish. |
| Suspect a stale Turborepo cache                                  | `pnpm turbo run build --force`.                                                                                                                               |
| A leftover tag from a failed attempt blocks a retry              | `git tag -d '@bobbykim/mcl-cards@0.10.1'` (delete locally only; never delete a pushed release tag).                                                           |
| Need a prerelease                                                | `pnpm changeset pre enter next`, then version and publish as usual — packages go out under the `next` dist-tag. Exit with `pnpm changeset pre exit`.          |

## Reference

### Scripts

| Script                     | Runs                                   | Purpose                                                    |
| -------------------------- | -------------------------------------- | ---------------------------------------------------------- |
| `pnpm run package:build`   | `turbo run build`                      | Build all packages, topologically, with cache.             |
| `pnpm run package:version` | `changeset version`                    | Consume changesets, bump versions, write changelogs.       |
| `pnpm run package:publish` | `turbo run build && changeset publish` | Build, then publish anything not yet on npm.               |
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

| Setting                      | Value    | Effect                                                                     |
| ---------------------------- | -------- | -------------------------------------------------------------------------- |
| `access`                     | `public` | Scoped packages publish publicly.                                          |
| `baseBranch`                 | `master` | What `changeset status --since` compares against.                          |
| `updateInternalDependencies` | `patch`  | A dependent gets at least a patch bump when a dependency is released.      |
| `commit`                     | `false`  | Changesets never commits for you — Step 1 and Step 3 are manual by design. |
