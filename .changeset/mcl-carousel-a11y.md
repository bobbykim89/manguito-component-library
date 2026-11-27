---
'@bobbykim/mcl-carousel': minor
---

Keyboard and screen-reader fixes for `MclCarouselA` (#133).

- **The navigation buttons keep focus at the ends.** Changes: they use `aria-disabled` instead of `disabled`, so a keyboard user who presses Next until the end stays on the button. A press while dimmed does nothing and emits nothing. They look the same.
- **The buttons are renamed** "Previous cards" and "Next cards" (were "previous" and "next"). They are `type="button"`, so they no longer submit an enclosing `<form>`, and they point at the card row with `aria-controls`.
- **Cards out of view follow keyboard focus.** When Tab or Shift+Tab reaches a card that isn't fully visible, the carousel slides to show it. This move emits no event. Mouse and touch behave as before.
- **Carousel semantics.** The section is a carousel region named by its title. A hidden status message announces which cards are in view after a button press ("Cards 2 to 4 of 8").
- **New `titleLevel` prop** (`'h1'`–`'h4'`, default `'h2'`) sets the title's heading element; the output is unchanged by default.
- **New `slideAttrs(index)` slot prop.** Bind it on each card (`v-bind="slideAttrs(i)"`) to label it as slide "n of total". It's optional.
- **Reduced motion.** The cards move instantly when the user prefers reduced motion. Changes: this also fixes the carousel stopping after one move when its slide transition was turned off.
