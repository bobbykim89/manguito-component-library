<script setup lang="ts">
import type { ColorClass } from '../../components/manguito-theme/theme/theme'
import type {
  ColorPalette,
  SpacingLevel,
} from '../../components/manguito-theme/theme/theme.types'
import generateClass from '../../components/manguito-theme'

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

interface BodyTextClass {
  xs: SizeItem
  sm: SizeItem
  md: SizeItem
  lg: SizeItem
  xl: SizeItem
}

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
}

const spacings: SpacingClass = {
  '3xs': { size: '4px', class: 'h-3xs w-3xs' },
  '2xs': { size: '8px', class: 'h-2xs w-2xs' },
  xs: { size: '16px', class: 'h-xs w-xs' },
  sm: { size: '24px', class: 'h-sm w-sm' },
  md: { size: '32px', class: 'h-md w-md' },
  lg: { size: '48px', class: 'h-lg w-lg' },
  xl: { size: '64px', class: 'h-xl w-xl' },
  '2xl': { size: '96px', class: 'h-2xl w-2xl' },
  '3xl': { size: '128px', class: 'h-3xl w-3xl' },
}

const bodyTextSize: BodyTextClass = {
  xs: { size: '12px', class: 'text-xs' },
  sm: { size: '14px', class: 'text-sm' },
  md: { size: '16px', class: 'text-md' },
  lg: { size: '18px', class: 'text-lg' },
  xl: { size: '20px', class: 'text-xl' },
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
  <Story title="MCL Theme" group="design-system">
    <!-- color palette section -->
    <Variant title="Color Palette">
      <div
        class="grid grid-cols-2 gap-6 content-center mb-2xs"
        v-for="(color, index) in colors"
        :key="`color-${index}`"
      >
        <div class="flex items-center justify-center">
          <h3
            class="capitalize drop-shadow-md"
            :class="generateFontColor(index)"
          >
            {{ index }}
          </h3>
        </div>
        <div class="h-lg" :class="color"></div>
      </div>
    </Variant>
    <!-- spading section -->
    <Variant title="Spacing">
      <div
        class="grid grid-cols-2 gap-6 content-center mb-2xs"
        v-for="(unit, index) in spacings"
        :key="index"
      >
        <div class="flex items-center justify-center">
          <h3 class="drop-shadow-md text-warning">
            {{ index }}: {{ unit.size }}
          </h3>
        </div>
        <div class="flex items-center justify-center">
          <div :class="generateRandomBg(unit.class)"></div>
        </div>
      </div>
    </Variant>
    <!-- body text -->
    <Variant title="Body Text">
      <div
        class="grid grid-cols-2 gap-6 content-center mb-2xs"
        v-for="(unit, index) in bodyTextSize"
        :key="index"
      >
        <div class="flex items-center justify-center">
          <h3 class="drop-shadow-md text-warning">
            {{ index }}: {{ unit.size }}
          </h3>
        </div>
        <div class="flex items-center justify-center bg-white p-xs">
          <div :class="unit.class">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
            debitis, natus, veniam reiciendis voluptatum dolore minima qui iure
            quam vitae fuga, et accusamus excepturi eos dolorem illum molestias
            quo nesciunt.
          </div>
        </div>
      </div>
    </Variant>
  </Story>
</template>
