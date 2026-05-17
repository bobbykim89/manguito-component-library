# Change Log

## 0.9.0

### Minor Changes

- c7b5eaf: # MCL-82: Architecture, accessibility, and DX overhaul

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

### Patch Changes

- Updated dependencies [c7b5eaf]
  - @bobbykim/manguito-theme@1.0.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.8.9](https://github.com/bobbykim89/manguito-component-library/compare/@bobbykim/mcl-hero@0.8.8...@bobbykim/mcl-hero@0.8.9) (2026-04-28)

### Bug Fixes

- **manguito-theme,tsconfig:** fix tsconfig notation error, fix bugs main theme css file ([68f326d](https://github.com/bobbykim89/manguito-component-library/commit/68f326d329894e885a7614249db21e98432fd6e0))

## [0.8.8](https://github.com/bobbykim89/manguito-component-library/compare/@bobbykim/mcl-hero@0.8.7...@bobbykim/mcl-hero@0.8.8) (2026-01-28)

### Bug Fixes

- manguito theme restructure, fix missing declarations error ([0bda691](https://github.com/bobbykim89/manguito-component-library/commit/0bda691d5625b3086f9f9d21ee2caa705ca31ac9))

## [0.8.7](https://github.com/bobbykim89/manguito-component-library/compare/@bobbykim/mcl-hero@0.8.6...@bobbykim/mcl-hero@0.8.7) (2025-12-08)

**Note:** Version bump only for package @bobbykim/mcl-hero

## [0.8.6](https://github.com/bobbykim89/manguito-component-library/compare/@bobbykim/mcl-hero@0.8.5...@bobbykim/mcl-hero@0.8.6) (2025-09-07)

**Note:** Version bump only for package @bobbykim/mcl-hero

## [0.8.5](https://github.com/bobbykim89/manguito-component-library/compare/@bobbykim/mcl-hero@0.8.4...@bobbykim/mcl-hero@0.8.5) (2025-08-13)

**Note:** Version bump only for package @bobbykim/mcl-hero

## [0.8.4](https://github.com/bobbykim89/manguito-component-library/compare/@bobbykim/mcl-hero@0.8.3...@bobbykim/mcl-hero@0.8.4) (2025-08-06)

**Note:** Version bump only for package @bobbykim/mcl-hero

## [0.8.3](https://github.com/bobbykim89/manguito-component-library/compare/@bobbykim/mcl-hero@0.8.2...@bobbykim/mcl-hero@0.8.3) (2025-05-06)

**Note:** Version bump only for package @bobbykim/mcl-hero

## [0.8.2](https://github.com/bobbykim89/manguito-component-library/compare/@bobbykim/mcl-hero@0.8.1...@bobbykim/mcl-hero@0.8.2) (2025-03-21)

**Note:** Version bump only for package @bobbykim/mcl-hero

## [0.8.1](https://github.com/bobbykim89/manguito-component-library/compare/@bobbykim/mcl-hero@0.8.0...@bobbykim/mcl-hero@0.8.1) (2024-12-31)

**Note:** Version bump only for package @bobbykim/mcl-hero

# [0.8.0](https://github.com/bobbykim89/manguito-component-library/compare/@bobbykim/mcl-hero@0.7.0...@bobbykim/mcl-hero@0.8.0) (2024-12-13)

### Features

- resolve build error fix ([5f9d3c8](https://github.com/bobbykim89/manguito-component-library/commit/5f9d3c83bb82404ff09795e847e62e2a6c49df27))

# [0.7.0](https://github.com/bobbykim89/manguito-component-library/compare/@bobbykim/mcl-hero@0.6.4...@bobbykim/mcl-hero@0.7.0) (2024-09-12)

### Features

- **mcl-hero,mcl-container:** refactor mcl-hero components ([616a758](https://github.com/bobbykim89/manguito-component-library/commit/616a758d3e1c3d02b230ec6c64a94bd3a634ea9d))

## [0.6.4](https://github.com/bobbykim89/manguito-component-library/compare/@bobbykim/mcl-hero@0.6.3...@bobbykim/mcl-hero@0.6.4) (2024-08-15)

**Note:** Version bump only for package @bobbykim/mcl-hero

## [0.6.3](https://github.com/bobbykim89/manguito-component-library/compare/@bobbykim/mcl-hero@0.6.2...@bobbykim/mcl-hero@0.6.3) (2024-07-13)

**Note:** Version bump only for package @bobbykim/mcl-hero

## [0.6.2](https://github.com/bobbykim89/manguito-component-library/compare/@bobbykim/mcl-hero@0.6.1...@bobbykim/mcl-hero@0.6.2) (2024-07-12)

**Note:** Version bump only for package @bobbykim/mcl-hero

## [0.6.1](https://github.com/bobbykim89/manguito-component-library/compare/@bobbykim/mcl-hero@0.6.0...@bobbykim/mcl-hero@0.6.1) (2024-04-23)

**Note:** Version bump only for package @bobbykim/mcl-hero

# [0.6.0](https://github.com/bobbykim89/manguito-component-library/compare/@bobbykim/mcl-hero@0.5.1...@bobbykim/mcl-hero@0.6.0) (2024-04-15)

### Features

- **components/\*:** add vite-plugin-dts ([765aec7](https://github.com/bobbykim89/manguito-component-library/commit/765aec738227b68b8483f8b3e02d1bd191b90f20))
- **src/components:** finish updating rest of components ([bfbd4b1](https://github.com/bobbykim89/manguito-component-library/commit/bfbd4b15dcae4a244de1ac15836fa74870d20818))
- **src/stories:** update to storybook 8, update story pages accordingly ([f8a1502](https://github.com/bobbykim89/manguito-component-library/commit/f8a1502b83c056cef9e141c4e0c3821c992e9720))

## [0.5.1](https://github.com/bobbykim89/manguito-component-library/compare/@bobbykim/mcl-hero@0.5.0...@bobbykim/mcl-hero@0.5.1) (2024-04-01)

**Note:** Version bump only for package @bobbykim/mcl-hero

# [0.5.0](https://github.com/bobbykim89/manguito-component-library/compare/@bobbykim/mcl-hero@0.3.0...@bobbykim/mcl-hero@0.5.0) (2024-03-24)

### Features

- build and release ([a372086](https://github.com/bobbykim89/manguito-component-library/commit/a3720861fb40dd6ec1d0e3dda1f06e2479967432))
- **components/\*:** prepublish build ([c8eb95a](https://github.com/bobbykim89/manguito-component-library/commit/c8eb95a0ede6727bf183d2e9ad634ae64af1411d))
- **mcl-header:** move deprecated items to deprecated folder in root dir, update configs, init mcl-header-b component ([19aa842](https://github.com/bobbykim89/manguito-component-library/commit/19aa842faa7f1594f7be030b97d5093014efe7cb))
- tsconfig update, slots and emits update ([c30ff80](https://github.com/bobbykim89/manguito-component-library/commit/c30ff804c961d205ac097e20cd51285a15ca8966))

# [0.4.0](https://github.com/bobbykim89/manguito-component-library/compare/@bobbykim/mcl-hero@0.3.0...@bobbykim/mcl-hero@0.4.0) (2024-03-21)

### Features

- **mcl-header:** move deprecated items to deprecated folder in root dir, update configs, init mcl-header-b component ([19aa842](https://github.com/bobbykim89/manguito-component-library/commit/19aa842faa7f1594f7be030b97d5093014efe7cb))
- tsconfig update, slots and emits update ([c30ff80](https://github.com/bobbykim89/manguito-component-library/commit/c30ff804c961d205ac097e20cd51285a15ca8966))

# [0.3.0](https://github.com/bobbykim89/manguito-component-library/compare/@bobbykim/mcl-hero@0.2.0...@bobbykim/mcl-hero@0.3.0) (2024-02-27)

### Features

- **/components/**/README.md,/deprecated:\*\* update readme files, move deprecated packages to deprecated folder ([c0f8f7d](https://github.com/bobbykim89/manguito-component-library/commit/c0f8f7df158b8fcd99b4e3d191e02e3c8a9c144d))

# 0.2.0 (2024-02-27)

### Features

- **mcl-hero:** add mcl-hero package, and add story for mcl-hero-a component ([3b67787](https://github.com/bobbykim89/manguito-component-library/commit/3b6778766f1180abd2cc6f4da817e03715a29327))
- **mcl-hero:** update prop names, add stories ([0ab1682](https://github.com/bobbykim89/manguito-component-library/commit/0ab16829fd9a6f06a24e49b47772489f2f724702))
- **stories/\*:** ran package:build to build type declaration, move deprecated story files into deprecated folder ([ffc487d](https://github.com/bobbykim89/manguito-component-library/commit/ffc487dbcc093be7a3ccfeae98c5e10e8372a0e3))
