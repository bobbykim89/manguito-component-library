import { useEventListener, useIntersectionObserver } from '@vueuse/core'
import {
  computed,
  onMounted,
  ref,
  shallowRef,
  type ComputedRef,
  type Ref,
} from 'vue'
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
 */
export const useCarouselSlide = (
  container: Ref<HTMLElement | null>,
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
  const applyTransform = (): void => {
    const row = container.value
    const target = cardAt(currentIndex.value)
    const first = cardAt(0)
    if (!row || !target || !first) return

    row.style.transform = `translateX(-${target.offsetLeft - first.offsetLeft}px)`
    // Re-enable `next`; the observer disables it again if the last card is
    // still in view once this move settles.
    isNextDisabled.value = false
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
    return true
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

  return { currentIndex, isPrevDisabled, isNextDisabled, goTo }
}
