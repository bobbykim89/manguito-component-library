---
'@bobbykim/mcl-forms': patch
---

Fix a TS2305 build error in MclCheckbox and MclInputSwitch, which still imported the ColorMap type after it was removed. Both now annotate their local maps with the equivalent Record<ColorPalette, string>. No behaviour or API change.
