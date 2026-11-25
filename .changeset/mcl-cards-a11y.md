---
'@bobbykim/mcl-cards': minor
---

Keyboard and screen-reader access for all four cards (#129). Requires `@bobbykim/manguito-theme` 1.6.0 or later CSS (`mcl-theme-v4.css`) for the card focus ring.

- **`MclCardC`** can now be reached with Tab and used with Enter or Space. A button covers the card and keeps the same two steps: the first activation flips the card (`aria-expanded` becomes `true`), each later one emits `card-click`. Before the flip the image and `card-body` content are `inert`, so they can't be focused or read out. Links and buttons in `card-body` now do their own thing and no longer emit `card-click` (before, their navigation was cancelled and the card emitted instead); a click on plain text still reaches the card. The button is named by the title, or by `title`, `imageAlt` or "Card" when the title isn't shown. The flip and fades are off under `prefers-reduced-motion`.
- **`MclCardA`**'s whole-card click is now a button named by the title, so it can be reached with Tab. A click on plain text in the default slot now emits `card-click` (before, it emitted nothing); links and controls in the slot, and the CTA, still don't.
- **CTAs:** with `ctaAsLink: false` (the default), the CTA on `MclCardA` and `MclCardD`, and `MclCardB`'s card target, render as a `<button type="button">` instead of a link with its navigation cancelled. They look the same and emit the same events. With `ctaAsLink: true` they stay `<a href>` links.
- **`MclCardB`**'s link (or button) moves from around the whole card onto the title and is stretched over the card, so its name is just the title and the default slot and image sit outside it. Keyboard focus reveals the title overlay as hover does, and the card shows the focus ring.
- **`imageAlt`** defaults to `''` on `MclCardA`, `MclCardB` and `MclCardC` (as on `MclCardD`), so an image never renders without `alt`. Pass alt text for meaningful images.
- **New `titleLevel` prop** (`'h1'`–`'h4'`, default `'h3'`) on all four cards sets the title's heading element; `titleSize` still sets its look.
- **Links:** CTA and card links with a `_blank` target say "(opens in a new tab)" to screen readers, and the CTAs on `MclCardA` and `MclCardD` are described by the card title, so repeated "Read more" links can be told apart.
- **Reduced motion:** `MclCardA`'s `enlargeOnHover` no longer scales under `prefers-reduced-motion`.
