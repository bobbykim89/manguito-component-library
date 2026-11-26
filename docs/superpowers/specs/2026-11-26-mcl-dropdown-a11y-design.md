# mcl-dropdown accessibility fixes (#135)

## Intent

The audit (#128–#138) filed four findings against `MclDropdownA` in #135. This change fixes all four, so the dropdown works with a keyboard and a screen reader. Its mouse behaviour and look stay as they are.

The base `DropdownContainer` / `DropdownContent` in `manguito-theme` were fixed in #128 (PR #141). They now provide what most of this fix needs:

- The `toggler` slot passes `attrs` (`aria-expanded`, plus `aria-controls` pointing at the content's id).
- `itemClick()` returns focus to the toggler.
- Escape closes the open menu, returns focus and calls `preventDefault()`.

`MclDropdownA` only has to use them.

## Goals

- **Every checkbox in #135 is resolved.** The issue body is the checklist.
- **The toggle announces its state.** It binds the slot's `attrs`, so it gets `aria-expanded` and `aria-controls`.
- **Choosing an item leaves focus on the toggle**, not on `<body>`.
  - This already works through the base `itemClick()`, since `MclDropdownA` passes `$event` to `toggle`.
  - A test pins it here.
- **The toggle and every item are `type="button"`**, so neither submits an enclosing `<form>`.
- **The arrow keys work without errors** (my calls on the details):
  - They are handled on `keydown`, not `keyup`.
  - They act only while the list is open. When they act, they call `preventDefault()`, so the page doesn't scroll.
  - Down from the toggle focuses the first item.
  - Down and Up move one item and stop at the last or first item without wrapping, which is what the docs already promise. Up from the toggle does nothing.
  - The position comes from the item that has focus, not from a stored counter, so Tab and the arrows agree.
  - Arrows from anywhere else, or while the list is closed, are left alone and don't throw.
- **#135 is closed off.** `src/stories/components/mcl-dropdown/**` sets `parameters: { a11y: { test: 'error' } }` and passes `pnpm test:storybook`. A keyboard play test covers the toggle, the arrows and the focus return.
- **The docs page's keyboard section is correct.** Today it swaps Up and Down; it should describe Tab, Enter/Space, Escape and the arrows as built.

## Non-goals

- **The menu pattern.** That means `role="menu"`, `aria-haspopup`, Home/End, opening the list with Down while it's closed, and typeahead. The issue asks for the disclosure pattern, and `aria-haspopup` only goes with full menu roles and keys.
- **Changes to the base dropdown in `manguito-theme`.**
- **Rendering items as links.** `DropdownItem` carries a `link` field in the stories, but items stay buttons that emit `item-click`.
- **Visual changes.**
- **Changes to the `button-click` / `item-click` events or their payloads.**

## Anti-goals

- **Different mouse behaviour.** A click still toggles the list, and a click on an item still closes it and emits `item-click`.
- **Arrow keys that scroll the page while the list is open and focus is in it.**
- **Swallowing arrows that the dropdown didn't use.** That includes the list being closed and focus being somewhere else on the page.

## Constraints

- **Package version.** `@bobbykim/mcl-dropdown` is at `0.13.8`. Under the repo's 0.x convention (see the #129/#130/#128 changesets), behaviour or DOM changes ship as a **minor** bump, with a changeset that says what changed for consumers. This differs from the "patch" mentioned in conversation; it's my call, made to follow the convention.
- **Release order.**
  - The focus return and `attrs` come from the unreleased `manguito-theme` changeset (`1.6.0` → next minor).
  - `mcl-dropdown` depends on it as `workspace:*`, which publishes as that exact version, so the two release together.
  - The changeset says so.
- **Tests:**
  - Unit tests use Vitest + `@vue/test-utils` in jsdom, in `MclDropdownA.test.ts`, next to the existing hydration test.
  - The server test must keep passing.
  - Story tests run with `pnpm test:storybook`.

## Approaches

|       | Approach                                                                                                      | Trade-off                                                                                                                                                                                  |
| ----- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **A** | **Fix `MclDropdownA` on top of the #128 base: bind `attrs`, add `type="button"`, rewrite the arrow handler.** | **Small. It reuses the tested base behaviour and keeps the disclosure pattern the issue asks for.**                                                                                        |
| B     | Move arrow-key handling into the base `DropdownContainer`                                                     | Every dropdown would get arrows, but the base slot content is arbitrary, so it would have to guess which elements are items. That is scope beyond #135 and a second package change.        |
| C     | Convert to an ARIA menu (`role="menu"`, roving focus, Home/End)                                               | Richer keyboard support, but the issue warns against `aria-haspopup` without the full pattern, and screen readers switch into menu mode, which changes the interaction for existing users. |

**Chosen: A (approved by the maintainer).**

## Left to the builder

- **How to find the item buttons for the arrow handler.** Template refs or a query inside the content element both work. It must not rely on the index of a `v-for` ref array staying in step.
- **Test names and the story layout of the keyboard play test.**
