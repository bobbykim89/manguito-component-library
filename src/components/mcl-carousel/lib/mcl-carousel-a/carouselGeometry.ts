/**
 * Pure geometry for `MclCarouselA` (#133). No DOM access: the composable
 * measures the layout and hands the numbers in.
 *
 * Coordinates are along the row with no transform applied: 0 is the first
 * card's left edge. Moving to index `i` shifts the row left by
 * `cards[i].start`, so card `j` then sits at `cards[j].start - shift`.
 */

/** A horizontal extent in row coordinates. */
export interface Span {
  start: number
  end: number
}

/** 0-based, inclusive indexes of the cards fully in view. */
export interface VisibleRange {
  first: number
  last: number
}

/** Rounding slack, so sub-pixel layout doesn't count a card as clipped. */
const TOLERANCE = 1

const isFullyInView = (card: Span, shift: number, view: Span): boolean =>
  card.start - shift >= view.start - TOLERANCE &&
  card.end - shift <= view.end + TOLERANCE

/**
 * The cards wholly inside `view` when the row is shifted left by `shift`.
 * Null when no card fits entirely.
 */
export const fullyVisibleRange = (
  cards: Span[],
  shift: number,
  view: Span,
): VisibleRange | null => {
  let first = -1
  let last = -1
  cards.forEach((card, i) => {
    if (!isFullyInView(card, shift, view)) return
    if (first === -1) first = i
    last = i
  })
  return first === -1 ? null : { first, last }
}

/**
 * The card-aligned index to move to so `cards[target]` is fully in view,
 * starting from `current`.
 *
 * - Already fully in view: stay at `current`.
 * - Off the left side: align it to the left edge, as the Prev button does.
 * - Off the right side: the fewest steps that bring its right edge into view.
 *   This may go past where Next stops (the last card only 75% in view): a
 *   focused card must never be left clipped.
 * - Wider than the view: align it to the left edge.
 */
export const followIndex = (
  cards: Span[],
  current: number,
  target: number,
  view: Span,
): number => {
  const card = cards[target]
  if (!card || !cards[current]) return current
  const shift = cards[current].start
  if (isFullyInView(card, shift, view)) return current
  if (card.start - shift < view.start) return target
  for (let k = current + 1; k <= target; k++) {
    if (card.end - cards[k].start <= view.end + TOLERANCE) return k
  }
  return target
}

/** Fraction (0–1) of the last card's width inside `view` at `shift`. */
export const lastCardFraction = (
  cards: Span[],
  shift: number,
  view: Span,
): number => {
  const card = cards[cards.length - 1]
  if (!card) return 0
  const width = card.end - card.start
  if (width <= 0) return 0
  const visible =
    Math.min(card.end - shift, view.end) -
    Math.max(card.start - shift, view.start)
  return Math.min(1, Math.max(0, visible / width))
}
