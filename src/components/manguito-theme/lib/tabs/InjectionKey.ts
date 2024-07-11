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
}

export const tabInjectionKey = Symbol() as InjectionKey<TabInjectionType>
