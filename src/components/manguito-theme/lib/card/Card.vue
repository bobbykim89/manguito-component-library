<script setup lang="ts">
import { computed } from 'vue'
import { generateClass } from '../theme'
import type {
  BodyText,
  ColorPalette,
  HeadingSize,
  OpacityRange,
} from '../theme/static/theme.types'
import { getGlassmorphismClass } from '../util'

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
    cardClass?: string | string[]
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
    glass && getGlassmorphismClass(variant, glassBlur, glassOpacity),
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
  <div
    class="flex h-full w-full flex-col overflow-hidden"
    :class="[bodyClass, cardClass]"
  >
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
      <div class="px-xs pt-xs pb-2xs flex-1">
        <h3 :class="[titleClass]" class="mb-xs">{{ title }}</h3>
        <template v-if="slots.body">
          <slot name="body"></slot>
        </template>
      </div>
    </template>
    <template v-if="noBody && slots.default">
      <div class="flex-1">
        <slot name="default"></slot>
      </div>
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
