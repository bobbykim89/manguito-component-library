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
    /**
     * Presence of this prop (or the `invalid-feedback` slot) is what makes the
     * group own the error region, and it is decided once at setup. Bind it to a
     * string — use `''` for "no error yet" — not to a possibly-undefined value:
     * `:invalid-feedback="errors.email"` with `errors.email` undefined at mount
     * leaves the group not owning the region, and its message never renders.
     */
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

// All three flags are decided once, from *presence* rather than from a
// current value. Checking truthiness (`props.invalidFeedback || slots.x`)
// would leave a group bound to `ref('')` — the idiomatic "no error yet"
// binding — never owning the region, since `''` is falsy but very much
// present. Deriving them from "is there content right now" would also
// freeze them at their mount-time answer: an error appearing on submit
// would then wire up wrong.
const hasFeedbackSlot = slots['invalid-feedback'] !== undefined
const hasHelpText = props.helpText !== undefined || slots.help !== undefined
const ownsFeedback = props.invalidFeedback !== undefined || hasFeedbackSlot

// Decided once, alongside the other setup-time flags above, for the same
// reason: `FieldContext.isGroupLabel` is a plain boolean, not reactive, so
// the template's own fieldset/label branch must read this same frozen local
// rather than the live `groupLabel` prop. Reading the live prop in the
// template while the context freezes the value would let the two disagree
// after a later `groupLabel` change — descendants resolving ids from the
// (stale) context while the DOM has already switched structure, which is
// how a fieldset ends up with every control claiming the same element id.
const isGroupLabel = props.groupLabel

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
  isGroupLabel,
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
  <fieldset v-if="isGroupLabel" class="m-0 min-w-0 border-0 p-0">
    <legend v-if="label || $slots.label" class="inline-block">
      <slot name="label">
        <span class="mb-2xs block" :class="labelTextClass">{{ label }}</span>
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
      <slot v-if="hasFeedbackSlot" name="invalid-feedback" />
    </field-feedback>
  </fieldset>

  <div v-else>
    <label v-if="label || $slots.label" :for="field.id" class="inline-block">
      <slot name="label">
        <span class="mb-2xs block" :class="labelTextClass">{{ label }}</span>
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
      <slot v-if="hasFeedbackSlot" name="invalid-feedback" />
    </field-feedback>
  </div>
</template>
