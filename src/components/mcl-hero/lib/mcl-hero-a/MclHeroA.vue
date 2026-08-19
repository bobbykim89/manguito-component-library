<script setup lang="ts">
import type {
  ColorPalette,
  DirectionX,
  HeadingLevel,
  HeadingSize,
  OpacityRange,
} from '@bobbykim/manguito-theme'
import { generateClass } from '@bobbykim/manguito-theme'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    title: string
    titleLevel?: HeadingLevel
    titleSize?: HeadingSize
    titleColor?: ColorPalette
    showSubTitle?: boolean
    subTitle?: string
    subTitleLevel?: HeadingLevel
    subTitleSize?: HeadingSize
    subTitleColor?: ColorPalette
    showHighlight?: boolean
    highlightColor?: ColorPalette
    imageSource: string
    bgColor?: ColorPalette
    mobileImageBlur?: boolean
    imgPosition?: DirectionX
    showFilter?: boolean
    filterOpacity?: OpacityRange
  }>(),
  {
    titleLevel: 'h1',
    titleSize: 'md',
    titleColor: 'dark-3',
    showSubTitle: false,
    subTitleLevel: 'h3',
    subTitleSize: 'md',
    subTitleColor: 'dark-3',
    showHighlight: false,
    highlightColor: 'warning',
    imgPosition: 'right',
    bgColor: 'white',
    mobileImageBlur: false,
    showFilter: true,
    filterOpacity: 30,
  },
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
    generateClass.bgColorVariant({ color: bgColor }),
    generateClass.opacityVariant({ opacity: filterOpacity }),
  ]
  return classArray.join(' ')
})
const getTitleClass = (
  level: HeadingLevel,
  size: HeadingSize,
  color: ColorPalette,
): string => {
  /**
   * @summary a function to set heading class for title/subtitle
   * @param {HeadingLevel} level - titleLevel/subTitleLevel
   * @param {HeadingSize} size - titleSize/subTitleSize
   * @param {ColorPalette} color - titleColor/subTitleColor
   */

  const titleClass: Record<HeadingLevel, string> = {
    h1: generateClass.h1Variant({ size: size }),
    h2: generateClass.h2Variant({ size: size }),
    h3: generateClass.h3Variant({ size: size }),
    h4: generateClass.h4Variant({ size: size }),
  }

  const classArray = [
    titleClass[level],
    generateClass.textColorVariant({ color: color }),
  ]

  return classArray.join(' ')
}
</script>

<template>
  <section
    class="w-full overflow-hidden"
    :class="generateClass.bgColorVariant({ color: bgColor })"
  >
    <div class="grid lg:grid-cols-2">
      <div
        class="relative flex min-h-[60vh] flex-col justify-end px-xs md:min-h-105 md:px-md lg:justify-center xl:px-lg xl:pl-[18%]"
        :class="{ 'lg:order-2': imgPosition === 'left' }"
      >
        <!-- display on mobile -->
        <div
          class="absolute inset-0 bg-cover bg-top bg-no-repeat lg:hidden"
          :style="getBgImage(imageSource)"
          :class="{ 'blur-sm': mobileImageBlur }"
        >
          <div
            v-if="showFilter"
            class="absolute inset-0"
            :class="filterClass"
          ></div>
        </div>
        <div
          class="relative px-0 py-md lg:py-xl"
          :class="[imgPosition === 'right' ? 'lg:pl-md' : 'lg:pr-md']"
        >
          <div
            class="relative mb-xs ml-xs md:mb-sm md:ml-0 lg:mb-md"
            :class="{ 'pl-xs': showHighlight }"
          >
            <!-- highlight -->
            <div
              v-if="showHighlight"
              class="absolute left-0 h-full w-md bg-opacity-60"
              :class="generateClass.bgColorVariant({ color: highlightColor })"
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
                v-if="showSubTitle"
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
        class="relative hidden bg-cover bg-top bg-no-repeat lg:block lg:min-h-128 xl:min-h-[80vh]"
        :class="{ 'lg:order-1': imgPosition === 'left' }"
        :style="getBgImage(imageSource)"
      >
        <svg
          v-if="imgPosition === 'right'"
          class="absolute inset-y-0 left-0 hidden h-full w-3xl lg:block"
          :class="generateClass.svgFillColorVariant({ color: bgColor })"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon points="0,0 100,0 0,100" />
        </svg>
        <svg
          v-else
          class="absolute inset-y-0 right-0 hidden h-full w-3xl lg:block"
          :class="generateClass.svgFillColorVariant({ color: bgColor })"
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
