<script setup lang="ts">
import { ref, watch } from 'vue'
import generateClass, { Collapse, vCollapse } from '@bobbykim/manguito-theme'
import type { CollapseEvent } from '@bobbykim/manguito-theme'
import type { ColorPalette, HeadingSize } from '@bobbykim/manguito-theme'

const props = withDefaults(
  defineProps<{
    collapseId: string
    borderColor?: ColorPalette
    rounded?: boolean
    displayHighlight?: boolean
    highlightColor?: ColorPalette
    title: string
    titleSize?: HeadingSize
    titleColor?: ColorPalette
    visible?: boolean
    iconColor?: ColorPalette
    bgColor?: ColorPalette
    slotBgColor?: ColorPalette
    accordion?: string
  }>(),
  {
    borderColor: 'light-4',
    rounded: false,
    displayHighlight: true,
    highlightColor: 'secondary',
    titleSize: 'sm',
    titleColor: 'dark-3',
    visible: false,
    iconColor: 'dark-3',
    bgColor: 'white',
    slotBgColor: 'light-2',
  }
)

const toggle = ref(props.visible)
const emit = defineEmits(['accordion-open', 'accordion-close'])

const toggleAction = (e: CollapseEvent): void => {
  toggle.value = e.visible
  if (e.visible === true) {
    emit('accordion-open', { ...e, title: props.title })
  } else {
    emit('accordion-close', { ...e, title: props.title })
  }
}

const getBorderClass = (
  bColor: ColorPalette,
  dHl: boolean,
  hlColor: ColorPalette
): string => {
  /**
   * @param {ColorPalette} bColor - borderColor
   * @param {boolean} dHl - displayHighlight
   * @param {ColorPalette} hlColor - highlightColor
   */

  const classArray: string[] = ['border', generateClass('BORDER', bColor)]

  if (dHl) {
    const borderArray: string[] = [generateClass('BORDERL', hlColor)]
    borderArray.forEach((item) => {
      classArray.push(item), classArray.push('border-l-8')
    })
  }

  return classArray.join(' ')
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
    class="overflow-hidden w-full"
    :class="[
      rounded ? 'rounded-lg' : 'rounded-sm',
      getBorderClass(borderColor, displayHighlight, highlightColor),
    ]"
  >
    <div
      class="py-xs px-sm cursor-pointer transition-[border] duration-500"
      :class="[
        toggle
          ? `border-b ${generateClass('BORDERB', borderColor)} ease-in`
          : 'ease-out',
        generateClass('BGCOLOR', bgColor),
      ]"
      v-collapse:[collapseId]
    >
      <div class="flex justify-between items-center">
        <h3 :class="getTitleClass(titleSize, titleColor)">
          {{ title }}
        </h3>
        <div @click.stop class="cursor-default">
          <slot name="tab"></slot>
        </div>
      </div>
    </div>
    <div class="overflow-hidden" :class="generateClass('BGCOLOR', slotBgColor)">
      <collapse
        :id="collapseId"
        :visible="visible"
        class-name="py-sm px-xs"
        @open="toggleAction"
        @close="toggleAction"
        :accordion="accordion"
      >
        <slot name="content"></slot>
      </collapse>
    </div>
    <div
      class="py-1.5 px-sm cursor-pointer transition-all duration-500 flex justify-center items-center border-t"
      :class="[
        generateClass('BGCOLOR', bgColor),
        generateClass('BORDERT', borderColor),
      ]"
      v-collapse:[collapseId]
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        class="h-xs"
        :class="[
          !toggle ? 'rotate-0' : 'rotate-180',
          'transition-transform duration-300 ease-in',
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
</template>

<style lang="scss" scoped></style>
