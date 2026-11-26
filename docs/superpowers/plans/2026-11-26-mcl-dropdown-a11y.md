# mcl-dropdown Accessibility Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Resolve every finding in #135, so `MclDropdownA` announces its state, keeps focus, never submits a form, and has working arrow keys. Then switch its stories to `a11y: 'error'`.

**Architecture:**

- All component changes are in `MclDropdownA.vue`. It uses what the #128 base dropdown already provides: the toggler slot's `attrs` and `itemClick()` focus return.
- The `keyup` arrow handler and its stored index are replaced by a `keydown` handler on the wrapper `div`.
  - It finds this dropdown's items through the toggle's `aria-controls` id.
  - It works out the current position from `document.activeElement`.
- Stories, docs and a changeset close the issue.

**Tech Stack:** Vue 3.5 SFC, Vitest + jsdom with the `@mcl/test-utils/ssr` `hydrate` harness, and Storybook 10 play tests (`storybook/test`) with axe.

**Spec:** `docs/superpowers/specs/2026-11-26-mcl-dropdown-a11y-design.md`

## Global Constraints

- **Pattern.** Use the disclosure pattern only:
  - No `role="menu"` or `aria-haspopup`.
  - No Home/End.
  - Down does not open a closed list.
  - Arrows don't wrap.
- **Unchanged behaviour.**
  - Mouse behaviour, the look, and the `button-click` / `item-click` events and payloads stay the same.
  - No changes to `src/components/manguito-theme`.
- **Changeset.** `.changeset/mcl-dropdown-a11y.md` is a **minor** bump for `@bobbykim/mcl-dropdown`. It notes that the release needs the next `@bobbykim/manguito-theme` minor, which is the pending `manguito-theme-a11y` changeset.
- **Story scope.** `a11y: { test: 'error' }` goes on `src/stories/components/mcl-dropdown/mcl-dropdown-a/dropdownA.stories.ts`, the only story file in the package.
- **Arrow-key rule.** It decides the spec's "when they act" line and its anti-goal.
  - **When it applies:** Up and Down are handled only while the toggle has `aria-expanded="true"` and focus is on the toggle or one of this dropdown's items.
  - **What "handled" means:** the handler calls `preventDefault()`, then moves focus if there is somewhere to move.
  - **What gets left alone:** everything else, including a closed list, other keys and focus elsewhere.
- **Commits.** Use conventional commit messages ending with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

1. **Two `MclDropdownA` on one page.** Arrows in one move only within its own items. Pinned in Task 2.
2. **An empty `dropdownItems` list, opened.** Down from the toggle doesn't throw and moves nothing. Pinned in Task 2.
3. **An `MclDropdownA` inside a `Modal`.** Escape closes the list first, as in #128. The new `keydown` handler must not call `preventDefault()` on Escape or Tab. Pinned in Task 2 (the "other keys" test).
4. **A list closed by a click but still fading out** (`v-if` inside a `Transition`). Arrows are not handled once `aria-expanded` is `false`. Pinned in Task 2 (the closed-list test). It reads `aria-expanded`, not whether the content is in the DOM.
5. **Server render.** It must not touch `document` in setup. The existing `MclDropdownA.server.test.ts` must keep passing (Task 1 and Task 2 runs).

---

### Task 1: Toggle state, button types and focus return

**Files:**

- Modify: `src/components/mcl-dropdown/lib/mcl-dropdown-a/MclDropdownA.vue` (toggler slot ~158-160; item button ~189)
- Test: `src/components/mcl-dropdown/lib/mcl-dropdown-a/MclDropdownA.test.ts`

**Interfaces:**

- Consumes: the base `toggler` slot props `{ toggle, dropdownState, attrs }`, where `attrs` is `{ 'aria-expanded': boolean; 'aria-controls': string }`. Also `DropdownContent`'s `itemClick()`, which returns focus to the element passed to `toggle(e)` as `e.currentTarget`.
- Produces: the toggle button carries `aria-controls` = the content element's id. Task 2 finds the items through it.

- [ ] **Step 1: Write the failing tests.**
  - Add a second `describe('MclDropdownA accessibility (#135)')` to `MclDropdownA.test.ts`, using `hydrate`.
  - Use a `render(extra?: Record<string, unknown>)` with three items: `Item One`, `Item Two`, `Item Three`.
  - Add `const settle = () => new Promise((r) => setTimeout(r, 50))`.
  - Clear `document.body` in `afterEach`.
  - The toggle is `r.container.querySelector('button')`.
  - An item is the `button` whose text is the item title.

```ts
it('toggle exposes aria-expanded and aria-controls', async () => {
  // before: aria-expanded "false", aria-controls truthy
  // click toggle, await nextTick()
  // after: aria-expanded "true"; the "Item One" button is inside #<aria-controls>
})
it('toggle and items are type="button"', async () => {
  // open; toggle and all three items have getAttribute('type') === 'button'
})
it('choosing an item closes the list, returns focus to the toggle and emits item-click', async () => {
  // render({ onItemClick: spy }); open; focus "Item Two"; click it; nextTick; settle
  // list gone (container text lacks "Item Two"); document.activeElement === toggle
  // spy called once with (expect.any(Event), { title: 'Item Two' })
})
```

- [ ] **Step 2: Run the tests and check that the first two fail.**

Run: `pnpm exec vitest run src/components/mcl-dropdown`
Expected:

- `toggle exposes aria-expanded…` FAILS: `aria-expanded` is null.
- `toggle and items are type="button"` FAILS: `type` is null.
- `choosing an item…` PASSES already. It pins the #128 base behaviour; note this, don't change the test.

- [ ] **Step 3: Implement the fix in `MclDropdownA.vue`.**
  - Destructure `attrs` in `#toggler`, and add `v-bind="attrs"` and `type="button"` to the toggle.
  - Add `type="button"` to each item button.
  - Keep `toggle($event)` receiving the event; focus return depends on it.

- [ ] **Step 4: Run the tests and check that they pass.**

Run: `pnpm exec vitest run src/components/mcl-dropdown`
Expected: all PASS, including the hydration and server tests.

- [ ] **Step 5: Commit.**

```bash
git add src/components/mcl-dropdown/lib/mcl-dropdown-a
git commit -m "fix(mcl-dropdown): expose toggle state and stop buttons submitting forms (#135)"
```

### Task 2: Arrow keys on keydown, derived from focus

**Files:**

- Modify: `src/components/mcl-dropdown/lib/mcl-dropdown-a/MclDropdownA.vue`. Remove `contentIndexRef`, `contentItemRef`, `dropdownItemKeyUp`, the index reset in `dropdownButtonClick`, `ref="contentItemRef"` and the `@keyup.*` listeners.
- Test: `src/components/mcl-dropdown/lib/mcl-dropdown-a/MclDropdownA.test.ts`

**Interfaces:**

- Consumes: the toggle's `aria-expanded` and `aria-controls` from Task 1.
- Produces: `onArrowKey(e: KeyboardEvent): void`, bound with `@keydown` on the wrapper `div`, and `togglerRef: Ref<HTMLButtonElement | undefined>` on the toggle.

- [ ] **Step 1: Write the failing tests.**
  - Add `describe('MclDropdownA arrow keys (#135)')`, reusing Task 1's helpers.
  - Add a helper `key(el: Element, k: string): KeyboardEvent`. It dispatches `new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true })` on `el` and returns the event.
  - Add `open(r)`, which clicks the toggle and awaits `nextTick()`.

```ts
it('ArrowDown from the open toggle focuses the first item and prevents default', ...)
  // open; toggle.focus(); e = key(toggle,'ArrowDown'); e.defaultPrevented true; active = "Item One"
it('ArrowDown and ArrowUp move one item and stop at the ends', ...)
  // focus "Item One": Down → Two, Down → Three, Down → Three (prevented), Up → Two, Up → One, Up → One (prevented)
it('arrows follow focus moved by Tab', ...)
  // open; "Item Two".focus() directly (no prior arrows); Down → "Item Three"
it('ArrowUp from the open toggle prevents default and leaves focus on the toggle', ...)
it('arrows with the list closed are not handled', ...)
  // closed: toggle.focus(); expect(() => key(toggle,'ArrowDown')).not.toThrow(); not prevented; active still toggle
  // open then click toggle again (closing, content may still be leaving): Down not prevented
it('other keys are not prevented', ...)
  // open; on "Item One": key 'Tab' and key 'a' → defaultPrevented false
  // (Escape is the base's to prevent; don't assert it here)
it('with no items, ArrowDown from the open toggle does not throw', ...)
  // render({ dropdownItems: [] }); open; Down → no throw, active is toggle
it('two dropdowns: arrows move only within their own items', ...)
  // render a fragment of two MclDropdownA (items A1,A2 / B1,B2); open both;
  // focus B1; Down → B2; Down → B2 (stays, not A-anything)
```

- [ ] **Step 2: Run the tests and check that they fail.**

Run: `pnpm exec vitest run src/components/mcl-dropdown`
Expected: the `ArrowDown…`, `move one item…`, `follow focus…`, `ArrowUp from the open toggle…` and `two dropdowns…` tests FAIL. The handler listens on `keyup`, so keydown neither moves focus nor prevents default. The closed, other-keys and no-items tests may already pass.

- [ ] **Step 3: Implement `onArrowKey(e: KeyboardEvent): void`.**
  - Return early unless `e.key` is `'ArrowDown'` or `'ArrowUp'`, and `togglerRef.value?.getAttribute('aria-expanded') === 'true'`.
  - Items are the `button` children of `document.getElementById(<toggle's aria-controls>)`.
  - Work out the index as `items.indexOf(document.activeElement)`. If focus is on neither the toggle nor an item, return without preventing.
  - Otherwise call `preventDefault()` and work out the target:
    - Down from the toggle → item 0.
    - Down from item `i` → `min(i + 1, last)`.
    - Up from item `i` → `max(i - 1, 0)`.
    - Up from the toggle → none.
  - Focus the target if it exists.
  - Touch `document` only inside the handler.

- [ ] **Step 4: Run the tests and check that they pass.**

Run: `pnpm exec vitest run src/components/mcl-dropdown && pnpm --filter @bobbykim/mcl-dropdown typecheck`
Expected: all PASS; typecheck exits 0.

- [ ] **Step 5: Commit.**

```bash
git add src/components/mcl-dropdown/lib/mcl-dropdown-a
git commit -m "fix(mcl-dropdown): handle arrow keys on keydown from the focused item (#135)"
```

### Task 3: Stories, docs and changeset

**Files:**

- Modify: `src/stories/components/mcl-dropdown/mcl-dropdown-a/dropdownA.stories.ts`
- Modify: `src/stories/components/mcl-dropdown/MclDropdownA.mdx`
- Create: `.changeset/mcl-dropdown-a11y.md`

**Interfaces:**

- Consumes: the behaviour from Tasks 1 and 2.

- [ ] **Step 1: Write the failing story.**
  - Set `parameters: { a11y: { test: 'error' } }` on `meta`.
  - Add `MclDropdownAKeyboard` (`name: 'MclDropdownA Keyboard'`, spreading `MclDropdownAExample`). Its play test:
    1. `userEvent.tab()`: the toggle (`/MCL Dropdown A/`) has focus and `aria-expanded="false"`.
    2. `{Enter}`: wait for `aria-expanded="true"`, then wait for item 1 to be visible.
    3. `{ArrowDown}`: item 1 is focused. Press it again: item 2 is focused. `{ArrowUp}`: item 1 is focused.
    4. `{Enter}`: wait for `aria-expanded="false"`; the toggle has focus.

- [ ] **Step 2: Run the story and check that it passes on the fixed component.**

Run: `pnpm test:storybook`
Expected: all PASS, including `MclDropdownA Keyboard`.

Then check that the test can fail:

1. Temporarily change `@keydown="onArrowKey"` back to `@keyup="onArrowKey"`.
2. Re-run with `-t "Keyboard"`. The Keyboard story must FAIL at the first ArrowDown focus check.
3. Restore with `git checkout -- src/components`.

- [ ] **Step 3: Update `MclDropdownA.mdx`.**
  - Replace the "Keyboard accessibility" list:
    - `Tab` / `Shift+Tab`: move between the button and the items.
    - `Enter` / `Space` on the button: open or close the list.
    - `Arrow Down`: from the button (list open), focus the first item; on an item, focus the next item (no effect on the last).
    - `Arrow Up`: focus the previous item (no effect on the first item or the button).
    - `Escape`: close the list and return focus to the button.
    - Choosing an item closes the list and returns focus to the button.
  - Add one line under it: the button exposes `aria-expanded` and `aria-controls`.
  - Ruling: fix the page's existing wrong heading (`# MCL Container B` → `# MCL Dropdown A`) and import (`MclDropdown` → `MclDropdownA`). It's the same page, a one-line fix each, and the page is what consumers copy.

- [ ] **Step 4: Write `.changeset/mcl-dropdown-a11y.md`.**
  - Frontmatter: `'@bobbykim/mcl-dropdown': minor`.
  - Body: one sentence on what the change is for (#135), plus bullets:
    - The toggle exposes `aria-expanded` / `aria-controls`.
    - Choosing an item returns focus to the toggle.
    - The toggle and the items are `type="button"`, so they no longer submit an enclosing form.
    - Arrow keys are handled on `keydown` (was `keyup`) while the list is open. They no longer scroll the page or throw, and they follow Tab.
  - Final line: it needs the `@bobbykim/manguito-theme` release from the pending #128 changeset, and the two publish together.

- [ ] **Step 5: Verify everything.**

Run: `pnpm test && pnpm test:storybook && pnpm lint && pnpm format:check && pnpm typecheck && pnpm run story:build`
Expected: every command exits 0. `story:build` is the only check that compiles MDX.

- [ ] **Step 6: Commit.**

```bash
git add src/stories/components/mcl-dropdown .changeset/mcl-dropdown-a11y.md
git commit -m "test(stories): MclDropdownA keyboard story, docs and changeset (#135)"
```

The PR is titled `fix(mcl-dropdown): accessibility fixes (#135)`, and its body includes `Closes #135`.
