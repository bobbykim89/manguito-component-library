# mcl-carousel Accessibility Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Resolve every finding in #133, so `MclCarouselA` works with a keyboard and a screen reader, without changing it for mouse users. Then switch its stories to `a11y: 'error'`.

**Architecture:**

- **Pure geometry** (`carouselGeometry.ts`) decides which cards are fully in view and where a follow move goes. It's unit-tested on plain numbers.
- **`useCarouselSlide`** stays the only owner of `currentIndex` and the transform. It measures the layout, gains a follow move (`reveal`) and a visible-range read, and its guard no longer sticks without a transition.
- **`MclCarouselA.vue`** gets the semantics, `aria-disabled` buttons, `titleLevel`, `slideAttrs`, the status message, focus follow (keyboard only) and the scroll reset on the section.
- Stories, docs and a changeset close the issue.

**Tech Stack:** Vue 3.5 SFC (`useId`), `@vueuse/core`, Vitest + jsdom (`@vue/test-utils` `mount`, `@mcl/test-utils/ssr` `renderOnServer`), Storybook 10 play tests with axe in Chromium.

**Spec:** `docs/superpowers/specs/2026-11-27-mcl-carousel-a11y-design.md`

## Global Constraints

- **Package scope.** Only `@bobbykim/mcl-carousel`, its stories and docs change. No changes to `manguito-theme` or `mcl-cards`.
- **Unchanged for mouse users.**
  - The buttons move one card per accepted press and emit `btn-prev` / `btn-next(event)`.
  - They dim at the ends (`aria-disabled:opacity-50` replaces `disabled:opacity-50`).
  - A pointer press on a card never triggers a follow move.
  - No wrapper elements around slot children.
- **Copy:**
  - Button names are exactly `Previous cards` and `Next cards`.
  - The status text is `Cards ${first} to ${last} of ${total}`, or `Card ${n} of ${total}` when only one card is fully in view. The numbers are 1-based, and `total = content.length`.
  - The slide label is `${index + 1} of ${total}`.
- **`titleLevel?: HeadingLevel`** (from `@bobbykim/manguito-theme`), default `'h2'`. It renders `<component :is>` with an inner `<span v-html="title">`, because SSR drops `v-html` on a dynamic component.
- **"Fully in view"** means inside the clipping `<section>`'s visible width, with 1px tolerance.
- **No event for a follow move.** `btn-prev` and `btn-next` stay tied to button presses.
- **Changeset.** `.changeset/mcl-carousel-a11y.md` is a **minor** bump for `@bobbykim/mcl-carousel`, worded as in spec Constraints. It has no publish-together note: confirm the package uses nothing unreleased from `manguito-theme`, and record a ruling if it does.
- **Commits.** Use conventional commit messages ending with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

### Test conventions

- **Test files.** Component tests go in `src/components/mcl-carousel/lib/mcl-carousel-a/MclCarouselA.test.ts`, and server tests in `MclCarouselA.server.test.ts` (`// @vitest-environment node`).
- **Fixture.** Mount with `title: 'Fruit'`, `content: [1..8]`, and a `carousel` slot that renders 8 `<div class="card"><a href="#">Card {i+1}</a></div>`, binding `v-bind="slideAttrs(i)"` where a test needs it.
- **Layout in jsdom.** For tests that need positions, write a helper `layout(wrapper, { card: 100, gap: 10, view: 250 })`:
  - it defines `offsetLeft` / `offsetWidth` on each card;
  - it stubs `getBoundingClientRect` on whatever `useCarouselSlide` measures (see Task 2), so that three cards fit fully: cards 1–2 are fully in view, card 3 is partly in view.
- **Stubs.** `IntersectionObserver` is stubbed globally where needed. jsdom has no transitions, so a computed `transition-duration` is `''` or `0s`.
- **Test command:** `pnpm exec vitest run src/components/mcl-carousel`

## Review Focus

1. **Tab forward to the last card when Next has already stopped** (the last card 75% in view). The row moves one more step, the last card is fully in view, and Next stays `aria-disabled`. It is not re-enabled into empty space. Pinned in Task 2 (composable) and Task 4 (story).
2. **Holding Tab** (several focus moves while a move is still running). Each focused card ends up fully in view, because the guard doesn't block follow moves. Pinned in Task 2.
3. **A mouse click on a partly visible card's link.** No follow move, so the click lands on that link. Pinned in Task 3 (unit) and Task 4 (story).
4. **Reduced motion / no transition.** Next pressed three times moves three cards, and the guard never sticks. Pinned in Task 2.
5. **Enter or Space on an `aria-disabled` button.** No move, no event, and focus stays on the button. Pinned in Task 3.

---

### Task 1: Pure carousel geometry

**Files:**

- Create: `src/components/mcl-carousel/lib/mcl-carousel-a/carouselGeometry.ts`
- Test: `src/components/mcl-carousel/lib/mcl-carousel-a/carouselGeometry.test.ts`

**Interfaces:**

- **Produces:**

  ```ts
  /** A horizontal extent in row coordinates: 0 is the first card's left edge with no transform applied. */
  export interface Span {
    start: number
    end: number
  }
  export interface VisibleRange {
    first: number
    last: number
  } // 0-based, inclusive
  /** Cards fully inside `view` when the row is shifted left by `shift` px (1px tolerance); null if none. */
  export const fullyVisibleRange: (
    cards: Span[],
    shift: number,
    view: Span,
  ) => VisibleRange | null
  /** The card-aligned index to move to so `cards[target]` is fully in view, starting from `current`. */
  export const followIndex: (
    cards: Span[],
    current: number,
    target: number,
    view: Span,
  ) => number
  /** Fraction (0–1) of the last card's width inside `view` at `shift`. */
  export const lastCardFraction: (
    cards: Span[],
    shift: number,
    view: Span,
  ) => number
  ```

  The shift for index `i` is `cards[i].start`.

- [ ] **Step 1: Write the failing tests.** Fixture: `cards` = 8 spans of width 100 with a gap of 10, so `{start: 0, end: 100}`, `{110, 210}` and so on. `view = {start: 0, end: 250}`.

  ```ts
  it('fullyVisibleRange: cards wholly inside the view at a shift')
  //   shift 0 → {first: 0, last: 1}; shift 110 → {first: 1, last: 2};
  //   view {start: -120, end: 250}, shift 110 → {first: 0, last: 2} (a wide screen's left margin counts);
  //   a view narrower than one card → null
  it('fullyVisibleRange: 1px tolerance')
  //   view {0, 209.5}, shift 0 → last 1
  it('followIndex: a card already fully in view stays put')
  //   current 0, target 1 → 0
  it('followIndex: a card to the right moves by the fewest card-aligned steps')
  //   current 0, target 2 → 1; target 5 → 4
  it('followIndex: a card to the left is aligned to the left edge')
  //   current 4, target 1 → 1
  it('followIndex: the last card is fully revealed even past where Next stops')
  //   view {0, 300}: at current 5 the last card is 80% visible (where Next stops), target 7 → 6
  it('followIndex: a card wider than the view aligns to the left edge')
  //   view {0, 80}, current 0, target 3 → 3
  it('lastCardFraction')
  //   shift cards[5].start → 0.3 (30 of 100 px); shift cards[6].start → 1; view {0, 300}, shift cards[5].start → 0.8
  ```

- [ ] **Step 2: Run the tests and watch them fail.**

  Run: `pnpm exec vitest run src/components/mcl-carousel`

  Expected: the new file FAILS with "module not found".

- [ ] **Step 3: Implement `carouselGeometry.ts`.**
  - The functions are pure, with no DOM access.
  - `followIndex` rules:
    - If `target` is fully in view at `cards[current].start`, return `current`.
    - If the target's left edge is off the view's left side, return `target`.
    - Otherwise return the smallest `k` in `(current, target]` where `cards[target].end - cards[k].start <= view.end + 1`.
    - If there's none, return `target`.

- [ ] **Step 4: Run the tests and watch them pass.**

  Run: `pnpm exec vitest run src/components/mcl-carousel`

  Expected: all PASS.

- [ ] **Step 5: Commit.**

  `feat(mcl-carousel): pure geometry for visible cards and focus-follow targets (#133)`

---

### Task 2: `useCarouselSlide`: measure, reveal, visible range, and a guard that can't stick

**Files:**

- Modify: `src/components/mcl-carousel/lib/mcl-carousel-a/useCarouselSlide.ts`
- Test: `src/components/mcl-carousel/lib/mcl-carousel-a/useCarouselSlide.test.ts` (new). Mount a tiny harness component with a section `ref` and a row `ref`.

**Interfaces:**

- **Consumes:** Task 1's `Span`, `VisibleRange`, `fullyVisibleRange`, `followIndex` and `lastCardFraction`.
- **Produces:**

  ```ts
  export const useCarouselSlide: (
    container: Ref<HTMLElement | null>, // the row (unchanged)
    viewport: Ref<HTMLElement | null>, // the clipping <section> (new, required)
  ) => UseCarouselSlideReturn
  // UseCarouselSlideReturn gains:
  reveal: (cardIndex: number) => boolean // follow move; ignores the isMoving guard; true if it moved
  visibleRange: () => VisibleRange | null // fully-visible cards at the current index's target shift
  ```

  `currentIndex`, `isPrevDisabled`, `isNextDisabled` and `goTo` keep their current meaning.

- [ ] **Step 1: Write the failing tests.** They use the `layout` helper from Test conventions; its stubs target what this task measures.

  ```ts
  it('moves on every press when the row has no transition (reduced motion)')
  //   goTo('next') ×3 → each returns true; currentIndex 3
  it('still ignores a press while a transition is running')
  //   stub getComputedStyle(row).transitionDuration = '0.5s'; goTo('next') true, goTo('next') false;
  //   dispatch transitionend on the row → goTo('next') true
  it('reveal moves the fewest card-aligned steps and ignores the guard')
  //   transitionDuration '0.5s'; goTo('next') (index 1, moving); reveal(4) → true, currentIndex 3,
  //   row.style.transform 'translateX(-330px)'
  it('reveal of a card already fully in view does nothing')
  //   reveal(1) at index 0 → false, transform unchanged
  it('reveal past where Next stops keeps Next disabled')
  //   layout view 300; goTo('next') ×5 (index 5, last card 80% in view, isNextDisabled true via the observer stub);
  //   reveal(7) → currentIndex 6, isNextDisabled true
  it('visibleRange reports the cards fully in view at the current index')
  //   index 0 → {first: 0, last: 1}; after goTo('next') → {first: 1, last: 2}
  ```

- [ ] **Step 2: Run the tests and watch them fail.**

  Run: `pnpm exec vitest run src/components/mcl-carousel`

  Expected: all FAIL. The first one fails because the guard sticks after one move.

- [ ] **Step 3: Implement.**
  - **Card spans:** `offsetLeft - first.offsetLeft` and `+ offsetWidth`, as `applyTransform` already measures.
  - **The `view` span** must be right mid-transition. Take the section's `getBoundingClientRect()` relative to the first card's _untransformed_ left. Derive that from an untransformed ancestor's rect (the row's parent) rather than the row's own rect, which includes the transform.
  - **The guard:** after a move, if the row's computed `transition-duration` is 0 (or empty), release `isMoving` immediately.
  - **`reveal`:**
    - set `currentIndex` to `followIndex(...)`;
    - apply the transform;
    - set `isNextDisabled = lastCardFraction(..) >= LAST_CARD_VISIBILITY_THRESHOLD`.

    The observer won't fire again if the last card stays in view.

  - Update the one caller in `MclCarouselA.vue` to pass the section ref (add `ref="section"`), so the build stays green.

- [ ] **Step 4: Run the tests and watch them pass.**

  Run: `pnpm exec vitest run src/components/mcl-carousel && pnpm --filter @bobbykim/mcl-carousel typecheck`

  Expected: all PASS; typecheck exits 0.

- [ ] **Step 5: Commit.**

  `fix(mcl-carousel): follow-move and visible range in useCarouselSlide; guard no longer sticks without a transition (#133)`

---

### Task 3: `MclCarouselA`: semantics, buttons, title, slides, status, focus follow

**Files:**

- Modify: `src/components/mcl-carousel/lib/mcl-carousel-a/MclCarouselA.vue`, `index.types.ts`
- Test: `MclCarouselA.test.ts` (update the existing `aria-label` lookups to the new names), `MclCarouselA.server.test.ts` (new)

**Interfaces:**

- **Consumes:** Task 2's `useCarouselSlide(row, section)`, `reveal` and `visibleRange`.
- **Produces:** `MclCarouselASlotProps` gains `slideAttrs: (index: number) => SlideAttrs`. `SlideAttrs` is exported from `index.types.ts` and the package index:

  ```ts
  export interface SlideAttrs {
    role: 'group'
    'aria-roledescription': 'slide'
    'aria-label': string
  }
  ```

  There is a new prop, `titleLevel?: HeadingLevel` (default `'h2'`).

- [ ] **Step 1: Write the failing tests.**

  ```ts
  // MclCarouselA.server.test.ts
  it('server html carries the carousel semantics')
  //   <section ... aria-roledescription="carousel" aria-labelledby="X"> where an <h2 ... id="X"> exists;
  //   the title text 'Fruit' is in the html; buttons: type="button", aria-label="Previous cards"/"Next cards",
  //   aria-controls equals the row's id; Previous has aria-disabled="true", Next aria-disabled="false"; no ' disabled'
  it('titleLevel renders that heading')
  //   titleLevel 'h3' → '<h3' present, '<h2' absent

  // MclCarouselA.test.ts — describe('MclCarouselA accessibility (#133)')
  it('nav buttons are named, typed and control the row')
  it('an aria-disabled button ignores activation and keeps focus')
  //   focus Previous at index 0; click and keydown Enter/Space → no btn-prev, transform unchanged, activeElement Previous
  it('Next at the end stays focused and becomes aria-disabled')
  //   layout + IntersectionObserver stub that reports the last card intersecting after a move;
  //   focus Next, click until aria-disabled="true" → activeElement is still Next
  it('nav buttons dim with aria-disabled:opacity-50, not disabled:opacity-50')
  it('slideAttrs labels each slide n of total')
  //   card i root: role group, aria-roledescription slide, aria-label `${i+1} of 8`
  it(
    'the status message is empty on load and names the cards in view after a button move',
  )
  //   [aria-live="polite"][aria-atomic="true"].sr-only text '' ; click Next → 'Cards 2 to 3 of 8'
  it('the status message uses the singular when one card is fully in view')
  //   layout with view narrower than two cards → 'Card 2 of 8'
  it(
    'keyboard focus on a card out of view slides it into view without emitting',
  )
  //   layout; focus card 5's link (focusin, no pointerdown) → transform 'translateX(-330px)';
  //   no btn-next/btn-prev; status text unchanged
  it('pointer focus does not slide the carousel')
  //   pointerdown then focus on card 3's link → transform unchanged
  it('the clipping section is never left scrolled')
  //   set section.scrollLeft = 40, dispatch scroll → 0
  it('the row skips its slide animation under reduced motion')
  //   row classList contains 'motion-reduce:transition-none'
  ```

- [ ] **Step 2: Run the tests and watch them fail.**

  Run: `pnpm exec vitest run src/components/mcl-carousel`

  Expected: the new tests FAIL. The existing focus-ring test fails until its lookup uses the new names. Update it in this step.

- [ ] **Step 3: Implement in `MclCarouselA.vue`.**
  - **Ids:** `useId()` gives the title id and the row id.
  - **The section:** `aria-roledescription="carousel"` and `:aria-labelledby="titleId"`.
  - **The title:** `<component :is="titleLevel" :id="titleId" class="tracking-wide" :class="titleClass"><span v-html="title"></span></component>`.
  - **The buttons:**
    - `type="button"`, `:aria-disabled="isPrevDisabled"` / `:aria-disabled="isNextDisabled"`, `aria-controls` set to the row id, and the new `aria-label`s;
    - swap `disabled:opacity-50` for `aria-disabled:opacity-50`;
    - `handleSlideBtnClick` returns early when that side is disabled.
  - **The status:** a `sr-only` `<p aria-live="polite" aria-atomic="true">` holds a `ref` string. Set it after an accepted button move, from `visibleRange()`.
  - **Focus follow:**
    - `@focusin` on the row: find the row child that contains `event.target`, then call `reveal(index)`, unless the focus came from a pointer press;
    - `@pointerdown` on the row sets a flag, which is cleared on `click` or on the next `keydown`.
  - **The section:** `@scroll` resets `scrollLeft = 0`.
  - **The row:** add `motion-reduce:transition-none`.
  - **The slot:** pass `:slide-attrs="slideAttrs"` (total = `content.length`).

- [ ] **Step 4: Run the tests and watch them pass.**

  Run: `pnpm exec vitest run src/components/mcl-carousel && pnpm --filter @bobbykim/mcl-carousel typecheck`

  Expected: all PASS.

- [ ] **Step 5: Commit.**

  `fix(mcl-carousel): carousel semantics, aria-disabled nav, titleLevel, slide labels, status and focus follow (#133)`

---

### Task 4: Stories, docs, changeset

**Files:**

- Modify: `src/stories/sections/mcl-carousel/mcl-carousel-a/carouselA.stories.ts`, `MclCarouselACardB.vue`, `MclCarouselCardD.vue`, `src/stories/sections/mcl-carousel/MclCarouselA.mdx`
- Create: `.changeset/mcl-carousel-a11y.md`

- [ ] **Step 1: Story fixes and the axe level.**
  - Add an `alt` field to every `cardInfo` entry in all three files: a few words describing the picture, after looking at each image URL.
  - Pass `:image-alt="card.alt"` and `v-bind="slideAttrs(i)"`.
  - Drop `:ref="(el) => setRef(el)"`.
  - Add a `titleLevel` control (`headingLevelControllers`), and `parameters: { a11y: { test: 'error' } }` in `meta`.

  Run: `pnpm test:storybook src/stories/sections/mcl-carousel`

  Expected: PASS. Fix any other axe violation in the component if it's a component bug, or in the story if it's story markup, and record a ruling.

- [ ] **Step 2: Add the keyboard stories** (desktop viewport, `globals: { viewport: { value: 'desktop', isRotated: false } }`).
  - **Guard first:** `waitFor(() => expect(row.scrollWidth).toBeGreaterThan(section.clientWidth))`, where `row` is the element named by the Next button's `aria-controls`. If it doesn't overflow at desktop width, use `laptop` and record a ruling.
  - **`MclCarouselKeyboard`:**
    1. Tab from the Next button through the card links until a link whose card started out of view has focus.
    2. Wait until that card's `getBoundingClientRect()` lies within the section's rect (±1px).
    3. Check that `section.scrollLeft === 0`.
    4. Tab on to the last card's link: it ends fully in view, and Next has `aria-disabled="true"`.
  - **`MclCarouselNextToEnd`:**
    1. Focus Next, then press Enter until Next is `aria-disabled="true"`.
    2. Check that Next still has focus.
    3. Check that the status region's text matches `/^Cards? \d+( to \d+)? of 8$/`.
  - **`MclCarouselPointerClick`:**
    1. Find a card that is partly in view.
    2. `userEvent.click` its CTA link (prevent navigation with a capturing click listener that calls `preventDefault`).
    3. Check that the row's `style.transform` is unchanged, and that the click's `target` is inside that card.

  Run: `pnpm test:storybook src/stories/sections/mcl-carousel`

  Expected: all PASS.

- [ ] **Step 3: Docs and changeset.**
  - **`MclCarouselA.mdx`:**
    - fix the usage example (`MclCarouselA`, `slideAttrs` instead of `setRef`);
    - an Accessibility section: the region and title, `titleLevel`, `slideAttrs`, the status message, `aria-disabled` buttons and reduced motion;
    - a Keyboard section: Tab moves through the buttons and cards, and a card out of view slides in; Enter/Space press the buttons;
    - in the Events section, say that follow moves emit nothing;
    - keep the existing focus-ring note.
  - **The changeset:** per Global Constraints, in the style of `.changeset/mcl-tabs-a11y.md`.

- [ ] **Step 4: Full verification.**

  Run: `pnpm test && pnpm test:storybook && pnpm lint && pnpm format:check && pnpm typecheck && pnpm run story:build && pnpm test:dist`

  Expected: every command exits 0.

- [ ] **Step 5: Commit.**

  `test(stories): mcl-carousel a11y error level, alt text, keyboard stories, docs and changeset (#133)`
