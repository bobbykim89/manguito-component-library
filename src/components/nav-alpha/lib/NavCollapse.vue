<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import generateClass, {
  Collapse,
  vCollapse,
  CollapseEvent,
} from '@bobbykim/manguito-theme'
import type { ColorPalette, BodyText } from '@bobbykim/manguito-theme'
import type { NavCollapseType, NavChildClickEventType } from '../index.type'

const props = withDefaults(
  defineProps<{
    navId: string
    navItem: NavCollapseType
    bgColor?: ColorPalette
    hoverBgColor?: ColorPalette
    menuTextSize?: BodyText
    menuTextColor?: ColorPalette
    menuTextBold?: boolean
    displayHighlight?: boolean
    highlightColor?: ColorPalette
  }>(),
  {
    menuTextSize: 'md',
    bgColor: 'light-2',
    hoverBgColor: 'dark-1',
    menuTextColor: 'dark-3',
    menuTextBold: false,
    displayHighlight: true,
    highlightColor: 'primary',
  }
)

const emit = defineEmits(['nav-link'])
const toggle = ref<boolean>(false)
const handleNavId = computed<string>(() => {
  const { navId } = props
  const navLower = navId.toLowerCase()
  const navKebab = navLower.replaceAll(' ', '-')
  return `nav-${navKebab}`
})
const toggleAction = (e: CollapseEvent): void => {
  toggle.value = e.visible
  //   emit('nav-link', { event: e, title: props.navItem.title })
}
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
const getnestedItemClass = (hlColor: ColorPalette): string => {
  const classArray: string[] = [
    generateClass('BORDER', hlColor),
    'border-l-[4px]',
    'pl-2xs',
  ]
  return classArray.join(' ')
}
</script>

<template>
  <div class="w-full flex flex-col items-center">
    <div>
      <button
        class="tracking-wider align-middle outline-none nav__text flex items-center gap-3xs"
        :class="getMenuItemClass(menuTextSize, menuTextColor, menuTextBold)"
        v-collapse:[handleNavId]
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
        class="relative -top-[2px] h-[6px] nav__decorator"
        :class="generateClass('BEFOREBG', highlightColor)"
      ></div>
    </div>
    <div class="self-end">
      <collapse
        :collapseId="handleNavId"
        :visible="false"
        :class-name="getnestedItemClass(highlightColor)"
        @toggle="toggleAction"
      >
        <div>
          <button
            v-for="(item, idx) in navItem.children"
            class="block w-full hover:bg-opacity-50 focus:bg-opacity-50 mb-3xs last:mb-0"
            :key="idx"
            :class="[
              generateClass('HVBGCOLOR', hoverBgColor),
              generateClass('FCBGCOLOR', hoverBgColor),
              generateClass('TEXTCOLOR', menuTextColor),
              generateClass('BODYTEXT', menuTextSize),
            ]"
          >
            {{ item.title }}
          </button>
        </div>
      </collapse>
    </div>
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
