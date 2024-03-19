<script setup lang="ts">
import type {
  BodyText,
  ColorPalette,
  CtaTarget,
  HeadingSize,
} from '@bobbykim/manguito-theme'
import generateClass, { HeaderVertical } from '@bobbykim/manguito-theme'
import { computed, ref } from 'vue'
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
    logoAlt: '',
    titleBlockAsLink: false,
    titleBlockLinkTarget: '_self',
    titleSize: 'md',
    titleColor: 'dark-3',
    menuItemAsLink: false,
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
  (e: 'title-click', event: Event, url: string, target: CtaTarget): void
  (e: 'menu-click', event: Event, item: MenuItemType): void
  (e: 'collapse-click', event: Event, title: string, visible: boolean): void
}>()
const componentRef = ref<InstanceType<typeof HeaderVertical>>()
const collapseRef = ref<InstanceType<typeof NavCollapseVertical>[]>()
const handleDrawerClick = (e: Event, status: boolean) => {
  emit('toggle-drawer', e, status)
}
const closeDrawer = (): void => {
  componentRef.value?.headerClose()
}
const closeCollapse = (): void => {
  for (let i = 0; i < collapseRef.value!.length; i++) {
    collapseRef.value![i].closeCollapse()
  }
}
const handleTitleClick = (e: Event) => {
  const { titleBlockAsLink, titleBlockLink, titleBlockLinkTarget } = props
  if (!titleBlockAsLink) {
    e.preventDefault()
  }
  emit('title-click', e, titleBlockLink, titleBlockLinkTarget)
  closeDrawer()
  closeCollapse()
}
const handleMenuClick = (e: Event, item: MenuItemType) => {
  const { menuItemAsLink } = props
  if (!menuItemAsLink) {
    e.preventDefault()
  }
  emit('menu-click', e, item)
  closeDrawer()
  closeCollapse()
}
const handleCollapseMenuClick = (e: Event, title: string, visible: boolean) => {
  emit('collapse-click', e, title, visible)
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
defineExpose({
  headerClose: closeDrawer,
})
</script>

<template>
  <HeaderVertical
    :bg-color="bgColor"
    :drawer-btn-color="drawerBtnColor"
    :drawer-btn-border="drawerBtnBorder"
    :header-width="headerWidth"
    @toggle-drawer="handleDrawerClick"
    ref="componentRef"
  >
    <template #default>
      <slot name="default"></slot>
    </template>
    <template #content>
      <div>
        <!-- logo block -->
        <div class="p-md text-center">
          <a
            :href="titleBlockLink"
            :target="titleBlockLinkTarget"
            @click="handleTitleClick"
          >
            <img
              :src="logo"
              :alt="logoAlt"
              class="h-full inline-block max-h-xl"
            />
          </a>
        </div>
        <!-- title block -->
        <div>
          <a
            :href="titleBlockLink"
            :target="titleBlockLinkTarget"
            @click="handleTitleClick"
          >
            <h3
              :class="titleTextClass"
              class="text-center mb-md"
              v-html="title"
            ></h3>
          </a>
        </div>
        <!-- menu item block -->
        <ul class="flex flex-col">
          <li v-for="(item, index) in menuItems" :key="`menu-${index}`">
            <NavLinkVertical
              v-if="!hasChildren(item)"
              :menu-item="(item as MenuItemType)"
              :as-link="menuItemAsLink"
              :text-color="menuTextColor"
              :text-size="menuTextSize"
              :font-bold="menuTextBold"
              :d-hl="displayHighlight"
              :hl-color="highlightColor"
              @menu-click="handleMenuClick"
            />
            <NavCollapseVertical
              v-else
              ref="collapseRef"
              :nav-id="item.title"
              nav-location="desktop"
              :nav-accordion-group="title"
              :menu-item="(item as MenuCollapseType)"
              :as-link="menuItemAsLink"
              :text-color="menuTextColor"
              :text-size="menuTextSize"
              :font-bold="menuTextBold"
              :d-hl="displayHighlight"
              :hl-color="highlightColor"
              @child-click="handleMenuClick"
              @label-click="handleCollapseMenuClick"
            />
          </li>
        </ul>
      </div>
    </template>
    <template #content-bottom>
      <div v-if="slots['content-bottom']">
        <slot name="content-bottom"></slot>
      </div>
    </template>
    <template #mobile-content="{ headerClose }">
      <!-- mobile content -->
      <div class="flex flex-col justify-between h-full">
        <div>
          <!-- logo block -->
          <div class="p-md text-center">
            <a
              :href="titleBlockLink"
              :target="titleBlockLinkTarget"
              @click="handleTitleClick"
            >
              <img
                :src="logo"
                :alt="logoAlt"
                class="h-full inline-block max-h-xl"
              />
            </a>
          </div>
          <!-- title block -->
          <div>
            <a
              :href="titleBlockLink"
              :target="titleBlockLinkTarget"
              @click="handleTitleClick"
            >
              <h3
                :class="titleTextClass"
                class="text-center mb-md"
                v-html="title"
              ></h3>
            </a>
          </div>
          <!-- menu item block -->
          <ul class="flex flex-col">
            <li v-for="(item, index) in menuItems" :key="`menu-${index}`">
              <NavLinkVertical
                v-if="!hasChildren(item)"
                :menu-item="(item as MenuItemType)"
                :as-link="menuItemAsLink"
                :text-color="menuTextColor"
                :text-size="menuTextSize"
                :font-bold="menuTextBold"
                :d-hl="displayHighlight"
                :hl-color="highlightColor"
                @menu-click="handleMenuClick"
              />
              <NavCollapseVertical
                v-else
                :nav-id="item.title"
                nav-location="mobile"
                :nav-accordion-group="title"
                :menu-item="(item as MenuCollapseType)"
                :as-link="menuItemAsLink"
                :text-color="menuTextColor"
                :text-size="menuTextSize"
                :font-bold="menuTextBold"
                :d-hl="displayHighlight"
                :hl-color="highlightColor"
                @child-click="handleMenuClick"
                @label-click="handleCollapseMenuClick"
              />
            </li>
          </ul>
        </div>
        <div v-if="slots['mobile-bottom']">
          <slot name="mobile-bottom" :headerClose="headerClose"></slot>
        </div>
      </div>
    </template>
  </HeaderVertical>
</template>

<style scoped lang="scss"></style>
