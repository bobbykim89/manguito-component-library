<script setup lang="ts">
import type { BodyText, ColorPalette } from '@bobbykim/manguito-theme'
import { generateClass, Collapse } from '@bobbykim/manguito-theme'
import { useCollapseTrigger } from '@bobbykim/manguito-theme/composable'
import { ref, useId } from 'vue'
import type { MenuCollapseType, MenuItemType } from '../common/index.types'

const props = withDefaults(
  defineProps<{
    navItem: MenuCollapseType
    bgColor?: ColorPalette
    hoverBgColor?: ColorPalette
    menuTextSize?: BodyText
    menuTextColor?: ColorPalette
    menuTextBold?: boolean
    showHighlight?: boolean
    highlightColor?: ColorPalette
    asLink?: boolean
  }>(),
  {
    menuTextSize: 'md',
    bgColor: 'light-2',
    hoverBgColor: 'dark-1',
    menuTextColor: 'dark-3',
    menuTextBold: false,
    showHighlight: true,
    highlightColor: 'primary',
    asLink: true,
  },
)

const emit = defineEmits<{
  (e: 'child-click', event: Event, item: MenuItemType): void
  (e: 'label-click', event: Event, title: string, open: boolean): void
}>()
// Before-click state for the label-click payload: synced from the panel's
// open/close events, which fire after the click has emitted (#131).
const toggle = ref<boolean>(false)
const collapseRef = ref<InstanceType<typeof Collapse>>()
const panelId = useId()
const { attrs, toggle: toggleCollapse } = useCollapseTrigger(collapseRef, {
  id: panelId,
})
const toggleAction = (visible: boolean): void => {
  toggle.value = visible
}
const handleCollapseLabelClick = (e: Event, title: string) => {
  toggleCollapse()
  emit('label-click', e, title, toggle.value)
}
const navItemClick = (e: Event, item: MenuItemType) => {
  const { asLink } = props
  if (!asLink) e.preventDefault()
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
    generateClass.bodyTextVariant({ size: size }),
    generateClass.textColorVariant({ color: color }),
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
        type="button"
        v-bind="attrs"
        class="nav__text flex items-center gap-3xs align-middle tracking-wider focus-visible:mcl-focus-ring"
        :class="getMenuItemClass(menuTextSize, menuTextColor, menuTextBold)"
        @click="handleCollapseLabelClick($event, navItem.title)"
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
        v-if="showHighlight"
        class="nav__decorator relative -top-0.5 h-1.5"
        :class="generateClass.beforeBgColorVariant({ color: highlightColor })"
      ></div>
    </div>
    <collapse
      ref="collapseRef"
      :id="panelId"
      @open="toggleAction"
      @close="toggleAction"
    >
      <div class="relative pt-2xs">
        <div
          v-if="showHighlight"
          class="absolute -left-4 h-full w-md bg-opacity-25"
          :class="generateClass.bgColorVariant({ color: highlightColor })"
        ></div>
        <div class="relative flex flex-col">
          <a
            v-for="(item, idx) in navItem.children"
            :href="item.url"
            :target="item.target"
            class="w-full pb-2xs last:pb-0"
            :key="idx"
            :aria-current="item.current ? 'page' : undefined"
            :class="[
              generateClass.textColorVariant({ color: menuTextColor }),
              generateClass.bodyTextVariant({ size: menuTextSize }),
              { underline: item.current },
            ]"
            @click="navItemClick($event, item)"
          >
            {{ item.title
            }}<span v-if="item.target === '_blank'" class="sr-only">
              (opens in a new tab)</span
            >
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
