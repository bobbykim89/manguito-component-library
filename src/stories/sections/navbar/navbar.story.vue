<script setup lang="ts">
import { reactive } from 'vue'
import NavAlpha from '@/components/nav-alpha'
import BtnAlpha from '@/components/btn-alpha'
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
const handleClick = (e: Event) => {
  console.log(e)
  console.log('menu click')
}
</script>

<template>
  <Story title="Navbar" group="section-comp">
    <Variant title="nav-alpha">
      <nav-alpha
        logo="https://res.cloudinary.com/dwgni1x3t/image/upload/v1670261556/MCL/mcl-logo-light_eqxliq.png"
        title="Manguito Page"
        logo-small="https://res.cloudinary.com/dwgni1x3t/image/upload/v1670275930/MCL/mcl-logo-square_jvgyxx.png"
        :nav-items="navItems"
        title-link="https://manguitopage.herokuapp.com/"
        logo-link="https://manguitopage.herokuapp.com/"
        @menu-click="handleClick"
      >
        <template #nav-slot>
          <div>
            <btn-alpha class="mr-xs">Login</btn-alpha>
            <btn-alpha color="warning">Signup</btn-alpha>
          </div>
        </template>
        <template #mobile-slot>
          <ul class="bg-light-4 p-2xs flex justify-center">
            <li class="mr-xs">
              <a href="https://manguitopage.herokuapp.com/login">Login</a>
            </li>
            <li>
              <a href="https://manguitopage.herokuapp.com/signup">Signup</a>
            </li>
          </ul>
        </template>
      </nav-alpha>
    </Variant>
  </Story>
</template>
