import { computed, useAttrs, type ComputedRef } from 'vue'
import type { FieldContext } from './index.types'

/**
 * Attributes the component sets itself from the field context or its props.
 * A consumer's copy is dropped so it can't fight the component's wiring; the
 * props (`id`, `name`, `required`, `disabled`, …) are the way to set them.
 */
const OWNED_ATTRS = new Set([
  'id',
  'name',
  'type',
  'role',
  'required',
  'disabled',
  'aria-invalid',
  'aria-describedby',
  'aria-expanded',
  'aria-controls',
  'aria-activedescendant',
  'aria-required',
])

/** Attributes that style the control's layout box and stay on the wrapper. */
const ROOT_ATTRS = new Set(['class', 'style'])

export interface ControlAttrs {
  /** `class` and `style`, for the control's root wrapper. */
  rootAttrs: ComputedRef<Record<string, unknown>>
  /**
   * Everything else, for the focusable element: `aria-*`, `title`, `data-*`,
   * `autofocus`, listeners. Bind it after the element's own bindings so the
   * consumer's value wins. Its `aria-labelledby` is the consumer's own, else
   * none when the consumer named the control with `aria-label`, else the
   * group label (`field.labelledBy`).
   */
  controlAttrs: ComputedRef<Record<string, unknown>>
}

/**
 * Splits a control's fallthrough attributes (#130). Without this, every
 * attribute landed on the wrapper `<div>`, so an `aria-label` or `title`
 * passed to a standalone control left it unnamed. The control must declare
 * `inheritAttrs: false`. Call during setup.
 *
 * @param field - the control's resolved field context, for `labelledBy`.
 */
export const useControlAttrs = (field: FieldContext): ControlAttrs => {
  const attrs = useAttrs()

  const rootAttrs = computed<Record<string, unknown>>(() =>
    Object.fromEntries(
      Object.entries(attrs).filter(([key]) => ROOT_ATTRS.has(key)),
    ),
  )

  const controlAttrs = computed<Record<string, unknown>>(() => {
    const rest = Object.fromEntries(
      Object.entries(attrs).filter(
        ([key]) => !ROOT_ATTRS.has(key) && !OWNED_ATTRS.has(key),
      ),
    )
    const own = attrs['aria-labelledby']
    rest['aria-labelledby'] =
      own !== undefined && own !== null && own !== ''
        ? own
        : attrs['aria-label']
          ? undefined
          : field.labelledBy.value
    return rest
  })

  return { rootAttrs, controlAttrs }
}
