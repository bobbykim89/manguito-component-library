// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { renderOnServer } from '../__tests__/ssr'
import Modal from './Modal.vue'

const slots = { body: () => 'Body text' }

describe('Modal (server)', () => {
  it('renders closed without throwing', async () => {
    const { html } = await renderOnServer(() => h(Modal, null, slots))
    expect(html).not.toContain('role="dialog"')
  })

  it('renders open with dialog markup', async () => {
    const { html } = await renderOnServer(() =>
      h(Modal, { visible: true }, slots),
    )
    expect(html).toContain('role="dialog"')
    expect(html).toContain('aria-modal="true"')
    expect(html).toContain('Body text')
  })
})
