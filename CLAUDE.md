# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

```bash
pnpm run story:dev          # Storybook dev server on port 6006
pnpm run story:build        # Build all packages via Turborepo, then build Storybook to dist/
```

### Package management

```bash
pnpm run package:build      # Build all packages via Turborepo (parallel, topology-aware)
pnpm run package:create     # Interactive CLI to scaffold a new component package
pnpm run package:install    # pnpm install across all workspaces
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
pnpm changeset              # Describe a change and create a changeset file
pnpm run package:version    # Consume changesets and bump versions (changeset version)
pnpm run package:publish    # Build + publish all changed packages (turbo build + changeset publish)
```

Versioning is managed by [Changesets](https://github.com/changesets/changesets) in independent mode. Each releasable change needs a `pnpm changeset` entry before `package:version` will bump it. See `CONTRIBUTING.md` for the full workflow.

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

Each package under `src/components/` is independently versioned and published to npm as `@bobbykim/<package-name>`. `manguito-theme` must build before all others (Turborepo enforces this via `"dependsOn": ["^build"]`).

### `manguito-theme` — the core package

This is the only package with multiple Vite entry points:

| Entry                      | Export path  | What it contains                                                                          |
| -------------------------- | ------------ | ----------------------------------------------------------------------------------------- |
| `lib/index.ts`             | `core`       | Base Vue components + `generateClass` named export + `generateClassLegacy` default export |
| `lib/directives/index.ts`  | `directives` | `vToggle` (deprecated), `vCollapse` (deprecated), `vClickOutside`, `vTooltip`             |
| `lib/composables/index.ts` | `composable` | `useModalScrollLock`, `useCollapseState`, `observeVisible`                                |
| `lib/util/index.ts`        | `util`       | `clientSideRender`, `getGlassmorphismClass`                                               |

The CSS theme is shipped separately as `mcl-theme-v4.css` (Tailwind v4 custom utilities and tokens). It is not injected into the JS bundle.

### Class resolution system (`generateClass`)

Every component uses `generateClass` from `manguito-theme/lib/theme/` to map semantic prop values (color names, spacing tokens, heading sizes) to Tailwind class strings.

`generateClass` is a **named export** and a namespace object backed by `class-variance-authority` (cva) variant functions defined in `lib/theme/index.ts`. Use it as:

```ts
import { generateClass } from '@bobbykim/manguito-theme'

const bgClass = generateClass.bgColor({ color: props.bgColor })
const textClass = generateClass.textColor({ color: props.textColor })
```

A `generateClassLegacy` function is exported as the **default export** for backward compatibility with the old `generateClass(type, value)` call signature — it is deprecated and should not be used in new code.

Shared types (`ColorPalette`, `SpacingLevel`, `HeadingSize`, etc.) are still re-exported from `lib/theme/static/theme.types.ts` and available via `@bobbykim/manguito-theme`.

### Directive architecture

`vClickOutside` and `vTooltip` are the only directives actively recommended for use. They follow standard Vue 3 directive patterns.

`vToggle` and `vCollapse` are **deprecated**. They manipulate DOM attributes directly, bypassing Vue's reactivity system. Do not use them in new components. The preferred patterns are:

- **Collapse / accordion state:** Use the `useCollapseState` composable and wrap groups in `AccordionGroup`. See `mcl-collapse` and `mcl-header` for examples.
- **Modal / sidebar open state:** Use a template ref and call the component's exposed `openModal()` / `closeModal()` methods directly.

`observeVisibleAttr` (composable) is still used internally by `Modal`, `Sidebar`, and `Collapse` base components — do not remove it, but do not add new usages.

### Prop naming conventions

These conventions apply across all packages:

- **Boolean display flags** use `show*` prefix: `showBorder`, `showShadow`, `showHighlight`.
- **Color props** are camelCase: `bgColor`, `textColor`, `borderColor`, `titleColor`, `optionHoverColor`.
- **Custom CSS class injection** uses `className` on `manguito-theme` base components.
- **Slot-based overrides** are always preferred over imperative configuration.

### Consumer import pattern

```ts
import { ComponentName } from '@bobbykim/<package-name>'
// Consumers must also import the CSS separately:
import '@bobbykim/manguito-theme/mcl-theme-v4.css'
```

### Storybook

Stories live in `src/stories/` (not co-located with packages). The `.storybook/` config uses `@storybook/vue3-vite`. Stories import directly from package source via workspace resolution — no pre-build required for story development.
