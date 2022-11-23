<script setup lang="ts">
import { withDefaults } from 'vue'
import type {
  ColorPalette,
  HeadingSize,
} from '@mcl/manguito-theme/theme/theme.types'
import generateClass from '@mcl/manguito-theme'

const props = withDefaults(
  defineProps<{
    title: string
    titleSize?: HeadingSize
    titleColor?: ColorPalette
    titleBlockColor?: ColorPalette
    displayGrayScale?: boolean
  }>(),
  {
    titleSize: 'md',
    titleColor: 'light-1',
    titleBlockColor: 'dark-4',
    displayGrayScale: true,
  }
)
</script>

<template>
  <div class="relative w-full">CardBeta</div>
</template>

<style lang="scss" scoped></style>
