import { afterEach, describe, expect, it } from 'vitest'
import { createSSRApp, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { hydrate, renderOnServer } from '@mcl/test-utils/ssr'
import HeaderHorizontal from './HeaderHorizontal.vue'

const settle = () => new Promise((r) => setTimeout(r, 50))
const slots = {
  content: () => h('span', 'DESKTOP LINKS'),
  'mobile-content': () => h('span', 'MOBILE LINKS'),
}

describe('HeaderHorizontal (client)', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('hydrates with no warnings', async () => {
    const r = await hydrate(() => h(HeaderHorizontal, null, slots))
    await settle()
    expect(r.warnings).toEqual([])
    expect(r.container.textContent).toContain('DESKTOP LINKS')
    r.unmount()
  })

  it('drawer button emits toggle-drawer', async () => {
    const events: boolean[] = []
    const r = await hydrate(() =>
      h(
        HeaderHorizontal,
        { onToggleDrawer: (_e: Event, open: boolean) => events.push(open) },
        slots,
      ),
    )
    r.container.querySelector<HTMLElement>('button[aria-label]')!.click()
    await nextTick()
    expect(events).toEqual([true])
    r.unmount()
  })

  it('animates a margin-free wrapper so the mobile menu opens without a jump', async () => {
    const r = await hydrate(() => h(HeaderHorizontal, null, slots))
    r.container.querySelector<HTMLElement>('button[aria-label]')!.click()
    await nextTick()
    const animated = r.container.querySelector('.overflow-hidden.lg\\:hidden')!
      .firstElementChild as HTMLElement
    // Only height is transitioned: vertical margin or padding on the animated
    // element would appear on insert and vanish on removal in a single frame.
    expect(animated.className).not.toMatch(/(^|\s)[mp][ytb]?-/)
    expect(animated.textContent).toContain('MOBILE LINKS')
    expect(animated.querySelector('.my-2xs.rounded-md')).not.toBeNull()
    r.unmount()
  })

  it('hydrates with no warnings when the page loads scrolled', async () => {
    // Server html is rendered at scrollY 0 (as on a real server); the client
    // then hydrates in a page that is already scrolled.
    const render = () =>
      h(HeaderHorizontal, { fadeInOnScroll: true, scrollDistance: 100 }, slots)
    const { html } = await renderOnServer(render)
    document.body.innerHTML = `<div id="app">${html}</div>`
    // useWindowScroll measures documentElement.scrollTop (after mount), so
    // stub both it and window.scrollY.
    const original = Object.getOwnPropertyDescriptor(window, 'scrollY')
    Object.defineProperty(window, 'scrollY', {
      value: 500,
      configurable: true,
    })
    Object.defineProperty(document.documentElement, 'scrollTop', {
      value: 500,
      configurable: true,
    })
    const warnings: string[] = []
    const app = createSSRApp({ render })
    app.config.warnHandler = (msg) => {
      warnings.push(msg)
    }
    try {
      app.mount(document.getElementById('app')!)
      await nextTick()
      await settle()
      expect(warnings).toEqual([])
      // once mounted, the scroll-derived class applies
      expect(document.querySelector('header')!.className).toContain(
        'bg-opacity-70',
      )
    } finally {
      app.unmount()
      document.body.innerHTML = ''
      delete (document.documentElement as any).scrollTop
      if (original) Object.defineProperty(window, 'scrollY', original)
      else delete (window as any).scrollY
    }
  })
})

// #110 items 5 and 6: unnamed <nav> landmarks, and a hamburger named only
// "Open"/"Close".
describe('HeaderHorizontal landmarks and menu button', () => {
  const headerWith = (props: Record<string, unknown> = {}) =>
    mount(HeaderHorizontal, { props, slots: slots, attachTo: document.body })
  const navLabels = () =>
    [...document.body.querySelectorAll('nav')].map((n) =>
      n.getAttribute('aria-label'),
    )
  const menuButton = () =>
    document.body.querySelector('button[aria-expanded]') as HTMLButtonElement

  afterEach(() => {
    document.body.innerHTML = ''
    document.documentElement.style.overflow = ''
  })

  it('labels every nav "Main" by default, and with navLabel when set', async () => {
    const w = headerWith()
    menuButton().click()
    await nextTick()
    expect(navLabels().length).toBeGreaterThan(0)
    expect(new Set(navLabels())).toEqual(new Set(['Main']))
    w.unmount()

    const w2 = headerWith({ navLabel: 'Primary' })
    menuButton().click()
    await nextTick()
    expect(new Set(navLabels())).toEqual(new Set(['Primary']))
    w2.unmount()
  })

  it('keeps the menu button name constant and reports state with aria-expanded', async () => {
    const w = headerWith()
    expect(menuButton().getAttribute('aria-label')).toBe('Menu')
    expect(menuButton().getAttribute('aria-expanded')).toBe('false')
    menuButton().click()
    await nextTick()
    expect(menuButton().getAttribute('aria-label')).toBe('Menu')
    expect(menuButton().getAttribute('aria-expanded')).toBe('true')
    w.unmount()
  })

  it('takes the menu button name from menuLabel', () => {
    const w = headerWith({ menuLabel: 'Navigation' })
    expect(menuButton().getAttribute('aria-label')).toBe('Navigation')
    w.unmount()
  })
})
