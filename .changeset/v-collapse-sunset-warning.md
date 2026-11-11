---
'@bobbykim/manguito-theme': patch
---

`vCollapse` now logs a warning once per page when mounted: it no longer works with any collapse component, including the base `Collapse`. It stays exported until the next major release. The README now documents `Collapse`'s `custom-class` prop (it still said `class-name`) and the `v-collapse` migration.
