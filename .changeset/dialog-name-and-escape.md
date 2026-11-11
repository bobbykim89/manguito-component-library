---
'@bobbykim/manguito-theme': minor
---

`Modal` and `Sidebar` now close on Escape and return focus to the element that opened them. Before, Escape released the focus trap and left the dialog open. They also always get an accessible name: the `#header` slot receives a `titleId` to put on a custom heading, and a new `ariaLabel` prop names a dialog that has no visible title.
