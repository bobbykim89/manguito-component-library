# Accessibility Audit

## Overview

This document audits the manguito-component-library codebase for ARIA attribute coverage, keyboard navigation, focus management, and screen reader concerns. The components examined are `Modal`, `Sidebar`, `Collapse`, `Tooltip`, `Dropdown`, `Tabs`, and the `mcl-forms` package.

---

## 1. Modal (`manguito-theme/lib/modal/Modal.vue`)

### Missing ARIA roles and attributes

The modal overlay and dialog container have no ARIA roles at all.

```html
<!-- current -->
<div :style="handlePlacementVar" :visible="toggle" ref="modalRef">
  ...
  <div v-if="toggle" class="vertical-placement px-xs fixed z-[110] w-full ...">
    <div v-click-outside="closeModal" ...>
```

- No `role="dialog"` on the dialog container.
- No `aria-modal="true"` to inform screen readers that content outside the dialog is inert.
- No `aria-labelledby` pointing to the title element.
- No `aria-describedby` for body content.

### Keyboard navigation and focus management

- When the modal opens, focus is **not moved** into the dialog. A screen reader or keyboard user's focus stays wherever it was on the page.
- There is no **focus trap** implemented. Tabbing freely moves focus outside the visible dialog.
- When the modal closes, focus is **not returned** to the trigger element.
- The close button inside the default header slot has no accessible label:
  ```html
  <button @click="closeModal">
    <svg ...>...</svg>  <!-- no aria-label -->
  </button>
  ```
- The backdrop `<section>` element is interactive (click closes the modal) but has no role or label for assistive technology.

### Screen reader concerns

- The `visible` attribute is a custom non-standard HTML attribute used as a DOM communication channel between the `vToggle` directive and `observeVisibleAttr`. Screen readers are unaware of this attribute; it is not `aria-hidden` toggling or `inert`, so off-screen content may still be announced.

---

## 2. Sidebar (`manguito-theme/lib/sidebar/Sidebar.vue`)

The sidebar has the same structural issues as the modal.

- The root wrapper has no ARIA role (should be `role="dialog"` or `role="complementary"` / `<aside>` depending on purpose).
- No `aria-modal="true"`, `aria-labelledby`, or `aria-describedby`.
- The two close buttons (one for `placement="left"`, one for `placement="right"`) both render an SVG with no accessible label:
  ```html
  <button @click="closeSidebar" v-if="placement === 'right'">
    <svg ...>...</svg>  <!-- no aria-label -->
  </button>
  ```
- Duplicated close-button structure: instead of a single button that conditionally flips position, two separate `<button>` blocks are rendered based on placement. This is a minor redundancy but also means the accessible name fix must be applied in two places.
- Same missing focus trap and focus restoration issues as the modal.

---

## 3. Collapse (`manguito-theme/lib/collapse/Collapse.vue`)

The base `Collapse` component itself is a wrapper that renders its slot inside a `<Transition>`. It does not add any ARIA attributes related to expand/collapse state.

Consumer components (`MclCollapseA`, `MclCollapseB`, `NavCollapse`) use the `v-collapse` directive to toggle the collapse via a trigger element. The trigger is typically a `<div>` or `<button>`:

```html
<!-- MclCollapseA -->
<div class="py-xs px-sm cursor-pointer ..." v-collapse:[collapseId]>
```

Issues:
- The trigger is a `<div>`, not a `<button>`. It is not reachable by keyboard (no `tabindex`, not a native interactive element), and its role is not conveyed to assistive technology.
- No `aria-expanded` attribute on the trigger to indicate current state.
- No `aria-controls` linking the trigger to the controlled region.
- The controlled region (`<div :id="collapseId">`) has no `role="region"` or `aria-labelledby`.

`MclCollapseB` has the same structure. `NavCollapse` in `mcl-header` uses a `<button>` for the trigger (better), but it still lacks `aria-expanded` and `aria-controls`.

---

## 4. Tooltip (`manguito-theme/lib/tooltip/index.ts` and `tooltip.directive.ts`)

The `Tooltip` render function correctly adds `role="tooltip"` to the tooltip element:

```ts
return () =>
  h('div', {
    class: classList.value,
    role: 'tooltip',
    innerHTML: props.title,
    ...
  })
```

However, several problems exist:

- **`innerHTML` use**: `props.title` is injected via `innerHTML` without sanitization. If any consumer passes user-controlled content here, this is an XSS risk and also allows arbitrary HTML that could confuse screen readers.
- **No `id` on the tooltip element**: The WAI-ARIA tooltip pattern requires the trigger element to have `aria-describedby` pointing to the tooltip's `id`. Neither the directive nor the component sets an `id` on the tooltip or an `aria-describedby` on the host element.
- **Debug `console.log`** left in `tooltip.directive.ts` (line 78):
  ```ts
  console.log(`color: ${tooltipColor}, txt color: ${tooltipTextColor}, width: ${tooltipWidth}`)
  ```
  Not an accessibility issue, but indicates the tooltip directive is not production-ready.
- The tooltip is only triggered on `group-hover` (CSS). There is no keyboard trigger (`focus`), so keyboard-only users receive no tooltip.

---

## 5. Dropdown (`manguito-theme/lib/dropdown/`)

`DropdownContainer` and `DropdownContent` together implement a dropdown pattern.

- The toggler slot has no required ARIA contract — the `toggler` slot renders whatever the consumer provides with no guaranteed `aria-haspopup` or `aria-expanded`.
- `DropdownContent` uses `v-if` for content visibility, which is good (content is removed from the DOM when closed), but there is no `role="menu"` / `role="listbox"` on the dropdown content container.
- No keyboard management beyond `@keyup.esc="onEscape"`. Arrow-key navigation through items is not handled.

---

## 6. Tabs (`manguito-theme/lib/tabs/TabContainer.vue`, `TabContent.vue`)

`TabContainer` adds `role="tablist"` to the button container div, which is correct:

```html
<div :class="btnContainerClass" role="tablist">
```

`TabContent` adds `role="tabpanel"` and `tabindex="-1"`, which is also correct:

```html
<div ... role="tabpanel" tabindex="-1" v-show="isActive">
```

However:
- The tab buttons themselves are provided via a scoped slot. No `role="tab"`, `aria-selected`, or `aria-controls` is enforced or documented on the button items.
- There is no `aria-labelledby` connecting each `tabpanel` to its corresponding tab button.
- Keyboard navigation between tabs (arrow keys) is not implemented at the container level. The WAI-ARIA Tabs pattern requires left/right arrow key movement between tabs.

---

## 7. Form Components (`mcl-forms`)

### `MclInputText` / `MclTextArea`

- Both render an `<input>` / `<textarea>` with an `id` prop, which is correct for label association via `<MclFormGroup>`'s `labelFor`.
- No `aria-invalid` attribute when the field has a validation error (the `invalidFeedback` slot is shown via CSS peer-validation selectors, but there is no programmatic signal for screen readers).
- The `invalidFeedback` span has no `role="alert"` or `aria-live` region, so errors are not announced.
- There is a typo in the peer selector: `peer-inavlid/validation` (should be `peer-invalid/validation`), meaning the validation error slot never shows.

### `MclInputFile`

- The browse button has no accessible label associating it with the file input:
  ```html
  <button ... @click="onButtonClick">{{ buttonText }}</button>
  <input type="file" :id="id" ... />
  ```
  The button and the hidden file input are not associated. The file input has an `id` but the button does not use `aria-controls` or `<label>`.

### `MclCheckbox`

- The `<input type="checkbox">` is `appearance-none` (visually hidden) and the visual checkbox is a `<span>`. The input has the correct `id` for label association, but if `v-model` binding leaves the hidden input unfocusable (some implementations do), keyboard access is lost.
- No explicit `aria-label` or `aria-labelledby` on the input if no `<MclFormGroup>` wrapper is provided.

### `MclInputSwitch`

- Same pattern: a hidden `<input type="checkbox">` drives state, and a visual `<span>` is the click target. The visual element is not keyboard-reachable on its own.
- No `aria-checked` or `role="switch"` on the visual element.

### `MclInputRadio`

- The `<input type="radio">` is also `appearance-none`. The visual indicator is a `<span>` with a click handler. The span lacks `tabindex`, `role`, and `aria-*` attributes.

### `MclSelect`

The custom select is the most complex form component:
- The `<input>` element has `role="combobox"`, `aria-autocomplete="list"`, and `aria-expanded` — this is a good start.
- The `<ul>` has `role="listbox"` and individual `<li>` items have `role="option"` — also correct.
- However, the combobox input is missing `aria-owns` (or `aria-controls`) pointing to the listbox `id` (the listbox has no `id`).
- `aria-activedescendant` is not set on the input, which is required so screen readers know which option is currently highlighted.
- When the dropdown closes after selection, focus returns to the input but no `aria-selected` state is communicated.

---

## Recommended Approaches

| Component | Key Actions |
|---|---|
| **Modal / Sidebar** | Add `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, focus trap on open, return focus on close, accessible label on close button |
| **Collapse triggers** | Use `<button>` (not `<div>`), add `aria-expanded`, `aria-controls` |
| **Tooltip** | Add unique `id` to tooltip, add `aria-describedby` to host, support `focus` trigger not only hover, sanitize `innerHTML` |
| **Dropdown** | Add `role="menu"` / `role="listbox"`, arrow-key navigation, `aria-haspopup` on trigger |
| **Tabs** | Enforce `role="tab"`, `aria-selected`, `aria-controls` on tab buttons; add arrow-key navigation at container level |
| **Form inputs** | Add `aria-invalid`, `aria-describedby` pointing to error message, `role="alert"` on error container; fix the typo in peer selector |
| **Custom select** | Add `aria-controls` / `aria-owns` + `id` on listbox, set `aria-activedescendant` on combobox input |
