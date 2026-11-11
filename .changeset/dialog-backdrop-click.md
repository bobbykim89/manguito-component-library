---
'@bobbykim/manguito-theme': patch
---

Fix `Sidebar` and `Modal` ignoring backdrop clicks after a prop change re-rendered them. `vClickOutside` no longer re-registers its listener on re-renders that pass the same handler, and the dialogs' focus trap now lets outside clicks through while still trapping Tab focus.
