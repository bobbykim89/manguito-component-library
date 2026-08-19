# Contributing to Manguito Component Library

## Prerequisites

- Node.js >= 22
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

## Releasing

Releases are handled by the maintainer, from a clean `master`, in two commands:

```bash
pnpm run package:version    # consume changesets, bump versions, write CHANGELOGs
pnpm run package:publish    # build all packages, publish anything new to npm
```

Those two commands are the happy path only. See **[RELEASING.md](./RELEASING.md)**
for the full runbook: pre-flight checks, verifying that every merged change has a
changeset, npm 2FA, pushing tags, post-publish verification, and how to recover
from a publish that fails partway.

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

The interactive CLI scaffolds a new component package under `src/components/`. Ensure the new package lists `@bobbykim/manguito-theme` as a dependency — Turborepo uses this to determine build order.

## Workspace layout

```
src/components/         # publishable packages
  manguito-theme/       # base package — must build first
  mcl-*/                # component packages
src/stories/            # Storybook stories (not published)
scripts/                # package scaffolding CLI
.changeset/             # pending changesets (committed with PRs)
turbo.json              # Turborepo task definitions
```
