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
  /**
   * Whether the group renders the error region itself. When true, descendant
   * controls skip their own and point `aria-describedby` at the group's
   * `errorId`.
   *
   * A group that owns the feedback region **must carry the `invalid` state
   * itself**: its `FieldFeedback` renders under the group's own `invalid`, so a
   * group with `ownsFeedback: true` and `invalid: false` around a control that
   * is itself invalid renders no error region anywhere — the control has
   * skipped its own — while the control still names the group's `errorId`.
   * Set the group's `invalid` whenever any control in it is invalid.
   */
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

let fallbackIdCount = 0

/**
 * Normalises an absent or empty id to `undefined`. Both are reachable — a
 * consumer can pass `id=""` and `useId()` returns `undefined` outside a setup
 * context — and either one reaching an id slot yields a dangling
 * `aria-describedby="-error"`. Every id source goes through this.
 */
const usableId = (candidate: string | undefined): string | undefined =>
  candidate !== undefined && candidate !== '' ? candidate : undefined

/**
 * Resolves a guaranteed non-empty element id: the caller's, else Vue's
 * `useId()`, else a generated last resort. Must be called during setup.
 */
const resolveFieldId = (candidate: string | undefined): string =>
  usableId(candidate) ?? usableId(useId()) ?? `mcl-field-${++fallbackIdCount}`

/**
 * Joins the description and error ids in reading order.
 *
 * @param errorId - `undefined` when no error region is rendered anywhere, so
 *   the id is omitted even while invalid rather than naming a missing element.
 */
const buildDescribedBy = (
  descriptionId: string | undefined,
  errorId: string | undefined,
  invalid: ComputedRef<boolean>,
): ComputedRef<string | undefined> =>
  computed<string | undefined>(() => {
    const ids: string[] = []
    if (descriptionId) ids.push(descriptionId)
    if (invalid.value && errorId !== undefined) ids.push(errorId)
    return ids.length > 0 ? ids.join(' ') : undefined
  })

/** Options passed to `useFieldContext` by the control. */
export interface FieldConsumerOptions {
  /**
   * Whether this control renders its own `FieldFeedback` region when the group
   * does not own one. Defaults to `true`.
   *
   * The three toggle controls (MclCheckbox, MclInputRadio, MclInputSwitch)
   * render no feedback region at all and must pass `false`. Otherwise a group
   * carrying `invalid` with no `invalidFeedback` gives each of them an
   * `aria-describedby` naming an element nobody renders.
   */
  rendersOwnFeedback?: boolean
}

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
  const id = resolveFieldId(options.fieldId)
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
 * `describedBy` omits the error id entirely when no error region is rendered
 * anywhere — the control declares `rendersOwnFeedback: false` and the group
 * does not own one either. A group that *does* own the region must carry the
 * `invalid` state itself; see `FieldProviderOptions.ownsFeedback`.
 *
 * @param own - the control's own reactive props. Pass your `props` proxy
 *   directly; a spread literal (`{ ...props }`) snapshots every value at setup
 *   and freezes the resolved state at its mount-time values.
 * @param options - control-side declarations that are not props. See
 *   `FieldConsumerOptions`; `rendersOwnFeedback` defaults to `true`.
 * @returns the resolved field context.
 */
export const useFieldContext = (
  own: FieldOwnProps,
  options?: FieldConsumerOptions,
): FieldContext => {
  const group = inject<FieldContext | null>(FIELD_KEY, null)
  const rendersOwnFeedback = options?.rendersOwnFeedback ?? true
  const fallbackId = resolveFieldId(undefined)

  // Resolved once rather than in a computed, because the error and
  // description ids derive from it and must stay stable for
  // aria-describedby to keep pointing at them. Every candidate goes through
  // `usableId`, so no source can contribute an empty string.
  const ownId = usableId(own.id)
  // Single-control mode: the group renders one <label for>, so this control
  // must reuse the group's id verbatim for the label to bind. Fieldset mode
  // (or standalone) has no single `for` to match, so each control generates
  // its own.
  const sharedGroupId =
    group !== null && !group.isGroupLabel ? usableId(group.id) : undefined
  const id = ownId ?? sharedGroupId ?? fallbackId

  // The error region id follows who renders it, not who owns `id`.
  const groupOwnsFeedback = group?.feedbackOwnedByGroup ?? false
  const errorId = groupOwnsFeedback ? group!.errorId : `${id}-error`
  // Whether an error region is rendered *at all*. Without this,
  // `aria-describedby` names a missing element for any control that renders no
  // feedback region of its own inside a group that does not own one either.
  const errorRegionExists = groupOwnsFeedback || rendersOwnFeedback
  // The description id is inherited whenever the group has one; there is no
  // own-description-region case because controls never render their own.
  const descriptionId = group?.descriptionId

  const invalid = computed<boolean>(
    () => own.invalid ?? group?.invalid.value ?? false,
  )

  return {
    id,
    // No id fallback here on purpose: it would apply to all eight controls,
    // making text/textarea/select/file emit a generated `name` into native
    // form submissions where they previously emitted none, with no way to opt
    // out. Grouped controls still inherit a usable name because the provider
    // defaults its own `name` to the field id; a standalone radio supplies its
    // own fallback in MclInputRadio, where it is actually needed.
    name: computed<string | undefined>(() => own.name ?? toValue(group?.name)),
    errorId,
    descriptionId,
    invalid,
    required: computed<boolean>(
      () => own.required ?? group?.required.value ?? false,
    ),
    disabled: computed<boolean>(
      () => own.disabled ?? group?.disabled.value ?? false,
    ),
    describedBy: buildDescribedBy(
      descriptionId,
      errorRegionExists ? errorId : undefined,
      invalid,
    ),
    feedbackOwnedByGroup: groupOwnsFeedback,
    // Reported truthfully, not hardcoded: this value is inert for
    // provide/inject (a leaf never re-provides it), but the control's own
    // template reads its own returned context, and a control inside a
    // fieldset needs to know it — e.g. MclInputRadio renders differently as
    // part of a set than alone. `false` here would be a lie it could act on.
    isGroupLabel: group?.isGroupLabel ?? false,
  }
}
