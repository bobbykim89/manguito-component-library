<script setup lang="ts">
import { computed, ref, inject, Transition } from 'vue'
import { InjectType } from './index.types'

const contentRef = ref<HTMLAreaElement>()
const dropdownState = inject<InjectType>('dropdownState', {
  active: false,
  buttonHeight: 0,
})
const active = computed<boolean>(() => {
  return dropdownState.active
})
const handleItemClick = () => {
  console.log('item click')
  dropdownState.active = false
}
const buttonHeight = computed(() => {
  return { '--button-height': `${dropdownState.buttonHeight}px` }
})
const dropdownDirection = computed<string | undefined>(() => {
  if (typeof window === undefined) {
    return
  }
  if (!dropdownState.active || !contentRef.value) {
    return
  }
  const { top, bottom, height } = contentRef.value.getBoundingClientRect()
  if (window.innerHeight - top < height) {
    return 'dropup-bottom'
  }
})
</script>

<template>
  <transition name="dropdown-content">
    <div
      v-if="active"
      ref="contentRef"
      class="absolute my-2xs w-48 bg-white rounded-lg border py-2"
      :class="dropdownDirection"
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
