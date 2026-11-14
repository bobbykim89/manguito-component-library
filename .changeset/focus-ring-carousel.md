---
'@bobbykim/mcl-carousel': minor
---

Breaking: requires `@bobbykim/manguito-theme` 1.6.0 or later CSS (`mcl-theme-v4.css`); with an older theme CSS, focus rings on these components do not compile. The previous and next arrows use the shared two-tone keyboard focus ring instead of a ring in the button colour (which was 1.37:1 on a light background with the default `light-4` buttons), and no longer show a ring after a click.
