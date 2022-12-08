<script setup lang="ts">
import { withDefaults } from 'vue'
import type {
  HeadingSize,
  HeadingLevel,
  ColorPalette,
  BodyText,
} from '@bobbykim/manguito-theme/theme/theme.types'
import generateClass from '@bobbykim/manguito-theme'

const props = withDefaults(
  defineProps<{
    title: string
    titleLevel?: HeadingLevel
    titleSize?: HeadingSize
    titleColor?: ColorPalette
    displayTitleShadow?: boolean
    displayHighlight?: boolean
    highlightColor?: ColorPalette
    imageSource: string
    displayGradient?: boolean
    gradientColor?: ColorPalette
    displayLabel?: boolean
    labelText?: string
    labelTextSize?: BodyText
    labelTextColor?: ColorPalette
    labelBgColor?: ColorPalette
    displaySlot?: boolean
  }>(),
  {
    titleLevel: 'h1',
    titleSize: 'md',
    titleColor: 'dark-3',
    displayTitleShadow: true,
    displayHighlight: true,
    displayGradient: true,
    highlightColor: 'primary',
    gradientColor: 'primary',
    displayLabel: true,
    labelTextSize: 'md',
    labelTextColor: 'light-1',
    labelBgColor: 'dark-3',
    displaySlot: true,
  }
)

const getBgImage = (img: string) => {
  /**
   * @img - bgImage
   */
  return {
    '--bg-image': `url('${img}')`,
  }
}

const getTitleClass = (
  level: HeadingLevel,
  size: HeadingSize,
  color: ColorPalette,
  shadow: boolean
): string => {
  /**
   * @level - titleLevel
   * @size - titleSize
   * @color - titleColor
   * @shadow - displayTitleShadow
   */
  const classArray = [generateClass('TEXTCOLOR', color)]

  if (level === 'h1') {
    classArray.push(generateClass('H1', size))
  }
  if (level === 'h2') {
    classArray.push(generateClass('H2', size))
  }
  if (level === 'h3') {
    classArray.push(generateClass('H3', size))
  }
  if (level === 'h4') {
    classArray.push(generateClass('H4', size))
  }
  if (shadow) {
    classArray.push('drop-shadow-lg')
  }
  return classArray.join(' ')
}
const getLabelClass = (
  size: BodyText,
  tColor: ColorPalette,
  bgColor: ColorPalette
): string => {
  /**
   * @size - labelTextSize
   * @tColor - labelTextColor
   * @bgColor - labelBgColor
   */
  const classArray = [
    generateClass('BODYTEXT', size),
    generateClass('TEXTCOLOR', tColor),
    generateClass('BGCOLOR', bgColor),
  ]
  return classArray.join(' ')
}
const generateGradientColor = (color: ColorPalette): string => {
  /**
   * @color - gradientColor
   */
  switch (color) {
    case 'primary':
      return 'from-primary/80'
    case 'secondary':
      return 'from-secondary/80'
    case 'success':
      return 'from-success/80'
    case 'danger':
      return 'from-danger/80'
    case 'info':
      return 'from-info/80'
    case 'warning':
      return 'from-warning/80'
    case 'light-1':
      return 'from-light-1/80'
    case 'light-2':
      return 'from-light-2/80'
    case 'light-3':
      return 'from-light-3/80'
    case 'light-4':
      return 'from-light-4/80'
    case 'dark-1':
      return 'from-dark-1/80'
    case 'dark-2':
      return 'from-dark-2/80'
    case 'dark-3':
      return 'from-dark-3/80'
    case 'dark-4':
      return 'from-dark-4/80'
    case 'black':
      return 'from-black/80'
    case 'white':
      return 'from-white/80'
  }
}
</script>

<template>
  <section
    class="flex flex-col justify-evenly items-center relative section-bg"
    :style="getBgImage(imageSource)"
  >
    <div
      v-if="displayGradient"
      class="absolute bg-gradient-to-t inset-0 top-1/3 to-transparent"
      :class="generateGradientColor(gradientColor)"
    ></div>
    <div class="relative py-md px-sm md:py-lg md:px-md">
      <div v-if="displayLabel" class="mb-2xs">
        <span
          v-html="labelText"
          class="py-3xs px-2xs"
          :class="getLabelClass(labelTextSize, labelTextColor, labelBgColor)"
        ></span>
      </div>
      <component
        :is="titleLevel"
        class="tracking-wide mb-2xs"
        :class="
          getTitleClass(titleLevel, titleSize, titleColor, displayTitleShadow)
        "
        v-html="title"
      ></component>
      <div
        v-if="displayHighlight"
        class="mb-xs h-3xs md:h-2xs w-md"
        :class="generateClass('BGCOLOR', highlightColor)"
      ></div>
    </div>
    <div
      v-if="displaySlot"
      class="px-sm md:max-w-[60vw] lg:max-w-[50vw] xl:max-w-[40vw] 2xl:max-w-[35vw] relative"
    >
      <slot></slot>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section-bg {
  height: 100vh;
  position: relative;
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    position: fixed;
    background-position: center 5%;
    background-size: cover;
    background-repeat: no-repeat;
    will-change: transform;
    background-image: var(--bg-image);
  }
}
</style>
