---
'@bobbykim/manguito-theme': patch
'@bobbykim/mcl-forms': patch
'@bobbykim/mcl-cards': patch
---

Animated components respect `prefers-reduced-motion: reduce`. `Modal`, `Sidebar`, `DropdownContent`, `CarouselContainer`, `TabContainer`, `HeaderVertical`'s mobile menu and `MclSelect`'s options fade in place instead of sliding. `Collapse` and `HeaderHorizontal`'s mobile menu open and close instantly. `MclCardD`'s spinning border gradient holds still. Nothing changes for users without the setting.
