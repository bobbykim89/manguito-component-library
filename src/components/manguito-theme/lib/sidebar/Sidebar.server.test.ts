// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { renderOnServer } from '../__tests__/ssr'
import Sidebar from './Sidebar.vue'

const slots = { body: () => 'Body text' }

describe('Sidebar (server)', () => {
  it('renders closed without throwing', async () => {
    const { html } = await renderOnServer(() => h(Sidebar, null, slots))
    expect(html).not.toContain('role="dialog"')
  })

  it('renders open with dialog markup', async () => {
    const { html } = await renderOnServer(() =>
      h(Sidebar, { visible: true }, slots),
    )
    expect(html).toContain('role="dialog"')
    expect(html).toContain('aria-modal="true"')
    expect(html).toContain('Body text')
  })
})
