import { computed, inject, isRef, provide, ref, watch, type ComputedRef, type Ref } from 'vue'

const ACCORDION_KEY = Symbol('accordion')

interface AccordionContext {
  openId: ReturnType<typeof ref<string | null>>
}

export const provideAccordion = (): void => {
  const openId = ref<string | null>(null)
  provide(ACCORDION_KEY, { openId })
}

export const useCollapseState = (
  id: string,
  initialOpen: Ref<boolean> | boolean = false
): {
  isOpen: ComputedRef<boolean>
  toggle: () => void
  open: () => void
  close: () => void
} => {
  const ctx = inject<AccordionContext | null>(ACCORDION_KEY, null)

  if (ctx) {
    const isOpen = computed(() => ctx.openId.value === id)
    const toggle = () => { ctx.openId.value = isOpen.value ? null : id }
    const open = () => { ctx.openId.value = id }
    const close = () => { if (isOpen.value) ctx.openId.value = null }
    return { isOpen, toggle, open, close }
  } else {
    const _isOpen = ref(isRef(initialOpen) ? initialOpen.value : initialOpen)
    if (isRef(initialOpen)) {
      watch(initialOpen, (v) => { _isOpen.value = v })
    }
    const isOpen = computed(() => _isOpen.value)
    const toggle = () => { _isOpen.value = !_isOpen.value }
    const open = () => { _isOpen.value = true }
    const close = () => { _isOpen.value = false }
    return { isOpen, toggle, open, close }
  }
}
