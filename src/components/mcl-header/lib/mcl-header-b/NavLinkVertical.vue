<script setup lang="ts">
import type { BodyText, ColorPalette } from '@bobbykim/manguito-theme'
import { generateClass } from '@bobbykim/manguito-theme'
import { computed } from 'vue'
import type { MenuItemType } from '../common/index.types'
const props = withDefaults(
  defineProps<{
    menuItem: MenuItemType
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
const emit = defineEmits<{
  (e: 'menu-click', event: Event, item: MenuItemType): void
}>()
const handleLinkClick = (e: Event, item: MenuItemType) => {
  const { asLink } = props
  if (!asLink) {
    e.preventDefault()
  }
  emit('menu-click', e, item)
}
const colorClass = computed<string>(() => {
  const { textColor, textSize, dHl, hlColor, fontBold, menuItem } = props
  // The current page keeps its hover look permanently (#131).
  const current = !!menuItem.current
  const classArray: string[] = [
    generateClass.bodyTextVariant({ size: textSize }),
  ]
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
    // The current page shows the bar fully drawn, as on hover.
    const hlClass: string =
      'before:inset-y-0 before:left-0 before:transition-[width] before:duration-300 before:ease-linear hover:before:w-full focus:before:w-full ' +
      (current ? 'before:w-full ' : 'before:w-0 ')
    classArray.push(hlClass + highlightColor)
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
})
</script>

<template>
  <a
    :class="[colorClass]"
    class="relative block w-full px-xs py-2xs text-center transition-colors duration-300 ease-linear before:absolute"
    :href="menuItem.url"
    :target="menuItem.target ? menuItem.target : '_self'"
    :aria-current="menuItem.current ? 'page' : undefined"
    @click="handleLinkClick($event, menuItem)"
  >
    <span class="relative">{{ menuItem.title }}</span
    ><span v-if="menuItem.target === '_blank'" class="sr-only">
      (opens in a new tab)</span
    >
  </a>
</template>
