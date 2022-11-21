<script setup lang="ts">
import { withDefaults } from 'vue'
import type {
  ColorPalette,
  BodyText,
  ButtonSize,
} from '@mcl/manguito-theme/theme/theme.types'
import generateClass from '@mcl/manguito-theme'

withDefaults(
  defineProps<{
    color?: ColorPalette
    textSize?: BodyText
    buttonSize?: ButtonSize
    isBlock?: boolean
    rounded?: boolean
    displayShadow?: boolean
  }>(),
  {
    color: 'primary',
    textSize: 'md',
    buttonSize: 'medium',
    isBlock: false,
    rounded: false,
    displayShadow: false,
  }
)

const emit = defineEmits(['btn-click'])

const buttonConfig = (
  color: ColorPalette,
  textSize: BodyText,
  btnSize: ButtonSize,
  block: boolean,
  rounded: boolean,
  shadow: boolean
): string => {
  /**
   * @color - color, btn background color
   * @textSize - textSize, btn text size
   * @btnSize - buttonSize, padding for button
   * @block - isBlock, whether button will have full width or not
   * @rounded - rounded, whether button will have round corner or not
   * @shadow - displayShadow, boolean
   */

  const lightColor: string[] = ['light-1', 'light-2', 'light-3', 'light-4']

  let textColor = lightColor.includes(color)
    ? 'text-black ring-offset-black'
    : 'text-white ring-offset-white'
  let isBlock = block ? 'block w-full' : ''
  let corner = rounded ? 'rounded-full' : 'rounded'
  let showShadow = shadow ? 'drop-shadow-md	' : ''
  let buttonSize: string

  if (btnSize === 'medium') {
    buttonSize = 'px-4 py-2'
  } else if (btnSize === 'small') {
    buttonSize = 'px-2 py-1'
  } else {
    buttonSize = 'px-5 py-2.5'
  }

  return `${generateClass('BGCOLOR', color)} ${generateClass(
    'FOCUSRING',
    color
  )} ${textColor} ${buttonSize} ${generateClass(
    'BODYTEXT',
    textSize
  )} ${isBlock} ${corner} ${showShadow}`
}

const handleButtonClick = (e: Event): void => {
  emit('btn-click', e)
}
</script>

<template>
  <button
    class="focus:outline-none focus:ring-4 ring-offset-2 bg-opacity-100 hover:bg-opacity-70 transition-all duration-300 ease-linear"
    :class="
      buttonConfig(color, textSize, buttonSize, isBlock, rounded, displayShadow)
    "
    @click="handleButtonClick"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped></style>
