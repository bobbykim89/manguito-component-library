<script setup lang="ts">
import { reactive } from 'vue'
import FooterAlpha from '@/components/footer-alpha'
import type {
  NavItemType,
  SocialUrl,
} from '@/components/footer-alpha/FooterAlpha.vue'
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
const secondaryNavItems: NavItemType[] = [
  {
    title: 'Blog',
    url: '#',
    target: '_blank',
  },
  {
    title: 'Projects',
    url: '#',
    target: '_blank',
  },
  {
    title: 'Contact',
    url: '#',
    target: '_blank',
  },
]

const socialLinks: SocialUrl = {
  linkedin: 'https://www.linkedin.com/',
  github: 'https://github.com/',
  instagram: 'https://www.instagram.com/',
  twitter: 'https://twitter.com/',
}

const stateAlpha = reactive<{}>({})
</script>

<template>
  <Story title="Footer" group="section-comp">
    <Variant title="footer-alpha">
      <section class="pt-3xl">
        <footer-alpha
          title="Manguito Page"
          copy-text="lorem ipsum"
          logo="https://res.cloudinary.com/dwgni1x3t/image/upload/v1670261556/MCL/mcl-logo-light_eqxliq.png"
          logo-link="/"
          :nav-items="navItems"
          :secondary-nav-items="secondaryNavItems"
        >
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet,
            rem.
          </div>
        </footer-alpha>
      </section>
    </Variant>
  </Story>
</template>
