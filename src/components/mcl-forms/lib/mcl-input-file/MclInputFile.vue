<script setup lang="ts">
import type { ColorPalette } from '@bobbykim/manguito-theme'
import generateClass from '@bobbykim/manguito-theme'
import { computed, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    id: string
    displayBorder?: boolean
    borderColor?: ColorPalette
    rounded?: boolean
    bgColor?: ColorPalette
    buttonText?: string
    buttonTextColor?: ColorPalette
    buttonColor?: ColorPalette
    displayShadow?: boolean
    textColor?: ColorPalette
    displayClear?: boolean
    isRequired?: boolean
    accept?: string
    modelValue?: File
  }>(),
  {
    displayBorder: false,
    borderColor: 'light-4',
    rounded: false,
    bgColor: 'light-1',
    buttonText: 'Browse File',
    buttonTextColor: 'dark-3',
    buttonColor: 'light-4',
    displayShadow: true,
    textColor: 'black',
    displayClear: false,
    isRequired: false,
    accept: 'image/jpg,image/jpeg,image/png',
  }
)

const emit = defineEmits(['update:modelValue'])

const inputRef = ref()
const fileInputKey = ref<number>(0)
const onButtonClick = () => {
  inputRef.value.click()
}
const onChangeFile = (e: Event) => {
  const file = (e.target as HTMLInputElement).files![0]
  emit('update:modelValue', file)
}

const onClearFile = () => {
  emit('update:modelValue', null)
  fileInputKey.value++
}

const borderClass = computed<string>(() => {
  const { rounded, displayBorder, borderColor, displayShadow, bgColor } = props
  const classArray: string[] = [generateClass('BGCOLOR', bgColor)]
  if (rounded) {
    classArray.push('rounded-md')
  }
  if (displayBorder) {
    classArray.push('border-2')
    classArray.push(generateClass('BORDER', borderColor))
  }
  if (displayShadow) {
    classArray.push('shadow-md')
  }
  return classArray.join(' ')
})

const inputClass = computed<string>(() => {
  const { bgColor, textColor } = props
  const classArray: string[] = [
    // generateClass('BGCOLOR', bgColor),
    generateClass('TEXTCOLOR', textColor),
  ]
  return classArray.join(' ')
})

const getButtonClass = computed(() => {
  const { buttonColor, buttonTextColor, rounded } = props
  const classArray: string[] = [
    generateClass('BGCOLOR', buttonColor),
    generateClass('TEXTCOLOR', buttonTextColor),
  ]
  if (rounded) {
    classArray.push('rounded-l-md')
  }
  return classArray.join(' ')
})

const getClearButtonClass = computed<string>(() => {
  const { buttonColor, rounded } = props
  const classArray: string[] = [generateClass('BGCOLOR', buttonColor)]
  if (rounded) {
    classArray.push('rounded-r-md')
  }
  return classArray.join(' ')
})
</script>

<template>
  <div class="flex items-center overflow-hidden" :class="borderClass">
    <!-- browse button -->
    <div class="shrink-0 my-3xs ml-3xs mr-xs">
      <button
        class="px-xs py-2xs hover:bg-opacity-70 transition-all duration-200 ease-linear max-w-full"
        :class="getButtonClass"
        @click="onButtonClick"
      >
        {{ buttonText }}
      </button>
    </div>
    <input
      type="file"
      :id="id"
      ref="inputRef"
      class="file:hidden w-full bg-transparent"
      :class="[inputClass]"
      :required="isRequired"
      :accept="accept"
      :key="fileInputKey"
      @change="onChangeFile"
    />
    <!-- clear button -->
    <div
      v-if="displayClear"
      class="self-stretch my-3xs mr-3xs"
      @click="onClearFile"
    >
      <button
        class="px-xs py-2xs h-full flex items-center hover:bg-opacity-70 transition-all duration-200 ease-linear"
        aria-label="clear"
        :class="[getClearButtonClass]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          class="h-xs"
          :class="generateClass('SVGFILL', buttonTextColor)"
        >
          <!-- !Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
          <path
            d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
