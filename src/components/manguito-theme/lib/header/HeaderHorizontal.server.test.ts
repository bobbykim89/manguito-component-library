// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { renderOnServer } from '@mcl/test-utils/ssr'
import HeaderHorizontal from './HeaderHorizontal.vue'

describe('HeaderHorizontal (server)', () => {
  it('renders content and the drawer button', async () => {
    const { html } = await renderOnServer(() =>
      h(HeaderHorizontal, null, {
        content: () => h('span', 'DESKTOP LINKS'),
        'content-right': () => h('span', 'RIGHT LINKS'),
        'mobile-content': () => h('span', 'MOBILE LINKS'),
      }),
    )
    expect(html).toContain('DESKTOP LINKS')
    expect(html).toContain('RIGHT LINKS')
    expect(html).toContain('aria-label="Menu"')
    expect(html).not.toContain('MOBILE LINKS')
  })

  it('the drawer button is type=button with aria-controls in server html (#128)', async () => {
    const { html } = await renderOnServer(() =>
      h(HeaderHorizontal, null, {
        content: () => h('span', 'C'),
        'mobile-content': () => h('span', 'M'),
      }),
    )
    expect(html).toMatch(/<button[^>]*type="button"/)
    expect(html).toMatch(/<button[^>]*aria-controls="[^"]+"/)
  })
})
