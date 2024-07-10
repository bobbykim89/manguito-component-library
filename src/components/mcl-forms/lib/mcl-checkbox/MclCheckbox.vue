<script setup lang="ts">
import { ref, computed, defineModel } from 'vue'
import generateClass, { ColorPalette } from '@bobbykim/manguito-theme'
import type { InputSizeType, ColorMap } from '../common/index.types'

const peerBgColor: ColorMap = {
  primary: 'peer-checked/input:bg-primary',
  secondary: 'peer-checked/input:bg-secondary',
  success: 'peer-checked/input:bg-success',
  info: 'peer-checked/input:bg-info',
  warning: 'peer-checked/input:bg-warning',
  danger: 'peer-checked/input:bg-danger',
  'light-1': 'peer-checked/input:bg-light-1',
  'light-2': 'peer-checked/input:bg-light-2',
  'light-3': 'peer-checked/input:bg-light-3',
  'light-4': 'peer-checked/input:bg-light-4',
  'dark-1': 'peer-checked/input:bg-dark-1',
  'dark-2': 'peer-checked/input:bg-dark-2',
  'dark-3': 'peer-checked/input:bg-dark-3',
  'dark-4': 'peer-checked/input:bg-dark-1',
  transparent: 'peer-checked/input:bg-transparent',
  black: 'peer-checked/input:bg-black',
  white: 'peer-checked/input:bg-white',
}
const beforeColor: ColorMap = {
  primary: 'before:text-primary',
  secondary: 'before:text-secondary',
  success: 'before:text-success',
  info: 'before:text-info',
  warning: 'before:text-warning',
  danger: 'before:text-danger',
  'light-1': 'before:text-light-1',
  'light-2': 'before:text-light-2',
  'light-3': 'before:text-light-3',
  'light-4': 'before:text-light-4',
  'dark-1': 'before:text-dark-1',
  'dark-2': 'before:text-dark-2',
  'dark-3': 'before:text-dark-3',
  'dark-4': 'before:text-dark-1',
  transparent: 'before:text-transparent',
  black: 'before:text-black',
  white: 'before:text-white',
}

const props = withDefaults(
  defineProps<{
    id: string
    inputSize?: InputSizeType
    bgColor?: ColorPalette
    checkedBgColor?: ColorPalette
    checkColor?: ColorPalette
    borderColor?: ColorPalette
    displayShadow?: boolean
    rounded?: boolean
    value?: string | number
    checked?: boolean
  }>(),
  {
    inputSize: 'md',
    bgColor: 'light-1',
    checkedBgColor: 'warning',
    checkColor: 'dark-3',
    borderColor: 'dark-1',
    displayShadow: false,
    rounded: false,
    checked: false,
  }
)

const model = defineModel<boolean>()

const checkboxRef = ref<HTMLInputElement>()
const emit = defineEmits<{
  (e: 'checkbox-click', event: Event, value: string | number): void
}>()

const handleCheckboxClick = () => {
  checkboxRef.value?.click()
}

const handleChange = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  emit('checkbox-click', e, checkboxRef.value?.checked ? value : '')
}

const handleInputSize = computed<string>(() => {
  const { inputSize } = props
  if (inputSize === 'sm') {
    return 'h-xs w-xs'
  }
  if (inputSize === 'lg') {
    return 'h-md w-md'
  }
  return 'h-sm w-sm'
})
const handleCheckboxLayout = computed<string>(() => {
  const {
    bgColor,
    borderColor,
    displayShadow,
    rounded,
    checkedBgColor,
    checkColor,
  } = props
  const classArray: string[] = [
    generateClass('BGCOLOR', bgColor),
    generateClass('BORDER', borderColor),
    beforeColor[checkColor],
    peerBgColor[checkedBgColor],
  ]
  if (displayShadow) {
    classArray.push('drop-shadow-md')
  }
  if (rounded) {
    classArray.push('rounded-md')
  }
  return classArray.join(' ')
})
</script>

<template>
  <div class="relative">
    <input
      :id="id"
      ref="checkboxRef"
      type="checkbox"
      :value="value"
      :checked="checked"
      v-model="model"
      class="appearance-none peer/input"
      @change="handleChange"
    />
    <span
      class="relative border peer-checked/input:border-2 inline-block p-3xs hover:bg-opacity-60 peer-checked/input:hover:bg-opacity-60 peer-checked/input:before:content-['\2713'] peer-checked/input:before:inline-block peer-checked/input:before:absolute before:top-1/2 before:-translate-y-1/2 before:left-1/2 before:-translate-x-1/2 transition-colors duration-200 ease-linear"
      :class="[handleCheckboxLayout, handleInputSize]"
      @click="handleCheckboxClick"
    >
    </span>
  </div>
</template>

<style scoped></style>
