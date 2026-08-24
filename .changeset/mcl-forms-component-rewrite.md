---
'@bobbykim/mcl-forms': minor
---

Rewrite all eight components onto the shared composable foundation.

Accessibility: the three toggle controls gain a visible focus indicator (they had none); MclTextArea, MclSelect and MclInputFile gain error regions; error regions are now inserted rather than CSS-hidden, so `role="alert"` actually announces; MclSelect follows the ARIA combobox pattern with keydown handling, Home/End/Tab/Alt+ArrowDown, real buttons for its clear and caret controls, and a `role="status"` no-match region; every control gains `disabled`.

Fixes: MclInputFile's clear button no longer submits a surrounding form and no longer fires twice per click; MclInputSwitch no longer double-toggles; MclSelect's option filter no longer throws on a regex metacharacter; MclSelect's `required` prop is bound for the first time; the `dark-4` colour typo in the checkbox and switch maps is gone.

BREAKING CHANGES:
- `MclFormGroup`: `labelFor` renamed to `fieldId` and now optional.
- Toggles: `inputSize`/`radioSize`/`switchSize` renamed to `size`; `checkColor`/`checkedColor`/`sliderColor` renamed to `indicatorColor`; `onColor` to `checkedBgColor`; `offColor` to `bgColor`.
- `MclCheckbox`/`MclInputRadio`: the `checked` prop is removed in favour of `v-model`; `checkbox-click` becomes `change(event)` and `change` now carries only the native Event.
- `MclInputRadio`: `bgColor` changed meaning, not just its default. It was the box's only, always-visible colour, defaulting to `success`; it is now the **unchecked** colour, defaulting to `light-1`, and the always-on look moved to the new `checkedBgColor` (default `success`). The prop still exists and still takes the same values, so nothing errors and no rename catches it — `bgColor="primary"` simply renders differently: primary is now what an *unselected* radio shows, while a selected one shows `checkedBgColor`. Pass `checkedBgColor` to restore the old appearance.
- All controls: `id` is optional, and `invalid`/`required`/`disabled` no longer default to `false` — `undefined` means "inherit from `MclFormGroup`".
- `MclInputText`: the `peer-invalid` CSS that displayed errors from native validity is removed; bind `:invalid` instead.
- `MclSelect`: Escape closes the listbox and keeps the value; a second Escape clears it.
- Fixing the `dark-4` typo changes the rendered colour for anyone passing `dark-4`.
- `MclSelect`'s `dropdown` slot: the `optionClick` handler's signature changed from `(event, option)` to `(option)`.
- `MclSelect`'s `no-match` slot moved out of the `<ul>` into a sibling `role="status"` region; a consumer overriding it with an `<li>` will now render an orphaned list item.
- `MclSelect`: the clear action and Escape now write `null` where they previously wrote `''`.
- `MclSelect`'s active-option background now uses `optionHoverColor` where it previously used `highlightColor`; a consumer who set only `highlightColor` loses their highlight colour.

Additive:
- All seven controls (everything except `MclFormGroup`) newly declare a `name` prop, so they can be posted by a plain form without a wrapper.
- `MclSelect` carries its `name` on a hidden input holding the model value, not on the combobox text input, whose value is the display label — `name="colour"` with a model of `2` posts `2`, not `Green`.
- `MclInputText` gains an `autocomplete` prop.
- `MclTextArea`, `MclSelect` and `MclInputFile` gain an `invalidFeedback` prop and an `invalid-feedback` slot, none of which they had before; `MclInputFile` also gains `invalid`, which it previously had no way to express.
- `MclInputRadio` gains a `borderColor` prop, colouring the border and the focus ring.
- `MclSelect` gains `data-mcl` attributes on its clear and caret buttons.
