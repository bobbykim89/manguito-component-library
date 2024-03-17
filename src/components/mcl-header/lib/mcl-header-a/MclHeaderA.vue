<script setup lang="ts">
import type {
  BodyText,
  ColorPalette,
  CtaTarget,
  HeadingSize,
} from '@bobbykim/manguito-theme'
import generateClass from '@bobbykim/manguito-theme'
import { useWindowScroll } from '@vueuse/core'
import { Transition, computed, ref, useSlots } from 'vue'
import HamburgerMenu from '../common/HamburgerMenu.vue'
import type { MenuCollapseType, MenuItemType } from '../common/index.types'
import NavCollapse from './NavCollapse.vue'
import NavDropdown from './NavDropdown.vue'
import NavLink from './NavLink.vue'
import type { MenuEventType, NavChildClickEventType } from './index.types'

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

const navOpen = ref<boolean>(false)
const slots = useSlots()
const emit = defineEmits([
  'toggle-menu',
  'menu-click',
  'title-click',
  'logo-click',
])
const { y } = useWindowScroll()

type EmitType = 'menu' | 'title' | 'logo'

const closeNav = (): void => {
  navOpen.value = false
}

const toggleNavButton = (e: Event): void => {
  navOpen.value = !navOpen.value
  emit('toggle-menu', e)
}

const navItemClick = (
  e: Event,
  title: string,
  link: string,
  target: CtaTarget = '_self',
  itemLink: boolean,
  emitType: EmitType
): void => {
  /**
   * @param {Event} e - $event
   * @param {string} link - menuItems[#].url / titleLink
   * @param {CtaTarget} target - menuItems[#].target / titleLinkTaget
   * @param {boolean} itemlink - menuItemAsLink /
   * @param {EmitType} emitType - Non prop value type EmitType
   */
  navOpen.value = false
  const menuEvent: MenuEventType = {
    event: e,
    title: title,
    link: link,
    target: target ? target : '_self',
  }
  if (!itemLink) {
    e.preventDefault()
  }
  if (emitType === 'menu') {
    emit('menu-click', menuEvent)
  }
  if (emitType === 'title') {
    emit('title-click', menuEvent)
  }
  if (emitType === 'logo') {
    emit('logo-click', menuEvent)
  }
}
const navChildLinkClick = (e: NavChildClickEventType): void => {
  /**
   * @param {NavChildClickEventType} e - Event emitted from dropdown/collapse click events
   */
  const { title, url, target } = e.item
  navOpen.value = false
  const menuEvent: MenuEventType = {
    event: e.event,
    title,
    link: url,
    target: target ? target : '_self',
  }
  emit('menu-click', menuEvent)
}

const getTitleClass = (size: HeadingSize, color: ColorPalette): string => {
  /**
   * @param {HeadingSize} size - titleSize
   * @param {ColorPalette} color - titleColor
   */
  const classArray: string[] = [
    generateClass('H2', size),
    generateClass('TEXTCOLOR', color),
  ]
  return classArray.join(' ')
}

/**
 * @TransitionFunctions
 * @param {HTMLElement} el - passed any since transition handlers don't accept HTMLElement (accepts Element)
 */
const onEnter = (el: any) => {
  el.style.height = 'auto'
  const endWidth = getComputedStyle(el).height
  el.style.height = '0px'
  el.offsetHeight // force repaint
  el.style.height = endWidth
}
const onAfterEnter = (el: any) => {
  el.style.height = 'auto'
}
const onLeave = (el: any) => {
  el.style.height = getComputedStyle(el).height
  el.offsetHeight // force repaint
  el.style.height = '0px'
}

const hasChildren = (item: MenuItemType | MenuCollapseType) => {
  const NavCollapse = item as MenuCollapseType
  if (typeof NavCollapse.children === 'undefined') {
    return false
  }
  return NavCollapse.children.length > 0
}

const handleFadeInOnScroll = computed(() => {
  const { fadeInOnScroll, scrollDistance } = props
  if (!fadeInOnScroll) {
    return ''
  }
  return y.value >= scrollDistance
    ? 'lg:shadow-md bg-opacity-70'
    : 'bg-opacity-100'
})
</script>

<template>
  <header
    class="w-full top-0 md:sticky items-center z-50 transition ease-in duration-500 delay-150"
    :class="[handleFadeInOnScroll, generateClass('BGCOLOR', bgColor)]"
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
              :class="[logoSmall ? 'hidden lg:inline-block' : 'inline-block']"
            />
            <img
              v-if="logoSmall"
              :src="logoSmall"
              :alt="logoAlt"
              class="inline-block lg:hidden h-full"
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
          <!-- desktop nav menu -->
          <ul class="hidden lg:flex flex-wrap">
            <li
              class="mr-xs last:mr-0"
              v-for="(item, index) in menuItems"
              :key="`menu-${index}`"
            >
              <nav-link
                v-if="!hasChildren(item)"
                :nav-item="(item as MenuItemType)"
                :menu-text-color="menuTextColor"
                :menu-text-size="menuTextSize"
                :menu-text-bold="menuTextBold"
                :display-highlight="displayHighlight"
                :highlight-color="highlightColor"
                :as-link="menuItemAsLink"
                @nav-link="
                  navItemClick(
                    $event,
                    item.title,
                    (item as MenuItemType).url,
                    (item as MenuItemType).target,
                    menuItemAsLink,
                    'menu'
                  )
                "
              ></nav-link>
              <nav-dropdown
                v-else
                :nav-item="(item as MenuCollapseType)"
                :menu-text-color="menuTextColor"
                :menu-text-size="menuTextSize"
                :menu-text-bold="menuTextBold"
                :display-highlight="displayHighlight"
                :highlight-color="highlightColor"
                :bg-color="bgColor"
                :hover-bg-color="secondaryColor"
                :as-link="menuItemAsLink"
                @nav-link="navChildLinkClick"
              ></nav-dropdown>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <hamburger-menu
          :color="secondaryColor"
          :display-border="hamburgerBorder"
          class="block lg:hidden"
          @hbg-click="toggleNavButton"
          :toggle="navOpen"
          :nav-color="bgColor"
        ></hamburger-menu>
        <div v-if="slots['nav-slot']" class="hidden lg:block">
          <slot name="nav-slot"></slot>
        </div>
      </div>
    </nav>
    <!-- mobile menu -->

    <div class="overflow-hidden lg:hidden">
      <transition
        name="collapse"
        @enter="onEnter"
        @after-enter="onAfterEnter"
        @leave="onLeave"
      >
        <div
          class="bg-opacity-80 rounded-md my-2xs mx-xs overflow-hidden"
          v-if="navOpen"
          :class="generateClass('BGCOLOR', mobileMenuBgColor)"
        >
          <ul class="flex flex-col items-center justify-center p-xs">
            <li
              class="mb-2xs last:mb-0"
              v-for="(item, index) in menuItems"
              :key="`mobile-${index}`"
            >
              <nav-link
                v-if="!hasChildren(item)"
                :nav-item="(item as MenuItemType)"
                :menu-text-color="menuTextColor"
                :menu-text-size="menuTextSize"
                :menu-text-bold="menuTextBold"
                :display-highlight="displayHighlight"
                :highlight-color="highlightColor"
                :as-link="menuItemAsLink"
                @nav-link="
                  navItemClick(
                    $event,
                    item.title,
                    (item as MenuItemType).url,
                    (item as MenuItemType).target,
                    menuItemAsLink,
                    'menu'
                  )
                "
              ></nav-link>
              <nav-collapse
                v-else
                :nav-id="item.title"
                :nav-item="(item as MenuCollapseType)"
                :menu-text-color="menuTextColor"
                :menu-text-size="menuTextSize"
                :menu-text-bold="menuTextBold"
                :display-highlight="displayHighlight"
                :highlight-color="highlightColor"
                :nav-accordion-group="title"
                :as-link="menuItemAsLink"
                @nav-link="navChildLinkClick"
              ></nav-collapse>
            </li>
          </ul>
          <div v-if="slots['mobile-slot']">
            <slot name="mobile-slot" :close-nav="closeNav"></slot>
          </div>
        </div>
      </transition>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.collapse-enter-active {
  transition: height 0.5s ease-in;
}
.collapse-leave-active {
  transition: height 0.5s ease-out;
}
</style>
