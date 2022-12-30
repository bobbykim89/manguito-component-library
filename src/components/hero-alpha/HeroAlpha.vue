<script setup lang="ts">
import { withDefaults } from 'vue'
import generateClass from '@bobbykim/manguito-theme'
import type {
  HeadingLevel,
  HeadingSize,
  ColorPalette,
  Directions,
  OpacityRange,
} from '@bobbykim/manguito-theme/theme/theme.types'

const props = withDefaults(
  defineProps<{
    title: string
    titleLevel?: HeadingLevel
    titleSize?: HeadingSize
    titleColor?: ColorPalette
    displaySubTitle?: boolean
    subTitle?: string
    subTitleLevel?: HeadingLevel
    subTitleSize?: HeadingSize
    subTitleColor?: ColorPalette
    displaySubTitleHighlight?: boolean
    subTitleHighlightColor?: ColorPalette
    bgImage: string
    bgColor?: ColorPalette
    imgPosition?: Directions
    displayFilter?: boolean
    filterOpacity?: OpacityRange
  }>(),
  {
    titleLevel: 'h1',
    titleSize: 'md',
    titleColor: 'dark-3',
    displaySubTitle: false,
    subTitleLevel: 'h3',
    subTitleSize: 'md',
    subTitleColor: 'dark-3',
    displaySubTitleHighlight: false,
    subTitleHighlightColor: 'primary',
    imgPosition: 'right',
    bgColor: 'white',
    displayFilter: true,
    filterOpacity: 30,
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
   * @color - titleColor/subTitleColor
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
   * @color - subTitleHighlightColor
   * @display - displaySubTitleHighlight
   */

  const classArray = [
    generateClass('BGCOLOR', color),
    'shadow-lg',
    'px-2xs',
    'py-3xs',
  ]

  return display ? classArray.join(' ') : ''
}
</script>

<template>
  <section
    class="overflow-hidden w-full"
    :class="generateClass('BGCOLOR', bgColor)"
  >
    <div class="grid lg:grid-cols-2">
      <div
        class="relative px-xs md:px-md xl:px-lg flex flex-col justify-center min-h-[256px] md:min-h-[420px]"
        :class="{ 'lg:order-2': imgPosition === 'left' }"
      >
        <div
          class="lg:hidden absolute inset-0 bg-no-repeat bg-cover bg-top"
          :style="getBgImage(bgImage)"
        >
          <div
            v-if="displayFilter"
            class="absolute inset-0 bg-white"
            :class="generateClass('OPACITY', filterOpacity)"
          ></div>
        </div>
        <div
          class="relative py-lg px-0"
          :class="[imgPosition === 'right' ? 'lg:pl-md' : 'lg:pr-md']"
        >
          <div class="text-center lg:text-left mb-xs">
            <!-- title -->
            <component
              :is="titleLevel"
              :class="[
                displaySubTitleHighlight ? 'mb-3xs' : '',
                getTitleClass(titleLevel, titleSize, titleColor),
              ]"
            >
              <span v-html="title"></span>
            </component>
            <!-- sub title -->
            <component
              :is="subTitleLevel"
              v-if="displaySubTitle"
              :class="getTitleClass(subTitleLevel, subTitleSize, subTitleColor)"
            >
              <span
                class="box-decoration-clone"
                :class="
                  getTitleHighlightClass(
                    subTitleHighlightColor,
                    displaySubTitleHighlight
                  )
                "
                v-html="subTitle"
              ></span>
            </component>
          </div>
          <div>
            <slot />
          </div>
        </div>
      </div>
      <div
        class="hidden lg:block relative bg-no-repeat bg-cover bg-top lg:min-h-[512px] xl:min-h-[80vh]"
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
