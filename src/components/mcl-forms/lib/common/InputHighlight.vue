<script setup lang="ts">
import { computed } from 'vue'
import { generateClass } from '@bobbykim/manguito-theme'
import type { ColorPalette } from '@bobbykim/manguito-theme'

const props = withDefaults(
  defineProps<{
    color?: ColorPalette
    rounded?: boolean
  }>(),
  {
    color: 'primary',
    rounded: false,
  },
)

const getHighlightClass = computed((): string => {
  /**
   * @param {ColorPalette} color - highlightColor
   * @param {boolean} rounded - rounded
   */
  const classArray: string[] = [
    generateClass.beforeBgColorVariant({ color: props.color }),
  ]
  if (props.rounded) {
    classArray.push('rounded-b-md')
  }
  // Overlaps the control's bottom 4px. Text inputs leave no gap under them and
  // the textarea is a block (#122), so one offset fits every control.
  classArray.push('-top-1')
  return classArray.join(' ')
})
</script>

<template>
  <div
    class="relative h-3xs overflow-hidden before:absolute before:bottom-0 before:left-0 before:h-full before:w-0 before:transition-[width] before:duration-300 before:ease-linear peer-focus:before:w-full"
    :class="getHighlightClass"
  ></div>
</template>
