<script setup lang="ts">
import type { BodyText, ColorPalette } from '@bobbykim/manguito-theme'
import { generateClass, Collapse } from '@bobbykim/manguito-theme'
import { useCollapseTrigger } from '@bobbykim/manguito-theme/composable'
import { computed, ref, useId } from 'vue'
import type { MenuCollapseType, MenuItemType } from '../common/index.types'
type NavLocationType = 'desktop' | 'mobile'
const props = withDefaults(
  defineProps<{
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
  },
)
// Before-click state for the label-click payload: synced from the panel's
// open/close events, which fire after the click has emitted (#131).
const toggle = ref<boolean>(false)
const collapseRef = ref<InstanceType<typeof Collapse>>()
const toggleButtonRef = ref<HTMLButtonElement>()
const panelId = useId()
const { attrs, toggle: toggleCollapsePanel } = useCollapseTrigger(collapseRef, {
  id: panelId,
})
const emit = defineEmits<{
  (e: 'label-click', event: Event, title: string, open: boolean): void
  (e: 'child-click', event: Event, item: MenuItemType): void
}>()
const toggleCollapse = (visible: boolean): void => {
  toggle.value = visible
}
// Never moves focus: MclHeaderB calls it on every collapse after any choice.
const closeCollapse = () => {
  collapseRef.value?.close()
}
const handleCollapseLabelClick = (e: Event, title: string) => {
  toggleCollapsePanel()
  emit('label-click', e, title, toggle.value)
}
// Choosing a link closes the panel that holds it. If focus is still inside
// (desktop sidebar), hand it to the toggle so it isn't lost (#131). In the
// mobile drawer, MclHeaderB has already moved focus to the drawer button
// while handling child-click, so it is left there.
const handleChildClick = (e: Event, item: MenuItemType) => {
  const { asLink } = props
  if (!asLink) {
    e.preventDefault()
  }
  emit('child-click', e, item)
  const hadFocus = !!document
    .getElementById(panelId)
    ?.contains(document.activeElement)
  closeCollapse()
  if (hadFocus) toggleButtonRef.value?.focus()
}
const colorClass = computed<string>(() => {
  const { textColor, textSize, dHl, hlColor, fontBold } = props
  const classArray: string[] = [
    generateClass.bodyTextVariant({ size: textSize }),
  ]
  if (!dHl) {
    const nonHlTextClass: string[] = [
      generateClass.textColorVariant({ color: textColor }),
      generateClass.hoverTextColorVariant({ color: hlColor }),
      generateClass.focusTextColorVariant({ color: hlColor }),
    ]
    classArray.push(nonHlTextClass.join(' '))
  }
  if (dHl) {
    const highlightColor: string = generateClass.beforeBgColorVariant({
      color: hlColor,
    })
    const hlClass: string =
      'before:inset-y-0 before:left-0 before:transition-[width] before:duration-300 before:ease-linear before:w-0 hover:before:w-full focus:before:w-full '
    classArray.push(hlClass + highlightColor)
    const hlTextClass: string[] = [
      generateClass.textColorVariant({ color: hlColor }),
      generateClass.hoverTextColorVariant({ color: textColor }),
      generateClass.focusTextColorVariant({ color: textColor }),
    ]
    classArray.push(hlTextClass.join(' '))
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
    'before:absolute before:w-xs before:h-full before:mcl-bg-primary before:bg-opacity-70 '
  const hlLocation: string =
    navLocation === 'desktop' ? 'before:left-0 ' : 'before:right-0 '
  classArray.push(
    classNames +
      hlLocation +
      generateClass.beforeBgColorVariant({ color: hlColor }),
  )
  return classArray.join(' ')
})
// A current child keeps its hover look permanently (#131).
const childItemClass = (current: boolean): string => {
  const { textColor, textSize, dHl, hlColor, fontBold, navLocation } = props
  const childBodyText: BodyText =
    textSize === 'xl'
      ? 'lg'
      : textSize === 'lg'
        ? 'md'
        : textSize === 'md'
          ? 'sm'
          : 'xs'
  const classArray: string[] = [
    generateClass.bodyTextVariant({ size: childBodyText }),
  ]
  // A current child without highlight takes the hovered colour instead.
  if (!(current && !dHl)) {
    classArray.push(generateClass.textColorVariant({ color: textColor }))
  }
  if (navLocation === 'mobile') {
    classArray.push('text-end')
  }
  if (!dHl) {
    const nonHlTextClass: string[] = [
      generateClass.textColorVariant({ color: current ? hlColor : textColor }),
      generateClass.hoverTextColorVariant({ color: hlColor }),
      generateClass.focusTextColorVariant({ color: hlColor }),
    ]
    if (current) nonHlTextClass.push('underline')
    classArray.push(nonHlTextClass.join(' '))
  }
  if (dHl) {
    const highlightColor: string = generateClass.beforeBgColorVariant({
      color: hlColor,
    })
    // A current child shows the bar fully drawn, as on hover.
    const hlClass: string =
      'before:inset-y-0 before:duration-300 before:ease-linear hover:before:w-full focus:before:w-full before:bg-opacity-70 ' +
      (current ? 'before:w-full ' : 'before:w-0 ')
    const hlLocation: string =
      navLocation === 'desktop'
        ? 'before:left-0 before:transition-[width] '
        : (current ? 'before:left-0 ' : 'before:left-full ') +
          'hover:before:left-0 focus:before:left-0 before:transition-[all] '
    classArray.push(hlClass + hlLocation + highlightColor)
    const hlTextClass: string[] = [
      generateClass.textColorVariant({ color: current ? textColor : hlColor }),
      generateClass.hoverTextColorVariant({ color: textColor }),
      generateClass.focusTextColorVariant({ color: textColor }),
    ]
    classArray.push(hlTextClass.join(' '))
  }
  if (fontBold) {
    classArray.push('font-bold')
  }
  return classArray.join(' ')
}
defineExpose({
  closeCollapse: closeCollapse,
})
</script>

<template>
  <div>
    <button
      ref="toggleButtonRef"
      type="button"
      v-bind="attrs"
      class="relative block w-full px-xs py-2xs text-center transition-colors duration-300 ease-linear before:absolute"
      @click="handleCollapseLabelClick($event, menuItem.title)"
      :class="[colorClass]"
    >
      <div class="relative flex items-center justify-center gap-2">
        <span>{{ menuItem.title }}</span>
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
      </div>
    </button>
    <Collapse
      ref="collapseRef"
      :id="panelId"
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
            :aria-current="item.current ? 'page' : undefined"
            @click="handleChildClick($event, item)"
            class="relative block w-full overflow-x-hidden px-2xs py-3xs transition-colors duration-300 ease-linear before:absolute"
            :class="childItemClass(!!item.current)"
          >
            <span class="relative"> {{ item.title }} </span
            ><span v-if="item.target === '_blank'" class="sr-only">
              (opens in a new tab)</span
            >
          </a>
        </li>
      </ul>
    </Collapse>
  </div>
</template>
