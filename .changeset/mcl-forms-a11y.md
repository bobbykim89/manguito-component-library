---
'@bobbykim/mcl-forms': minor
---

Labelling, naming and announcement fixes for every form control (#130).

- **A control's own `id` inside `MclFormGroup` is now labelled.** Before, `<mcl-form-group label="Email"><mcl-input-text id="email"/></mcl-form-group>` rendered a label whose `for` pointed at the group's id, so the input had no label and `field-id` was needed as a workaround. The label's `for` now follows the control's id after mount. Text inputs, textareas, selects and file inputs also take the group label as `aria-labelledby`, so they're named in server-rendered HTML too. Checkboxes, radios and switches keep the name from their own `<label>`.
- **Attributes reach the focusable element.** Every control now sets `inheritAttrs: false`. `class` and `style` stay on the wrapper as before. Everything else moves to the `<input>`, `<textarea>`, or the combobox input: `aria-label`, `aria-labelledby`, `title`, `data-*`, `autofocus` and event listeners. So `@focus` and `@blur` now fire, and selectors like `[data-testid]` now match the input instead of the wrapper. The component keeps control of `id`, `name`, `type`, `role`, `required`, `disabled` and the `aria-*` state attributes it sets; use the props for those. An `aria-label` or `aria-labelledby` you pass wins over the group label.
- **Required groups show it.** When `MclFormGroup` has `required`, its label or legend shows a ` *` (hidden from screen readers). In fieldset mode (`group-label`), the legend also says "(required)" to screen readers.
- **Required checkbox and switch sets** no longer pass `required` to every box, which made native validation demand that all of them be checked. A checkbox's or switch's own `required` prop still works, and radios still inherit it.
- **`MclInputFile`'s Browse button** is no longer a separate tab stop or announced to screen readers; the labelled native file input is the control. Clicking the button still opens the picker.
- **`MclSelect`** opens on the chosen option, as a native select does: it is highlighted, named by `aria-activedescendant`, and the arrow keys start from it. `aria-selected` now follows the highlighted option; a custom `dropdown` slot should set `aria-selected` from its `activeIndex`. The listbox takes the combobox's name, and "No match." is announced through a status region that is always present.
- **Reduced motion:** the focus highlight bar, `MclSelect`'s highlight and caret, and `MclInputSwitch`'s slider no longer animate under `prefers-reduced-motion`.
