// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { renderOnServer } from '../__tests__/ssr'
import HeaderVertical from './HeaderVertical.vue'

const slots = {
  content: () => h('span', 'DESKTOP LINKS'),
  'mobile-content': () => h('span', 'MOBILE LINKS'),
}

describe('HeaderVertical (server)', () => {
  it('hamburger button is in server html', async () => {
    const { html, teleports } = await renderOnServer(() =>
      h(HeaderVertical, null, slots),
    )
    expect(html).toContain('aria-label="Open"')
    expect(html).toContain('aria-expanded="false"')
    expect(teleports.body).toBeFalsy()
  })

  it('desktop content is in server html', async () => {
    const { html } = await renderOnServer(() => h(HeaderVertical, null, slots))
    expect(html).toContain('DESKTOP LINKS')
  })

  it('renders no menu button without mobile-content', async () => {
    const { html } = await renderOnServer(() =>
      h(HeaderVertical, null, { content: slots.content }),
    )
    expect(html).not.toContain('aria-label="Open"')
  })
})
