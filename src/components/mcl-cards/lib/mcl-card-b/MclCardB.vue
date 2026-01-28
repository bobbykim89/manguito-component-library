<script setup lang="ts">
import type {
  ColorPalette,
  CtaTarget,
  HeadingSize,
} from '@bobbykim/manguito-theme'
import generateClass from '@bobbykim/manguito-theme'
import { computed } from 'vue'
import type { CardClickEvent } from '../common/index.types'

const props = withDefaults(
  defineProps<{
    title: string
    titleSize?: HeadingSize
    titleColor?: ColorPalette
    titleBlockColor?: ColorPalette
    borderColor?: ColorPalette
    imageSource?: string
    imageAlt?: string
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
    ctaAsLink: false,
    ctaLink: '#',
    ctaTarget: '_self',
    rounded: false,
  },
)

const slots = defineSlots<{
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
  const classArray: string[] = [generateClass('BORDER', borderColor)]
  classArray.push(rounded ? 'rounded-md' : 'rounded-sm')
  return classArray.join(' ')
})
const hoverEffect = computed<string>(() => {
  /**
   * @param {boolean} displayGrayScale
   */
  const { displayGrayScale } = props
  return displayGrayScale
    ? '[@media(hover:hover)]:grayscale peer-hover:grayscale-0'
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
    generateClass('H3', titleSize),
    generateClass('TEXTCOLOR', titleColor),
    generateClass('BGCOLOR', titleBlockColor),
  ]
  return classArray.join(' ')
})

const handleCardClick = (e: Event): void => {
  /**
   * @param {Event} e
   */
  const { title, ctaLink, ctaTarget, ctaAsLink } = props
  !ctaAsLink && e.preventDefault()
  const cardEvent: CardClickEvent = {
    title,
    url: ctaLink,
    target: ctaTarget ? ctaTarget : '_self',
  }
  console.log(cardEvent)
  emit('card-click', e, cardEvent)
}
</script>

<template>
  <div
    class="max-w-112.5 sm:max-w-87.5 xs:w-auto relative w-full shrink-0 grow cursor-pointer overflow-hidden border"
    :class="borderClass"
  >
    <a :href="ctaLink" :target="ctaTarget" @click="handleCardClick($event)">
      <div
        class="z-15 p-xs peer absolute inset-0 flex flex-col items-start justify-end transition-opacity duration-200 hover:opacity-100 [@media(hover:hover)]:opacity-0"
      >
        <h3
          v-html="title"
          class="px-xs py-2xs mb-2xs pointer-events-none inline-block tracking-wide"
          :class="titleClass"
        ></h3>
        <slot></slot>
      </div>
      <img
        :src="imageSource"
        :alt="imageAlt"
        class="aspect-3/4 relative z-10 h-full w-full object-cover object-center transition-all duration-200"
        :class="hoverEffect"
      />
    </a>
  </div>
</template>
