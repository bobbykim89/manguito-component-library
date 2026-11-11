---
'@bobbykim/manguito-theme': minor
'@bobbykim/mcl-header': patch
'@bobbykim/mcl-footer': patch
---

Accessibility fixes from an axe and keyboard audit:

- Buttons inside `.btn-group` show the standard focus ring again (`outline: none` had removed it), and the focused button is raised so its neighbours don't cover the ring.
- `Alert`'s dismiss button is named (new `dismissLabel` prop, default "Dismiss"), hides its icon from screen readers, and no longer submits a surrounding form.
- `HeaderHorizontal`, `HeaderVertical`, `MclHeaderA` and `MclHeaderB` take `navLabel` (default "Main") for their `<nav>` landmarks and `menuLabel` (default "Menu") for the mobile menu button. The button's name no longer flips between "Open" and "Close"; `aria-expanded` carries the state.
- `MclFooterA` takes `navLabel` (default "Footer"). Its social links are plain links (no `role="button"`), get `rel="noopener noreferrer"`, and are named by site with "(opens in new tab)".
