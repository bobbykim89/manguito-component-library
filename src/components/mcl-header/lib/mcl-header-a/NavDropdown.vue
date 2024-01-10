<script setup lang="ts">
import { ref } from 'vue'
import generateClass, {
  DropdownContainer,
  DropdownContent,
} from '@bobbykim/manguito-theme'
import type { ColorPalette, BodyText } from '@bobbykim/manguito-theme'
import type {
  NavCollapseType,
  NavItemType,
  NavChildClickEventType,
} from './index.types'

const props = withDefaults(
  defineProps<{
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
    bgColor: 'light-1',
    hoverBgColor: 'dark-1',
    menuTextColor: 'dark-3',
    menuTextBold: false,
    displayHighlight: true,
    highlightColor: 'primary',
  }
)

const emit = defineEmits(['nav-link'])
const navIndexRef = ref<number>(-1)
const navItemRef = ref<HTMLButtonElement[]>()

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
type KeyDirection = 'up' | 'down'
const navKeyUp = (direction: KeyDirection): void => {
  const itemLength: number = props.navItem.children.length
  if (navItemRef.value === undefined) {
    return
  }
  if (direction === 'down' && navIndexRef.value < itemLength - 1) {
    navIndexRef.value++
  }
  if (direction === 'up' && navIndexRef.value > 0) {
    navIndexRef.value--
  }
  navItemRef.value[navIndexRef.value].focus()
}
const dropdownButtonClick = (e: Event): void => {
  // resets index
  navIndexRef.value = -1
}
const navItemClick = (e: Event, item: NavItemType) => {
  const customEvent: NavChildClickEventType = {
    event: e,
    item,
  }
  emit('nav-link', customEvent)
}
</script>

<template>
  <div @keyup.down="navKeyUp('down')" @keyup.up="navKeyUp('up')">
    <dropdown-container>
      <template #toggler="{ toggle, dropdownState }">
        <div>
          <button
            class="tracking-wider align-middle outline-none nav__text flex items-center gap-3xs"
            :class="getMenuItemClass(menuTextSize, menuTextColor, menuTextBold)"
            @click="toggle($event), dropdownButtonClick($event)"
          >
            <span>
              {{ navItem.title }}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              class="h-[0.8rem] fill-current"
              :class="[
                dropdownState ? 'rotate-180' : 'rotate-0',
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
      </template>
      <dropdown-content
        v-slot="{ itemClick }"
        className="border drop-shadow-sm"
      >
        <button
          v-for="(item, idx) in navItem.children"
          :key="idx"
          ref="navItemRef"
          class="px-xs py-2xs block w-full hover:bg-opacity-50 focus:bg-opacity-50"
          :class="[
            generateClass('BGCOLOR', bgColor),
            generateClass('HVBGCOLOR', hoverBgColor),
            generateClass('FCBGCOLOR', hoverBgColor),
            generateClass('TEXTCOLOR', menuTextColor),
            generateClass('BODYTEXT', menuTextSize),
          ]"
          @click="itemClick(), navItemClick($event, item)"
        >
          {{ item.title }}
        </button>
      </dropdown-content>
    </dropdown-container>
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
