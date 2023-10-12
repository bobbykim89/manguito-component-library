<script setup lang="ts">
import { ref, computed } from 'vue'
import generateClass, {
  Collapse,
  vCollapse,
  CollapseEvent,
} from '@bobbykim/manguito-theme'
import type { ColorPalette, BodyText } from '@bobbykim/manguito-theme'
import type {
  NavCollapseType,
  NavItemType,
  NavChildClickEventType,
} from '../index.type'

const props = withDefaults(
  defineProps<{
    navId: string
    navAccordionGroup: string
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
const handleNavAccordionGroupName = computed<string>(() => {
  const { navAccordionGroup } = props
  const toLowerCase = navAccordionGroup.toLocaleLowerCase()
  const toKebabCase = toLowerCase.replaceAll(' ', '-')
  return `accordion-${toKebabCase}`
})
const toggleAction = (e: CollapseEvent): void => {
  toggle.value = e.visible
  //   emit('nav-link', { event: e, title: props.navItem.title })
}
const navItemClick = (e: Event, item: NavItemType) => {
  const customEvent: NavChildClickEventType = {
    event: e,
    item,
  }
  emit('nav-link', customEvent)
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
const getnestedItemClass = (hlColor: ColorPalette, dHl: boolean): string => {
  /**
   * @param {ColorPalette} hlColor - highlightColor
   * @param {boolean} dHl - displayHighlight
   */
  const classArray: string[] = ['px-2xs']
  if (dHl) {
    classArray.push(generateClass('BORDER', hlColor))
    classArray.push('border-l-[4px]')
  }
  return classArray.join(' ')
}
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="self-center">
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
    <collapse
      :collapseId="handleNavId"
      :visible="false"
      :accordion="handleNavAccordionGroupName"
      @toggle="toggleAction"
    >
      <div class="flex flex-col">
        <a
          v-for="(item, idx) in navItem.children"
          :href="item.url"
          :target="item.target"
          class="w-full pb-2xs last:pb-0 first:mt-2xs"
          :key="idx"
          :class="[
            generateClass('TEXTCOLOR', menuTextColor),
            generateClass('BODYTEXT', menuTextSize),
            getnestedItemClass(highlightColor, displayHighlight),
          ]"
          @click="navItemClick($event, item)"
        >
          {{ item.title }}
        </a>
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
