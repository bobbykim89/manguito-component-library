/**
 * Everything one tab needs, from the `tab-button` slot's `tabAttrs(index)`
 * (#128). Bind it on the tab element: `<button v-bind="tabAttrs(i)">`.
 */
export interface TabAttrs {
  /** `${baseId}-tab-${index}`; the panel for this index is labelled by it. */
  id: string
  role: 'tab'
  'aria-selected': boolean
  /** The `id` of the `TabContent` with this `tabNumber`, once it has mounted. */
  'aria-controls': string | undefined
  /** `0` for the active tab only, so the tab set is one Tab stop. */
  tabindex: 0 | -1
  /** Selects this tab. */
  onClick: () => void
  /**
   * ArrowRight/ArrowLeft move to the next/previous tab (wrapping), Home/End to
   * the first/last; moving focus also selects the tab.
   */
  onKeydown: (e: KeyboardEvent) => void
}
