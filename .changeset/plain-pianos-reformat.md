---
'@bobbykim/manguito-theme': patch
'@bobbykim/mcl-cards': patch
'@bobbykim/mcl-carousel': patch
'@bobbykim/mcl-collapse': patch
'@bobbykim/mcl-container': patch
'@bobbykim/mcl-dropdown': patch
'@bobbykim/mcl-footer': patch
'@bobbykim/mcl-forms': patch
'@bobbykim/mcl-header': patch
'@bobbykim/mcl-hero': patch
'@bobbykim/mcl-tabs': patch
---

Formatting-only release: Prettier was reapplied across the repo after a
misconfigured `tailwindStylesheet` was fixed, which sorted Tailwind class
attributes and normalized wrapping in every package's source.

No public API, prop, or behavior changes. Class order within a `class`
attribute does not affect CSS resolution, so rendered output is identical —
only the shipped bundle text differs.
