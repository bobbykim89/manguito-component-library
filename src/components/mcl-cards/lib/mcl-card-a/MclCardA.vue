<script setup lang="ts">
import type {
  BodyText,
  ColorPalette,
  CtaTarget,
  HeadingSize,
  OpacityRange,
} from '@bobbykim/manguito-theme'
import generateClass from '@bobbykim/manguito-theme'
import { getGlassmorphismClass } from '@bobbykim/manguito-theme/util'
import { computed } from 'vue'
import type { CardClickEvent } from '../common/index.types'

const props = withDefaults(
  defineProps<{
    title: string
    titleSize?: HeadingSize
    titleColor?: ColorPalette
    borderColor?: ColorPalette
    bgColor?: ColorPalette
    fullWidth?: boolean
    glass?: boolean
    glassBlur?: BodyText
    glassOpacity?: OpacityRange
    displayImage?: boolean
    imageSource?: string
    imageAlt?: string
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
    fullWidth: false,
    glass: false,
    glassBlur: 'sm',
    glassOpacity: 20,
    displayImage: true,
    displayCta: true,
    ctaAsLink: false,
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
  },
)

const slots = defineSlots<{
  default: any
}>()
const emit = defineEmits<{
  (e: 'card-click', event: Event, item: CardClickEvent): void
  (e: 'card-btn-click', event: Event, item: CardClickEvent): void
}>()

const bodyClass = computed<string>(() => {
  /**
   * @param {ColorPalette} borderColor
   * @param {ColorPalette} bgColor
   * @param {boolean} rounded
   * @param {boolean} enlargeOnHover
   * @param {boolean} displayShadow
   * @param {boolean} glass
   * @param {BodyText} glassBlur
   * @param {glassOpacity} OpacityRange
   */
  const {
    borderColor,
    bgColor,
    rounded,
    enlargeOnHover,
    displayShadow,
    glass,
    glassBlur,
    glassOpacity,
    fullWidth,
  } = props

  return [
    generateClass('BORDER', borderColor),
    generateClass('BGCOLOR', bgColor),
    !fullWidth && 'max-w-[450px] sm:max-w-[350px]',
    rounded ? 'rounded-lg' : 'rounded-sm',
    enlargeOnHover && 'hover:scale-105 transition ease-in duration-300',
    displayShadow && 'drop-shadow-md',
    glass && getGlassmorphismClass(bgColor, glassBlur, glassOpacity),
  ]
    .filter(Boolean)
    .join(' ')
})
const titleClass = computed<string>(() => {
  /**
   * @param {HeadingSize} titleSize
   * @param {ColorPalette} titleColor
   * @param {boolean} displayHighlight
   */
  const { titleSize, titleColor, displayHighlight } = props

  return [
    generateClass('H3', titleSize),
    generateClass('TEXTCOLOR', titleColor),
    displayHighlight ? 'mb-2xs' : 'mb-xs',
  ]
    .filter(Boolean)
    .join(' ')
})
const labelClass = computed<string>(() => {
  /**
   * @param {ColorPalette} labelTextColor
   * @param {ColorPalette} labelColor
   */
  const { labelTextColor, labelColor } = props

  return [
    generateClass('TEXTCOLOR', labelTextColor),
    generateClass('BGCOLOR', labelColor),
  ]
    .filter(Boolean)
    .join(' ')
})
const ctaClass = computed<string>(() => {
  /**
   * @param {ColorPalette} ctaColor
   * @param {boolean} rounded
   */
  const { ctaColor, rounded } = props
  const lightColor: string[] = ['light-1', 'light-2', 'light-3', 'light-4']

  return [
    generateClass('BTNCOLOR', ctaColor),
    lightColor.includes(ctaColor) ? 'text-black' : 'text-white',
    rounded && 'btn-round',
  ]
    .filter(Boolean)
    .join(' ')
})
const handleButtonClick = (e: Event): void => {
  const { title, ctaLink, ctaTarget, ctaAsLink } = props
  const cardEvent: CardClickEvent = {
    title,
    url: ctaLink,
    target: ctaTarget ? ctaTarget : '_self',
  }
  !ctaAsLink && e.preventDefault()
  emit('card-btn-click', e, cardEvent)
}
const handleCardClick = (e: Event): void => {
  const { title, ctaLink, ctaTarget } = props
  const cardEvent: CardClickEvent = {
    title,
    url: ctaLink,
    target: ctaTarget ? ctaTarget : '_self',
  }
  emit('card-click', e, cardEvent)
}
</script>

<template>
  <div
    class="xs:w-auto flex w-full flex-shrink-0 flex-grow cursor-pointer flex-col overflow-hidden border"
    :class="bodyClass"
    @click="handleCardClick"
  >
    <div class="relative" v-if="displayImage">
      <img
        :src="imageSource"
        :alt="imageAlt"
        class="aspect-video min-w-full object-cover object-top"
      />
      <span
        v-if="displayLabel"
        class="py-3xs px-2xs ml-xs absolute bottom-0 inline-block translate-y-[50%] text-xs font-bold"
        :class="labelClass"
        v-html="labelText"
      ></span>
    </div>
    <div class="flex h-full flex-col justify-between">
      <div class="px-xs pt-sm flex-1">
        <span
          v-if="!displayImage && displayLabel"
          class="py-3xs px-2xs mb-2xs inline-block text-xs font-bold"
          :class="labelClass"
          v-html="labelText"
        ></span>
        <h3 :class="titleClass" v-html="title"></h3>
        <div
          v-if="displayHighlight"
          class="mb-xs h-3xs w-md"
          :class="generateClass('BGCOLOR', highlightColor)"
        ></div>
        <div class="mb-sm cursor-default" @click.stop>
          <slot></slot>
        </div>
      </div>
      <div class="pb-sm cursor-default border-0" v-if="displayCta" @click.stop>
        <div class="px-xs w-full">
          <a
            :href="ctaLink"
            :target="ctaTarget"
            class="btn btn-full"
            :class="ctaClass"
            @click="handleButtonClick($event)"
            >{{ ctaText }}</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
