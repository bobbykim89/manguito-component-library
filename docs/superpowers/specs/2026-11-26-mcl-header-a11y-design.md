# mcl-header accessibility fixes (#131)

## Intent

The audit (#128–#138) filed 16 findings against `mcl-header` in #131: `MclHeaderA` and its parts `NavLink`, `NavDropdown` and `NavCollapse`, `MclHeaderB` and its parts `NavLinkVertical` and `NavCollapseVertical`, the shared menu types, and one story component. This change fixes all 16, so both headers can be used with a keyboard and a screen reader. One visible change is opt-in (the current-page style), and one DOM change is on by default (the site title is no longer a heading).

The base components in `manguito-theme` were fixed in #128 (PRs #141 and #142), and `MclDropdownA` was fixed in #135 (PR #143). Much of this change uses what those provide:

- **`DropdownContainer` / `DropdownContent`:**
  - The `toggler` slot passes `attrs`: `aria-expanded`, plus `aria-controls` pointing at the content's id.
  - `itemClick()` returns focus to the toggler. This only works when the toggler's click calls `toggle($event)`, and `NavDropdown` already does.
  - Escape closes the menu and returns focus.
- **`HeaderHorizontal` / `HeaderVertical`:** `headerClose()` moves focus to the drawer button, but only when focus was inside the mobile panel. Closing from the desktop sidebar or bar never moves focus.
- **`useCollapseTrigger(collapseRef, { id, visible })`** (from `@bobbykim/manguito-theme/composable`): returns `{ attrs, isOpen, toggle }`. `attrs` holds `aria-expanded` and `aria-controls`.
- **`MclDropdownA.vue`'s `onArrowKey`** is the model for the dropdown arrow keys.

## Goals

Every checkbox in #131 gets resolved; the issue body is the checklist.

**1. Site title (decided by the maintainer: option B).**

- Both headers get a new prop, `titleLevel?: HeadingLevel` (`'h1' | 'h2' | 'h3' | 'h4'`, exported from `@bobbykim/manguito-theme`).
- When it is unset (the default), the title renders as a `<span>`:
  - In `MclHeaderA` it keeps the current classes.
  - In `MclHeaderB` it also gets `block`, so `mb-md text-center` still apply.
- When it is set, the title renders as that heading element.
- The look must not change either way. The size comes from `titleSize` through the existing class helpers, never from the element.
- This replaces the hard-coded `<h2>` in `MclHeaderA` and the two hard-coded `<h3>`s in `MclHeaderB` (desktop and mobile).

**2. Logo link (my call).**

- `title` is a required prop, so the title link always has a name.
- Every logo link takes `tabindex="-1"` and `aria-hidden="true"`: one in `MclHeaderA`, and two in `MclHeaderB` (desktop and mobile).
- Its images keep `:alt="logoAlt"`.
- Mouse clicks are unchanged.

**3. Focus is never lost to `<body>` when a menu choice closes what held it.**

- **Mobile drawers.** Both headers already route this through the base `headerClose()`, so focus goes to the drawer button. Tests pin it:
  - a top-level link and a collapse child in each header's mobile menu, with the default `menuItemAsLink: false`;
  - also the title link inside `MclHeaderB`'s mobile drawer.
- **`NavDropdown` (MclHeaderA desktop).** Choosing a child returns focus to the dropdown toggle, through the base `itemClick()`. A test pins it.
- **`NavCollapseVertical` (MclHeaderB).** Choosing a child still closes the collapse, as it does today (decided).
  - **Desktop sidebar:** after closing, focus moves to that collapse's toggle button.
  - **Mobile drawer:** the move must not happen. Focus must stay on the drawer button.
    - The order of calls is: the child emits `child-click`; `MclHeaderB.handleMenuClick` runs `closeDrawer()`, which already moves focus to the drawer button; only then does the collapse close itself.
    - So the collapse moves focus to its toggle only if focus is still inside its own panel when it closes.

**4. Disclosure buttons announce their state.**

- **`NavDropdown`'s toggle** binds the slot's `attrs` and is `type="button"`.
- **`NavCollapse` and `NavCollapseVertical`:**
  - Each uses `useCollapseTrigger` with an id from Vue's `useId()`, and binds `attrs` on its toggle, which is `type="button"`.
  - The `Collapse` gets that same id.
  - The ids built from titles are removed (`nav-${navId}` and `nav-${navLocation}-${navId}`).
  - The `navId` prop becomes unused on both. These components are internal (not exported from `lib/index.ts`), so the builder removes `navId` and the `:nav-id` bindings in `MclHeaderA` and `MclHeaderB`.
  - The rotate state of the chevron and the `label-click` payload's `open` flag keep working.
  - **The payload keeps today's value (my call).** Today `label-click` (and `MclHeaderA`/`MclHeaderB`'s `collapse-click`, which forwards it) reports the state from **before** the click:
    - **`NavCollapse` / `NavCollapseVertical`** emit `toggle.value`, which the `@open` / `@close` sync updates only after the emit.
    - **`NavDropdown`** passes the slot's not-yet-re-rendered `dropdownState`.
  - This change keeps that behaviour:
    - The `@open` / `@close` sync stays as the source of the payload.
    - `isOpen` may drive the chevron, but not the payload.
    - A unit test pins the payload value for one collapse.
  - Whether the payload should report the new state is a separate change.

**5. Arrow keys in `NavDropdown`** behave exactly as in `MclDropdownA` after #135, with one difference: items are links (`<a>`), not buttons.

- They are handled on `keydown` on the wrapper.
- They act only while the toggle has `aria-expanded="true"`, and only when focus is on the toggle or one of this dropdown's own items.
- When they act, they call `preventDefault()`.
- Down from the toggle focuses the first item; Up from the toggle does nothing.
- Up and Down move one item at a time and stop at the ends, without wrapping.
- The position comes from `document.activeElement`.
- Items are found by going from the toggle's `aria-controls` to that element's direct child links. This lookup stays scoped to this dropdown, even when another header dropdown's items are still fading out.
- `navIndexRef` and `navItemRef` are removed.

**6. Current page.**

- `MenuItemType` gets `current?: boolean`. Children of `MenuCollapseType` are `MenuItemType`, so they get it too.
- A link whose item has `current: true` renders `aria-current="page"`. That covers every link in all five places: `NavLink`, `NavLinkVertical`, the `NavDropdown` children, the `NavCollapse` children and the `NavCollapseVertical` children.
- It also shows its highlight permanently (decided: "shows its highlight bar all the time"). Per part (my calls on the details):
  - **`NavLink`:** the decorator bar is full width while current, the same style as on `:hover` / `:focus`. With `showHighlight` off there is no bar, so the link is underlined instead.
  - **`NavLinkVertical` and `NavCollapseVertical` children:** the `before:` bar is full width and the text uses the hovered colour, the same as on hover/focus. With `dHl` off, the text uses the hovered colour and is underlined.
  - **`NavDropdown` children:** the focus background (`focusBgColorVariant`) applies permanently.
  - **`NavCollapse` children** (they have no hover style today): underlined.
- Items without `current` look exactly as they do today.

**7. New-tab links.** Every link that can get `target="_blank"` gets hidden text when its target is `_blank`. The span is `<span class="sr-only"> (opens in a new tab)</span>`, matching `mcl-cards`.

- `NavLink` puts the title in `v-html` on the `<a>` itself, so the title moves to an inner `<span v-html>` to make room for the hidden span.
- This covers:
  - menu items in all five parts;
  - the title links (one in `MclHeaderA`, two in `MclHeaderB`).
- The logo links are hidden from assistive technology, so they don't need it.

**8. Visible focus.**

- The `outline-none` class is removed from `NavLink`'s link, `NavDropdown`'s toggle and `NavCollapse`'s toggle.
- Those three get `focus-visible:mcl-focus-ring` (the shared ring, defined in `manguito-theme/lib/style/mcl-theme-v4.css`).
- This wasn't in the audit; the maintainer agreed to include it.

**8a. `showHighlight` reaches MclHeaderA's menu parts (decided by the maintainer: fix it here).**

- **The bug.**
  - `MclHeaderA.vue` passes `:display-highlight="showHighlight"` to `NavLink`, `NavDropdown` and `NavCollapse`, at lines 193, 204, 236 and 248. The old prop name was missed in the `displayHighlight` → `showHighlight` rename.
  - So the value falls through as a plain `display-highlight` attribute on each part's root `div`, and every part keeps its default `showHighlight: true`.
- **The fix.**
  - All four bindings become `:show-highlight="showHighlight"`.
  - The stray `display-highlight` attribute disappears.
  - A unit test pins it: with `showHighlight: false`, `MclHeaderA` renders no `.nav__decorator`.
- **What consumers see.** Sites that set `showHighlight: false` stop seeing the highlight bar under nav links and the tinted strip in mobile submenus. The changeset says so.
- `MclHeaderB` passes `d-hl` correctly and is unaffected.

**9. Story fix.**

- In `src/stories/sections/mcl-header/mcl-header-b/HeaderBSlotItem.vue`, each of the three social SVGs is wrapped in a link with `aria-label` "GitHub", "LinkedIn" and "Instagram".
- The SVGs get `aria-hidden="true"` and `focusable="false"`, and lose `role="img"`.
- Each link gets a destination: the profile URL if the story already has one, otherwise `#`.

**10. #131 is closed off.**

- `headerA.stories.ts` and `headerB.stories.ts` set `parameters: { a11y: { test: 'error' } }` in `meta`.
- `pnpm test:storybook` passes.
- A keyboard play test in each file covers:
  - `MclHeaderA`: the desktop dropdown — open it, arrows, choose an item, focus back on its toggle.
  - `MclHeaderB`: the desktop sidebar collapse — open it, choose a child, focus on its toggle.

**11. Docs.** `MclHeaderA.mdx` and `MclHeaderB.mdx` document:

- `titleLevel` (and that the default is no longer a heading);
- `current` on menu items;
- the keyboard behaviour.

## Non-goals

- **The menu pattern.** No `role="menu"`, `aria-haspopup`, Home/End or typeahead, and no opening the dropdown with Down while it is closed.
- **Marking a dropdown or collapse parent** when one of its children is current.
- **Any change to `manguito-theme`, `mcl-dropdown`** or the base header components.
- **Sharing the arrow-key handler with `MclDropdownA`.** Approach B was rejected; it's a copy, with a comment pointing at #135.
- **Changes to emitted events or their payloads.**
- **Restyling anything** beyond the current-page style and the focus ring.

## Anti-goals

- **Different mouse behaviour.** Every click that opens, closes, navigates or emits today must do the same.
- **A visible change for consumers who don't opt in.** Without `current`, the header must look the same in the browser, with two exceptions:
  - the focus ring on keyboard focus;
  - the `showHighlight: false` fix (Goal 8a).
- **Focus moving** when the user didn't act from inside the thing that closed. For example, the desktop sidebar's `closeCollapse()` loop must not pull focus onto collapse toggles when a top-level link was clicked.
- **Arrow keys that are swallowed** while the dropdown is closed or focus is elsewhere.

## Constraints

- **Version.**
  - `@bobbykim/mcl-header` is at `0.8.9`.
  - Under the repo's 0.x convention, behaviour and DOM changes are a **minor** bump.
  - The changeset (`.changeset/mcl-header-a11y.md`) must say:
    - the title is no longer a heading by default, and `titleLevel` restores it;
    - the new `current` flag;
    - `showHighlight: false` now takes effect in `MclHeaderA`;
    - focus and ARIA changes.
- **Release order.** The changeset says `mcl-header` releases together with the pending `manguito-theme` changeset. It relies on the #141/#142 base behaviour, which hasn't been released yet, and depends on the theme as `workspace:*`.
- **Tests:**
  - Unit tests: Vitest in jsdom with the `hydrate` harness from `@mcl/test-utils/ssr`, in `MclHeaderA.test.ts` and `MclHeaderB.test.ts`. A separate test file per nav part is acceptable.
  - The `*.server.test.ts` files must keep passing, and the server HTML must already carry the right `aria-expanded="false"` on every toggle.
  - Story tests run with `pnpm test:storybook`.
  - Arrow keys are tested with keydown-only dispatch in unit tests. Storybook's `userEvent` also sends keyup, so it can't tell keydown from keyup handling.
- **`pnpm lint`, `pnpm format:check` and `pnpm typecheck`** pass.

## Approaches

|       | Approach                                                                                                                                                                                                     | Trade-off                                                                                                                                                           |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **A** | **Fix each nav part in place on top of the #128 base: bind the dropdown `attrs`, use `useCollapseTrigger` + `useId()` in the collapses, copy #135's arrow handler into `NavDropdown` with a link selector.** | **Only `mcl-header` changes. The handler (~20 lines) exists twice.**                                                                                                |
| B     | Move the arrow handler into `manguito-theme` as a shared composable used by `MclDropdownA` and `NavDropdown`                                                                                                 | One copy, but a new public theme API for two callers whose items are different elements, and three packages change, including the just-released `mcl-dropdown` fix. |

**Chosen: A (approved by the maintainer).** Option B is worth revisiting if a third caller appears.

## Left to the builder

- **Tests.** Test names, file layout and story layout.
- **`NavCollapseVertical`'s "is focus still inside my panel" check.** A query on the `Collapse` element by id or a template ref both work.
- **Chevron state.** In the collapses, keep the `@open` / `@close` sync or use `isOpen`. The payload must still come from the sync (see Goal 4).
- **Leftover axe violations.** Anything else the stories' axe run reports in `mcl-header` once set to `'error'`. Fix it in the component if it's a component bug, or in the story if it's story markup. Note each one in the changeset if it changes component output.
