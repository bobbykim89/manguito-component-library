# Phase 6 — Developer Experience Decisions

This document records the decisions made before implementing the Phase 6 DX improvements. It is the authoritative reference for implementation choices in `mcl-82/phase-06-dx`.

---

## 6a — Prop Naming Standardization

All renames ship in a single coordinated pass. Doing them piecemeal would require multiple breaking releases and multiple migration guides.

### Scope

The full audit list is applied — not just the subset in the implementation plan. Any prop identified in `docs/mcl-82/audit/03-prop-naming.md` as inconsistent is renamed here.

### `placement` — no change

`Modal.vue` and `Sidebar.vue` both expose a `placement` prop with different type families (`VerticalAlignment` vs. `DirectionX`). This is left as-is. Renaming one would introduce churn with limited benefit, and the type signatures already make the distinction clear to TypeScript consumers.

### `display*` → `show*`

Standardise on the `show*` prefix across the entire library. `v-show`, Vue's own `showModal()` and the existing `showBackdrop`/`showHeader` names all use this prefix — `display*` is the outlier.

| Current prop | Renamed to | Affected components |
|---|---|---|
| `displayBorder` | `showBorder` | `MclInputText`, `MclTextArea`, `MclSelect`, `MclInputFile`, `MclDropdownA` |
| `displayShadow` | `showShadow` | `MclInputText`, `MclTextArea`, `MclSelect`, `MclInputFile`, `MclDropdownA`, `MclTabsA`, `MclCardA` |
| `displayHighlight` | `showHighlight` | `MclInputText`, `MclTextArea`, `MclSelect`, `MclCollapseA`, `MclCollapseB`, `MclCardA`, `MclCardC`, `MclCardD`, `MclCarouselA`, `MclHeaderB`, `NavLink`, `NavDropdown`, `NavCollapse` |
| `displayClear` | `showClear` | `MclInputFile` |

`displayClear` takes `showClear` (not `clearable`) for consistency with the rest of the `show*` batch. `clearable` would be appropriate in isolation but would be a second naming convention running alongside `show*`.

### `className` → `customClass`

`className` is a React convention and conflicts with how contributors familiar with Vue read the prop. `Tooltip` already uses `customClass` — this standardises the rest of the library to match.

| Component | Package |
|---|---|
| `Modal.vue` | `manguito-theme` |
| `Sidebar.vue` | `manguito-theme` |
| `Collapse.vue` | `manguito-theme` |
| `DropdownContent.vue` | `manguito-theme` |
| `NavDropdown.vue` | `mcl-header` |
| `NavCollapseVertical.vue` | `mcl-header` |

### `noBackdrop` / `noHeader` → `showBackdrop` / `showHeader`

Negated boolean props make conditional logic harder to read (`v-if="!noBackdrop"` vs. `v-if="showBackdrop"`). Renamed and defaults inverted accordingly.

| Current | Renamed | Default changes from | Affected components |
|---|---|---|---|
| `noBackdrop` | `showBackdrop` | `false` → `true` | `Modal.vue`, `Sidebar.vue` |
| `noHeader` | `showHeader` | `false` → `true` | `Modal.vue`, `Sidebar.vue` |

### `textcolor` → `textColor`

Casing typo fix — all other color props in the library use camelCase.

| Component | Package |
|---|---|
| `MclInputText.vue` | `mcl-forms` |
| `MclSelect.vue` | `mcl-forms` |
| `MclTextArea.vue` | `mcl-forms` |

### `invalidFeedback` → `noMatchText` (MclSelect only)

`invalidFeedback` in `MclInputText` refers to HTML5 constraint validation feedback. In `MclSelect` it is the string displayed when the filter returns no results — a different concept. `noMatchText` makes the intent unambiguous and eliminates the cross-component naming collision.

`MclInputText`'s `invalidFeedback` prop and slot are **not** renamed — the name is appropriate there.

### Additional renames from audit

| Current prop | Renamed to | Component | Package |
|---|---|---|---|
| `modalWidth` | `width` | `Modal.vue` | `manguito-theme` |
| `selectColor` | `highlightColor` | `MclSelect.vue` | `mcl-forms` |
| `isRequired` | `required` | `MclInputFile.vue` | `mcl-forms` |
| `slotBgColor` | `contentBgColor` | `MclCollapseA.vue` | `mcl-collapse` |
| `btnColor` | `triggerBgColor` | `MclCollapseB.vue` | `mcl-collapse` |
| `drawerBtnBorder` | `showDrawerBorder` | `MclHeaderA.vue`, `MclHeaderB.vue` | `mcl-header` |
| `navColor` | `bgColor` | `NavDrawer.vue` | `manguito-theme` |
| `title` | `content` | `Tooltip` / `tooltip.directive.ts` | `manguito-theme` |

### Migration guide requirement

A consumer-facing migration guide listing every old → new prop name must be written and merged alongside the code changes. The guide ships in `docs/` and is linked from the release notes.

---

## 6b — Replace `MclClass` with `cva`

### Goal

`MclClass` is deleted entirely in this phase. No partial migration — leaving it half-replaced creates two parallel systems to maintain. All ~750 class string lookups are migrated to `cva`-based functions before the phase closes.

### New API — `generateClass` namespace object

The current `generateClass(type, value)` function is replaced by a namespace object of the same name, exported as a **named export**:

```ts
// lib/theme/index.ts
import { cva } from 'class-variance-authority'

// Individual cva functions — also exported for tree-shaking
export const bgColorVariant = cva('', { variants: { color: { primary: 'bg-primary', ... } } })
export const hoverBgColorVariant = cva('', { ... })
// ... all other groups

// Namespace object — single convenient import for component authors
export const generateClass = {
  bgColorVariant,
  hoverBgColorVariant,
  textColorVariant,
  // ...
}
```

Internal components migrate their `computed()` calls:

```ts
// before
generateClass('BGCOLOR', props.bgColor)

// after
generateClass.bgColorVariant({ color: props.bgColor })
```

Both the namespace object and the individual variant functions are named exports of the `core` entry point.

### Deprecation of the old default export

The old `generateClass` function (current default export of `lib/index.ts`) is kept through the MCL-82 release but marked deprecated:

```ts
/** @deprecated Use `import { generateClass } from '@bobbykim/manguito-theme'` instead. Will be removed in the next major version. */
export default generateClassLegacy
```

This means:
- Consumers using `import generateClass from '@bobbykim/manguito-theme'` (default import) continue to work but see an IDE deprecation warning.
- Consumers migrating to `import { generateClass } from '@bobbykim/manguito-theme'` (named import) get the new namespace.
- The old function signature (`generateClass('BGCOLOR', color)`) disappears from the public API; the old default export is a shim kept only for backwards compatibility.

The default export is **removed** in the next major version after MCL-82.

### Migration approach — group by group, inside `lib/theme/`

Replace one class type group at a time (colors first, then spacing, typography, borders). Each group is a self-contained batch: write the `cva` function, update `generateClass` namespace, delete the corresponding static class object and `MclClass` private method. The test suite provides the regression safety net after each batch.

`ValidateMclClass` is deleted once all groups are migrated — `cva` provides TypeScript-level type safety on variant keys, making runtime regex validation redundant.

### Migration guide requirement

The consumer migration guide (from 6a) also covers this change:

```ts
// before
import generateClass from '@bobbykim/manguito-theme'
generateClass('BGCOLOR', props.bgColor)

// after
import { generateClass } from '@bobbykim/manguito-theme'
generateClass.bgColorVariant({ color: props.bgColor })
```

---

## 6c — Monorepo Tooling Migration

Done last — the codebase should be fully stable before changing CI and release pipelines.

### Build orchestration — Turborepo replaces `lerna run build`

Add `turbo.json` with `build`, `test`, and `lint` task definitions. Turborepo reads `package.json` `dependencies` to derive topological order, ensuring `manguito-theme` always builds before its dependents. This replaces `lerna run build` and the associated `--sort` risk.

**Remote cache:** Vercel free tier. The `turbo.json` will include the remote cache configuration pointing to Vercel.

### Versioning and publishing — Changesets replaces Lerna + `standard-version`

The current setup has `lerna version` and `standard-version` running as separate scripts with no integration between them. This is replaced with a single tool:

- Initialize with `pnpm changeset init`.
- Contributors run `pnpm changeset` to describe their change before merging a PR.
- `pnpm changeset version` bumps package versions and generates per-package `CHANGELOG.md` files.
- `pnpm changeset publish` publishes from the bumped versions.

The new contributor workflow must be documented (in `CONTRIBUTING.md` or the project README) before this merges, since it changes how every future PR is handled.

### Removals

| What | Why |
|---|---|
| `lerna.json` | Replaced by Turborepo (builds) + Changesets (versioning) |
| `lerna` devDependency | No longer needed |
| `standard-version` devDependency | Replaced by Changesets |
| `release` script in root `package.json` | Replaced by `changeset version` + `changeset publish` |

Root `package.json` scripts are updated to use `turbo run build test` and the changesets CLI.
