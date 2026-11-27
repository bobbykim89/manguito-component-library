---
'@bobbykim/mcl-dropdown': minor
---

Keyboard and screen-reader fixes for `MclDropdownA` (#135).

- **The toggle button announces its state.** It has `aria-expanded` and `aria-controls` (pointing at the list).
- **Choosing an item returns focus to the toggle button**, instead of dropping it on `<body>` when the list closes.
- **The toggle and the items are `type="button"`**, so they no longer submit an enclosing `<form>`.
- **Arrow keys.** Changes: Up and Down are handled on `keydown` (was `keyup`), only while the list is open and focus is on the toggle or an item.
  - They call `preventDefault()`, so the page no longer scrolls.
  - They no longer throw (Arrow Up before any item was focused, or any arrow while the list was closed).
  - They move from whichever item has focus, so they agree with Tab.
  - Down from the toggle focuses the first item. Up and Down stop at the first and last item.

Needs the `@bobbykim/manguito-theme` minor release from the pending #128 changeset (the toggle attributes and focus return come from its dropdown). The two publish together.
