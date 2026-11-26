<script setup lang="ts">
import { computed, inject } from 'vue'
import {
  carouselInjectionKey,
  type CarouselInjectionType,
} from './CarouselInjectionKey'

const props = withDefaults(
  defineProps<{
    slideNumber: number
    id: string
    slideClass?: string | string[]
  }>(),
  {
    slideClass: '',
  },
)

const { activeIdx, setSlide, total } = inject(
  carouselInjectionKey,
) as CarouselInjectionType

setSlide(props.slideNumber)

defineSlots<{
  default: any
}>()

const slideLabel = computed<string | undefined>(() =>
  total.value === undefined
    ? undefined
    : `${props.slideNumber + 1} of ${total.value}`,
)

const isActive = computed<boolean>(() => {
  const { slideNumber } = props
  if (activeIdx.value === slideNumber) {
    return true
  }
  return false
})
</script>

<template>
  <div
    v-show="isActive"
    ref="slideRef"
    :id="id"
    :class="slideClass"
    class="w-full"
    role="group"
    aria-roledescription="slide"
    :aria-label="slideLabel"
    tabindex="-1"
  >
    <slot></slot>
  </div>
</template>
