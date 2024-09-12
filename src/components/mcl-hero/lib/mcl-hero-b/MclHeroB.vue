<script setup lang="ts">
import type {
  ColorPalette,
  HeadingLevel,
  HeadingSize,
} from '@bobbykim/manguito-theme'
import generateClass from '@bobbykim/manguito-theme'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    title: string
    titleLevel?: HeadingLevel
    titleSize?: HeadingSize
    titleColor?: ColorPalette
    displayHighlight?: boolean
    highlightColor?: ColorPalette
    fullWidth?: boolean
    imageSource: string
    displayGradients?: boolean
    gradientColor?: ColorPalette
  }>(),
  {
    titleLevel: 'h1',
    titleSize: 'md',
    titleColor: 'white',
    displayHighlight: false,
    highlightColor: 'dark-3',
    fullWidth: true,
    displayGradients: true,
    gradientColor: 'dark-3',
  }
)
const getBgImage = (img: string) => {
  /**
   * @param {string} img - imageSource
   */
  return { 'background-image': `url('${img}')` }
}
const sectionWidthClass = computed<string>(() => {
  /**
   * @param {boolean} fullWidth
   */
  const { fullWidth } = props
  return fullWidth ? '' : 'xl:container'
})
const titleClass = computed<string>(() => {
  /**
   * @param {HeadingLevel} titleLevel
   * @param {HeadingSize} titleSize
   * @param {ColorPalette} titleColor
   */
  const { titleLevel, titleSize, titleColor } = props
  const titleClass: Record<HeadingLevel, 'H1' | 'H2' | 'H3' | 'H4'> = {
    h1: 'H1',
    h2: 'H2',
    h3: 'H3',
    h4: 'H4',
  }
  const classArray: string[] = [
    generateClass(titleClass[titleLevel], titleSize),
    generateClass('TEXTCOLOR', titleColor),
  ]
  return classArray.join(' ')
})
const titleHighlightClass = computed<string>(() => {
  /**
   * @param {ColorPalette} highlightColor
   * @param {boolean} displayHighlight
   */
  const { highlightColor, displayHighlight } = props
  const classArray: string[] = [
    generateClass('BGCOLOR', highlightColor),
    'shadow-lg',
    'px-xs',
  ]
  return displayHighlight ? classArray.join(' ') : ''
})
const gradientColorClass = computed<string>(() => {
  const { gradientColor } = props
  /**
   * @param {ColorPalette} gradientColor
   */
  switch (gradientColor) {
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
})
</script>

<template>
  <section
    class="relative bg-image-container flex flex-col justify-end"
    :class="sectionWidthClass"
    :style="getBgImage(imageSource)"
  >
    <div
      v-if="displayGradients"
      class="absolute bg-gradient-to-t inset-0 top-1/3 to-transparent"
      :class="gradientColorClass"
    ></div>
    <div class="relative h-full px-xs">
      <div class="container">
        <div class="py-md lg:py-lg px-0">
          <component :is="titleLevel" :class="titleClass">
            <span
              class="box-decoration-clone py-2xs"
              :class="titleHighlightClass"
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
