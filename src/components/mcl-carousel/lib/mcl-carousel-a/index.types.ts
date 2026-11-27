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
  /**
   * Bind on each card root, `v-bind="slideAttrs(i)"`, to label it as slide
   * "i + 1 of total" for screen readers (#133). Optional.
   */
  slideAttrs: (index: number) => SlideAttrs
}

/**
 * Slide semantics from the `carousel` slot's `slideAttrs(index)` (#133):
 * the APG carousel pattern's labelled group per slide.
 */
export interface SlideAttrs {
  role: 'group'
  'aria-roledescription': 'slide'
  /** `${index + 1} of ${total}` */
  'aria-label': string
}
