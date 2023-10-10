<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, Transition } from 'vue'
import type {
  ColorPalette,
  CtaTarget,
  HeadingSize,
  BodyText,
} from '@bobbykim/manguito-theme'
import generateClass from '@bobbykim/manguito-theme'
import type {
  NavItemType,
  NavCollapseType,
  NavChildClickEventType,
} from './index.type'
// Import hamburgerMenu
import HamburgerMenu from './lib/HamburgerMenu.vue'
import NavLink from './lib/NavLink.vue'
import NavDropdown from './lib/NavDropdown.vue'
import NavCollapse from './lib/NavCollapse.vue'

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
    navItems: Array<NavItemType | NavCollapseType>
    navItemAsLink?: boolean
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
    navItemAsLink: true,
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

const navScroll = ref<boolean>(false)
const navOpen = ref<boolean>(false)
const emit = defineEmits([
  'toggle-menu',
  'menu-click',
  'title-click',
  'logo-click',
])

type EmitType = 'menu' | 'title' | 'logo'

const closeNav = (e: Event): void => {
  navOpen.value = false
}

const toggleNavButton = (e: Event): void => {
  navOpen.value = !navOpen.value
  emit('toggle-menu', e)
}

const handleScroll = (): any => {
  if (typeof window !== undefined) {
    return
  }
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
  target: string = '_self',
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
  }
}
const navChildLinkClick = (e: NavChildClickEventType): void => {
  /**
   * @param {NavChildClickEventType} e - Event emitted from dropdown/collapse click events
   */
  const { title, url, target } = e.item
  e.event.preventDefault()
  navOpen.value = false
  if (props.navItemAsLink) {
    window.open(url, target)
  } else {
    emit('menu-click', { event: e, title, link: url, target })
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

// transition functions
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
const hasChildren = (item: NavItemType | NavCollapseType) => {
  const NavCollapse = item as NavCollapseType
  if (typeof NavCollapse.children === 'undefined') {
    return false
  }
  return NavCollapse.children.length > 0
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll())
  }
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll())
})
</script>

<template>
  <header
    :class="[
      navScroll ? 'lg:shadow-md bg-opacity-70' : 'bg-opacity-100',
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
          <!-- desktop nav menu -->
          <ul class="hidden md:flex flex-wrap">
            <li
              class="mr-xs last:mr-0"
              v-for="(item, index) in navItems"
              :key="`menu-${index}`"
            >
              <nav-link
                v-if="!hasChildren(item)"
                :nav-item="(item as NavItemType)"
                :menu-text-color="menuTextColor"
                :menu-text-size="menuTextSize"
                :menu-text-bold="menuTextBold"
                :display-highlight="displayHighlight"
                :highlight-color="highlightColor"
                @nav-link="
                  navItemClick(
                    $event,
                    item.title,
                    (item as NavItemType).url,
                    (item as NavItemType).target,
                    navItemAsLink,
                    'menu'
                  )
                "
              ></nav-link>
              <nav-dropdown
                v-else
                :nav-item="(item as NavCollapseType)"
                :menu-text-color="menuTextColor"
                :menu-text-size="menuTextSize"
                :menu-text-bold="menuTextBold"
                :display-highlight="displayHighlight"
                :highlight-color="highlightColor"
                :bg-color="bgColor"
                :hover-bg-color="secondaryColor"
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
          class="block md:hidden"
          @hbg-click="toggleNavButton"
          :toggle="navOpen"
          :nav-color="bgColor"
        ></hamburger-menu>
        <div class="hidden md:block">
          <slot name="nav-slot"></slot>
        </div>
      </div>
    </nav>
    <!-- mobile menu -->

    <div class="overflow-hidden md:hidden">
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
              v-for="(item, index) in navItems"
              :key="`mobile-${index}`"
            >
              <nav-link
                v-if="!hasChildren(item)"
                :nav-item="(item as NavItemType)"
                :menu-text-color="menuTextColor"
                :menu-text-size="menuTextSize"
                :menu-text-bold="menuTextBold"
                :display-highlight="displayHighlight"
                :highlight-color="highlightColor"
                @nav-link="
                  navItemClick(
                    $event,
                    item.title,
                    (item as NavItemType).url,
                    (item as NavItemType).target,
                    navItemAsLink,
                    'menu'
                  )
                "
              ></nav-link>
              <nav-collapse
                v-else
                :nav-id="item.title"
                :nav-item="(item as NavCollapseType)"
                :menu-text-color="menuTextColor"
                :menu-text-size="menuTextSize"
                :menu-text-bold="menuTextBold"
                :display-highlight="displayHighlight"
                :highlight-color="highlightColor"
                :nav-accordion-group="title"
                @nav-link="navChildLinkClick"
              ></nav-collapse>
            </li>
          </ul>
          <div>
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
