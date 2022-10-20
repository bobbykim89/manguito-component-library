<script setup lang="ts">
import {
  defineComponent,
  withDefaults,
  ref,
  Transition,
  computed,
  onMounted,
} from 'vue'
import generateClass from '@mcl/manguito-theme'
import type {
  ColorPalette,
  Location,
  Range,
  HeadingSize,
} from '@mcl/manguito-theme/theme/theme.types'

defineComponent({
  name: 'Accordion',
})

const props = withDefaults(
  defineProps<{
    borderColor?: ColorPalette
    rounded?: boolean
    displayHighlight?: boolean
    highlightLocation?: Location
    highlightColor?: ColorPalette
    highlightWidth?: Range<12>
    displayNumber?: boolean
    title: string
    titleSize?: HeadingSize
    titleColor?: ColorPalette
    openOnMount?: boolean
    iconColor?: ColorPalette
    bgColor?: ColorPalette
    slotBgColor?: ColorPalette
  }>(),
  {
    borderColor: 'light-4',
    rounded: false,
    displayHighlight: true,
    highlightLocation: 'left',
    highlightColor: 'secondary',
    highlightWidth: 8,
    displayNumber: true,
    titleSize: 'sm',
    titleColor: 'dark-3',
    openOnMount: false,
    iconColor: 'dark-3',
    bgColor: 'white',
    slotBgColor: 'light-2',
  }
)

const toggle = ref(props.openOnMount)
const emit = defineEmits(['accordion-click'])

const toggleAction = (e: Event): void => {
  toggle.value = !toggle.value

  emit('accordion-click', e)
}

const getBorderClass = (
  bColor: ColorPalette,
  dHl: boolean,
  hlColor: ColorPalette,
  hlLocation: Location,
  hlWidth: Range<12>
): string => {
  /**
   * @bColor - borderColor
   * @dHl - displayHighlight
   * @hlColor - highlightColor
   * @hlLocation - highlightLocation
   * @hlWidth - highlightWidth
   */

  if (!dHl || hlWidth === 0) {
    return `border ${generateClass('BORDER', bColor)}`
  }
  if (dHl && hlLocation === 'top') {
    return `border ${generateClass('BORDER', bColor)} ${generateClass(
      'BORDERT',
      hlColor
    )} ${generateClass('BORDERTW', hlWidth)}`
  }
  return `border ${generateClass('BORDER', bColor)} ${generateClass(
    'BORDERL',
    hlColor
  )} ${generateClass('BORDERLW', hlWidth)}`
}

const getTitleClass = (size: HeadingSize, color: ColorPalette): string => {
  /**
   * @size - titleSize
   * @color - titleColor
   */
  return `${generateClass('H3', size)} ${generateClass('TEXTCOLOR', color)}`
}

const getIconColor = (color: ColorPalette): string => {
  /**
   * @color - iconColor
   */
  return generateClass('SVGFILL', color)
}

const getSlotBgColor = (color: ColorPalette): string => {
  /**
   * @color - slotBgColor
   */
  return generateClass('BGCOLOR', color)
}

const textSlot = ref()

const slotTextVal = computed(() => {
  return {
    height: toggle.value ? textSlot.value.scrollHeight + 'px' : '0px',
  }
})
</script>

<template>
  <section
    class="overflow-hidden"
    :class="[
      rounded ? 'rounded-md' : '',
      getBorderClass(
        borderColor,
        displayHighlight,
        highlightColor,
        highlightLocation,
        highlightWidth
      ),
    ]"
  >
    <div
      class="py-sm px-md cursor-pointer transition-all duration-500"
      :class="[
        toggle
          ? `border-b ${generateClass('BORDERB', borderColor)} ease-in`
          : 'ease-out',
        generateClass('BGCOLOR', bgColor),
      ]"
      @click="toggleAction"
    >
      <div class="flex justify-between items-center">
        <h3 :class="getTitleClass(titleSize, titleColor)">
          {{ title }}
        </h3>
        <div class="flex justify-center items-center ml-xs md:ml-sm lg:ml-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            class="h-md"
            :class="[
              !toggle ? 'rotate-0' : 'rotate-180',
              `transition-all duration-300 ease-in ${getIconColor(iconColor)}`,
            ]"
          >
            <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
            <path
              d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z"
            />
          </svg>
        </div>
      </div>
    </div>
    <div
      class="h-auto overflow-hidden"
      :class="[
        toggle
          ? 'transition-all duration-500 ease-in'
          : 'transition-all duration-500 ease-out',
        generateClass('BGCOLOR', slotBgColor),
        ,
      ]"
      :style="slotTextVal"
      ref="textSlot"
    >
      <div
        :class="[
          toggle
            ? 'opacity-100 transition-opacity duration-500 ease-in'
            : 'opacity-0 transition-opacity duration-500 ease-out',
          'px-md py-sm',
        ]"
      >
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
