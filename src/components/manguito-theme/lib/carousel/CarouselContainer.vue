<script setup lang="ts">
import { ref, provide, Transition, watch } from 'vue'
import { carouselInjectionKey } from './CarouselInjectionKey'

const props = withDefaults(
  defineProps<{
    bodyClass?: string | string[]
    contentContainerClass?: string | string[]
    navigationClass?: string | string[]
    loop?: boolean
  }>(),
  {
    bodyClass: '',
    contentContainerClass: '',
    navigationClass: '',
    loop: false,
  }
)

const slots = defineSlots<{
  content: any
  navigation(props: {
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
const setSlide = (idx: number) => {
  carouselSlides.value.push(idx)
  // carouselSlides.value++
  slideLen.value = [...new Set(carouselSlides.value)].length
  console.log(slideLen.value)
}
const setActive = (idx: number) => {
  activeIdx.value = idx
}

provide(carouselInjectionKey, {
  activeIdx,
  setSlide,
})

const nextSlide = (): void => {
  const { loop } = props
  if (loop && activeIdx.value === slideLen.value - 1) {
    activeIdx.value = 0
  } else if (activeIdx.value < slideLen.value - 1) {
    console.log(activeIdx.value, slideLen.value)
    activeIdx.value = activeIdx.value + 1
  }
}
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
  <div :class="bodyClass" class="relative">
    <div :class="navigationClass">
      <slot
        name="navigation"
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
  </div>
</template>

<style scoped>
.container-hts {
  max-height: var(--container-hts);
}
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
