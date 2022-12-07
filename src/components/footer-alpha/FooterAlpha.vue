<script setup lang="ts">
import { withDefaults, ref, markRaw } from 'vue'
import type {
  ColorPalette,
  HeadingSize,
  CtaTarget,
} from '@mcl/manguito-theme/theme/theme.types'
import generateClass from '@mcl/manguito-theme'
import SocialIcons from './lib/SocialIcons.vue'

export interface SocialUrl {
  linkedin?: string
  instagram?: string
  github?: string
  twitter?: string
}

const props = withDefaults(
  defineProps<{
    title: string
    titleSize?: HeadingSize
    titleColor?: ColorPalette
    titleAsLink?: boolean
    titleLink: string
    titleLinkTarget?: CtaTarget
    logo: string
    logoSmall?: string
    displaySocialIcons?: boolean
    SocialIconColor: ColorPalette
    socialLinks?: SocialUrl
    displayHighlight?: boolean
    highlightColor?: ColorPalette
  }>(),
  {
    displayHighlight: true,
    highlightColor: 'primary',
  }
)
const contactText = ['Email', 'Instagram', 'Facebook', 'Twitter']
</script>

<template>
  <footer class="border-t border-dark-2 bg-dark-3 py-6 sm:py-8 md:py-12">
    <div class="container px-xs md:px-lg lg:px-xl">
      <div
        class="flex flex-col md:flex-row flex-wrap justify-between mb-xs md:mb-md px-xs md:px-md border-b-2 border-light-1"
      >
        <div class="h-md md:h-xl lg:h-xl align-middle mb-xs">
          <img class="inline-block h-full" :src="logo" alt="" />
        </div>
        <div class="mb-xs flex items-center md:justify-center">
          <!-- social icons -->
          <social-icons
            linkedin="https://www.linkedin.com/in/sihun-kim-9baa17165/"
            github="https://github.com/bobbykim89"
          ></social-icons>
        </div>
      </div>
      <div
        class="flex flex-wrap md:justify-between items-center md:items-start gap-6 md:gap-12"
      >
        <div class="grid gap-2 justify-items-center basis-full md:basis-1/3">
          <h2 class="h2-md">{{ title }}</h2>
          <small className="text-sm text-white align-middle font-bold mb-2">
            &copy; Manguito Page {{ new Date().getFullYear() }}
          </small>
          <div>
            <slot></slot>
          </div>
        </div>
        <nav
          class="text-sm flex flex-col items-center sm:items-start sm:flex-row text-center sm:text-left gap-6 justify-between md:justify-around grow md:basis-1/2"
        >
          <div class="grid gap-3">
            <p
              class="font-bold decoration-primary decoration-4 tracking-wide px-4"
            >
              FooterAlpha {{ title }}
            </p>

            <ul>
              <li v-for="(item, i) in contactText" :key="i">
                <a href="#" class="tracking-wider outline-none nav__text">
                  {{ item }}
                </a>
                <div
                  v-if="displayHighlight"
                  class="relative h-3xs nav__decorator before:bg-primary"
                  :class="generateClass('BEFOREBG', highlightColor)"
                ></div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </footer>
  <!-- <footer
    class="border-t border-dark-2 mt-16 sm:mt-24 lg:mt-40 py-6 sm:py-8 md:py-12 px-xs md:px-lg lg:px-xl"
  >
    <div
      class="container flex flex-wrap md:justify-between items-center md:items-start gap-12"
    >
      <div class="grid gap-2 justify-items-center basis-full md:basis-1/3">
        <div class="h-md md:h-xl lg:h-xl align-middle">
          <img class="inline-block h-full" :src="logo" alt="" />
        </div>
        <p class="text-dark-3 text-sm text-center md:text-left">
          Small text example
        </p>
      </div>
      <nav
        class="text-sm flex flex-col items-center sm:items-start sm:flex-row text-center sm:text-left gap-6 justify-between md:justify-around grow md:basis-1/2"
      >
        <div class="grid gap-3">
          <p
            class="font-bold decoration-primary decoration-4 tracking-wide px-4"
          >
            FooterAlpha {{ title }}
          </p>
          <ul>
            <li v-for="(item, i) in contactText" :key="i">
              <a
                href="#"
                class="hover:text-primary transition-colors focus:outline-none focus:ring-4 ring-offset-2 ring-offset-inherit px-4 ring-primary rounded-full"
              >
                {{ item }}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </footer> -->
</template>

<style lang="scss" scoped>
.nav__decorator {
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 0;
    transition: width 0.3s linear;
  }
}

.nav__text:focus + .nav__decorator::before,
.nav__text:hover + .nav__decorator::before {
  width: 100%;
}
</style>
