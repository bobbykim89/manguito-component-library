<script setup lang="ts">
import { computed } from 'vue'
import { generateClass } from '../theme'
import type {
  BodyText,
  ColorPalette,
  HeadingSize,
  OpacityRange,
} from '../theme/static/theme.types'

const props = withDefaults(
  defineProps<{
    variant?: ColorPalette
    rounded?: boolean
    shadow?: boolean
    glass?: boolean
    glassBlur?: BodyText
    glassOpacity?: OpacityRange
    imageSrc?: string
    imageAlt?: string
    noImage?: boolean
    noBody?: boolean
    noHeader?: boolean
    noFooter?: boolean
    title?: string
    titleVariant?: ColorPalette
    titleSize?: HeadingSize
    cardClass: string | string[]
  }>(),
  {
    variant: 'light-1',
    shadow: false,
    rounded: false,
    glass: false,
    glassBlur: 'sm',
    glassOpacity: 10,
    noImage: false,
    noBody: false,
    noHeader: false,
    noFooter: false,
    titleVariant: 'dark-4',
    titleSize: 'md',
    cardClass: '',
  },
)

const blurClass: Record<BodyText, string> = {
  xs: 'backdrop-blur-xs',
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
  xl: 'backdrop-blur-xl',
}

const depthColorClass: Record<ColorPalette, string> = {
  primary: 'mcl-depth-color-primary',
  secondary: 'mcl-depth-color-secondary',
  success: 'mcl-depth-color-success',
  info: 'mcl-depth-color-info',
  danger: 'mcl-depth-color-danger',
  warning: 'mcl-depth-color-warning',
  'light-1': 'mcl-depth-color-light-1',
  'light-2': 'mcl-depth-color-light-2',
  'light-3': 'mcl-depth-color-light-3',
  'light-4': 'mcl-depth-color-light-4',
  'dark-1': 'mcl-depth-color-dark-1',
  'dark-2': 'mcl-depth-color-dark-2',
  'dark-3': 'mcl-depth-color-dark-3',
  'dark-4': 'mcl-depth-color-dark-4',
  black: 'mcl-depth-color-black',
  white: 'mcl-depth-color-white',
  transparent: 'mcl-depth-color-transparent',
}

const slots = defineSlots<{
  default: any
  header: any
  body: any
  footer: any
}>()

const bodyClass = computed<string>(() => {
  const { variant, rounded, shadow, glass, glassBlur, glassOpacity } = props
  const classArray: string[] = [generateClass('BGCOLOR', variant)]
  classArray.push(rounded ? 'rounded-lg' : 'rounded-sm')
  shadow && classArray.push('drop-shadow-md')
  if (glass) {
    classArray.push(blurClass[glassBlur])
    classArray.push(generateClass('BGOPACITY', glassOpacity))
    classArray.push('mcl-depth-10')
    classArray.push(depthColorClass[variant])
  }
  return classArray.join(' ')
})

const titleClass = computed<string>(() => {
  const { titleVariant, titleSize } = props
  const classArray: string[] = [
    generateClass('TEXTCOLOR', titleVariant),
    generateClass('H3', titleSize),
  ]
  return classArray.join(' ')
})
</script>

<template>
  <div class="h-full w-full overflow-hidden" :class="[bodyClass, cardClass]">
    <template v-if="!noHeader">
      <slot name="header"> </slot>
    </template>
    <template v-if="!noImage">
      <img
        :src="imageSrc"
        :alt="imageAlt"
        class="h-[200px] min-w-full object-cover object-top"
      />
    </template>
    <template v-if="!noBody">
      <div class="px-xs py-2xs">
        <h3 :class="[titleClass]" class="mb-xs">{{ title }}</h3>
        <template v-if="slots.body">
          <slot name="body"></slot>
        </template>
      </div>
    </template>
    <template v-if="noBody && slots.default">
      <slot name="default"></slot>
    </template>
    <template v-if="!noFooter && slots.footer">
      <div class="py-2xs border-t-dark-3/50 border-t">
        <slot name="footer"></slot>
      </div>
    </template>
  </div>
</template>

<style scoped></style>
