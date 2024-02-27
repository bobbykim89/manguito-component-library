<script setup lang="ts">
import { computed } from 'vue'
import type { ColorPalette, InputType } from '@bobbykim/manguito-theme'
import generateClass from '@bobbykim/manguito-theme'
import InputHighlight from '../common/InputHighlight.vue'

const props = withDefaults(
  defineProps<{
    id: string
    displayBorder?: boolean
    borderColor?: ColorPalette
    rounded?: boolean
    displayHighlight?: boolean
    highlightColor?: ColorPalette
    textcolor?: ColorPalette
    bgColor?: ColorPalette
    placeholder?: string
    type?: InputType
    displayShadow?: boolean
    required?: boolean
    modelValue?: string
    invalidFeedback?: string
    minLength?: number
    maxLength?: number
    pattern?: string
  }>(),
  {
    displayBorder: false,
    borderColor: 'light-4',
    rounded: false,
    displayHighlight: true,
    highlightColor: 'primary',
    textcolor: 'black',
    bgColor: 'light-1',
    placeholder: '',
    type: 'text',
    displayShadow: true,
    required: false,
  }
)

const emit = defineEmits(['update:modelValue'])
const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const inputClass = computed(() => {
  const {
    bgColor,
    displayBorder,
    borderColor,
    displayHighlight,
    displayShadow,
    rounded,
    textcolor,
  } = props
  const classArray: string[] = [
    generateClass('BGCOLOR', bgColor),
    generateClass('TEXTCOLOR', textcolor),
  ]
  if (displayBorder) {
    classArray.push('border-2')
    classArray.push(generateClass('BORDER', borderColor))
  }
  if (!displayHighlight) {
    classArray.push(
      'focus:ring-4 ring-offset-2 transition-all duration-300 ease-linear'
    )
    classArray.push(generateClass('FOCUSRING', borderColor))
  }
  if (displayShadow) {
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
      v-model="inputValue"
      :placeholder="placeholder"
      :required="required"
      :minlength="minLength"
      :maxlength="maxLength"
      :pattern="pattern"
    />
    <input-highlight
      v-if="displayHighlight"
      :color="highlightColor"
      :rounded="rounded"
    ></input-highlight>
    <div
      class="peer-valid/validation:hidden peer-inavlid/validation:block ml-3xs"
    >
      <slot name="invalid-feedback">
        <span class="text-xs text-danger">{{ invalidFeedback }}</span>
      </slot>
    </div>
  </div>
</template>
