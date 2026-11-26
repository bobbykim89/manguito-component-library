# manguito-theme accessibility fixes (#128)

## Intent

The library-wide audit (#128–#138) filed 23 component findings and 15 story findings against `@bobbykim/manguito-theme` in #128. This change fixes all of them. The base components should work with a keyboard and a screen reader without each consumer rebuilding the ARIA wiring by hand.

The base components sit under four other packages: mcl-header (#131), mcl-tabs (#132), mcl-carousel (#133) and mcl-dropdown (#135). Those issues are fixed separately, but they will build on the APIs added here. The new APIs are designed to fix those packages' focus bugs at the base where they can.

## Delivery: two pull requests

The maintainer asked for the work to be split.

1. **Components PR** (branch `feat/128-theme-a11y`): every component, directive and CSS finding, plus its tests and changeset. Story files change only where a component change would break them.
2. **Stories PR** (a new branch cut from `master` after PR 1 merges): every "Story fixes" finding. Every `Base/` story file not already at `'off'` gets `parameters: { a11y: { test: 'error' } }`, and `collapse.stories.ts` loses its a11y caveat comment. This PR closes #128.

The stories go second because several story fixes consume the new component APIs (`tabAttrs`, the dropdown toggler attributes).

## Goals

- Every checkbox in #128 is resolved. The issue body is the checklist.
- The base tabs give consumers the whole APG tabs keyboard model with one binding per tab.
- Closing a dropdown, alert or mobile menu from inside never leaves focus on `<body>`.
- Every dialog (Modal, Sidebar) has an accessible name, or a development warning says why not.
- Server-rendered HTML carries the same ARIA as the client's first render. Ids come from `useId()`.

## Non-goals

- Fixing the dependent packages (#131, #132, #133, #135). They pick up the base changes when they're fixed. One exception: if MclDropdownA or MclHeaderA/B gets a base fix for free (focus returning to the toggle or drawer button), that's welcome. Their own issues still get checked off in their own PRs.
- Moving `role="tablist"` off the `tab-button` slot wrapper so that MclTabsA's scroll buttons sit outside it. #132 needs a base change for that, and it will be made in #132.
- The tooltip refactor with Floating UI (#64). Only the two tooltip findings are fixed here.
- The deprecated `vToggle` / `vCollapse` directives.
- Colour and contrast.

## Anti-goals

- **No breaking changes to existing props, slots or events.** manguito-theme is 1.6.0, so this ships as a minor release. Only additive props and slot props are allowed. Behaviour changes are allowed only where today's behaviour is the bug: element roles, a missing `alt`, tabindex values.
- **No directive-style DOM patching of consumer markup.** The maintainer rejected approach B for tabs. ARIA reaches consumer-rendered elements through slot props that the consumer binds. The tooltip directive already owns its host's `aria-describedby` and keeps doing so.
- **No visual changes** beyond the focus ring on NavDrawer.

## Approaches considered (tabs keyboard support)

- **A. Slot props (chosen by the maintainer).** The `tab-button` slot also receives `tabAttrs(index)`, which returns everything one tab needs. Panels are named automatically. This mirrors `useCollapseTrigger`'s `attrs`. Existing consumers keep working and gain keyboard support once they bind it.
- **B. Container patches the DOM.** A keydown listener on the tablist would set `tabindex` and `aria-selected` on any `[role=tab]`. Rejected: it's the deprecated `vToggle` approach, it fights consumer bindings (MclTabsA's own `tabindex`/`disabled`), and it's missing from server HTML.

## Design, per component

Each finding's fix is the one suggested in #128 unless stated otherwise. Calls marked **(call)** were made by the designer, not the maintainer. Correct them on review.

### Tabs (TabContainer, TabContent)

- The `tab-button` slot gains `tabAttrs: (index: number) => TabAttrs`. `TabAttrs` is exported from the package:

  ```ts
  interface TabAttrs {
    id: string // `${baseId}-tab-${index}`, baseId from useId()
    role: 'tab'
    'aria-selected': boolean
    'aria-controls': string | undefined // the panel id registered for this index
    tabindex: 0 | -1 // 0 only for the active tab
    onClick: () => void // activates index
    onKeydown: (e: KeyboardEvent) => void
  }
  ```

- **Keyboard (call):** ArrowRight/ArrowLeft move to the next or previous tab and wrap around. Home and End go to the first and last tab. Moving focus also activates the tab (automatic activation), and the handled keys call `preventDefault()`. The set is horizontal only, so ArrowUp/Down are ignored. Focus moves with `document.getElementById(tabId)`.
- **Tab count:** the number of `TabContent` panels registered with the container. Each `TabContent` registers `{ tabNumber, id }` through the existing injection key and unregisters on unmount.
- **TabContent:** `aria-labelledby` is the tab id for its `tabNumber`, set only when that tab's `tabAttrs(index)` was called **(call)**. The `tab-button` slot renders before `tab-content` in the same pass, on the server and the client, so the container records which indexes were bound. A consumer that doesn't bind `tabAttrs` (MclTabsA today) gets no idref to a missing element, and therefore no new axe finding after upgrading. `tabindex` becomes `0`; it stays `0` on hidden panels too, which is harmless because they are `display: none`.
- `update` and `activeTab` stay as they are, so existing consumers still work.

### Dropdown (DropdownContainer, DropdownContent)

- The `toggler` slot gains `attrs: { 'aria-expanded': boolean; 'aria-controls': string }`. The content id comes from `useId()` in the container and is provided to `DropdownContent`, which renders it as its `id`.
- **Focus return:** `toggle(e)` records `e.currentTarget` as the toggler. On Escape, or when `itemClick` closes the menu while focus is inside the content, focus moves to the recorded toggler. Click-outside does not move focus, because the user has already put it somewhere else.
- **Escape (call):** the handler moves from `keyup` to `keydown` to match the other components. It acts only while the menu is open.

### Alert

- **Dismiss focus (call):** `handleClose` emits `close` first, so a consumer's handler can move focus. If focus is still inside the alert after that, focus moves to the alert's `returnFocus` target, in this order:
  1. A new optional `returnFocus?: string | HTMLElement` prop (a CSS selector or an element).
  2. Otherwise, the first focusable element after the alert in document order.
  3. Otherwise, the last focusable element before it.

  Both fallbacks are found before the alert is removed.

- **Live region (call):** new prop `live?: 'assertive' | 'polite'`, default `'assertive'`. `'assertive'` renders `role="alert"` and `'polite'` renders `role="status"`. The explicit `aria-live` goes. The default keeps today's effective behaviour, because screen readers treat `role="alert"` as assertive.

### Card

- `imageAlt` defaults to `''`. JSDoc says to set it for informative images.
- New `titleLevel?: HeadingLevel` prop, default `'h3'`. It uses the same name and type as mcl-cards (#129) and renders through `<component :is>`.
- The title heading renders only when `title` is set.

### Carousel (CarouselContainer, CarouselContent)

- **Container:**
  - `role="region"` and `aria-roledescription="carousel"`.
  - New `ariaLabel?: string` prop, default `'Carousel'` (call), rendered as `aria-label`.
  - `aria-live="polite"` goes on the stable grid wrapper, not on the keyed slide `<div>`. A live region must exist before its content changes.
- **Slides:**
  - `role="group"`, `aria-roledescription="slide"`, and `aria-label` set to `"${slideNumber + 1} of ${total}"`. The total is provided by the container.
  - If `slideNumber` turns out to be 1-based in current usage, the builder adjusts the label so it reads 1 to n.
  - `tabindex="-1"` stays **(call)**. Slides aren't Tab stops, and consumers can still call `.focus()` on them. Only the role changes.

### HeaderVertical, HeaderHorizontal, NavDrawer

- **HeaderVertical mobile menu:** the menu behaves as a modal while it's open.
  - It uses `useFocusTrap` (as Modal does) on the teleported wrapper, which holds both the drawer button and the menu `<nav>`. That way the button stays reachable to close the menu.
  - Escape closes the menu.
  - When the menu closes while focus is inside it (Escape, the button, or `headerClose` from slot content), focus returns to the drawer button.
  - The existing scroll lock stays.
  - **(call)** While the menu is open, the teleported wrapper gets `role="dialog"`, `aria-modal="true"` and `aria-label` set to `navLabel`. A trap only controls Tab, so without this, screen-reader users browsing the page can still reach content hidden behind the full-screen overlay. When the menu is closed, the wrapper has no role, so the drawer button is exposed as before.
- **HeaderHorizontal mobile panel:**
  - The panel moves inside the header's navigation landmark. Restructure so one `<nav :aria-label="navLabel">` wraps both the bar and the panel. There are not two navs with the same name.
  - `headerClose` from inside the panel returns focus to the drawer button. It's not a modal, so there's no trap.
- **HeaderHorizontal sticky overlap (call):** documented, not automated. The `sticky` prop's JSDoc and the story docs tell consumers to set `scroll-padding-top` to the header height. The base doesn't write to `<html>`.
- **NavDrawer:**
  - `type="button"`.
  - A new `controls?: string` prop rendered as `aria-controls`. Both headers pass a `useId()` id that they put on the mobile `<nav>`/panel.
  - `outline-none` and the `focus:ring-4` ring are replaced by `focus-visible:mcl-focus-ring` (#122).
  - The hidden checkbox is removed. The icon's open state comes from the `toggle` prop, through a class or `aria-expanded`. The animation looks the same.

### Modal and Sidebar

- New `titleLevel?: HeadingLevel` prop for the default header. It defaults to `'h2'`, a change from today's `h3`. A dialog's title is the top of its own outline. The visual size doesn't change, because the class comes from `generateClass`, not the tag.
- **Naming:** after the dialog opens (`nextTick`), the component checks that an element with `id === titleId` exists inside the dialog.
  - If it does, `aria-labelledby` stays.
  - If it doesn't and `ariaLabel` is set, `aria-label` is used.
  - If neither, the component logs a development-only `console.warn` naming the component and the fix.
  - The server render and the first client render keep today's rule, so hydration agrees.

### Escape: the innermost component closes first (maintainer's choice)

With a Dropdown open or a tooltip showing inside a Modal, Sidebar or HeaderVertical's mobile menu, the first Escape closes only the inner component. The next Escape closes the overlay. Today the focus trap's capture-phase Escape closes the overlay first, so the dropdown's focus return never runs.

- **Contract:** a component that acts on Escape calls `event.preventDefault()`. An overlay ignores an Escape whose `defaultPrevented` is already set.
- **Modal, Sidebar, HeaderVertical menu:**
  - Their `useFocusTrap` stops handling Escape (`escapeDeactivates: false`).
  - Each closes on a bubbling `keydown` Escape listener on its own root, skipping events whose `defaultPrevented` is set.
  - Closing still deactivates the trap and returns focus as it does today.
  - Any existing Escape handling in these components moves onto this one path; there is no second listener.
- **Dropdown:** its `keydown` Escape handler on the container bubbles before the overlay's root handler. It calls `preventDefault()` only when the menu was open.
- **vTooltip:** its document Escape listener runs in the capture phase, so it runs first even when the tooltip is only hovered and focus is elsewhere inside the overlay. It calls `preventDefault()` only when it hid a visible tooltip.
- **Tests:**
  - a Dropdown inside a Modal: the first Escape closes the menu and focuses its toggler, and the second closes the modal
  - the same for a hovered and a focused tooltip host inside a Modal
  - a bare Escape still closes Modal, Sidebar and the HeaderVertical menu

### vTooltip

- **Escape:** while the host is hovered or focused, Escape hides the tooltip until the next `mouseenter` or `focusin`. The directive sets `data-mcl-tooltip-dismissed` on the host, and the tooltip's classes hide it under that attribute. The document listener is added on hover or focus and removed on leave or blur, so there's no permanent global listener per tooltip.
- **`aria-describedby`:** the directive adds the tooltip id to the existing id list, avoiding duplicates on re-mount. On unmount it removes only that id, and removes the attribute only if the list is then empty.

### Theme CSS: `.mcl-list` (call)

The CSS stays as it is. The CSS comment and the list story document adding `role="list"` to the `<ul>`. Switching to `::marker` would change the bullet's spacing and weight variants (`::marker` can't take width or margin).

## Testing

- **Unit tests (Vitest, jsdom), extending each component's existing `*.test.ts`:**
  - `tabAttrs` values
  - each key, wrapping, activation and focus movement
  - panel `aria-labelledby`
  - the dropdown toggler `attrs` and focus return on Escape and `itemClick` (and none on click-outside)
  - Alert focus fallback order and `live` roles
  - Card `alt`, `titleLevel` and an empty title
  - carousel roles and labels
  - HeaderVertical trap, Escape and focus return
  - HeaderHorizontal landmark and focus return
  - NavDrawer `type`, `aria-controls` and no checkbox
  - Modal/Sidebar naming fallbacks and the warning
  - tooltip `aria-describedby` merge/removal and Escape
- **SSR:** each touched component's `*.server.test.ts` checks that the new ARIA is in server HTML and that hydration has no mismatch.
- **Stories PR:**
  - All `Base/` story files at `'error'` must pass `pnpm test:storybook`.
  - A `play` test for the tabs keyboard model (Arrow, Home, End).
  - A `play` test for dropdown Escape returning focus.
- **Both PRs:** `pnpm test`, `pnpm test:storybook`, lint, format and typecheck are green. `pnpm test:dist` also runs, since the theme's exports change.

## Changeset

`'@bobbykim/manguito-theme': minor`, in PR 1. It lists the behaviour changes consumers might notice:

- the roles on Alert and the carousel slides
- the TabContent `tabindex` change
- Card's `alt=""` default
- the Modal/Sidebar title moving from `h3` to `h2`
- the NavDrawer checkbox being removed
- tooltip `aria-describedby` merging
- the new props and slot props

## Left to the builder

- File layout for the tabs keyboard helper: inline, or a small composable in `lib/tabs/`.
- How NavDrawer drives the icon without the checkbox, as long as the animation looks the same.
- How each fallback finds focusable elements (a selector list is fine).
- Whether `HeaderHorizontal`'s restructure needs class shuffling to keep the layout pixel-identical. Verify with a before/after screenshot of the header stories.
