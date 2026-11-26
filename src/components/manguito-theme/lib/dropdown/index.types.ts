import type { Ref } from 'vue'

export type DropdownInjectType = {
  active: Ref<boolean>
  buttonHeight: Ref<number>
  closeDropdown: () => void
  /** The content's `id`, which the toggler's `aria-controls` points at. */
  contentId: string
}

/** The `toggler` slot's `attrs` (#128). */
export interface DropdownTogglerAttrs {
  'aria-expanded': boolean
  'aria-controls': string
}
