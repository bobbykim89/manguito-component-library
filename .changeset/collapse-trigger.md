---
'@bobbykim/manguito-theme': minor
---

New `useCollapseTrigger` composable (from `@bobbykim/manguito-theme/composable`) gives a hand-built trigger for the base `Collapse` its `aria-expanded` and `aria-controls`. Pass it the Collapse's template ref and `id` (and `visible`, if it starts open); bind the returned `attrs` on the button and call `toggle` on click. `aria-expanded` follows the panel, including inside an `AccordionGroup`, and is already correct in server-rendered HTML.
