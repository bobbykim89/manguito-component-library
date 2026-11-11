---
'@bobbykim/manguito-theme': minor
'@bobbykim/mcl-collapse': patch
---

`Collapse`'s `visible` prop now works inside `AccordionGroup`: a panel that starts `visible` opens (if several do, the first one wins), and changing `visible` later opens or closes it. `Collapse` also exposes its read-only `isOpen` state through its template ref. `MclCollapseA` and `MclCollapseB` now read their header's `aria-expanded` and chevron from it, so the header no longer reports an item as expanded while its panel is closed.
