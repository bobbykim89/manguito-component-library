---
'@bobbykim/mcl-header': minor
---

Keyboard and screen-reader fixes for `MclHeaderA` and `MclHeaderB` (#131).

- **The site title is no longer a heading by default.** It was a hard-coded `<h2>` (`MclHeaderA`) or `<h3>` (`MclHeaderB`) on every page. It now renders as a `<span>` with the same look. To keep a heading, set the new `titleLevel` prop (`'h1'`–`'h4'`).
- **The logo link** is out of the tab order and hidden from screen readers (`tabindex="-1"`, `aria-hidden="true"`); the title link next to it carries the name. Mouse clicks are unchanged.
- **New `current` flag** on `MenuItemType` (menu items and submenu children). The link gets `aria-current="page"` and keeps its highlight on.
- **`showHighlight: false` now takes effect in `MclHeaderA`.** The prop never reached the nav links and submenus, so the highlight bar always showed. Sites that set it to `false` will no longer see the bar under nav links or the tinted strip in mobile submenus.
- **Submenu buttons** (desktop dropdown, mobile and sidebar collapses) have `aria-expanded`, `aria-controls` and `type="button"`. Panel ids are generated per instance (`useId()`), no longer built from the item title.
- **Focus is no longer lost** when a choice closes what held it:
  - The desktop dropdown returns focus to its button.
  - A `MclHeaderB` sidebar submenu moves focus to its button.
  - Both mobile menus return focus to the menu button (also covered by tests now).
- **Desktop dropdown arrow keys** (`MclHeaderA`): Up and Down are handled on `keydown` (was `keyup`), only while the dropdown is open and focus is on its button or a link. They call `preventDefault()`, no longer throw, follow the focused link, and stop at the first and last link.
- **New-tab links** (`target: '_blank'`) include hidden "(opens in a new tab)" text.
- **Focus ring.** `MclHeaderA`'s nav links and submenu buttons use the shared focus ring instead of `outline-none`.

Needs the `@bobbykim/manguito-theme` minor release from the pending #128 changeset (the dropdown attributes and the focus return in the dropdown and both mobile menus come from it). The two publish together.
