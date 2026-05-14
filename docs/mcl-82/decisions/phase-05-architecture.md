# Phase 5 — Architecture Decisions

This document records the architectural decisions made before implementing the Phase 5 architecture refactor. It is the authoritative reference for implementation choices in `mcl-82/phase-05-architecture`.

---

## 5a — Tailwind v4 Alignment

**Decision:** v4 is the committed target. Consumers bring their own Tailwind v4 installation and import `mcl-theme-v4.css` themselves — the CSS is not pre-compiled into the package.

**Fix:** Update `devDependencies` in all 10 package `package.json` files from `^3.4.x` to `^4.x` to match reality. The root `package.json` and pnpm overrides already enforce v4 at install time; the per-package manifests were simply stale and would mislead a consumer installing a single package independently.

---

## 5b — `useModalScrollLock` Composable

`Modal.vue` and `Sidebar.vue` contain identical, non-idiomatic scroll lock code: `useScrollLock` is called and a `watch` is nested inside `onMounted`. This has two problems:

1. Calling `watch` inside `onMounted` is non-idiomatic — watchers should be registered at setup level.
2. The watcher has no `immediate: true`, so if `visible=true` on initial mount the scroll lock does not activate.

**Decision:** Extract into `manguito-theme/lib/composables/useModalScrollLock.ts`. The composable calls `useScrollLock(document)` and registers the watcher at setup level with `{ immediate: true }`. Both Modal and Sidebar call it in their `<script setup>`, replacing the duplicated blocks.

---

## 5c — Directive Deprecation and Composable Replacement

### Background

`vToggle` and `vCollapse` communicate state by calling `setAttribute('visible', ...)` on a target DOM element. The controlled components (`Modal`, `Sidebar`, `Collapse`) then use `observeVisibleAttr` — a `MutationObserver` wrapper — to detect the attribute change and update their internal `toggle` ref. This pattern bypasses Vue's reactivity system, is invisible to Vue DevTools, is SSR-incompatible, and couples trigger and target through fragile string IDs.

### `vToggle` — deprecated, remains functional

**Decision:** Deprecate `vToggle` in Phase 5. Mark it as deprecated in code (JSDoc `@deprecated`) and in documentation. Provide a migration guide pointing to:
- `defineExpose` refs (`modalRef.open()`, `sidebarRef.toggle()`, etc.) for parent-to-child calls
- `:visible` prop binding for reactive state-driven control

`vToggle` remains **functional** through the deprecation period. `Modal.vue` and `Sidebar.vue` keep their `observeVisibleAttr` usage, so the `vToggle` → attribute → MutationObserver chain continues to work for existing consumers.

### `vCollapse` — deprecated, non-functional after Phase 5

**Decision:** Deprecate `vCollapse` in Phase 5. `MclCollapseA` and `MclCollapseB` are migrated to the new `useCollapseState` composable (see below), so they no longer watch the `visible` DOM attribute. This means `vCollapse` will not be able to toggle them after the migration. The directive code remains in the barrel export but is marked `@deprecated` with a migration guide pointing to `AccordionGroup` + `useCollapseState`.

**Why break it rather than maintain compatibility?** Maintaining the DOM-attribute path alongside the new composable path would require both mechanisms to co-exist in `MclCollapseA`/`MclCollapseB`, doubling the state management complexity. The clean break is preferable given there is no npm-level minor/patch constraint — this ships as part of a single coordinated MCL-82 release.

### `observeVisibleAttr` — kept through deprecation period

`observeVisibleAttr` is retained while `vToggle` remains functional. It continues to serve `Modal.vue` and `Sidebar.vue`. It is removed once `vToggle` is removed in a future phase.

### `useCollapseState` — new unified composable

A single composable handles both standalone and accordion collapse, eliminating the `document.querySelectorAll('[accordion="name"]')` DOM query from `vCollapse`:

```ts
// composables/useCollapseState.ts
export const useCollapseState = (id: string) => {
  const ctx = inject<AccordionContext | null>(ACCORDION_KEY, null)

  if (ctx) {
    // accordion mode: shared openId from AccordionGroup
    const isOpen = computed(() => ctx.openId.value === id)
    const toggle = () => { ctx.openId.value = isOpen.value ? null : id }
    return { isOpen, toggle }
  } else {
    // standalone mode: local state
    const isOpen = ref(false)
    const toggle = () => { isOpen.value = !isOpen.value }
    return { isOpen, toggle }
  }
}
```

When `inject` returns `null` (no `AccordionGroup` ancestor), the composable manages its own local state. When an `AccordionGroup` is present, it participates in shared accordion state. `MclCollapseA` and `MclCollapseB` always call `useCollapseState(id)` — they do not need to know which mode they are in.

### `AccordionGroup` — new wrapper component

A new `AccordionGroup.vue` wrapper component is added to `manguito-theme`. It calls `provideAccordion()` to inject the shared accordion context. Usage:

```vue
<AccordionGroup>
  <MclCollapseA collapse-id="a1" title="Item 1">...</MclCollapseA>
  <MclCollapseA collapse-id="a2" title="Item 2">...</MclCollapseA>
</AccordionGroup>
```

`AccordionGroup` is a thin renderless wrapper (renders a `<div>` or a slot) — it has no visual styling of its own.

### Typo fix

Both `Modal.vue` and `Sidebar.vue` have a comment reading "set **nutation** observer" (copy-paste artifact). Corrected to "mutation observer" while in those files.

---

## Documentation Updates

The following documentation changes are required as part of Phase 5:

| Component / Directive | Update required |
|---|---|
| `vCollapse` | Deprecation notice + migration guide to `AccordionGroup` |
| `vToggle` | Deprecation notice + migration guide to `defineExpose` API and `:visible` prop |
| `MclCollapseA` / `MclCollapseB` | Update usage examples to show standalone and `AccordionGroup` patterns |
| `Modal` / `Sidebar` | Add preferred-pattern callout: use `defineExpose` refs or `:visible` prop binding |

---

## Phase 4 Known Limitation — Resolved

Phase 4 accepted a known limitation: `aria-expanded` on a collapse trigger would go stale when an accordion sibling closed it externally via `vCollapse` DOM manipulation. This is resolved in Phase 5: `MclCollapseA`/`MclCollapseB` now derive `isOpen` from `useCollapseState`, which is fully reactive. `aria-expanded` is bound directly to `isOpen`, so it stays accurate regardless of how the state changes.
