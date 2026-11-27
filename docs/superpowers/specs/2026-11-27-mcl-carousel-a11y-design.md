# mcl-carousel accessibility fixes (#133)

## Intent

The audit (#128–#138) filed 8 findings against `MclCarouselA` and its stories in #133. This change fixes all 8, so the carousel works with a keyboard and a screen reader. For mouse users the behaviour and the look stay the same.

How the carousel works today:

- It is a `<section>` that clips its content (`overflow-hidden`).
- The section holds a title block, a description slot, and two round Prev/Next buttons.
- Below them is the card row: a flex `div` (`slideContainer`). The consumer fills it through the `carousel` slot, so the row's direct children are the cards.
- `useCarouselSlide` moves the row with `translateX`, one card per button press. It keeps `currentIndex`, the card aligned to the left edge.
  - Prev is disabled at index 0.
  - Next is disabled once an `IntersectionObserver` sees the last card 75% in view.
  - An `isMoving` guard ignores presses while a slide is running. It is released on the row's own `transitionend`.

## Goals

Every checkbox in #133 gets resolved; the issue body is the checklist.

1. **Focus never drops when a nav button reaches the end.**
   - Both buttons use `aria-disabled="true"` instead of the `disabled` attribute.
   - The visual stays the same: `disabled:opacity-50` becomes `aria-disabled:opacity-50`.
   - A click or key press on an `aria-disabled` button does nothing: no move and no `btn-prev` / `btn-next` event.
   - The focused button keeps focus when it becomes `aria-disabled`.
2. **Cards out of view follow focus (approach A, chosen by the maintainer).**
   - Every card stays in the Tab order and the accessibility tree.
   - When focus lands inside a card that isn't fully in view, by Tab, Shift+Tab or a script calling `focus()`, the carousel slides so that card is in view.
     - **"In view" means inside the clipping `<section>`'s visible width (my call).** That is what a sighted user sees. On screens wider than the `.container`, cards slid past the container's left edge are still visible in the section's margin, so they count as in view.
     - **Target position (my call).** The follow move stays on card-aligned positions, the same `currentIndex` model the buttons use. Which index:
       - If the card is to the right of the view: the smallest `currentIndex` that puts the card fully in view.
       - If the card is to the left of the view: its own index, aligning it to the left edge as the buttons do.
     - **"Fully in view" beats "where Next would stop" (my call).** Next stops once the last card is 75% in view, so at that position the last card can still be up to 25% clipped. Tabbing to it moves one more card-aligned step if needed, so it is fully in view.
       - That can show up to one card width of empty space at the end of the row. A clipped, focused card is the worse failure (it's an anti-goal).
       - Prev and Next work from that index as usual.
   - The browser must never be left scrolling the clipping section. Focusing a clipped element makes browsers scroll the nearest scroll container, here the `overflow-hidden` section, which fights the transform. Whatever the browser scrolls is put back to 0.
   - The follow move is not blocked by the `isMoving` guard. Holding Tab must not leave a focused card out of view.
   - After a follow move, Prev/Next `aria-disabled` reflect the new position, as they do after a button move.
   - **No follow move for pointer focus (my call; mouse and touch behaviour must stay unchanged).** A mouse or touch press focuses on `mousedown`, before `click`. Moving the row then would slide another card under the pointer, and the click would land on the wrong element or be lost (every time under reduced motion).
     - Focus that comes from a pointer press inside the row doesn't trigger a follow move, so a mouse click on a partly visible card works as it does today.
     - The clipping section's scroll is still reset to 0.
   - **A follow move emits no event (my call).** `btn-prev` / `btn-next` stay tied to button presses. Neither carries a position, so a consumer can't keep a position indicator in step with them today either. The MDX says follow moves are silent.
3. **Carousel semantics (APG carousel pattern, adapted).**
   - The `<section>` gets `aria-roledescription="carousel"` and `aria-labelledby` pointing at the title. The title gets an id from `useId()`.
   - The buttons are named **"Previous cards"** and **"Next cards"** (my call; they were "previous" / "next"). Both get `aria-controls` with the row's id (from `useId()`).
   - **A status message instead of `aria-live` on the row (my call).** The audit suggested `aria-live="polite"` on the row, but sliding only changes a `transform`, not content, so a live row would announce nothing.
     - A visually hidden (`sr-only`) element with `aria-live="polite"` and `aria-atomic="true"` says which cards are in view: **"Cards 3 to 5 of 8"**, or **"Card 8 of 8"** when only one card is fully in view.
     - "In view" means fully inside the clipping section's visible width, the same measure as the follow move.
     - It updates only after a **button** move. A follow move is already announced through the focused element, so a status message there would be noise.
     - It is empty on load, so nothing is announced on page load.
   - **Slides are labelled through an opt-in slot prop (my call).** The slot children belong to the consumer. Wrapping them would change the row's direct children, which consumers size with classes like `shrink-0` and `w-80`, so it could break their layout.
     - The `carousel` slot gets a new prop, `slideAttrs(index)`. It returns `{ role: 'group', 'aria-roledescription': 'slide', 'aria-label': '<index+1> of <total>' }`, with `total = content.length`.
     - Consumers bind it on each card root: `v-bind="slideAttrs(i)"`. This mirrors `tabAttrs` from the base tabs (#128).
     - All three stories bind it, and the MDX shows it in the usage example.
     - It is optional: a consumer who doesn't bind it gets everything else.
4. **`titleLevel` prop.**
   - Type `HeadingLevel` (the same type as `MclHeaderA`/`B`'s `titleLevel`), default `'h2'`, so the output is unchanged by default.
   - The title renders as `<component :is="titleLevel">` with an inner `<span v-html="title">`. Vue's server renderer drops `v-html` on a dynamic component (learned in #131).
   - It keeps its classes and gets the `id` for `aria-labelledby`.
5. **`type="button"`** on both nav buttons.
6. **Reduced motion.**
   - The row gets `motion-reduce:transition-none`.
   - **The `isMoving` guard must not get stuck (found during design, not in the audit).** It is released on `transitionend`. With no transition, `transitionend` never fires, so the carousel would move once and then ignore every press.
   - The guard must release when the row has no running transition. How to detect that is left to the builder.
7. **Story fixes.**
   - `cardInfo` in `carouselA.stories.ts`, `MclCarouselACardB.vue` and `MclCarouselCardD.vue` gets an `alt` field.
   - Each card passes `:image-alt="card.alt"`.
   - The alt texts describe the pictures in a few words.
8. **#133 is closed off.**
   - The carousel story file sets `parameters: { a11y: { test: 'error' } }` in `meta`, and `pnpm test:storybook` passes.
   - A keyboard play test covers three things:
     - Tab into a card past the visible ones: the row slides and that card is in view.
     - Press Next with the keyboard until the end: focus stays on the button, and it is `aria-disabled`.
     - The status message updates.
9. **Docs.** `MclCarouselA.mdx` gets an Accessibility section and a Keyboard section, documents `titleLevel` and `slideAttrs`, and drops the `setRef` binding from the usage example. `setRef` is already deprecated.

## Non-goals

- Auto-rotation, or any pause control. The carousel doesn't auto-advance.
- Swipe or drag gestures.
- Arrow keys to move the carousel. The APG doesn't require them for a carousel with buttons, and Tab already moves through the cards.
- Changes to `mcl-cards`. Card alt text is a story fix here; the card components were fixed in their own issue.
- Removing the deprecated `setRef` slot prop. That is scheduled for the next major.
- Fixing how `isNextDisabled` is computed from the observer, except where Goal 2 needs it to be correct after a follow move.

## Anti-goals

- **A changed look or mouse behaviour.** The buttons still move one card per click, still dim at the ends, and still emit `btn-prev` / `btn-next` for every accepted move.
- **A change in the layout of consumers' cards.** No wrapper elements around the slot children.
- **A card out of view, but focused.** No sequence of keys may leave the focused element clipped.
- **A carousel that stops responding.** That includes reduced motion and fast repeated presses.

## Constraints

- **Version.** `@bobbykim/mcl-carousel` is at `0.12.0`. Under the repo's 0.x convention, behaviour and DOM changes are a **minor** bump.
- **Changeset.** `.changeset/mcl-carousel-a11y.md` must say:
  - the buttons use `aria-disabled` instead of `disabled`, and are renamed "Previous cards" / "Next cards";
  - there is a new `titleLevel` prop, and a new `slideAttrs` slot prop;
  - focus follow;
  - the status message;
  - the reduced-motion fix.

  The carousel uses nothing from the pending `manguito-theme` release (`mcl-focus-ring` already shipped in #122), so no publish-together note is needed. The builder confirms this.

- **Tests:**
  - Unit tests use Vitest in jsdom, in `MclCarouselA.test.ts`. A `MclCarouselA.server.test.ts` checks the server HTML: title tag and id, `aria-labelledby`, button names, `aria-controls` and `aria-disabled`.
  - jsdom has no layout, so tests that need card positions define `offsetLeft`/`offsetWidth` (or stub `getBoundingClientRect`) and stub `IntersectionObserver`.
  - The real layout behaviour (the follow move, the clipping section never scrolled) is proven in the Storybook play test in Chromium.
- **`pnpm lint`, `pnpm format:check` and `pnpm typecheck`** pass.

## Approaches

|       | Approach                                                                                                | Trade-off                                                                                                                                                                                                          |
| ----- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **A** | **Follow focus. All cards stay reachable, and focus on a card out of view slides the carousel to it.**  | **Mouse behaviour is unchanged, and screen-reader users can read every card without pressing Next. Tabbing past every card takes longer, as it does in a list.**                                                   |
| B     | Make cards out of view `inert`. Tab and screen readers reach only the visible cards; Next reveals more. | `inert` also blocks the mouse. A half-visible card at the edge either can't be clicked or has to stay reachable, which brings part of A back. Screen-reader users have to find and press Next to reach more cards. |

**Chosen: A (approved by the maintainer).**

## Left to the builder

- **How the follow move finds the card and measures positions.** One way: a `focusin` listener on the row, then the row child that contains `event.target`. Positions can come from `offsetLeft` / `offsetWidth` and the section's `getBoundingClientRect()`.
- **How pointer focus is told apart.** For example, a `pointerdown` flag on the row, cleared after `click` or on the next keydown.
- **How the clipping section's scroll is undone.** For example, a `scroll` listener on the section that sets `scrollLeft = 0`, or resetting it inside the follow move.
- **How the guard detects "no transition".** For example, read the computed `transition-duration` of the row before a move, or check `prefers-reduced-motion`.
- **Whether `useCarouselSlide` gains a `goToIndex(index)`** or the follow logic lives in the component. Keep the composable the single owner of `currentIndex` and the transform.
- **The exact status wording** within the shape "Cards X to Y of N" / "Card X of N".
- **Test names and story layout.**
