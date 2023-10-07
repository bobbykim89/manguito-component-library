<script setup lang="ts">
import { ref, watch } from 'vue'
import generateClass, {
  Collapse,
  vCollapse,
  CollapseEvent,
} from '@bobbykim/manguito-theme'
import type { ColorPalette, HeadingSize } from '@bobbykim/manguito-theme'

const props = withDefaults(
  defineProps<{
    collapseId: string
    title: string
    titleColor?: ColorPalette
    titleSize?: HeadingSize
    borderColor?: ColorPalette
    bgColor?: ColorPalette
    btnColor?: ColorPalette
    iconColor?: ColorPalette
    rounded?: boolean
    displayShadow?: boolean
    visible?: boolean
    accordion?: string
  }>(),
  {
    titleColor: 'light-1',
    titleSize: 'md',
    borderColor: 'light-3',
    bgColor: 'light-1',
    btnColor: 'primary',
    iconColor: 'light-1',
    rounded: true,
    displayShadow: true,
    visible: false,
  }
)

const toggle = ref(props.visible)
const emit = defineEmits(['accordion-click'])

const toggleAction = (e: CollapseEvent): void => {
  toggle.value = e.visible

  emit('accordion-click', { event: e, title: props.title })
}

const getBorderClass = (
  bColor: ColorPalette,
  bgColor: ColorPalette,
  rounded: boolean,
  dShadow: boolean
): string => {
  /**
   * @param {ColorPalette} bColor - borderColor
   * @param {ColorPalette} bgColor - bgColor
   * @param {boolean} rounded - rounded
   * @param {boolean} dShadow - displayShadow
   */

  let borderInfo: string[] = [
    'border',
    generateClass('BORDER', bColor),
    generateClass('BGCOLOR', bgColor),
  ]

  if (dShadow) {
    borderInfo.push('shadow-md')
  }
  if (rounded) {
    borderInfo.push('rounded-2xl')
  } else {
    borderInfo.push('rounded-sm')
  }

  return borderInfo.join(' ')
}

const getTitleClass = (size: HeadingSize, color: ColorPalette): string => {
  /**
   * @param {HeadingSize} size - titleSize
   * @param {ColorPalette} color - titleColor
   */

  const classArray: string[] = [
    generateClass('H3', size),
    generateClass('TEXTCOLOR', color),
  ]
  return classArray.join(' ')
}

watch(
  () => props.visible,
  (newValue) => {
    toggle.value = newValue
  }
)
</script>

<template>
  <div
    class="w-full overflow-hidden p-2xs"
    :class="getBorderClass(borderColor, bgColor, rounded, displayShadow)"
  >
    <div
      v-collapse:[collapseId]
      class="flex justify-between items-center w-full px-4 py-2 cursor-pointer hover:bg-opacity-70 transition duration-200 ease-in"
      :class="[
        rounded ? 'rounded-lg' : 'rounded-sm',
        generateClass('BGCOLOR', btnColor),
      ]"
    >
      <h3 :class="getTitleClass(titleSize, titleColor)">{{ title }}</h3>
      <div class="flex justify-center items-center ml-xs md:ml-sm lg:ml-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          class="h-xs transition-transform duration-300 ease-in"
          :class="[
            !toggle ? 'rotate-0' : 'rotate-180',
            generateClass('SVGFILL', iconColor),
          ]"
        >
          <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
          <path
            d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z"
          />
        </svg>
      </div>
    </div>
    <div class="overflow-hidden">
      <collapse
        :collapseId="collapseId"
        :visible="visible"
        class-name="px-xs pt-xs pb-2xs"
        @toggle="toggleAction"
        :accordion="accordion"
      >
        <slot></slot>
      </collapse>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
