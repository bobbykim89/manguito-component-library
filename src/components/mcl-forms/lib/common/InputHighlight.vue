<script setup lang="ts">
import { computed } from 'vue'
import generateClass from '@bobbykim/manguito-theme'
import type { ColorPalette } from '@bobbykim/manguito-theme'

type OffsetType = 1 | 2.5

const props = withDefaults(
  defineProps<{
    color?: ColorPalette
    rounded?: boolean
    offset?: OffsetType
  }>(),
  {
    color: 'primary',
    rounded: false,
    offset: 1,
  }
)

const offsetOptions = {
  1: '-top-1',
  2.5: '-top-2.5',
}

const getHighlightClass = computed((): string => {
  /**
   * @param {ColorPalette} color - highlightColor
   * @param {boolean} rounded - rounded
   * @param {OffsetType} offset
   */
  const classArray: string[] = [generateClass('BEFOREBG', props.color)]
  if (props.rounded) {
    classArray.push('rounded-b-md')
  }
  classArray.push(offsetOptions[props.offset])
  return classArray.join(' ')
})
</script>

<template>
  <div
    class="relative h-3xs overflow-hidden before:absolute before:bottom-0 before:left-0 before:h-full before:w-0 peer-focus:before:w-full before:transition-[width] before:duration-300 before:ease-linear"
    :class="getHighlightClass"
  ></div>
</template>
