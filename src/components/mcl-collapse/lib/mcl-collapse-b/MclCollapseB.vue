<script setup lang="ts">
import type { ColorPalette, HeadingSize } from '@bobbykim/manguito-theme'
import generateClass, { Collapse } from '@bobbykim/manguito-theme'
import { ref } from 'vue'

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
  },
)

const slots = defineSlots<{
  default: any
}>()
const emit = defineEmits<{
  (e: 'collapse-open', visible: boolean, title: string): void
  (e: 'collapse-close', visible: boolean, title: string): void
}>()

const collapseRef = ref<InstanceType<typeof Collapse>>()
const isOpen = ref(props.visible)

const handleOpen = (): void => {
  isOpen.value = true
  emit('collapse-open', true, props.title)
}
const handleClose = (): void => {
  isOpen.value = false
  emit('collapse-close', false, props.title)
}

const getBorderClass = (
  bColor: ColorPalette,
  bgColor: ColorPalette,
  rounded: boolean,
  dShadow: boolean,
): string => {
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
  const classArray: string[] = [
    generateClass('H3', size),
    generateClass('TEXTCOLOR', color),
  ]
  return classArray.join(' ')
}
</script>

<template>
  <div
    class="p-2xs w-full overflow-hidden"
    :class="getBorderClass(borderColor, bgColor, rounded, displayShadow)"
  >
    <button
      type="button"
      :id="`${collapseId}-trigger`"
      :aria-expanded="isOpen"
      :aria-controls="collapseId"
      @click="collapseRef?.toggle()"
      class="flex w-full cursor-pointer items-center justify-between px-4 py-2 transition duration-200 ease-in hover:bg-opacity-70"
      :class="[
        rounded ? 'rounded-lg' : 'rounded-sm',
        generateClass('BGCOLOR', btnColor),
      ]"
    >
      <span :class="getTitleClass(titleSize, titleColor)">{{ title }}</span>
      <div
        aria-hidden="true"
        class="ml-xs md:ml-sm lg:ml-md flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          class="h-xs transition-transform duration-300 ease-in"
          :class="[
            !isOpen ? 'rotate-0' : 'rotate-180',
            generateClass('SVGFILL', iconColor),
          ]"
        >
          <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
          <path
            d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z"
          />
        </svg>
      </div>
    </button>
    <div class="overflow-hidden">
      <Collapse
        ref="collapseRef"
        :id="collapseId"
        :visible="visible"
        class-name="px-xs pt-xs pb-2xs"
        role="region"
        :aria-labelledby="`${collapseId}-trigger`"
        @open="handleOpen"
        @close="handleClose"
      >
        <slot></slot>
      </Collapse>
    </div>
  </div>
</template>
