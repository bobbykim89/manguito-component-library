<script setup lang="ts">
import { computed, ref } from 'vue'
import type {
  ColorPalette,
  BodyText,
  InputType,
  SpacingLevel,
} from '@bobbykim/manguito-theme/theme/theme.types'
import generateClass from '@bobbykim/manguito-theme'

const props = withDefaults(
  defineProps<{
    identifier: string
    displayLabel?: boolean
    labelText?: string
    labelSize?: BodyText
    labelColor?: ColorPalette
    labelBold?: boolean
    displayBorder?: boolean
    borderColor?: ColorPalette
    bgColor?: ColorPalette
    buttonText?: string
    buttonTextColor?: ColorPalette
    buttonColor?: ColorPalette
    displayShadow?: boolean
    placeholder?: string
    isRequired?: boolean
    spacing?: SpacingLevel
    accept?: string
    modelValue?: File
  }>(),
  {
    displayLabel: true,
    labelSize: 'md',
    labelColor: 'dark-3',
    labelBold: true,
    displayBorder: false,
    borderColor: 'light-4',
    bgColor: 'light-1',
    buttonText: 'Browse',
    buttonTextColor: 'dark-3',
    buttonColor: 'light-4',
    displayShadow: true,
    placeholder: '',
    isRequired: false,
    spacing: 'md',
    accept: 'image/jpg,image/jpeg,image/png',
  }
)

const emit = defineEmits(['update:modelValue'])

const inputFileName = ref('')
const inputRef = ref()
const onLabelClick = (): void => {
  inputRef.value.click()
}
const onChangeFile = (e: Event) => {
  const file = (e.target as HTMLInputElement).files![0]
  emit('update:modelValue', file)
  inputFileName.value = file.name
}

const getLabelClass = (
  size: BodyText,
  color: ColorPalette,
  bold: boolean
): string => {
  /**
   * @size - labelSize
   * @color - labelColor
   * @bold - labelBold
   */

  const classArray: string[] = [
    generateClass('BODYTEXT', size),
    generateClass('TEXTCOLOR', color),
  ]

  if (bold) {
    classArray.push('font-bold')
  }

  return classArray.join(' ')
}

const getInputClass = (
  bgColor: ColorPalette,
  dBorder: boolean,
  bColor: ColorPalette,
  dShadow: boolean
): string => {
  /**
   * @bgColor - bgColor
   * @dBorder - displayBorder
   * @bColor - borderColor
   * @dShadow - displayShadow
   */

  const classArray: string[] = [generateClass('BGCOLOR', bgColor)]
  const lightColor: string[] = ['light-1', 'light-2', 'light-3', 'light-4']
  if (!lightColor.includes(bgColor)) {
    classArray.push('text-white')
  }
  if (dBorder) {
    classArray.push('border-2')
    classArray.push(generateClass('BORDER', bColor))
  }

  if (dShadow) {
    classArray.push('shadow-md')
  }
  return classArray.join(' ')
}
const getButtonClass = (bColor: ColorPalette, tColor: ColorPalette): string => {
  /**
   * @bColor - buttonColor
   * @tColor - textColor
   */
  const classArray: string[] = [
    generateClass('BGCOLOR', bColor),
    generateClass('TEXTCOLOR', tColor),
  ]

  return classArray.join(' ')
}

const trancateString = (text: string): string => {
  if (text.length < 25) {
    return text
  }
  return text.slice(0, 20) + '...' + text.slice(-6)
}
</script>

<template>
  <div :class="generateClass('MARGINB', spacing)">
    <p
      v-if="displayLabel"
      class="inline-block mb-2xs cursor-default"
      :class="getLabelClass(labelSize, labelColor, labelBold)"
      @click="onLabelClick"
      v-html="labelText"
    ></p>
    <label
      :for="identifier"
      class="w-full p-3xs outline-none flex justify-between"
      :class="getInputClass(bgColor, displayBorder, borderColor, displayShadow)"
    >
      <span class="py-3xs pl-3xs text-sm">{{
        inputFileName ? trancateString(inputFileName) : placeholder
      }}</span>
      <div
        class="px-xs py-3xs h-full hover:bg-opacity-70 transition-all duration-200 ease-linear cursor-pointer"
        :class="getButtonClass(buttonColor, buttonTextColor)"
        v-html="buttonText"
      ></div>
      <input
        type="file"
        :id="identifier"
        ref="inputRef"
        class="hidden"
        :required="isRequired"
        :accept="accept"
        @change="onChangeFile"
      />
    </label>
  </div>
</template>

<style lang="scss" scoped></style>
