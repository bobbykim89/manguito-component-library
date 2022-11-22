<script setup lang="ts">
import { withDefaults } from 'vue'
import generateClass from '@mcl/manguito-theme'
import BtnAlpha from '@mcl/btn-alpha'
import type {
  ColorPalette,
  HeadingSize,
  CtaTarget,
} from '@mcl/manguito-theme/theme/theme.types'

const props = withDefaults(
  defineProps<{
    title: string
    titleSize?: HeadingSize
    titleColor?: ColorPalette
    borderColor?: ColorPalette
    bgColor?: ColorPalette
    displayImage?: boolean
    imageSource?: string
    imageAlt?: string
    displayCta?: boolean
    ctaText?: string
    ctaColor?: ColorPalette
    ctaLink?: string
    ctaTarget?: CtaTarget
    displayLabel?: boolean
    labelText?: string
    labelTextColor?: ColorPalette
    labelColor?: ColorPalette
    enlargeOnHover?: boolean
    displayHighlight?: boolean
    highlightColor?: ColorPalette
    rounded?: boolean
    displayShadow?: boolean
  }>(),
  {
    titleSize: 'md',
    titleColor: 'dark-3',
    borderColor: 'light-3',
    bgColor: 'light-1',
    displayImage: true,
    displayCta: true,
    ctaColor: 'primary',
    ctaTarget: '_blank',
    ctaText: 'cta text',
    displayLabel: true,
    labelText: 'Lorem ipsum',
    labelTextColor: 'light-1',
    labelColor: 'dark-4',
    displayHighlight: true,
    highlightColor: 'primary',
    enlargeOnHover: false,
    rounded: true,
    displayShadow: true,
  }
)

const getBorderClass = (
  border: ColorPalette,
  bg: ColorPalette,
  rounded: boolean,
  enlarge: boolean,
  shadow: boolean
): string => {
  /**
   * @border - borderColor
   * @bg - bgColor
   * @rounded - rounded
   * @enlarge - enlargeOnHover
   * @shadow - displayShadow
   */

  const classArray = [
    generateClass('BORDER', border),
    generateClass('BGCOLOR', bg),
  ]

  if (rounded) {
    classArray.push('rounded')
  }
  if (enlarge) {
    classArray.push('hover:scale-105 transition ease-in duration-300')
  }
  if (shadow) {
    classArray.push('drop-shadow-md')
  }

  console.log(classArray.join(' '))

  return classArray.join(' ')
}
const getTitleClass = (
  size: HeadingSize,
  color: ColorPalette,
  hl: boolean
): string => {
  /**
   * @size - titleSize
   * @color - titleColor
   * @hl - displayHighlight
   */

  const classArray = [
    generateClass('H3', size),
    generateClass('TEXTCOLOR', color),
  ]

  if (hl) {
    classArray.push('mb-2xs')
  } else {
    classArray.push('mb-xs')
  }

  return classArray.join(' ')
}
const getLabelClass = (tColor: ColorPalette, bColor: ColorPalette): string => {
  /**
   * @tColor - labelTextColor
   * @bColor - labelColor
   */
  const classArray = [
    generateClass('TEXTCOLOR', tColor),
    generateClass('BGCOLOR', bColor),
  ]
  return classArray.join(' ')
}
</script>

<template>
  <div
    class="overflow-hidden border max-w-[350px]"
    :class="
      getBorderClass(
        borderColor,
        bgColor,
        rounded,
        enlargeOnHover,
        displayShadow
      )
    "
  >
    <div class="relative" v-if="displayImage">
      <img
        :src="imageSource"
        :alt="imageAlt"
        class="object-cover object-top h-[220px] min-w-full"
      />
      <span
        class="py-3xs px-2xs ml-xs inline-block font-bold text-xs absolute bottom-0 translate-y-[50%]"
        :class="getLabelClass(labelTextColor, labelColor)"
        v-html="labelText"
      ></span>
    </div>
    <div class="content-height flex flex-col justify-between">
      <div class="min-h-[100px] p-0">
        <div class="px-xs pt-sm">
          <h3
            :class="getTitleClass(titleSize, titleColor, displayHighlight)"
            v-html="title"
          ></h3>
          <div
            v-if="displayHighlight"
            class="mb-xs h-3xs w-md"
            :class="generateClass('BGCOLOR', highlightColor)"
          ></div>
          <div class="mb-sm">
            <slot></slot>
          </div>
        </div>
      </div>
      <div class="pb-sm border-0" v-if="displayCta">
        <div class="w-full px-xs">
          <a :href="ctaLink" :target="ctaTarget" class="cursor-pointer">
            <btn-alpha :color="ctaColor" :is-block="true" :rounded="rounded">{{
              ctaText
            }}</btn-alpha>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content-height {
  height: calc(100% - 200px);
}
</style>
