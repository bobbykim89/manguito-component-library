<script setup lang="ts">
import generateClass from '@bobbykim/manguito-theme'
import type { BodyText, ColorPalette } from '@bobbykim/manguito-theme'
import type { NavItemType } from '../index.type'

const props = withDefaults(
  defineProps<{
    navItem: NavItemType
    menuTextSize?: BodyText
    menuTextColor?: ColorPalette
    menuTextBold?: boolean
    displayHighlight?: boolean
    highlightColor?: ColorPalette
  }>(),
  {
    menuTextSize: 'md',
    menuTextColor: 'dark-3',
    menuTextBold: false,
    displayHighlight: true,
    highlightColor: 'primary',
  }
)

const emit = defineEmits(['nav-link'])

const getMenuItemClass = (
  size: BodyText,
  color: ColorPalette,
  bold: boolean
): string => {
  /**
   * @param {BodyText} size - menuTextSize
   * @param {ColorPalette} color - menuTextColor
   * @param {boolean} bold - menuTextBold
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
const handleNavLinkClick = (e: Event) => {
  e.preventDefault()
  emit('nav-link', e)
}
</script>

<template>
  <div>
    <a
      :href="navItem.url"
      :target="navItem.target"
      v-html="navItem.title"
      class="tracking-wider outline-none nav__text"
      :class="getMenuItemClass(menuTextSize, menuTextColor, menuTextBold)"
      @click="handleNavLinkClick"
    ></a>
    <div
      v-if="displayHighlight"
      class="relative -top-[2px] h-[6px] nav__decorator"
      :class="generateClass('BEFOREBG', highlightColor)"
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
.nav__text:hover + .nav__decorator::before {
  width: 100%;
}
</style>
