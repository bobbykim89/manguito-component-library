---
'@bobbykim/mcl-header': patch
---

`showDrawerBorder` on `MclHeaderA` and `MclHeaderB` now takes effect: it was passed to the base header under a name it doesn't declare, so the menu button always had a border. `scrollDistance` on `MclHeaderA` now reaches the base header too, so it sets how far the page scrolls before a `fadeInOnScroll` header fades (it was always 50px).
