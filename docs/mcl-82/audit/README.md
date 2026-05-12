# MCL-82: Architecture & Quality Review

This directory contains six analysis documents covering structural concerns identified during a full read-through of the manguito-component-library codebase. No code was changed during this review.

---

## Documents

### [01 — Accessibility](./01-accessibility.md)

The most critical interactive components — `Modal`, `Sidebar`, `Collapse`, `Tooltip`, `Dropdown`, `Tabs`, and all `mcl-forms` inputs — have significant accessibility gaps. `Modal` and `Sidebar` lack `role="dialog"`, `aria-modal`, and focus trapping entirely; keyboard users can tab outside an open modal. Collapse triggers are often non-interactive `<div>` elements with no `aria-expanded` or `aria-controls`. The tooltip relies solely on CSS hover with no keyboard trigger and injects content via `innerHTML` without sanitization. The custom `MclSelect` combobox is missing `aria-activedescendant` and `aria-controls` for its listbox. Several form components show validation feedback only through CSS peer selectors, with no `aria-live` region or `aria-invalid` for screen readers, and one peer selector has a typo (`peer-inavlid`) that prevents it from ever activating.

---

### [02 — Monorepo Tooling](./02-monorepo-tooling.md)

The monorepo uses Lerna 8 over pnpm workspaces. The setup works but has three notable problems: (1) `lerna run build` is serial with no caching — rebuilding all 10 packages on every change adds unnecessary CI time; (2) both `standard-version` and `lerna version` are present in root scripts with no documented distinction, creating a conflicting dual-versioning workflow; (3) packages have their own `node_modules` from `lerna exec -- pnpm install` rather than purely relying on pnpm hoisting, leading to duplicated tool installations. Turborepo is evaluated as a strong replacement for build orchestration (task graph + remote caching), and changesets is evaluated as a cleaner replacement for the versioning workflow. Nx is assessed as over-engineered for the current repo size.

---

### [03 — Prop Naming](./03-prop-naming.md)

Prop names are inconsistent across packages and contain several bugs. The most pervasive issues are: `textcolor` (lowercase, should be `textColor`) appears in both `MclInputText` and `MclSelect`; boolean props mix `display*` and `show*` prefixes with no rule; `className` is used for custom CSS class injection in `manguito-theme` while the `Tooltip` component uses `customClass`; `invalidFeedback` means "validation error message" in `MclInputText` but means "no results text" in `MclSelect` (two different concepts, one name); and `noBackdrop`/`noHeader` use negated booleans (harder to read in templates). The `Sidebar.vue` `width` prop accepts `string | number` but the template always appends `px`, making string values like `'50%'` silently broken.

---

### [04 — Class Utility Object](./04-class-utility-object.md)

The `MclClass` system in `manguito-theme/lib/theme/` is a custom runtime Tailwind class resolver: given a type key (`'BGCOLOR'`) and a value (`'primary'`), it returns the corresponding Tailwind class string. The system has grown to ~750 hardcoded class strings across six static class objects, and every call to `generateClass()` instantiates seven new objects at runtime. A 50+ case `switch` statement dispatches to private methods that all follow the same validate-then-lookup pattern. Duplicate color maps also exist locally in `MclCheckbox` and `MclInputSwitch` for Tailwind peer-variant classes not covered by `MclClass`. `cva` (class-variance-authority) is evaluated as a cleaner replacement that eliminates object allocation overhead and improves TypeScript inference. A CSS-variable approach (building on the existing `mcl-theme-v4.css`) is identified as the best long-term architecture but requires first resolving the Tailwind v3/v4 version mismatch across packages.

---

### [05 — Directives and MutationObserver](./05-directive-mutationobserver.md)

The `vToggle` and `vCollapse` directives communicate between trigger elements and controlled components (Modal, Sidebar, Collapse) by directly setting a non-standard `visible` attribute on DOM elements. The controlled components watch this attribute with a `MutationObserver` via the `observeVisibleAttr` composable. This bypasses Vue's reactivity system: state changes are invisible to Vue DevTools, SSR is broken (directives call `document.getElementById` in their hooks), and coupling is through fragile DOM `id` strings. The `defineExpose` API and `visible` prop that already exist on Modal/Sidebar/Collapse are sufficient for the common use cases. `vClickOutside` is assessed as appropriate (genuine DOM need). For accordion groups, a provide/inject composable (`useAccordion`) is outlined as a clean replacement for `vCollapse`'s DOM query approach. Two typos in component comments (`nutation observer` for `mutation observer`) confirm the code was copy-pasted without review.

---

### [06 — General Architecture](./06-general-architecture.md)

Several miscellaneous structural issues are documented: a Tailwind v3/v4 version mismatch between package-level and root devDependencies that needs clarification; tight coupling from `mcl-header` and `mcl-collapse` packages into `manguito-theme`'s internal component slots; a naming collision between two unrelated types both called `InputType` exported from `manguito-theme`; an `HTMLAreaElement` typo in `DropdownContent` (should be `HTMLElement`); a committed test artifact (`testExport = 'pio!'`) and a debug `console.log` in `tooltip.directive.ts` that both exist in published package code; the scroll-lock pattern being duplicated verbatim in `Modal` and `Sidebar` instead of being extracted into a composable; and a complete absence of automated testing across all packages.

---

---

### [07 — Vitest Setup](./07-vitest-setup.md)

There are zero test files anywhere in the repository. The only testing-adjacent tooling present is `@storybook/test` (installed but unused) and `@storybook/addon-a11y` (browser-only, not automated). The monorepo structure is fully compatible with Vitest's workspace mode: a single `vitest.workspace.ts` at the root can discover per-package `vitest.config.ts` files, and a shared base config with a resolve alias for `@bobbykim/manguito-theme` eliminates the need to pre-build the theme package before running tests. `happy-dom` is recommended over jsdom as the test environment to handle `ResizeObserver` and `getBoundingClientRect` (used by `@floating-ui/vue` in `MclSelect`). The highest-value initial testing targets are: `generateClass` and `ValidateMclClass` (pure TypeScript, no Vue dependency, already-documented bugs to assert against), the `mcl-forms` components (known `peer-inavlid` typo, broken validation feedback), and the `Modal`/`Sidebar` overlay components. The document provides a complete recommended setup path including a shared base config, per-package config extension pattern, and an update to the scaffold script so new packages are test-ready from creation.

---

### [08 — Claude Code Skills and Sub-Agents](./08-claude-skills-agents.md)

No `CLAUDE.md` exists in the repository, and no Claude Code configuration is present. The codebase is a strong candidate for skills/agents due to three factors: its high pattern uniformity (every component follows the same `generateClass` + prop convention structure), a known backlog of cross-cutting refactors documented in this review series, and an existing scaffold script (`scripts/index.mjs`) that already proves the team values automating repeating patterns. Four specific skills are proposed: `new-component` (scaffold a new component inside an existing package), `add-tests` (write Vitest tests for a given component), `fix-accessibility` (apply the checklist from document 01 to a specific component), and `migrate-prop` (rename a prop across a component and its story). Three sub-agent workflows are outlined: an accessibility sweep agent that reads all Vue files and reports ARIA gaps, a test coverage gap finder, and a prop naming consistency enforcer. The document also defines what project-specific context all agents need (`generateClass` API, `ColorPalette` union, workspace dependency pattern, known bugs) and recommends writing `CLAUDE.md` first as the prerequisite for all other automation.

---

### [09 — Theme CSS Audit](./09-theme-css-audit.md)

`mcl-theme-v4.css` is the single CSS entry point for `@bobbykim/manguito-theme` and defines design tokens, base element styles, component classes, and Tailwind utility extensions. Two issues are critical: `@utility bg-*` and `@utility outline-*` are both too broad — they override Tailwind v4's entire background and outline utility families, silently breaking `bg-cover`, `bg-center`, `bg-gradient-to-r`, `outline-2`, `outline-dashed`, and many others for any consumer who imports this CSS alongside a Tailwind v4 project. A third bug, `.tooltip-bottom` missing its `.tooltip` class qualifier (every other direction variant has it), leaks absolute positioning onto any unrelated element that happens to use that class name. The largest optimization opportunity is the `@layer utilities` block: 185 lines of 68 hand-written tooltip caret color rules (17 colors × 4 directions) can be replaced with 4 CSS variable rules plus a single `@utility tooltip-*` declaration, which is exactly the pattern Tailwind v4's `@utility` system was designed for. On the positive side, the `@theme` double-variable pattern, `@property` typed custom property declarations, and the color-variant `@utility` rules (`btn-*`, `mcl-list-*`, `mcl-link-*`) are all well-aligned with Tailwind v4 best practices. Ten prioritized recommendations are provided, with clear breaking-change flags where applicable.

---

## Suggested Priority Order

The issues below are ordered by impact on end-users and correctness, not by implementation effort.

### Priority 1 — Correctness bugs (fix immediately)

1. **`peer-inavlid` typo** in `MclInputText.vue` — validation feedback is completely broken for all users of that component.
2. **`console.log` in `tooltip.directive.ts`** — leaks debug output to all production consumers.
3. **`testExport` in `directives/index.ts`** — publishes meaningless code to npm.
4. **`HTMLAreaElement` typo** in `DropdownContent.vue` — wrong type on a template ref.
5. **`Sidebar.vue` `width` prop** accepts `string` but always appends `px` — passing a percentage is silently broken.

### Priority 2 — Accessibility (required for a widely-used UI library)

6. **Modal and Sidebar focus trapping + ARIA roles** — these are the two most-used overlay components and have the most critical accessibility gaps (`role="dialog"`, `aria-modal`, focus management).
7. **Collapse trigger elements** — change `<div>` triggers to `<button>` and add `aria-expanded`/`aria-controls`.
8. **Form validation announcements** — add `aria-invalid` and `aria-live` error regions to form components.
9. **`MclSelect` ARIA combobox** — add `aria-activedescendant` and `aria-controls`.
10. **Tooltip keyboard support** — add `focus` trigger alongside hover.

### Priority 3 — Architecture (reduces future maintenance cost)

11. **Resolve Tailwind v3/v4 mismatch** — clarify target version and update all package devDependencies consistently.
12. **Replace `vToggle`/`vCollapse` with composable-based state** — removes MutationObserver overhead, fixes SSR breakage, and makes state visible to Vue DevTools.
13. **Extract `useModalScrollLock` composable** — remove the duplicated `onMounted` + `watch` pattern from Modal and Sidebar.
14. **Add automated testing** — even a small suite of component tests for Modal, MclSelect, and form validation would catch regressions.

### Priority 4 — Developer experience (beneficial, lower urgency)

15. **Prop naming standardization** — adopt `show*` for booleans, `textColor` (camelCase), `customClass` for class injection, rename `invalidFeedback` in `MclSelect`.
16. **Replace `MclClass` with `cva`** — reduces object allocation and simplifies the class resolution code.
17. **Monorepo tooling migration** — Turborepo + changesets to replace Lerna's build and versioning roles.
