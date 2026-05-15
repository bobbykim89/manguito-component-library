<script setup lang="ts">
import { computed } from 'vue'
import type { ColorPalette, InputType } from '@bobbykim/manguito-theme'
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
    textColor?: ColorPalette
    bgColor?: ColorPalette
    placeholder?: string
    type?: InputType
    showShadow?: boolean
    required?: boolean
    invalid?: boolean
    invalidFeedback?: string
    minLength?: number
    maxLength?: number
    pattern?: string
  }>(),
  {
    showBorder: false,
    borderColor: 'light-4',
    rounded: false,
    showHighlight: true,
    highlightColor: 'primary',
    textColor: 'black',
    bgColor: 'light-1',
    placeholder: '',
    type: 'text',
    showShadow: true,
    required: false,
    invalid: false,
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
    <input
      :id="id"
      :type="type"
      class="w-full p-2xs outline-none peer peer/validation"
      :class="inputClass"
      v-model="model"
      :placeholder="placeholder"
      :required="required"
      :aria-invalid="invalid || undefined"
      :aria-describedby="invalid ? `${id}-error` : undefined"
      :minlength="minLength"
      :maxlength="maxLength"
      :pattern="pattern"
    />
    <input-highlight
      v-if="showHighlight"
      :color="highlightColor"
      :rounded="rounded"
    ></input-highlight>
    <div
      :id="`${id}-error`"
      role="alert"
      class="peer-valid/validation:hidden peer-invalid/validation:block ml-3xs"
    >
      <slot name="invalid-feedback">
        <span class="text-xs text-danger">{{ invalidFeedback }}</span>
      </slot>
    </div>
  </div>
</template>
