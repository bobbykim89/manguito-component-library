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
    /** The track colour when off. */
    bgColor?: ColorPalette
    /** The track colour when on. */
    checkedBgColor?: ColorPalette
    /** The sliding knob. */
    indicatorColor?: ColorPalette
    borderColor?: ColorPalette
    showShadow?: boolean
    rounded?: boolean
    invalid?: boolean
    required?: boolean
    disabled?: boolean
  }>(),
  {
    size: 'md',
    bgColor: 'dark-1',
    checkedBgColor: 'success',
    indicatorColor: 'light-1',
    borderColor: 'dark-1',
    showShadow: false,
    rounded: true,
    invalid: undefined,
    required: undefined,
    disabled: undefined,
  },
)

const model = defineModel<boolean>()

const emit = defineEmits<{
  (e: 'change', event: Event): void
}>()

const field = useFieldContext(props, { rendersOwnFeedback: false })
const { boxClass, switchVars } = useToggleControl(props)

const onChange = (event: Event): void => {
  emit('change', event)
}
</script>

<template>
  <!--
    No click handler on this wrapper, deliberately. The old one called
    inputRef.click(), so a click that originated on the contained input
    bubbled up and toggled a second time.
  -->
  <div class="switch relative" :style="switchVars">
    <input
      :id="field.id"
      v-model="model"
      type="checkbox"
      role="switch"
      class="peer absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none opacity-0 disabled:cursor-not-allowed"
      :name="field.name.value"
      :required="field.required.value"
      :disabled="field.disabled.value"
      :aria-invalid="field.invalid.value || undefined"
      :aria-describedby="field.describedBy.value"
      @change="onChange"
    />
    <span
      aria-hidden="true"
      class="slider absolute inset-0 transition-all duration-300 before:absolute before:transition-all before:duration-300 peer-disabled:opacity-50"
      :class="boxClass"
    ></span>
  </div>
</template>

<style lang="scss" scoped>
/* The knob's travel distance has to match the track dimensions, so these stay
   in CSS driven by the custom properties useToggleControl supplies. */
.switch {
  width: var(--switch-width);
  height: var(--switch-height);
}

.slider:before {
  content: '';
  height: var(--slider-size);
  width: var(--slider-size);
  left: var(--gutter-size);
  bottom: var(--gutter-size);
}

input:checked + .slider:before {
  transform: translateX(var(--slider-size));
}
</style>
