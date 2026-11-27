# mcl-header Accessibility Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Resolve every finding in #131 for `MclHeaderA` and `MclHeaderB`. That covers the title element, the logo link, focus return, disclosure state, arrow keys, the current page, new-tab text, the focus ring, and `showHighlight` reaching the nav parts. Then switch the header stories to `a11y: 'error'`.

**Architecture:**

- Every change is in `src/components/mcl-header/lib`. The two shells (`MclHeaderA.vue`, `MclHeaderB.vue`) and five internal nav parts are fixed in place, on top of what the #128 base already provides:
  - the dropdown slot's `attrs` and `itemClick()`;
  - `headerClose()` returning focus to the drawer button;
  - `useCollapseTrigger`.
- `NavDropdown` gets a copy of #135's `keydown` arrow handler, adapted from buttons to links.
- Everything is tested through the two public components, mounted in jsdom.

**Tech Stack:** Vue 3.5 SFC (`useId`), Vitest + jsdom with `@vue/test-utils` `mount` and the `@mcl/test-utils/ssr` harness, and Storybook 10 play tests with axe.

**Spec:** `docs/superpowers/specs/2026-11-26-mcl-header-a11y-design.md`

## Global Constraints

- **Package scope.** Only `@bobbykim/mcl-header`, its stories and docs change. No changes to `src/components/manguito-theme` or `mcl-dropdown`.
- **Pattern.** Use the disclosure pattern only:
  - No `role="menu"` or `aria-haspopup`.
  - No Home/End.
  - Down does not open a closed dropdown.
  - Arrows don't wrap.
- **Events.** Event names and payloads are unchanged. That includes `label-click` / `collapse-click` reporting the state from **before** the click.
- **No visible change without opt-in.** Without `current`, the header looks the same, apart from:
  - the focus ring on `:focus-visible`;
  - `showHighlight: false` now taking effect in `MclHeaderA`.
- **New-tab text.** The text is exactly `<span class="sr-only"> (opens in a new tab)</span>`, shown only when the link's `target === '_blank'`. This matches `mcl-cards`.
- **Focus ring.** The class is `focus-visible:mcl-focus-ring`, and it replaces `outline-none`.
- **Ids.** Collapse ids come from Vue's `useId()`, never from titles.
- **Changeset.** `.changeset/mcl-header-a11y.md` is a **minor** bump for `@bobbykim/mcl-header`.
  - It must say: the title is no longer a heading by default and `titleLevel` restores it; `current` is new; `showHighlight: false` now takes effect in `MclHeaderA`; and the focus/ARIA changes.
  - It also says the release needs the pending `manguito-theme` minor (`manguito-theme-a11y`).
- **Commits.** Use conventional commit messages ending with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

### Test helpers and selectors (all tasks)

- **The drawer button.**
  - Before this change, existing tests find it with `button[aria-expanded]`. Once Tasks 4–6 give nav toggles `aria-expanded`, that selector hits the wrong button: the desktop nav is rendered before the drawer button in both bases.
  - Task 1 (A) and Task 2 (B) switch every existing use to `button[aria-label="<menuLabel>"]`. The default `menuLabel` is `"Menu"`; the labels test uses `"Navigation"`.
- **The mobile panel.** It is `document.getElementById(menuButton().getAttribute('aria-controls')!)`, and only exists while the drawer is open.
  - The desktop nav is always rendered in jsdom (it is hidden by CSS only).
  - So "desktop X" in a test means X looked up outside the mobile panel, before the drawer is opened.
- **Shared test helpers.** Each test file keeps its own small helpers: `menuButton()`, `mobilePanel()`, `linkByText(root, text)`, `buttonByText(root, text)`, `settle()` (50 ms), and `hasClasses(el, classString)`.
  - `hasClasses` splits `classString` on spaces and checks each token with `classList.contains`. Use it to compare against `generateClass.*Variant(...)` output imported from `@bobbykim/manguito-theme`.
- **Arrow keys** are dispatched as keydown-only `KeyboardEvent('keydown', { key, bubbles: true, cancelable: true })` on `document.activeElement`. Use the same `key()` helper as `MclDropdownA.test.ts`.
- **Test command (package):** `pnpm exec vitest run src/components/mcl-header`

## Review Focus

1. **Two menu entries with the same title** (for example two collapses titled "More"). Each toggle's `aria-controls` points at its own panel, and the ids differ. Pinned in Task 5 and Task 6.
2. **MclHeaderB desktop sidebar: a top-level link clicked while a collapse is open.** `closeCollapse()` closes the collapse but focus stays on the clicked link; no collapse toggle takes it. Pinned in Task 6.
3. **MclHeaderB mobile drawer: a collapse child chosen.** Focus ends on the drawer button, not on the closing collapse's toggle. Pinned in Task 6.
4. **Two dropdowns in MclHeaderA's desktop bar.** Opening B closes A, but A's links are still fading out. Arrows in B stay within B. Pinned in Task 4.
5. **A menu title containing HTML** (`NavLink` renders titles with `v-html`). The markup still renders after the hidden span is added. Pinned in Task 3.

---

### Task 1: MclHeaderA shell — title, logo, title-link new-tab text, `showHighlight`, drawer focus

**Files:**

- Modify: `src/components/mcl-header/lib/common/index.types.ts` (add `current?: boolean` to `MenuItemType`)
- Modify: `src/components/mcl-header/lib/mcl-header-a/MclHeaderA.vue` (logo link ~149, title ~169–179, `:display-highlight` at 193/204/236/248)
- Test: `src/components/mcl-header/lib/mcl-header-a/MclHeaderA.test.ts`

**Interfaces:**

- **Produces:**
  - `MenuItemType.current?: boolean`, used by Tasks 3–6.
  - `MclHeaderA` prop `titleLevel?: HeadingLevel` (type imported from `@bobbykim/manguito-theme`), with no default.
  - The nav parts now receive `showHighlight` from `MclHeaderA`.

- [ ] **Step 1: Switch the existing drawer-button queries and write the failing tests**
  - Replace `button[aria-expanded]` in the existing labels and pass-through tests as described under "Test helpers and selectors".
  - Add a `describe('MclHeaderA accessibility (#131)')` block. Mount with `mount(MclHeaderA, { props, attachTo: document.body })` and unmount after each test.

  ```ts
  it('title is a span by default, with no heading in the header')
  //   document.querySelectorAll('header h1, header h2, header h3, header h4').length === 0
  //   the element whose textContent is 'SITE-TITLE' has tagName 'SPAN'
  it('titleLevel renders the title as that heading with the same classes')
  //   mount default → spanClass = span.className; mount { titleLevel: 'h1' } →
  //   querySelector('header h1')!.textContent === 'SITE-TITLE' and h1.className === spanClass
  it('the logo link is out of the tab order and hidden from assistive tech')
  //   every <a> containing an <img>: getAttribute('tabindex') === '-1', getAttribute('aria-hidden') === 'true'
  //   and at least one such link exists
  it('the title link says it opens a new tab only when its target is _blank')
  //   { titleBlockLinkTarget: '_blank' } → title link (<a> containing 'SITE-TITLE') has a .sr-only
  //   whose textContent.trim() === '(opens in a new tab)'; default props → no .sr-only in it
  it('showHighlight: false reaches the nav parts')
  //   { showHighlight: false } → document.querySelectorAll('.nav__decorator').length === 0
  //   default → length > 0; in both, no element has the attribute 'display-highlight'
  it(
    'choosing a top-level link in the mobile menu returns focus to the drawer button',
  )
  //   open drawer (menuButton().click(); await nextTick()), link 'Home' in mobilePanel():
  //   focus(), click(), await nextTick(), await settle() → document.activeElement === menuButton()
  ```

- [ ] **Step 2: Run the tests and watch them fail**

  Run: `pnpm exec vitest run src/components/mcl-header`

  Expected:
  - The title, titleLevel, logo, new-tab and `showHighlight` tests FAIL.
  - The drawer-focus test PASSES already: #128 fixed `headerClose()`, and this test only pins that.
  - Existing tests still PASS with the new selector.

- [ ] **Step 3: Implement**
  - **Types.** Add `current?: boolean` to `MenuItemType`.
  - **Title.** Add `titleLevel?: HeadingLevel` to `MclHeaderA`. Render the title with `<component :is="titleLevel ?? 'span'" class="inline-block align-middle tracking-wider" :class="getTitleClass(...)" v-html="title">`.
  - **Title link.** Add the hidden new-tab span after the title, when `titleBlockLinkTarget === '_blank'`.
  - **Logo link.** Add `tabindex="-1" aria-hidden="true"`.
  - **Highlight.** Change all four `:display-highlight` bindings to `:show-highlight`.

- [ ] **Step 4: Run the tests and watch them pass**

  Run: `pnpm exec vitest run src/components/mcl-header`

  Expected: all PASS, including the hydration and server tests.

- [ ] **Step 5: Commit**

  `fix(mcl-header): title element, logo link and showHighlight in MclHeaderA (#131)`

---

### Task 2: MclHeaderB shell — title, logos, title-link new-tab text, drawer focus

**Files:**

- Modify: `src/components/mcl-header/lib/mcl-header-b/MclHeaderB.vue` (desktop logo ~145 / title ~159–169, mobile logo ~217 / title ~231–241)
- Test: `src/components/mcl-header/lib/mcl-header-b/MclHeaderB.test.ts`

**Interfaces:**

- **Consumes:** `MenuItemType.current` (Task 1; unused here).
- **Produces:** `MclHeaderB` prop `titleLevel?: HeadingLevel`.

- [ ] **Step 1: Switch the existing drawer-button queries and write the failing tests**
  - Replace `button[aria-expanded]` in the existing tests as in Task 1.
  - Add a `describe('MclHeaderB accessibility (#131)')` block containing the same five shell tests as Task 1:
    - title span by default;
    - `titleLevel` with the same classes;
    - logo links hidden;
    - title-link new-tab text;
    - top-level mobile link → focus on the drawer button.
  - Each runs against both the desktop sidebar and, after opening the drawer, the mobile panel.
    - The mobile title follows `titleLevel` too.
    - Both logo links are hidden.
    - Both title links get the new-tab text.
  - Add one more test:

  ```ts
  it(
    'choosing the title link in the mobile menu returns focus to the drawer button',
  )
  //   open drawer; title link inside mobilePanel(): focus(), click(), await nextTick(), await settle()
  //   → document.activeElement === menuButton()
  ```

- [ ] **Step 2: Run the tests and watch them fail**

  Run: `pnpm exec vitest run src/components/mcl-header`

  Expected:
  - The title, titleLevel, logo and new-tab tests FAIL.
  - Both drawer-focus tests PASS (they only pin the #128 fix).

- [ ] **Step 3: Implement**
  - **Title.** Add `titleLevel?: HeadingLevel` to `MclHeaderB`. Both titles become `<component :is="titleLevel ?? 'span'">` with their current classes; the span case also gets `block`.
  - **Logo links.** Both get `tabindex="-1" aria-hidden="true"`.
  - **Title links.** Both get the hidden new-tab span when `titleBlockLinkTarget === '_blank'`.

- [ ] **Step 4: Run the tests and watch them pass**

  Run: `pnpm exec vitest run src/components/mcl-header`

  Expected: all PASS.

- [ ] **Step 5: Commit**

  `fix(mcl-header): title element and logo links in MclHeaderB (#131)`

---

### Task 3: NavLink and NavLinkVertical — current page, new-tab text, focus ring

**Files:**

- Modify: `src/components/mcl-header/lib/mcl-header-a/NavLink.vue`
- Modify: `src/components/mcl-header/lib/mcl-header-b/NavLinkVertical.vue`
- Test: `MclHeaderA.test.ts`, `MclHeaderB.test.ts`

**Interfaces:**

- **Consumes:** `MenuItemType.current` (Task 1); `showHighlight` now reaches `NavLink` (Task 1).

- [ ] **Step 1: Write the failing tests**
  - **Test data.** The menu items include `{ title: 'Home', url: '/', current: true }`, `{ title: 'Ext', url: 'https://x.test', target: '_blank' }` and `{ title: 'Fancy <em>One</em>', url: '/f' }`.
  - **Defaults.** Pass `menuTextColor: 'dark-3'` and `highlightColor: 'primary'` explicitly in B.
  - **Scope.** Look up links in the desktop nav.

  ```ts
  // MclHeaderA.test.ts
  it('a current top-level link has aria-current="page"; others have none')
  it(
    'with showHighlight off, the current link is underlined and others are not',
  )
  //   { showHighlight: false }: Home link classList.contains('underline') === true; Ext → false
  it('a top-level link with target _blank has the hidden new-tab text')
  it('a top-level title with HTML still renders its markup')
  //   the 'Fancy' link contains an <em> with textContent 'One'
  it('top-level links use the shared focus ring instead of outline-none')
  //   classList contains 'focus-visible:mcl-focus-ring', not 'outline-none'

  // MclHeaderB.test.ts (desktop sidebar)
  it('a current top-level link has aria-current="page" and its highlight drawn')
  //   aria-current === 'page'; classList contains 'before:w-full';
  //   hasClasses(link, generateClass.textColorVariant({ color: 'dark-3' })) === true
  //   and the same check for { color: 'primary' } === false
  it('with showHighlight off, the current top-level link is underlined')
  //   { showHighlight: false }: 'underline' present on Home only;
  //   hasClasses(Home, generateClass.textColorVariant({ color: 'primary' })) === true
  it('a top-level link with target _blank has the hidden new-tab text')
  ```

- [ ] **Step 2: Run the tests and watch them fail**

  Run: `pnpm exec vitest run src/components/mcl-header`

  Expected:
  - The `aria-current`, underline, highlight, new-tab and focus-ring tests FAIL.
  - The HTML-title test may PASS already. It guards the restructure.

- [ ] **Step 3: Implement**
  - **NavLink.**
    - The title moves to an inner `<span v-html="navItem.title">`, and the new-tab span follows it.
    - Bind `:aria-current="navItem.current ? 'page' : undefined"`.
    - Add `underline` when `current && !showHighlight`.
    - Add a scoped rule `.nav__text[aria-current='page'] + .nav__decorator::before { width: 100%; }`.
    - Replace `outline-none` with `focus-visible:mcl-focus-ring`.
  - **NavLinkVertical.**
    - Bind `aria-current` the same way, and add the new-tab span after the title span.
    - When current, `colorClass` gives the hover state permanently:
      - **With `dHl` on:** `before:w-full`, and `textColorVariant(textColor)` instead of `textColorVariant(hlColor)`.
      - **With `dHl` off:** `textColorVariant(hlColor)` instead of `textColor`, plus `underline`.

- [ ] **Step 4: Run the tests and watch them pass**

  Run: `pnpm exec vitest run src/components/mcl-header`

  Expected: all PASS.

- [ ] **Step 5: Commit**

  `fix(mcl-header): current page, new-tab text and focus ring on top-level links (#131)`

---

### Task 4: NavDropdown — state, focus return, arrow keys, children

**Files:**

- Modify: `src/components/mcl-header/lib/mcl-header-a/NavDropdown.vue`
- Test: `MclHeaderA.test.ts`, `MclHeaderA.server.test.ts`

**Interfaces:**

- **Consumes:**
  - From the base `DropdownContainer` toggler slot: `{ toggle, dropdownState, attrs }`.
  - From `DropdownContent`: `{ itemClick }`.
  - `MenuItemType.current` (Task 1).
- **Produces:** none.

- [ ] **Step 1: Write the failing tests**

  The desktop dropdown is `{ title: 'More', children: [C1, C2, C3] }`. Its toggle is the desktop `button` with text `More`.

  ```ts
  it(
    'the dropdown toggle exposes aria-expanded and aria-controls and is type="button"',
  )
  //   'false' → click → 'true'; the element with id === aria-controls contains link 'C1'
  it('choosing a dropdown link closes it and returns focus to its toggle')
  //   open; focus C2; click; nextTick; settle → 'C2' gone from the desktop nav; activeElement === toggle
  it('collapse-click still reports the state from before the click')
  //   onCollapseClick spy: first toggle click → called with (Event, 'More', false)
  it(
    'ArrowDown from the open toggle focuses the first link and prevents default',
  )
  it('ArrowDown and ArrowUp move one link and stop at the ends') // C1→C2→C3→C3→C2→C1→C1
  it('arrows follow focus moved by Tab') // focus C2, Down → C3
  it('ArrowUp from the open toggle prevents default and keeps focus on it')
  it('arrows with the dropdown closed are not handled') // never opened, and just closed
  it('other keys are not prevented') // Tab, 'a'
  it('two dropdowns: arrows move only within their own links')
  //   menu: { title: 'A', children: [A1, A2] }, { title: 'B', children: [B1, B2] };
  //   open A, open B, A2 still in the DOM; focus B1: Up → B1, Down → B2, Down → B2
  it(
    'dropdown links: current has aria-current and the highlight background, _blank has new-tab text',
  )
  //   C1 current: aria-current 'page', hasClasses(C1, generateClass.bgColorVariant({ color: 'primary' }));
  //   C2: no aria-current, that check false
  it('the dropdown toggle uses the shared focus ring')

  // MclHeaderA.server.test.ts
  it(
    'the dropdown toggle is server-rendered with aria-expanded="false" and type="button"',
  )
  //   regex over the html for the <button ...> tag whose content includes 'More'
  ```

- [ ] **Step 2: Run the tests and watch them fail**

  Run: `pnpm exec vitest run src/components/mcl-header`

  Expected:
  - The `aria`, arrow-key, children and focus-ring tests FAIL.
  - The focus-return and payload tests may PASS already (base `itemClick`, existing emit). They pin behaviour.
  - The closed/other-keys tests may PASS.

- [ ] **Step 3: Implement**
  - **Toggle button.** Bind `v-bind="attrs"` and `type="button"`, and give it a `ref`. Replace `outline-none` with the focus ring.
  - **Arrow keys.**
    - Replace `@keyup.down/up`, `navKeyUp`, `navIndexRef` and `navItemRef` with `@keydown="onArrowKey"` on the wrapper.
    - `onArrowKey(e: KeyboardEvent): void` follows `MclDropdownA.vue`'s `onArrowKey`, with items found by `:scope > a`. Add a comment pointing at #135.
  - **Toggle click.** `dropdownButtonClick` keeps passing `dropdownState`.
  - **Child links.**
    - Bind `:aria-current`, and add the new-tab span.
    - When current, swap `bgColorVariant({ color: bgColor })` for `bgColorVariant({ color: highlightColor })` plus `bg-opacity-50`.

- [ ] **Step 4: Run the tests and watch them pass**

  Run: `pnpm exec vitest run src/components/mcl-header && pnpm --filter @bobbykim/mcl-header typecheck`

  Expected: all PASS; typecheck exits 0.

- [ ] **Step 5: Commit**

  `fix(mcl-header): NavDropdown state, focus return and arrow keys (#131)`

---

### Task 5: NavCollapse (MclHeaderA mobile) — `useCollapseTrigger`, children

**Files:**

- Modify: `src/components/mcl-header/lib/mcl-header-a/NavCollapse.vue` (remove `navId` and `handleNavId`)
- Modify: `src/components/mcl-header/lib/mcl-header-a/MclHeaderA.vue` (drop `:nav-id`)
- Test: `MclHeaderA.test.ts`

**Interfaces:**

- **Consumes:** `useCollapseTrigger(collapseRef, { id })` from `@bobbykim/manguito-theme/composable`, which returns `{ attrs, isOpen, toggle }`; `useId()` from `vue`.

- [ ] **Step 1: Write the failing tests**

  These run in the mobile panel after opening the drawer.

  ```ts
  it(
    'the mobile collapse toggle exposes aria-expanded and aria-controls and is type="button"',
  )
  //   'false' → click → 'true'; the element with id === aria-controls contains link 'C1';
  //   the chevron svg has 'rotate-180' when open
  it('two mobile collapses with the same title control different panels')
  //   menu has two { title: 'More', ... } entries with children X1 / Y1:
  //   the two aria-controls differ, and each panel contains its own child
  it('no id is built from the item title') // document.getElementById('nav-more') === null
  it('mobile collapse-click still reports the state from before the click') // (Event, 'More', false)
  it('choosing a mobile collapse link returns focus to the drawer button')
  it(
    'mobile collapse links: current is underlined with aria-current, _blank has new-tab text',
  )
  it('the mobile collapse toggle uses the shared focus ring')
  ```

- [ ] **Step 2: Run the tests and watch them fail**

  Run: `pnpm exec vitest run src/components/mcl-header`

  Expected:
  - The `aria`, same-title, title-id, children and focus-ring tests FAIL.
  - The payload and drawer-focus tests PASS. They are pins.

- [ ] **Step 3: Implement**
  - **Ids and state.**
    - `const id = useId()`, and `useCollapseTrigger(collapseRef, { id })`.
    - The `Collapse` gets `:id="id"`.
    - The button gets `v-bind="attrs"` and `type="button"`, and its click calls the composable's `toggle`.
  - **Payload.** The payload still comes from the `@open` / `@close` `toggle` ref.
  - **Children.** Bind `:aria-current`, add `underline` when current, and add the new-tab span.
  - **Focus ring.** Replace `outline-none`.
  - **Cleanup.** Remove `navId` and the `:nav-id` binding.

- [ ] **Step 4: Run the tests and watch them pass**

  Run: `pnpm exec vitest run src/components/mcl-header && pnpm --filter @bobbykim/mcl-header typecheck`

  Expected: all PASS.

- [ ] **Step 5: Commit**

  `fix(mcl-header): NavCollapse state and unique ids (#131)`

---

### Task 6: NavCollapseVertical (MclHeaderB) — `useCollapseTrigger`, focus on close, children

**Files:**

- Modify: `src/components/mcl-header/lib/mcl-header-b/NavCollapseVertical.vue` (remove `navId` and `getNavId`)
- Modify: `src/components/mcl-header/lib/mcl-header-b/MclHeaderB.vue` (drop both `:nav-id`)
- Test: `MclHeaderB.test.ts`, `MclHeaderB.server.test.ts`

**Interfaces:**

- **Consumes:** as in Task 5.
- **Keeps:** `defineExpose({ closeCollapse })`. `closeCollapse()` must never move focus.

- [ ] **Step 1: Write the failing tests**

  ```ts
  it(
    'the sidebar collapse toggle exposes aria-expanded and aria-controls and is type="button"',
  )
  it(
    'desktop and mobile collapses, and two with the same title, all control different panels',
  )
  //   open drawer; collect aria-controls of every collapse toggle: all distinct, each panel has its own child
  it(
    'choosing a desktop sidebar collapse link moves focus to that collapse toggle',
  )
  //   open 'More' on desktop; focus C1; click; nextTick; settle →
  //   activeElement === desktop 'More' toggle, and its aria-expanded === 'false'
  it('choosing a mobile collapse link leaves focus on the drawer button')
  //   open drawer, open the mobile 'More', click C1 → activeElement === menuButton()
  it('a desktop top-level link chosen while a collapse is open keeps focus')
  //   open desktop 'More'; focus 'Home'; click → activeElement === Home link
  it('collapse-click still reports the state from before the click')
  it(
    'collapse links: current has aria-current and its highlight drawn, _blank has new-tab text',
  )
  //   same class checks as NavLinkVertical in Task 3, on the child link

  // MclHeaderB.server.test.ts
  it(
    'the sidebar collapse toggle is server-rendered with aria-expanded="false" and type="button"',
  )
  ```

- [ ] **Step 2: Run the tests and watch them fail**

  Run: `pnpm exec vitest run src/components/mcl-header`

  Expected:
  - The `aria`, distinct-id, desktop-focus, children and server tests FAIL.
  - The mobile-focus, top-level-link and payload tests PASS. They are pins.

- [ ] **Step 3: Implement**
  - **Ids and state.** Same wiring as Task 5, with `useId()` per instance.
  - **`handleChildClick`.**
    - It keeps its order: emit `child-click`, then close.
    - Then, if the panel (`document.getElementById(id)` or a template ref) still contains `document.activeElement`, focus the toggle button.
    - Remove the duplicated `collapseRef.value?.close()` / `closeCollapse()` pair; one close is enough.
  - **Children.** `aria-current`, the highlight when current (as Task 3's `NavLinkVertical`, applied to `childItemColorClass`), and the new-tab span.
  - **Cleanup.** Remove `navId` and both `:nav-id` bindings.

- [ ] **Step 4: Run the tests and watch them pass**

  Run: `pnpm exec vitest run src/components/mcl-header && pnpm --filter @bobbykim/mcl-header typecheck`

  Expected: all PASS.

- [ ] **Step 5: Commit**

  `fix(mcl-header): NavCollapseVertical state, ids and focus on close (#131)`

---

### Task 7: Stories, docs, changeset

**Files:**

- Modify: `src/stories/sections/mcl-header/mcl-header-a/headerA.stories.ts`
- Modify: `src/stories/sections/mcl-header/mcl-header-b/headerB.stories.ts`
- Modify: `src/stories/sections/mcl-header/mcl-header-b/HeaderBSlotItem.vue`
- Modify: `src/stories/sections/mcl-header/MclHeaderA.mdx`, `MclHeaderB.mdx`
- Create: `.changeset/mcl-header-a11y.md`

- [ ] **Step 1: Turn axe to error and see what fails**
  - Add `parameters: { a11y: { test: 'error' } }` to both `meta` objects.
  - Add `titleLevel` (options `h1`–`h4`) to both `argTypes`.
  - Mark one menu item `current: true` in each story's menu data.

  Run: `pnpm test:storybook`

  Expected: the `HeaderB` slot story FAILS on `svg-img-alt`. Any other violation is fixed per the spec's "Left to the builder" rule and recorded as a ruling.

- [ ] **Step 2: Fix `HeaderBSlotItem.vue`**
  - Wrap each SVG in `<a href="#" aria-label="GitHub|LinkedIn|Instagram">`.
  - On each SVG: drop `role="img"`, add `aria-hidden="true" focusable="false"`.

- [ ] **Step 3: Add keyboard play tests**
  - **`MclHeaderAKeyboard`** (desktop viewport):
    1. Tab to the first dropdown toggle, Enter: `aria-expanded="true"`.
    2. ArrowDown twice: focus is on the second child.
    3. Enter on it, then wait for focus on the toggle and `aria-expanded="false"`.
  - **`MclHeaderBKeyboard`** (desktop viewport):
    1. Click the first sidebar collapse toggle: `aria-expanded="true"`.
    2. Focus its first child and press Enter. The story's `menuItemAsLink` is false, so nothing navigates.
    3. Wait for focus on the toggle and `aria-expanded="false"`.

  Run: `pnpm test:storybook`

  Expected: all PASS.

- [ ] **Step 4: Docs and changeset**
  - **Both MDX pages:**
    - document `titleLevel`, noting that the default is no longer a heading;
    - document `current` on `MenuItemType`;
    - add a Keyboard section: Tab, Enter/Space, Escape (dropdown), arrows (MclHeaderA dropdown), and where focus goes after a choice.
  - **The changeset:** write it as in the Global Constraints, in the style of `.changeset/mcl-dropdown-a11y.md`.

- [ ] **Step 5: Full verification**

  Run: `pnpm test && pnpm test:storybook && pnpm lint && pnpm format:check && pnpm typecheck && pnpm run story:build`

  Expected: every command exits 0. `story:build` is the only check that compiles MDX.

- [ ] **Step 6: Commit**

  `test(stories): mcl-header a11y error level, keyboard stories, docs and changeset (#131)`
