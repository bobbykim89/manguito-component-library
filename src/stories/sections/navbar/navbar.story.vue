<script setup lang="ts">
import { reactive, ref } from 'vue'
import NavAlpha from '@/components/nav-alpha'
import type { NavItemType } from '@/components/nav-alpha'
import type {
  ColorPalette,
  HeadingSize,
  CtaTarget,
  BodyText,
} from '@/components/manguito-theme'
import {
  colors,
  bodyTextSize,
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

const stateAlpha = reactive<{
  logo: string
  logoSmall?: string
  logoAlt?: string
  logoAsLink?: boolean
  logoLink: string
  logoLinkTarget?: CtaTarget
  title: string
  titleSize?: HeadingSize
  titleColor?: ColorPalette
  titleAsLink?: boolean
  titleLink: string
  titleLinkTarget?: CtaTarget
  navItems: NavItemType[]
  navItemAsLink?: boolean
  menuTextSize?: BodyText
  menuTextColor?: ColorPalette
  menuTextBold?: boolean
  displayHighlight?: boolean
  highlightColor?: ColorPalette
  bgColor?: ColorPalette
  mobileMenuBgColor?: ColorPalette
  hamburgerColor?: ColorPalette
  hamburgerBorder?: boolean
  fadeInOnScroll?: boolean
  scrollDistance?: number
}>({
  logo: 'https://res.cloudinary.com/dwgni1x3t/image/upload/v1670261556/MCL/mcl-logo-light_eqxliq.png',
  logoSmall:
    'https://res.cloudinary.com/dwgni1x3t/image/upload/v1670275930/MCL/mcl-logo-square_jvgyxx.png',
  logoAlt: 'Manguito Component Library (MCL) logo',
  logoAsLink: true,
  logoLink: '/',
  logoLinkTarget: '_self',
  title: 'Nav Alpha',
  titleSize: 'md',
  titleColor: 'dark-3',
  titleAsLink: true,
  titleLink: '/',
  titleLinkTarget: '_self',
  navItems: navItems,
  navItemAsLink: true,
  menuTextSize: 'md',
  menuTextColor: 'dark-3',
  menuTextBold: false,
  displayHighlight: true,
  highlightColor: 'primary',
  bgColor: 'light-1',
  mobileMenuBgColor: 'light-2',
  hamburgerColor: 'dark-1',
  hamburgerBorder: true,
  fadeInOnScroll: true,
  scrollDistance: 50,
})

const handleLoginBtn = (): void => {
  window.open('https://manguitopage.herokuapp.com/login', '_blank')
}
const handleSignupBtn = (): void => {
  window.open('https://manguitopage.herokuapp.com/signup', '_blank')
}

type EmitType = 'logo' | 'title' | 'menu'
const messageRef = ref<string>('')
const handleEmitClick = (type: EmitType): void => {
  messageRef.value = type
}
</script>

<template>
  <Story title="Navbar" group="section-comp">
    <Variant title="nav-alpha">
      <section>
        <nav-alpha
          :logo="stateAlpha.logo"
          :logo-small="stateAlpha.logoSmall"
          :logo-alt="stateAlpha.logoAlt"
          :logo-as-link="stateAlpha.logoAsLink"
          :logo-link="stateAlpha.logoLink"
          :logo-link-target="stateAlpha.logoLinkTarget"
          :title="stateAlpha.title"
          :title-size="stateAlpha.titleSize"
          :title-color="stateAlpha.titleColor"
          :title-as-link="stateAlpha.titleAsLink"
          :title-link="stateAlpha.titleLink"
          :title-link-target="stateAlpha.titleLinkTarget"
          :nav-items="stateAlpha.navItems"
          :nav-item-as-link="stateAlpha.navItemAsLink"
          :menu-text-size="stateAlpha.menuTextSize"
          :menu-text-color="stateAlpha.menuTextColor"
          :menu-text-bold="stateAlpha.menuTextBold"
          :display-highlight="stateAlpha.displayHighlight"
          :highlight-color="stateAlpha.highlightColor"
          :bg-color="stateAlpha.bgColor"
          :mobile-menu-bg-color="stateAlpha.mobileMenuBgColor"
          :hamburger-color="stateAlpha.hamburgerColor"
          :hamburger-border="stateAlpha.hamburgerBorder"
          :fade-in-on-scroll="stateAlpha.fadeInOnScroll"
          :scroll-distance="stateAlpha.scrollDistance"
          @logo-click="handleEmitClick('logo')"
          @title-click="handleEmitClick('title')"
          @menu-click="handleEmitClick('menu')"
        >
          <template #nav-slot>
            <div>
              <button class="btn mr-xs" @click="handleLoginBtn">Login</button>
              <button class="btn btn-warning" @click="handleSignupBtn">
                Signup
              </button>
            </div>
          </template>
          <template #mobile-slot="{ closeNav }">
            <ul class="bg-light-4 p-2xs flex justify-center">
              <li class="mr-xs">
                <a
                  @click="closeNav"
                  href="https://manguitopage.herokuapp.com/login"
                  target="_blank"
                  >Login</a
                >
              </li>
              <li>
                <a
                  @click="closeNav"
                  href="https://manguitopage.herokuapp.com/signup"
                  target="_blank"
                  >Signup</a
                >
              </li>
            </ul>
          </template>
        </nav-alpha>
        <div v-if="messageRef !== ''" class="mt-md flex justify-center">
          <p class="text-xl">You emitted "{{ messageRef }}" button</p>
        </div>
      </section>
      <template #controls>
        <HstText title="title" v-model="stateAlpha.title" />
        <HstSelect
          title="title-size"
          v-model="stateAlpha.titleSize"
          :options="headingTextSize"
        />
        <HstSelect
          title="title-color"
          v-model="stateAlpha.titleColor"
          :options="colors"
        />
        <HstCheckbox title="title-as-link" v-model="stateAlpha.titleAsLink" />
        <HstText title="title-link" v-model="stateAlpha.titleLink" />
        <HstSelect
          title="title-link-target"
          v-model="stateAlpha.titleLinkTarget"
          :options="targetOption"
        />
        <HstText title="logo" v-model="stateAlpha.logo" />
        <HstText title="logo-small" v-model="stateAlpha.logoSmall" />
        <HstText title="logo-alt" v-model="stateAlpha.logoAlt" />
        <HstCheckbox title="logo-as-link" v-model="stateAlpha.logoAsLink" />
        <HstText title="logo-link" v-model="stateAlpha.logoLink" />
        <HstSelect
          title="logo-link-target"
          v-model="stateAlpha.logoLinkTarget"
          :options="targetOption"
        />
        <HstCheckbox
          title="nav-item-as-link"
          v-model="stateAlpha.navItemAsLink"
        />
        <HstSelect
          title="menu-text-size"
          v-model="stateAlpha.menuTextSize"
          :options="bodyTextSize"
        />
        <HstSelect
          title="menu-text-color"
          v-model="stateAlpha.menuTextColor"
          :options="colors"
        />
        <HstCheckbox title="menu-text-bold" v-model="stateAlpha.menuTextBold" />
        <HstCheckbox
          title="display-highlight"
          v-model="stateAlpha.displayHighlight"
        />
        <HstSelect
          title="highlight-color"
          v-model="stateAlpha.highlightColor"
          :options="colors"
        />
        <HstSelect
          title="bg-color"
          v-model="stateAlpha.bgColor"
          :options="colors"
        />
        <HstSelect
          title="mobile-menu-bg-color"
          v-model="stateAlpha.mobileMenuBgColor"
          :options="colors"
        />
        <HstSelect
          title="hamburger-color"
          v-model="stateAlpha.hamburgerColor"
          :options="colors"
        />
        <HstCheckbox
          title="hamburger-border"
          v-model="stateAlpha.hamburgerBorder"
        />
        <HstCheckbox
          title="fade-in-on-scroll"
          v-model="stateAlpha.fadeInOnScroll"
        />
        <HstNumber
          v-model="stateAlpha.scrollDistance"
          :step="1"
          title="scroll-distance"
        />
      </template>
    </Variant>
  </Story>
</template>
