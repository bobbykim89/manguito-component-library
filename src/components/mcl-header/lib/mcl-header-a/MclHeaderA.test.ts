import { afterEach, describe, expect, it } from 'vitest'
import { h } from 'vue'
import { hydrate } from '@mcl/ssr-test-utils'
import MclHeaderA from './MclHeaderA.vue'

const settle = () => new Promise((r) => setTimeout(r, 50))
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

describe('MclHeaderA (client)', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('hydrates with no warnings', async () => {
    const r = await hydrate(render)
    await settle()
    expect(r.warnings).toEqual([])
    r.unmount()
  })
})
