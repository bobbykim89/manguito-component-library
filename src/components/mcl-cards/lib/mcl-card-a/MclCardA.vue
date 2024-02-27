<script setup lang="ts">
import type {
  ColorPalette,
  CrossOrigin,
  CtaTarget,
  HeadingSize,
} from '@bobbykim/manguito-theme'
import generateClass from '@bobbykim/manguito-theme'
import type { CardClickEvent } from '../common/index.types'

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
    imageCors?: CrossOrigin
    displayCta?: boolean
    ctaAsLink?: boolean
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
    imageCors: 'anonymous',
    displayCta: true,
    ctaAsLink: true,
    ctaColor: 'primary',
    ctaLink: '#',
    ctaTarget: '_self',
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

const emit = defineEmits(['card-click', 'card-btn-click'])

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
    classArray.push('rounded-md')
  } else {
    classArray.push('rounded-sm')
  }
  if (enlarge) {
    classArray.push('hover:scale-105 transition ease-in duration-300')
  }
  if (shadow) {
    classArray.push('drop-shadow-md')
  }

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
const getCtaClass = (color: ColorPalette, round: boolean): string => {
  /**
   * @color - ctaColor
   * @round - rounded
   */
  const classArray: string[] = [generateClass('BTNCOLOR', color)]

  const lightColor: string[] = ['light-1', 'light-2', 'light-3', 'light-4']

  let textColor = lightColor.includes(color) ? 'text-black' : 'text-white'

  classArray.push(textColor)

  if (round) {
    classArray.push('btn-round')
  }

  return classArray.join(' ')
}
const handleButtonClick = (
  e: Event,
  title: string,
  link: string,
  target: CtaTarget = '_self',
  btnLink: boolean
): void => {
  /**
   * @title - title
   * @link - ctaLink
   * @target - ctaTarget
   * @btnLink - ctaAsLink
   */
  const cardEvent: CardClickEvent = {
    event: e,
    title,
    url: link,
    target: target ? target : '_self',
  }
  !btnLink && e.preventDefault()
  emit('card-btn-click', cardEvent)
}
const handleCardClick = (e: Event): void => {
  const { title, ctaLink, ctaTarget } = props
  const cardEvent: CardClickEvent = {
    event: e,
    title,
    url: ctaLink,
    target: ctaTarget ? ctaTarget : '_self',
  }
  emit('card-click', cardEvent)
}
</script>

<template>
  <div
    class="overflow-hidden border max-w-[450px] sm:max-w-[350px] w-full xs:w-auto flex-grow flex-shrink-0 cursor-pointer"
    :class="
      getBorderClass(
        borderColor,
        bgColor,
        rounded,
        enlargeOnHover,
        displayShadow
      )
    "
    @click="handleCardClick"
  >
    <div class="relative" v-if="displayImage">
      <img
        :src="imageSource"
        :alt="imageAlt"
        :crossorigin="imageCors"
        class="object-cover object-top h-[220px] min-w-full"
      />
      <span
        v-if="displayLabel"
        class="py-3xs px-2xs ml-xs inline-block font-bold text-xs absolute bottom-0 translate-y-[50%]"
        :class="getLabelClass(labelTextColor, labelColor)"
        v-html="labelText"
      ></span>
    </div>
    <div class="content-height flex flex-col justify-between">
      <div class="min-h-[100px] p-0">
        <div class="px-xs pt-sm">
          <span
            v-if="!displayImage && displayLabel"
            class="py-3xs px-2xs mb-2xs inline-block font-bold text-xs"
            :class="getLabelClass(labelTextColor, labelColor)"
            v-html="labelText"
          ></span>
          <h3
            :class="getTitleClass(titleSize, titleColor, displayHighlight)"
            v-html="title"
          ></h3>
          <div
            v-if="displayHighlight"
            class="mb-xs h-3xs w-md"
            :class="generateClass('BGCOLOR', highlightColor)"
          ></div>
          <div class="mb-sm cursor-default" @click.stop>
            <slot></slot>
          </div>
        </div>
      </div>
      <div class="pb-sm border-0 cursor-default" v-if="displayCta" @click.stop>
        <div class="w-full px-xs">
          <a
            :href="ctaLink"
            :target="ctaTarget"
            class="btn btn-full"
            :class="getCtaClass(ctaColor, rounded)"
            @click="
              handleButtonClick($event, title, ctaLink, ctaTarget, ctaAsLink)
            "
            >{{ ctaText }}</a
          >
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
