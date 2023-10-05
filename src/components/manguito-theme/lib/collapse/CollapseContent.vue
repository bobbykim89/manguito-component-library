<script setup lang="ts">
import { computed, ref, inject, onMounted, onBeforeUnmount } from 'vue'
import { CollapseState } from './index.types'

const props = withDefaults(
  defineProps<{
    contentId: string
    contentClass?: string
  }>(),
  {
    contentClass: '',
  }
)
const contentRef = ref<HTMLAreaElement>()
const slotHeight = ref<number>()
const collapseState = inject<CollapseState>('collapseState', {
  [props.contentId]: {
    open: false,
  },
})

const initObserver = (): ResizeObserver => {
  const observer = new ResizeObserver(() => {
    if (contentRef.value) {
      slotHeight.value = contentRef.value.scrollHeight
      return
    }
    slotHeight.value = 0
  })
  return observer
}
const slotHeightVal = computed(() => {
  return {
    height:
      contentRef.value && collapseState[props.contentId].open
        ? slotHeight.value + 'px'
        : '0px',
  }
})

// lifecycle hooks
onMounted(() => {
  if (typeof window !== undefined) {
    initObserver().observe(contentRef.value as Element)
  }
  console.log(slotHeightVal.value, collapseState[props.contentId].open)
})
onBeforeUnmount(() => {
  initObserver().disconnect()
})
</script>

<template>
  <div
    class="overflow-hidden transition-[height] duration-500"
    :style="slotHeightVal"
    :class="[collapseState[props.contentId].open ? 'ease-in' : 'ease-out']"
  >
    <div
      ref="contentRef"
      class="transition-opacity duration-500"
      :class="[
        collapseState[props.contentId].open
          ? 'opacity-100 ease-in'
          : 'opacity-0 ease-out',
        contentClass,
      ]"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
