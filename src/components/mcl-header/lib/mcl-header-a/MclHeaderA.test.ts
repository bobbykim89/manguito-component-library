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

// #115: props declared on MclHeaderA must reach HeaderHorizontal.
describe('MclHeaderA prop pass-through', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  const menuButton = () =>
    document.body.querySelector('button[aria-expanded]') as HTMLButtonElement

  it('showDrawerBorder: false removes the menu button border', () => {
    const w = mount(MclHeaderA, {
      props: { ...props, showDrawerBorder: false },
      attachTo: document.body,
    })
    expect(menuButton().classList.contains('border')).toBe(false)
    w.unmount()
  })

  it('keeps the menu button border by default', () => {
    const w = mount(MclHeaderA, { props, attachTo: document.body })
    expect(menuButton().classList.contains('border')).toBe(true)
    w.unmount()
  })

  it('scrollDistance sets when the header fades in', async () => {
    // Scrolled 75px: past the base default (50), short of the 100 set here.
    const original = Object.getOwnPropertyDescriptor(window, 'scrollY')
    Object.defineProperty(window, 'scrollY', { value: 75, configurable: true })
    Object.defineProperty(document.documentElement, 'scrollTop', {
      value: 75,
      configurable: true,
    })
    try {
      const w = mount(MclHeaderA, {
        props: { ...props, fadeInOnScroll: true, scrollDistance: 100 },
        attachTo: document.body,
      })
      await nextTick()
      const header = document.body.querySelector('header')!
      expect(header.className).toContain('bg-opacity-100')
      expect(header.className).not.toContain('bg-opacity-70')
      w.unmount()
    } finally {
      delete (document.documentElement as any).scrollTop
      if (original) Object.defineProperty(window, 'scrollY', original)
      else delete (window as any).scrollY
    }
  })
})
