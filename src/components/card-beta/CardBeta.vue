<script setup lang="ts">
import { withDefaults } from 'vue'
import type {
  ColorPalette,
  HeadingSize,
  CtaTarget,
  CrossOrigin,
} from '@mcl/manguito-theme/theme/theme.types'
import generateClass from '@mcl/manguito-theme'

const props = withDefaults(
  defineProps<{
    title: string
    titleSize?: HeadingSize
    titleColor?: ColorPalette
    titleBlockColor?: ColorPalette
    imageSource?: string
    imageAlt?: string
    imageCORS?: CrossOrigin
    displayGrayScale?: boolean
    ctaAsLink?: boolean
    ctaLink?: string
    ctaTarget?: CtaTarget
    rounded?: boolean
  }>(),
  {
    titleSize: 'md',
    titleColor: 'light-1',
    titleBlockColor: 'dark-4',
    displayGrayScale: true,
    imageCORS: 'anonymous',
    ctaAsLink: false,
    ctaTarget: '_blank',
    rounded: false,
  }
)

const handleHoverEffect = (dGray: boolean): string => {
  /**
   * @dgray - displayGrayScale
   */
  if (dGray) {
    return '[@media(hover:hover)]:grayscale hover:grayscale-0'
  }
  return
}

const handleTitleClass = (
  tSize: HeadingSize,
  tColor: ColorPalette,
  tBgColor: ColorPalette
): string => {
  /**
   * @tSize - titleSize
   * @tColor - titleColor
   * @tBgColor - titleBlockColor
   */

  const classArray = [
    generateClass('H3', tSize),
    generateClass('TEXTCOLOR', tColor),
    generateClass('BGCOLOR', tBgColor),
  ]

  return classArray.join(' ')
}
</script>

<template>
  <div
    class="relative max-w-[350px] flex-grow flex-shrink-0 cursor-pointer overflow-hidden"
    :class="[rounded ? 'rounded-md' : 'rounded-sm']"
  >
    <img
      :src="imageSource"
      :alt="imageAlt"
      :crossorigin="imageCORS"
      class="relative h-full object-cover transition-all duration-200 peer"
      :class="handleHoverEffect(displayGrayScale)"
    />
    <h3
      v-html="title"
      class="absolute bottom-xs left-xs px-xs py-2xs pointer-events-none tracking-wide [@media(hover:hover)]:opacity-0 peer-hover:opacity-100 transition-opacity duration-200"
      :class="handleTitleClass(titleSize, titleColor, titleBlockColor)"
    ></h3>
  </div>
</template>

<style lang="scss" scoped></style>
