# Directives and MutationObserver Pattern

## Overview

The library's core interaction model for `Modal`, `Sidebar`, and `Collapse` is built on a combination of three custom directives (`vToggle`, `vCollapse`, `vClickOutside`) and a composable (`observeVisibleAttr`) that uses `MutationObserver` to watch a custom DOM attribute called `visible`. This document describes how the pattern works, assesses its appropriateness for Vue 3, and outlines a composable-based alternative.

---

## The Pattern

### How `visible` flows through the system

State is communicated between a trigger element and a controlled component through a non-standard DOM attribute:

1. A trigger element (button, anchor, or any element) uses `v-toggle:targetId` or `v-collapse:targetId`.
2. The directive attaches a click listener that calls `toggleVisibility(targetElem)`, which sets `targetElem.setAttribute('visible', 'true' | 'false')`.
3. The controlled component (Modal, Sidebar, Collapse) renders a root wrapper with `:visible="toggle"` and `ref="componentRef"`.
4. Inside the controlled component, `observeVisibleAttr(componentRef, handleVisibility)` uses `useMutationObserver` to watch the `visible` attribute on that element.
5. When the attribute changes, `handleVisibility` updates the component's internal `toggle` ref.

```
[Button with v-toggle:modal1]
    ↓ click
    setAttribute('visible', 'true') on #modal1
    ↓ MutationObserver fires
    handleVisibility(true) inside Modal
    ↓ toggle.value = true
    Modal renders
```

### Files involved

| File | Role |
|---|---|
| `directives/toggle.directive.ts` | `vToggle` — sets `visible` attribute on click |
| `directives/collapse.directive.ts` | `vCollapse` — same, with accordion group support |
| `directives/click-outside.directive.ts` | `vClickOutside` — fires a callback when clicking outside |
| `composables/observeVisible.ts` | Wraps `useMutationObserver` to watch `visible` attribute |
| `modal/Modal.vue` | Uses `observeVisibleAttr` + `vClickOutside` |
| `sidebar/Sidebar.vue` | Uses `observeVisibleAttr` + `vClickOutside` |
| `collapse/Collapse.vue` | Uses `observeVisibleAttr` |

### `vClickOutside`

`vClickOutside` is a standard custom directive pattern. It attaches document-level event listeners in `mounted` and removes them in `unmounted`. It supports configuration options (handler function, event types, excluded elements). This is a well-established Vue pattern and has no correctness concerns beyond the accessibility issues documented in `01-accessibility.md`.

---

## Assessment: Is This Appropriate for Vue 3?

### The `vToggle` / `vCollapse` directive pattern

**Appropriate use cases for directives in Vue 3:**

The Vue 3 documentation describes directives as appropriate when you need to perform "low-level DOM operations that cannot be easily achieved with normal component bindings." `vClickOutside` fits this description well — it genuinely needs to attach listeners to `document`.

`vToggle` and `vCollapse` do not fit this description. Their sole job is to call `setAttribute` on a target element when clicked. This is DOM manipulation that crosses component boundaries, bypassing Vue's reactivity system entirely. The result:

1. **Vue DevTools cannot observe state changes.** Setting a DOM attribute is invisible to Vue's reactivity. Debugging why a modal is open or closed requires inspecting raw DOM attributes.
2. **SSR incompatibility.** `document.getElementById` is called inside directive hooks, which do not run during server-side rendering. The `Collapse` and header components that use `v-collapse` would fail in an SSR context.
3. **Coupling through DOM IDs.** The trigger must know the `id` of the target component's root element. This creates implicit coupling: renaming an `id` prop silently breaks all triggers.
4. **Fragile attribute communication.** `visible` is a non-standard HTML attribute. Some HTML sanitizers strip unknown attributes. It also does not map to any standard WAI-ARIA pattern.
5. **MutationObserver overhead.** `useMutationObserver` observes the DOM in real-time via a callback. For a toggle that could simply be a shared `ref`, this is unnecessary work. Every attribute mutation on the watched element (from any source) triggers the observer callback.

### The `observeVisibleAttr` composable

The composable itself is well-written — it is properly typed, uses `@vueuse/core`'s `useMutationObserver`, and filters mutations to only the `visible` attribute. However, its existence is a symptom of the underlying problem: state should not require DOM observation to stay in sync with component internal state.

Note also that both `Modal.vue` (line 91) and `Sidebar.vue` (line 91) have a comment that reads "set **nutation** observer" — a typo for "mutation" — suggesting the comment was copy-pasted without review.

---

## Composable-based Alternative

The fundamental goal is: allow external code (a button, a parent component) to toggle a modal/sidebar/collapse. Vue 3 has several clean ways to do this.

### Option A: Props + `defineExpose`

The components already implement `defineExpose` with `toggle()`, `open()`, and `close()` methods. A parent component can hold a `ref` to the component instance and call these methods directly:

```vue
<!-- Parent -->
<script setup>
import { ref } from 'vue'
import Modal from '@bobbykim/manguito-theme'

const modalRef = ref()
</script>

<template>
  <button @click="modalRef.open()">Open Modal</button>
  <Modal ref="modalRef" title="Hello">...</Modal>
</template>
```

This already works. The `v-toggle` directive is only needed for cases where the trigger and the modal are in different component trees and cannot share a ref easily.

### Option B: `v-model` / `visible` prop + watcher

The components already accept a `visible` prop and watch it:

```ts
watch(
  () => props.visible,
  (newValue) => { toggle.value = newValue }
)
```

A parent can simply bind `:visible="isModalOpen"` and set `isModalOpen = true` to open. This is the most idiomatic Vue 3 pattern. The `visible` prop already exists — the directive approach is redundant for this use case.

### Option C: A `useToggle` composable for cross-tree communication

For cases where the trigger and the modal genuinely cannot be co-located (e.g., a button in the header opening a sidebar defined in the layout), a shared composable provides clean cross-tree state:

```ts
// composables/useModalState.ts
import { ref } from 'vue'

export const useModalState = (id: string) => {
  const state = ref(false)
  const open = () => { state.value = true }
  const close = () => { state.value = false }
  const toggle = () => { state.value = !state.value }
  return { state, open, close, toggle }
}
```

Both the trigger button and the Modal component call `useModalState('my-modal')` and share the same reactive ref. No DOM manipulation, no MutationObserver, no string IDs.

Note: this requires a shared module to hold the state (either a singleton composable, a store like Pinia, or provide/inject). For a component library, the simplest approach is to document the `defineExpose` API and recommend that consumers use refs or a state management solution.

---

## What to Keep, What to Replace

| Directive | Recommendation |
|---|---|
| `vClickOutside` | **Keep.** Genuine DOM need, well-implemented. |
| `vToggle` | **Deprecate.** Replace with `defineExpose` refs or the `visible` prop. The directive should remain for backwards compatibility but be marked deprecated in docs. |
| `vCollapse` | **Partially replace.** The accordion group feature (querying all `[accordion="name"]` elements) is the one capability that doesn't map cleanly to props. However, it could be replaced with a provide/inject accordion context (similar to how `DropdownContainer` provides dropdown state to `DropdownContent`). |
| `vTooltip` | **Evaluate separately.** It mounts a Vue component into a DOM element, which is a valid use case for a directive. However, the leftover `console.log` and the `innerHTML` injection are bugs that need fixing regardless of whether the directive is kept. |
| `observeVisibleAttr` | **Remove** once `vToggle` and `vCollapse` are replaced. The MutationObserver is only needed because the directives bypass the reactivity system. |

---

## Proposed Collapse Accordion Alternative

The `vCollapse` directive's accordion feature queries `document.querySelectorAll('[accordion="name"]')` to find siblings. A composable-based equivalent:

```ts
// composables/useAccordion.ts
import { inject, provide, ref, type Ref } from 'vue'

const ACCORDION_KEY = Symbol()

export const provideAccordion = (name: string) => {
  const openId = ref<string | null>(null)
  provide(ACCORDION_KEY, { openId, name })
  return { openId }
}

export const useAccordion = (id: string) => {
  const ctx = inject<{ openId: Ref<string | null>; name: string } | null>(
    ACCORDION_KEY,
    null
  )
  if (!ctx) return { isOpen: ref(false), requestOpen: () => {} }

  const isOpen = computed(() => ctx.openId.value === id)
  const requestOpen = () => { ctx.openId.value = isOpen.value ? null : id }

  return { isOpen, requestOpen }
}
```

An `AccordionGroup` wrapper component calls `provideAccordion`, and each `MclCollapseA` / `MclCollapseB` inside it calls `useAccordion(collapseId)`. No DOM queries, no attribute watchers, fully reactive.
