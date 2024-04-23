<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import { tabInjectionKey } from './InjectionKey'

withDefaults(
  defineProps<{
    bodyClass?: string | string[]
    btnContainerClass?: string | string[]
    contentContainerClass?: string | string[]
  }>(),
  {
    bodyClass: '',
    btnContainerClass: '',
    contentContainerClass: '',
  }
)

const slots = defineSlots<{
  'tab-button'(props: { update: (num: number) => void; activeTab: number }): any
  'tab-content': any
}>()

const activeTabIdx = ref<number>(0)
const containerHts = ref<number>(0)

const updateHeight = (height: number) => {
  containerHts.value = height
}
provide(tabInjectionKey, {
  activeTabIdx,
  containerHeight: containerHts,
  updateHeight,
})

const updateActiveTab = (num: number) => {
  activeTabIdx.value = num
}

const containerHeightVar = computed(() => {
  return { '--container-hts': `${containerHts.value}px` }
})
defineExpose<{
  update: (arg: number) => void
}>({
  update: updateActiveTab,
})
</script>

<template>
  <div :class="bodyClass" :style="containerHeightVar">
    <div :class="btnContainerClass" role="tablist">
      <slot
        name="tab-button"
        :update="updateActiveTab"
        :activeTab="activeTabIdx"
      ></slot>
    </div>
    <div :class="contentContainerClass">
      <div class="relative container-hts transition-[min-height] duration-300">
        <slot name="tab-content"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-hts {
  min-height: var(--container-hts);
}
</style>
