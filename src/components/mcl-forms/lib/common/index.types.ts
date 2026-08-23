import type { ComputedRef } from 'vue'

export type InputSizeType = 'sm' | 'md' | 'lg'

/**
 * Props every field control accepts on its own, independent of any
 * MclFormGroup around it. `invalid`, `required` and `disabled` are
 * deliberately `boolean | undefined`: `undefined` means "inherit from the
 * group", which a `false` default would make indistinguishable.
 */
export interface FieldOwnProps {
  id?: string
  name?: string
  invalid?: boolean
  required?: boolean
  disabled?: boolean
}

/** The resolved field state a control renders from. */
export interface FieldContext {
  id: string
  name: string | undefined
  errorId: string
  descriptionId: string | undefined
  invalid: ComputedRef<boolean>
  required: ComputedRef<boolean>
  disabled: ComputedRef<boolean>
  /** description and error ids in reading order, or undefined if neither applies. */
  describedBy: ComputedRef<string | undefined>
  /**
   * True when the surrounding MclFormGroup renders the error region itself, so
   * the control must not render its own. Not reactive: it is decided at setup
   * from the *presence* of the group's error prop or slot, not from its value.
   */
  feedbackOwnedByGroup: boolean
}
