// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { renderOnServer } from '../__tests__/ssr'
import Alert from './Alert.vue'

describe('Alert (server)', () => {
  it('renders slot content when shown', async () => {
    const { html } = await renderOnServer(() =>
      h(
        Alert,
        { show: true, dismissible: true },
        { default: () => 'ALERT TEXT' },
      ),
    )
    expect(html).toContain('ALERT TEXT')
    expect(html).toContain('role="alert"')
    expect(html).toContain('<button')
  })

  it('renders nothing visible when not shown', async () => {
    const { html } = await renderOnServer(() =>
      h(Alert, null, { default: () => 'ALERT TEXT' }),
    )
    expect(html).not.toContain('ALERT TEXT')
  })
})
