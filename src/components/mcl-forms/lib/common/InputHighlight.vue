<script setup lang="ts">
import { computed } from 'vue'
import generateClass from '@bobbykim/manguito-theme'
import type { ColorPalette } from '@bobbykim/manguito-theme'

const props = withDefaults(
  defineProps<{
    color?: ColorPalette
    rounded?: boolean
  }>(),
  {
    color: 'primary',
    rounded: false,
  }
)

const getHighlightClass = computed((): string => {
  /**
   * @param {ColorPalette} color - highlightColor
   * @param {boolean} rounded - rounded
   */
  const classArray: string[] = [generateClass('BEFOREBG', props.color)]
  if (props.rounded) {
    classArray.push('rounded-b-md')
  }
  return classArray.join(' ')
})
</script>

<template>
  <div
    class="relative -top-1 h-3xs overflow-hidden before:absolute before:bottom-0 before:left-0 before:h-full before:w-0 peer-focus:before:w-full before:transition-[width] before:duration-300 before:ease-linear"
    :class="getHighlightClass"
  ></div>
</template>
