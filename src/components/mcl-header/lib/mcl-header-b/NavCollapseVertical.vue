<script setup lang="ts">
import type {
  BodyText,
  CollapseEvent,
  ColorPalette,
} from '@bobbykim/manguito-theme'
import generateClass, { Collapse, vCollapse } from '@bobbykim/manguito-theme'
import { computed, ref } from 'vue'
import type { MenuCollapseType } from '../common/index.types'
type NavLocationType = 'desktop' | 'mobile'
const props = withDefaults(
  defineProps<{
    navId: string
    navAccordionGroup: string
    navLocation: NavLocationType
    menuItem: MenuCollapseType
    textColor?: ColorPalette
    textSize?: BodyText
    fontBold?: boolean
    dHl?: boolean
    hlColor?: ColorPalette
    asLink?: boolean
  }>(),
  {
    textColor: 'dark-3',
    textSize: 'md',
    fontBold: false,
    dHl: true,
    hlColor: 'primary',
    asLink: true,
  }
)
const toggle = ref<boolean>(false)
const toggleCollapse = (e: CollapseEvent): void => {
  toggle.value = e.visible
}
const getNavId = computed<string>(() => {
  const { navId, navLocation } = props
  const navIdLower = navId.toLowerCase()
  const navIdKebab = navIdLower.replaceAll(' ', '-')
  return `nav-${navLocation}-${navIdKebab}`
})
const getAccordionGroup = computed<string>(() => {
  const { navAccordionGroup, navLocation } = props
  const agKebab = navAccordionGroup.toLowerCase().replaceAll(' ', '-')
  return `nav-accordion-group-${navLocation}-${agKebab}`
})
const collapseHighlightClass = () => {}
const colorClass = computed<string>(() => {
  const { textColor, textSize, dHl, hlColor, fontBold } = props
  const classArray: string[] = [
    generateClass('TEXTCOLOR', textColor),
    generateClass('BODYTEXT', textSize),
  ]
  if (dHl) {
    const highlightColor: string = generateClass('BEFOREBG', hlColor)
    const hlClass: string =
      'before:inset-y-0 before:left-0 before:transition-[width] before:duration-300 before:ease-linear before:w-0 hover:before:w-full focus:before:w-full '
    classArray.push(hlClass + highlightColor)
  }
  if (fontBold) {
    classArray.push('font-bold')
  }
  return classArray.join(' ')
})
const childItemColorClass = computed<string>(() => {
  const { textColor, textSize, dHl, hlColor, fontBold } = props
  let childBodyText: BodyText =
    textSize === 'xl'
      ? 'lg'
      : textSize === 'lg'
      ? 'md'
      : textSize === 'md'
      ? 'sm'
      : 'xs'
  const classArray: string[] = [
    generateClass('TEXTCOLOR', textColor),
    generateClass('BODYTEXT', childBodyText),
  ]

  if (dHl) {
    const highlightColor: string = generateClass('BEFOREBG', hlColor)
    const hlClass: string =
      'before:inset-y-0 before:left-0 before:transition-[width] before:duration-300 before:ease-linear before:w-0 hover:before:w-full focus:before:w-full before:bg-opacity-25 '
    classArray.push(hlClass + highlightColor)
  }
  if (fontBold) {
    classArray.push('font-bold')
  }
  return classArray.join(' ')
})
</script>

<template>
  <div>
    <button
      v-collapse:[getNavId]
      class="px-xs py-2xs relative text-center block w-full before:absolute"
      :class="[colorClass]"
    >
      <div class="relative flex gap-2 items-center justify-center">
        <span>{{ menuItem.title }}</span>
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
      </div>
    </button>
    <Collapse
      :id="getNavId"
      :accordion="getAccordionGroup"
      @open="toggleCollapse"
      @close="toggleCollapse"
    >
      <ul
        class="relative before:absolute before:w-xs before:h-full before:bg-primary before:bg-opacity-25"
      >
        <li v-for="(item, idx) in menuItem.children" :key="idx" class="ml-xs">
          <a
            :href="item.url"
            :target="item.target"
            class="relative before:absolute w-full px-2xs py-3xs block"
            :class="[childItemColorClass]"
          >
            <span class="relative">
              {{ item.title }}
            </span>
          </a>
        </li>
      </ul>
    </Collapse>
  </div>
</template>

<style scoped></style>
