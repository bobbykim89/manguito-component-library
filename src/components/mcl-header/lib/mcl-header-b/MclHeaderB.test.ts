import { afterEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import { generateClass } from '@bobbykim/manguito-theme'
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

// #115: showDrawerBorder must reach HeaderVertical's menu button.
describe('MclHeaderB prop pass-through', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  const menuButton = () =>
    document.body.querySelector(
      'button[aria-label="Menu"]',
    ) as HTMLButtonElement

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
// The title's element (the leaf holding the text is its inner span).
const titleEls = (root: ParentNode = document.body) =>
  Array.from(root.querySelectorAll<HTMLElement>('*'))
    .filter((el) => el.children.length === 0 && el.textContent === 'SITE-TITLE')
    .map((el) => el.parentElement!)

describe('MclHeaderB accessibility (#131)', () => {
  let w: ReturnType<typeof mount> | undefined
  const mountB = async (extra: Record<string, unknown> = {}) => {
    w = mount(MclHeaderB, {
      props: { ...props, ...extra },
      attachTo: document.body,
    })
    await nextTick()
    return w
  }
  afterEach(() => {
    w?.unmount()
    w = undefined
    document.body.innerHTML = ''
  })

  it('title is a span by default on desktop and mobile, with no heading', async () => {
    await mountB()
    await openDrawer()
    const titles = titleEls()
    expect(titles.length).toBe(2)
    for (const t of titles) expect(t.tagName).toBe('SPAN')
    expect(document.querySelectorAll('h1, h2, h3, h4').length).toBe(0)
  })

  it('titleLevel renders both titles as that heading with the same classes', async () => {
    await mountB()
    await openDrawer()
    const spanClasses = titleEls().map((t) => t.className)
    w!.unmount()
    document.body.innerHTML = ''
    await mountB({ titleLevel: 'h1' })
    await openDrawer()
    const h1s = Array.from(document.querySelectorAll('h1'))
    expect(h1s.length).toBe(2)
    for (const h of h1s) expect(h.textContent).toBe('SITE-TITLE')
    expect(h1s.map((h) => h.className)).toEqual(spanClasses)
  })

  it('both logo links are out of the tab order and hidden from assistive tech', async () => {
    await mountB()
    await openDrawer()
    const logoLinks = Array.from(document.querySelectorAll('a')).filter((a) =>
      a.querySelector('img'),
    )
    expect(logoLinks.length).toBe(2)
    for (const a of logoLinks) {
      expect(a.getAttribute('tabindex')).toBe('-1')
      expect(a.getAttribute('aria-hidden')).toBe('true')
    }
  })

  it('both title links say they open a new tab only when the target is _blank', async () => {
    await mountB({ titleBlockLinkTarget: '_blank' })
    await openDrawer()
    let titles = titleEls()
    expect(titles.length).toBe(2)
    for (const t of titles) {
      const sr = t.closest('a')!.querySelector('.sr-only')
      expect(sr?.textContent?.trim()).toBe('(opens in a new tab)')
    }
    w!.unmount()
    document.body.innerHTML = ''
    await mountB()
    await openDrawer()
    titles = titleEls()
    for (const t of titles) {
      expect(t.closest('a')!.querySelector('.sr-only')).toBeNull()
    }
  })

  it('choosing a top-level link in the mobile menu returns focus to the drawer button', async () => {
    await mountB()
    await openDrawer()
    const home = linkByText(mobilePanel(), 'Home')
    home.focus()
    home.click()
    await nextTick()
    await settle()
    expect(document.activeElement).toBe(menuButton())
  })

  it('choosing the title link in the mobile menu returns focus to the drawer button', async () => {
    await mountB()
    await openDrawer()
    const link = titleEls(mobilePanel())[0].closest('a')!
    link.focus()
    link.click()
    await nextTick()
    await settle()
    expect(document.activeElement).toBe(menuButton())
  })
})

const linkItems = [
  { title: 'Home', url: '/', current: true },
  { title: 'Ext', url: 'https://x.test', target: '_blank' as const },
]

describe('MclHeaderB top-level links (#131)', () => {
  let w: ReturnType<typeof mount> | undefined
  const mountB = async (extra: Record<string, unknown> = {}) => {
    w = mount(MclHeaderB, {
      props: {
        ...props,
        menuItems: linkItems,
        menuTextColor: 'dark-3',
        highlightColor: 'primary',
        ...extra,
      },
      attachTo: document.body,
    })
    await nextTick()
  }
  afterEach(() => {
    w?.unmount()
    w = undefined
    document.body.innerHTML = ''
  })

  it('a current top-level link has aria-current="page" and its highlight drawn', async () => {
    await mountB()
    const home = linkByText(document.body, 'Home')
    const ext = Array.from(document.querySelectorAll('a')).find((a) =>
      a.textContent?.includes('Ext'),
    )!
    expect(home.getAttribute('aria-current')).toBe('page')
    expect(ext.hasAttribute('aria-current')).toBe(false)
    expect(home.classList.contains('before:w-full')).toBe(true)
    expect(ext.classList.contains('before:w-full')).toBe(false)
    expect(
      hasClasses(home, generateClass.textColorVariant({ color: 'dark-3' })),
    ).toBe(true)
    expect(
      hasClasses(home, generateClass.textColorVariant({ color: 'primary' })),
    ).toBe(false)
    expect(
      hasClasses(ext, generateClass.textColorVariant({ color: 'primary' })),
    ).toBe(true)
  })

  it('with showHighlight off, the current top-level link is underlined', async () => {
    await mountB({ showHighlight: false })
    const home = linkByText(document.body, 'Home')
    const ext = Array.from(document.querySelectorAll('a')).find((a) =>
      a.textContent?.includes('Ext'),
    )!
    expect(home.classList.contains('underline')).toBe(true)
    expect(ext.classList.contains('underline')).toBe(false)
    expect(
      hasClasses(home, generateClass.textColorVariant({ color: 'primary' })),
    ).toBe(true)
    expect(
      hasClasses(ext, generateClass.textColorVariant({ color: 'dark-3' })),
    ).toBe(true)
  })

  it('a top-level link with target _blank has the hidden new-tab text', async () => {
    await mountB()
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
})
