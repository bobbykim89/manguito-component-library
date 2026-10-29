import { afterEach, describe, expect, it } from 'vitest'
import { createSSRApp, h, nextTick } from 'vue'
import { hydrate, renderOnServer } from '../__tests__/ssr'
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
