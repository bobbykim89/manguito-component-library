<script setup lang="ts">
import generateClass from '@bobbykim/manguito-theme'
import type {
  ColorPalette,
  HeadingSize,
  HeadingLevel,
} from '@bobbykim/manguito-theme'

const props = withDefaults(
  defineProps<{
    title: string
    titleLevel?: HeadingLevel
    titleSize?: HeadingSize
    titleColor?: ColorPalette
    showTitleHighlight?: boolean
    titleHighlightColor?: ColorPalette
    fullWidth?: boolean
    bgImage: string
    displayGradients?: boolean
    gradientColor?: ColorPalette
  }>(),
  {
    titleLevel: 'h1',
    titleSize: 'md',
    titleColor: 'white',
    showTitleHighlight: false,
    titleHighlightColor: 'dark-3',
    fullWidth: true,
    displayGradients: true,
    gradientColor: 'dark-3',
  }
)
const getBgImage = (img: string) => {
  /**
   * @img - bgImage
   */
  return { 'background-image': `url('${img}')` }
}
const getSectionWidth = (sWidth: boolean): string => {
  /**
   * @sWidth - fullWidth
   */
  return sWidth ? '' : 'xl:container'
}

const getTitleClass = (
  level: HeadingLevel,
  size: HeadingSize,
  color: ColorPalette
): string => {
  /**
   * @level - titleLevel
   * @size - titleSize
   * @color - titleColor
   */

  let titleLevel: 'H1' | 'H2' | 'H3' | 'H4'
  if (level === 'h1') {
    titleLevel = 'H1'
  } else if (level === 'h2') {
    titleLevel = 'H2'
  } else if (level === 'h3') {
    titleLevel = 'H3'
  } else {
    titleLevel = 'H4'
  }

  const classArray = [
    generateClass(titleLevel, size),
    generateClass('TEXTCOLOR', color),
  ]

  return classArray.join(' ')
}

const getTitleHighlightClass = (
  color: ColorPalette,
  display: boolean
): string => {
  /**
   * @color - titleHighlightColor
   * @display - showTitleHighlight
   */

  const classArray = [generateClass('BGCOLOR', color), 'shadow-lg', 'px-xs']

  return display ? classArray.join(' ') : ''
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
    default:
      return ''
  }
}
</script>

<template>
  <section
    class="relative bg-image-container flex flex-col justify-end"
    :class="getSectionWidth(fullWidth)"
    :style="getBgImage(bgImage)"
  >
    <div
      v-if="displayGradients"
      class="absolute bg-gradient-to-t inset-0 top-1/3 to-transparent"
      :class="generateGradientColor(gradientColor)"
    ></div>
    <div class="relative h-full px-xs">
      <div class="container">
        <div class="py-md lg:py-lg px-0">
          <component
            :is="titleLevel"
            :class="getTitleClass(titleLevel, titleSize, titleColor)"
          >
            <span
              class="box-decoration-clone py-2xs"
              :class="
                getTitleHighlightClass(titleHighlightColor, showTitleHighlight)
              "
              v-html="title"
            >
            </span>
          </component>
          <div class="hidden md:block md:mt-sm w-3/4">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.bg-image-container {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  min-height: 256px;

  @media screen and (min-width: 768px) {
    min-height: 400px;
  }
  @media screen and (min-width: 1024px) {
    min-height: 512px;
  }
}
</style>
