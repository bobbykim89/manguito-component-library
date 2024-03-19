<script setup lang="ts">
import type {
  BodyText,
  CollapseEvent,
  ColorPalette,
} from '@bobbykim/manguito-theme'
import generateClass, { Collapse, vCollapse } from '@bobbykim/manguito-theme'
import { computed, ref } from 'vue'
import type { MenuCollapseType, MenuItemType } from '../common/index.types'
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
const collapseRef = ref<InstanceType<typeof Collapse>>()
const emit = defineEmits<{
  (e: 'label-click', event: Event, title: string, open: boolean): void
  (e: 'child-click', event: Event, item: MenuItemType): void
}>()
const toggleCollapse = (e: CollapseEvent): void => {
  toggle.value = e.visible
}
const closeCollapse = () => {
  collapseRef.value?.close()
}
const handleCollapseLabelClick = (e: Event, title: string) => {
  emit('label-click', e, title, toggle.value)
}
const handleChildClick = (e: Event, item: MenuItemType) => {
  const { asLink } = props
  if (!asLink) {
    e.preventDefault()
  }
  emit('child-click', e, item)
  closeCollapse()
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
const collapseHighlightClass = computed<string>(() => {
  const { dHl, hlColor, navLocation } = props
  const classArray: string[] = []
  if (!dHl) {
    return ''
  }
  const classNames: string =
    'before:absolute before:w-xs before:h-full before:bg-primary before:bg-opacity-25 '
  const hlLocation: string =
    navLocation === 'desktop' ? 'before:left-0 ' : 'before:right-0 '
  classArray.push(classNames + hlLocation + generateClass('BEFOREBG', hlColor))
  return classArray.join(' ')
})
const childItemColorClass = computed<string>(() => {
  const { textColor, textSize, dHl, hlColor, fontBold, navLocation } = props
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
  if (navLocation === 'mobile') {
    classArray.push('text-end')
  }

  if (dHl) {
    const highlightColor: string = generateClass('BEFOREBG', hlColor)
    const hlClass: string =
      'before:inset-y-0 before:duration-300 before:ease-linear before:w-0 hover:before:w-full focus:before:w-full before:bg-opacity-25 '
    const hlLocation: string =
      navLocation === 'desktop'
        ? 'before:left-0 before:transition-[width] '
        : 'before:left-full hover:before:left-0 focus:before:left-0 before:transition-[all] '
    classArray.push(hlClass + hlLocation + highlightColor)
  }
  if (fontBold) {
    classArray.push('font-bold')
  }
  return classArray.join(' ')
})
defineExpose({
  closeCollapse: closeCollapse,
})
</script>

<template>
  <div>
    <button
      v-collapse:[getNavId]
      class="px-xs py-2xs relative text-center block w-full before:absolute"
      @click="handleCollapseLabelClick($event, menuItem.title)"
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
      ref="collapseRef"
      :id="getNavId"
      :accordion="getAccordionGroup"
      @open="toggleCollapse"
      @close="toggleCollapse"
    >
      <ul class="relative" :class="[collapseHighlightClass]">
        <li
          v-for="(item, idx) in menuItem.children"
          :key="idx"
          :class="[navLocation === 'desktop' ? 'ml-xs' : 'mr-xs']"
        >
          <a
            :href="item.url"
            :target="item.target"
            @click="handleChildClick($event, item)"
            class="relative before:absolute w-full px-2xs py-3xs block overflow-x-hidden"
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
