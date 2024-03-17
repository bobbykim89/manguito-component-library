<script setup lang="ts">
import { computed, ref } from 'vue'
import generateClass from '@bobbykim/manguito-theme'
import type {
  ColorPalette,
  BodyText,
  SpacingLevel,
} from '@bobbykim/manguito-theme'
import type { ColorMap, SelectOptionType } from './index.type'

const colors = ref<ColorMap>({
  primary: '#ec489a',
  secondary: '#00feda',
  success: '#78be20',
  info: '#00a3e0',
  warning: '#f1ac18',
  danger: '#cc2f2f',
  'light-1': '#fafafa',
  'light-2': '#f1f1f1',
  'light-3': '#e8e8e8',
  'light-4': '#d0d0d0',
  'dark-1': '#747474',
  'dark-2': '#484848',
  'dark-3': '#1f2937',
  'dark-4': '#191919',
  black: '#000',
  white: 'fff',
  transparent: 'transparent',
})

const props = withDefaults(
  defineProps<{
    identifier: string
    displayLabel?: boolean
    labelText?: string
    labelSize?: BodyText
    labelColor?: ColorPalette
    labelBold?: boolean
    displayBorder?: boolean
    borderColor?: ColorPalette
    rounded?: boolean
    displayHighlight?: boolean
    highlightColor?: ColorPalette
    bgColor?: ColorPalette
    arrowColor?: ColorPalette
    placeholder?: string
    displayShadow?: boolean
    isRequired?: boolean
    spacing?: SpacingLevel
    options: SelectOptionType[]
    modelValue?: string
  }>(),
  {
    displayLabel: true,
    labelSize: 'md',
    labelColor: 'dark-3',
    labelBold: true,
    displayBorder: false,
    borderColor: 'light-4',
    rounded: false,
    displayHighlight: true,
    highlightColor: 'primary',
    bgColor: 'light-1',
    arrowColor: 'dark-4',
    placeholder: '',
    displayShadow: true,
    isRequired: false,
    spacing: 'md',
  }
)

const emit = defineEmits(['update:modelValue'])
const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const arrowColor = computed(() => {
  return { '--arrow-color': colors.value[props.arrowColor] }
})

const getLabelClass = (
  size: BodyText,
  color: ColorPalette,
  bold: boolean
): string => {
  /**
   * @size - labelSize
   * @color - labelColor
   * @bold - labelBold
   */

  const classArray: string[] = [
    generateClass('BODYTEXT', size),
    generateClass('TEXTCOLOR', color),
  ]

  if (bold) {
    classArray.push('font-bold')
  }

  return classArray.join(' ')
}

const getInputClass = (
  bgColor: ColorPalette,
  dBorder: boolean,
  bColor: ColorPalette,
  dHL: boolean,
  dShadow: boolean,
  rounded: boolean
): string => {
  /**
   * @bgColor - bgColor
   * @dBorder - displayBorder
   * @bColor - borderColor
   * @dHL - displayHighlight
   * @dShadow - displayShadow
   * @rounded - rounded
   */

  const classArray: string[] = [generateClass('BGCOLOR', bgColor)]
  const lightColor: string[] = ['light-1', 'light-2', 'light-3', 'light-4']
  if (!lightColor.includes(bgColor)) {
    classArray.push('text-white')
  }
  if (dBorder) {
    classArray.push('border-2')
    classArray.push(generateClass('BORDER', bColor))
  }
  if (!dHL) {
    classArray.push(
      'focus:ring-4 ring-offset-2 transition-all duration-300 ease-linear'
    )
    classArray.push(generateClass('FOCUSRING', bColor))
  }
  if (dShadow) {
    classArray.push('shadow-md')
  }
  if (rounded) {
    classArray.push('rounded-md')
  }
  return classArray.join(' ')
}
const getHighlightClass = (color: ColorPalette, rounded: boolean): string => {
  /**
   * @color - highlightColor
   * @rounded - rounded
   */
  const classArray: string[] = [generateClass('BEFOREBG', color)]
  if (rounded) {
    classArray.push('rounded-b-md')
  }
  return classArray.join(' ')
}
</script>

<template>
  <div :class="generateClass('MARGINB', spacing)" :style="arrowColor">
    <label
      v-if="displayLabel"
      :for="identifier"
      v-html="labelText"
      class="inline-block mb-2xs"
      :class="getLabelClass(labelSize, labelColor, labelBold)"
    ></label>
    <select
      :id="identifier"
      class="w-full p-2xs outline-none input__text"
      :class="
        getInputClass(
          bgColor,
          displayBorder,
          borderColor,
          displayHighlight,
          displayShadow,
          rounded
        )
      "
      v-model="inputValue"
      :required="isRequired"
    >
      <option
        v-if="placeholder"
        class="p-2xs"
        v-html="placeholder"
        value=""
        disabled
        hidden
        selected
      ></option>
      <option
        v-for="item in options"
        :key="item.text"
        class="p-2xs"
        v-html="item.text"
        :value="item.value"
      ></option>
    </select>
    <div
      v-if="displayHighlight"
      class="relative -top-1 h-3xs overflow-hidden input__decorator"
      :class="getHighlightClass(highlightColor, rounded)"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.input__decorator {
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 0;
    transition: width 0.3s linear;
  }
}

.input__text {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: linear-gradient(
      45deg,
      transparent 50%,
      var(--arrow-color) 50%
    ),
    linear-gradient(135deg, var(--arrow-color) 50%, transparent 50%);
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), 100% 0;
  background-size: 5px 5px, 5px 5px, 2.5em 2.5em;
  background-repeat: no-repeat;
}

.input__text:focus {
  background-image: linear-gradient(
      45deg,
      var(--arrow-color) 50%,
      transparent 50%
    ),
    linear-gradient(135deg, transparent 50%, var(--arrow-color) 50%);

  background-position: calc(100% - 15px) 1em, calc(100% - 20px) 1em, 100% 0;
  background-size: 5px 5px, 5px 5px, 2.5em 2.5em;
  background-repeat: no-repeat;
  outline: 0;
}

.input__text:focus + .input__decorator::before {
  width: 100%;
}
</style>
