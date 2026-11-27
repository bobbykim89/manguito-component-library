import { describe, expect, it } from 'vitest'
import {
  followIndex,
  fullyVisibleRange,
  lastCardFraction,
  type Span,
} from './carouselGeometry'

// 8 cards, 100px wide with a 10px gap: {0,100}, {110,210}, ... {770,870}
const cards: Span[] = Array.from({ length: 8 }, (_, i) => ({
  start: i * 110,
  end: i * 110 + 100,
}))
const view: Span = { start: 0, end: 250 }

describe('carouselGeometry (#133)', () => {
  it('fullyVisibleRange: cards wholly inside the view at a shift', () => {
    expect(fullyVisibleRange(cards, 0, view)).toEqual({ first: 0, last: 1 })
    expect(fullyVisibleRange(cards, 110, view)).toEqual({ first: 1, last: 2 })
    // a wide screen's left margin counts as in view
    expect(fullyVisibleRange(cards, 110, { start: -120, end: 250 })).toEqual({
      first: 0,
      last: 2,
    })
    expect(fullyVisibleRange(cards, 0, { start: 0, end: 80 })).toBeNull()
  })

  it('fullyVisibleRange: 1px tolerance', () => {
    expect(fullyVisibleRange(cards, 0, { start: 0, end: 209.5 })).toEqual({
      first: 0,
      last: 1,
    })
  })

  it('followIndex: a card already fully in view stays put', () => {
    expect(followIndex(cards, 0, 1, view)).toBe(0)
  })

  it('followIndex: a card to the right moves by the fewest card-aligned steps', () => {
    expect(followIndex(cards, 0, 2, view)).toBe(1)
    expect(followIndex(cards, 0, 5, view)).toBe(4)
  })

  it('followIndex: a card to the left is aligned to the left edge', () => {
    expect(followIndex(cards, 4, 1, view)).toBe(1)
  })

  it('followIndex: the last card is fully revealed even past where Next stops', () => {
    const wide: Span = { start: 0, end: 300 }
    // at index 5 the last card is 80% in view, where Next stops
    expect(
      lastCardFraction(cards, cards[5].start, wide),
    ).toBeGreaterThanOrEqual(0.75)
    expect(followIndex(cards, 5, 7, wide)).toBe(6)
  })

  it('followIndex: a card wider than the view aligns to the left edge', () => {
    expect(followIndex(cards, 0, 3, { start: 0, end: 80 })).toBe(3)
  })

  it('lastCardFraction', () => {
    expect(lastCardFraction(cards, cards[5].start, view)).toBeCloseTo(0.3)
    expect(lastCardFraction(cards, cards[6].start, view)).toBe(1)
    expect(
      lastCardFraction(cards, cards[5].start, { start: 0, end: 300 }),
    ).toBeCloseTo(0.8)
  })
})
