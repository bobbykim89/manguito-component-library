<script setup lang="ts">
import type {
  ColorPalette,
  CrossOrigin,
  CtaTarget,
  HeadingSize,
  Range,
} from '@bobbykim/manguito-theme'
import generateClass from '@bobbykim/manguito-theme'
import { computed } from 'vue'
import type { CardClickEvent } from '../common/index.types'
import type { ColorMap } from './index.types'

// gradient color options objects
const fromColorClasses: ColorMap = {
  primary: 'from-primary',
  secondary: 'from-secondary',
  success: 'from-success',
  info: 'from-info',
  warning: 'from-warning',
  danger: 'from-danger',
  'light-1': 'from-light-1',
  'light-2': 'from-light-2',
  'light-3': 'from-light-3',
  'light-4': 'from-light-4',
  'dark-1': 'from-dark-1',
  'dark-2': 'from-dark-2',
  'dark-3': 'from-dark-3',
  'dark-4': 'from-dark-4',
  black: 'from-black',
  white: 'from-white',
  transparent: 'from-transparent',
}
const viaColorClasses: ColorMap = {
  primary: 'via-primary',
  secondary: 'via-secondary',
  success: 'via-success',
  info: 'via-info',
  warning: 'via-warning',
  danger: 'via-danger',
  'light-1': 'via-light-1',
  'light-2': 'via-light-2',
  'light-3': 'via-light-3',
  'light-4': 'via-light-4',
  'dark-1': 'via-dark-1',
  'dark-2': 'via-dark-2',
  'dark-3': 'via-dark-3',
  'dark-4': 'via-dark-4',
  black: 'via-black',
  white: 'via-white',
  transparent: 'via-transparent',
}
const toColorClasses: ColorMap = {
  primary: 'to-primary',
  secondary: 'to-secondary',
  success: 'to-success',
  info: 'to-info',
  warning: 'to-warning',
  danger: 'to-danger',
  'light-1': 'to-light-1',
  'light-2': 'to-light-2',
  'light-3': 'to-light-3',
  'light-4': 'to-light-4',
  'dark-1': 'to-dark-1',
  'dark-2': 'to-dark-2',
  'dark-3': 'to-dark-3',
  'dark-4': 'to-dark-4',
  black: 'to-black',
  white: 'to-white',
  transparent: 'to-transparent',
}

const props = withDefaults(
  defineProps<{
    displayImage?: boolean
    imageSource?: string
    imageAlt?: string
    imageCors?: CrossOrigin
    title: string
    titleSize?: HeadingSize
    titleColor?: ColorPalette
    bgColor?: ColorPalette
    displayHighlight?: boolean
    highlightColor?: ColorPalette
    ctaText?: string
    ctaLink: string
    ctaLinkTarget?: CtaTarget
    ctaAsLink?: boolean
    ctaButton?: boolean
    ctaButtonColor?: ColorPalette
    ctaButtonBlock?: boolean
    borderWidth?: Range<1, 10>
    borderColor?: ColorPalette
    gradient1?: ColorPalette
    gradient2?: ColorPalette
    customColor?: ColorMap
  }>(),
  {
    displayImage: true,
    imageAlt: '',
    imageCors: 'anonymous',
    titleSize: 'md',
    titleColor: 'dark-4',
    bgColor: 'light-1',
    displayHighlight: true,
    highlightColor: 'primary',
    ctaText: 'Read more',
    ctaLinkTarget: '_self',
    ctaAsLink: false,
    ctaButton: false,
    ctaButtonColor: 'warning',
    ctaButtonBlock: false,
    borderWidth: 3,
    borderColor: 'light-3',
    gradient1: 'primary',
    gradient2: 'secondary',
  }
)

const slots = defineSlots<{
  default: any
}>()
const emit = defineEmits<{
  (e: 'card-click', event: Event, item: CardClickEvent): void
}>()

const titleClass = (size: HeadingSize, color: ColorPalette): string => {
  /**
   * @param {HeadingSize} size - titleSize
   * @param {ColorPalette} color - titleColor
   */

  const classArray: string[] = [
    generateClass('H2', size),
    generateClass('TEXTCOLOR', color),
  ]
  return classArray.join(' ')
}
const buttonClass = (
  dBtn: boolean,
  color: ColorPalette,
  block: boolean
): string => {
  /**
   * @param {boolean} - dBtn = ctaButton
   * @param {ColorPalette} - color = ctaButtonColor
   * @param {boolean} - block = ctaButtonBlock
   */
  const classArray: string[] = []
  const lightColor: string[] = ['light-1', 'light-2', 'light-3', 'light-4']
  if (!dBtn) {
    classArray.push('mcl-link')
  }
  if (dBtn) {
    classArray.push('btn')
    classArray.push(generateClass('BTNCOLOR', color))
  }
  if (dBtn && block) {
    classArray.push('btn-full')
  }
  if (dBtn && !lightColor.includes(color)) {
    classArray.push('text-white')
  }
  return classArray.join(' ')
}

const borderVariable = computed(() => {
  return {
    '--border-width': `${props.borderWidth}px`,
  }
})

const gradientClass = computed<string>(() => {
  const gradientBorerColor: string = fromColorClasses[props.borderColor]
  const gradient1Color: string = viaColorClasses[props.gradient1]
  const gradient2Color: string = toColorClasses[props.gradient2]
  let classArray: string[] = [
    generateClass('BORDER', props.borderColor),
    gradientBorerColor,
    gradient1Color,
    gradient2Color,
  ]

  return classArray.join(' ')
})

const handleCardClick = (e: Event) => {
  /**
   * @param {Event} e - click event
   * @param {Boolean} link - ctaAsLink
   */

  const { title, ctaLink, ctaLinkTarget, ctaAsLink } = props
  const cardEvent: CardClickEvent = {
    title,
    url: ctaLink,
    target: ctaLinkTarget ? ctaLinkTarget : '_self',
  }
  !ctaAsLink && e.preventDefault()
  emit('card-click', e, cardEvent)
}
</script>

<template>
  <div
    class="card [--border-angle:0deg] bg-[conic-gradient(from_var(--border-angle),var(--tw-gradient-stops))] from-20% overflow-hidden rounded-md max-w-[450px] sm:max-w-[350px] w-full xs:w-auto flex-grow flex-shrink-0 border"
    :class="gradientClass"
    :style="borderVariable"
  >
    <div class="flex flex-col rounded-md overflow-hidden">
      <img
        v-if="displayImage"
        :src="imageSource"
        :crossorigin="imageCors"
        class="object-cover object-top max-h-[200px]"
        :alt="imageAlt"
      />
      <div class="p-xs" :class="generateClass('BGCOLOR', bgColor)">
        <h3 class="mb-xs" :class="titleClass(titleSize, titleColor)">
          {{ title }}
        </h3>
        <div
          v-if="displayHighlight"
          class="mb-xs h-3xs w-md"
          :class="generateClass('BGCOLOR', highlightColor)"
        ></div>
        <div>
          <slot></slot>
        </div>
        <div class="mt-xs" :class="{ 'mb-2xs': !ctaButton }">
          <a
            :href="ctaLink"
            :target="ctaLinkTarget"
            :class="buttonClass(ctaButton, ctaButtonColor, ctaButtonBlock)"
            @click="handleCardClick"
            >{{ ctaText }}</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  padding: var(--border-width);

  animation: bg-spin 4s linear infinite;
  @keyframes bg-spin {
    to {
      --border-angle: 360deg;
    }
  }

  &:hover {
    animation-play-state: paused;
  }
}

@property --border-angle {
  syntax: '<angle>';
  inherits: true;
  initial-value: 0deg;
}
</style>
