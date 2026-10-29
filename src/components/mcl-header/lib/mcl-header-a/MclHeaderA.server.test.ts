// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { renderOnServer } from '@mcl/ssr-test-utils'
import MclHeaderA from './MclHeaderA.vue'

const props = {
  logo: '/logo.png',
  title: 'SITE-TITLE',
  titleBlockLink: '/',
  menuItems: [
    { title: 'Home', url: '/' },
    { title: 'More', children: [{ title: 'Child', url: '/child' }] },
  ],
}
const render = () =>
  h(MclHeaderA, props, { 'content-right': () => h('span', 'RIGHT') })

describe('MclHeaderA (server)', () => {
  it('renders on the server', async () => {
    const { html } = await renderOnServer(render)
    expect(html).toContain('SITE-TITLE')
    expect(html).toContain('Home')
  })
})
