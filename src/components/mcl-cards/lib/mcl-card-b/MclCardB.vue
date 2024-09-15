<script setup lang="ts">
import type {
  ColorPalette,
  CtaTarget,
  HeadingSize,
} from '@bobbykim/manguito-theme'
import generateClass from '@bobbykim/manguito-theme'
import type { CardClickEvent } from '../common/index.types'
import { computed } from 'vue'

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
  }
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
    class="relative max-w-[450px] sm:max-w-[350px] w-full xs:w-auto flex-grow flex-shrink-0 cursor-pointer overflow-hidden border"
    :class="borderClass"
  >
    <a :href="ctaLink" :target="ctaTarget" @click="handleCardClick($event)">
      <div
        class="absolute z-[15] flex flex-col justify-end items-start inset-0 p-xs [@media(hover:hover)]:opacity-0 hover:opacity-100 peer transition-opacity duration-200"
      >
        <h3
          v-html="title"
          class="inline-block px-xs py-2xs mb-2xs pointer-events-none tracking-wide"
          :class="titleClass"
        ></h3>
        <slot></slot>
      </div>
      <img
        :src="imageSource"
        :alt="imageAlt"
        class="relative h-full w-full z-10 object-cover object-center aspect-[3/4] transition-all duration-200"
        :class="hoverEffect"
      />
    </a>
  </div>
</template>
