import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, h, nextTick, ref, type Ref } from 'vue'
import { useModalScrollLock } from '../useModalScrollLock'

const make = (open: Ref<boolean>) =>
  defineComponent({
    setup() {
      useModalScrollLock(open)
      return () => h('div')
    },
  })
const overflow = () => document.documentElement.style.overflow

describe('useModalScrollLock', () => {
  afterEach(() => {
    document.documentElement.style.overflow = ''
  })

  it('locks after mount when initially open', async () => {
    const w = mount(make(ref(true)))
    await nextTick()
    expect(overflow()).toBe('hidden')
    w.unmount()
  })

  it('does not lock when initially closed', async () => {
    const w = mount(make(ref(false)))
    await nextTick()
    expect(overflow()).toBe('')
    w.unmount()
  })

  it('follows isOpen after mount', async () => {
    const open = ref(false)
    const w = mount(make(open))
    open.value = true
    await nextTick()
    expect(overflow()).toBe('hidden')
    open.value = false
    await nextTick()
    expect(overflow()).toBe('')
    w.unmount()
  })

  it('releases the lock when the owning scope is disposed', async () => {
    const w = mount(make(ref(true)))
    await nextTick()
    expect(overflow()).toBe('hidden')
    w.unmount()
    expect(overflow()).toBe('')
  })
})
