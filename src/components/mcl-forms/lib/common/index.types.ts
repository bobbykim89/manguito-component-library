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
  /**
   * Resolved once at setup (explicit prop -> shared group id in
   * single-control mode -> a freshly generated id). Changing the source
   * prop after mount has no effect — this is a stable DOM id, not a
   * reactive value.
   */
  id: string
  /**
   * Reactive because a group's own `name` prop can change after setup, and
   * an object literal built from it (as MclFormGroup must build, since
   * `hasHelpText`/`ownsFeedback` are derived from slot/prop presence rather
   * than being props themselves) would otherwise snapshot the value.
   */
  name: ComputedRef<string | undefined>
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
  /**
   * True when the group renders a `<fieldset>`/`<legend>` around multiple
   * controls (radio/checkbox groups), so descendants must not all claim the
   * group's element id. False when the group renders a single `<label for>`
   * bound to one control, which must reuse the group's id verbatim.
   */
  isGroupLabel: boolean
}
