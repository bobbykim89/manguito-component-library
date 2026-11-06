import { afterEach, describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import { hydrate } from '../__tests__/ssr'
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
