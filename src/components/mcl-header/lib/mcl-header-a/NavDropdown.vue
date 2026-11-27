<script setup lang="ts">
import type { BodyText, ColorPalette } from '@bobbykim/manguito-theme'
import {
  generateClass,
  DropdownContainer,
  DropdownContent,
} from '@bobbykim/manguito-theme'
import { ref } from 'vue'
import type { MenuCollapseType, MenuItemType } from '../common/index.types'

const props = withDefaults(
  defineProps<{
    navItem: MenuCollapseType
    bgColor?: ColorPalette
    menuTextSize?: BodyText
    menuTextColor?: ColorPalette
    menuTextBold?: boolean
    showHighlight?: boolean
    highlightColor?: ColorPalette
    asLink?: boolean
  }>(),
  {
    menuTextSize: 'md',
    bgColor: 'light-1',
    menuTextColor: 'dark-3',
    menuTextBold: false,
    showHighlight: true,
    highlightColor: 'primary',
    asLink: true,
  },
)

const emit = defineEmits<{
  (e: 'label-click', event: Event, title: string, open: boolean): void
  (e: 'child-click', event: Event, item: MenuItemType): void
}>()
const togglerRef = ref<HTMLButtonElement>()

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
// Up/Down while the dropdown is open and focus is on the toggle or one of its
// links. Same rules as MclDropdownA (#135), with links instead of buttons
// (#131): the position comes from the focused link, so Tab and the arrows
// agree; it moves one link, stops at the ends and never scrolls the page.
const onArrowKey = (e: KeyboardEvent): void => {
  if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
  const toggler = togglerRef.value
  if (!toggler || toggler.getAttribute('aria-expanded') !== 'true') return
  const contentId = toggler.getAttribute('aria-controls')
  const content = contentId ? document.getElementById(contentId) : null
  const items = content
    ? Array.from(content.querySelectorAll<HTMLAnchorElement>(':scope > a'))
    : []
  const active = document.activeElement
  const index = items.indexOf(active as HTMLAnchorElement)
  if (active !== toggler && index === -1) return
  e.preventDefault()
  const last = items.length - 1
  let target: HTMLAnchorElement | undefined
  if (e.key === 'ArrowDown') {
    target = index === -1 ? items[0] : items[Math.min(index + 1, last)]
  } else if (index !== -1) {
    target = items[Math.max(index - 1, 0)]
  }
  target?.focus()
}
const dropdownButtonClick = (e: Event, title: string, state: boolean): void => {
  emit('label-click', e, title, state)
}
const navItemClick = (e: Event, item: MenuItemType) => {
  const { asLink } = props
  if (!asLink) e.preventDefault()
  emit('child-click', e, item)
}
</script>

<template>
  <div @keydown="onArrowKey">
    <dropdown-container>
      <template #toggler="{ toggle, dropdownState, attrs }">
        <div>
          <button
            ref="togglerRef"
            type="button"
            v-bind="attrs"
            class="nav__text flex items-center gap-3xs align-middle tracking-wider focus-visible:mcl-focus-ring"
            :class="getMenuItemClass(menuTextSize, menuTextColor, menuTextBold)"
            @click="
              (toggle($event),
              dropdownButtonClick($event, navItem.title, dropdownState))
            "
          >
            <span>
              {{ navItem.title }}
            </span>
            <svg
              aria-hidden="true"
              focusable="false"
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
            v-if="showHighlight"
            class="nav__decorator relative -top-0.5 h-1.5"
            :class="
              generateClass.beforeBgColorVariant({ color: highlightColor })
            "
          ></div>
        </div>
      </template>
      <dropdown-content
        v-slot="{ itemClick }"
        custom-class="border drop-shadow-sm"
      >
        <a
          v-for="(item, idx) in navItem.children"
          :href="item.url"
          :target="item.target"
          :key="idx"
          :aria-current="item.current ? 'page' : undefined"
          class="block w-full px-xs py-2xs transition-all duration-200 ease-linear hover:bg-opacity-50 focus:bg-opacity-50"
          :class="[
            item.current
              ? [
                  generateClass.bgColorVariant({ color: highlightColor }),
                  'bg-opacity-50',
                ]
              : generateClass.bgColorVariant({ color: bgColor }),
            generateClass.hoverBgColorVariant({ color: highlightColor }),
            generateClass.focusBgColorVariant({ color: highlightColor }),
            generateClass.textColorVariant({ color: menuTextColor }),
            generateClass.bodyTextVariant({ size: menuTextSize }),
          ]"
          @click="(itemClick(), navItemClick($event, item))"
        >
          {{ item.title
          }}<span v-if="item.target === '_blank'" class="sr-only">
            (opens in a new tab)</span
          >
        </a>
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
