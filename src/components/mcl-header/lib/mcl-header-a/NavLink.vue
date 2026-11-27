<script setup lang="ts">
import type { BodyText, ColorPalette } from '@bobbykim/manguito-theme'
import { generateClass } from '@bobbykim/manguito-theme'
import type { MenuItemType } from '../common/index.types'

const props = withDefaults(
  defineProps<{
    navItem: MenuItemType
    menuTextSize?: BodyText
    menuTextColor?: ColorPalette
    menuTextBold?: boolean
    showHighlight?: boolean
    highlightColor?: ColorPalette
    asLink?: boolean
  }>(),
  {
    menuTextSize: 'md',
    menuTextColor: 'dark-3',
    menuTextBold: false,
    showHighlight: true,
    highlightColor: 'primary',
    asLink: true,
  },
)

const emit = defineEmits<{
  (e: 'nav-link', event: Event, item: MenuItemType): void
}>()

const getMenuItemClass = (
  size: BodyText,
  color: ColorPalette,
  bold: boolean,
): string => {
  /**
   * @param {BodyText} size - menuTextSize
   * @param {ColorPalette} color - menuTextColor
   * @param {boolean} bold - menuTextBold
   */
  const classArray: string[] = [
    generateClass.bodyTextVariant({ size: size }),
    generateClass.textColorVariant({ color: color }),
  ]
  if (bold) {
    classArray.push('font-bold')
  }
  return classArray.join(' ')
}
const handleNavLinkClick = (e: Event, item: MenuItemType) => {
  const { asLink } = props
  if (!asLink) e.preventDefault()
  emit('nav-link', e, item)
}
</script>

<template>
  <div>
    <a
      :href="navItem.url"
      :target="navItem.target"
      :aria-current="navItem.current ? 'page' : undefined"
      class="nav__text tracking-wider focus-visible:mcl-focus-ring"
      :class="[
        getMenuItemClass(menuTextSize, menuTextColor, menuTextBold),
        { underline: navItem.current && !showHighlight },
      ]"
      @click="handleNavLinkClick($event, navItem)"
      ><span v-html="navItem.title"></span
      ><span v-if="navItem.target === '_blank'" class="sr-only">
        (opens in a new tab)</span
      ></a
    >
    <div
      v-if="showHighlight"
      class="nav__decorator relative -top-0.5 h-1.5"
      :class="generateClass.beforeBgColorVariant({ color: highlightColor })"
    ></div>
  </div>
</template>

<style scoped lang="scss">
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
.nav__text:hover + .nav__decorator::before,
.nav__text[aria-current='page'] + .nav__decorator::before {
  width: 100%;
}
</style>
