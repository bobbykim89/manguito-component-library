<script setup lang="ts">
import { computed } from 'vue'
import type { ColorPalette } from '@bobbykim/manguito-theme'
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
    bgColor?: ColorPalette
    textcolor?: ColorPalette
    placeholder?: string
    displayShadow?: boolean
    required?: boolean
    rows?: number
    modelValue?: string
  }>(),
  {
    displayBorder: false,
    borderColor: 'light-4',
    rounded: false,
    displayHighlight: true,
    highlightColor: 'primary',
    bgColor: 'light-1',
    textcolor: 'black',
    placeholder: '',
    displayShadow: true,
    required: false,
    rows: 5,
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
    <textarea
      :id="id"
      class="w-full p-2xs outline-none input__text peer"
      :class="inputClass"
      v-model="inputValue"
      :placeholder="placeholder"
      :required="required"
      :rows="rows"
    />
    <input-highlight
      v-if="displayHighlight"
      :color="highlightColor"
      :rounded="rounded"
      :offset="2.5"
    ></input-highlight>
  </div>
</template>
