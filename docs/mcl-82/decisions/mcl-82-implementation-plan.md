# MCL-82 Implementation Plan

This document outlines the execution order, branching strategy, and specific work items for implementing the findings from the MCL-82 architecture and quality review. All changes will be released together as a single version bump.

---

## Branching Strategy

The integration branch for all work is `feature/mcl-82`. All phases merge back into it as they complete.

```
main
  └── feature/mcl-82                  ← integration branch, single release point
        ├── (direct commits)          ← Phase 1 & 2 (too small to branch)
        ├── mcl-82/phase-03-vitest
        ├── mcl-82/phase-04-accessibility
        ├── mcl-82/phase-05-architecture
        └── mcl-82/phase-06-dx
```

### Rules

- **Phase 1 and 2** are committed directly to `feature/mcl-82` — they are small enough that a dedicated branch adds more overhead than value.
- **Phase 3 onward** each get their own branch off `feature/mcl-82`, following the `mcl-82/phase-0N-<short-description>` naming pattern.
- Each phase branch is merged back into `feature/mcl-82` as soon as it is complete and reviewed, not held open until all phases are done.
- Rebase phase branches against `feature/mcl-82` before opening a PR to catch conflicts early, especially for files touched across multiple phases (e.g. `Modal.vue`, `Sidebar.vue`).

---

## Phase 1 — Quick Correctness Fixes

**Branch:** commit directly to `feature/mcl-82`

These are all one-liners or near-one-liners. Group them in a single commit or PR to get them out of the way before any other work begins. They are also the best candidates for the first Vitest tests written in Phase 3, since they are confirmed bugs with known expected behavior.

| # | File | Fix |
|---|---|---|
| 1 | `mcl-forms/lib/.../MclInputText.vue` | Fix `peer-inavlid` typo → `peer-invalid` in peer selector |
| 2 | `manguito-theme/lib/directives/tooltip.directive.ts` | Remove `console.log` on line ~78 |
| 3 | `manguito-theme/lib/directives/index.ts` + `test-export.ts` | Remove `testExport` from barrel and delete `test-export.ts` |
| 4 | `manguito-theme/lib/dropdown/DropdownContent.vue` | Fix `ref<HTMLAreaElement>()` → `ref<HTMLDivElement>()` |
| 5 | `manguito-theme/lib/sidebar/Sidebar.vue` | Restrict `width` prop type to `number` only |

---

## Phase 2 — CSS Critical Fixes

**Branch:** commit directly to `feature/mcl-82`

These must be resolved before wider consumer adoption of the v4 CSS. Items 1 and 2 are breaking changes and need a changelog entry. Ship them before Phase 3 so tests are never written against the broken CSS behavior.

| # | Location | Fix |
|---|---|---|
| 1 | `mcl-theme-v4.css` — `@utility bg-*` | Scope to MCL color tokens only; does not override `bg-cover`, `bg-center`, `bg-gradient-*`, etc. **Breaking change — document in changelog.** |
| 2 | `mcl-theme-v4.css` — `@utility outline-*` | Same scope fix; does not override `outline-2`, `outline-dashed`, `outline-offset-*`, etc. **Breaking change — document in changelog.** |
| 3 | `mcl-theme-v4.css` — `.tooltip-bottom` | Add missing `.tooltip` qualifier: `.tooltip.tooltip-bottom { ... }` |

---

## Phase 3 — Testing Infrastructure

**Branch:** `mcl-82/phase-03-vitest`

Stand up testing before any accessibility or architecture refactoring. Every subsequent phase modifies production code; without tests there is no regression safety net. The Vitest setup is fully documented in `07-vitest-setup.md` so the friction here is low.

### Setup tasks

- Install shared test dependencies at root: `vitest`, `@vue/test-utils`, `happy-dom`, `@vitest/coverage-v8`
- Create `vitest.shared.ts` at root with `happy-dom` environment, `@vitejs/plugin-vue` plugin, and resolve alias for `@bobbykim/manguito-theme` pointing to source (avoids pre-build requirement)
- Create per-package `vitest.config.ts` files that extend the shared base
- Add `"test": "vitest run"` and `"test:watch": "vitest"` scripts to each `package.json`
- Add `"package:test": "lerna run test"` to root `package.json`
- Update `scripts/index.mjs` scaffold to include `vitest.config.ts` and `test` script in templates for all future packages

### Initial test targets (write these as part of this phase)

**Priority 1 — Pure TypeScript, no Vue dependency:**
- `generateClass` — valid inputs return correct Tailwind class strings, invalid inputs return `' '`
- `ValidateMclClass` — all `validate*` methods for valid and invalid inputs
- Directive shared functions — `getTargetId`, `toggleVisibility`, `hasVisibleAttr`

**Priority 2 — Confirmed bugs from Phase 1 (assert the fix holds):**
- `MclInputText` — `invalidFeedback` slot renders when input is invalid (catches the `peer-invalid` regression)
- `MclInputText` — `textcolor` prop (pre-existing bug; test will fail until Phase 6 prop rename)

**Priority 3 — Overlay components:**
- `Modal` — opens/closes via `toggle()`/`open()`/`close()`; emits `open`/`close`; `visible` prop sync
- `Sidebar` — same as Modal plus placement-specific behavior

---

## Phase 4 — Accessibility

**Branch:** `mcl-82/phase-04-accessibility`

Work through components in this order. Modal and Sidebar first because they are the highest-traffic and most critically broken. Each fix should have a corresponding test added (lean on the Phase 3 infrastructure).

### 4a — Modal and Sidebar (highest priority)

- Add `role="dialog"` and `aria-modal="true"` to dialog container
- Add `aria-labelledby` pointing to title element
- Implement focus trap on open (Tab/Shift+Tab cycle within dialog)
- Move focus into dialog on open, return focus to trigger on close
- Add `aria-label` to close button SVGs

### 4b — Collapse triggers

- Change `<div v-collapse>` triggers in `MclCollapseA` and `MclCollapseB` to `<button>`
- Add `aria-expanded` bound to current open state
- Add `aria-controls` referencing the controlled region's `id`
- Add `role="region"` and `aria-labelledby` to the controlled region

### 4c — Form validation announcements

- Add `aria-invalid` attribute to `MclInputText`, `MclTextArea`, `MclSelect` when in invalid state
- Add `role="alert"` or `aria-live="polite"` to `invalidFeedback` error containers so errors are announced to screen readers

### 4d — MclSelect ARIA combobox

- Add `id` to the listbox `<ul>` element
- Add `aria-controls` on the combobox `<input>` pointing to the listbox `id`
- Set `aria-activedescendant` on the input to track the currently highlighted option
- Add `aria-selected` state to `<li>` option elements

### 4e — Tooltip

- Add unique `id` to each tooltip element
- Add `aria-describedby` on the host element pointing to the tooltip `id`
- Add `focus`/`blur` event triggers alongside existing CSS `group-hover`
- Sanitize `innerHTML` injection of `props.title` (use `textContent` or a sanitizer)

---

## Phase 5 — Architecture

**Branch:** `mcl-82/phase-05-architecture`

These are the largest changes and have the most interdependencies. Work through them in the order below to avoid compounding conflicts.

### 5a — Resolve Tailwind v3/v4 mismatch

Prerequisite for the CSS variable work and `cva` migration. Decision required before touching `MclClass`.

- Confirm v4 as the target version across all packages
- Update `devDependencies` in all 10 package `package.json` files from `^3.4.x` to `^4.x`
- Verify pnpm overrides are consistent with the confirmed target version
- Update `mcl-theme-v4.css` documentation to reflect v4-only support

### 5b — Extract `useModalScrollLock` composable

Small, self-contained, good warm-up before the larger directive refactor. Both Modal and Sidebar have the identical `onMounted` + nested `watch` + `useScrollLock` pattern.

- Create `manguito-theme/lib/composables/useModalScrollLock.ts`
- Move the scroll lock logic into it with `{ immediate: true }` on the watcher (fixes the edge case where `visible=true` on initial mount doesn't trigger the lock)
- Replace the duplicated blocks in `Modal.vue` and `Sidebar.vue`

### 5c — Replace `vToggle` / `vCollapse` with composable-based state

The most impactful architectural change. `vToggle` and `vCollapse` bypass Vue's reactivity system, break SSR, and make state invisible to Vue DevTools. Work through this in sub-steps:

1. **Deprecate `vToggle`** — mark as deprecated in docs; the existing `defineExpose` API (`open()`, `close()`, `toggle()`) and `visible` prop already cover the common use cases.
2. **Replace accordion DOM queries in `vCollapse`** — implement `useAccordion` composable using `provide`/`inject`:
   - `provideAccordion(name)` called by an `AccordionGroup` wrapper component
   - `useAccordion(id)` called by each `MclCollapseA` / `MclCollapseB`
   - Eliminates `document.querySelectorAll('[accordion="name"]')` DOM queries
3. **Remove `observeVisibleAttr` composable** — once `vToggle` and `vCollapse` no longer set DOM attributes, the `MutationObserver` watcher is no longer needed.
4. **Fix the two `nutation observer` comment typos** in `Modal.vue` and `Sidebar.vue` while in those files.

---

## Phase 6 — Developer Experience

**Branch:** `mcl-82/phase-06-dx`

These are lower urgency but reduce long-term maintenance cost. Prop naming is a consumer-breaking change; write and publish a migration guide before merging.

### 6a — Prop naming standardization

Apply across all packages in one coordinated pass. Do not do this piecemeal.

- `textcolor` → `textColor` in `MclInputText` and `MclSelect`
- `display*` boolean props → `show*` prefix (`displayBorder` → `showBorder`, `displayShadow` → `showShadow`, `displayHighlight` → `showHighlight`)
- `className` → `customClass` for CSS class injection props across `manguito-theme` components
- `noBackdrop` / `noHeader` → `showBackdrop` / `showHeader` (flip defaults accordingly)
- `invalidFeedback` in `MclSelect` → `noMatchText` (disambiguates from the validation meaning in `MclInputText`)
- Write migration guide documenting all renamed props and their old/new names before merging

### 6b — Replace `MclClass` with `cva`

Can be done incrementally — one class type group at a time — since `generateClass` can coexist with new `cva` exports during migration.

- Install `class-variance-authority` as a dependency of `manguito-theme`
- Replace color group (`BGCOLOR`, `HVBGCOLOR`, `FCBGCOLOR`, etc.) with `cva`-based functions as the first batch
- Replace spacing, typography, and border groups in subsequent batches
- Remove `MclClass`, `ValidateMclClass`, and the static class object files once all groups are migrated
- Update `generateClass` export to delegate to the new `cva` functions during the transition period

### 6c — Monorepo tooling migration

Do this last — it changes CI and release workflows, so the codebase should be stable before introducing pipeline complexity.

- Add Turborepo: `turbo.json` with `build`, `test`, and `lint` task definitions; topological ordering ensures `manguito-theme` builds before dependents
- Add changesets: initialize with `pnpm changeset init`; document the new PR workflow (contributors run `pnpm changeset` to describe their change)
- Remove `lerna.json` and `lerna` devDependency
- Remove `standard-version` devDependency and `release` script
- Update root `package.json` scripts to use `pnpm publish -r` or the changesets GitHub Action
- Update CI pipeline to use `turbo run build test`

---

## Summary

| Phase | Branch | Type | Key deliverable |
|---|---|---|---|
| 1 — Quick fixes | direct commit | Bugfix | 5 one-liner corrections |
| 2 — CSS critical | direct commit | Bugfix + breaking | `bg-*`/`outline-*` scoped, `.tooltip-bottom` fixed |
| 3 — Vitest | `mcl-82/phase-03-vitest` | Infrastructure | Full test setup + first test suite |
| 4 — Accessibility | `mcl-82/phase-04-accessibility` | Feature | ARIA, focus traps, keyboard support across all components |
| 5 — Architecture | `mcl-82/phase-05-architecture` | Refactor | Tailwind v4 confirmed, scroll lock composable, directive replacement |
| 6 — DX | `mcl-82/phase-06-dx` | Refactor + breaking | Prop renames, `cva` migration, Turborepo + changesets |
