<script setup lang="ts">
import type { BodyText, ColorPalette } from '@bobbykim/manguito-theme'
import generateClass, { Collapse } from '@bobbykim/manguito-theme'
import { vCollapse } from '@bobbykim/manguito-theme/directives'
import { computed, ref } from 'vue'
import type { MenuCollapseType, MenuItemType } from '../common/index.types'

const props = withDefaults(
  defineProps<{
    navId: string
    navAccordionGroup: string
    navItem: MenuCollapseType
    bgColor?: ColorPalette
    hoverBgColor?: ColorPalette
    menuTextSize?: BodyText
    menuTextColor?: ColorPalette
    menuTextBold?: boolean
    displayHighlight?: boolean
    highlightColor?: ColorPalette
    asLink?: boolean
  }>(),
  {
    menuTextSize: 'md',
    bgColor: 'light-2',
    hoverBgColor: 'dark-1',
    menuTextColor: 'dark-3',
    menuTextBold: false,
    displayHighlight: true,
    highlightColor: 'primary',
    asLink: true,
  },
)

const emit = defineEmits<{
  (e: 'child-click', event: Event, item: MenuItemType): void
  (e: 'label-click', event: Event, title: string, open: boolean): void
}>()
const toggle = ref<boolean>(false)
const handleNavId = computed<string>(() => {
  const { navId } = props
  const navLower = navId.toLowerCase()
  const navKebab = navLower.replaceAll(' ', '-')
  return `nav-${navKebab}`
})
const handleNavAccordionGroupName = computed<string>(() => {
  const { navAccordionGroup } = props
  const toLowerCase = navAccordionGroup.toLocaleLowerCase()
  const toKebabCase = toLowerCase.replaceAll(' ', '-')
  return `accordion-${toKebabCase}`
})
const toggleAction = (visible: boolean): void => {
  toggle.value = visible
}
const handleCollapseLabelClick = (e: Event, title: string) => {
  emit('label-click', e, title, toggle.value)
}
const navItemClick = (e: Event, item: MenuItemType) => {
  const { asLink } = props
  !asLink && e.preventDefault()
  emit('child-click', e, item)
}
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
    generateClass('BODYTEXT', size),
    generateClass('TEXTCOLOR', color),
  ]
  if (bold) {
    classArray.push('font-bold')
  }
  return classArray.join(' ')
}
</script>

<template>
  <div class="flex w-full flex-col">
    <div class="self-center">
      <button
        class="nav__text gap-3xs flex items-center align-middle tracking-wider outline-none"
        :class="getMenuItemClass(menuTextSize, menuTextColor, menuTextBold)"
        v-collapse:[handleNavId]
        @click="handleCollapseLabelClick($event, navItem.title)"
      >
        <span>
          {{ navItem.title }}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          class="h-[0.8rem] fill-current"
          :class="[
            toggle ? 'rotate-180' : 'rotate-0',
            'transition-transform duration-300 ease-in',
          ]"
        >
          <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
          <path
            d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z"
          />
        </svg>
      </button>
      <div
        v-if="displayHighlight"
        class="nav__decorator relative -top-0.5 h-1.5"
        :class="generateClass('BEFOREBG', highlightColor)"
      ></div>
    </div>
    <collapse
      :id="handleNavId"
      :visible="false"
      :accordion="handleNavAccordionGroupName"
      @open="toggleAction"
      @close="toggleAction"
    >
      <div class="pt-2xs relative">
        <div
          v-if="displayHighlight"
          class="w-md absolute -left-4 h-full bg-opacity-25"
          :class="generateClass('BGCOLOR', highlightColor)"
        ></div>
        <div class="relative flex flex-col">
          <a
            v-for="(item, idx) in navItem.children"
            :href="item.url"
            :target="item.target"
            class="pb-2xs w-full last:pb-0"
            :key="idx"
            :class="[
              generateClass('TEXTCOLOR', menuTextColor),
              generateClass('BODYTEXT', menuTextSize),
            ]"
            @click="navItemClick($event, item)"
          >
            {{ item.title }}
          </a>
        </div>
      </div>
    </collapse>
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
