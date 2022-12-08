<script setup lang="ts">
import { withDefaults } from 'vue'
import type {
  ColorPalette,
  BodyText,
  ButtonSize,
} from '@bobbykim/manguito-theme/theme/theme.types'
import generateClass from '@bobbykim/manguito-theme'

const props = withDefaults(
  defineProps<{
    color?: ColorPalette
    hoverColor?: ColorPalette
    textSize?: BodyText
    buttonSize?: ButtonSize
    isBlock?: boolean
    rounded?: boolean
    displayShadow?: boolean
  }>(),
  {
    color: 'primary',
    hoverColor: 'light-1',
    textSize: 'md',
    buttonSize: 'medium',
    isBlock: false,
    rounded: false,
    displayShadow: true,
  }
)

const emit = defineEmits(['btn-click'])

const buttonConfig = (
  color: ColorPalette,
  hvColor: ColorPalette,
  textSize: BodyText,
  btnSize: ButtonSize,
  block: boolean,
  rounded: boolean,
  shadow: boolean
): string => {
  /**
   * @color - color, btn background color
   * @hvColor - hoverColor
   * @textSize - textSize, btn text size
   * @btnSize - buttonSize, padding for button
   * @block - isBlock, whether button will have full width or not
   * @rounded - rounded, whether button will have round corner or not
   */

  // const lightColor: string[] = ['light-1', 'light-2', 'light-3', 'light-4']

  // let textColor = lightColor.includes(color) ? 'text-black' : 'text-white'
  const classArray: string[] = [
    generateClass('BORDER', color),
    generateClass('FOCUSRING', color),
    generateClass('BGCOLOR', hvColor),
    generateClass('HVBGCOLOR', color),
    generateClass('TEXTCOLOR', color),
    generateClass('HVTEXTCOLOR', hvColor),
    generateClass('BODYTEXT', textSize),
  ]

  if (block) {
    classArray.push('block w-full')
  }
  if (rounded) {
    classArray.push('rounded-full')
  } else {
    classArray.push('rounded')
  }

  if (btnSize === 'medium') {
    classArray.push('px-4 py-2')
  } else if (btnSize === 'small') {
    classArray.push('px-2 py-1')
  } else {
    classArray.push('px-5 py-2.5')
  }

  if (shadow) {
    classArray.push('drop-shadow-md')
  }

  return classArray.join(' ')
}

const handleButtonClick = (e: Event): void => {
  emit('btn-click', e)
}
</script>

<template>
  <button
    class="outline-none focus:ring-4 ring-offset-2 transition-all duration-300 ease-linear border-2"
    :class="
      buttonConfig(
        color,
        hoverColor,
        textSize,
        buttonSize,
        isBlock,
        rounded,
        displayShadow
      )
    "
    @click="handleButtonClick"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped></style>
