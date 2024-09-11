<script setup lang="ts">
import type {
  ColorPalette,
  DirectionX,
  HeadingLevel,
  HeadingSize,
  OpacityRange,
} from '@bobbykim/manguito-theme'
import generateClass from '@bobbykim/manguito-theme'
import { computed } from 'vue'

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
    displayHighlight?: boolean
    highlightColor?: ColorPalette
    imageSource: string
    bgColor?: ColorPalette
    mobileImageBlur?: boolean
    imgPosition?: DirectionX
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
    displayHighlight: false,
    highlightColor: 'warning',
    imgPosition: 'right',
    bgColor: 'white',
    mobileImageBlur: false,
    displayFilter: true,
    filterOpacity: 30,
  }
)

const getBgImage = (img: string) => {
  /**
   * @img - imageSource
   */
  return {
    'background-image': `url('${img}')`,
  }
}
const filterClass = computed<string>(() => {
  /**
   * @summary a computed ref to handle filter color(=bgColor) and opacity of filter
   * @param {ColorPalette} bgColor - background color of component
   * @param {OpacityRange} filterOpacity - opacity of filter from 0 to 100 with step of 10
   */
  const { bgColor, filterOpacity } = props
  const classArray: string[] = [
    generateClass('BGCOLOR', bgColor),
    generateClass('OPACITY', filterOpacity),
  ]
  return classArray.join(' ')
})
const getTitleClass = (
  level: HeadingLevel,
  size: HeadingSize,
  color: ColorPalette
): string => {
  /**
   * @summary a function to set heading class for title/subtitle
   * @param {HeadingLevel} level - titleLevel/subTitleLevel
   * @param {HeadingSize} size - titleSize/subTitleSize
   * @param {ColorPalette} color - titleColor/subTitleColor
   */

  const titleClass: Record<HeadingLevel, string> = {
    h1: generateClass('H1', size),
    h2: generateClass('H2', size),
    h3: generateClass('H3', size),
    h4: generateClass('H4', size),
  }

  const classArray = [titleClass[level], generateClass('TEXTCOLOR', color)]

  return classArray.join(' ')
}
</script>

<template>
  <section
    class="overflow-hidden w-full"
    :class="generateClass('BGCOLOR', bgColor)"
  >
    <div class="grid lg:grid-cols-2">
      <div
        class="relative px-xs md:px-md xl:px-lg xl:pl-[18%] flex flex-col justify-end lg:justify-center min-h-[60vh] md:min-h-[420px]"
        :class="{ 'lg:order-2': imgPosition === 'left' }"
      >
        <!-- display on mobile -->
        <div
          class="lg:hidden absolute inset-0 bg-no-repeat bg-cover bg-top"
          :style="getBgImage(imageSource)"
          :class="{ 'blur-sm': mobileImageBlur }"
        >
          <div
            v-if="displayFilter"
            class="absolute inset-0"
            :class="filterClass"
          ></div>
        </div>
        <div
          class="relative py-md lg:py-xl px-0"
          :class="[imgPosition === 'right' ? 'lg:pl-md' : 'lg:pr-md']"
        >
          <div
            class="relative mb-xs md:mb-sm lg:mb-md ml-xs md:ml-0"
            :class="{ 'pl-xs': displayHighlight }"
          >
            <!-- highlight -->
            <div
              v-if="displayHighlight"
              class="absolute w-md bg-opacity-60 left-0 h-full"
              :class="generateClass('BGCOLOR', highlightColor)"
            ></div>
            <!-- title block -->
            <div class="relative">
              <!-- title -->
              <component
                :is="titleLevel"
                class="pb-xs md:pb-sm"
                :class="getTitleClass(titleLevel, titleSize, titleColor)"
              >
                <span v-html="title"></span>
              </component>
              <!-- sub title -->
              <component
                :is="subTitleLevel"
                v-if="displaySubTitle"
                class="pb-2xs"
                :class="
                  getTitleClass(subTitleLevel, subTitleSize, subTitleColor)
                "
              >
                <span v-html="subTitle"></span>
              </component>
            </div>
          </div>
          <div>
            <slot />
          </div>
        </div>
      </div>
      <div
        class="hidden lg:block relative bg-no-repeat bg-cover bg-top lg:min-h-[512px] xl:min-h-[80vh]"
        :class="{ 'lg:order-1': imgPosition === 'left' }"
        :style="getBgImage(imageSource)"
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
