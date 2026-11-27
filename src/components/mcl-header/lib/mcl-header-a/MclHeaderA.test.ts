import { afterEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import { generateClass } from '@bobbykim/manguito-theme'
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
      'button[aria-label="Navigation"]',
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
    document.body.querySelector(
      'button[aria-label="Menu"]',
    ) as HTMLButtonElement

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

// #131: shared helpers for the accessibility tests below.
const menuButton = () =>
  document.body.querySelector<HTMLButtonElement>('button[aria-label="Menu"]')!
const mobilePanel = () =>
  document.getElementById(menuButton().getAttribute('aria-controls')!)!
const linkByText = (root: ParentNode, text: string) =>
  Array.from(root.querySelectorAll<HTMLAnchorElement>('a')).find(
    (a) => a.textContent?.trim() === text,
  )!
const buttonByText = (root: ParentNode, text: string) =>
  Array.from(root.querySelectorAll<HTMLButtonElement>('button')).find(
    (b) => b.textContent?.trim() === text,
  )!
const hasClasses = (el: Element, classString: string) =>
  classString
    .split(' ')
    .filter(Boolean)
    .every((c) => el.classList.contains(c))
const openDrawer = async () => {
  menuButton().click()
  await nextTick()
}
const titleEl = () =>
  Array.from(document.body.querySelectorAll<HTMLElement>('header *')).find(
    (el) => el.children.length === 0 && el.textContent === 'SITE-TITLE',
  )!.parentElement!

describe('MclHeaderA accessibility (#131)', () => {
  let w: ReturnType<typeof mount> | undefined
  const mountA = (extra: Record<string, unknown> = {}) => {
    w = mount(MclHeaderA, {
      props: { ...props, ...extra },
      attachTo: document.body,
    })
    return w
  }
  afterEach(() => {
    w?.unmount()
    w = undefined
    document.body.innerHTML = ''
  })

  it('title is a span by default, with no heading in the header', () => {
    mountA()
    expect(
      document.querySelectorAll('header h1, header h2, header h3, header h4')
        .length,
    ).toBe(0)
    expect(titleEl().tagName).toBe('SPAN')
  })

  it('titleLevel renders the title as that heading with the same classes', () => {
    mountA()
    const spanClass = titleEl().className
    w!.unmount()
    mountA({ titleLevel: 'h1' })
    const h1 = document.querySelector('header h1')!
    expect(h1.textContent).toBe('SITE-TITLE')
    expect(h1.className).toBe(spanClass)
  })

  it('the logo link is out of the tab order and hidden from assistive tech', () => {
    mountA()
    const logoLinks = Array.from(document.querySelectorAll('a')).filter((a) =>
      a.querySelector('img'),
    )
    expect(logoLinks.length).toBeGreaterThan(0)
    for (const a of logoLinks) {
      expect(a.getAttribute('tabindex')).toBe('-1')
      expect(a.getAttribute('aria-hidden')).toBe('true')
    }
  })

  it('the title link says it opens a new tab only when its target is _blank', () => {
    mountA({ titleBlockLinkTarget: '_blank' })
    const sr = titleEl().closest('a')!.querySelector('.sr-only')
    expect(sr?.textContent?.trim()).toBe('(opens in a new tab)')
    w!.unmount()
    mountA()
    expect(titleEl().closest('a')!.querySelector('.sr-only')).toBeNull()
  })

  it('showHighlight: false reaches the nav parts', () => {
    mountA({ showHighlight: false })
    expect(document.querySelectorAll('.nav__decorator').length).toBe(0)
    expect(document.querySelector('[display-highlight]')).toBeNull()
    w!.unmount()
    mountA()
    expect(document.querySelectorAll('.nav__decorator').length).toBeGreaterThan(
      0,
    )
    expect(document.querySelector('[display-highlight]')).toBeNull()
  })

  it('choosing a top-level link in the mobile menu returns focus to the drawer button', async () => {
    mountA()
    await openDrawer()
    const home = linkByText(mobilePanel(), 'Home')
    home.focus()
    home.click()
    await nextTick()
    await settle()
    expect(document.activeElement).toBe(menuButton())
  })
})

const linkItems = [
  { title: 'Home', url: '/', current: true },
  { title: 'Ext', url: 'https://x.test', target: '_blank' as const },
  { title: 'Fancy <em>One</em>', url: '/f' },
]

const extLink = () =>
  Array.from(document.querySelectorAll('a')).find((a) =>
    a.textContent?.includes('Ext'),
  )!

describe('MclHeaderA top-level links (#131)', () => {
  let w: ReturnType<typeof mount> | undefined
  const mountA = (extra: Record<string, unknown> = {}) => {
    w = mount(MclHeaderA, {
      props: { ...props, menuItems: linkItems, ...extra },
      attachTo: document.body,
    })
  }
  afterEach(() => {
    w?.unmount()
    w = undefined
    document.body.innerHTML = ''
  })

  it('a current top-level link has aria-current="page"; others have none', () => {
    mountA()
    expect(linkByText(document.body, 'Home').getAttribute('aria-current')).toBe(
      'page',
    )
    expect(extLink().hasAttribute('aria-current')).toBe(false)
  })

  it('with showHighlight off, the current link is underlined and others are not', () => {
    mountA({ showHighlight: false })
    expect(
      linkByText(document.body, 'Home').classList.contains('underline'),
    ).toBe(true)
    expect(extLink().classList.contains('underline')).toBe(false)
  })

  it('with showHighlight on, the current link is not underlined', () => {
    mountA()
    expect(
      linkByText(document.body, 'Home').classList.contains('underline'),
    ).toBe(false)
  })

  it('a top-level link with target _blank has the hidden new-tab text', () => {
    mountA()
    const ext = Array.from(document.querySelectorAll('a')).find((a) =>
      a.textContent?.includes('Ext'),
    )!
    expect(ext.querySelector('.sr-only')?.textContent?.trim()).toBe(
      '(opens in a new tab)',
    )
    expect(
      linkByText(document.body, 'Home').querySelector('.sr-only'),
    ).toBeNull()
  })

  it('a top-level title with HTML still renders its markup', () => {
    mountA()
    const fancy = linkByText(document.body, 'Fancy One')
    expect(fancy.querySelector('em')?.textContent).toBe('One')
  })

  it('top-level links use the shared focus ring instead of outline-none', () => {
    mountA()
    const home = linkByText(document.body, 'Home')
    expect(home.classList.contains('focus-visible:mcl-focus-ring')).toBe(true)
    expect(home.classList.contains('outline-none')).toBe(false)
  })
})
