<script setup lang="ts">
import type {
  ColorPalette,
  HeadingSize,
  CtaTarget,
  BodyText,
} from '@bobbykim/manguito-theme'
import type { MenuItemType, SocialUrl } from './index.types'
import generateClass from '@bobbykim/manguito-theme'
import SocialIcons from './SocialIcons.vue'

const props = withDefaults(
  defineProps<{
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
    logoAsLink: true,
    logoLinkTarget: '_self',
    displaySocialIcons: true,
    socialIconColor: 'light-1',
    menuItemAsLink: true,
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

const emit = defineEmits(['menu-click', 'logo-click', 'secondary-menu-click'])
type EmitType = 'menu' | 'logo' | 'secondary'

const getFooterClass = (bg: ColorPalette, border: ColorPalette): string => {
  /**
   * @bg - bgColor
   * @border - borderTopColor
   */

  const classArray: string[] = [
    generateClass('BGCOLOR', bg),
    generateClass('BORDER', border),
  ]
  return classArray.join(' ')
}
const getTitleClass = (size: HeadingSize, color: ColorPalette): string => {
  /**
   * @size - titleSize
   * @color - titleColor
   */
  const classArray: string[] = [
    generateClass('H2', size),
    generateClass('TEXTCOLOR', color),
  ]
  return classArray.join(' ')
}
const getMenuItemClass = (
  size: BodyText,
  color: ColorPalette,
  bold: boolean
): string => {
  /**
   * @size - menuTextSize
   * @color - menuTextColor
   * @bold - menuTextBold
   */
  const classArray: string[] = [
    generateClass('BODYTEXT', size),
    generateClass('TEXTCOLOR', color),
  ]
  if (bold) {
    classArray.push('font-bold')
  }
  return classArray.join(' ')
}

const footerItemClick = (
  e: Event,
  title: string,
  link: string,
  target: string | undefined,
  itemLink: boolean,
  emitType: EmitType
): void => {
  /**
   * @e - $event
   * @title - menuItems[#].title / title
   * @link - menuItems[#].url / logoLink
   * @target - menuItems[#].target / logoLinkTaget
   * @itemlink - menuItemAsLink / logoAsLink
   * @emitType - Non prop value type EmitType
   */
  e.preventDefault()
  if (itemLink) {
    window.open(link, target)
  } else {
    if (emitType === 'menu') {
      emit('menu-click', { event: e, title: title, link: link, target: target })
    }
    if (emitType === 'logo') {
      emit('logo-click', { event: e, title: title, link: link, target: target })
    }
    if (emitType === 'secondary') {
      emit('secondary-menu-click', {
        event: e,
        title: title,
        link: link,
        target: target,
      })
    }
  }
}
</script>

<template>
  <footer
    class="border-t-2 py-6 sm:py-8 md:py-12"
    :class="getFooterClass(bgColor, borderTopColor)"
  >
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
            @click="
              footerItemClick(
                $event,
                title,
                logoLink,
                logoLinkTarget,
                logoAsLink,
                'logo'
              )
            "
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
            :class="getTitleClass(titleSize, titleColor)"
            v-html="title"
          ></h2>
          <small v-if="copyText" class="text-xs text-white align-middle mb-2">
            &copy; {{ copyText + ' ' + new Date().getFullYear() }}
          </small>
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
                :target="item.target"
                class="tracking-wide outline-none nav__text"
                :class="
                  getMenuItemClass(menuTextSize, menuTextColor, menuTextBold)
                "
                @click="
                  footerItemClick(
                    $event,
                    item.title,
                    item.url,
                    item.target,
                    menuItemAsLink,
                    'menu'
                  )
                "
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
                :target="item.target"
                class="tracking-wide outline-none nav__text"
                :class="
                  getMenuItemClass(menuTextSize, menuTextColor, menuTextBold)
                "
                @click="
                  footerItemClick(
                    $event,
                    item.title,
                    item.url,
                    item.target,
                    menuItemAsLink,
                    'secondary'
                  )
                "
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
