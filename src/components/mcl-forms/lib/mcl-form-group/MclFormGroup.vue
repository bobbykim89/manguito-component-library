<script setup lang="ts">
import type { BodyText, ColorPalette } from '@bobbykim/manguito-theme'
import generateClass from '@bobbykim/manguito-theme'
import { computed } from 'vue'
const props = withDefaults(
  defineProps<{
    labelFor: string
    textColor?: ColorPalette
    textSize?: BodyText
    textBold?: boolean
    label?: string
  }>(),
  {
    textColor: 'dark-3',
    textSize: 'md',
    textBold: false,
  }
)
const slots = defineSlots<{
  default: any
  label: any
}>()
const handleLabelText = computed((): string => {
  /**
   * @param {ColorPalette} textColor - handles text color of label text
   * @param {BodyText} textSize - handles text size of label text
   * @param {boolean} textBold - controls whether or not to make label text bold
   */
  const { textColor, textSize, textBold } = props
  const classArray = [
    generateClass('TEXTCOLOR', textColor),
    generateClass('BODYTEXT', textSize),
  ]
  if (textBold) {
    classArray.push('font-bold')
  }
  return classArray.join(' ')
})
</script>

<template>
  <div>
    <label :for="labelFor" class="inline-block">
      <slot name="label">
        <p class="mb-2xs" :class="handleLabelText">{{ label }}</p>
      </slot>
    </label>
    <slot />
  </div>
</template>
