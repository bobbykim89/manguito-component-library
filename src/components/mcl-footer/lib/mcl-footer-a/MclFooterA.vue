<script setup lang="ts">
import type {
  BodyText,
  ColorPalette,
  CtaTarget,
  HeadingSize,
} from '@bobbykim/manguito-theme'
import generateClass from '@bobbykim/manguito-theme'
import SocialIcons from './SocialIcons.vue'
import type { MenuItemType, SocialUrl } from './index.types'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    title: string
    titleSize?: HeadingSize
    titleColor?: ColorPalette
    logo: string
    logoAlt?: string
    logoAsLink?: boolean
    logoLink: string
    logoLinkTarget?: CtaTarget
    displaySocialIcons?: boolean
    socialIconColor: ColorPalette
    socialLinks?: SocialUrl
    menuItems: MenuItemType[]
    secondaryMenuItems?: MenuItemType[]
    menuItemAsLink?: boolean
    menuTextSize?: BodyText
    menuTextColor?: ColorPalette
    menuTextBold?: boolean
    displayHighlight?: boolean
    highlightColor?: ColorPalette
    bgColor?: ColorPalette
    borderTopColor?: ColorPalette
    headlineColor?: ColorPalette
  }>(),
  {
    titleSize: 'md',
    titleColor: 'light-1',
    logoAsLink: false,
    logoLinkTarget: '_self',
    displaySocialIcons: true,
    socialIconColor: 'light-1',
    menuItemAsLink: false,
    menuTextSize: 'md',
    menuTextColor: 'light-1',
    menuTextBold: false,
    displayHighlight: true,
    highlightColor: 'primary',
    bgColor: 'dark-3',
    borderTopColor: 'primary',
    headlineColor: 'light-1',
  }
)

const slots = defineSlots<{
  default: any
}>()
const emit = defineEmits<{
  (e: 'logo-click', event: Event, link: string, target: CtaTarget): void
  (e: 'menu-click', event: Event, item: MenuItemType): void
}>()

const footerClass = computed<string>(() => {
  const { bgColor, borderTopColor } = props

  const classArray: string[] = [
    generateClass('BGCOLOR', bgColor),
    generateClass('BORDER', borderTopColor),
  ]
  return classArray.join(' ')
})
const titleClass = computed<string>(() => {
  const { titleSize, titleColor } = props
  const classArray: string[] = [
    generateClass('H2', titleSize),
    generateClass('TEXTCOLOR', titleColor),
  ]
  return classArray.join(' ')
})
const menuItemClass = computed<string>(() => {
  const { menuTextSize, menuTextColor, menuTextBold } = props
  const classArray: string[] = [
    generateClass('BODYTEXT', menuTextSize),
    generateClass('TEXTCOLOR', menuTextColor),
  ]
  if (menuTextBold) {
    classArray.join('font-bold')
  }
  return classArray.join(' ')
})

const handleTitleClick = (e: Event) => {
  const { logoAsLink, logoLink, logoLinkTarget } = props
  !logoAsLink && e.preventDefault()
  emit('logo-click', e, logoLink, logoLinkTarget)
}

const handleMenuItemClick = (e: Event, item: MenuItemType) => {
  const { menuItemAsLink } = props
  !menuItemAsLink && e.preventDefault()
  emit('menu-click', e, item)
}
</script>

<template>
  <footer class="border-t-2 py-6 sm:py-8 md:py-12" :class="footerClass">
    <div class="container px-xs md:px-lg lg:px-xl">
      <div
        class="flex flex-col md:flex-row flex-wrap justify-between mb-xs md:mb-md px-xs md:px-md border-b-2"
        :class="generateClass('BORDER', headlineColor)"
      >
        <div class="h-lg md:h-xl align-middle mb-xs">
          <a
            :href="logoLink"
            :target="logoLinkTarget"
            class="h-full inline-block outline-none focus:ring-2 ring-offset-2 ring-offset-transparent rounded-md transition-all duration-300 ease-linear"
            :class="generateClass('RINGCOLOR', titleColor)"
            @click="handleTitleClick($event)"
          >
            <img class="inline-block h-full" :src="logo" :alt="logoAlt" />
          </a>
        </div>
        <div
          v-if="displaySocialIcons"
          class="mb-xs flex items-center justify-end md:justify-center"
        >
          <!-- social icons -->
          <social-icons
            :social-links="socialLinks"
            :icon-color="socialIconColor"
          ></social-icons>
        </div>
      </div>
      <div
        class="flex flex-wrap md:justify-between items-center md:items-start gap-6 md:gap-8"
      >
        <div class="grid gap-2 justify-items-center basis-full md:basis-1/3">
          <h2
            class="inline-block align-middle tracking-wider"
            :class="titleClass"
            v-html="title"
          ></h2>
          <div class="px-xs md:px-0">
            <slot></slot>
          </div>
        </div>
        <nav
          class="text-sm flex flex-col md:flex-row items-center sm:items-start sm:flex-row text-center sm:text-left gap-xs justify-between md:justify-around grow md:basis-1/2"
        >
          <ul
            class="flex flex-wrap md:flex-col justify-center items-center gap-2xs"
          >
            <li
              v-for="(item, i) in menuItems"
              :key="`first-nav-${i}`"
              class="inline-block"
            >
              <a
                :href="item.url"
                :target="item.target ? item.target : '_self'"
                class="tracking-wide outline-none nav__text"
                :class="menuItemClass"
                @click="handleMenuItemClick($event, item)"
                v-html="item.title"
              >
              </a>
              <div
                v-if="displayHighlight"
                class="relative top-3xs h-3xs nav__decorator"
                :class="generateClass('BEFOREBG', highlightColor)"
              ></div>
            </li>
          </ul>

          <!-- secondary menu -->
          <ul
            v-if="secondaryMenuItems"
            class="flex flex-wrap md:flex-col justify-center items-center gap-2xs"
          >
            <li
              v-for="(item, i) in secondaryMenuItems"
              :key="`second-nav-${i}`"
              class="inline-block"
            >
              <a
                :href="item.url"
                :target="item.target ? item.target : '_self'"
                class="tracking-wide outline-none nav__text"
                :class="menuItemClass"
                @click="handleMenuItemClick($event, item)"
                v-html="item.title"
              >
              </a>
              <div
                v-if="displayHighlight"
                class="relative top-3xs h-3xs nav__decorator"
                :class="generateClass('BEFOREBG', highlightColor)"
              ></div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </footer>
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
