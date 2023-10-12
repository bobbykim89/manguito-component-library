<script setup lang="ts">
import { computed } from 'vue'
import type {
  ColorPalette,
  BodyText,
  InputType,
  SpacingLevel,
} from '@bobbykim/manguito-theme'
import generateClass from '@bobbykim/manguito-theme'

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
    placeholder?: string
    type?: InputType
    displayShadow?: boolean
    isRequired?: boolean
    spacing?: SpacingLevel
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
    placeholder: '',
    type: 'text',
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
  <div :class="generateClass('MARGINB', spacing)">
    <label
      v-if="displayLabel"
      :for="identifier"
      v-html="labelText"
      class="inline-block mb-2xs"
      :class="getLabelClass(labelSize, labelColor, labelBold)"
    ></label>
    <input
      :id="identifier"
      :type="type"
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
      :placeholder="placeholder"
      :required="isRequired"
    />
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

.input__text:focus + .input__decorator::before {
  width: 100%;
}
</style>
