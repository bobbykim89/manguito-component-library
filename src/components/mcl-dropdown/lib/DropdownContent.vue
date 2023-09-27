<script setup lang="ts">
import { computed, inject, Transition } from 'vue'
import { InjectType } from './index.types'
const sharedState = inject<InjectType>('sharedState', { active: false })
const active = computed<boolean>(() => {
  return sharedState.active
})
</script>

<template>
  <transition name="dropdown-content">
    <div
      v-if="active"
      class="origin-top-right absolute right-0 mt-2 w-48 bg-white rounded-lg border py-2"
    >
      <slot />
    </div>
  </transition>
</template>

<style scoped lang="scss">
.dropdown-content-enter-active,
.dropdown-content-leave-active {
  transition: all 0.2s;
}
.dropdown-content-enter-from,
.dropdown-content-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
