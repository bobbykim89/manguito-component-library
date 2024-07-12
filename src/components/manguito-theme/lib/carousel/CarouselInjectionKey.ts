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
}

export const carouselInjectionKey =
  Symbol() as InjectionKey<CarouselInjectionType>
