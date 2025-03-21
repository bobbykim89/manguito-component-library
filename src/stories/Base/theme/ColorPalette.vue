<script lang="ts" setup>
import type { ColorPalette } from '@/components/manguito-theme/lib'
import generateClass from '@/components/manguito-theme/lib'

type ColorObj = {
  [key in ColorPalette]: string[]
}

const colorList: ColorObj = {
  primary: ['bg-primary', '#ec489a'],
  secondary: ['bg-secondary', '#00feda'],
  success: ['bg-success', '#78be20'],
  danger: ['bg-danger', '#cc2f2f'],
  info: ['bg-info', '#00a3e0'],
  warning: ['bg-warning', '#f1ac18'],
  'light-1': ['bg-light-1', '#fafafa'],
  'light-2': ['bg-light-2', '#f1f1f1'],
  'light-3': ['bg-light-3', '#e8e8e8'],
  'light-4': ['bg-light-4', '#d0d0d0'],
  'dark-1': ['bg-dark-1', '#747474'],
  'dark-2': ['bg-dark-2', '#484848'],
  'dark-3': ['bg-dark-3', '#1f2937'],
  'dark-4': ['bg-dark-4', '#191919'],
  black: ['bg-black', '#000000'],
  white: ['bg-white', '#ffffff'],
  transparent: ['transparent', 'transparent'],
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
      <h2 class="text-primary">Default Color Palette</h2>
    </div>
    <div
      class="grid grid-cols-2 gap-6 content-center mb-2xs"
      v-for="(color, index) in colorList"
      :key="`color-${index}`"
    >
      <div class="flex items-center justify-center">
        <h3 class="capitalize drop-shadow-md" :class="generateFontColor(index)">
          {{ index }}
        </h3>
      </div>
      <div
        class="h-lg flex justify-center items-center font-bold drop-shadow-md"
        :class="color[0]"
      >
        <span class="tracking-wide bg-light-1 rounded-md px-xs">{{
          color[1]
        }}</span>
      </div>
    </div>
  </section>
</template>
