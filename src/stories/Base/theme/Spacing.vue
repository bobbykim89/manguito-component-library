<script lang="ts" setup>
import type { ColorPalette } from '@/components/manguito-theme'
import generateClass from '@/components/manguito-theme'
import MclLogo from '@/assets/images/manguito-logo.png'

interface SizeItem {
  size: string
  class: string
}

interface SpacingClass {
  '3xs': SizeItem
  '2xs': SizeItem
  xs: SizeItem
  sm: SizeItem
  md: SizeItem
  lg: SizeItem
  xl: SizeItem
  '2xl': SizeItem
  '3xl': SizeItem
}

const spacings: SpacingClass = {
  '3xs': { size: '4px', class: 'p-3xs' },
  '2xs': { size: '8px', class: 'p-2xs' },
  xs: { size: '16px', class: 'p-xs' },
  sm: { size: '24px', class: 'p-sm' },
  md: { size: '32px', class: 'p-md' },
  lg: { size: '48px', class: 'p-lg' },
  xl: { size: '64px', class: 'p-xl' },
  '2xl': { size: '96px', class: 'p-2xl' },
  '3xl': { size: '128px', class: 'p-3xl' },
}

const generateFontColor = (input: ColorPalette): string => {
  /**
   * @input - ColorPalette
   */
  return generateClass('TEXTCOLOR', input)
}

const generateRandomBg = (size: string): string => {
  const randomNum: number = Math.floor(Math.random() * 6)
  const bgClasses: string[] = [
    'bg-primary',
    'bg-secondary',
    'bg-success',
    'bg-danger',
    'bg-info',
    'bg-warning',
  ]
  return `${size} ${bgClasses[randomNum]}`
}
</script>

<template>
  <section class="container">
    <div class="text-center mb-lg">
      <h2 class="text-info">Spacing Example</h2>
    </div>
    <div
      class="grid md:grid-cols-2 gap-6 content-center mb-md last:mb-0"
      v-for="(unit, index) in spacings"
      :key="index"
    >
      <div class="flex items-center justify-center">
        <h3 class="drop-shadow-md text-warning">
          {{ index }}: {{ unit.size }}
        </h3>
      </div>
      <div class="flex items-center justify-center">
        <div :class="generateRandomBg(unit.class)">
          <img :src="MclLogo" alt="mcl square logo" class="h-xl bg-white" />
        </div>
      </div>
    </div>
  </section>
</template>
