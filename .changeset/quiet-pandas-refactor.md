---
'@bobbykim/mcl-carousel': minor
---

Refactor `MclCarouselA` internals with no change to its rendered output.

- Slide mechanics moved into a `useCarouselSlide` composable, leaving the SFC to
  handle props, derived classes, and the template.
- Slide distance is now measured from the DOM instead of a hardcoded
  `SpacingLevel`-to-px table. The old table assumed a 16px root font size and
  ignored consumer `--mcl-spacing-*` overrides, so the carousel could stop
  short of, or overshoot, each card. Measuring also aligns cards of differing
  widths correctly.
- Cards are discovered from the DOM rather than collected through the `setRef`
  slot prop, which accumulated one stale entry per card per re-render and
  retained detached component instances. `setRef` is now a deprecated no-op:
  existing `:ref="(el) => setRef(el)"` bindings keep working and can be removed.
- The transition guard now ignores `transitionend` events bubbling up from
  cards, so a card's own transition no longer releases it early.
- New type exports: `BtnNav` and `MclCarouselASlotProps`, which documents the
  `carousel` slot props.
