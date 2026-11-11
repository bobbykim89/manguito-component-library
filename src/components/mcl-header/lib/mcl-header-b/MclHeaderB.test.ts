import { afterEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import { hydrate } from '@mcl/test-utils/ssr'
import MclHeaderB from './MclHeaderB.vue'

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
const render = () => h(MclHeaderB, props, { default: () => h('span', 'MAIN') })

describe('MclHeaderB (client)', () => {
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
describe('MclHeaderB labels', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('passes navLabel and menuLabel through', async () => {
    const w = mount(MclHeaderB, {
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

// #115: showDrawerBorder must reach HeaderVertical's menu button.
describe('MclHeaderB prop pass-through', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  const menuButton = () =>
    document.body.querySelector('button[aria-expanded]') as HTMLButtonElement

  it('showDrawerBorder: false removes the menu button border', async () => {
    const w = mount(MclHeaderB, {
      props: { ...props, showDrawerBorder: false },
      attachTo: document.body,
    })
    await nextTick()
    expect(menuButton().classList.contains('border')).toBe(false)
    w.unmount()
  })

  it('keeps the menu button border by default', async () => {
    const w = mount(MclHeaderB, { props, attachTo: document.body })
    await nextTick()
    expect(menuButton().classList.contains('border')).toBe(true)
    w.unmount()
  })
})
