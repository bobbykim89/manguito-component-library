<script setup lang="ts">
import { ref, computed, inject } from 'vue'
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
  }
)

const { activeIdx, setSlide } = inject(
  carouselInjectionKey
) as CarouselInjectionType
const slideRef = ref<HTMLElement | null>(null)

setSlide(props.slideNumber)

const slots = defineSlots<{
  default: any
}>()

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
    role="tabpanel"
    tabindex="-1"
  >
    <slot></slot>
  </div>
</template>
