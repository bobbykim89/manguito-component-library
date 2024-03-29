<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { Transition, computed, inject, ref } from 'vue'
import type { InjectType } from './index.types'

withDefaults(
  defineProps<{
    className?: string
  }>(),
  {
    className: '',
  }
)
const { height } = useWindowSize()
const slots = defineSlots<{
  default(props: { itemClick: () => void }): any
}>()
const contentRef = ref<HTMLAreaElement>()
const dropdownState = inject<InjectType>('dropdownState', {
  active: false,
  buttonHeight: 0,
})
const active = computed<boolean>(() => {
  return dropdownState.active
})
const handleItemClick = () => {
  dropdownState.active = false
}
const buttonHeight = computed(() => {
  return { '--button-height': `${dropdownState.buttonHeight}px` }
})
const dropdownDirection = computed<string | undefined>(() => {
  if (!dropdownState.active || !contentRef.value) {
    return
  }
  if (height.value - contentRef.value.getBoundingClientRect().bottom < 0) {
    return 'dropup-bottom'
  }
})
</script>

<template>
  <transition name="dropdown-content">
    <div
      v-if="active"
      ref="contentRef"
      class="absolute my-2xs max-w-[14rem] w-max overflow-hidden"
      :class="[dropdownDirection, className]"
      :style="buttonHeight"
    >
      <slot :item-click="handleItemClick" />
    </div>
  </transition>
</template>

<style scoped lang="scss">
.dropup-bottom {
  bottom: var(--button-height);
}
.dropdown-content-enter-active,
.dropdown-content-leave-active {
  transition: all 0.3s;
}
.dropdown-content-enter-from,
.dropdown-content-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
