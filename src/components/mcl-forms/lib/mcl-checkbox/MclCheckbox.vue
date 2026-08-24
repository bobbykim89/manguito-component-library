<script setup lang="ts">
import type { ColorPalette } from '@bobbykim/manguito-theme'
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
    borderColor?: ColorPalette
    showShadow?: boolean
    rounded?: boolean
    /** Submitted value when checked; native form behaviour only. */
    value?: string | number
    invalid?: boolean
    required?: boolean
    disabled?: boolean
  }>(),
  {
    size: 'md',
    bgColor: 'light-1',
    checkedBgColor: 'warning',
    indicatorColor: 'dark-3',
    borderColor: 'dark-1',
    showShadow: false,
    rounded: false,
    // Explicit `undefined` so omission stays distinguishable from `false`;
    // `undefined` is what lets the surrounding group's value through.
    invalid: undefined,
    required: undefined,
    disabled: undefined,
  },
)

const model = defineModel<boolean>()

const emit = defineEmits<{
  (e: 'change', event: Event): void
}>()

// rendersOwnFeedback: false — this control renders no error region, so
// aria-describedby must not name one unless the group provides it.
const field = useFieldContext(props, { rendersOwnFeedback: false })
// props proxy passed directly: a spread literal would snapshot and freeze.
const { boxClass, sizeClass } = useToggleControl(props)

const onChange = (event: Event): void => {
  emit('change', event)
}
</script>

<template>
  <div class="relative inline-flex">
    <!--
      The native input is the click and focus target, overlaid transparently
      on the visual box. No JS click forwarding, and keyboard operation comes
      free. It must precede the span: peer-* compiles to a sibling selector.
    -->
    <input
      :id="field.id"
      v-model="model"
      type="checkbox"
      class="peer absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none opacity-0 disabled:cursor-not-allowed"
      :name="field.name.value"
      :value="value"
      :required="field.required.value"
      :disabled="field.disabled.value"
      :aria-invalid="field.invalid.value || undefined"
      :aria-describedby="field.describedBy.value"
      @change="onChange"
    />
    <span
      aria-hidden="true"
      class="relative inline-block border p-3xs transition-colors duration-200 ease-linear before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:opacity-0 before:transition-opacity before:duration-200 peer-checked:before:opacity-100 peer-disabled:opacity-50"
      :class="[boxClass, sizeClass]"
    ></span>
  </div>
</template>
