<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { Transition, computed, inject, ref } from 'vue'
import { dropdownInjectionKey } from './DropdownInjectionKey'
import type { DropdownInjectType } from './index.types'

withDefaults(
  defineProps<{
    className?: string | string[]
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
const { active, buttonHeight, closeDropdown } = inject(
  dropdownInjectionKey
) as DropdownInjectType
const btnHeight = computed(() => {
  return { '--button-height': `${buttonHeight}px` }
})
const dropdownDirection = computed<string | undefined>(() => {
  if (!active || !contentRef.value) {
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
      :style="btnHeight"
    >
      <slot :item-click="closeDropdown" />
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
