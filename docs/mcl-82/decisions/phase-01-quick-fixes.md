# Phase 1 — Quick Fixes Decision Record

These are the five one-liner corrections committed directly to `feature/mcl-82` as defined in the implementation plan. Each item documents exactly what changed and why.

---

## Fix 1 — `peer-inavlid` typo in `MclInputText.vue`

**What changed**

File: `src/components/mcl-forms/lib/mcl-input-text/MclInputText.vue`

Line 97 in the template:
```diff
- class="peer-valid/validation:hidden peer-inavlid/validation:block ml-3xs"
+ class="peer-valid/validation:hidden peer-invalid/validation:block ml-3xs"
```

**Why**

`peer-inavlid` is not a valid Tailwind peer-state variant. The correct spelling is `peer-invalid`, which corresponds to the CSS `:invalid` pseudo-class on a sibling peer element. Because the class was misspelled, the `invalid-feedback` slot and the `invalidFeedback` prop text were never shown to the user — the element remained `block` at all times regardless of validation state, or alternatively was never shown depending on the base display class. Either way, the validation feedback mechanism was completely non-functional.

Source: audit doc `06-general-architecture.md` § 11 and `01-accessibility.md` § 7 (form components).

**Breaking change?**

No. The corrected class activates behavior that was always intended but broken. Consumers who were working around the broken behavior by adding their own error display logic should test their forms after upgrading, but the fix does not remove or rename any prop or slot.

**Verification**

```bash
grep -n "inavlid" src/components/mcl-forms/lib/mcl-input-text/MclInputText.vue
# expected: no output
grep -n "peer-invalid" src/components/mcl-forms/lib/mcl-input-text/MclInputText.vue
# expected: line 97 containing peer-invalid/validation:block
```

In a browser, render `<MclInputText required />` inside a `<form>` and submit without entering a value. The `invalidFeedback` content should become visible. Previously it was never shown.

---

## Fix 2 — Remove `console.log` from `tooltip.directive.ts`

**What changed**

File: `src/components/manguito-theme/lib/directives/tooltip.directive.ts`

Lines 94–96 inside `mountTooltip()` removed:
```diff
-  console.log(
-    `color: ${tooltipColor}, txt color: ${tooltipTextColor}, width: ${tooltipWidth}`,
-  )
```

**Why**

This `console.log` is a debug statement left in production code. It fires every time a tooltip is rendered (on `mounted` and `updated` directive hooks), meaning any page using `v-tooltip` will emit continuous debug output to every consumer's browser console. The surrounding code (variable extraction and `createVNode`) is not affected.

Source: audit doc `06-general-architecture.md` § 7.

**Breaking change?**

No. Removing a `console.log` has no effect on component behavior, emitted events, or the public API.

**Verification**

```bash
grep -n "console.log" src/components/manguito-theme/lib/directives/tooltip.directive.ts
# expected: no output
```

In a browser, open DevTools console, render any element with `v-tooltip`, and confirm no log lines are emitted when the component mounts.

---

## Fix 3 — Remove `testExport` from directives barrel and delete `test-export.ts`

**What changed**

File: `src/components/manguito-theme/lib/directives/index.ts`

Line 7 removed:
```diff
-export { testExport } from './test-export'
 export { TooltipValueObjectType, vClickOutside, vCollapse, vToggle, vTooltip }
```

File deleted: `src/components/manguito-theme/lib/directives/test-export.ts`

The deleted file contained:
```ts
export const testExport = 'pio!'
```

**Why**

`testExport` is a committed test artifact with no functional purpose. It is re-exported from the public directives barrel (`@bobbykim/manguito-theme/directives`), meaning it is part of the package's published API surface. Any consumer who imports `{ testExport }` from the directives entry point will receive a meaningless string. Leaving it in increases the bundle size marginally and pollutes the package's exported namespace.

Source: audit doc `06-general-architecture.md` § 8.

**Breaking change?**

Technically yes — `testExport` is removed from the public `@bobbykim/manguito-theme/directives` export. However, no documented or expected consumer should be relying on `testExport = 'pio!'`. This should be listed in the changelog as a removed export but flagged as a test artifact removal, not a functional API change.

**Verification**

```bash
grep -rn "testExport" src/components/manguito-theme/lib/directives/
# expected: no output

ls src/components/manguito-theme/lib/directives/test-export.ts
# expected: No such file or directory
```

---

## Fix 4 — Fix `ref<HTMLAreaElement>()` typo in `DropdownContent.vue`

**What changed**

File: `src/components/manguito-theme/lib/dropdown/DropdownContent.vue`

Line 19:
```diff
-const contentRef = ref<HTMLAreaElement>()
+const contentRef = ref<HTMLDivElement>()
```

**Why**

`HTMLAreaElement` is the TypeScript type for `<area>` elements used inside image maps — it is not related to the `<div>` element that `contentRef` is attached to in the template (`<div ref="contentRef" ...>`). This is a wrong type on a template ref. The incorrect type means TypeScript's type checker accepts calls on `contentRef.value` that are only valid for `HTMLAreaElement` and would flag correct `HTMLDivElement` usage as errors. The DOM method called on this ref — `contentRef.value.getBoundingClientRect()` — exists on both types so no runtime error occurs, but the type annotation is semantically wrong.

`HTMLDivElement` is the correct type because the ref is bound to a `<div>` element. `HTMLElement` would also be acceptable as the more general base type, but `HTMLDivElement` is the most precise.

Source: audit doc `06-general-architecture.md` § 10.

**Breaking change?**

No. This is a TypeScript type annotation only. The compiled JavaScript output is identical.

**Verification**

```bash
grep -n "HTMLAreaElement" src/components/manguito-theme/lib/dropdown/DropdownContent.vue
# expected: no output

grep -n "HTMLDivElement" src/components/manguito-theme/lib/dropdown/DropdownContent.vue
# expected: line 19 containing ref<HTMLDivElement>()
```

Running `vue-tsc --noEmit` in `src/components/manguito-theme/` should produce no new type errors after this change.

---

## Fix 5 — Restrict `width` prop in `Sidebar.vue` to `number` only

**What changed**

File: `src/components/manguito-theme/lib/sidebar/Sidebar.vue`

Line 20 in the `defineProps` block:
```diff
-    width?: string | number
+    width?: number
```

No changes to the default value (`width: 300`) or to the template expression that uses it (`'--sidebar-width': \`${props.width}px\``), because both were already correct for a `number`-only type.

**Why**

The prop type declaration accepted `string | number`, but the computed property `handleStyleVariables` unconditionally interpolated the value as a pixel count:

```ts
'--sidebar-width': `${props.width}px`
```

If a consumer passed a string such as `'50%'`, this would produce the CSS value `50%px`, which is invalid and silently ignored by the browser. The sidebar would then fall back to `width: 100%` (the `.sidebar-body` default) at all viewport widths, with no error or warning. The `string` branch of the union type was broken by design and could never be used correctly. Removing it makes the contract accurate and prevents consumers from passing values that produce silent layout failures.

Source: audit doc `03-prop-naming.md` (Sidebar.vue `width` entry).

**Breaking change?**

Yes, if any consumer is currently passing a string value to `width`. In practice, passing a string produced broken layout silently, so the "breaking change" removes a never-functional code path. Document in the changelog: _The `width` prop of `Sidebar` now only accepts `number` (pixels). String values were accepted previously but always produced invalid CSS and had no effect; they are no longer accepted by the type system._

**Verification**

```bash
grep -n "width.*string" src/components/manguito-theme/lib/sidebar/Sidebar.vue
# expected: no output

grep -n "width.*number" src/components/manguito-theme/lib/sidebar/Sidebar.vue
# expected: the prop definition line showing width?: number
```

TypeScript consumers passing a string to `:width` will now get a compile-time error, which is the desired outcome. Consumers passing a number (the documented default of `300`) are unaffected.
