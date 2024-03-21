<script setup lang="ts">
import type {
  BodyText,
  ColorPalette,
  CtaTarget,
  HeadingSize,
} from '@bobbykim/manguito-theme'
import generateClass, { HeaderHorizontal } from '@bobbykim/manguito-theme'
import { ref } from 'vue'
import type { MenuCollapseType, MenuItemType } from '../common/index.types'
import NavCollapse from './NavCollapse.vue'
import NavDropdown from './NavDropdown.vue'
import NavLink from './NavLink.vue'

const props = withDefaults(
  defineProps<{
    logo: string
    logoSmall?: string
    logoAlt?: string
    title: string
    titleSize?: HeadingSize
    titleColor?: ColorPalette
    titleBlockAsLink?: boolean
    titleBlockLinkTarget?: CtaTarget
    titleBlockLink: string
    menuItems: Array<MenuItemType | MenuCollapseType>
    menuItemAsLink?: boolean
    menuTextSize?: BodyText
    menuTextColor?: ColorPalette
    menuTextBold?: boolean
    displayHighlight?: boolean
    highlightColor?: ColorPalette
    bgColor?: ColorPalette
    mobileMenuBgColor?: ColorPalette
    drawerBtnColor?: ColorPalette
    drawerBtnBorder?: boolean
    fadeInOnScroll?: boolean
    scrollDistance?: number
  }>(),
  {
    logoAlt: '',
    titleSize: 'md',
    titleColor: 'dark-3',
    titleBlockAsLink: false,
    titleBlockLinkTarget: '_self',
    menuItemAsLink: false,
    menuTextSize: 'md',
    menuTextColor: 'dark-3',
    menuTextBold: false,
    displayHighlight: true,
    highlightColor: 'primary',
    bgColor: 'light-1',
    mobileMenuBgColor: 'light-2',
    drawerBtnColor: 'dark-1',
    drawerBtnBorder: true,
    fadeInOnScroll: true,
    scrollDistance: 50,
  }
)

const componentRef = ref<InstanceType<typeof HeaderHorizontal>>()
const slots = defineSlots<{
  'content-right': any
  'mobile-bottom'(props: { headerClose: () => void }): any
}>()
const emit = defineEmits<{
  (e: 'toggle-drawer', event: Event, open: boolean): void
  (e: 'title-click', event: Event, url: string, target: CtaTarget): void
  (e: 'menu-click', event: Event, item: MenuItemType): void
  (e: 'collapse-click', event: Event, title: string, visible: boolean): void
}>()

const closeNav = (): void => {
  componentRef.value?.headerClose()
}

const handleTitleClick = (e: Event): void => {
  const { titleBlockAsLink, titleBlockLink, titleBlockLinkTarget } = props
  if (!titleBlockAsLink) {
    e.preventDefault()
  }
  emit('title-click', e, titleBlockLink, titleBlockLinkTarget)
  closeNav()
}
const handleMenuItemClick = (e: Event, item: MenuItemType): void => {
  const { menuItemAsLink } = props
  if (!menuItemAsLink) {
    e.preventDefault()
  }
  emit('menu-click', e, item)
  closeNav()
}
const handleCollapsableMenuClick = (
  e: Event,
  title: string,
  visible: boolean
) => {
  emit('collapse-click', e, title, visible)
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

const hasChildren = (item: MenuItemType | MenuCollapseType) => {
  const NavCollapse = item as MenuCollapseType
  if (typeof NavCollapse.children === 'undefined') {
    return false
  }
  return NavCollapse.children.length > 0
}

defineExpose({
  headerClose: closeNav,
})
</script>

<template>
  <HeaderHorizontal
    ref="componentRef"
    :bg-color="bgColor"
    :drawer-btn-border="drawerBtnBorder"
    :drawer-btn-color="drawerBtnColor"
    :fade-in-on-scroll="fadeInOnScroll"
    :mobile-menu-bg-color="mobileMenuBgColor"
  >
    <template #content>
      <div class="flex flex-shrink-0 items-center self-center">
        <div class="h-md md:h-lg lg:h-xl mr-2xs md:mr-sm align-middle">
          <a
            :href="titleBlockLink"
            :target="titleBlockLinkTarget"
            @click="handleTitleClick"
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
            :href="titleBlockLink"
            :target="titleBlockLinkTarget"
            @click="handleTitleClick"
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
                @nav-link="handleMenuItemClick"
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
                :as-link="menuItemAsLink"
                @child-click="handleMenuItemClick"
                @label-click="handleCollapsableMenuClick"
              ></nav-dropdown>
            </li>
          </ul>
        </div>
      </div>
    </template>
    <template #content-right>
      <div v-if="slots['content-right']" class="hidden lg:block">
        <slot name="content-right"></slot>
      </div>
    </template>
    <template #mobile-content="{ headerClose }">
      <div>
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
              @nav-link="handleMenuItemClick"
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
              @child-click="handleMenuItemClick"
              @label-click="handleCollapsableMenuClick"
            ></nav-collapse>
          </li>
        </ul>
        <div v-if="slots['mobile-bottom']">
          <slot name="mobile-bottom" :header-close="closeNav"></slot>
        </div>
      </div>
    </template>
  </HeaderHorizontal>
</template>
