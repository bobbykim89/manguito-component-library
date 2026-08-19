<script setup lang="ts">
import type {
  BodyText,
  ColorPalette,
  CtaTarget,
  HeadingSize,
} from '@bobbykim/manguito-theme'
import { generateClass } from '@bobbykim/manguito-theme'
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
    showSocialIcons?: boolean
    socialIconColor: ColorPalette
    socialLinks?: SocialUrl
    menuItems: MenuItemType[]
    secondaryMenuItems?: MenuItemType[]
    menuItemAsLink?: boolean
    menuTextSize?: BodyText
    menuTextColor?: ColorPalette
    menuTextBold?: boolean
    showHighlight?: boolean
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
    showSocialIcons: true,
    socialIconColor: 'light-1',
    menuItemAsLink: false,
    menuTextSize: 'md',
    menuTextColor: 'light-1',
    menuTextBold: false,
    showHighlight: true,
    highlightColor: 'primary',
    bgColor: 'dark-3',
    borderTopColor: 'primary',
    headlineColor: 'light-1',
  },
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
    generateClass.bgColorVariant({ color: bgColor }),
    generateClass.borderColorVariant({ color: borderTopColor }),
  ]
  return classArray.join(' ')
})
const titleClass = computed<string>(() => {
  const { titleSize, titleColor } = props
  const classArray: string[] = [
    generateClass.h2Variant({ size: titleSize }),
    generateClass.textColorVariant({ color: titleColor }),
  ]
  return classArray.join(' ')
})
const menuItemClass = computed<string>(() => {
  const { menuTextSize, menuTextColor, menuTextBold } = props
  const classArray: string[] = [
    generateClass.bodyTextVariant({ size: menuTextSize }),
    generateClass.textColorVariant({ color: menuTextColor }),
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
        class="mb-xs flex flex-col flex-wrap justify-between border-b-2 px-xs md:mb-md md:flex-row md:px-md"
        :class="generateClass.borderColorVariant({ color: headlineColor })"
      >
        <div class="mb-xs h-lg align-middle md:h-xl">
          <a
            :href="logoLink"
            :target="logoLinkTarget"
            class="inline-block h-full rounded-md ring-offset-2 ring-offset-transparent transition-all duration-300 ease-linear outline-none focus:ring-2"
            :class="generateClass.ringColorVariant({ color: titleColor })"
            @click="handleTitleClick($event)"
          >
            <img class="inline-block h-full" :src="logo" :alt="logoAlt" />
          </a>
        </div>
        <div
          v-if="showSocialIcons"
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
        class="flex flex-wrap items-center gap-6 md:items-start md:justify-between md:gap-8"
      >
        <div class="grid basis-full justify-items-center gap-2 md:basis-1/3">
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
          class="flex grow flex-col items-center justify-between gap-xs text-center text-sm sm:flex-row sm:items-start sm:text-left md:basis-1/2 md:flex-row md:justify-around"
        >
          <ul
            class="flex flex-wrap items-center justify-center gap-2xs md:flex-col"
          >
            <li
              v-for="(item, i) in menuItems"
              :key="`first-nav-${i}`"
              class="inline-block"
            >
              <a
                :href="item.url"
                :target="item.target ? item.target : '_self'"
                class="nav__text tracking-wide outline-none"
                :class="menuItemClass"
                @click="handleMenuItemClick($event, item)"
                v-html="item.title"
              >
              </a>
              <div
                v-if="showHighlight"
                class="nav__decorator relative top-3xs h-3xs"
                :class="
                  generateClass.beforeBgColorVariant({ color: highlightColor })
                "
              ></div>
            </li>
          </ul>

          <!-- secondary menu -->
          <ul
            v-if="secondaryMenuItems"
            class="flex flex-wrap items-center justify-center gap-2xs md:flex-col"
          >
            <li
              v-for="(item, i) in secondaryMenuItems"
              :key="`second-nav-${i}`"
              class="inline-block"
            >
              <a
                :href="item.url"
                :target="item.target ? item.target : '_self'"
                class="nav__text tracking-wide outline-none"
                :class="menuItemClass"
                @click="handleMenuItemClick($event, item)"
                v-html="item.title"
              >
              </a>
              <div
                v-if="showHighlight"
                class="nav__decorator relative top-3xs h-3xs"
                :class="
                  generateClass.beforeBgColorVariant({ color: highlightColor })
                "
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
