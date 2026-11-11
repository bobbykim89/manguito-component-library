import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { h, nextTick, ref } from 'vue'
import { hydrate } from '@mcl/test-utils/ssr'
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

// #104: a re-render re-added v-click-outside's document listener behind the
// focus trap's, and the trap then swallowed every backdrop click.
describe('Modal backdrop click with an active focus trap', () => {
  beforeEach(() => {
    // jsdom has no layout, so tabbable treats every node as hidden and
    // focus-trap refuses to activate. Report a box so the trap really runs.
    vi.spyOn(Element.prototype, 'getClientRects').mockReturnValue([
      {},
    ] as unknown as DOMRectList)
  })
  afterEach(() => {
    vi.restoreAllMocks()
    document.documentElement.style.overflow = ''
  })

  const openWithTrap = async (props: Record<string, unknown> = {}) => {
    const w = mount(Modal, {
      props: { title: 'Hello', ...props },
      slots,
      attachTo: document.body,
      global: { stubs: { transition: false } },
    })
    ;(w.vm as any).open()
    // The trap activates after the enter transition; wait for it to take focus
    // instead of a fixed delay, which is too short under a loaded test run.
    await vi.waitFor(
      () => {
        const dialog = document.querySelector('[role="dialog"]')
        if (!dialog?.contains(document.activeElement)) {
          throw new Error('focus trap not active yet')
        }
      },
      { timeout: 2000 },
    )
    return w
  }
  const clickBackdrop = (w: Awaited<ReturnType<typeof openWithTrap>>) =>
    w
      .find('section[aria-hidden="true"]')
      .element.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true }),
      )

  it('closes on backdrop click', async () => {
    const w = await openWithTrap()
    clickBackdrop(w)
    await settle()
    expect(w.emitted('close')).toEqual([[false]])
    w.unmount()
  })

  it('still closes on backdrop click after a prop change re-renders it', async () => {
    const w = await openWithTrap()
    await w.setProps({ color: 'dark-1' })
    await settle()
    clickBackdrop(w)
    await settle()
    expect(w.emitted('close')).toEqual([[false]])
    w.unmount()
  })

  it('lets a click on an element outside the dialog reach that element', async () => {
    const outside = document.createElement('button')
    const onOutsideClick = vi.fn()
    outside.addEventListener('click', onOutsideClick)
    document.body.appendChild(outside)
    const w = await openWithTrap({ showBackdrop: false })
    outside.click()
    await settle()
    expect(onOutsideClick).toHaveBeenCalledTimes(1)
    w.unmount()
    outside.remove()
  })

  // #110: Escape used to release the focus trap and leave the dialog open.
  it('Escape closes the dialog and returns focus to the opener', async () => {
    const opener = document.createElement('button')
    document.body.appendChild(opener)
    opener.focus()
    const w = await openWithTrap()
    expect(
      w.find('[role="dialog"]').element.contains(document.activeElement),
    ).toBe(true)
    document.activeElement!.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      }),
    )
    await settle()
    expect(w.emitted('close')).toEqual([[false]])
    expect(document.activeElement).toBe(opener)
    w.unmount()
    opener.remove()
  })
})

// #110: a dialog must have an accessible name whichever header it uses.
describe('Modal accessible name', () => {
  const dialogOf = (props: Record<string, unknown>, header?: (p: any) => any) =>
    mount(Modal, {
      props: { visible: true, ...props },
      slots: header ? { ...slots, header } : slots,
      attachTo: document.body,
    })

  it('a custom header names the dialog through the titleId slot prop', () => {
    const w = dialogOf({}, ({ titleId }) => h('h2', { id: titleId }, 'Custom'))
    const id = w.find('h2').attributes('id')
    expect(id).toBeTruthy()
    expect(w.find('[role="dialog"]').attributes('aria-labelledby')).toBe(id)
    expect(w.find('[role="dialog"]').attributes('aria-label')).toBeUndefined()
    w.unmount()
  })

  it('ariaLabel names a dialog that has no title', () => {
    const w = dialogOf({ ariaLabel: 'Settings' })
    const dialog = w.find('[role="dialog"]')
    expect(dialog.attributes('aria-label')).toBe('Settings')
    expect(dialog.attributes('aria-labelledby')).toBeUndefined()
    w.unmount()
  })

  it('ariaLabel names a dialog whose custom header does not use titleId', () => {
    const w = dialogOf({ ariaLabel: 'Settings' }, () => h('div', 'Custom'))
    const dialog = w.find('[role="dialog"]')
    expect(dialog.attributes('aria-label')).toBe('Settings')
    expect(dialog.attributes('aria-labelledby')).toBeUndefined()
    w.unmount()
  })

  it('ariaLabel names a dialog without a header', () => {
    const w = dialogOf({
      ariaLabel: 'Settings',
      showHeader: false,
      title: 'Ignored',
    })
    const dialog = w.find('[role="dialog"]')
    expect(dialog.attributes('aria-label')).toBe('Settings')
    expect(dialog.attributes('aria-labelledby')).toBeUndefined()
    w.unmount()
  })

  it('a visible title names the dialog even when ariaLabel is set', () => {
    const w = dialogOf({ title: 'Hello', ariaLabel: 'Settings' })
    const id = w.find('h3').attributes('id')
    expect(w.find('[role="dialog"]').attributes('aria-labelledby')).toBe(id)
    w.unmount()
  })
})
