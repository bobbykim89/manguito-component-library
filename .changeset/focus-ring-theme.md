---
'@bobbykim/manguito-theme': minor
---

New two-tone keyboard focus ring. A focused `.btn` now shows a 3px outline in `--mcl-focus-color` (default `dark-3`) with a 2px halo in `--mcl-focus-halo` (default `light-1`) instead of an outline in the button's own colour, so the ring contrasts with any background (the old ring was as low as 1.37:1 on light pages). It follows `:focus-visible`: clicking a button no longer leaves a ring, and the progress fill and button-group lift also react to keyboard focus only. The same ring is available as the `mcl-focus-ring` utility (`focus-visible:mcl-focus-ring`). `btn-no-ring` is deprecated and no longer hides keyboard focus; buttons that used it now show the ring when reached with Tab.
