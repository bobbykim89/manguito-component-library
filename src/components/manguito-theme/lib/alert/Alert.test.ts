import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
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
