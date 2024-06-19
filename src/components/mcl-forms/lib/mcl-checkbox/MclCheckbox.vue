<script setup lang="ts">
import { ref, computed } from 'vue'
import generateClass, { ColorPalette } from '@bobbykim/manguito-theme'
import type { InputSizeType, ColorMap } from '../common/index.types'

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
    triState?: boolean
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
    triState: false,
  }
)

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

const checkboxRef = ref<HTMLInputElement>()
const emit = defineEmits<{
  (e: 'change', event: Event, value: string | number): void
}>()

const handleCheckboxClick = () => {
  checkboxRef.value?.click()
}

const handleChange = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  emit('change', e, value)
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
    generateClass('TEXTCOLOR', checkColor),
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
      name=""
      :checked="checked"
      class="appearance-none peer/input"
      @change="handleChange"
    />
    <span
      class="relative border inline-block p-3xs hover:bg-opacity-60"
      :class="[handleCheckboxLayout, handleInputSize]"
      @click="handleCheckboxClick"
    >
      <svg
        v-if="checked"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        fill="currentColor"
      >
        <!-- !Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
        <path
          d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
        />
      </svg>
    </span>
  </div>
</template>

<style scoped></style>
