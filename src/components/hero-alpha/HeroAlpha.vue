<script setup lang="ts">
import { withDefaults } from 'vue'
import generateClass from '@mcl/manguito-theme'
import type {
  HeadingLevel,
  HeadingSize,
  ColorPalette,
  Directions,
} from '@mcl/manguito-theme/theme/theme.types'

const props = withDefaults(
  defineProps<{
    title: string
    titleLevel?: HeadingLevel
    titleSize?: HeadingSize
    displaySubTitle: boolean
    subTitle?: string
    subTitleLevel?: HeadingLevel
    subTitleSize?: HeadingSize
    titleColor?: ColorPalette
    bgImage: string
    bgColor?: ColorPalette
    imgPosition?: Directions
  }>(),
  {
    titleLevel: 'h1',
    titleSize: 'md',
    displaySubTitle: false,
    subTitleLevel: 'h3',
    subTitleSize: 'md',
    titleColor: 'dark-3',
    imgPosition: 'right',
    bgColor: 'white',
  }
)

const getBgImage = (img: string) => {
  /**
   * @img - bgImage
   */
  return {
    'background-image': `url('${img}')`,
  }
}
const getTitleClass = (
  level: HeadingLevel,
  size: HeadingSize,
  color: ColorPalette
): string => {
  /**
   * @level - titleLevel/subTitleLevel
   * @size - titleSize/subTitleSize
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
</script>

<template>
  <section
    class="bg-white overflow-hidden w-full"
    :class="generateClass('BGCOLOR', bgColor)"
  >
    <div class="grid lg:grid-cols-2">
      <div
        class="px-xs flex flex-col justify-center"
        :class="{ 'lg:order-2': imgPosition === 'left' }"
      >
        <div
          class="py-md lg:py-lg px-0"
          :class="[imgPosition === 'right' ? 'lg:pl-md' : 'lg:pr-md']"
        >
          <div class="text-center lg:text-left mb-xs">
            <!-- title -->
            <component
              :is="titleLevel"
              :class="getTitleClass(titleLevel, titleSize, titleColor)"
            >
              {{ title }}
            </component>
            <!-- sub title -->
            <component
              :is="subTitleLevel"
              v-if="displaySubTitle"
              :class="getTitleClass(subTitleLevel, subTitleSize, titleColor)"
            >
              {{ subTitle }}
            </component>
          </div>
          <div>
            <slot />
          </div>
        </div>
      </div>
      <div
        class="relative bg-no-repeat bg-cover bg-top min-h-[256px] md:min-h-[400px] lg:min-h-[512px] xl:min-h-[80vh]"
        :class="{ 'lg:order-1': imgPosition === 'left' }"
        :style="getBgImage(bgImage)"
      >
        <svg
          v-if="imgPosition === 'right'"
          class="hidden lg:block absolute left-0 inset-y-0 h-full w-3xl"
          :class="generateClass('SVGFILL', bgColor)"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon points="0,0 100,0 0,100" />
        </svg>
        <svg
          v-else
          class="hidden lg:block absolute right-0 inset-y-0 h-full w-3xl"
          :class="generateClass('SVGFILL', bgColor)"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon points="100,0 100,100 0,100" />
        </svg>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
