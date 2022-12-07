<script setup lang="ts">
import { reactive } from 'vue'
import FooterAlpha from '@/components/footer-alpha'
import type {
  ColorPalette,
  HeadingSize,
  CtaTarget,
  BodyText,
} from '@/components/manguito-theme/theme/theme.types'
import {
  colors,
  bodyTextSize,
  buttonSize,
  targetOption,
  headingTextSize,
} from '@/assets/options'

const stateAlpha = reactive<{}>({})
</script>

<template>
  <Story title="Footer" group="section-comp">
    <Variant title="footer-alpha">
      <section class="pt-3xl">
        <footer-alpha
          title="Manguito Page"
          title-link="/"
          logo="https://res.cloudinary.com/dwgni1x3t/image/upload/v1670261556/MCL/mcl-logo-light_eqxliq.png"
        ></footer-alpha>
      </section>
    </Variant>
  </Story>
</template>
