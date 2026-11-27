import { useEventListener, useIntersectionObserver } from '@vueuse/core'
import {
  computed,
  onMounted,
  ref,
  shallowRef,
  type ComputedRef,
  type Ref,
} from 'vue'
import {
  followIndex,
  fullyVisibleRange,
  lastCardFraction,
  type Span,
  type VisibleRange,
} from './carouselGeometry'
import type { BtnNav } from './index.types'

/**
 * Reactive state and controls returned by `useCarouselSlide`.
 */
export interface UseCarouselSlideReturn {
  /** Index of the card currently aligned to the left edge of the viewport. */
  currentIndex: Readonly<Ref<number>>
  /** True while the first card is in view — nothing to scroll back to. */
  isPrevDisabled: ComputedRef<boolean>
  /** True once the last card is substantially in view. */
  isNextDisabled: Readonly<Ref<boolean>>
  /**
   * Advance one card in `direction`. Returns `false` when the move was
   * rejected (a transition is still running, or the edge was reached), which
   * lets the caller skip side effects such as emitting an event.
   */
  goTo: (direction: BtnNav) => boolean
  /**
   * Follow move (#133): bring the card at `cardIndex` fully into view with the
   * fewest card-aligned steps. Ignores the in-flight guard, so focus moving
   * faster than the slide still ends on a visible card. Returns `false` when
   * the card was already fully in view.
   */
  reveal: (cardIndex: number) => boolean
  /** Cards fully in view once the current move settles; null if none fit. */
  visibleRange: () => VisibleRange | null
}

/**
 * Fraction of the last card that must be in view before `next` is disabled.
 */
const LAST_CARD_VISIBILITY_THRESHOLD = 0.75

/**
 * Drives horizontal card movement for `MclCarouselA`.
 *
 * The cards are the direct children of `container`, discovered from the DOM on
 * demand rather than collected through template refs. That keeps the state
 * correct when the card list changes and means the consumer does not have to
 * register anything.
 *
 * @param container - The flex row that is translated. Its children are cards.
 * @param viewport - The element that clips the row (the carousel's `<section>`).
 *   "In view" means inside its visible width.
 */
export const useCarouselSlide = (
  container: Ref<HTMLElement | null>,
  viewport: Ref<HTMLElement | null>,
): UseCarouselSlideReturn => {
  const currentIndex = ref(0)
  const isNextDisabled = ref(false)
  const isPrevDisabled = computed(() => currentIndex.value === 0)

  /**
   * Re-entry guard, held while a slide transition is in flight so that rapid
   * clicks cannot queue up moves. Deliberately a plain `let`: it gates the
   * click handler only and never reaches the template, so making it reactive
   * would buy nothing.
   */
  let isMoving = false

  /** Observer target — see `syncLastCard`. */
  const lastCard = shallowRef<HTMLElement | null>(null)

  const cardAt = (index: number): HTMLElement | null =>
    (container.value?.children.item(index) as HTMLElement | null) ?? null

  const cardCount = (): number => container.value?.children.length ?? 0

  /**
   * Point the observer at the final card. Called on mount and before each move
   * so a card list that grows or shrinks after mount still stops at its true
   * end. Assigning the same element again does not retrigger the observer.
   */
  const syncLastCard = (): void => {
    lastCard.value = cardAt(cardCount() - 1)
  }

  /**
   * Slide the row so the card at `currentIndex` sits against the left edge.
   *
   * The distance is measured from the DOM rather than derived from the
   * `cardsGap` prop. Measuring picks up the card's border and the real rendered
   * gap, whereas a px lookup table would drift: the theme's spacing tokens are
   * rem-based and consumers can override them via `--mcl-spacing-*`. Reading
   * the target card's own offset — instead of multiplying one card's width by
   * the index — also keeps cards of differing widths aligned.
   *
   * `offsetLeft` is a layout value, unaffected by the transform already on the
   * row, and both cards share an offset parent, so the difference is exactly
   * the distance travelled.
   */
  /** Card extents in row coordinates (see `carouselGeometry`). */
  const cardSpans = (): Span[] => {
    const row = container.value
    const first = cardAt(0)
    if (!row || !first) return []
    return Array.from(row.children as HTMLCollectionOf<HTMLElement>).map(
      (card) => {
        const start = card.offsetLeft - first.offsetLeft
        return { start, end: start + card.offsetWidth }
      },
    )
  }

  /**
   * The row's current horizontal translation, as rendered right now. Mid-slide
   * this is the animated value, which is what the first card's rect reflects
   * too, so the two cancel out. Falls back to the last applied shift.
   */
  let appliedShift = 0
  const currentTranslate = (row: HTMLElement): number => {
    const transform = getComputedStyle(row).transform
    const matrix = /^matrix\(([^)]+)\)$/.exec(transform ?? '')
    if (matrix) return Number(matrix[1].split(',')[4]) || 0
    const translate = /translateX\((-?[\d.]+)px\)/.exec(transform ?? '')
    if (translate) return Number(translate[1])
    if (!transform || transform === 'none') return 0
    return -appliedShift
  }

  /**
   * The clipping viewport in row coordinates: the section's rect relative to
   * the first card's untransformed left edge.
   */
  const viewSpan = (): Span | null => {
    const row = container.value
    const first = cardAt(0)
    const view = viewport.value
    if (!row || !first || !view) return null
    // Chromium scrolls the overflow-hidden section to a focused card before
    // focusin fires; that scroll shifts every card rect, so add it back.
    const origin =
      first.getBoundingClientRect().left -
      currentTranslate(row) +
      view.scrollLeft
    const rect = view.getBoundingClientRect()
    return { start: rect.left - origin, end: rect.right - origin }
  }

  /** True when the row has a transition that will fire `transitionend`. */
  const hasTransition = (row: HTMLElement): boolean => {
    const style = getComputedStyle(row)
    // Tailwind's motion-reduce:transition-none sets transition-property: none
    // but leaves the duration from duration-500 in place.
    if ((style.transitionProperty ?? '').trim() === 'none') return false
    return (style.transitionDuration ?? '')
      .split(',')
      .some((d) => parseFloat(d) > 0)
  }

  const applyTransform = (): void => {
    const row = container.value
    const target = cardAt(currentIndex.value)
    const first = cardAt(0)
    if (!row || !target || !first) return

    appliedShift = target.offsetLeft - first.offsetLeft
    row.style.transform = `translateX(-${appliedShift}px)`
    // Decide `next` from the layout at the new position. The observer only
    // fires when the last card crosses its threshold, so a move between two
    // positions where it stays in view (possible after a follow move) would
    // otherwise leave `next` wrong. The observer still covers load and resize.
    const cards = cardSpans()
    const view = viewSpan()
    const shift = cards[currentIndex.value]?.start
    isNextDisabled.value =
      !!view &&
      shift !== undefined &&
      lastCardFraction(cards, shift, view) >= LAST_CARD_VISIBILITY_THRESHOLD
  }

  const goTo = (direction: BtnNav): boolean => {
    if (isMoving) return false

    const nextIndex =
      direction === 'prev' ? currentIndex.value - 1 : currentIndex.value + 1
    // Unreachable through the UI, where both buttons disable at their edge, but
    // it keeps the index honest for any programmatic caller.
    if (nextIndex < 0 || nextIndex >= cardCount()) return false

    isMoving = true
    currentIndex.value = nextIndex
    syncLastCard()
    applyTransform()
    // With no transition (reduced motion), `transitionend` never fires, so
    // release the guard now or the carousel would stop after one move.
    if (container.value && !hasTransition(container.value)) isMoving = false
    return true
  }

  const reveal = (cardIndex: number): boolean => {
    const cards = cardSpans()
    const view = viewSpan()
    if (!view || !cards[cardIndex]) return false
    const target = followIndex(cards, currentIndex.value, cardIndex, view)
    if (target === currentIndex.value) return false
    currentIndex.value = target
    syncLastCard()
    applyTransform()
    if (container.value && !hasTransition(container.value)) isMoving = false
    return true
  }

  const visibleRange = (): VisibleRange | null => {
    const cards = cardSpans()
    const view = viewSpan()
    const current = cards[currentIndex.value]
    if (!view || !current) return null
    return fullyVisibleRange(cards, current.start, view)
  }

  // Release the guard when the row settles. The target check matters: cards may
  // run transitions of their own (hover effects, for example) and those events
  // bubble up to the row, which would otherwise release the guard early.
  useEventListener(container, 'transitionend', (e: TransitionEvent) => {
    if (e.target === container.value) isMoving = false
  })

  useIntersectionObserver(
    lastCard,
    ([entry]) => {
      if (entry.isIntersecting) isNextDisabled.value = true
    },
    { threshold: LAST_CARD_VISIBILITY_THRESHOLD },
  )

  onMounted(syncLastCard)

  return {
    currentIndex,
    isPrevDisabled,
    isNextDisabled,
    goTo,
    reveal,
    visibleRange,
  }
}
