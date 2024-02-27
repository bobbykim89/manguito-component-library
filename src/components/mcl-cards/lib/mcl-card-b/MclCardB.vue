<script setup lang="ts">
import type {
  ColorPalette,
  CrossOrigin,
  CtaTarget,
  HeadingSize,
} from '@bobbykim/manguito-theme'
import generateClass from '@bobbykim/manguito-theme'
import type { CardClickEvent } from '../common/index.types'

withDefaults(
  defineProps<{
    title: string
    titleSize?: HeadingSize
    titleColor?: ColorPalette
    titleBlockColor?: ColorPalette
    borderColor?: ColorPalette
    imageSource?: string
    imageAlt?: string
    imageCors?: CrossOrigin
    displayGrayScale?: boolean
    ctaAsLink?: boolean
    ctaLink?: string
    ctaTarget?: CtaTarget
    rounded?: boolean
  }>(),
  {
    titleSize: 'md',
    titleColor: 'light-1',
    titleBlockColor: 'dark-4',
    borderColor: 'light-3',
    displayGrayScale: true,
    imageCors: 'anonymous',
    ctaAsLink: false,
    ctaLink: '#',
    ctaTarget: '_self',
    rounded: false,
  }
)

const emit = defineEmits(['card-click'])

const getBorderClass = (bColor: ColorPalette, rounded: boolean): string => {
  /**
   * @bColor - borderColor
   * @rounded - rounded
   */
  const classArray = [generateClass('BORDER', bColor)]
  if (rounded) {
    classArray.push('rounded-md')
  } else {
    classArray.push('rounded-sm')
  }

  return classArray.join(' ')
}

const handleHoverEffect = (dGray: boolean): string => {
  /**
   * @dgray - displayGrayScale
   */
  if (dGray) {
    return '[@media(hover:hover)]:grayscale peer-hover:grayscale-0'
  }
  return ''
}

const handleTitleClass = (
  tSize: HeadingSize,
  tColor: ColorPalette,
  tBgColor: ColorPalette
): string => {
  /**
   * @tSize - titleSize
   * @tColor - titleColor
   * @tBgColor - titleBlockColor
   */

  const classArray = [
    generateClass('H3', tSize),
    generateClass('TEXTCOLOR', tColor),
    generateClass('BGCOLOR', tBgColor),
  ]

  return classArray.join(' ')
}

const handleCardClick = (
  e: Event,
  title: string,
  link: string,
  target: CtaTarget = '_self',
  ctaLink: boolean
): void => {
  /**
   * @e - Event
   * @title - title
   * @link - ctaLink
   * @target - ctaTarget
   * @ctaLink - ctaAsLink
   */
  !ctaLink && e.preventDefault()
  const cardEvent: CardClickEvent = {
    event: e,
    title,
    url: link,
    target: target ? target : '_self',
  }
  console.log(cardEvent)
  emit('card-click', cardEvent)
}
</script>

<template>
  <div
    class="relative max-w-[450px] sm:max-w-[350px] w-full xs:w-auto flex-grow flex-shrink-0 cursor-pointer overflow-hidden border border-light-3"
    :class="getBorderClass(borderColor, rounded)"
  >
    <a
      :href="ctaLink"
      :target="ctaTarget"
      @click="handleCardClick($event, title, ctaLink, ctaTarget, ctaAsLink)"
    >
      <div
        class="absolute z-[15] flex flex-col justify-end items-start inset-0 p-xs [@media(hover:hover)]:opacity-0 hover:opacity-100 peer transition-opacity duration-200"
      >
        <h3
          v-html="title"
          class="inline-block px-xs py-2xs mb-2xs pointer-events-none tracking-wide"
          :class="handleTitleClass(titleSize, titleColor, titleBlockColor)"
        ></h3>
        <slot></slot>
      </div>
      <img
        :src="imageSource"
        :alt="imageAlt"
        :crossorigin="imageCors"
        class="relative z-10 object-cover aspect-[3/4] transition-all duration-200"
        :class="handleHoverEffect(displayGrayScale)"
      />
    </a>
  </div>
</template>

<style lang="scss" scoped></style>
