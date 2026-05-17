# General Architecture Issues

## Overview

This document covers structural issues that do not fit neatly into the other five categories: component coupling, TypeScript coverage gaps, composable opportunities, Vue 3 patterns that are not yet fully leveraged, and miscellaneous code quality observations.

---

## 1. Tailwind Version Mismatch

The root `package.json` lists `tailwindcss: "^4.1.18"` (used by the Storybook app). Each package's own `package.json` lists `tailwindcss: "^3.4.16"` as a devDependency.

```json
// manguito-theme/package.json
"devDependencies": {
  "tailwindcss": "^3.4.16"
}

// root package.json
"devDependencies": {
  "tailwindcss": "^4.1.18"
}
```

The pnpm `overrides` in the root resolves this at install time by forcing all packages to use `$tailwindcss` (the root version, v4). However, the individual package `package.json` files are not updated to reflect this. A consumer who installs `@bobbykim/manguito-theme` independently and reads its devDependencies would expect v3, not v4.

More critically, the CSS file `mcl-theme-v4.css` uses Tailwind v4's `@theme` directive and CSS-native custom properties syntax, which is incompatible with Tailwind v3. If a downstream consumer tries to use the package with Tailwind v3, they will get errors.

**Clarification needed:** Is the intent to ship a Tailwind v4 package? If yes, the devDependency versions in each package should be updated to v4. If no, the CSS file needs to be reconciled with v3.

---

## 2. Component Coupling: `mcl-header` to `manguito-theme` internals

`MclHeaderA` and `MclHeaderB` import not just the public API of `manguito-theme` but also internal components:

```ts
import generateClass, { HeaderHorizontal } from '@bobbykim/manguito-theme'
```

`HeaderHorizontal` is a base layout component in `manguito-theme/lib/header/`. It is part of the public export, but it is essentially an internal implementation detail that the `mcl-header` package extends. The `mcl-header` package is tightly coupled to `HeaderHorizontal`'s internal slot API (`#content`, `#content-right`, `#mobile-content`).

If `HeaderHorizontal`'s slot names or behavior change, `MclHeaderA` and `MclHeaderB` break silently (no compile-time slot name checking in Vue 3 without additional tooling).

Similarly, `MclCollapseA` and `MclCollapseB` import the `Collapse` base component:
```ts
import generateClass, { Collapse } from '@bobbykim/manguito-theme'
```

This tight coupling means the `mcl-*` packages are effectively thin wrappers with opinionated styling around `manguito-theme` internals, rather than independent packages that happen to use the theme.

---

## 3. Missing TypeScript Coverage

### `defineSlots` using `any`

Several components define slots with `any` types:

```ts
// Modal.vue
const slots = defineSlots<{
  header(props: { close: () => void; status: boolean }): any
  body(props: { close: () => void; status: boolean }): any
  footer(props: { close: () => void; status: boolean }): any
}>()

// Collapse.vue
const slots = defineSlots<{
  default: any
}>()
```

The scoped slot props (`close`, `status`) are typed, which is good. But the return type `any` means the slot content's type is not checked. Vue 3.3+ supports more precise slot return types using `VNode` arrays.

### `InputType` name collision

In `theme.types.ts`:
```ts
export type InputType = 'text' | 'email' | 'password'
```

In `mcl-theme/index.ts`:
```ts
export type InputType<T extends ClassType> = T extends ColorClassType ? ColorPalette : ...
```

Two different types named `InputType` are exported from the same package (`@bobbykim/manguito-theme`). The generic `InputType<T>` is the class-resolution type, and `InputType` (non-generic) is the HTML input type union. Consumers importing `{ InputType }` will receive the non-generic form only (since the generic is not directly re-exported from the package root), but the naming collision is a maintenance hazard.

### Missing types in `mcl-forms`

`MclCheckbox.vue` has a local `ColorMap` type (imported from `../common/index.types`) but also defines two local `const` objects (`peerBgColor`, `beforeColor`) that duplicate mapping logic without a typed guard. If `ColorPalette` gains a new color, these maps will silently omit it.

---

## 4. `defineComponent` vs `<script setup>` Inconsistency

The `Tooltip` component (`lib/tooltip/index.ts`) uses the Options API-style `defineComponent` with a manual `setup()` function that returns a render function:

```ts
export default defineComponent({
  name: 'Tooltip',
  props: { ... },
  setup(props) {
    return () => h('div', { ... })
  },
})
```

All other components use `<script setup>`. The `Tooltip` uses `defineComponent` because it is a renderless/programmatic component mounted by the `vTooltip` directive via `createVNode` + `render`. While this usage pattern is valid, the inconsistency means contributors face two different API styles within the same package. A `<script setup>` component could also be dynamically mounted by a directive using `createApp` or `createVNode`, so the choice of `defineComponent` is not strictly necessary.

---

## 5. Scroll Lock Pattern

Both `Modal.vue` and `Sidebar.vue` implement scroll lock with identical code:

```ts
onMounted(() => {
  const scrollLock = useScrollLock(document)
  watch(toggle, (newVal) => {
    scrollLock.value = newVal
  })
})
```

The `useScrollLock` call and the nested `watch` inside `onMounted` is an unusual pattern. Normally, `watch` is called at the setup level, not inside a lifecycle hook. This works because `watch` called inside `onMounted` still registers a reactive effect, but it is non-idiomatic and may confuse future contributors. The watcher also starts watching after the first render, meaning if `toggle` is `true` on initial mount (via the `visible` prop), the scroll lock may not activate immediately.

Additionally, this logic is duplicated verbatim in two components. It should be extracted into a composable:

```ts
// composables/useModalScrollLock.ts
import { useScrollLock } from '@vueuse/core'
import { watch, type Ref } from 'vue'

export const useModalScrollLock = (isOpen: Ref<boolean>) => {
  const scrollLock = useScrollLock(document)
  watch(isOpen, (val) => { scrollLock.value = val }, { immediate: true })
}
```

---

## 6. `ClientSideRender` Utility Component

The `ClientSideRender` component in `lib/util/clientSideRender.ts` is a simple mount guard:

```ts
export const ClientSideRender = defineComponent({
  setup(_, { slots }) {
    const visible = ref<boolean>(false)
    onMounted(() => { visible.value = true })
    return () => (visible.value && slots.default ? slots.default() : null)
  },
})
```

It is used only once — wrapping the `<Transition>` inside `Collapse.vue`. The purpose is to prevent SSR hydration mismatches caused by the transition animation on initial render. This is a valid pattern, but it could be replaced with Vue 3's built-in `<ClientOnly>` (in Nuxt) or a simple `onMounted`-based approach within `Collapse.vue` itself, without requiring a separate utility component.

---

## 7. Hardcoded `console.log` in Production Code

```ts
// directives/tooltip.directive.ts, line ~78
console.log(
  `color: ${tooltipColor}, txt color: ${tooltipTextColor}, width: ${tooltipWidth}`,
)
```

This debug log is in the `mountTooltip` function and will fire every time a tooltip is rendered. It should be removed.

---

## 8. `test-export.ts` in Directives

```ts
// directives/test-export.ts
export const testExport = 'pio!'
```

This file exports a meaningless string and is included in the directives barrel export:

```ts
// directives/index.ts
export { testExport } from './test-export'
```

This is clearly a test artifact that was committed accidentally. It should be removed from both the barrel and the package.

---

## 9. Transition Animation Duplication

The height-based transition animation (for the collapse effect) is implemented in three separate places with essentially the same JavaScript:

```ts
// HeaderHorizontal.vue
const onEnter = (el: any) => {
  el.style.height = 'auto'
  const endWidth = getComputedStyle(el).height
  el.style.height = '0px'
  el.offsetHeight // force repaint
  el.style.height = endWidth
}
```

The same logic appears in `Collapse.vue` and `HeaderHorizontal.vue`. While `Collapse.vue`'s version also handles opacity, the core height-animation pattern is duplicated. This could be a shared composable `useHeightTransition()` that provides the `onEnter`, `onAfterEnter`, `onLeave` handlers.

---

## 10. `DropdownContent` Uses `HTMLAreaElement` Ref Type

```ts
// DropdownContent.vue
const contentRef = ref<HTMLAreaElement>()
```

`HTMLAreaElement` is the type for `<area>` elements inside image maps — it is almost certainly a typo. The correct type should be `HTMLElement` or `HTMLDivElement`.

---

## 11. No Testing Infrastructure

The repository has no unit tests, component tests, or end-to-end tests. The Storybook stories serve as visual documentation and manual testing aids, but there are no automated assertions. Given the library is published to npm and consumed by downstream projects, this is a significant gap. Issues like the `peer-inavlid` typo in `MclInputText` (which silently breaks validation feedback) would be caught by a component test.

Recommended: add `@vue/test-utils` + Vitest for unit and component testing. Start with the most critical components: `Modal`, `Sidebar`, `MclSelect`, and form validation.

---

## 12. Inconsistent `defineExpose` Usage

Some components expose imperative methods (`Modal`, `Sidebar`, `Collapse`, `HeaderHorizontal`, `TabContainer`), but most components do not expose anything. For components like `MclCollapseA` and `MclCollapseB` that wrap the base `Collapse` component, the `collapseRef` is not exposed, so a parent cannot programmatically open or close them. This is inconsistent: some composition patterns work with imperative refs, but others require the `v-collapse` directive approach.

A documented convention should specify which components expose a public API and which do not.
