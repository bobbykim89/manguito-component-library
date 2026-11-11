---
'@bobbykim/manguito-theme': patch
'@bobbykim/mcl-carousel': patch
'@bobbykim/mcl-collapse': patch
'@bobbykim/mcl-container': patch
'@bobbykim/mcl-dropdown': patch
'@bobbykim/mcl-header': patch
'@bobbykim/mcl-hero': patch
'@bobbykim/mcl-tabs': patch
---

Decorative inline SVGs (chevrons, arrows, close icons, section dividers) now have `aria-hidden="true"` and `focusable="false"`, so screen readers skip them and they never take keyboard focus. Every one sits in a control that is already named, or is pure decoration, so no accessible name changes.
