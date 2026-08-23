<script setup lang="ts">
import type { BodyText, ColorPalette } from '@bobbykim/manguito-theme'
import { generateClass } from '@bobbykim/manguito-theme'
import { computed } from 'vue'
import FieldFeedback from '../common/FieldFeedback.vue'
import { provideFieldContext } from '../common/fieldContext'

const props = withDefaults(
  defineProps<{
    /** Drives both the label's `for` and the descendant control's id. */
    fieldId?: string
    /** Render `<fieldset>`/`<legend>` instead of `<label>`, for radio and checkbox sets. */
    groupLabel?: boolean
    label?: string
    helpText?: string
    invalidFeedback?: string
    invalid?: boolean
    required?: boolean
    disabled?: boolean
    textColor?: ColorPalette
    textSize?: BodyText
    textBold?: boolean
  }>(),
  {
    groupLabel: false,
    textColor: 'dark-3',
    textSize: 'md',
    textBold: false,
    // Explicit `undefined` so an omitted prop stays undefined rather than
    // being coerced to false by Vue's boolean casting. Descendant controls
    // read `undefined` as "nothing to inherit".
    invalid: undefined,
    required: undefined,
    disabled: undefined,
  },
)

const slots = defineSlots<{
  default?: () => unknown
  label?: () => unknown
  help?: () => unknown
  'invalid-feedback'?: () => unknown
}>()

// Both flags are decided once, from *presence* rather than from a current
// value. Deriving them from truthiness would freeze them at their mount-time
// answer: an error appearing on submit would then wire up wrong.
const hasHelpText = Boolean(props.helpText || slots.help)
const ownsFeedback = Boolean(props.invalidFeedback || slots['invalid-feedback'])

// Getters, not values. This is an object literal — it has to be, because the
// three flags above are not props — and a literal of plain values would
// snapshot at setup, so no control would ever see a change.
const field = provideFieldContext({
  fieldId: props.fieldId,
  invalid: () => props.invalid,
  required: () => props.required,
  disabled: () => props.disabled,
  hasHelpText,
  ownsFeedback,
  isGroupLabel: props.groupLabel,
})

const labelTextClass = computed<string>(() => {
  const classArray: string[] = [
    generateClass.textColorVariant({ color: props.textColor }),
    generateClass.bodyTextVariant({ size: props.textSize }),
  ]
  if (props.textBold) {
    classArray.push('font-bold')
  }
  return classArray.join(' ')
})
</script>

<template>
  <!--
    Fieldset mode is the correct structure for a set of controls: the legend
    labels the set and no `for` attribute exists, which is why descendants
    generate their own ids there.
  -->
  <fieldset v-if="groupLabel">
    <legend class="inline-block">
      <slot name="label">
        <p class="mb-2xs" :class="labelTextClass">{{ label }}</p>
      </slot>
    </legend>
    <p v-if="hasHelpText" :id="field.descriptionId" class="mb-2xs text-xs">
      <slot name="help">{{ helpText }}</slot>
    </p>
    <slot />
    <!--
      A group that owns the feedback region must carry `invalid` itself: this
      renders off the group's own prop, and descendants have already skipped
      their own region.
    -->
    <field-feedback
      v-if="ownsFeedback"
      :id="field.errorId"
      :invalid="field.invalid.value"
      :text="invalidFeedback"
    >
      <slot v-if="$slots['invalid-feedback']" name="invalid-feedback" />
    </field-feedback>
  </fieldset>

  <div v-else>
    <label :for="field.id" class="inline-block">
      <slot name="label">
        <p class="mb-2xs" :class="labelTextClass">{{ label }}</p>
      </slot>
    </label>
    <p v-if="hasHelpText" :id="field.descriptionId" class="mb-2xs text-xs">
      <slot name="help">{{ helpText }}</slot>
    </p>
    <slot />
    <field-feedback
      v-if="ownsFeedback"
      :id="field.errorId"
      :invalid="field.invalid.value"
      :text="invalidFeedback"
    >
      <slot v-if="$slots['invalid-feedback']" name="invalid-feedback" />
    </field-feedback>
  </div>
</template>
