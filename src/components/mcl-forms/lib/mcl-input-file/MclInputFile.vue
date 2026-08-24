<script setup lang="ts">
import type { ColorPalette } from '@bobbykim/manguito-theme'
import { generateClass } from '@bobbykim/manguito-theme'
import { computed, ref } from 'vue'
import XMark from '../assets/XMark.vue'
import FieldFeedback from '../common/FieldFeedback.vue'
import { useFieldContext } from '../common/fieldContext'
import { useInputSurface } from '../common/useInputSurface'

const props = withDefaults(
  defineProps<{
    id?: string
    name?: string
    accept?: string
    buttonText?: string
    buttonTextColor?: ColorPalette
    buttonColor?: ColorPalette
    showBorder?: boolean
    borderColor?: ColorPalette
    rounded?: boolean
    bgColor?: ColorPalette
    textColor?: ColorPalette
    showShadow?: boolean
    showClear?: boolean
    invalidFeedback?: string
    invalid?: boolean
    required?: boolean
    disabled?: boolean
  }>(),
  {
    accept: 'image/jpg,image/jpeg,image/png',
    buttonText: 'Browse File',
    buttonTextColor: 'dark-3',
    buttonColor: 'light-4',
    showBorder: false,
    borderColor: 'light-4',
    rounded: false,
    bgColor: 'light-1',
    textColor: 'black',
    showShadow: true,
    showClear: false,
    invalid: undefined,
    required: undefined,
    disabled: undefined,
  },
)

const model = defineModel<File | null>()

defineSlots<{
  'invalid-feedback'?: () => unknown
}>()

const field = useFieldContext(props)
// This component has no showHighlight prop, which is why the option is
// optional on InputSurfaceOptions. Pass the proxy, never a spread literal.
const surfaceClass = useInputSurface(props)

const inputRef = ref<HTMLInputElement>()
// Bumping the key remounts the input, which is the only reliable way to clear
// a file input's value across browsers.
const fileInputKey = ref<number>(0)

const onBrowseClick = (): void => {
  inputRef.value?.click()
}

const onChangeFile = (event: Event): void => {
  const files = (event.target as HTMLInputElement).files
  model.value = files && files.length > 0 ? files[0] : null
}

const onClearFile = (): void => {
  model.value = null
  fileInputKey.value++
}

const buttonClass = computed<string>(() => {
  const classArray: string[] = [
    generateClass.bgColorVariant({ color: props.buttonColor }),
    generateClass.textColorVariant({ color: props.buttonTextColor }),
  ]
  if (props.rounded) {
    classArray.push('rounded-l-md')
  }
  return classArray.join(' ')
})

const clearButtonClass = computed<string>(() => {
  const classArray: string[] = [
    generateClass.bgColorVariant({ color: props.buttonColor }),
  ]
  if (props.rounded) {
    classArray.push('rounded-r-md')
  }
  return classArray.join(' ')
})
</script>

<template>
  <div>
    <div class="flex items-center overflow-hidden" :class="surfaceClass">
      <div class="my-3xs mr-xs ml-3xs shrink-0">
        <button
          type="button"
          :aria-controls="field.id"
          :disabled="field.disabled.value"
          class="max-w-full px-xs py-2xs transition-all duration-200 ease-linear hover:bg-opacity-70 disabled:cursor-not-allowed disabled:opacity-50"
          :class="buttonClass"
          @click="onBrowseClick"
        >
          {{ buttonText }}
        </button>
      </div>
      <input
        :id="field.id"
        ref="inputRef"
        :key="fileInputKey"
        type="file"
        class="w-full bg-transparent file:hidden"
        :name="field.name.value"
        :accept="accept"
        :required="field.required.value"
        :disabled="field.disabled.value"
        :aria-invalid="field.invalid.value || undefined"
        :aria-describedby="field.describedBy.value"
        @change="onChangeFile"
      />
      <!--
        The handler lives on the button alone. It used to sit on this wrapper
        too, so one click fired it twice. And without type="button" the button
        submitted any surrounding form.
      -->
      <div v-if="showClear" class="my-3xs mr-3xs self-stretch">
        <button
          type="button"
          aria-label="Clear selected file"
          :disabled="field.disabled.value"
          class="flex h-full items-center px-xs py-2xs transition-all duration-200 ease-linear hover:bg-opacity-70 disabled:cursor-not-allowed disabled:opacity-50"
          :class="clearButtonClass"
          @click="onClearFile"
        >
          <x-mark :color="buttonTextColor" class-name="h-xs"></x-mark>
        </button>
      </div>
    </div>
    <field-feedback
      v-if="!field.feedbackOwnedByGroup"
      :id="field.errorId"
      :invalid="field.invalid.value"
      :text="invalidFeedback"
    >
      <slot v-if="$slots['invalid-feedback']" name="invalid-feedback" />
    </field-feedback>
  </div>
</template>
