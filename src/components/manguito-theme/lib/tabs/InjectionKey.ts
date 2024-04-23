import type { InjectionKey, Ref } from 'vue'

export interface TabInjectionType {
  activeTabIdx: Ref<number>
  containerHeight: Ref<number>
  updateHeight: (arg: number) => void
}

export const tabInjectionKey = Symbol() as InjectionKey<TabInjectionType>
