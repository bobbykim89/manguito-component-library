<script setup lang="ts">
import { withDefaults, ref, computed, onMounted, onBeforeUnmount } from 'vue'
import generateClass from '@mcl/manguito-theme'
import type {
  ColorPalette,
  HeadingSize,
} from '@mcl/manguito-theme/theme/theme.types'

const props = withDefaults(
  defineProps<{
    title: string
    titleColor?: ColorPalette
    titleSize?: HeadingSize
    borderColor?: ColorPalette
    bgColor?: ColorPalette
    btnColor?: ColorPalette
    iconColor?: ColorPalette
    rounded?: boolean
    displayShadow?: boolean
    openOnMount?: boolean
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
    openOnMount: false,
  }
)

const toggle = ref(props.openOnMount)
const emit = defineEmits(['accordion-click'])

const toggleAction = (e: Event, title: string): void => {
  toggle.value = !toggle.value

  emit('accordion-click', { event: e, title: title })
}

const getBorderClass = (
  bColor: ColorPalette,
  bgColor: ColorPalette,
  rounded: boolean,
  dShadow: boolean
): string => {
  /**
   * @bColor - borderColor
   * @bgColor - bgColor
   * @rounded - rounded
   * @dShadow - displayShadow
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
  }

  return borderInfo.join(' ')
}

const getTitleClass = (size: HeadingSize, color: ColorPalette): string => {
  /**
   * @size - titleSize
   * @color - titleColor
   */
  return `${generateClass('H3', size)} ${generateClass('TEXTCOLOR', color)}`
}

const textSlot = ref()
const slotHeight = ref<number>()

const initObserver = (): ResizeObserver => {
  const observer = new ResizeObserver(() => {
    slotHeight.value = textSlot.value.scrollHeight
  })
  // observer.observe(textSlot.value)
  return observer
}

const slotTextVal = computed(() => {
  return {
    height: textSlot.value && toggle.value ? slotHeight.value + 'px' : '0px',
  }
})

onMounted(() => {
  initObserver().observe(textSlot.value)
})
onBeforeUnmount(() => {
  initObserver().unobserve(textSlot.value)
})
</script>

<template>
  <div
    class="w-full overflow-hidden p-2xs"
    :class="getBorderClass(borderColor, bgColor, rounded, displayShadow)"
  >
    <div
      @click="toggleAction($event, title)"
      class="flex justify-between items-center w-full px-4 py-2 cursor-pointer hover:bg-opacity-70 transition duration-200 ease-in"
      :class="[rounded ? 'rounded-lg' : '', generateClass('BGCOLOR', btnColor)]"
    >
      <h3 :class="getTitleClass(titleSize, titleColor)">{{ title }}</h3>
      <div class="flex justify-center items-center ml-xs md:ml-sm lg:ml-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          class="h-xs transition-all duration-300 ease-in"
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
    <div
      class="h-auto overflow-hidden"
      :class="[
        toggle
          ? 'transition-all duration-500 ease-in'
          : 'transition-all duration-500 ease-out',
      ]"
      :style="slotTextVal"
    >
      <div
        :class="[
          toggle
            ? 'opacity-100 transition-opacity duration-500 ease-in'
            : 'opacity-0 transition-opacity duration-500 ease-out',
          'px-xs pt-xs pb-2xs',
        ]"
        ref="textSlot"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
