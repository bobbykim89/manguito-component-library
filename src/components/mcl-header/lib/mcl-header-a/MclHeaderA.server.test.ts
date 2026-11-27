// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { renderOnServer } from '@mcl/test-utils/ssr'
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

describe('MclHeaderA dropdown (server, #131)', () => {
  it('the dropdown toggle is server-rendered with aria-expanded="false" and type="button"', async () => {
    const { html } = await renderOnServer(render)
    const tags = html.match(/<button[^>]*>(?:(?!<\/button>)[\s\S])*?More/g)
    expect(tags).not.toBeNull()
    const openTag = tags![tags!.length - 1].match(/<button[^>]*>/g)!.pop()!
    expect(openTag).toContain('aria-expanded="false"')
    expect(openTag).toContain('type="button"')
  })
})
