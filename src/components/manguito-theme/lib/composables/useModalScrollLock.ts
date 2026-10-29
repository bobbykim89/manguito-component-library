import { useScrollLock } from '@vueuse/core'
import { onMounted, shallowRef, watch, type Ref } from 'vue'

export const useModalScrollLock = (isOpen: Ref<boolean>): void => {
  // `document` must not be touched during setup (it does not exist on the
  // server). The target is assigned after mount; until then the lock is inert.
  const target = shallowRef<HTMLElement | null>(null)
  const scrollLock = useScrollLock(target)
  onMounted(() => {
    target.value = document.documentElement
    scrollLock.value = isOpen.value
  })
  watch(isOpen, (val) => {
    scrollLock.value = val
  })
}
