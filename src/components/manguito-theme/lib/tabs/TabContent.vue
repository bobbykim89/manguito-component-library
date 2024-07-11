<script setup lang="ts">
import { computed, inject, ref } from 'vue'
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
const slotRef = ref<HTMLElement | null>(null)

const { height } = useElementSize(slotRef)

const isActive = computed<boolean>(() => {
  if (activeTabIdx!.value === props.tabNumber) {
    updateHeight(height.value)
    return true
  }
  return false
})
</script>

<template>
  <div
    ref="slotRef"
    :id="id"
    :class="tabClass"
    class="w-full"
    role="tabpanel"
    tabindex="-1"
    v-show="isActive"
  >
    <slot></slot>
  </div>
</template>
