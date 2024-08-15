<script setup lang="ts">
import { ref, provide, Transition, watch } from 'vue'
import { carouselInjectionKey } from './CarouselInjectionKey'

const props = withDefaults(
  defineProps<{
    bodyClass?: string | string[]
    contentContainerClass?: string | string[]
    controllerTopClass?: string | string[]
    controllerBottomClass?: string | string[]
    loop?: boolean
  }>(),
  {
    bodyClass: '',
    contentContainerClass: '',
    controllerTopClass: '',
    controllerBottomClass: '',
    loop: false,
  }
)

const slots = defineSlots<{
  content: any
  'controller-top'(props: {
    next: () => void
    prev: () => void
    setActive: (arg: number) => void
    numberOfSlides: number
    activeSlide: number
  }): any
  'controller-bottom'(props: {
    next: () => void
    prev: () => void
    setActive: (arg: number) => void
    numberOfSlides: number
    activeSlide: number
  }): any
}>()

const activeIdx = ref<number>(0)
const carouselSlides = ref<number[]>([])
const slideLen = ref<number>(0)
const slideDirection = ref<'slide-next' | 'slide-prev'>('slide-next')

/**
 * @summary assign number of slides inside the container component
 * @param {number} idx - slide number
 */
const setSlide = (idx: number) => {
  carouselSlides.value.push(idx)
  slideLen.value = [...new Set(carouselSlides.value)].length
}
const setActive = (idx: number) => {
  activeIdx.value = idx
}

/**
 * @summary provide injection key
 */
provide(carouselInjectionKey, {
  activeIdx,
  setSlide,
})

/**
 * @summary slide carousel to next slide (to first slide when loop === true and activeIdx is at the last slide)
 */
const nextSlide = (): void => {
  const { loop } = props
  if (loop && activeIdx.value === slideLen.value - 1) {
    activeIdx.value = 0
  } else if (activeIdx.value < slideLen.value - 1) {
    activeIdx.value = activeIdx.value + 1
  }
}
/**
 * @summary slide carousel to previous slide (to last slide when loop === true and activeIdx is at the first slide)
 */
const prevSlide = (): void => {
  const { loop } = props
  if (loop && activeIdx.value === 0) {
    activeIdx.value = slideLen.value - 1
  } else if (activeIdx.value > 0) {
    activeIdx.value = activeIdx.value - 1
  }
}

/**
 * @summary watch value of activeIdx and determine the direction of slide animation
 */

watch(
  () => activeIdx!.value,
  (newValue, oldValue) => {
    if (
      newValue > oldValue ||
      (newValue === 0 && oldValue === slideLen.value - 1)
    ) {
      slideDirection.value = 'slide-next'
    } else {
      slideDirection.value = 'slide-prev'
    }
  }
)

defineExpose({
  numberOfSlides: slideLen,
  prev: prevSlide,
  next: nextSlide,
  setActive,
})
</script>

<template>
  <div :class="bodyClass" class="relative overflow-x-hidden">
    <div :class="controllerTopClass" v-if="slots['controller-top']">
      <slot
        name="controller-top"
        :next="nextSlide"
        :prev="prevSlide"
        :set-active="setActive"
        :activeSlide="activeIdx"
        :number-of-slides="slideLen"
      ></slot>
    </div>
    <div class="grid grid-cols-1 grid-rows-1" :class="contentContainerClass">
      <Transition :name="slideDirection">
        <div
          :key="activeIdx"
          class="col-start-1 col-end-1 row-start-1 row-end-1"
        >
          <slot name="content"></slot>
        </div>
      </Transition>
    </div>
    <div :class="controllerBottomClass" v-if="slots['controller-bottom']">
      <slot
        name="controller-bottom"
        :next="nextSlide"
        :prev="prevSlide"
        :set-active="setActive"
        :activeSlide="activeIdx"
        :number-of-slides="slideLen"
      ></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* transition animations */
.slide-prev-enter-active {
  transition: all 0.5s linear;
}
.slide-prev-leave-active {
  transition: all 0.5s;
}
.slide-prev-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-prev-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.slide-next-enter-active {
  transition: all 0.5s linear;
}
.slide-next-leave-active {
  transition: all 0.5s;
}
.slide-next-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-next-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
