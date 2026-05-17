---
name: fix-accessibility
description: Apply standard accessibility fixes to a Vue component in this library based on its type (overlay, collapse, form, tooltip). Use when a component needs ARIA attributes, keyboard support, or focus management. Accepts a component file path as argument.
---

# Fix Accessibility

Apply accessibility fixes to the component at `$ARGUMENTS`.

## Process

1. Read the component source.
2. Identify the component type from the template structure (see types below).
3. Apply only the fixes relevant to that type — do not add attributes that don't apply.
4. Verify that any added `id` references (e.g. `aria-controls`, `aria-labelledby`) point to elements that actually exist in the template.
5. Report what was changed.

## Fix sets by component type

### Overlay (Modal, Sidebar, Drawer)
- Add `role="dialog"` to the root overlay element
- Add `aria-modal="true"` to the same element
- Add `aria-labelledby="<title-element-id>"` — ensure the title element has a matching `id`
- Ensure the close button is a `<button>` element with `aria-label="Close"`
- Add `@keydown.esc` handler that calls `closeModal()` / `closeSidebar()`

### Collapse / Accordion (MclCollapseA, MclCollapseB, nav collapse variants)
- Trigger element must be `<button>`, not a `<div>` or `<a>`
- Add `:aria-expanded="isOpen"` to the trigger button
- Add `aria-controls="<content-element-id>"` to the trigger; ensure content element has matching `id`
- Add `id` to the content wrapper if missing

### Form inputs (MclInputText, MclTextArea, MclSelect, etc.)
- Ensure `<label>` has `for` matching the input's `id`, or the input has `aria-label`
- Add `:aria-invalid="!isValid"` to the input element (bound to the component's validation state)
- Wrap error message in `<span role="alert">` or `<p role="alert">`
- Fix any `peer-invalid` typos — the correct Tailwind class is `peer-invalid` (one word, no space)

### Tooltip (vTooltip / MclTooltip)
- Trigger element needs `aria-describedby="<tooltip-id>"`
- Tooltip element needs matching `id`
- Tooltip element needs `role="tooltip"`

### Tab (TabContainer / TabContent)
- Tab list wrapper needs `role="tablist"`
- Each tab trigger needs `role="tab"` and `:aria-selected="isActive"`
- Each tab panel needs `role="tabpanel"` and `aria-labelledby="<tab-id>"`

## Rules

- Never add `aria-*` attributes that reference IDs not present in the template — create the IDs first.
- Do not change component logic, only the template markup and event handlers.
- If a fix requires exposing new state (e.g. `isValid`) that doesn't exist yet, note it as a manual follow-up rather than inventing it.
- If `vToggle` or `vCollapse` is still present on a trigger, note it but do not remove it in this pass — that is a separate migration.

## Output

List each change made:
```
Fixed: <ComponentName>
- Added role="dialog" and aria-modal to overlay wrapper
- Added aria-labelledby; added id="modal-title" to title element
- Replaced <div @click> with <button aria-label="Close"> for close trigger
Manual follow-up: <any items, or "none">
```
