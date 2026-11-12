import {
  computed,
  toValue,
  type ComputedRef,
  type MaybeRefOrGetter,
  type Ref,
} from 'vue'

/** The parts of a `Collapse` instance (its template ref) the trigger reads. */
export interface CollapseTriggerTarget {
  isOpen: boolean
  toggle: () => void
}

export interface CollapseTriggerOptions {
  /** The `id` given to the `Collapse`; the trigger's `aria-controls` points at it. */
  id: string
  /**
   * The `visible` given to the `Collapse`. Used until the Collapse is mounted
   * (and on the server, where template refs are empty), so server html already
   * carries the right `aria-expanded`.
   */
  visible?: MaybeRefOrGetter<boolean>
}

export interface CollapseTriggerAttrs {
  'aria-expanded': boolean
  'aria-controls': string
}

/**
 * ARIA wiring for a hand-built button that opens and closes a base `Collapse`.
 *
 * @example
 * const panel = ref()
 * // Destructure: templates only unwrap top-level refs.
 * const { attrs, toggle } = useCollapseTrigger(panel, { id: 'faq-1' })
 * // <button v-bind="attrs" @click="toggle">Shipping</button>
 * // <Collapse ref="panel" id="faq-1">…</Collapse>
 */
export const useCollapseTrigger = (
  collapseRef: Ref<CollapseTriggerTarget | null | undefined>,
  options: CollapseTriggerOptions,
): {
  /** Bind on the trigger: `aria-expanded` and `aria-controls`. */
  attrs: ComputedRef<CollapseTriggerAttrs>
  /** Whether the panel is open. */
  isOpen: ComputedRef<boolean>
  /** Opens or closes the panel. */
  toggle: () => void
} => {
  const isOpen = computed(
    () => collapseRef.value?.isOpen ?? toValue(options.visible) ?? false,
  )
  const attrs = computed(() => ({
    'aria-expanded': isOpen.value,
    'aria-controls': options.id,
  }))
  const toggle = () => collapseRef.value?.toggle()
  return { attrs, isOpen, toggle }
}
