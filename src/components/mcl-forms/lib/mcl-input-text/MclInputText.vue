<script setup lang="ts">
import type { ColorPalette, InputType } from '@bobbykim/manguito-theme'
import FieldFeedback from '../common/FieldFeedback.vue'
import InputHighlight from '../common/InputHighlight.vue'
import { useFieldContext } from '../common/fieldContext'
import { useInputSurface } from '../common/useInputSurface'

const props = withDefaults(
  defineProps<{
    id?: string
    name?: string
    type?: InputType
    placeholder?: string
    autocomplete?: string
    showBorder?: boolean
    borderColor?: ColorPalette
    rounded?: boolean
    showHighlight?: boolean
    highlightColor?: ColorPalette
    textColor?: ColorPalette
    bgColor?: ColorPalette
    showShadow?: boolean
    invalidFeedback?: string
    minLength?: number
    maxLength?: number
    pattern?: string
    invalid?: boolean
    required?: boolean
    disabled?: boolean
  }>(),
  {
    type: 'text',
    placeholder: '',
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
// props proxy passed directly: a spread literal would snapshot and freeze.
const surfaceClass = useInputSurface(props)
</script>

<template>
  <div>
    <input
      :id="field.id"
      v-model="model"
      class="peer w-full p-2xs outline-none disabled:cursor-not-allowed disabled:opacity-50"
      :class="surfaceClass"
      :type="type"
      :name="field.name.value"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :minlength="minLength"
      :maxlength="maxLength"
      :pattern="pattern"
      :required="field.required.value"
      :disabled="field.disabled.value"
      :aria-invalid="field.invalid.value || undefined"
      :aria-describedby="field.describedBy.value"
    />
    <input-highlight
      v-if="showHighlight"
      :color="highlightColor"
      :rounded="rounded"
    ></input-highlight>
    <!--
      Only when the group does not own the region: rendering both would put
      two elements in the DOM under the same id.
    -->
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
