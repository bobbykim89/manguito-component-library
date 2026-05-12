# Monorepo Tooling Review

## Overview

The repository uses **Lerna 8** with **pnpm workspaces** for managing 10 publishable packages under `src/components/*`. Versioning uses `independent` mode, and publishing is driven by conventional commits. This document reviews the current setup and evaluates alternatives.

---

## Current Setup

### Workspace definition

```yaml
# pnpm-workspace.yaml
packages:
  - 'src/components/*'
```

Ten packages live under this path:
- `@bobbykim/manguito-theme` (the shared base)
- `@bobbykim/mcl-cards`, `mcl-carousel`, `mcl-collapse`, `mcl-container`, `mcl-dropdown`, `mcl-footer`, `mcl-forms`, `mcl-header`, `mcl-hero`, `mcl-tabs`

### Lerna configuration

```json
// lerna.json
{
  "$schema": "node_modules/lerna/schemas/lerna-schema.json",
  "version": "independent",
  "npmClient": "pnpm",
  "command": {
    "publish": {
      "conventionalCommits": true,
      "message": "chore(release): publish"
    },
    "version": {
      "conventionalCommits": true,
      "message": "chore(release): publish"
    }
  }
}
```

### Root `package.json` scripts

| Script | What it does |
|---|---|
| `package:version` | `lerna version --no-private` — bumps versions per conventional commits |
| `package:publish` | `lerna run build && lerna publish from-git --no-private` |
| `package:publish:from-package` | `lerna run build && lerna publish from-package --no-private` |
| `package:build` | `lerna run build` — builds all packages serially |
| `package:install` | `lerna exec -- pnpm install` |
| `package:clear` | `lerna clean` |

### Dependency pinning strategy

The root `package.json` uses pnpm `overrides` to ensure all packages share the same version of common dev dependencies (vite, tailwindcss, typescript, vue, etc.):

```json
"pnpm": {
  "overrides": {
    "@vitejs/plugin-vue": "$@vitejs/plugin-vue",
    "tailwindcss": "$tailwindcss",
    "vite": "$vite",
    ...
  }
}
```

This is a reasonable approach that avoids version drift across packages.

---

## Current Problems

### 1. No build caching / task orchestration

`lerna run build` runs the build script in every package sequentially. There is no caching: a rebuild after touching one package will rebuild all packages. For 10 packages this is manageable today but will become slow as the library grows. Lerna 8 supports Nx's task caching via `@lerna/nx-tsc` but it is not configured here.

### 2. Two `standard-version` and `lerna version` coexist

The root `package.json` has both:
```json
"release": "standard-version",
"package:version": "pnpm lerna version --no-private",
```

`standard-version` is a separate tool that generates changelogs from conventional commits, but it is not integrated with Lerna's versioning. Running `npm run release` would update the root `package.json` version while the packages are in `independent` mode — these two flows conflict. It is unclear which one is actually used for releases (needs clarification).

### 3. Independent versioning with no changelog automation per package

While `conventionalCommits: true` is set in `lerna.json`, each package's `CHANGELOG.md` must be maintained separately. The current per-package `package.json` files do not reference a shared changelog tool, and there is no evidence of per-package changelogs being generated automatically. Only `manguito-theme` lists `CHANGELOG.md` in its `files` array.

### 4. Each package has its own `node_modules/.bin` and vite/typescript installs

Inspecting the directory tree, each package under `src/components/` has its own `node_modules` folder (because Lerna's `lerna exec -- pnpm install` runs install per-package rather than relying solely on pnpm workspace hoisting). This leads to duplicated tool installations and increased disk usage.

### 5. `lerna clean` as a destructive workflow step

`package:clear` runs `lerna clean`, which deletes `node_modules` in all packages. This is a legitimate reset tool but is listed alongside normal build commands, which may cause confusion.

### 6. No CI task graph

There is no explicit pipeline configuration that understands the dependency graph (`manguito-theme` must build before all other packages). Lerna can detect this from `package.json` `dependencies`, but the current `lerna run build` does not pass `--sort` or configure topological ordering. Builds could fail if a dependent package builds before its dependency.

---

## Evaluation of Alternatives

### Turborepo

Turborepo is the most direct replacement for the Lerna build orchestration layer while keeping pnpm workspaces.

**Strengths:**
- Built-in remote caching (Vercel Remote Cache or self-hosted).
- Topological task execution based on `package.json` dependencies — `manguito-theme` will always build first.
- Simple `turbo.json` configuration.
- Works seamlessly with pnpm workspaces (no `lerna exec` needed).

**Weaknesses:**
- No built-in versioning or publishing support. Would need `changesets` alongside it for releases.
- Adds a configuration file (`turbo.json`) that must be kept in sync.

**Verdict:** A strong fit for this repo. The build orchestration problem is solved cleanly; publishing would use changesets.

### Nx

Nx is a more opinionated monorepo framework with a plugin ecosystem.

**Strengths:**
- Distributed task execution, affected-project detection, powerful caching.
- Generators for adding new packages.

**Weaknesses:**
- Heavy: requires `nx.json`, project-level `project.json` files, and plugin configuration. High adoption cost for a library of 10 packages.
- Less aligned with simple library publishing workflows.

**Verdict:** Likely over-engineered for this codebase's current size and nature.

### Changesets

Changesets is a publishing and versioning tool designed specifically for monorepos, often paired with Turborepo or raw pnpm workspaces.

**Strengths:**
- Human-readable changeset files that accumulate between releases.
- Per-package changelogs generated automatically.
- Supports independent versioning.
- GitHub Action available for automated releases.

**Weaknesses:**
- Requires a new workflow: contributors must run `pnpm changeset` to describe their change before merging a PR.
- The existing conventional-commits-based automation in Lerna would be replaced by a manual changeset authoring process.

**Verdict:** Addresses the changelog and versioning gaps directly. Can be used alongside Turborepo (Turborepo for builds, changesets for versioning).

---

## Recommended Approach

1. **Keep pnpm workspaces** as the package manager layer — it is working well.
2. **Replace `lerna run build` with Turborepo** for task orchestration and caching. This eliminates the serial build problem and adds remote cache support.
3. **Replace Lerna versioning + `standard-version` with changesets** to resolve the dual-versioning confusion and get per-package changelogs.
4. **Remove `lerna.json`** and the `lerna` devDependency once migrated. Keep `package:publish` scripts using `pnpm publish -r` or the changesets GitHub Action.

This gives a clean separation of concerns: pnpm workspaces for dependency management, Turborepo for builds, changesets for versioning and publishing.
