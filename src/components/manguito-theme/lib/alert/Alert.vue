<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { ColorPalette } from '..'
import generateClass from '..'
const props = withDefaults(
  defineProps<{
    color?: ColorPalette
    rounded?: boolean
    shadow?: boolean
    show?: boolean
    dismissible?: boolean
  }>(),
  {
    color: 'danger',
    rounded: true,
    shadow: true,
    show: false,
    dismissible: false,
  }
)

const slots = defineSlots<{
  default: any
}>()

const emit = defineEmits<{
  (e: 'close', event: Event): void
}>()

const showAlert = ref<boolean>(props.show)
const componentClass = computed<string>(() => {
  const { color, rounded, shadow } = props
  const classArray: string[] = [generateClass('BGCOLOR', color)]
  if (rounded) {
    classArray.push('rounded-md')
  }
  if (shadow) {
    classArray.push('drop-shadow-md')
  }
  return classArray.join(' ')
})
const handleClose = (e: Event) => {
  showAlert.value = false
  emit('close', e)
}
const closeAlert = () => {
  showAlert.value = false
}
watch(
  () => props.show,
  (newValue) => {
    showAlert.value = newValue
  }
)
defineExpose({
  close: closeAlert,
})
</script>

<template>
  <div
    v-if="showAlert"
    role="alert"
    aria-live="polite"
    aria-atomic="true"
    class="py-[0.75rem] px-[1.25rem] relative"
    :class="[componentClass]"
  >
    <div class="w-full flex justify-between gap-2xs">
      <div class="w-full">
        <slot></slot>
      </div>
      <button
        v-if="dismissible"
        @click="handleClose"
        class="flex items-center opacity-60 hover:opacity-40 transition-opacity duration-300 ease-linear"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          fill="currentColor"
          class="h-xs"
        >
          <!-- !Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
          <path
            d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
../index../index
