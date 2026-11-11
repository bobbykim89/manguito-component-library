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

  // #107: inside a group, `visible` (initialOpen) used to be ignored.
  describe('accordion mode with initialOpen', () => {
    const inGroup = (
      ...panels: [
        id: string,
        initialOpen: boolean | ReturnType<typeof ref<boolean>>,
      ][]
    ) => {
      const states: Record<string, ReturnType<typeof useCollapseState>> = {}
      const Child = defineComponent({
        setup() {
          for (const [id, initialOpen] of panels) {
            states[id] = useCollapseState(id, initialOpen as any)
          }
          return () => h('div')
        },
      })
      mount(
        defineComponent({
          setup() {
            provideAccordion()
            return () => h(Child)
          },
        }),
      )
      return states
    }

    it('opens a panel whose initialOpen is true', () => {
      const { a, b } = inGroup(['a', true], ['b', false])
      expect(a.isOpen.value).toBe(true)
      expect(b.isOpen.value).toBe(false)
    })

    it('opens only the first panel when several start open', () => {
      const { a, b, c } = inGroup(['a', false], ['b', true], ['c', true])
      expect(a.isOpen.value).toBe(false)
      expect(b.isOpen.value).toBe(true)
      expect(c.isOpen.value).toBe(false)
    })

    it('opens a panel when its initialOpen ref turns true, closing the open one', async () => {
      const bVisible = ref(false)
      const { a, b } = inGroup(['a', true], ['b', bVisible])
      bVisible.value = true
      await nextTick()
      expect(b.isOpen.value).toBe(true)
      expect(a.isOpen.value).toBe(false)
    })

    it('closes a panel when its initialOpen ref turns false', async () => {
      const aVisible = ref(true)
      const { a } = inGroup(['a', aVisible])
      aVisible.value = false
      await nextTick()
      expect(a.isOpen.value).toBe(false)
    })

    it("leaves the open panel alone when another panel's initialOpen turns false", async () => {
      const aVisible = ref(true)
      const { b } = inGroup(['a', aVisible], ['b', false])
      b.open()
      aVisible.value = false
      await nextTick()
      expect(b.isOpen.value).toBe(true)
    })
  })
})
