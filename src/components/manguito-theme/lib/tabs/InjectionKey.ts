import type { InjectionKey, Ref } from 'vue'

/**
 * @summary typedef TabInjectionType, which is used as of injection key controls activeIdx, containerHeight, and updateHeight functionality
 * @arg {Ref<number>} activeTabIdx - current index of active tab
 * @arg {Ref<number>} containerHeight - height of current tabContent (=activeIdx)
 * @arg {(arg: number) => void} updateHeight - method to update value of containerHeight
 */

export interface TabInjectionType {
  activeTabIdx: Ref<number>
  containerHeight: Ref<number>
  updateHeight: (arg: number) => void
  /**
   * A `TabContent` reports its id for its `tabNumber`, so the tab can point
   * `aria-controls` at it. Returns the function that withdraws it again;
   * a panel remounted by the slide transition replaces the entry, and the old
   * copy's withdrawal then leaves the new one alone.
   */
  registerPanel: (tabNumber: number, id: string) => () => void
  /** The tab id labelling this panel, if its tab bound `tabAttrs`. */
  labelledBy: (tabNumber: number) => string | undefined
}

export const tabInjectionKey = Symbol() as InjectionKey<TabInjectionType>
