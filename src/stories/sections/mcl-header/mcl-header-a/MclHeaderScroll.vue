<script setup lang="ts">
import type { MenuCollapseType, MenuItemType } from '@/components/mcl-header'
import { MclHeaderA } from '@/components/mcl-header'
import type {
  BodyText,
  ColorPalette,
  CtaTarget,
  HeadingSize,
} from '@bobbykim/manguito-theme'

const props = withDefaults(
  defineProps<{
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
    menuItems: Array<MenuItemType | MenuCollapseType>
    menuItemAsLink?: boolean
    menuTextSize?: BodyText
    menuTextColor?: ColorPalette
    menuTextBold?: boolean
    displayHighlight?: boolean
    highlightColor?: ColorPalette
    bgColor?: ColorPalette
    mobileMenuBgColor?: ColorPalette
    secondaryColor?: ColorPalette
    hamburgerBorder?: boolean
    fadeInOnScroll?: boolean
    scrollDistance?: number
  }>(),
  {
    logoAsLink: true,
    logoLinkTarget: '_self',
    titleSize: 'md',
    titleColor: 'dark-3',
    titleAsLink: true,
    titleLinkTarget: '_self',
    menuItemAsLink: true,
    menuTextSize: 'md',
    menuTextColor: 'dark-3',
    menuTextBold: false,
    displayHighlight: true,
    highlightColor: 'primary',
    bgColor: 'light-1',
    mobileMenuBgColor: 'light-2',
    secondaryColor: 'dark-1',
    hamburgerBorder: true,
    fadeInOnScroll: true,
    scrollDistance: 50,
  }
)

const handleMenuClick = (e: Event) => {
  console.log(e)
}
</script>

<template>
  <section>
    <mcl-header-a v-bind="props" @menu-click="handleMenuClick"></mcl-header-a>
    <div class="h-[1000px] bg-primary"></div>
    <div class="h-[1000px] bg-secondary"></div>
  </section>
</template>

<style scoped></style>
