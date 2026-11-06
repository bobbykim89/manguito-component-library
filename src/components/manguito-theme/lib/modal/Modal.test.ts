import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { h, nextTick, ref } from 'vue'
import { hydrate } from '../__tests__/ssr'
import Modal from './Modal.vue'

const slots = { body: () => 'Body text' }
const settle = () => new Promise((r) => setTimeout(r, 50))
const overflow = () => document.documentElement.style.overflow

describe('Modal (client)', () => {
  afterEach(() => {
    document.documentElement.style.overflow = ''
  })

  it('hydrates closed with no warnings', async () => {
    const r = await hydrate(() => h(Modal, null, slots))
    expect(r.warnings).toEqual([])
    r.unmount()
  })

  it('hydrates open with no warnings', async () => {
    const r = await hydrate(() => h(Modal, { visible: true }, slots))
    expect(r.warnings).toEqual([])
    r.unmount()
  })

  it('locks scroll after mount when open, unlocks on close', async () => {
    const visible = ref(true)
    const r = await hydrate(() => h(Modal, { visible: visible.value }, slots))
    await settle()
    expect(overflow()).toBe('hidden')
    visible.value = false
    await settle()
    expect(overflow()).toBe('')
    r.unmount()
  })

  it('releases the scroll lock when unmounted while open', async () => {
    const r = await hydrate(() => h(Modal, { visible: true }, slots))
    await settle()
    expect(overflow()).toBe('hidden')
    r.unmount()
    expect(overflow()).toBe('')
  })

  it('a dialog server-rendered open can be closed after hydration', async () => {
    const modal = ref<InstanceType<typeof Modal> | null>(null)
    const r = await hydrate(() =>
      h(Modal, { visible: true, ref: modal }, slots),
    )
    await settle()
    expect(document.querySelector('[role="dialog"]')).not.toBeNull()
    modal.value!.close()
    await settle()
    expect(document.querySelector('[role="dialog"]')).toBeNull()
    r.unmount()
  })

  it('open/toggle show the dialog and emit open', async () => {
    const w = mount(Modal, { slots, attachTo: document.body })
    expect(w.find('[role="dialog"]').exists()).toBe(false)
    ;(w.vm as any).open()
    await nextTick()
    expect(w.find('[role="dialog"]').exists()).toBe(true)
    expect(w.emitted('open')![0]).toEqual([true])
    w.unmount()

    const w2 = mount(Modal, { slots, attachTo: document.body })
    ;(w2.vm as any).toggle()
    await nextTick()
    expect(w2.find('[role="dialog"]').exists()).toBe(true)
    expect(w2.emitted('open')![0]).toEqual([true])
    w2.unmount()
  })

  it('aria-labelledby equals the h3 id when title is set', () => {
    const w = mount(Modal, {
      props: { visible: true, title: 'Hello' },
      slots,
      attachTo: document.body,
    })
    const id = w.find('h3').attributes('id')
    expect(id).toBeTruthy()
    expect(w.find('[role="dialog"]').attributes('aria-labelledby')).toBe(id)
    w.unmount()
  })
})
