<script setup lang="ts">
import { reactive, ref } from 'vue'
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

const stateAlpha = reactive<{
  title: string
  titleSize?: HeadingSize
  titleColor?: ColorPalette
  copyText?: string
  logo: string
  logoAlt?: string
  logoAsLink?: boolean
  logoLink: string
  logoLinkTarget?: CtaTarget
  displaySocialIcons?: boolean
  socialIconColor: ColorPalette
  socialLinks?: SocialUrl
  navItems: NavItemType[]
  secondaryNavItems?: NavItemType[]
  navItemAsLink?: boolean
  menuTextSize?: BodyText
  menuTextColor?: ColorPalette
  menuTextBold?: boolean
  displayHighlight?: boolean
  highlightColor?: ColorPalette
  bgColor?: ColorPalette
  borderTopColor?: ColorPalette
  headlineColor?: ColorPalette
  slotText?: string
}>({
  title: 'MCL',
  titleSize: 'md',
  titleColor: 'light-1',
  copyText: 'Manguito Component Library',
  logo: 'https://res.cloudinary.com/dwgni1x3t/image/upload/v1670261556/MCL/mcl-logo-light_eqxliq.png',
  logoAlt: 'Manguito Component Library (MCL) logo',
  logoAsLink: true,
  logoLink: '/',
  logoLinkTarget: '_self',
  displaySocialIcons: true,
  socialIconColor: 'light-1',
  socialLinks: socialLinks,
  navItems: navItems,
  secondaryNavItems: secondaryNavItems,
  navItemAsLink: true,
  menuTextSize: 'md',
  menuTextColor: 'light-1',
  menuTextBold: false,
  displayHighlight: true,
  highlightColor: 'primary',
  bgColor: 'dark-3',
  borderTopColor: 'primary',
  headlineColor: 'light-1',
  slotText:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, rem.',
})

type EmitType = 'logo' | 'menu' | 'secondary'
const messageRef = ref<string>('')
const handleEmitClick = (type: EmitType): void => {
  messageRef.value = type
}
</script>

<template>
  <Story title="Footer" group="section-comp">
    <Variant title="footer-alpha">
      <section class="pt-md">
        <div v-if="messageRef !== ''" class="mb-2xl flex justify-center">
          <p class="text-xl">You emitted "{{ messageRef }}" button</p>
        </div>
        <footer-alpha
          :title="stateAlpha.title"
          :title-size="stateAlpha.titleSize"
          :title-color="stateAlpha.titleColor"
          :copy-text="stateAlpha.copyText"
          :logo="stateAlpha.logo"
          :logo-alt="stateAlpha.logoAlt"
          :logo-as-link="stateAlpha.logoAsLink"
          :logo-link="stateAlpha.logoLink"
          :logo-link-target="stateAlpha.logoLinkTarget"
          :display-social-icons="stateAlpha.displaySocialIcons"
          :social-icon-color="stateAlpha.socialIconColor"
          :social-links="stateAlpha.socialLinks"
          :nav-items="stateAlpha.navItems"
          :secondary-nav-items="stateAlpha.secondaryNavItems"
          :nav-item-as-link="stateAlpha.navItemAsLink"
          :menu-text-size="stateAlpha.menuTextSize"
          :menu-text-color="stateAlpha.menuTextColor"
          :menu-text-bold="stateAlpha.menuTextBold"
          :display-highlight="stateAlpha.displayHighlight"
          :highlight-color="stateAlpha.highlightColor"
          :bg-color="stateAlpha.bgColor"
          :border-top-color="stateAlpha.borderTopColor"
          :headline-color="stateAlpha.headlineColor"
          @logo-click="handleEmitClick('logo')"
          @menu-click="handleEmitClick('menu')"
          @secondary-menu-click="handleEmitClick('secondary')"
        >
          <div
            class="text-center text-light-1 text-sm"
            v-html="stateAlpha.slotText"
          ></div>
        </footer-alpha>
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
        <HstText title="copy-text" v-model="stateAlpha.copyText" />
        <HstText title="logo" v-model="stateAlpha.logo" />
        <HstText title="logo-alt" v-model="stateAlpha.logoAlt" />
        <HstCheckbox title="logo-as-link" v-model="stateAlpha.logoAsLink" />
        <HstText title="logo-link" v-model="stateAlpha.logoLink" />
        <HstSelect
          title="logo-link-target"
          v-model="stateAlpha.logoLinkTarget"
          :options="targetOption"
        />
        <HstCheckbox
          title="display-social-icons"
          v-model="stateAlpha.displaySocialIcons"
        />
        <HstSelect
          title="social-icon-color"
          v-model="stateAlpha.socialIconColor"
          :options="colors"
        />
        <HstCheckbox
          title="nav-items-as-link"
          v-model="stateAlpha.navItemAsLink"
        />
        <HstSelect
          title="menu-title-size"
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
          title="border-top-color"
          v-model="stateAlpha.borderTopColor"
          :options="colors"
        />
        <HstSelect
          title="headline-color"
          v-model="stateAlpha.headlineColor"
          :options="colors"
        />
        <HstTextarea v-model="stateAlpha.slotText" title="Slot Text" />
      </template>
    </Variant>
  </Story>
</template>
