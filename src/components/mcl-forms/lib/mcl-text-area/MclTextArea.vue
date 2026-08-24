<script setup lang="ts">
import type { ColorPalette } from '@bobbykim/manguito-theme'
import FieldFeedback from '../common/FieldFeedback.vue'
import InputHighlight from '../common/InputHighlight.vue'
import { useFieldContext } from '../common/fieldContext'
import { useInputSurface } from '../common/useInputSurface'

const props = withDefaults(
  defineProps<{
    id?: string
    name?: string
    placeholder?: string
    rows?: number
    showBorder?: boolean
    borderColor?: ColorPalette
    rounded?: boolean
    showHighlight?: boolean
    highlightColor?: ColorPalette
    textColor?: ColorPalette
    bgColor?: ColorPalette
    showShadow?: boolean
    invalidFeedback?: string
    invalid?: boolean
    required?: boolean
    disabled?: boolean
  }>(),
  {
    placeholder: '',
    rows: 5,
    showBorder: false,
    borderColor: 'light-4',
    rounded: false,
    showHighlight: true,
    highlightColor: 'primary',
    textColor: 'black',
    bgColor: 'light-1',
    showShadow: true,
    invalid: undefined,
    required: undefined,
    disabled: undefined,
  },
)

const model = defineModel<string>()

defineSlots<{
  'invalid-feedback'?: () => unknown
}>()

const field = useFieldContext(props)
const surfaceClass = useInputSurface(props)
</script>

<template>
  <div>
    <textarea
      :id="field.id"
      v-model="model"
      class="peer w-full p-2xs outline-none disabled:cursor-not-allowed disabled:opacity-50"
      :class="surfaceClass"
      :name="field.name.value"
      :rows="rows"
      :placeholder="placeholder"
      :required="field.required.value"
      :disabled="field.disabled.value"
      :aria-invalid="field.invalid.value || undefined"
      :aria-describedby="field.describedBy.value"
    />
    <input-highlight
      v-if="showHighlight"
      :color="highlightColor"
      :rounded="rounded"
      :offset="2.5"
    ></input-highlight>
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
