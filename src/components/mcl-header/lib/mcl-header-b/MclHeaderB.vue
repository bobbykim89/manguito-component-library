<script setup lang="ts">
import type {
  BodyText,
  ColorPalette,
  CtaTarget,
  HeadingSize,
} from '@bobbykim/manguito-theme'
import generateClass, { HeaderVertical } from '@bobbykim/manguito-theme'
import { computed } from 'vue'
import type { MenuCollapseType, MenuItemType } from '../common/index.types'
import NavCollapseVertical from './NavCollapseVertical.vue'
import NavLinkVertical from './NavLinkVertical.vue'

const props = withDefaults(
  defineProps<{
    logo: string
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
    drawerBtnColor?: ColorPalette
    drawerBtnBorder?: boolean
    headerWidth?: number
  }>(),
  {
    titleBlockAsLink: true,
    titleBlockLinkTarget: '_self',
    titleSize: 'md',
    titleColor: 'dark-3',
    menuItemAsLink: true,
    menuTextSize: 'md',
    menuTextColor: 'dark-3',
    menuTextBold: false,
    displayHighlight: true,
    highlightColor: 'primary',
    bgColor: 'light-1',
    drawerBtnColor: 'dark-1',
    drawerBtnBorder: true,
    headerWidth: 160,
  }
)
const slots = defineSlots<{
  default: any
  'content-bottom': any
  'mobile-bottom'(props: { headerClose: () => void }): any
}>()
const emit = defineEmits<{
  (e: 'toggle-drawer', event: Event, open: boolean): void
}>()
const handleDrawerClick = (e: Event, status: boolean) => {
  emit('toggle-drawer', e, status)
}
const titleTextClass = computed<string>(() => {
  const { titleSize, titleColor } = props
  const classArray = [
    generateClass('H3', titleSize),
    generateClass('TEXTCOLOR', titleColor),
  ]
  return classArray.join(' ')
})
const hasChildren = (item: MenuItemType | MenuCollapseType) => {
  const NavCollapse = item as MenuCollapseType
  if (typeof NavCollapse.children === 'undefined') {
    return false
  }
  return NavCollapse.children.length > 0
}
</script>

<template>
  <HeaderVertical
    :bg-color="bgColor"
    :drawer-btn-color="drawerBtnColor"
    :drawer-btn-border="drawerBtnBorder"
    :header-width="headerWidth"
    @toggle-drawer="handleDrawerClick"
  >
    <template #default>
      <slot name="default"></slot>
    </template>
    <template #content>
      <div>
        <!-- logo block -->
        <div class="p-md">
          <a :href="titleBlockLink" :target="titleBlockLinkTarget">
            <img :src="logo" :alt="logoAlt" class="h-full inline-block" />
          </a>
        </div>
        <!-- title block -->
        <div>
          <h3
            :class="titleTextClass"
            class="text-center mb-md"
            v-html="title"
          ></h3>
        </div>
        <!-- menu item block -->
        <ul class="flex flex-col">
          <li v-for="(item, index) in menuItems" :key="`menu-${index}`">
            <NavLinkVertical
              v-if="!hasChildren(item)"
              :menu-item="(item as MenuItemType)"
            />
            <NavCollapseVertical
              v-else
              :nav-id="item.title"
              nav-location="desktop"
              :nav-accordion-group="title"
              :menu-item="(item as MenuCollapseType)"
            />
          </li>
        </ul>
      </div>
    </template>
    <template #content-bottom>
      <div>bottom</div>
    </template>
    <template #mobile-content>
      <div>mobile</div>
    </template>
  </HeaderVertical>
</template>

<style scoped lang="ts"></style>
