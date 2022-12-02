<script setup lang="ts">
import { reactive } from 'vue'
import HamburgerAlpha from '@/components/hamburger-alpha'
import type {
  ColorPalette,
  HeadingSize,
  HeadingLevel,
  OpacityRange,
  Directions,
  BodyText,
} from '@/components/manguito-theme/theme/theme.types'
import {
  colors,
  headingTextLevel,
  headingTextSize,
  bodyTextSize,
} from '@/assets/options'

const stateAlpha = reactive<{}>({})
</script>

<template>
  <Story title="Hamburger" group="base-comp">
    <Variant title="hamburger-alpha">
      <hamburger-alpha></hamburger-alpha>
    </Variant>
  </Story>
</template>
