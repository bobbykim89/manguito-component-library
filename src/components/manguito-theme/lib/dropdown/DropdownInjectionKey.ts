import type { DropdownInjectType } from './index.types'
import type { InjectionKey } from 'vue'

export const dropdownInjectionKey = Symbol() as InjectionKey<DropdownInjectType>
