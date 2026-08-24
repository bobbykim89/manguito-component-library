<script setup lang="ts">
import type { ColorPalette } from '@bobbykim/manguito-theme'
import { computed } from 'vue'
import { useFieldContext } from '../common/fieldContext'
import type { InputSizeType } from '../common/index.types'
import { useToggleControl } from '../common/useToggleControl'

const props = withDefaults(
  defineProps<{
    id?: string
    name?: string
    size?: InputSizeType
    bgColor?: ColorPalette
    checkedBgColor?: ColorPalette
    indicatorColor?: ColorPalette
    /** Also the focus-ring colour, via useToggleControl. */
    borderColor?: ColorPalette
    showShadow?: boolean
    value?: string | number
    invalid?: boolean
    required?: boolean
    disabled?: boolean
  }>(),
  {
    size: 'md',
    bgColor: 'light-1',
    checkedBgColor: 'success',
    indicatorColor: 'light-1',
    borderColor: 'dark-1',
    showShadow: false,
    value: '',
    invalid: undefined,
    required: undefined,
    disabled: undefined,
  },
)

const model = defineModel<string | number | null>({ default: null })

const emit = defineEmits<{
  (e: 'change', event: Event): void
}>()

const field = useFieldContext(props, { rendersOwnFeedback: false })
// No `rounded` prop here, so useToggleControl's optional `rounded` is what
// lets the props proxy be passed straight through.
const { boxClass, sizeClass } = useToggleControl(props)

/**
 * The context deliberately has no id fallback for `name` — a generated name
 * entering a form submission is not opt-out-able for the other controls. A
 * radio is the exception: `name` is what makes the set behave as one, so
 * falling back to the resolved id is correct here and nowhere else.
 */
const radioName = computed<string>(() => field.name.value ?? field.id)

const onChange = (event: Event): void => {
  emit('change', event)
}
</script>

<template>
  <div class="relative inline-flex">
    <input
      :id="field.id"
      v-model="model"
      type="radio"
      class="peer absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none opacity-0 disabled:cursor-not-allowed"
      :name="radioName"
      :value="value"
      :required="field.required.value"
      :disabled="field.disabled.value"
      :aria-invalid="field.invalid.value || undefined"
      :aria-describedby="field.describedBy.value"
      @change="onChange"
    />
    <span
      aria-hidden="true"
      class="relative inline-block rounded-full border transition-colors duration-200 ease-linear before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:opacity-0 before:transition-opacity before:duration-200 peer-checked:before:opacity-100 peer-disabled:opacity-50"
      :class="[boxClass, sizeClass]"
    ></span>
  </div>
</template>
