<script setup lang="ts">
import { computed, inject, ref, Transition, watch } from 'vue'
import { tabInjectionKey, type TabInjectionType } from './InjectionKey'
import { useElementSize } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    tabIndex: number
    tabClass?: string | string[]
  }>(),
  {
    tabClass: '',
  }
)

const { activeTabIdx, updateHeight } = inject(
  tabInjectionKey
) as TabInjectionType
const slideDirection = ref<'slide-next' | 'slide-prev'>('slide-next')
const slotRef = ref<HTMLElement | null>(null)

const { height } = useElementSize(slotRef)

// const handleTransitionDir = computed<string>(() => {
//   const { tabIndex } = props
//   return activeTabKey!.value < tabIndex ? 'slide-next' : 'slide-prev'
// })
const isActive = computed<boolean>(() => {
  if (activeTabIdx!.value === props.tabIndex) {
    updateHeight(height.value)
    return true
  }
  return false
})

watch(
  () => activeTabIdx!.value,
  (newValue, oldValue) => {
    if (newValue > oldValue) {
      slideDirection.value = 'slide-next'
    } else {
      slideDirection.value = 'slide-prev'
    }
  }
)
</script>

<template>
  <Transition :name="slideDirection" mode="out-in">
    <div
      ref="slotRef"
      :class="tabClass"
      class="absolute"
      role="tabpanel"
      :tabindex="tabIndex"
      v-show="isActive"
    >
      <slot></slot>
    </div>
  </Transition>
</template>

<style scoped>
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
