import type { InjectionKey, Ref } from 'vue'

/**
 * @summary typedef CarouselInjectionType, which is used as of injection key controls activeIdx, carouselSLides, and setSlide functionality
 * @arg {Ref<number>} activeIdx - current index of active slide
 * @arg {Ref<number>} carouselSlides - number of slides
 * @arg {() => void} setSlide - add Slide in carouselSlides
 */

export interface CarouselInjectionType {
  activeIdx: Ref<number>
  setSlide: (arg: number) => void
  /**
   * Number of slides, for each slide's "n of m" label. Undefined until the
   * container has mounted: slides register one by one while rendering, so
   * a count read earlier (and on the server) would be short (#128).
   */
  total: Ref<number | undefined>
}

export const carouselInjectionKey =
  Symbol() as InjectionKey<CarouselInjectionType>
