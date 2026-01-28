<script setup lang="ts">
import type {
  BodyText,
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
  },
)
const slots = defineSlots<{
  default: any
}>()

const getBgImage = (img: string) => {
  /**
   * @img - bgImage
   */
  return {
    '--bg-image': `url('${img}')`,
  }
}
const titleClass = computed<string>(() => {
  /**
   * @param {HeadingLevel} titleLevel
   * @param {HeadingSize} titleSize
   * @param {ColorPalette} titleColor
   * @param {boolean} displayTitleShadow
   */
  const { titleLevel, titleSize, titleColor, displayTitleShadow } = props
  const headingClass: Record<HeadingLevel, 'H1' | 'H2' | 'H3' | 'H4'> = {
    h1: 'H1',
    h2: 'H2',
    h3: 'H3',
    h4: 'H4',
  }
  const classArray: string[] = [
    generateClass(headingClass[titleLevel], titleSize),
    generateClass('TEXTCOLOR', titleColor),
  ]
  if (displayTitleShadow) {
    classArray.push('drop-shadow-lg')
  }
  return classArray.join(' ')
})
const labelClass = computed<string>(() => {
  /**
   * @param {BodyText} labelTextSize
   * @param {ColorPalette} labelTextColor
   * @param {ColorPalette} labelBgColor
   */
  const { labelTextSize, labelTextColor, labelBgColor } = props
  const classArray: string[] = [
    generateClass('BODYTEXT', labelTextSize),
    generateClass('TEXTCOLOR', labelTextColor),
    generateClass('BGCOLOR', labelBgColor),
  ]
  return classArray.join(' ')
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
    class="section-bg relative flex flex-col items-center justify-evenly"
    :style="getBgImage(imageSource)"
  >
    <div
      v-if="displayGradient"
      class="bg-linear-to-t absolute inset-0 top-1/3 to-transparent"
      :class="gradientColorClass"
    ></div>
    <div class="py-md px-sm md:py-lg md:px-md relative">
      <div v-if="displayLabel" class="mb-2xs">
        <span
          v-html="labelText"
          class="py-3xs px-2xs"
          :class="labelClass"
        ></span>
      </div>
      <component
        :is="titleLevel"
        class="mb-2xs tracking-wide"
        :class="titleClass"
        v-html="title"
      ></component>
      <div
        v-if="displayHighlight"
        class="mb-xs h-3xs md:h-2xs w-md"
        :class="generateClass('BGCOLOR', highlightColor)"
      ></div>
    </div>
    <div
      v-if="slots.default"
      class="px-sm relative md:max-w-[60vw] lg:max-w-[50vw] xl:max-w-[40vw] 2xl:max-w-[35vw]"
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
