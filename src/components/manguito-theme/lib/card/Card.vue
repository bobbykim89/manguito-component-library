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
    glass?: boolean
    glassBlur?: BodyText
    glassOpacity?: OpacityRange
    imageSrc?: string
    imageAlt?: string
    noImage?: boolean
    noHeader?: boolean
    noFooter?: boolean
    title?: string
    titleVariant?: ColorPalette
    titleSize?: HeadingSize
    cardClass: string | string[]
  }>(),
  {
    variant: 'light-1',
    rounded: false,
    glass: false,
    glassBlur: 'sm',
    glassOpacity: 10,
    noImage: false,
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

const bodyClass = computed<string>(() => {
  const { variant, rounded, glass, glassBlur, glassOpacity } = props
  const classArray: string[] = [generateClass('BGCOLOR', variant)]
  classArray.push(rounded ? 'rounded-lg' : 'rounded-sm')
  if (glass) {
    classArray.push(blurClass[glassBlur])
    classArray.push(generateClass('BGOPACITY', glassOpacity))
    classArray.push('mcl-depth-10')
    classArray.push(depthColorClass[variant])
  }
  return classArray.join(' ')
})
</script>

<template>
  <div class="h-full w-full" :class="[bodyClass, cardClass]">Hello Pollito</div>
</template>

<style scoped></style>
