<script setup lang="ts">
import { computed, ref, inject, Transition, onMounted } from 'vue'
import { InjectType } from './index.types'

const contentRef = ref<HTMLAreaElement | null>(null)
const sharedState = inject<InjectType>('sharedState', { active: false })
const active = computed<boolean>(() => {
  return sharedState.active
})
const handleItemClick = () => {
  console.log('item click')
  sharedState.active = false
}
const dropdownDirection = computed<string>(() => {
  if (!sharedState.active || !contentRef.value) {
    console.log('hidden')
    return ''
  }
  console.log(
    window.innerHeight,
    contentRef.value?.getBoundingClientRect().bottom,
    contentRef.value.scrollHeight
  )
  console.log(contentRef.value.getBoundingClientRect())
  if (
    window &&
    window.innerHeight -
      (contentRef.value?.getBoundingClientRect().bottom as number) <
      contentRef.value.scrollHeight
  ) {
    return 'origin-top bottom-0 mb-2'
  } else {
    return ' origin-top-right'
  }
})
</script>

<template>
  <transition name="dropdown-content">
    <div
      v-if="active"
      ref="contentRef"
      class="absolute mt-2 w-48 bg-white rounded-lg border py-2"
      :class="dropdownDirection"
    >
      <slot :item-click="handleItemClick" />
    </div>
  </transition>
</template>

<style scoped lang="scss">
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
