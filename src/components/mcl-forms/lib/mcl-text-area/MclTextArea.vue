<script setup lang="ts">
import { computed } from 'vue'
import type { ColorPalette } from '@bobbykim/manguito-theme'
import { generateClass } from '@bobbykim/manguito-theme'
import InputHighlight from '../common/InputHighlight.vue'

const props = withDefaults(
  defineProps<{
    id: string
    showBorder?: boolean
    borderColor?: ColorPalette
    rounded?: boolean
    showHighlight?: boolean
    highlightColor?: ColorPalette
    bgColor?: ColorPalette
    textColor?: ColorPalette
    placeholder?: string
    showShadow?: boolean
    required?: boolean
    invalid?: boolean
    rows?: number
  }>(),
  {
    showBorder: false,
    borderColor: 'light-4',
    rounded: false,
    showHighlight: true,
    highlightColor: 'primary',
    bgColor: 'light-1',
    textColor: 'black',
    placeholder: '',
    showShadow: true,
    required: false,
    invalid: false,
    rows: 5,
  }
)

const model = defineModel<string>()

const inputClass = computed(() => {
  const {
    bgColor,
    showBorder,
    borderColor,
    showHighlight,
    showShadow,
    rounded,
    textColor,
  } = props
  const classArray: string[] = [
    generateClass.bgColorVariant({ color: bgColor }),
    generateClass.textColorVariant({ color: textColor }),
  ]
  if (showBorder) {
    classArray.push('border-2')
    classArray.push(generateClass.borderColorVariant({ color: borderColor }))
  }
  if (!showHighlight) {
    classArray.push(
      'focus:ring-4 ring-offset-2 transition-all duration-300 ease-linear'
    )
    classArray.push(generateClass.focusRingColorVariant({ color: borderColor }))
  }
  if (showShadow) {
    classArray.push('shadow-md')
  }
  if (rounded) {
    classArray.push('rounded-md')
  }
  return classArray.join(' ')
})
</script>

<template>
  <div>
    <textarea
      :id="id"
      class="w-full p-2xs outline-none input__text peer"
      :class="inputClass"
      v-model="model"
      :placeholder="placeholder"
      :required="required"
      :aria-invalid="invalid || undefined"
      :rows="rows"
    />
    <input-highlight
      v-if="showHighlight"
      :color="highlightColor"
      :rounded="rounded"
      :offset="2.5"
    ></input-highlight>
  </div>
</template>
