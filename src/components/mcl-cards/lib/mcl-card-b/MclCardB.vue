<script setup lang="ts">
import type {
  ColorPalette,
  CtaTarget,
  HeadingLevel,
  HeadingSize,
} from '@bobbykim/manguito-theme'
import { generateClass } from '@bobbykim/manguito-theme'
import { computed } from 'vue'
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
    titleBlockColor?: ColorPalette
    borderColor?: ColorPalette
    imageSource?: string
    /** Pass alt text for meaningful images; leave empty only for decorative ones. */
    imageAlt?: string
    showGrayScale?: boolean
    ctaAsLink?: boolean
    ctaLink?: string
    ctaTarget?: CtaTarget
    rounded?: boolean
  }>(),
  {
    titleLevel: 'h3',
    titleSize: 'md',
    titleColor: 'light-1',
    titleBlockColor: 'dark-4',
    borderColor: 'light-3',
    imageAlt: '',
    showGrayScale: true,
    ctaAsLink: false,
    ctaLink: '#',
    ctaTarget: '_self',
    rounded: false,
  },
)

defineSlots<{
  default: any
}>()
const emit = defineEmits<{
  (e: 'card-click', event: Event, item: CardClickEvent): void
}>()
const borderClass = computed<string>(() => {
  /**
   * @param {ColorPalette} borderColor
   * @param {boolean} rounded
   */
  const { borderColor, rounded } = props
  const classArray: string[] = [
    generateClass.borderColorVariant({ color: borderColor }),
  ]
  classArray.push(rounded ? 'rounded-md' : 'rounded-sm')
  return classArray.join(' ')
})
const hoverEffect = computed<string>(() => {
  /**
   * @param {boolean} showGrayScale
   */
  const { showGrayScale } = props
  return showGrayScale
    ? '[@media(hover:hover)]:grayscale peer-hover:grayscale-0 peer-has-[:focus-visible]:grayscale-0'
    : ''
})
const titleClass = computed<string>(() => {
  /**
   * @param {HeadingSize} titleSize
   * @param {ColorPalette} titleColor
   * @param {ColorPalette} titleBlockColor
   */
  const { titleSize, titleColor, titleBlockColor } = props
  const classArray: string[] = [
    generateClass.h3Variant({ size: titleSize }),
    generateClass.textColorVariant({ color: titleColor }),
    generateClass.bgColorVariant({ color: titleBlockColor }),
  ]
  return classArray.join(' ')
})

const opensNewTab = computed<boolean>(
  () => props.ctaAsLink && props.ctaTarget === '_blank',
)

const handleCardClick = (e: Event): void => {
  /**
   * @param {Event} e
   */
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
    class="xs:w-auto relative w-full max-w-112.5 shrink-0 grow cursor-pointer overflow-hidden border sm:max-w-87.5"
    :class="[borderClass, cardFocusRingClass]"
  >
    <div
      class="peer absolute inset-0 z-15 flex flex-col items-start justify-end p-xs transition-opacity duration-200 hover:opacity-100 has-[:focus-visible]:opacity-100 [@media(hover:hover)]:opacity-0"
    >
      <component
        :is="titleLevel"
        class="mb-2xs inline-block px-xs py-2xs tracking-wide"
        :class="titleClass"
      >
        <component
          :is="ctaAsLink ? 'a' : 'button'"
          data-mcl-card-target
          :type="ctaAsLink ? undefined : 'button'"
          :href="ctaAsLink ? ctaLink : undefined"
          :target="ctaAsLink ? ctaTarget : undefined"
          :class="stretchedTargetClass"
          @click="handleCardClick($event)"
          ><span v-html="title"></span
          ><span v-if="opensNewTab" class="sr-only">
            (opens in a new tab)</span
          ></component
        >
      </component>
      <div class="flex flex-col items-start" :class="slotPassThroughClass">
        <slot></slot>
      </div>
    </div>
    <img
      :src="imageSource"
      :alt="imageAlt"
      class="relative z-10 aspect-3/4 h-full w-full object-cover object-center transition-all duration-200"
      :class="hoverEffect"
    />
  </div>
</template>
