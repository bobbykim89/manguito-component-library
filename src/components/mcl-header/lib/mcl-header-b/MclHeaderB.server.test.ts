// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { renderOnServer } from '@mcl/ssr-test-utils'
import MclHeaderB from './MclHeaderB.vue'

const props = {
  logo: '/logo.png',
  title: 'SITE-TITLE',
  titleBlockLink: '/',
  menuItems: [
    { title: 'Home', url: '/' },
    { title: 'More', children: [{ title: 'Child', url: '/child' }] },
  ],
}
const render = () => h(MclHeaderB, props, { default: () => h('span', 'MAIN') })

describe('MclHeaderB (server)', () => {
  it('renders on the server', async () => {
    const { html } = await renderOnServer(render)
    expect(html).toContain('SITE-TITLE')
    expect(html).toContain('Home')
  })

  it('the hamburger button is in the main server html', async () => {
    const { html } = await renderOnServer(render)
    expect(html).toMatch(/<button[^>]*aria-label/)
  })
})
