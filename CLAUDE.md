# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

```bash
pnpm run story:dev          # Storybook dev server on port 6006
pnpm run story:build        # Build all packages, then build Storybook to dist/
```

### Package management

```bash
pnpm run package:build      # Build all packages via Lerna (serial)
pnpm run package:create     # Interactive CLI to scaffold a new component package
pnpm run package:install    # pnpm install across all workspaces
pnpm run package:clear      # Remove all per-package node_modules (lerna clean)
```

### Testing

```bash
pnpm test                   # Run all tests once (root vitest config, currently covers manguito-theme only)
pnpm test --watch           # Watch mode

# Per-package (from inside src/components/<package>/)
pnpm test                   # vitest run
pnpm run test:watch         # vitest watch
```

Tests live alongside source as `lib/**/*.test.ts`. The root `vitest.config.ts` uses Vitest's `projects` API — add new packages there when they gain tests.

### Releases

```bash
pnpm commit                 # Commitizen prompt (use this instead of git commit)
pnpm run package:version    # Bump versions per conventional commits (lerna)
pnpm run package:publish    # Build + publish from git tags
```

## Architecture

### Monorepo layout

```
src/components/             # 10 publishable packages (pnpm workspace)
  manguito-theme/           # Base package — all others depend on this
  mcl-collapse/
  mcl-forms/
  mcl-header/
  mcl-cards/
  mcl-carousel/
  mcl-container/
  mcl-dropdown/
  mcl-footer/
  mcl-hero/
  mcl-tabs/
src/stories/                # Storybook stories (not part of any package)
scripts/                    # Package scaffolding CLI (index.mjs)
```

Each package under `src/components/` is independently versioned and published to npm as `@bobbykim/<package-name>`. `manguito-theme` must build before all others.

### `manguito-theme` — the core package

This is the only package with multiple Vite entry points:

| Entry | Export path | What it contains |
|---|---|---|
| `lib/index.ts` | `core` | Base Vue components + `generateClass` default export |
| `lib/directives/index.ts` | `directives` | `vToggle`, `vCollapse`, `vClickOutside`, `vTooltip` |
| `lib/composables/index.ts` | `composable` | `useModalScrollLock`, `useCollapseState`, `observeVisible` |
| `lib/util/index.ts` | `util` | `clientSideRender`, `getGlassmorphismClass` |

The CSS theme is shipped separately as `mcl-theme-v4.css` (Tailwind v4 custom utilities and tokens). It is not injected into the JS bundle.

### Class resolution system (`generateClass`)

Every component uses `generateClass(type, value)` from `manguito-theme/lib/theme/` to map semantic prop values (color names, spacing tokens, heading sizes) to Tailwind class strings. The function instantiates `MclClass`, which holds ~750 hardcoded class string lookups across `static/colors.ts`, `static/borders.ts`, `static/spacing.ts`, `static/body-text.ts`, and `static/heading-size.ts`. `ValidateMclClass` in `theme/validator/` performs runtime prop validation. This system is slated for replacement with `class-variance-authority` (cva) in the ongoing MCL-82 work.

### Directive architecture

`vToggle` and `vCollapse` manipulate DOM attributes directly, bypassing Vue's reactivity system. They set/read `visible` and `accordion` attributes on elements to coordinate open/close state across components. This is a known architectural issue being addressed in MCL-82.

### Consumer import pattern

```ts
import { ComponentName } from '@bobbykim/<package-name>'
// Consumers must also import the CSS separately:
import '@bobbykim/manguito-theme/mcl-theme-v4.css'
```

### Storybook

Stories live in `src/stories/` (not co-located with packages). The `.storybook/` config uses `@storybook/vue3-vite`. Stories import directly from package source via workspace resolution — no pre-build required for story development.

### Active work: MCL-82

The branch `feature/mcl-82` is an integration branch for a multi-phase refactor. Phase sub-branches follow the pattern `mcl-82/phase-0N-<description>` and merge back into `feature/mcl-82`. Decision documents and audit findings live in `docs/mcl-82/`.
