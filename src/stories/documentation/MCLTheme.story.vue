<script setup lang="ts">
import type { ColorClass } from '@/components/manguito-theme/theme/theme'
import type {
  ColorPalette,
  SpacingLevel,
} from '@/components/manguito-theme/theme/theme.types'
import generateClass from '@/components/manguito-theme'

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

interface BreakpointClass {
  sm: string
  md: string
  lg: string
  xl: string
}

interface HeadingItem {
  class: string
  mobile: string
  md: string
  lg: string
}

interface HeadingSizeClass {
  h1: HeadingItem[]
  h2: HeadingItem[]
  h3: HeadingItem[]
  h4: HeadingItem[]
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

const headingTextSize: HeadingSizeClass = {
  h1: [
    {
      class: 'h1-sm',
      mobile: '24px',
      md: '24px',
      lg: '36px',
    },
    {
      class: 'h1-md',
      mobile: '30px',
      md: '30px',
      lg: '40px',
    },
    {
      class: 'h1-lg',
      mobile: '36px',
      md: '36px',
      lg: '56px',
    },
    {
      class: 'h1-xl',
      mobile: '56px',
      md: '56px',
      lg: '72px',
    },
  ],
  h2: [
    {
      class: 'h2-sm',
      mobile: '18px',
      md: '18px',
      lg: '24px',
    },
    {
      class: 'h2-md',
      mobile: '24px',
      md: '24px',
      lg: '36px',
    },
    {
      class: 'h2-lg',
      mobile: '30px',
      md: '30px',
      lg: '48px',
    },
    {
      class: 'h2-xl',
      mobile: '48px',
      md: '48px',
      lg: '60px',
    },
  ],
  h3: [
    {
      class: 'h3-sm',
      mobile: '16px',
      md: '16px',
      lg: '16px',
    },
    {
      class: 'h3-md',
      mobile: '18px',
      md: '18px',
      lg: '20px',
    },
    {
      class: 'h3-lg',
      mobile: '18px',
      md: '18px',
      lg: '24px',
    },
    {
      class: 'h3-xl',
      mobile: '30px',
      md: '30px',
      lg: '36px',
    },
  ],
  h4: [
    {
      class: 'h4-sm',
      mobile: '14px',
      md: '14px',
      lg: '16px',
    },
    {
      class: 'h4-md',
      mobile: '16px',
      md: '16px',
      lg: '18px',
    },
    {
      class: 'h4-lg',
      mobile: '16px',
      md: '16px',
      lg: '20px',
    },
    {
      class: 'h4-xl',
      mobile: '24px',
      md: '24px',
      lg: '30px',
    },
  ],
}

const bodyTextSize: BodyTextClass = {
  xs: { size: '12px', class: 'text-xs' },
  sm: { size: '14px', class: 'text-sm' },
  md: { size: '16px', class: 'text-md' },
  lg: { size: '18px', class: 'text-lg' },
  xl: { size: '20px', class: 'text-xl' },
}

const breakPoint: BreakpointClass = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
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
    <Variant title="Breakpoint">
      <section>
        <div
          class="grid grid-cols-2 gap-6 content-center mb-2xs"
          v-for="(size, index) in breakPoint"
          :key="index"
        >
          <div class="flex items-center justify-center">
            <h3 class="h3-md drop-shadow-md text-warning" v-html="index"></h3>
          </div>
          <div class="flex items-center justify-center bg-white p-xs">
            <h3 class="h3-md" v-html="size"></h3>
          </div>
        </div>
      </section>
    </Variant>
    <!-- Heading size -->
    <Variant title="Heading Size">
      <section class="grid grid-cols-5 gap-1 content-center">
        <div class="flex items-center justify-center bg-danger text-white">
          <h4 class="h4-sm py-3xs">Level</h4>
        </div>
        <div class="flex items-center justify-center bg-danger text-white">
          <h4 class="h4-sm py-3xs">Class</h4>
        </div>
        <div class="flex items-center justify-center bg-danger text-white">
          <h4 class="h4-sm py-3xs">Mobile (>640px)</h4>
        </div>
        <div class="flex items-center justify-center bg-danger text-white">
          <h4 class="h4-sm py-3xs">md (>768px)</h4>
        </div>
        <div class="flex items-center justify-center bg-danger text-white">
          <h4 class="h4-sm py-3xs">md (>1024px)</h4>
        </div>
        <!-- h1 -->
        <div class="row-span-4 flex items-center justify-center bg-light-1">
          <p class="text-sm py-3xs">H1</p>
        </div>
        <div
          class="col-span-4 grid grid-cols-4 gap-1 content-center"
          v-for="(item, i) in headingTextSize.h1"
          :key="i"
        >
          <div class="flex items-center justify-center bg-light-2">
            <p class="text-sm py-3xs" v-html="item.class"></p>
          </div>
          <div class="flex items-center justify-center bg-light-2">
            <p class="text-sm py-3xs" v-html="item.mobile"></p>
          </div>
          <div class="flex items-center justify-center bg-light-2">
            <p class="text-sm py-3xs" v-html="item.md"></p>
          </div>
          <div class="flex items-center justify-center bg-light-2">
            <p class="text-sm py-3xs" v-html="item.lg"></p>
          </div>
        </div>
        <!-- h2 -->
        <div class="row-span-4 flex items-center justify-center bg-warning">
          <p class="text-sm py-3xs">H2</p>
        </div>
        <div
          class="col-span-4 grid grid-cols-4 gap-1 content-center"
          v-for="(item, i) in headingTextSize.h2"
          :key="i"
        >
          <div class="flex items-center justify-center bg-warning">
            <p class="text-sm py-3xs" v-html="item.class"></p>
          </div>
          <div class="flex items-center justify-center bg-warning">
            <p class="text-sm py-3xs" v-html="item.mobile"></p>
          </div>
          <div class="flex items-center justify-center bg-warning">
            <p class="text-sm py-3xs" v-html="item.md"></p>
          </div>
          <div class="flex items-center justify-center bg-warning">
            <p class="text-sm py-3xs" v-html="item.lg"></p>
          </div>
        </div>
        <!-- h3 -->
        <div class="row-span-4 flex items-center justify-center bg-light-1">
          <p class="text-sm py-3xs">H3</p>
        </div>
        <div
          class="col-span-4 grid grid-cols-4 gap-1 content-center"
          v-for="(item, i) in headingTextSize.h3"
          :key="i"
        >
          <div class="flex items-center justify-center bg-light-2">
            <p class="text-sm py-3xs" v-html="item.class"></p>
          </div>
          <div class="flex items-center justify-center bg-light-2">
            <p class="text-sm py-3xs" v-html="item.mobile"></p>
          </div>
          <div class="flex items-center justify-center bg-light-2">
            <p class="text-sm py-3xs" v-html="item.md"></p>
          </div>
          <div class="flex items-center justify-center bg-light-2">
            <p class="text-sm py-3xs" v-html="item.lg"></p>
          </div>
        </div>
        <!-- h4 -->
        <div class="row-span-4 flex items-center justify-center bg-warning">
          <p class="text-sm py-3xs">H4</p>
        </div>
        <div
          class="col-span-4 grid grid-cols-4 gap-1 content-center"
          v-for="(item, i) in headingTextSize.h4"
          :key="i"
        >
          <div class="flex items-center justify-center bg-warning">
            <p class="text-sm py-3xs" v-html="item.class"></p>
          </div>
          <div class="flex items-center justify-center bg-warning">
            <p class="text-sm py-3xs" v-html="item.mobile"></p>
          </div>
          <div class="flex items-center justify-center bg-warning">
            <p class="text-sm py-3xs" v-html="item.md"></p>
          </div>
          <div class="flex items-center justify-center bg-warning">
            <p class="text-sm py-3xs" v-html="item.lg"></p>
          </div>
        </div>
      </section>
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
