import { useScrollLock } from '@vueuse/core'
import { watch, type Ref } from 'vue'

export const useModalScrollLock = (isOpen: Ref<boolean>): void => {
  const scrollLock = useScrollLock(document)
  watch(isOpen, (val) => { scrollLock.value = val }, { immediate: true })
}
