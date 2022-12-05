<script setup lang="ts">
import { reactive } from 'vue'
import NavAlpha from '@/components/nav-alpha'
import type {
  ColorPalette,
  HeadingSize,
  CtaTarget,
  CrossOrigin,
} from '@/components/manguito-theme/theme/theme.types'
import {
  colors,
  bodyTextSize,
  buttonSize,
  targetOption,
  headingTextSize,
  corsOptions,
} from '@/assets/options'

const stateAlpha = reactive<{}>({})
</script>

<template>
  <Story title="Navbar" group="section-comp">
    <Variant title="nav-alpha">
      <nav-alpha
        logo="https://res.cloudinary.com/dwgni1x3t/image/upload/v1670261556/MCL/mcl-logo-light_eqxliq.png"
        title="Manguito Page"
      ></nav-alpha>
    </Variant>
  </Story>
</template>
