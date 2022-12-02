<script setup lang="ts">
import { withDefaults } from 'vue'
import type {
  HeadingSize,
  HeadingLevel,
  ColorPalette,
  BodyText,
} from '@mcl/manguito-theme/theme/theme.types'
import generateClass from '@mcl/manguito-theme'

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
</script>

<template>
  <section
    class="flex flex-col justify-evenly items-center relative section-bg"
    :style="getBgImage(imageSource)"
  >
    <div
      class="absolute bg-gradient-to-t inset-0 top-1/3 -bottom-0 from-secondary/80 to-transparent"
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
        class="mb-xs h-3xs w-md"
        :class="generateClass('BGCOLOR', highlightColor)"
      ></div>
    </div>
    <div class="px-sm md:max-w-[50vh] relative">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias aut
      excepturi autem voluptatum, minus quos eaque nam repudiandae dolorum vitae
      neque corrupti temporibus. Tempora maxime sequi voluptas dolorem sunt
      porro, ipsum quaerat a nam aperiam ex ut repudiandae, necessitatibus eos.
      Sunt, quos sit a totam tempore unde ipsa exercitationem alias.
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
