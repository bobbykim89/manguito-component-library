import {
  computed,
  inject,
  provide,
  toValue,
  useId,
  type ComputedRef,
  type MaybeRefOrGetter,
} from 'vue'
import type { FieldContext, FieldOwnProps } from './index.types'

const FIELD_KEY = Symbol('mcl-field')

/**
 * Options passed to `provideFieldContext`.
 *
 * `name`, `invalid`, `required` and `disabled` accept a ref or getter
 * because the caller (MclFormGroup) can only pass an object literal here —
 * `hasHelpText` and `ownsFeedback` are derived from slot/prop *presence*,
 * not from props, so the whole options object cannot just be the group's
 * reactive `props`. Passing a plain value for these four freezes it at
 * whatever it was during setup; pass `() => props.invalid` (or a ref)
 * instead whenever the source can change, exactly as `useInputSurface`
 * requires reactive values to be read from its `options` at call time.
 *
 * `fieldId`, `hasHelpText`, `ownsFeedback` and `isGroupLabel` stay plain:
 * they are fixed for the group's lifetime by construction (decided once,
 * at the group's own setup, from which slots/props are present).
 */
export interface FieldProviderOptions {
  fieldId?: string
  name?: MaybeRefOrGetter<string | undefined>
  invalid?: MaybeRefOrGetter<boolean | undefined>
  required?: MaybeRefOrGetter<boolean | undefined>
  disabled?: MaybeRefOrGetter<boolean | undefined>
  /** Whether the group renders help text, which decides if descriptionId exists. */
  hasHelpText: boolean
  /** Whether the group renders the error region itself. */
  ownsFeedback: boolean
  /**
   * True when the group renders a `<fieldset>`/`<legend>` around multiple
   * controls (radio/checkbox groups); false when it renders a single
   * `<label for>` bound to one control's id. Decides whether descendant
   * controls share the group's element id or generate their own — see
   * `useFieldContext`.
   */
  isGroupLabel: boolean
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
 * @param options - the group's own state. `name`/`invalid`/`required`/
 *   `disabled` may be refs or getters so changes after setup propagate —
 *   see `FieldProviderOptions`.
 * @returns the field context, also provided to descendants.
 */
export const provideFieldContext = (
  options: FieldProviderOptions,
): FieldContext => {
  const id = options.fieldId ?? useId() ?? ''
  const invalid = computed<boolean>(() => toValue(options.invalid) ?? false)
  const errorId = `${id}-error`
  const descriptionId = options.hasHelpText ? `${id}-description` : undefined
  const context: FieldContext = {
    id,
    // Defaulting name to the field id is what lets a radio group work without
    // the consumer having to invent one.
    name: computed<string | undefined>(() => toValue(options.name) ?? id),
    errorId,
    descriptionId,
    invalid,
    required: computed<boolean>(() => toValue(options.required) ?? false),
    disabled: computed<boolean>(() => toValue(options.disabled) ?? false),
    describedBy: buildDescribedBy(descriptionId, errorId, invalid),
    feedbackOwnedByGroup: options.ownsFeedback,
    isGroupLabel: options.isGroupLabel,
  }
  provide(FIELD_KEY, context)
  return context
}

/**
 * Called by every field control. Resolves each value as
 * explicit prop -> injected group context -> default, so a control works
 * identically inside an MclFormGroup and on its own.
 *
 * Element id and region ids are resolved by two independent rules:
 * - the element id follows whichever `<label for>`/`<legend>` shape the
 *   group renders (`isGroupLabel`) — see the id-resolution block below.
 * - the error/description ids follow who *renders* those regions
 *   (`feedbackOwnedByGroup` / the group having a `descriptionId` at all),
 *   regardless of whose element id this control ended up with. A group's
 *   help-text/error regions are keyed to the group's own id, and their
 *   existence is decided once at the group's setup, so pointing at them
 *   never dangles even when this control supplies its own element id.
 *
 * @param own - the control's own reactive props.
 * @returns the resolved field context.
 */
export const useFieldContext = (own: FieldOwnProps): FieldContext => {
  const group = inject<FieldContext | null>(FIELD_KEY, null)
  const fallbackId = useId() ?? ''

  // Resolved once rather than in a computed, because the error and
  // description ids derive from it and must stay stable for
  // aria-describedby to keep pointing at them. An empty string is treated as
  // "not supplied" so it can never produce a dangling
  // `aria-describedby="-error"`.
  let id: string
  if (own.id !== undefined && own.id !== '') {
    id = own.id
  } else if (group !== null && !group.isGroupLabel) {
    // Single-control mode: the group renders one <label for>, so this
    // control must reuse the group's id verbatim for the label to bind.
    id = group.id
  } else {
    // Fieldset mode (or standalone): no single `for` to match, so each
    // control gets its own generated id.
    id = fallbackId
  }

  // The error region id follows who renders it, not who owns `id`.
  let errorId: string
  if (group !== null && group.feedbackOwnedByGroup) {
    errorId = group.errorId
  } else {
    errorId = `${id}-error`
  }
  // The description id is inherited whenever the group has one; there is no
  // own-description-region case because controls never render their own.
  const descriptionId = group?.descriptionId

  const invalid = computed<boolean>(
    () => own.invalid ?? group?.invalid.value ?? false,
  )

  return {
    id,
    // Mirrors the grouped default: a standalone control still groups with
    // siblings that share the same explicit name, and falls back to its own
    // id — the same rule the provider applies for itself.
    name: computed<string | undefined>(
      () => own.name ?? toValue(group?.name) ?? id,
    ),
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
    // Reported truthfully, not hardcoded: this value is inert for
    // provide/inject (a leaf never re-provides it), but the control's own
    // template reads its own returned context, and a control inside a
    // fieldset needs to know it — e.g. MclInputRadio renders differently as
    // part of a set than alone. `false` here would be a lie it could act on.
    isGroupLabel: group?.isGroupLabel ?? false,
  }
}
