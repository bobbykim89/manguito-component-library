# Contributing to Manguito Component Library

## Prerequisites

- Node.js >= 24
- pnpm >= 10

## Development

```bash
# Install all workspace dependencies
pnpm run package:install

# Start Storybook (no pre-build required — stories import from source)
pnpm run story:dev

# Build all packages (Turborepo resolves topological order automatically)
pnpm run package:build

# Run tests
pnpm test
```

## Making changes

`master` is protected: every change goes through a pull request, and the `ci` check must pass before it merges. Before pushing, run the main checks CI runs (CI also runs the build, `test:dist` and the Storybook build):

```bash
pnpm lint
pnpm format:check     # `pnpm format` fixes it
pnpm typecheck
pnpm test
```

### Commits

This project uses [Commitizen](https://commitizen-tools.github.io/commitizen/) for conventional commits:

```bash
pnpm commit
```

Do not use `git commit` directly — the Commitizen prompt ensures commit messages follow the conventional commit format required by Changesets to generate changelogs.

### Describing your change with a changeset

**Every PR that touches a publishable package must include a changeset.** A changeset records which packages changed and whether the bump is a `patch`, `minor`, or `major`.

```bash
pnpm changeset
```

The CLI will ask you:

1. Which packages were affected (use space to select, enter to confirm)
2. Whether the change is `major`, `minor`, or `patch` for each affected package
3. A one-line summary of the change

This creates a new file under `.changeset/`. Commit it alongside your code changes.

**When to use each bump type:**

| Type    | When                                                                |
| ------- | ------------------------------------------------------------------- |
| `patch` | Bug fixes, internal refactors with no API change                    |
| `minor` | New features, new props/slots with backwards-compatible defaults    |
| `major` | Breaking changes — removed props, renamed exports, changed defaults |

**Packages below 1.0** (the ten `mcl-*` packages) take breaking changes as `minor`, not `major`. Start the changeset summary by saying it is breaking and list what consumers must change. Only `@bobbykim/manguito-theme` (1.0 and above) uses `major` for breaking changes.

## Releasing

Releases are handled by the maintainer. Because `master` is protected, the version bump goes through a release pull request: run `/release-pr` in Claude Code, or `scripts/release-pr.sh`. After it merges, the maintainer publishes from `master` by hand.

See **[RELEASING.md](./RELEASING.md)** for the full runbook: the release pull request, publishing with npm 2FA, pushing tags, post-publish verification, recovery, and what to do when CI or the ruleset blocks you.

## Build caching (Turborepo)

Builds are orchestrated by [Turborepo](https://turbo.build). It caches build outputs in `node_modules/.cache/turbo` locally, and optionally in a Vercel remote cache for CI speedup.

To enable the Vercel remote cache:

```bash
# Authenticate once (opens browser)
pnpm turbo login

# Link this repo to your Vercel account/team
pnpm turbo link
```

Once linked, `turbo run build` will read and write the remote cache automatically.

## Adding a new package

```bash
pnpm run package:create
```

The interactive CLI scaffolds a new component package under `src/components/`. Ensure the new package lists `@bobbykim/manguito-theme` as a dependency — Turborepo uses this to determine build order. Then run `pnpm format`: the scaffolding templates emit unformatted JSON, and CI's `format:check` fails on it.

## Workspace layout

```
src/components/         # publishable packages
  manguito-theme/       # base package — must build first
  mcl-*/                # component packages
src/utils/test/         # @mcl/test-utils, private, never published
src/stories/            # Storybook stories (not published)
scripts/                # package scaffolding CLI
.changeset/             # pending changesets (committed with PRs)
turbo.json              # Turborepo task definitions
```
