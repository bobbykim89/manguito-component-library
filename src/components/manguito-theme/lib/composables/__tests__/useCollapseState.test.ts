import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import { provideAccordion, useCollapseState } from '../useCollapseState'

describe('useCollapseState', () => {
  it('standalone: toggle, open and close flip isOpen', () => {
    const { isOpen, toggle, open, close } = useCollapseState('a')
    expect(isOpen.value).toBe(false)
    toggle()
    expect(isOpen.value).toBe(true)
    toggle()
    expect(isOpen.value).toBe(false)
    open()
    expect(isOpen.value).toBe(true)
    close()
    expect(isOpen.value).toBe(false)
  })

  it('standalone: a ref initialOpen change syncs', async () => {
    const initial = ref(false)
    const { isOpen } = useCollapseState('a', initial)
    initial.value = true
    await nextTick()
    expect(isOpen.value).toBe(true)
  })

  it('accordion mode: opening b closes a', () => {
    let a!: ReturnType<typeof useCollapseState>
    let b!: ReturnType<typeof useCollapseState>
    const Child = defineComponent({
      setup() {
        a = useCollapseState('a')
        b = useCollapseState('b')
        return () => h('div')
      },
    })
    const Parent = defineComponent({
      setup() {
        provideAccordion()
        return () => h(Child)
      },
    })
    mount(Parent)
    a.open()
    expect(a.isOpen.value).toBe(true)
    b.open()
    expect(b.isOpen.value).toBe(true)
    expect(a.isOpen.value).toBe(false)
  })
})
