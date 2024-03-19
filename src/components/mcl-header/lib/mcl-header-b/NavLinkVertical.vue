<script setup lang="ts">
import type { BodyText, ColorPalette } from '@bobbykim/manguito-theme'
import generateClass from '@bobbykim/manguito-theme'
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
  }
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
  const { textColor, textSize, dHl, hlColor, fontBold } = props
  const classArray: string[] = [
    // generateClass('TEXTCOLOR', textColor),
    generateClass('BODYTEXT', textSize),
  ]
  if (!dHl) {
    classArray.push(generateClass('TEXTCOLOR', textColor))
    classArray.push(generateClass('HVTEXTCOLOR', hlColor))
    classArray.push(generateClass('FCTEXTCOLOR', hlColor))
  }
  if (dHl) {
    const highlightColor: string = generateClass('BEFOREBG', hlColor)
    const hlClass: string =
      'before:inset-y-0 before:left-0 before:transition-[width] before:duration-300 before:ease-linear before:w-0 hover:before:w-full focus:before:w-full '
    classArray.push(hlClass + highlightColor)
    classArray.push(generateClass('TEXTCOLOR', hlColor))
    classArray.push(generateClass('HVTEXTCOLOR', textColor))
    classArray.push(generateClass('FCTEXTCOLOR', textColor))
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
    class="px-xs py-2xs relative text-center block w-full before:absolute transition-colors duration-300 ease-linear"
    :href="menuItem.url"
    :target="menuItem.target ? menuItem.target : '_self'"
    @click="handleLinkClick($event, menuItem)"
  >
    <span class="relative">{{ menuItem.title }}</span>
  </a>
</template>
