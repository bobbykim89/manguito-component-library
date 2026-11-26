import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick, ref, withDirectives } from 'vue'
import { vTooltip } from '../tooltip.directive'
import Modal from '../../modal/Modal.vue'

const mountHost = (
  describedBy?: ReturnType<typeof ref<string | undefined>>,
) => {
  const Host = defineComponent({
    setup: () => () =>
      withDirectives(
        h(
          'button',
          { id: 'host', 'aria-describedby': describedBy?.value },
          'host',
        ),
        [[vTooltip, 'Tip text']],
      ),
  })
  const w = mount(Host, { attachTo: document.body })
  const host = document.getElementById('host')!
  const tipId = host.querySelector('[role="tooltip"]')!.id
  return { w, host, tipId }
}

const ids = (el: Element) =>
  (el.getAttribute('aria-describedby') ?? '').split(/\s+/).filter(Boolean)

const escape = (target: EventTarget = document.body) => {
  const e = new KeyboardEvent('keydown', {
    key: 'Escape',
    bubbles: true,
    cancelable: true,
  })
  target.dispatchEvent(e)
  return e
}

describe('vTooltip aria-describedby (#128)', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('adds its id to an existing aria-describedby', async () => {
    const d = ref<string | undefined>('hint')
    const { w, host, tipId } = mountHost(d)
    expect(ids(host)).toEqual(['hint', tipId])
    // a re-render that re-runs the directive doesn't duplicate the id
    d.value = 'hint'
    await nextTick()
    expect(ids(host)).toEqual(['hint', tipId])
    w.unmount()
  })

  it('unmount removes only its id', () => {
    const { w, host } = mountHost(ref('hint'))
    const directive = host
    w.unmount()
    expect(ids(directive)).toEqual(['hint'])

    const bare = mountHost()
    const el = bare.host
    bare.w.unmount()
    expect(el.hasAttribute('aria-describedby')).toBe(false)
  })

  it('keeps its id when the host re-binds aria-describedby', async () => {
    const d = ref<string | undefined>('a')
    const { w, host, tipId } = mountHost(d)
    d.value = 'b'
    await nextTick()
    expect(ids(host)).toEqual(['b', tipId])
    w.unmount()
  })
})

describe('vTooltip Escape (#128)', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    document.body.innerHTML = ''
    document.documentElement.style.overflow = ''
  })
  const dismissed = (host: Element) =>
    host.hasAttribute('data-mcl-tooltip-dismissed')

  it('Escape while hovered hides the tooltip until the next mouseenter', () => {
    const { w, host } = mountHost()
    host.dispatchEvent(new MouseEvent('mouseenter'))
    const e = escape()
    expect(e.defaultPrevented).toBe(true)
    expect(dismissed(host)).toBe(true)
    host.dispatchEvent(new MouseEvent('mouseleave'))
    host.dispatchEvent(new MouseEvent('mouseenter'))
    expect(dismissed(host)).toBe(false)
    w.unmount()
  })

  it('Escape while focused hides it until the next focusin', () => {
    const { w, host } = mountHost()
    host.focus()
    expect(escape(host).defaultPrevented).toBe(true)
    expect(dismissed(host)).toBe(true)
    host.blur()
    host.focus()
    expect(dismissed(host)).toBe(false)
    w.unmount()
  })

  it('Escape with no tooltip showing is not handled', () => {
    const { w, host } = mountHost()
    expect(escape().defaultPrevented).toBe(false)
    host.dispatchEvent(new MouseEvent('mouseenter'))
    host.dispatchEvent(new MouseEvent('mouseleave'))
    expect(escape().defaultPrevented).toBe(false)
    // a second Escape after dismissing is left for others
    host.dispatchEvent(new MouseEvent('mouseenter'))
    escape()
    expect(escape().defaultPrevented).toBe(false)
    w.unmount()
  })

  it('Escape on a hovered tooltip inside a Modal hides the tooltip, not the modal', async () => {
    vi.spyOn(Element.prototype, 'getClientRects').mockReturnValue([
      {},
    ] as unknown as DOMRectList)
    const w = mount(Modal, {
      props: { title: 'Hello' },
      slots: {
        body: () =>
          withDirectives(h('span', { id: 'tip-host' }, 'hover me'), [
            [vTooltip, 'Tip'],
          ]),
      },
      attachTo: document.body,
      global: { stubs: { transition: false } },
    })
    ;(w.vm as any).open()
    await vi.waitFor(
      () => {
        const dialog = document.querySelector('[role="dialog"]')
        if (!dialog?.contains(document.activeElement)) throw new Error('wait')
      },
      { timeout: 2000 },
    )
    const tipHost = document.getElementById('tip-host')!
    tipHost.dispatchEvent(new MouseEvent('mouseenter'))
    escape(document.activeElement!)
    await new Promise((r) => setTimeout(r, 50))
    expect(dismissed(tipHost)).toBe(true)
    expect(w.emitted('close')).toBeUndefined()
    escape(document.activeElement!)
    await new Promise((r) => setTimeout(r, 50))
    expect(w.emitted('close')).toEqual([[false]])
    w.unmount()
  })

  it('the tooltip hides itself under the dismissed attribute', () => {
    const { w, host } = mountHost()
    const tip = host.querySelector('[role="tooltip"]')!
    expect(tip.className).toContain(
      'group-data-[mcl-tooltip-dismissed]:invisible!',
    )
    w.unmount()
  })
})

describe('vTooltip Escape follows the host focus, not a descendant (#128 review)', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('Escape with focus in a child of the host is not handled', () => {
    const Host = defineComponent({
      setup: () => () =>
        withDirectives(
          h('div', { id: 'wrap' }, [h('input', { id: 'inner' })]),
          [[vTooltip, 'Help']],
        ),
    })
    const w = mount(Host, { attachTo: document.body })
    const inner = document.getElementById('inner')!
    inner.focus()
    expect(escape(inner).defaultPrevented).toBe(false)
    expect(
      document
        .getElementById('wrap')!
        .hasAttribute('data-mcl-tooltip-dismissed'),
    ).toBe(false)
    w.unmount()
  })
})
