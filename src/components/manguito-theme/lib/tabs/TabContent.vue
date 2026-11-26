<script setup lang="ts">
import { computed, inject, onBeforeUnmount, ref } from 'vue'
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
  },
)

const { activeTabIdx, updateHeight, registerPanel, labelledBy } = inject(
  tabInjectionKey,
) as TabInjectionType
// Report this panel's id so its tab can point `aria-controls` at it (#128).
const withdraw = registerPanel(props.tabNumber, props.id)
onBeforeUnmount(withdraw)
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
    :aria-labelledby="labelledBy(tabNumber)"
    tabindex="0"
    v-show="isActive"
  >
    <slot></slot>
  </div>
</template>
