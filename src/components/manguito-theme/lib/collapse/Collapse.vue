<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import type { CollapseEvent } from './index.types'
const props = withDefaults(
  defineProps<{
    collapseId: string
    accordion?: string
    className?: string
    visible?: boolean
  }>(),
  {
    className: '',
    visible: false,
  }
)
const emit = defineEmits(['toggle'])
const toggle = ref<boolean>(props.visible)
const contentRef = ref<HTMLAreaElement>()
const slotHeight = ref<number>()

const handleToggleEvent = (e: Event): void => {
  toggle.value = !toggle.value
  emit('toggle', { ...e, visible: toggle.value } as CollapseEvent)
}
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
    height: contentRef.value && toggle.value ? slotHeight.value + 'px' : '0px',
  }
})
watch(
  () => props.visible,
  (newValue) => {
    toggle.value = newValue
  }
)
// lifecycle hooks
onMounted(() => {
  if (typeof window !== undefined) {
    initObserver().observe(contentRef.value as Element)
  }
})
onBeforeUnmount(() => {
  initObserver().disconnect()
})
</script>

<template>
  <div>
    <button
      :id="collapseId"
      @click="handleToggleEvent"
      class="hidden"
      :accordion="accordion"
      :visible="toggle"
    ></button>
    <div
      class="overflow-hidden transition-[height] duration-500"
      :style="slotHeightVal"
      :class="[toggle ? 'ease-in' : 'ease-out']"
    >
      <div
        ref="contentRef"
        class="transition-opacity duration-500"
        :class="[
          toggle ? 'opacity-100 ease-in' : 'opacity-0 ease-out',
          className,
        ]"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
