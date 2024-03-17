<script setup lang="ts">
import type {
  BodyText,
  ColorPalette,
  CtaTarget,
  HeadingSize,
} from '@bobbykim/manguito-theme'
import { HeaderVertical } from '@bobbykim/manguito-theme'
import type { MenuCollapseType, MenuItemType } from '../common/index.types'

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
      <div>content</div>
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
