<script setup lang="ts">
import { withDefaults } from 'vue'
import generateClass from '@mcl/manguito-theme'
import type {
  ColorPalette,
  HeadingSize,
  HeadingLevel,
  OpacityRange,
} from '@mcl/manguito-theme/theme/theme.types'

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
    gradientOpacity?: OpacityRange
  }>(),
  {
    titleLevel: 'h1',
    titleSize: 'md',
    titleColor: 'white',
    showTitleHighlight: false,
    titleHighlightColor: 'dark-3',
    fullWidth: true,
    displayGradients: true,
    gradientOpacity: 50,
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

  let titleLevel
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
</script>

<template>
  <section
    class="relative bg-image-container flex flex-col justify-end"
    :class="getSectionWidth(fullWidth)"
    :style="getBgImage(bgImage)"
  >
    <div
      v-if="displayGradients"
      class="absolute inset-0 bg-gradient-to-b from-transparent to-black"
      :class="generateClass('OPACITY', gradientOpacity)"
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
            >
              {{ title }}
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
