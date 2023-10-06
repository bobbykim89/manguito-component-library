<script setup lang="ts">
import { computed, ref } from 'vue'
import generateClass, {
  DropdownContainer,
  DropdownContent,
} from '@bobbykim/manguito-theme'
import type {
  ColorPalette,
  BodyText,
  FontWeight,
} from '@bobbykim/manguito-theme/theme/theme.types'
import type { DropdownItem, ItemClickEvent } from './index.types'

const props = withDefaults(
  defineProps<{
    title: string
    buttonColor?: ColorPalette
    buttonRounded?: boolean
    buttonTextColor?: ColorPalette
    buttonInvert?: boolean
    dropdownItems: DropdownItem[]
    dropdownColor?: ColorPalette
    displayBorder?: boolean
    rounded?: boolean
    displayShadow?: boolean
    hoverBgColor?: ColorPalette
    dropdownTextSize?: BodyText
    dropdownFontWeight?: FontWeight
    dropdownTextColor?: ColorPalette
    displaySeparator?: boolean
  }>(),
  {
    buttonColor: 'warning',
    buttonRounded: false,
    buttonTextColor: 'black',
    buttonInvert: false,
    dropdownColor: 'white',
    displayBorder: true,
    rounded: true,
    displayShadow: true,
    hoverBgColor: 'light-4',
    dropdownTextSize: 'md',
    dropdownFontWeight: 'normal',
    dropdownTextColor: 'dark-3',
    displaySeparator: false,
  }
)

const emit = defineEmits(['button-click', 'item-click'])
const contentIndexRef = ref<number>(-1)
const contentItemRef = ref<HTMLButtonElement[]>()

const dropdownButtonClass = computed(() => {
  /**
   * @param {ColorPalette} buttonColor - color of dropdown button
   * @param {boolean} buttonRounded - whether to have rounded border of button
   * @param {ColorPalette} buttonTextColor - font color for dropdown button
   * @param {boolean} buttonInvert - whether to have button inverted
   */
  const { buttonColor, buttonRounded, buttonTextColor, buttonInvert } = props
  const classArray: string[] = [generateClass('BTNCOLOR', buttonColor)]
  if (buttonRounded) {
    classArray.push('btn-round')
  }
  if (buttonInvert) {
    classArray.push('btn-invert')
  } else {
    classArray.push(generateClass('TEXTCOLOR', buttonTextColor))
  }
  return classArray.join(' ')
})
const dropdownContentClass = computed<string>(() => {
  /**
   * @param {ColorPalette} dropdownColor - Background color of dropdown
   * @param {boolean} displayBorder - whether to display border
   * @param {boolean} rounded - whether to have rounded border
   * @param {boolean} displayShadow - whether to have drop shadow
   */
  const { dropdownColor, rounded, displayBorder, displayShadow } = props
  const classArray: string[] = [generateClass('BGCOLOR', dropdownColor)]
  if (displayBorder) {
    classArray.push('border')
  }
  if (rounded) {
    classArray.push('rounded-md')
  }
  if (displayShadow) {
    classArray.push('drop-shadow-lg')
  }
  return classArray.join(' ')
})
const dropDownItemClass = computed<string>(() => {
  /**
   * TODO: set class for bg color on hover, font size, font weight, text color, and whether to display separating line between dropdown items
   * @param {ColorPalette} hoverBgColor - background color on hover
   * @param {BodyText} dropdownTextSize - font size of dropdown text
   * @param {FontWeight} dropdownFontWeight - font weight of dropdown text
   * @param {ColorPalette} dropdownTextColor - font color of dropdown text
   * @param {boolean} displaySeparator - whether to display separator between dropdown items
   */
  const {
    hoverBgColor,
    dropdownTextSize,
    dropdownFontWeight,
    dropdownTextColor,
    displaySeparator,
  } = props
  const classArray: string[] = [
    generateClass('HVBGCOLOR', hoverBgColor),
    generateClass('FCBGCOLOR', hoverBgColor),
    generateClass('BODYTEXT', dropdownTextSize),
    generateClass('FONTWEIGHT', dropdownFontWeight),
    generateClass('TEXTCOLOR', dropdownTextColor),
  ]
  if (displaySeparator) {
    classArray.push('border-b last:border-b-0')
  }
  return classArray.join(' ')
})
const dropdownButtonClick = (e: Event): void => {
  // resets index
  contentIndexRef.value = -1
  emit('button-click', e)
}
const dropdownItemClick = (e: Event, item: DropdownItem): void => {
  const customEvent: ItemClickEvent = {
    event: e,
    item,
  }
  emit('item-click', customEvent)
}
type KeyDirection = 'up' | 'down'
const dropdownItemKeyUp = (direction: KeyDirection): void => {
  const itemLength: number = props.dropdownItems.length
  if (contentItemRef.value === undefined) {
    return
  }
  if (direction === 'down' && contentIndexRef.value < itemLength - 1) {
    contentIndexRef.value++
  }
  if (direction === 'up' && contentIndexRef.value > 0) {
    contentIndexRef.value--
  }
  contentItemRef.value[contentIndexRef.value].focus()
}
</script>

<template>
  <div
    @keyup.down="dropdownItemKeyUp('down')"
    @keyup.up="dropdownItemKeyUp('up')"
  >
    <dropdown-container>
      <template #toggler="{ toggle, dropdownState }">
        <button
          @click="toggle($event), dropdownButtonClick($event)"
          class="btn flex justify-between items-center gap-2xs"
          :class="dropdownButtonClass"
        >
          <span>
            {{ title }}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            class="h-xs fill-current"
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
      </template>
      <dropdown-content
        v-slot="{ itemClick }"
        :class-name="dropdownContentClass"
      >
        <button
          v-for="(item, idx) in dropdownItems"
          :key="idx"
          class="block px-xs py-2xs first:pt-xs last:pb-xs w-full text-left"
          :class="dropDownItemClass"
          @click="itemClick(), dropdownItemClick($event, item)"
          ref="contentItemRef"
        >
          {{ item.title }}
        </button>
      </dropdown-content>
    </dropdown-container>
  </div>
</template>

<style lang="scss" scoped></style>
