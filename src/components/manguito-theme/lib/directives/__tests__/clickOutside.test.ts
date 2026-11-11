import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick, ref, withDirectives } from 'vue'
import { vClickOutside } from '../click-outside.directive'
import type { ClickOutsideValue } from '../index.types'

// A document capture listener registered after the directive's that stops
// outside clicks, the way focus-trap's `checkClick` does (#104).
const blocker = (e: Event) => e.stopImmediatePropagation()

const mountWith = (value: ClickOutsideValue) => {
  const label = ref('a')
  const Host = defineComponent({
    setup: () => () =>
      withDirectives(h('div', { id: 'inside' }, label.value), [
        [vClickOutside, value],
      ]),
  })
  const w = mount(Host, { attachTo: document.body })
  return { w, label }
}

const clickOutside = () =>
  document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }))

describe('vClickOutside', () => {
  afterEach(() => {
    document.removeEventListener('click', blocker, true)
  })

  it('calls the handler for clicks outside the element', () => {
    const handler = vi.fn()
    const { w } = mountWith(handler)
    clickOutside()
    expect(handler).toHaveBeenCalledTimes(1)
    w.unmount()
  })

  it('keeps its listener ahead of later ones when a re-render passes the same handler', async () => {
    const handler = vi.fn()
    const { w, label } = mountWith(handler)
    document.addEventListener('click', blocker, true)
    label.value = 'b'
    await nextTick()
    clickOutside()
    expect(handler).toHaveBeenCalledTimes(1)
    w.unmount()
  })

  it('keeps its listener ahead of later ones when a re-render passes an equal options object', async () => {
    const handler = vi.fn()
    const label = ref('a')
    const Host = defineComponent({
      setup: () => () =>
        withDirectives(h('div', label.value), [
          [vClickOutside, { handler, events: ['click'] }],
        ]),
    })
    const w = mount(Host, { attachTo: document.body })
    document.addEventListener('click', blocker, true)
    label.value = 'b'
    await nextTick()
    clickOutside()
    expect(handler).toHaveBeenCalledTimes(1)
    w.unmount()
  })

  it('uses the new handler when a re-render passes a different one', async () => {
    const first = vi.fn()
    const second = vi.fn()
    const current = ref<ClickOutsideValue>(first)
    const Host = defineComponent({
      setup: () => () =>
        withDirectives(h('div'), [[vClickOutside, current.value]]),
    })
    const w = mount(Host, { attachTo: document.body })
    current.value = second
    await nextTick()
    clickOutside()
    expect(first).not.toHaveBeenCalled()
    expect(second).toHaveBeenCalledTimes(1)
    w.unmount()
  })
})
