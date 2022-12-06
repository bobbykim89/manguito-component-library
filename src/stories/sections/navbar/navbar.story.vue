<script setup lang="ts">
import { reactive } from 'vue'
import NavAlpha from '@/components/nav-alpha'
import type { NavItemType } from '@/components/nav-alpha/NavAlpha.vue'
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

const navItems: NavItemType[] = [
  {
    title: 'Home',
    url: 'https://manguitopage.herokuapp.com/',
    target: '_blank',
  },
  {
    title: 'Gallery',
    url: 'https://manguitopage.herokuapp.com/gallery',
    target: '_blank',
  },
  {
    title: 'About',
    url: 'https://manguitopage.herokuapp.com/about',
    target: '_blank',
  },
]

const stateAlpha = reactive<{}>({})
</script>

<template>
  <Story title="Navbar" group="section-comp">
    <Variant title="nav-alpha">
      <nav-alpha
        logo="https://res.cloudinary.com/dwgni1x3t/image/upload/v1670261556/MCL/mcl-logo-light_eqxliq.png"
        title="Manguito Page"
        logo-small="https://res.cloudinary.com/dwgni1x3t/image/upload/v1670275930/MCL/mcl-logo-square_jvgyxx.png"
        :nav-items="navItems"
      >
        <template #mobile-slot>
          <div class="bg-primary">dada</div>
        </template>
      </nav-alpha>
    </Variant>
  </Story>
</template>
