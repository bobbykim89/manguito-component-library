import { computed, inject, provide, useId, type ComputedRef } from 'vue'
import type { FieldContext, FieldOwnProps } from './index.types'

const FIELD_KEY = Symbol('mcl-field')

export interface FieldProviderOptions {
  fieldId?: string
  name?: string
  invalid?: boolean
  required?: boolean
  disabled?: boolean
  /** Whether the group renders help text, which decides if descriptionId exists. */
  hasHelpText: boolean
  /** Whether the group renders the error region itself. */
  ownsFeedback: boolean
}

/** Joins the description and error ids in reading order. */
const buildDescribedBy = (
  descriptionId: string | undefined,
  errorId: string,
  invalid: ComputedRef<boolean>,
): ComputedRef<string | undefined> =>
  computed<string | undefined>(() => {
    const ids: string[] = []
    if (descriptionId) ids.push(descriptionId)
    if (invalid.value) ids.push(errorId)
    return ids.length > 0 ? ids.join(' ') : undefined
  })

/**
 * Called by MclFormGroup. Publishes the resolved field state to descendant
 * controls and returns the same context so the group can render its own
 * label, help text and error region from it.
 *
 * @param options - the group's own prop values plus what it renders.
 * @returns the field context, also provided to descendants.
 */
export const provideFieldContext = (
  options: FieldProviderOptions,
): FieldContext => {
  const id = options.fieldId ?? useId() ?? ''
  const invalid = computed<boolean>(() => options.invalid ?? false)
  const errorId = `${id}-error`
  const descriptionId = options.hasHelpText ? `${id}-description` : undefined
  const context: FieldContext = {
    id,
    // Defaulting name to the field id is what lets a radio group work without
    // the consumer having to invent one.
    name: options.name ?? id,
    errorId,
    descriptionId,
    invalid,
    required: computed<boolean>(() => options.required ?? false),
    disabled: computed<boolean>(() => options.disabled ?? false),
    describedBy: buildDescribedBy(descriptionId, errorId, invalid),
    feedbackOwnedByGroup: options.ownsFeedback,
  }
  provide(FIELD_KEY, context)
  return context
}

/**
 * Called by every field control. Resolves each value as
 * explicit prop -> injected group context -> default, so a control works
 * identically inside an MclFormGroup and on its own.
 *
 * @param own - the control's own reactive props.
 * @returns the resolved field context.
 */
export const useFieldContext = (own: FieldOwnProps): FieldContext => {
  const group = inject<FieldContext | null>(FIELD_KEY, null)
  const fallbackId = useId() ?? ''

  // An explicit id wins, then the group's, then a generated one. Resolved once
  // rather than in a computed, because the error and description ids derive
  // from it and must stay stable for aria-describedby to keep pointing at them.
  const id = own.id ?? group?.id ?? fallbackId
  const ownsId = own.id !== undefined || group === null

  const invalid = computed<boolean>(
    () => own.invalid ?? group?.invalid.value ?? false,
  )
  const errorId = ownsId ? `${id}-error` : group!.errorId
  const descriptionId = ownsId ? undefined : group!.descriptionId

  return {
    id,
    name: own.name ?? group?.name,
    errorId,
    descriptionId,
    invalid,
    required: computed<boolean>(
      () => own.required ?? group?.required.value ?? false,
    ),
    disabled: computed<boolean>(
      () => own.disabled ?? group?.disabled.value ?? false,
    ),
    describedBy: buildDescribedBy(descriptionId, errorId, invalid),
    feedbackOwnedByGroup: group?.feedbackOwnedByGroup ?? false,
  }
}
