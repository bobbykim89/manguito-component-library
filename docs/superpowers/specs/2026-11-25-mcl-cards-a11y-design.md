# mcl-cards accessibility fixes (#129)

## Intent

`MclCardC` can't be reached or operated with a keyboard. The maintainer hit this while using the library in another project. The library-wide audit (#128–#138) filed 21 findings against `@bobbykim/mcl-cards` in #129. This change fixes all of them, so the four cards work with a keyboard and a screen reader. Their mouse behaviour and their look stay as they are.

The other packages will copy the patterns set here: an `alt` default, a heading-level prop, real buttons instead of cancelled links, and a stretched click target. `mcl-cards` is also the first package to have its stories switched to `a11y: { test: 'error' }`.

## Goals

- **Card C works from the keyboard and a screen reader, with the same two steps as today.** The first activation flips the card, and the second emits `card-click`. This works with Tab, Enter and Space, and the flipped state is announced.
- **Every checkbox in #129 is resolved.** The issue body is the checklist.
- **No `<img>` in any card renders without an `alt` attribute.**
- **Each card's title heading level can be configured** (`titleLevel`). The default stays `h3`, so existing pages don't change.
- **An element that only triggers an action is a `<button>`, and only an element that navigates is an `<a href>`.**
- **Links that open a new tab say so**, using visually hidden text.
- **Animations respect `prefers-reduced-motion`:** Card C's flip and Card A's hover enlarge.
- **#129 is closed off:**
  - `MclCardC` has a story with a `play` test that tabs to the card and activates it with Enter and Space.
  - Every `mcl-cards` story file sets `parameters: { a11y: { test: 'error' } }` and passes `pnpm test:storybook`.

## Non-goals

- Changes to the carousel package and its stories. Those are tracked in #133, including the missing `image-alt` in the carousel stories that render cards.
- Card D's infinite decorative border animation (`bg-spin`). It already stops under reduced motion. Whether it needs a pause control was left as an open question in the audit and isn't decided here.
- Visual redesign, colour or contrast changes.
- Making Card C flip back. Today it stays flipped once opened, and that stays.
- Changing the `card-click` / `card-btn-click` event names or their payload (`CardClickEvent`).

## Anti-goals

- **Changed mouse behaviour or layout.** Clicking anywhere on Card A or Card C, or anywhere on Card B, still does what it does today. Pixel-level look stays the same, including the font, alignment and colours of CTAs that change from `<a>` to `<button>`.
- **Controls nested inside controls**, or headings that lose their heading role.
- **Keyboard focus jumping or dropping to `<body>`** when Card C flips.
- **Hidden content (opacity 0) that can still be focused or is read aloud.** This means Card C's content before the flip. Card B's title/slot overlay is different: it appears on hover or focus, and its text stays available to screen readers, which is not a defect. The title names the link, and the slot content isn't focusable.

## Constraints

- **Package version.** `@bobbykim/mcl-cards` is at `0.10.9`. Under the repo's 0.x convention, see the #122 changesets, behaviour or DOM changes ship as a **minor** bump (`0.11.0`) with a changeset that spells out what changed for consumers.
- **Project conventions** (CLAUDE.md):
  - Prop names follow the conventions: `show*` for boolean display flags, camelCase colour props.
  - Classes come from `generateClass`.
  - `HeadingLevel` (`'h1' | 'h2' | 'h3' | 'h4'`) already exists in `manguito-theme` and is used by `MclHeroA` (`titleLevel`). Reuse it.
- **IDs.** IDs that ARIA attributes reference come from Vue's `useId()`, so they stay stable between the server and client renders. The SSR test harness (`@mcl/test-utils/ssr`) exists for checking this.
- **Focus ring.** The shared focus ring from #122 (`mcl-focus-ring` / `focus-visible:mcl-focus-ring`) is the focus indicator for new interactive elements.
- **Tests:**
  - Unit tests are Vitest + `@vue/test-utils` in jsdom (`lib/**/*.test.ts`). Only `MclCardB.test.ts` exists today; it covers `card-click`.
  - Story tests run with `pnpm test:storybook`.
- **`a11y: 'error'` scope.** It applies to `src/stories/components/mcl-cards/**` only. The carousel stories that also render cards stay at `'todo'` until #133.

## Approaches considered (Card C)

|       | Approach                                                                                       | Trade-off                                                                                                                                                                                                                                |
| ----- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A     | Add `role="button"`, `tabindex="0"` and key handlers to the existing root `<div>`              | Smallest change. But a button role turns its content into plain text: the title stops being a heading, and links in `card-body` become nested controls. It still announces no state.                                                     |
| **B** | **One real `<button type="button">` stretched over the card. The slot content sits above it.** | **Mouse behaviour stays identical, because the click lands on the button anywhere on the card. Headings and slot links keep their meaning. Focus stays on one element through both steps. Costs a little positioning and z-index work.** |
| C     | A flip button, then a separate action button revealed after the flip                           | Clearest semantics. But swapping elements moves focus, and matching today's "click anywhere" layout needs a second stretched button, so it ends up as B with extra steps.                                                                |

**Chosen: B (maintainer's pick).** It keeps the two-step behaviour the maintainer's project relies on and fixes keyboard and screen reader access without changing the look.

## Decisions

The maintainer decided:

1. **Card C keeps its two-step model.** The first activation flips the card. The second activation emits `card-click`. Implemented as approach B.

My calls, open to correction:

2. **Card C's button.**
   - It is a `<button type="button">` stretched over the whole card (the button itself or its `::after` covers the card).
   - **Before the flip:**
     - The button has `aria-expanded="false"` and `aria-controls` pointing to the content region's `useId()` id.
     - The image and the `card-body` slot are hidden from assistive technology and from the Tab order (`inert`, or `v-show`/`aria-hidden` plus `inert`).
   - **Activating it flips the card.**
     - `aria-expanded` then becomes `true`. The attribute is kept once flipped, so the state is announced.
     - The content becomes available.
   - **After the flip, activating it emits `card-click`** with the original event, as today.
   - **The card root has no click handler.** Only the button emits.
   - **Slot clicks, on every card:**
     - **A click on a link or button inside a slot only does what that element does.** It never also emits the card's event, which is consistent with Card A today. On Card C this means slot links now navigate. Today their navigation is cancelled and the card emits instead, so one click never triggers both.
     - **A click on plain slot text still reaches the stretched target**, as "click anywhere" requires. For example, the slot wrapper gets `pointer-events: none`, re-enabled on `a, button, input, select, textarea, [tabindex]` inside it.
   - **Focus stays on the same button** through both steps.
   - **Accessible name:**
     - When `showTitle` is on, it is the title heading, via `aria-labelledby` pointing to the heading's `useId()` id.
     - Otherwise it is `aria-label` set to `title`.
     - If `title` is empty, the fallback is `imageAlt`, then `"Card"`.
   - **Slot content** is positioned above the button (`relative z-*`), so links and buttons in it stay clickable.
   - **The flip animation** (`rotateY` and its transitions) is turned off under `prefers-reduced-motion: reduce`.
3. **Card A's whole-card click.**
   - The root `<div @click>` is replaced with the same stretched `<button type="button">` pattern. The button is named by the title heading via `aria-labelledby` and emits `card-click`.
   - The slot and the CTA sit above it. A click on the CTA, or on a control inside the slot, does not emit `card-click`; the slot-click rule is in Decision 2. Today a click on plain slot text in Card A emits nothing, because of `@click.stop`. Under the new rule it reaches the card button and emits `card-click`, which matches the card's "click anywhere" intent. List this in the changeset.
   - A card with `showCta` therefore has two Tab stops: the card button and the CTA.
4. **CTA element choice (A, B, D).**
   - With `ctaAsLink: true`, the CTA (or Card B's whole-card target) is an `<a :href :target>`, as today.
   - With `ctaAsLink: false` (the default), it renders as a `<button type="button">` that emits the same event.
   - The `<button>` is styled to look identical to today's link (same classes, plus a reset for button-specific styles where needed).
   - `ctaLink` and `ctaTarget` stay in the event payload.
5. **Card B structure.**
   - The whole-card `<a>` no longer wraps everything. The link or button is placed on the title and stretched over the card with `::after`.
   - The default slot and the image sit outside the interactive element, so the slot can't contain nested interactive elements, and the accessible name is just the title. Slot clicks follow Decision 2: plain text reaches the stretched target, and slot controls act on their own.
   - **Keyboard focus reveals what hover reveals.** When the link or button inside the card has keyboard focus, the title/slot overlay is shown, the same as on hover. This fixes the overlay only appearing on hover.
   - **Visible focus ring.** The card shows the #122 focus ring around the card when its target is focused.
6. **`imageAlt` defaults to `''`** on Cards A, B and C (D already does). The prop's JSDoc says to pass alt text for meaningful images. Card A only renders the `<img>` when `showImage` is true, as today.
7. **`titleLevel?: HeadingLevel`** on all four cards, default `'h3'`, rendered with `<component :is="titleLevel">`. The size classes don't change (`titleSize` stays independent).
8. **New-tab cue.** When the CTA or card target has `target="_blank"`, append `<span class="sr-only"> (opens in a new tab)</span>` inside the link.
9. **CTA purpose (A, D).** Generic CTA text ("Read more") repeats across cards. Associate each CTA with its card's title via `aria-describedby` set to the title heading's `useId()` id.
10. **Reduced motion for Card A's `enlargeOnHover`:** add `motion-reduce:transition-none motion-reduce:hover:scale-100`.
11. **Story fixes:**
    - In `MclCardAExamples.vue`, `:display-image="false"` becomes `:show-image="false"`.
    - Any card story that renders an image passes meaningful `image-alt`.
12. **Tests:**
    - **Unit tests, one file per card**, covering:
      - the element types
      - ARIA attributes and states
      - the emitted events and their payloads
      - `titleLevel`
      - the `alt` default
      - the new-tab cue
      - Card C's two-step activation by keyboard (Enter and Space) and by click
    - **One `*.server.test.ts`** checks that Card C's `aria-controls` / `aria-labelledby` IDs match after hydration.
    - **A story test.** `mclCardC.stories.ts` gets a story whose `play` tabs to the card, presses Enter (the card flips and `aria-expanded` becomes `true`, with content visible), then presses Space (`card-click` fires, asserted through an `fn()` arg spy).
    - **`a11y: 'error'`.** All four `mcl-cards` story files set `parameters: { a11y: { test: 'error' } }`.
13. **Release:** one changeset, `@bobbykim/mcl-cards: minor`. It lists:
    - Card C now renders a button, and slot links navigate.
    - `ctaAsLink: false` renders a `<button>`.
    - Card B's DOM structure changes.
    - `imageAlt` defaults to `''`.
    - the new `titleLevel` prop
14. **Closing #129.** The PR body says `Closes #129`. Each checkbox in #129 maps to a commit or test.

## Left to the builder

- **Card C stretched target.** Whether the button itself or its `::after` provides the stretch, and the exact z-index layering.
- **Reuse.** Whether the stretched-target pattern becomes a small internal helper shared by the cards. Keep it internal; don't export new public API.
- **Card C content.** Whether to hide the pre-flip content with `inert` alone or `inert` plus `aria-hidden`, after checking browser support targets: `inert` is fine for the modern browsers the library already assumes.
- **Card B focus ring.** How the ring is drawn around the card when its stretched target is focused, for example `focus-visible` on the target with the ring on `::after`.
- **Visual checks.** Confirming the CTA `<button>` looks identical to the old `<a>`: compare the Storybook stories before and after.
