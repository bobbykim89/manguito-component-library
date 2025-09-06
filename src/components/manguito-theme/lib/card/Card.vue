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
    border?: boolean
    borderVariant?: ColorPalette
    rounded?: boolean
    shadow?: boolean
    glass?: boolean
    glassBlur?: BodyText
    glassOpacity?: OpacityRange
    imageSrc?: string
    imageAlt?: string
    noImage?: boolean
    noBody?: boolean
    header?: string
    footer?: string
    title?: string
    titleVariant?: ColorPalette
    titleSize?: HeadingSize
    cardClass: string | string[]
  }>(),
  {
    variant: 'light-1',
    border: false,
    borderVariant: 'light-4',
    shadow: false,
    rounded: false,
    glass: false,
    glassBlur: 'sm',
    glassOpacity: 10,
    noImage: false,
    noBody: false,
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
  const {
    variant,
    rounded,
    shadow,
    border,
    borderVariant,
    glass,
    glassBlur,
    glassOpacity,
  } = props
  return [
    generateClass('BGCOLOR', variant),
    rounded ? 'rounded-lg' : 'rounded-sm',
    shadow && 'drop-shadow-md',
    border && 'border',
    border && generateClass('BORDER', borderVariant),
    glass && blurClass[glassBlur],
    glass && generateClass('BGOPACITY', glassOpacity),
    glass && 'mcl-depth-10',
    glass && depthColorClass[variant],
  ]
    .filter(Boolean)
    .join(' ')
})

const titleClass = computed<string>(() => {
  const { titleVariant, titleSize } = props
  return [
    generateClass('TEXTCOLOR', titleVariant),
    generateClass('H3', titleSize),
  ].join(' ')
})

const headerCLass = computed<string>(() => {
  const { border, borderVariant, titleVariant } = props
  return [
    generateClass('TEXTCOLOR', titleVariant),
    border && 'border-b',
    generateClass('BORDER', borderVariant),
  ]
    .filter(Boolean)
    .join(' ')
})

const footerClass = computed<string>(() => {
  const { border, borderVariant } = props
  return [
    border && 'border-t',
    border && generateClass('BORDER', borderVariant),
  ]
    .filter(Boolean)
    .join(' ')
})
</script>

<template>
  <div class="h-full w-full overflow-hidden" :class="[bodyClass, cardClass]">
    <template v-if="header || slots.header">
      <slot name="header">
        <div :class="[headerCLass]" class="py-2xs px-xs font-bold">
          <p>{{ header }}</p>
        </div>
      </slot>
    </template>
    <template v-if="imageSrc && !noImage">
      <img
        :src="imageSrc"
        :alt="imageAlt"
        class="h-[200px] min-w-full object-cover object-top"
      />
    </template>
    <template v-if="!noBody">
      <div class="px-xs pt-xs pb-2xs">
        <h3 :class="[titleClass]" class="mb-xs">{{ title }}</h3>
        <template v-if="slots.body">
          <slot name="body"></slot>
        </template>
      </div>
    </template>
    <template v-if="noBody && slots.default">
      <slot name="default"></slot>
    </template>
    <template v-if="footer || slots.footer">
      <slot name="footer">
        <div class="py-2xs px-xs" :class="[footerClass]">
          <p>{{ footer }}</p>
        </div>
      </slot>
    </template>
  </div>
</template>

<style scoped></style>
