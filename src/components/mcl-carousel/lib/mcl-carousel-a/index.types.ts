import type { ComponentPublicInstance } from 'vue'

/**
 * Direction of a single carousel navigation step.
 */
export type BtnNav = 'prev' | 'next'

/**
 * Slot props handed to the `carousel` slot of `MclCarouselA`.
 */
export interface MclCarouselASlotProps {
  /** The `content` prop, passed straight through for the consumer to iterate. */
  cards: any[]
  /**
   * @deprecated No longer required. The carousel now discovers its cards from
   * the DOM, so this is a no-op kept for backwards compatibility. Existing
   * `:ref="(el) => setRef(el)"` bindings are harmless and can be removed.
   */
  setRef: (el: ComponentPublicInstance | Element | null) => void
}
