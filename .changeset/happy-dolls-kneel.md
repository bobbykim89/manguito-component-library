---
'@bobbykim/manguito-theme': major
'@bobbykim/mcl-container': minor
'@bobbykim/mcl-carousel': minor
'@bobbykim/mcl-collapse': minor
'@bobbykim/mcl-dropdown': minor
'@bobbykim/mcl-footer': minor
'@bobbykim/mcl-header': minor
'@bobbykim/mcl-cards': minor
'@bobbykim/mcl-forms': minor
'@bobbykim/mcl-hero': minor
'@bobbykim/mcl-tabs': minor
---

# MCL-82: Architecture, accessibility, and DX overhaul

See the full migration guide at `docs/mcl-82/migration-guide-v1.md`.

## Breaking changes

### Prop renames (all packages)

Boolean display flags renamed from `display*` to `show*`:

| Old                | New             |
| ------------------ | --------------- |
| `displayBorder`    | `showBorder`    |
| `displayShadow`    | `showShadow`    |
| `displayHighlight` | `showHighlight` |
| `displayGrayScale` | `showGrayScale` |
| `displayGradient`  | `showGradient`  |
| `displayCta`       | `showCta`       |
| `displayFilter`    | `showFilter`    |
| `displayClear`     | `showClear`     |

### `manguito-theme` — base components

- `Modal`: `modalWidth` → `width`, `noBackdrop` → `showBackdrop` (boolean inverted), `noHeader` → `showHeader` (boolean inverted)
- `Sidebar`: `className` → `customClass`
- `NavDrawer`: `navColor` → `bgColor`, `drawerBtnBorder` → `showDrawerBorder`
- `DropdownContent`: `className` → `customClass`
- `Tooltip`: prop `title` → `content`
- `generateClass` is now a **named export** (namespace object). The old default export is preserved as `generateClassLegacy` but is deprecated — update imports: `import { generateClass } from '@bobbykim/manguito-theme'`

### `mcl-collapse`

- `MclCollapseA`: `slotBgColor` → `contentBgColor`, `accordion` prop removed — use `<AccordionGroup>` wrapper instead
- `MclCollapseB`: `btnColor` → `triggerBgColor`, `accordion` prop removed — use `<AccordionGroup>` wrapper instead

### `mcl-forms`

- `MclSelect`: `selectColor` → `optionHoverColor`, `invalidFeedback` → `noMatchText`
- `MclInputText`, `MclTextArea`, `MclSelect`: `textcolor` → `textColor` (casing fixed)
- `MclInputFile`: `isRequired` → `required`

### `mcl-header`

- `drawerBtnBorder` → `showDrawerBorder` on header components
- `navColor` → `bgColor` on NavDrawer pass-through

## New features

### `manguito-theme`

- New `AccordionGroup` component — wrap `MclCollapseA`/`MclCollapseB` instances to enable accordion behavior
- New `useCollapseState` composable — manages collapse/accordion state via provide/inject
- New `useModalScrollLock` composable — manages scroll lock for overlays
- `vToggle` and `vCollapse` directives deprecated with migration examples in README

## Improvements

- Accessibility: `role`, `aria-*`, keyboard handlers added to Modal, Sidebar, Collapse, form inputs, and Tooltip components
- Class resolution: `generateClass` rewritten with `class-variance-authority` (cva) — smaller bundle, type-safe variants
- Build: migrated from Lerna to Turborepo + Changesets for parallel builds and independent versioning
- Tests: Vitest infrastructure added; `manguito-theme` has initial test suite
