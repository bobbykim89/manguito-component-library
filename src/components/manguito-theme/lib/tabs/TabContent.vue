<script setup lang="ts">
import { computed, inject, ref, Transition, watch } from 'vue'
import { tabInjectionKey, type TabInjectionType } from './InjectionKey'
import { useElementSize } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    tabNumber: number
    id: string
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

const isActive = computed<boolean>(() => {
  if (activeTabIdx!.value === props.tabNumber) {
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
      :id="id"
      :class="tabClass"
      class="absolute w-full"
      role="tabpanel"
      tabindex="-1"
      v-show="isActive"
    >
      <div class="relative">
        <slot></slot>
      </div>
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
