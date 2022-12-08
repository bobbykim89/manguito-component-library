<script setup lang="ts">
import { ref, withDefaults, computed, onMounted, onBeforeUnmount } from 'vue'
import type {
  ColorPalette,
  CtaTarget,
  HeadingSize,
  BodyText,
} from '@bobbykim89/manguito-theme/theme/theme.types'
import generateClass from '@bobbykim89/manguito-theme'
// Import hamburgerMenu
import HamburgerMenu from './lib/HamburgerMenu.vue'

export interface NavItemType {
  title: string
  url: string
  target?: CtaTarget
}

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
  }>(),
  {
    logoAsLink: true,
    logoLinkTarget: '_self',
    titleSize: 'md',
    titleColor: 'dark-3',
    titleAsLink: true,
    titleLinkTarget: '_self',
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
  }
)

const navScroll = ref<boolean>(false)
const navOpen = ref<boolean>(false)
const emit = defineEmits([
  'toggle-menu',
  'menu-click',
  'title-click',
  'logo-click',
])

type EmitType = 'menu' | 'title' | 'logo'

const toggleNavButton = (e: Event): void => {
  navOpen.value = !navOpen.value
  emit('toggle-menu', e)
}

const handleScroll = (): any => {
  if (window.scrollY >= props.scrollDistance) {
    navScroll.value = true
  } else {
    navScroll.value = false
  }
}

const navItemClick = (
  e: Event,
  title: string,
  link: string,
  target: string,
  itemLink: boolean,
  emitType: EmitType
): void => {
  /**
   * @e - $event
   * @link - navItems[#].url / titleLink
   * @target - navItems[#].target / titleLinkTaget
   * @itemlink - navItemAsLink /
   * @emitType - Non prop value type EmitType
   */
  e.preventDefault()
  navOpen.value = false
  if (itemLink) {
    window.open(link, target)
  } else {
    if (emitType === 'menu') {
      emit('menu-click', { event: e, title: title, link: link, target: target })
    }
    if (emitType === 'title') {
      emit('title-click', {
        event: e,
        title: title,
        link: link,
        target: target,
      })
    }
    if (emitType === 'logo') {
      emit('logo-click', { event: e, title: title, link: link, target: target })
    }
    // console.log('emit menu click: ', e, link, target)
  }
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

// collapse/expand mobile menu
const mobileMenu = ref()
const mobileMenuHeight = ref<number>()

const initObserver = (): ResizeObserver => {
  const observer = new ResizeObserver(() => {
    mobileMenuHeight.value = mobileMenu.value.scrollHeight
  })
  return observer
}

const menuHeightVal = computed(() => {
  return {
    height:
      mobileMenu.value && navOpen.value ? mobileMenuHeight.value + 'px' : '0px',
  }
})

onMounted(() => {
  initObserver().observe(mobileMenu.value)
  window.addEventListener('scroll', handleScroll())
})
onBeforeUnmount(() => {
  initObserver().unobserve(mobileMenu.value)
  window.removeEventListener('scroll', handleScroll())
})
</script>

<template>
  <header
    :class="[
      navScroll ? 'lg:shadow-md bg-opacity-70' : 'bg-opacity-80',
      'w-full top-0 md:sticky items-center z-50 transition ease-in duration-500 delay-150',
      generateClass('BGCOLOR', bgColor),
    ]"
  >
    <nav
      class="flex flex-wrap items-center py-xs md:py-2xs mx-xs md:mx-sm align-middle justify-between sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px]"
    >
      <div class="flex flex-shrink-0 items-center self-center">
        <div class="h-md md:h-lg lg:h-xl mr-2xs md:mr-sm align-middle">
          <a
            :href="logoLink"
            :target="logoLinkTarget"
            @click="
              navItemClick(
                $event,
                title,
                logoLink,
                logoLinkTarget,
                logoAsLink,
                'logo'
              )
            "
          >
            <img
              :src="logo"
              :alt="logoAlt"
              class="h-full"
              :class="[logoSmall ? 'hidden md:inline-block' : 'inline-block']"
            />
            <img
              v-if="logoSmall"
              :src="logoSmall"
              :alt="logoAlt"
              class="inline-block md:hidden h-full"
            />
          </a>
        </div>
        <div class="flex flex-col justify-center ml-2">
          <a
            :href="titleLink"
            :target="titleLinkTarget"
            @click="
              navItemClick(
                $event,
                title,
                titleLink,
                titleLinkTarget,
                titleAsLink,
                'title'
              )
            "
          >
            <h2
              class="inline-block align-middle tracking-wider"
              :class="getTitleClass(titleSize, titleColor)"
              v-html="title"
            ></h2>
          </a>
          <li class="hidden md:flex flex-wrap">
            <ul
              class="mr-xs last:mr-0"
              v-for="(item, index) in navItems"
              :key="`menu-${index}`"
            >
              <a
                :href="item.url"
                :target="item.target"
                v-html="item.title"
                class="tracking-wider align-middle outline-none nav__text"
                :class="
                  getMenuItemClass(menuTextSize, menuTextColor, menuTextBold)
                "
                @click="
                  navItemClick(
                    $event,
                    item.title,
                    item.url,
                    item.target,
                    navItemAsLink,
                    'menu'
                  )
                "
              ></a>
              <div
                v-if="displayHighlight"
                class="relative -top-[2px] h-[6px] nav__decorator"
                :class="generateClass('BEFOREBG', highlightColor)"
              ></div>
            </ul>
          </li>
        </div>
      </div>
      <div>
        <hamburger-menu
          :color="hamburgerColor"
          :display-border="hamburgerBorder"
          class="block md:hidden"
          @hbg-click="toggleNavButton"
        ></hamburger-menu>
        <div class="hidden md:block">
          <slot name="nav-slot"></slot>
        </div>
      </div>
    </nav>
    <!-- mobile menu -->
    <div
      class="h-auto overflow-hidden md:hidden"
      :class="[
        navOpen
          ? 'transition-all duration-500 ease-in'
          : 'transition-all duration-500 ease-out',
        ,
      ]"
      ref="mobileMenu"
      :style="menuHeightVal"
    >
      <div
        class="bg-opacity-80 rounded-md my-2xs mx-xs overflow-hidden"
        :class="generateClass('BGCOLOR', mobileMenuBgColor)"
      >
        <ul class="flex flex-col items-center justify-center p-xs">
          <li
            class="mb-2xs last:mb-0"
            v-for="(item, index) in navItems"
            :key="`mobile-${index}`"
          >
            <a
              :href="item.url"
              :target="item.target"
              v-html="item.title"
              class="tracking-wider outline-none align-middle nav__text"
              :class="
                getMenuItemClass(menuTextSize, menuTextColor, menuTextBold)
              "
              @click="
                navItemClick(
                  $event,
                  item.title,
                  item.url,
                  item.target,
                  navItemAsLink,
                  'menu'
                )
              "
            ></a>
            <div
              v-if="displayHighlight"
              class="relative h-3xs -top-[2px] nav__decorator"
              :class="generateClass('BEFOREBG', highlightColor)"
            ></div>
          </li>
        </ul>
        <div>
          <slot name="mobile-slot"></slot>
        </div>
      </div>
    </div>
  </header>
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
