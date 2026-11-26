# manguito-theme accessibility fixes (#128) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix every finding in #128 so the base components work with a keyboard and a screen reader, then fix the `Base/` stories and set them to `a11y: { test: 'error' }`.

**Architecture:** Consumer-rendered elements get their ARIA through slot props the consumer binds (`tabAttrs`, the toggler `attrs`), never through DOM patching. Focus that would be lost on close goes back to the element that opened the thing. Escape follows one contract: whoever acts on it calls `preventDefault()`, and overlays ignore an Escape that was already handled.

**Tech Stack:** Vue 3.5 (`useId`, provide/inject, `<component :is>`), `@vueuse/integrations/useFocusTrap`, Tailwind v4, Vitest (jsdom for theme tests) with `@mcl/test-utils/ssr` (`hydrate`, `renderOnServer`), Storybook 10 play tests with axe, Changesets.

**Spec:** `docs/superpowers/specs/2026-11-25-manguito-theme-a11y-design.md`

## Global Constraints

- **Two PRs.**
  - Part 1 (Tasks 1–8) is the components PR on `feat/128-theme-a11y`.
  - Part 2 (Tasks 9–10) is the stories PR on a new branch `feat/128-theme-stories-a11y`, cut from `master` after Part 1 merges.
  - Executors stop after Task 8 and hand over for the PR.
  - In Part 1, story files change only where a component change would break them.
- **No breaking changes to existing props, slots or events.** Additive props and slot props only. Behaviour changes are allowed only where today's behaviour is the bug.
- **No directive-style DOM patching of consumer markup.** Slot props carry ARIA to consumer elements.
- **No visual changes** except NavDrawer's focus ring.
- **Ids come from `useId()`.** Server HTML must carry the same ARIA as the client's first render, and hydration must produce no warnings.
- **Heading-level props are named `titleLevel` and typed `HeadingLevel`** (from `lib/theme/static/theme.types.ts`), as in mcl-cards.
- **Development-only warnings:** gate with `typeof process !== 'undefined' && process.env.NODE_ENV !== 'production'`, so the check survives the library build and consumers' bundlers strip it. Verify that the built `dist` still contains the warning text.
- **Changeset:** `'@bobbykim/manguito-theme': minor`.
- **Commit messages:** conventional (`fix(manguito-theme): …`, `test(stories): …`), ending with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- **Theme tests:** run in jsdom (theme default) and live beside the source as `lib/**/<Name>.test.ts`. Server tests are `*.server.test.ts`.

## Review Focus

1. **TabContent remounting:** the keyed `<Transition>` in TabContainer remounts the panels on every switch. Registration must not duplicate or drop panels, so the tab count stays correct after many switches. Test in Task 1.
2. **Partly bound tab sets:** when `tabAttrs` is bound for some tabs and not others, only the bound tabs' panels get `aria-labelledby`. Test in Task 1.
3. **Toggler called without an event:** a toggler slot that calls `toggle()` with no event, or from a child element's handler, must not throw. Focus return then falls back to the element with `aria-controls === contentId`. Test in Task 2.
4. **Alert with nothing focusable around it:** dismissing an Alert that is the only content on the page must not throw. Focus may end on `<body>`. Test in Task 5.
5. **Tooltip on a host that binds its own `aria-describedby`:** when the host's bound `aria-describedby` changes reactively, Vue overwrites the attribute. The directive's `updated` hook must merge its id back in. Test in Task 7.

---

## Part 1 — components PR (`feat/128-theme-a11y`)

### Task 1: Tabs — `tabAttrs`, keyboard model, panel naming

**Files:**

- Modify: `src/components/manguito-theme/lib/tabs/TabContainer.vue`
- Modify: `src/components/manguito-theme/lib/tabs/TabContent.vue`
- Modify: `src/components/manguito-theme/lib/tabs/InjectionKey.ts`
- Create: `src/components/manguito-theme/lib/tabs/index.types.ts` (`TabAttrs`)
- Modify: `src/components/manguito-theme/lib/index.ts` (re-export `TabAttrs` type)
- Test: `src/components/manguito-theme/lib/tabs/Tabs.test.ts`, `src/components/manguito-theme/lib/tabs/Tabs.server.test.ts`

**Interfaces:**

- Produces:
  - `TabAttrs`:

    ```ts
    interface TabAttrs {
      id: string
      role: 'tab'
      'aria-selected': boolean
      'aria-controls': string | undefined
      tabindex: 0 | -1
      onClick: () => void
      onKeydown: (e: KeyboardEvent) => void
    }
    ```

  - The `tab-button` slot props: `{ update: (num: number) => void; activeTab: number; tabAttrs: (index: number) => TabAttrs }`.
  - `TabInjectionType` gains:
    - `registerPanel(tabNumber: number, id: string): void`
    - `unregisterPanel(tabNumber: number): void`
    - `labelledBy(tabNumber: number): string | undefined`

- Tab ids: `${baseId}-tab-${index}`, where `baseId = useId()` in TabContainer.

- [ ] **Step 1: Write the failing tests.** Add to `Tabs.test.ts` a `renderBound` helper whose `tab-button` slot renders three `<button v-bind="tabAttrs(i)">`, with three `TabContent` panels (`id`s `p0`–`p2`). Then:
  - `it('tabAttrs gives the active tab tabindex 0 and aria-selected')`: tab 0 has `role="tab"`, `aria-selected="true"`, `tabindex="0"` and `aria-controls="p0"`. Tabs 1 and 2 have `aria-selected="false"` and `tabindex="-1"`.
  - `it('ArrowRight moves focus and selection to the next tab, wrapping')`: dispatch `keydown` `ArrowRight` on tab 0, and tab 1 is focused and `aria-selected="true"`, with panel `p1` shown. From tab 2, ArrowRight lands on tab 0.
  - `it('ArrowLeft wraps from the first tab to the last')`.
  - `it('Home and End go to the first and last tab')`.
  - `it('handled keys call preventDefault and ArrowDown is ignored')`: check `event.defaultPrevented` is `true` for ArrowRight, and `false` for ArrowDown with focus unchanged.
  - `it('panels are labelled by their bound tab and have tabindex 0')`: `#p1` has `aria-labelledby` equal to tab 1's `id`, and `tabindex="0"`.
  - `it('only panels whose tab was bound get aria-labelledby')`: bind `tabAttrs` on tabs 0 and 1 only. `#p2` has no `aria-labelledby`. Using the existing unbound `render`, no panel has `aria-labelledby`. (Review Focus 2)
  - `it('the tab count stays right after many switches')`: switch 0→1→2→0→2 with clicks, then press End on the focused tab. Focus lands on tab 2, not on a duplicate or missing index. (Review Focus 1)
  - In `Tabs.server.test.ts`: `it('server html carries the tab and panel wiring')`. The server render of `renderBound` contains `role="tab"`, `aria-selected="true"`, and a panel `aria-labelledby` equal to the tab id. `hydrate(renderBound)` reports no warnings.

- [ ] **Step 2: Run and watch them fail.**
      Run: `cd src/components/manguito-theme && pnpm vitest run lib/tabs`
      Expected: the new tests fail (`tabAttrs` is not a function or the attributes are missing). The existing tests pass.

- [ ] **Step 3: Implement.**
  - **TabContainer:**
    - Keep a reactive `Map<number, string>` of panels, and a non-reactive `Set<number>` of indexes whose `tabAttrs` was called. It's filled during the `tab-button` render, which runs before `tab-content` in the same pass, on the server and the client.
    - `labelledBy(n)` returns the tab id only if `n` is in that set.
    - `onKeydown` handles `ArrowRight`, `ArrowLeft`, `Home` and `End` over indexes `0 … panelCount - 1`, wrapping, and calls `preventDefault()`. It activates the target index and focuses `document.getElementById(tabId)` after `nextTick`.
  - **TabContent:**
    - Calls `registerPanel` in setup and `unregisterPanel` in `onBeforeUnmount`. Re-registering the same `tabNumber` replaces the entry.
    - Binds `:aria-labelledby="labelledBy(tabNumber)"` and `tabindex="0"`.

- [ ] **Step 4: Run the tab tests, then the package suite.**
      Run: `cd src/components/manguito-theme && pnpm vitest run lib/tabs && pnpm vitest run`
      Expected: all pass.

- [ ] **Step 5: Commit.** `fix(manguito-theme): give base tabs a keyboard model and named panels`

### Task 2: Dropdown — toggler attrs, focus return, Escape contract

**Files:**

- Modify: `src/components/manguito-theme/lib/dropdown/DropdownContainer.vue`
- Modify: `src/components/manguito-theme/lib/dropdown/DropdownContent.vue`
- Modify: `src/components/manguito-theme/lib/dropdown/index.types.ts`
- Test: `src/components/manguito-theme/lib/dropdown/Dropdown.test.ts`, `Dropdown.server.test.ts`

**Interfaces:**

- Produces:
  - The `toggler` slot props: `{ dropdownState: boolean; toggle: (e?: Event) => void; attrs: { 'aria-expanded': boolean; 'aria-controls': string } }`.
  - `DropdownInjectType` gains `contentId: string`.
- **Escape contract** (used by Tasks 3 and 4): the container handles `keydown` Escape. Only when the menu was open does it close the menu, call `e.preventDefault()`, and return focus.

- [ ] **Step 1: Write the failing tests.** In `Dropdown.test.ts`, the toggler binds `v-bind="attrs"`.
  - `it('toggler attrs expose expanded state and point at the content')`: `aria-expanded` goes `false` → `true` after a click, and `aria-controls` equals the rendered content's `id`.
  - `it('Escape closes the menu, focuses the toggler and prevents default')`: open the menu, focus an item inside it, and dispatch `keydown` Escape. The menu is gone, `document.activeElement` is `#trigger`, and `defaultPrevented` is `true`.
  - `it('Escape with the menu closed is not handled')`: `defaultPrevented` is `false`.
  - `it('itemClick from inside returns focus to the toggler')`: the default slot renders a button calling `itemClick`. Focus it and click it. The menu is gone and `#trigger` is focused.
  - `it('click outside closes without moving focus')`: focus an outside `<input>` and click it. The input stays focused.
  - `it('toggle() with no event still returns focus')`: the toggler calls `p.toggle()` with no argument. After Escape, focus lands on the element whose `aria-controls` matches. It doesn't throw. (Review Focus 3)
  - Server test: the toggler's `aria-expanded="false"` and `aria-controls` are in server HTML, and hydration has no warnings.

- [ ] **Step 2: Run and watch them fail.**
      Run: `cd src/components/manguito-theme && pnpm vitest run lib/dropdown`
      Expected: the new tests fail.

- [ ] **Step 3: Implement.**
  - `toggle(e?)` records `e?.currentTarget` as an `HTMLElement` when present.
  - Closing from inside (Escape, or `itemClick` while `document.activeElement` is inside the content) focuses the recorded toggler. If there is none, it focuses `containerEl.querySelector('[aria-controls="<contentId>"]')`.
  - Replace `@keyup.esc` with `@keydown` that checks `e.key === 'Escape'`.
  - `DropdownContent` renders `:id="contentId"`.

- [ ] **Step 4: Run the dropdown tests, then the package suite.**
      Run: `cd src/components/manguito-theme && pnpm vitest run lib/dropdown && pnpm vitest run`
      Expected: all pass.

- [ ] **Step 5: Commit.** `fix(manguito-theme): wire the dropdown toggler and return focus on close`

### Task 3: Modal and Sidebar — Escape contract, naming fallback, `titleLevel`

**Files:**

- Modify: `src/components/manguito-theme/lib/modal/Modal.vue`, `src/components/manguito-theme/lib/sidebar/Sidebar.vue`
- Test: `lib/modal/Modal.test.ts`, `lib/modal/Modal.server.test.ts`, `lib/sidebar/Sidebar.test.ts`, `lib/sidebar/Sidebar.server.test.ts`

**Interfaces:**

- Consumes: the Escape contract (Task 2) and the dropdown toggler `attrs`.
- Produces:
  - New prop `titleLevel?: HeadingLevel`, default `'h2'`, on both components.
  - The overlay Escape rule: a bubbling `keydown` listener on the dialog element closes only when `e.key === 'Escape' && !e.defaultPrevented`. The focus trap gets `escapeDeactivates: false`. HeaderVertical (Task 4) copies this rule.

- [ ] **Step 1: Write the failing tests** (each for Modal, with the same set for Sidebar):
  - `it('a bare Escape closes the dialog')`: this test may already exist; keep it green.
  - `it('Escape inside an open dropdown closes the dropdown first')`: the dialog body holds a `DropdownContainer`. Open the menu, focus an item, and press Escape. The menu closes, its toggler is focused, and the dialog is still open. A second Escape closes the dialog.
  - `it('an Escape already handled by a child is ignored')`: a child `keydown` handler calls `preventDefault()`, and the dialog stays open.
  - `it('default title renders at titleLevel, h2 by default')`: `title="T"` renders an `h2#<titleId>`, and `titleLevel="h4"` renders an `h4`. The class list is unchanged from today.
  - `it('custom header without a titleId heading falls back to ariaLabel')`: a `header` slot renders `<p>Hi</p>` with `ariaLabel="Settings"`. After open and `nextTick`, the dialog has `aria-label="Settings"` and no `aria-labelledby`.
  - `it('custom header that renders the titleId heading keeps aria-labelledby')`.
  - `it('warns in development when the dialog has no name')`: spy on `console.warn`. A custom header with no `titleId` heading and no `ariaLabel` produces one warning containing `Modal` (or `Sidebar`) and `ariaLabel`.
  - Server test: the server HTML of an open dialog keeps today's naming rule, and hydration has no warnings.

- [ ] **Step 2: Run and watch them fail.**
      Run: `cd src/components/manguito-theme && pnpm vitest run lib/modal lib/sidebar`
      Expected: the new tests fail. The dropdown-in-dialog test fails because the dialog closes on the first Escape.

- [ ] **Step 3: Implement** in both components:
  - **Escape:** `escapeDeactivates: false`, and `@keydown` on the dialog element calling `closeModal` / `closeSidebar` per the overlay Escape rule. Update the #110 comment to say why.
  - **Title tag:** `<component :is="titleLevel">` for the default title.
  - **Naming:**
    - A `titleFound` ref is set after open, in `nextTick`, by `dialogRef.value?.querySelector('#' + CSS.escape(titleId))`.
    - `nameAttrs` uses `aria-labelledby` while `titleFound` is unknown (server and first render). When `titleFound` is false, it uses `aria-label`.
    - Gated warning when the dialog ends up with no name.

- [ ] **Step 4: Run.**
      Run: `cd src/components/manguito-theme && pnpm vitest run`
      Expected: all pass.

- [ ] **Step 5: Commit.** `fix(manguito-theme): let inner components take Escape first and always name dialogs`

### Task 4: Headers and NavDrawer

**Files:**

- Modify: `src/components/manguito-theme/lib/header/NavDrawer.vue`, `HeaderVertical.vue`, `HeaderHorizontal.vue`
- Test: `lib/header/HeaderVertical.test.ts`, `HeaderHorizontal.test.ts`, both `*.server.test.ts`, and a new `lib/header/NavDrawer.test.ts`

**Interfaces:**

- Consumes: the overlay Escape rule (Task 3).
- Produces: NavDrawer gains the prop `controls?: string`, rendered as `aria-controls`.

- [ ] **Step 1: Write the failing tests.**
  - **NavDrawer:**
    - `it('is a type=button with aria-controls and no checkbox')`: `type="button"`, `aria-controls="m1"` when `controls="m1"`, and `querySelector('input')` is null.
    - `it('uses the shared focus ring, not outline-none')`: the class list contains `focus-visible:mcl-focus-ring`, and contains neither `outline-none` nor `focus:ring-4`.
    - `it('marks the icon open from the toggle prop')`: with `toggle: true`, the icon element carries the open class used by the CSS.
  - **HeaderVertical:**
    - `it('open menu is a labelled modal dialog')`: after the button click, the teleported wrapper has `role="dialog"`, `aria-modal="true"` and `aria-label="Main"`. Closed, it has no `role`.
    - `it('Escape closes the menu and focuses the drawer button')`.
    - `it('headerClose from inside returns focus to the drawer button')`: the slot renders a link calling `headerClose`. Focus it and click it.
    - `it('Tab from the last menu link wraps to the drawer button')`: focus the last link and dispatch Tab. Focus stays inside the wrapper. If jsdom can't drive the trap, assert the trap is active through `useFocusTrap`'s `hasFocus`, or move this test to Task 10's play test.
    - `it('the drawer button controls the mobile nav')`: the button's `aria-controls` equals the mobile `<nav>`'s `id`.
  - **HeaderHorizontal:**
    - `it('mobile panel sits inside the one nav landmark')`: when open, the panel content's `closest('nav')` is the same element as the bar's `closest('nav')`, and the container has exactly one `nav`.
    - `it('headerClose from inside returns focus to the drawer button')`.
    - `it('the drawer button controls the mobile panel')`.
  - **Server tests:** button `type="button"` and `aria-controls` are in server HTML, and hydration has no warnings with and without `mobile-content`.

- [ ] **Step 2: Run and watch them fail.**
      Run: `cd src/components/manguito-theme && pnpm vitest run lib/header`
      Expected: the new tests fail.

- [ ] **Step 3: Implement.**
  - **NavDrawer:** remove the checkbox and `hamburgetButtonState`. Drive `.hamburger__icon--open` from `toggle`, rewriting the `:checked + .hamburger__icon` CSS to that class. Add `type="button"` and `:aria-controls="controls"`. Replace `outline-none … focus:ring-4` with `focus-visible:mcl-focus-ring`; keep the `focus:opacity-70` hover look.
  - **HeaderVertical:**
    - `useFocusTrap` on the teleported wrapper (`immediate: false`, `allowOutsideClick: true`, `escapeDeactivates: false`). Activate it when `navOpen` turns true and the DOM has updated; deactivate it on close.
    - The overlay Escape rule goes on the wrapper.
    - The wrapper gets the dialog attributes only while open.
    - `closeNav` focuses the drawer button when focus was inside the wrapper.
    - The mobile nav `id` comes from `useId()`.
  - **HeaderHorizontal:**
    - One `<nav :aria-label="navLabel">` wraps the bar and the mobile panel; the inner bar becomes a `div`, keeping its classes.
    - `closeNav` returns focus as in HeaderVertical.
    - The panel `id` comes from `useId()`.
    - The `sticky` prop's JSDoc tells consumers to set `scroll-padding-top` to the header height.

- [ ] **Step 4: Run.**
      Run: `cd src/components/manguito-theme && pnpm vitest run`
      Expected: all pass. Then run `pnpm run story:dev` (or a throwaway Storybook on port 601x). Compare the header stories with `master` at 375px and 1280px: no visual change except the NavDrawer focus ring.

- [ ] **Step 5: Commit.** `fix(manguito-theme): trap and label the vertical header menu and fix NavDrawer semantics`

### Task 5: Alert

**Files:**

- Modify: `src/components/manguito-theme/lib/alert/Alert.vue`
- Test: `lib/alert/Alert.test.ts`, `lib/alert/Alert.server.test.ts`

**Interfaces:**

- Produces:
  - New props `returnFocus?: string | HTMLElement` and `live?: 'assertive' | 'polite'` (default `'assertive'`).

- [ ] **Step 1: Write the failing tests.**
  - `it('live assertive renders role=alert without aria-live')` and `it('live polite renders role=status')`.
  - `it('dismiss moves focus to the next focusable element after the alert')`: render `<button id=before/> <Alert dismissible/> <a id=after href=#/>`, then focus and click the dismiss button. `#after` is focused.
  - `it('falls back to the previous focusable when nothing follows')`.
  - `it('returnFocus selector wins over the fallback')`: `returnFocus="#target"`.
  - `it('a close handler that moves focus is respected')`: the `@close` handler focuses `#mine`, and `#mine` stays focused.
  - `it('nothing focusable around: no throw')`: focus may end on `body`. (Review Focus 4)
  - Server test: `role="alert"` by default, and no `aria-live` attribute.

- [ ] **Step 2: Run and watch them fail.**
      Run: `cd src/components/manguito-theme && pnpm vitest run lib/alert`
      Expected: the new tests fail.

- [ ] **Step 3: Implement.**
  - Before hiding, find the next and previous focusable elements in document order outside the alert. Use a `TreeWalker` or `querySelectorAll` with the selector `a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])`.
  - Emit `close`.
  - Hide the alert. After `nextTick`, if `document.activeElement` is `body` or was inside the alert, focus `returnFocus`, then next, then previous.
  - Choose the role from `live`.

- [ ] **Step 4: Run.**
      Run: `cd src/components/manguito-theme && pnpm vitest run`
      Expected: all pass.

- [ ] **Step 5: Commit.** `fix(manguito-theme): keep focus when an Alert is dismissed and let it be polite`

### Task 6: Card and Carousel

**Files:**

- Modify: `src/components/manguito-theme/lib/card/Card.vue`, `src/components/manguito-theme/lib/carousel/CarouselContainer.vue`, `src/components/manguito-theme/lib/carousel/CarouselContent.vue`, `src/components/manguito-theme/lib/carousel/CarouselInjectionKey.ts`
- Test: `lib/card/Card.test.ts`, `lib/carousel/Carousel.test.ts`, and their `*.server.test.ts`

**Interfaces:**

- Produces:
  - Card: `titleLevel?: HeadingLevel` (default `'h3'`); `imageAlt` defaults to `''`.
  - CarouselContainer: `ariaLabel?: string` (default `'Carousel'`).
  - The carousel injection gains `total: Ref<number>`.

- [ ] **Step 1: Write the failing tests.**
  - **Card:**
    - `it('img has alt="" by default')`
    - `it('title renders at titleLevel, h3 by default')`
    - `it('no title renders no heading')`
  - **Carousel:**
    - `it('container is a labelled carousel region')`: `role="region"`, `aria-roledescription="carousel"`, `aria-label="Carousel"`, and the given `ariaLabel` when set.
    - `it('slides are groups labelled n of m')`: with three slides, `slideNumber` 0, 1, 2 (0-based, as the stories use) give `aria-label` values `"1 of 3"`, `"2 of 3"`, `"3 of 3"`. Each has `aria-roledescription="slide"` and `tabindex="-1"`, and none has `role="tabpanel"`.
    - `it('live region wraps the keyed slide and survives a slide change')`: the element with `aria-live="polite"` is the same node before and after `next()`.
  - **Server tests:** the same attributes are in server HTML.

- [ ] **Step 2: Run and watch them fail.**
      Run: `cd src/components/manguito-theme && pnpm vitest run lib/card lib/carousel`
      Expected: the new tests fail.

- [ ] **Step 3: Implement.**
  - **Card:** `<component :is="titleLevel" v-if="title">`.
  - **Carousel:** `aria-live` on the grid wrapper (`contentContainerClass` div). Provide `total` from `slideLen`.

- [ ] **Step 4: Run.**
      Run: `cd src/components/manguito-theme && pnpm vitest run`
      Expected: all pass.

- [ ] **Step 5: Commit.** `fix(manguito-theme): carousel semantics, card alt default and title level`

### Task 7: vTooltip

**Files:**

- Modify: `src/components/manguito-theme/lib/directives/tooltip.directive.ts`, `src/components/manguito-theme/lib/tooltip/index.ts`
- Test: create `src/components/manguito-theme/lib/directives/tooltip.directive.test.ts`, or extend it if it already exists

**Interfaces:**

- Consumes: the Escape contract (the tooltip calls `preventDefault()` only when it hid a visible tooltip).
- Produces: the host attribute `data-mcl-tooltip-dismissed`, which hides the tooltip through a class variant such as `group-data-[mcl-tooltip-dismissed]:invisible`.

- [ ] **Step 1: Write the failing tests.**
  - `it('adds its id to an existing aria-describedby')`: host `aria-describedby="hint"` becomes `"hint mcl-tooltip-N"`, and a re-mount doesn't duplicate the id.
  - `it('unmount removes only its id')`: the result is `"hint"`. A host with no other ids loses the attribute.
  - `it('keeps its id when the host re-binds aria-describedby')`: a reactive `:aria-describedby` changes from `"a"` to `"b"`; after the update, the attribute is `"b mcl-tooltip-N"`. (Review Focus 5)
  - `it('Escape while hovered hides the tooltip until the next mouseenter')`:
    1. Dispatch `mouseenter` on the host.
    2. Dispatch `keydown` Escape on `document.body`. The host has `data-mcl-tooltip-dismissed` and `defaultPrevented` is `true`.
    3. `mouseleave` then `mouseenter` clears the attribute.
  - `it('Escape while focused hides it until the next focusin')`.
  - `it('Escape with no tooltip showing is not handled')`: `defaultPrevented` is `false`.
  - `it('Escape on a hovered tooltip inside a Modal hides the tooltip, not the modal')`: the Modal stays open.

- [ ] **Step 2: Run and watch them fail.**
      Run: `cd src/components/manguito-theme && pnpm vitest run lib/directives`
      Expected: the new tests fail.

- [ ] **Step 3: Implement.**
  - **`aria-describedby`:** merge into and split from the whitespace-separated id list. Re-merge in the `updated` hook on every call, not only on value change.
  - **Listeners:** `mouseenter`/`focusin` add a document `keydown` listener in the capture phase. `mouseleave`/`focusout` remove it, unless the other one is still active. The listener sets the dismissed attribute and calls `preventDefault()`. `mouseenter`/`focusin` clear the attribute.
  - **Cleanup:** remove all listeners on unmount.
  - **Tooltip classes:** add the dismissed variant to the default class list.

- [ ] **Step 4: Run.**
      Run: `cd src/components/manguito-theme && pnpm vitest run`
      Expected: all pass.

- [ ] **Step 5: Commit.** `fix(manguito-theme): merge tooltip aria-describedby and dismiss tooltips with Escape`

### Task 8: `.mcl-list` note, changeset, full verification

**Files:**

- Modify: `src/components/manguito-theme/lib/style/mcl-theme-v4.css` (a comment above `.mcl-list`: add `role="list"` to the `<ul>`, because `list-style: none` drops list semantics in WebKit/VoiceOver)
- Create: `.changeset/manguito-theme-a11y.md`
- Modify (only if Tasks 1–7 broke them): files under `src/stories/Base/`

**Interfaces:**

- Consumes: everything in Tasks 1–7.

- [ ] **Step 1: Write the changeset.**
  - Front matter: `'@bobbykim/manguito-theme': minor`.
  - First line: "Accessibility fixes for the base components (#128)."
  - One bullet per area, saying what consumers may notice:
    - **Tabs:** `tabAttrs`; panel `tabindex` 0; `aria-labelledby` only for bound tabs.
    - **Dropdown:** toggler `attrs`; focus returns on Escape and on item click; Escape now on keydown.
    - **Escape:** inner components close first inside Modal and Sidebar.
    - **Modal and Sidebar:** `titleLevel` default `h2` (was `h3`); `aria-label` fallback and the development warning.
    - **HeaderVertical:** the menu is a modal dialog while open.
    - **HeaderHorizontal:** a single nav landmark; `scroll-padding-top` note.
    - **NavDrawer:** checkbox removed; `type="button"`; `controls`; focus ring.
    - **Alert:** focus on dismiss; `returnFocus`; `live` (role `alert`/`status`, no `aria-live`).
    - **Card:** `alt=""` default; `titleLevel`; no empty heading.
    - **Carousel:** region, slide groups, live region, `ariaLabel`.
    - **Tooltip:** `aria-describedby` merge; Escape.
    - **`.mcl-list`:** the `role="list"` note.

- [ ] **Step 2: Run the full checks.**
      Run: `pnpm test && pnpm test:storybook && pnpm lint && pnpm format:check && pnpm typecheck && pnpm test:dist`
      Expected: all green. If `test:storybook` fails because a story broke under the new behaviour, fix that story minimally in this task and note it in the ledger. Fixes belonging to the Part 2 checklist wait for Part 2.
  - Then run `grep -r "ariaLabel" src/components/manguito-theme/dist/*.js | grep -c warn` (or equivalent).
    Expected: ≥ 1. The development warning survived the build.

- [ ] **Step 3: Check dependents.**
      Run: `pnpm vitest run --project mcl-header --project mcl-tabs --project mcl-dropdown` (the names as listed in the root `vitest.config.ts`)
      Expected: pass. Dependents use the base components without the new bindings, so nothing should change.

- [ ] **Step 4: Commit.** `chore(manguito-theme): changeset and list semantics note (#128)`

**Stop here.** Hand over for the components PR: `fix(manguito-theme): accessibility fixes for the base components (#128)`, with `Refs #128`, not `Closes`. Part 2 starts after it merges.

---

## Part 2 — stories PR (`feat/128-theme-stories-a11y`, from `master` after Part 1 merges)

### Task 9: Fix the `Base/` stories

**Files** (all under `src/stories/Base/base-component/`):

- Modify: `carousel/CarouselExample.vue`, `carousel/CarouselExampleIndicator.vue`, `carousel/CarouselExampleIndicatorTop.vue`
- Modify: `collapse/Collapse.vue`, `collapse/CollapseAccordion.vue`, `collapse/collapse.stories.ts` (remove the a11y caveat comment)
- Modify: `tabs/TabExample.vue`, `tabs/TabExample2.vue`
- Modify: `dropdown/Dropdown.vue`
- Modify: `modal/Modal.vue`, `sidebar/Sidebar.vue`
- Modify: `header/headerHorizontal.stories.ts`
- Modify: `directives/ClickOutside.vue`
- Modify: `src/stories/Base/utility-class/list-class/list.stories.ts` (add `role="list"` to the example `<ul>`)

**Interfaces:**

- Consumes:
  - `tabAttrs` (Task 1)
  - the toggler `attrs` (Task 2)
  - the header slot's `titleId` (existing)
  - `useCollapseTrigger` (existing, from `@bobbykim/manguito-theme`'s composables entry)

- [ ] **Step 1: Apply each "Story fixes" item from #128 as written.**
  - **Carousel:**
    - Arrows get `aria-label="Previous slide"` / `"Next slide"`, with the SVGs `aria-hidden="true"`.
    - Dots get `aria-label="Slide n"` and `aria-current="true"` on the current dot instead of `disabled`.
  - **Collapse and accordion triggers** (including those in `TabExample*.vue`): `v-bind="attrs"` from `useCollapseTrigger`.
  - **Tabs:** replace hand-written tab attributes with `v-bind="tabAttrs(i)"`. Remove the inverted `tabindex`, ids and panel wiring.
  - **Dropdown:** `v-bind="attrs"` on the toggler.
  - **Modal and Sidebar close buttons:** `aria-label="Close"`, with SVGs `aria-hidden="true"`.
  - **Custom-header dialogs:** use `#header="{ close, titleId }"` with `:id="titleId"` on their heading. Modal 2 and the left and right sidebars have no heading, so they get `aria-label` instead.
  - **Sidebar image:** a meaningful `alt`.
  - **HeaderHorizontal `content-right`:** `<h4>` becomes plain text.
  - **HeaderHorizontal story docs:** a `parameters.docs.description.component` note says to set `scroll-padding-top` to the sticky header's height.
  - **ClickOutside:** relabel the demo as a non-modal panel, with `role="region"` and `aria-label`. Focus the panel (`tabindex="-1"`) when it opens, close on Escape, and return focus to the opener.

- [ ] **Step 2: Set `parameters: { a11y: { test: 'error' } }`** in the `meta` of every `Base/` story file that isn't already `'off'`:
  - alert
  - card
  - carousel
  - collapse
  - click-outside
  - tooltip
  - dropdown
  - headerHorizontal
  - headerVertical
  - modal
  - sidebar
  - tabs

- [ ] **Step 3: Run.**
      Run: `pnpm test:storybook`
      Expected: all pass, with no axe violations at `error`. Fix any remaining violation in the story markup. If one is in a component, stop and record a ruling: that's a Part 1 miss, and it gets a follow-up fix.

- [ ] **Step 4: Commit.** `test(stories): fix Base story accessibility and fail on axe violations (#128)`

### Task 10: Play tests for the keyboard models

**Files:**

- Modify: `src/stories/Base/base-component/tabs/tabs.stories.ts`, `dropdown/dropdown.stories.ts`, `header/headerVertical.stories.ts`, `modal/modal.stories.ts`

- [ ] **Step 1: Write the play tests.**
  - **Tabs:** Tab focuses the selected tab. ArrowRight selects and focuses the next tab, and its panel is visible. End goes to the last tab and Home to the first. Tab then moves into the panel. The panel has `tabindex="0"`, or its first focusable is focused.
  - **Dropdown:** open the menu with the keyboard and Tab into it. Escape closes it, and the toggler is focused with `aria-expanded="false"`.
  - **HeaderVertical**, at a mobile viewport (`parameters.viewport` or `page.viewport` as the existing stories do):
    - open the menu
    - Shift+Tab from the drawer button stays inside the menu
    - Escape closes the menu and focuses the button
  - **Modal:** a story or play step with a Dropdown inside the dialog. The first Escape closes the menu and the second closes the modal.

- [ ] **Step 2: Run.**
      Run: `pnpm test:storybook`
      Expected: all pass. Temporarily reverting Task 1's `onKeydown` makes the tabs play test fail; note in the ledger that this was observed.

- [ ] **Step 3: Full checks.**
      Run: `pnpm test && pnpm lint && pnpm format:check && pnpm typecheck`
      Expected: green.

- [ ] **Step 4: Commit.** `test(stories): play tests for tabs, dropdown, header menu and nested Escape (#128)`

The PR for this branch is titled `test(stories): Base story accessibility (#128)` and its body includes `Closes #128`.
