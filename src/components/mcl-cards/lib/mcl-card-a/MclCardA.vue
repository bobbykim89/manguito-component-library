<script setup lang="ts">
import type {
  BodyText,
  ColorPalette,
  CtaTarget,
  HeadingLevel,
  HeadingSize,
  OpacityRange,
} from '@bobbykim/manguito-theme'
import { generateClass } from '@bobbykim/manguito-theme'
import { getGlassmorphismClass } from '@bobbykim/manguito-theme/util'
import { computed, useId } from 'vue'
import {
  cardFocusRingClass,
  slotPassThroughClass,
  stretchedTargetClass,
} from '../common/a11y'
import type { CardClickEvent } from '../common/index.types'

const props = withDefaults(
  defineProps<{
    title: string
    titleLevel?: HeadingLevel
    titleSize?: HeadingSize
    titleColor?: ColorPalette
    borderColor?: ColorPalette
    bgColor?: ColorPalette
    fullWidth?: boolean
    glass?: boolean
    glassBlur?: BodyText
    glassOpacity?: OpacityRange
    showImage?: boolean
    imageSource?: string
    /** Pass alt text for meaningful images; leave empty only for decorative ones. */
    imageAlt?: string
    showCta?: boolean
    ctaAsLink?: boolean
    ctaText?: string
    ctaColor?: ColorPalette
    ctaLink?: string
    ctaTarget?: CtaTarget
    showLabel?: boolean
    labelText?: string
    labelTextColor?: ColorPalette
    labelColor?: ColorPalette
    enlargeOnHover?: boolean
    showHighlight?: boolean
    highlightColor?: ColorPalette
    rounded?: boolean
    showShadow?: boolean
  }>(),
  {
    titleLevel: 'h3',
    titleSize: 'md',
    titleColor: 'dark-3',
    borderColor: 'light-3',
    bgColor: 'light-1',
    fullWidth: false,
    glass: false,
    glassBlur: 'sm',
    glassOpacity: 20,
    showImage: true,
    imageAlt: '',
    showCta: true,
    ctaAsLink: false,
    ctaColor: 'primary',
    ctaLink: '#',
    ctaTarget: '_self',
    ctaText: 'cta text',
    showLabel: true,
    labelText: 'Lorem ipsum',
    labelTextColor: 'light-1',
    labelColor: 'dark-4',
    showHighlight: true,
    highlightColor: 'primary',
    enlargeOnHover: false,
    rounded: true,
    showShadow: true,
  },
)

defineSlots<{
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
   * @param {boolean} showShadow
   * @param {boolean} glass
   * @param {BodyText} glassBlur
   * @param {glassOpacity} OpacityRange
   */
  const {
    borderColor,
    bgColor,
    rounded,
    enlargeOnHover,
    showShadow,
    glass,
    glassBlur,
    glassOpacity,
    fullWidth,
  } = props

  return [
    generateClass.borderColorVariant({ color: borderColor }),
    generateClass.bgColorVariant({ color: bgColor }),
    !fullWidth && 'max-w-[450px] sm:max-w-[350px]',
    rounded ? 'rounded-lg' : 'rounded-sm',
    enlargeOnHover &&
      'hover:scale-105 transition ease-in duration-300 motion-reduce:transition-none motion-reduce:hover:scale-100',
    showShadow && 'drop-shadow-md',
    glass && getGlassmorphismClass(bgColor, glassBlur, glassOpacity),
  ]
    .filter(Boolean)
    .join(' ')
})
const titleClass = computed<string>(() => {
  /**
   * @param {HeadingSize} titleSize
   * @param {ColorPalette} titleColor
   * @param {boolean} showHighlight
   */
  const { titleSize, titleColor, showHighlight } = props

  return [
    generateClass.h3Variant({ size: titleSize }),
    generateClass.textColorVariant({ color: titleColor }),
    showHighlight ? 'mb-2xs' : 'mb-xs',
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
    generateClass.textColorVariant({ color: labelTextColor }),
    generateClass.bgColorVariant({ color: labelColor }),
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
    generateClass.btnColorVariant({ color: ctaColor }),
    lightColor.includes(ctaColor) ? 'text-black' : 'text-white',
    rounded && 'btn-round',
  ]
    .filter(Boolean)
    .join(' ')
})
const titleId = useId()
const opensNewTab = computed<boolean>(
  () => props.ctaAsLink && props.ctaTarget === '_blank',
)
const handleButtonClick = (e: Event): void => {
  const { title, ctaLink, ctaTarget } = props
  const cardEvent: CardClickEvent = {
    title,
    url: ctaLink,
    target: ctaTarget ? ctaTarget : '_self',
  }
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
    class="xs:w-auto relative flex w-full flex-shrink-0 flex-grow flex-col overflow-hidden border"
    :class="[bodyClass, cardFocusRingClass]"
  >
    <button
      type="button"
      data-mcl-card-target
      class="absolute inset-0"
      :class="stretchedTargetClass"
      :aria-labelledby="titleId"
      @click="handleCardClick"
    ></button>
    <div class="pointer-events-none relative" v-if="showImage">
      <img
        :src="imageSource"
        :alt="imageAlt"
        class="aspect-video min-w-full object-cover object-top"
      />
      <span
        v-if="showLabel"
        class="absolute bottom-0 ml-xs inline-block translate-y-[50%] px-2xs py-3xs text-xs font-bold"
        :class="labelClass"
        v-html="labelText"
      ></span>
    </div>
    <div class="flex h-full flex-col justify-between">
      <div class="flex-1 px-xs pt-sm">
        <span
          v-if="!showImage && showLabel"
          class="mb-2xs inline-block px-2xs py-3xs text-xs font-bold"
          :class="labelClass"
          v-html="labelText"
        ></span>
        <component
          :is="titleLevel"
          :id="titleId"
          :class="titleClass"
          v-html="title"
        ></component>
        <div
          v-if="showHighlight"
          class="mb-xs h-3xs w-md"
          :class="generateClass.bgColorVariant({ color: highlightColor })"
        ></div>
        <div class="mb-sm" :class="slotPassThroughClass">
          <slot></slot>
        </div>
      </div>
      <div class="border-0 pb-sm" :class="slotPassThroughClass" v-if="showCta">
        <div class="w-full px-xs">
          <component
            :is="ctaAsLink ? 'a' : 'button'"
            :type="ctaAsLink ? undefined : 'button'"
            :href="ctaAsLink ? ctaLink : undefined"
            :target="ctaAsLink ? ctaTarget : undefined"
            class="btn btn-full"
            :class="ctaClass"
            :aria-describedby="titleId"
            @click="handleButtonClick($event)"
            >{{ ctaText
            }}<span v-if="opensNewTab" class="sr-only">
              (opens in a new tab)</span
            ></component
          >
        </div>
      </div>
    </div>
  </div>
</template>
