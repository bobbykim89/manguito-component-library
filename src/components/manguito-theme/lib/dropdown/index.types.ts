import type { Ref } from 'vue'

export type DropdownInjectType = {
  active: Ref<boolean>
  buttonHeight: Ref<number>
  closeDropdown: () => void
}
