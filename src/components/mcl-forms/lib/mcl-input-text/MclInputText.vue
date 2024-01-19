<script setup lang="ts">
import { computed } from 'vue'
import type { ColorPalette, InputType } from '@bobbykim/manguito-theme'
import generateClass from '@bobbykim/manguito-theme'
import InputHighlight from '../common/InputHighlight.vue'

const props = withDefaults(
  defineProps<{
    id: string
    displayBorder?: boolean
    borderColor?: ColorPalette
    rounded?: boolean
    displayHighlight?: boolean
    highlightColor?: ColorPalette
    bgColor?: ColorPalette
    placeholder?: string
    type?: InputType
    displayShadow?: boolean
    required?: boolean
    modelValue?: string
    invalidFeedback?: string
    minLength?: string | number
    maxLength?: string | number
    pattern?: string
  }>(),
  {
    displayBorder: false,
    borderColor: 'light-4',
    rounded: false,
    displayHighlight: true,
    highlightColor: 'primary',
    bgColor: 'light-1',
    placeholder: '',
    type: 'text',
    displayShadow: true,
    required: false,
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
</script>

<template>
  <div>
    <input
      :id="id"
      :type="type"
      class="w-full p-2xs outline-none peer peer/validation"
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
      :required="required"
      :minlength="minLength"
      :maxlength="maxLength"
      :pattern="pattern"
    />
    <input-highlight
      v-if="displayHighlight"
      :color="highlightColor"
      :rounded="rounded"
    ></input-highlight>
    <div
      class="peer-valid/validation:hidden peer-inavlid/validation:block ml-3xs"
    >
      <slot name="invalid-feedback">
        <span class="text-xs text-danger">{{ invalidFeedback }}</span>
      </slot>
    </div>
  </div>
</template>
