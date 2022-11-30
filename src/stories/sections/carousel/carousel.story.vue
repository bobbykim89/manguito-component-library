<script lang="ts" setup>
import { reactive } from 'vue'
import CarouselAlpha from '@/components/carousel-alpha'
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
  <Story title="Carousel" group="section-comp">
    <Variant title="carousel-alpha">
      <div>
        <carousel-alpha title="carousel-alpha" v-slot="{ setRef }">
          <div :ref="(el) => setRef(el)" class="p-md bg-primary">
            Bla bla bla
          </div>
          <div :ref="(el) => setRef(el)" class="p-md bg-primary">
            Bla bla bla
          </div>
          <div :ref="(el) => setRef(el)" class="p-md bg-primary">
            Bla bla bla
          </div>
        </carousel-alpha>
      </div>
    </Variant>
  </Story>
</template>
