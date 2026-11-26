// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { renderOnServer } from '@mcl/test-utils/ssr'
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

  it('server html keeps the trusting naming rule and the h2 title (#128)', async () => {
    const titled = await renderOnServer(() =>
      h(Sidebar, { visible: true, title: 'Hello' }, slots),
    )
    expect(titled.html).toMatch(/<h2[^>]*id="([^"]+)"/)
    const custom = await renderOnServer(() =>
      h(Sidebar, { visible: true }, { ...slots, header: () => h('p', 'Hi') }),
    )
    expect(custom.html).toContain('aria-labelledby=')
  })
})
