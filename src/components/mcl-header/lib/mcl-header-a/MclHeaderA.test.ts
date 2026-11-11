import { afterEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import { hydrate } from '@mcl/test-utils/ssr'
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

// #110 items 5 and 6: the labels reach the base header's navs and menu button.
describe('MclHeaderA labels', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('passes navLabel and menuLabel through', async () => {
    const w = mount(MclHeaderA, {
      props: { ...props, navLabel: 'Primary', menuLabel: 'Navigation' },
      attachTo: document.body,
    })
    const button = document.body.querySelector(
      'button[aria-expanded]',
    ) as HTMLButtonElement
    expect(button.getAttribute('aria-label')).toBe('Navigation')
    button.click()
    await nextTick()
    const labels = [...document.body.querySelectorAll('nav')].map((n) =>
      n.getAttribute('aria-label'),
    )
    expect(labels.length).toBeGreaterThan(0)
    expect(new Set(labels)).toEqual(new Set(['Primary']))
    w.unmount()
  })
})
