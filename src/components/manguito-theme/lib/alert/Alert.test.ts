import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick, type VNode } from 'vue'
import { hydrate } from '@mcl/test-utils/ssr'
import Alert from './Alert.vue'

describe('Alert (client)', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('hydrates with no warnings', async () => {
    const r = await hydrate(() =>
      h(
        Alert,
        { show: true, dismissible: true },
        { default: () => 'ALERT TEXT' },
      ),
    )
    expect(r.warnings).toEqual([])
    expect(r.container.textContent).toContain('ALERT TEXT')
    r.unmount()
  })

  it('close button hides the alert and emits close', async () => {
    const events: Event[] = []
    const r = await hydrate(() =>
      h(
        Alert,
        {
          show: true,
          dismissible: true,
          onClose: (e: Event) => events.push(e),
        },
        { default: () => 'ALERT TEXT' },
      ),
    )
    r.container.querySelector('button')!.click()
    await nextTick()
    expect(r.container.querySelector('[role="alert"]')).toBeNull()
    expect(events).toHaveLength(1)
    r.unmount()
  })
})

// #110 item 4: the dismiss button was an unnamed SVG-only button.
describe('Alert dismiss button', () => {
  const alertWith = (props: Record<string, unknown> = {}) =>
    mount(Alert, {
      props: { show: true, dismissible: true, ...props },
      slots: { default: () => 'ALERT TEXT' },
      attachTo: document.body,
    })

  it('is named "Dismiss" and hides its icon from assistive tech', () => {
    const w = alertWith()
    const button = w.find('button')
    expect(button.attributes('aria-label')).toBe('Dismiss')
    expect(button.find('svg').attributes('aria-hidden')).toBe('true')
    w.unmount()
  })

  it('takes its name from dismissLabel', () => {
    const w = alertWith({ dismissLabel: 'Close notice' })
    expect(w.find('button').attributes('aria-label')).toBe('Close notice')
    w.unmount()
  })

  it('does not submit a surrounding form', async () => {
    const onSubmit = vi.fn((e: Event) => e.preventDefault())
    const w = mount(
      defineComponent({
        setup: () => () =>
          h('form', { onSubmit }, [
            h(Alert, { show: true, dismissible: true }, () => 'ALERT TEXT'),
          ]),
      }),
      { attachTo: document.body },
    )
    await w.find('button').trigger('click')
    expect(onSubmit).not.toHaveBeenCalled()
    w.unmount()
  })
})

describe('Alert focus on dismiss and politeness (#128)', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  // Renders [before?] <Alert/> [after?] and returns the dismiss button.
  const page = (
    opts: {
      before?: boolean
      after?: boolean
      alert?: Record<string, unknown>
      extra?: () => VNode
    } = {},
  ) => {
    const w = mount(
      defineComponent({
        render: () =>
          h(
            'div',
            [
              opts.before ? h('button', { id: 'before' }, 'before') : null,
              h(
                Alert,
                { show: true, dismissible: true, ...opts.alert },
                { default: () => 'ALERT' },
              ),
              opts.after ? h('a', { id: 'after', href: '#' }, 'after') : null,
              opts.extra ? opts.extra() : null,
            ].filter((n): n is VNode => n !== null),
          ),
      }),
      { attachTo: document.body },
    )
    const dismiss = w.find('button[aria-label="Dismiss"]')
      .element as HTMLElement
    return { w, dismiss }
  }
  const dismissWithFocus = async (dismiss: HTMLElement) => {
    dismiss.focus()
    dismiss.click()
    await nextTick()
    await nextTick()
  }

  it('live assertive renders role=alert without aria-live', () => {
    const { w } = page()
    const root = w.find('[role="alert"]')
    expect(root.exists()).toBe(true)
    expect(root.attributes('aria-live')).toBeUndefined()
    w.unmount()
  })

  it('live polite renders role=status', () => {
    const { w } = page({ alert: { live: 'polite' } })
    expect(w.find('[role="status"]').exists()).toBe(true)
    expect(w.find('[role="alert"]').exists()).toBe(false)
    w.unmount()
  })

  it('dismiss moves focus to the next focusable element after the alert', async () => {
    const { w, dismiss } = page({ before: true, after: true })
    await dismissWithFocus(dismiss)
    expect(document.activeElement?.id).toBe('after')
    w.unmount()
  })

  it('falls back to the previous focusable when nothing follows', async () => {
    const { w, dismiss } = page({ before: true })
    await dismissWithFocus(dismiss)
    expect(document.activeElement?.id).toBe('before')
    w.unmount()
  })

  it('returnFocus selector wins over the fallback', async () => {
    const { w, dismiss } = page({
      after: true,
      alert: { returnFocus: '#target' },
      extra: () => h('input', { id: 'target' }),
    })
    await dismissWithFocus(dismiss)
    expect(document.activeElement?.id).toBe('target')
    w.unmount()
  })

  it('a close handler that moves focus is respected', async () => {
    const { w, dismiss } = page({
      after: true,
      alert: {
        onClose: () => document.getElementById('mine')!.focus(),
      },
      extra: () => h('input', { id: 'mine' }),
    })
    await dismissWithFocus(dismiss)
    expect(document.activeElement?.id).toBe('mine')
    w.unmount()
  })

  it('nothing focusable around: no throw', async () => {
    const { w, dismiss } = page()
    await expect(dismissWithFocus(dismiss)).resolves.toBeUndefined()
    expect(w.find('[role="alert"]').exists()).toBe(false)
    w.unmount()
  })

  it('closing programmatically does not move focus', async () => {
    const outside = document.createElement('input')
    document.body.appendChild(outside)
    const w = mount(Alert, {
      props: { show: true, dismissible: true },
      slots: { default: () => 'ALERT' },
      attachTo: document.body,
    })
    outside.focus()
    await w.setProps({ show: false })
    await nextTick()
    expect(w.find('[role="alert"]').exists()).toBe(false)
    expect(document.activeElement).toBe(outside)
    w.unmount()
  })
})
