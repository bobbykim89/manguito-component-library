# Phase 4 — Accessibility Decisions

This document records the architectural decisions made before implementing the Phase 4 accessibility fixes. It is the authoritative reference for implementation choices in `mcl-82/phase-04-accessibility`.

---

## New Dependencies

All three are added to `manguito-theme`'s `dependencies` (not devDependencies — they ship with the package).

| Package | Purpose |
|---|---|
| `@vueuse/integrations` | Provides `useFocusTrap` composable (SSR-safe wrapper) |
| `focus-trap` | Required peer dep of `@vueuse/integrations`; the underlying trap engine |
| `isomorphic-dompurify` | HTML sanitization for `v-html` / `innerHTML` usage; SSR-safe |

**Why `@vueuse/integrations` over a custom focus trap?**
VueUse composables are SSR-safe by design and integrate naturally with Vue 3's lifecycle. Writing a custom focus trap duplicates well-tested work. `focus-trap` must be installed alongside `@vueuse/integrations` because it is a required peer dependency, not optional.

---

## 4a — Modal & Sidebar

### ARIA attributes
- Add `role="dialog"` and `aria-modal="true"` to the dialog container.
- Wire `aria-labelledby` to the component's existing `id` prop (both Modal and Sidebar already expose an `id`).

### Focus trap
- Use `useFocusTrap` from `@vueuse/integrations`.
- Activate on open, deactivate on close, tied to the existing `toggle` / `visible` reactive state.

### Focus return
- Store `document.activeElement` at the moment the dialog opens (inside the open handler / `watch` — client-side only via lifecycle, no SSR guard needed beyond that).
- Restore it on close via `.focus()`.

### Close button accessible label
- Add `aria-label="Close"` to the close button SVGs.
- Sidebar renders two close button blocks (one per `placement`); both receive the label.

---

## 4b — Collapse triggers

### Trigger element
- Change `<div v-collapse>` to `<button type="button">` in `MclCollapseA` and `MclCollapseB`.
- Reset any default button browser styling via existing utility classes.

### `aria-expanded`
- Introduce a local `isOpen` ref in each component to drive `aria-expanded`.
- The click handler updates `isOpen` alongside the existing `v-collapse` call.
- **Known Phase 4 limitation**: when an accordion sibling closes this component externally (via `vCollapse` DOM manipulation), the local `isOpen` ref will not update, leaving `aria-expanded` stale. This is resolved in Phase 5 when `vCollapse` is replaced with a `provide`/`inject` composable.

### `aria-controls` and region role
- Add `aria-controls` on the trigger pointing to the existing `:id="collapseId"` on the collapse region.
- Add `role="region"` and `aria-labelledby` on the collapse region pointing back to the trigger button's `id`.

### `NavCollapse` in `mcl-header`
- Already uses `<button>` — only needs `aria-expanded` and `aria-controls` added.

---

## 4c — Form validation announcements

### `aria-invalid` mechanism
- Add a new **`:invalid` boolean prop** (default `false`) to `MclInputText`, `MclTextArea`, and `MclSelect`.
- Bind `aria-invalid="true"` when the prop is true.
- **Why a prop, not `ValidityState` check?** A component library must be framework-agnostic. Consumers may use Vuelidate, VeeValidate, native constraint validation, or nothing. A prop makes the state explicit and SSR-safe (no browser API calls at render time).

### Error announcement
- Add `role="alert"` to the `invalidFeedback` error container in `MclInputText`, `MclTextArea`, and `MclSelect` so errors are announced by screen readers when they appear.

### `MclInputFile`
- Associate the browse button with the file input via `aria-controls` pointing to the input's `id`, or restructure with a `<label>` wrapping the hidden input.

### `MclCheckbox`, `MclInputSwitch`, `MclInputRadio`
- These use `appearance-none` hidden native inputs with visual `<span>` elements.
- The native `<input>` must remain focusable and reachable by keyboard — verify `appearance-none` does not suppress focus on the actual input.
- `MclInputSwitch`: add `role="switch"` and `aria-checked` to the visual element if the input is not directly keyboard-reachable; otherwise the native `<input type="checkbox">` semantics are sufficient.
- `MclInputRadio`: same pattern — native `<input type="radio">` semantics are preferred over custom ARIA if the input is keyboard-reachable.

---

## 4d — MclSelect ARIA combobox completion

The component already has `role="combobox"`, `aria-autocomplete`, `aria-expanded`, `role="listbox"`, and `role="option"`. The missing wiring:

- Add a stable `id` to the listbox `<ul>`.
- Add `aria-controls` on the combobox `<input>` pointing to that `id`.
- Set `aria-activedescendant` on the input to the `id` of the currently highlighted `<li>`.
- Each `<li>` option needs a unique `id` (e.g., `${componentId}-option-${index}`) and `aria-selected` bound to whether it is the selected value.

---

## 4e — Tooltip

### Unique ID
- Use `useId()` from Vue 3.5 (available — project targets `^3.5.13`).
- Assign the generated id to the tooltip element.

### `aria-describedby`
- Set `aria-describedby` on the host element pointing to the tooltip's `id`.
- Applied in the directive (`tooltip.directive.ts`) where the host element is available.

### Keyboard trigger
- Add `focus` and `blur` event listeners on the host element alongside the existing CSS `group-hover`.
- Show tooltip on focus, hide on blur.

### HTML sanitization
- Replace `innerHTML` injection of `props.title` with `isomorphic-dompurify`'s `sanitize()`.
- `isomorphic-dompurify` returns an empty string on the server (no DOM available), which is safe.
- This protects all `v-html` / `innerHTML` usage in the tooltip; the broader `v-html` audit across other components is deferred to Phase 6.

---

## Known Limitations (accepted for Phase 4)

| Limitation | Resolution |
|---|---|
| `aria-expanded` on accordion-sibling-closed collapses will be stale | Phase 5 replaces `vCollapse` with `provide`/`inject`; state will be reactive at that point |
