<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
const props = withDefaults(
  defineProps<{
    collapseId: string
    accordion?: boolean
    className?: string
    open?: boolean
  }>(),
  {
    accordion: false,
    className: '',
    open: false,
  }
)
const toggle = ref<boolean>(props.open)
const contentRef = ref<HTMLAreaElement>()
const slotHeight = ref<number>()

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
// lifecycle hooks
onMounted(() => {
  if (typeof window !== undefined) {
    initObserver().observe(contentRef.value as Element)
  }
  console.log(slotHeightVal.value, toggle.value)
})
onBeforeUnmount(() => {
  initObserver().disconnect()
})
</script>

<template>
  <div>
    <input type="checkbox" :id="collapseId" v-model="toggle" class="hidden" />
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
