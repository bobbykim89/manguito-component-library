// Internal class strings shared by the cards. Not exported from lib/index.ts.

/**
 * Stretches a card's one interactive element (button or link) over the card:
 * its ::after covers the nearest positioned ancestor, so a click anywhere on
 * the card lands on it. The element carries `data-mcl-card-target`, which
 * `cardFocusRingClass` on the card root keys on. `text-start` undoes the
 * button default of centred text, so a wrapped title keeps its alignment.
 */
export const stretchedTargetClass =
  "cursor-pointer text-start after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"

/**
 * Draws the #122 focus ring around the whole card while its stretched target
 * has keyboard focus. The ring sits on the card root, not on the target's
 * ::after, because the cards clip overflow and Card C's image covers the
 * target.
 */
export const cardFocusRingClass =
  'has-[[data-mcl-card-target]:focus-visible]:mcl-focus-ring'

/**
 * Sits slot content above the stretched target. Plain text lets clicks fall
 * through to the target; links and form controls inside stay clickable and
 * act on their own.
 */
export const slotPassThroughClass =
  'relative z-10 pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_input]:pointer-events-auto [&_select]:pointer-events-auto [&_textarea]:pointer-events-auto [&_label]:pointer-events-auto [&_summary]:pointer-events-auto [&_[tabindex]]:pointer-events-auto'
