<script lang="ts" setup>
import type { ColorClass } from '@/components/manguito-theme/theme/theme'
import type { ColorPalette } from '@/components/manguito-theme'
import generateClass from '@/components/manguito-theme'

const colors: ColorClass = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  success: 'bg-success',
  danger: 'bg-danger',
  info: 'bg-info',
  warning: 'bg-warning',
  'light-1': 'bg-light-1',
  'light-2': 'bg-light-2',
  'light-3': 'bg-light-3',
  'light-4': 'bg-light-4',
  'dark-1': 'bg-dark-1',
  'dark-2': 'bg-dark-2',
  'dark-3': 'bg-dark-3',
  'dark-4': 'bg-dark-4',
  black: 'bg-black',
  white: 'bg-white',
  transparent: 'transparent',
}

const generateFontColor = (input: ColorPalette): string => {
  /**
   * @input - ColorPalette
   */
  return generateClass('TEXTCOLOR', input)
}
</script>

<template>
  <section class="container">
    <div class="text-center mb-lg">
      <h2 class="text-primary">Color Palette</h2>
    </div>
    <div
      class="grid grid-cols-2 gap-6 content-center mb-2xs"
      v-for="(color, index) in colors"
      :key="`color-${index}`"
    >
      <div class="flex items-center justify-center">
        <h3 class="capitalize drop-shadow-md" :class="generateFontColor(index)">
          {{ index }}
        </h3>
      </div>
      <div class="h-lg" :class="color"></div>
    </div>
  </section>
</template>
