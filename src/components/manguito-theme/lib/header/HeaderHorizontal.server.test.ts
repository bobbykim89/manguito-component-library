// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { renderOnServer } from '../__tests__/ssr'
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
    expect(html).toContain('aria-label="Open"')
    expect(html).not.toContain('MOBILE LINKS')
  })
})
