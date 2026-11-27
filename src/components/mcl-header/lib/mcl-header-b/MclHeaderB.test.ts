import { afterEach, describe, expect, it, vi } from 'vitest'
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
    // no competing width class left for CSS order to decide
    expect(home.classList.contains('before:w-0')).toBe(false)
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

const collapseItems = [
  { title: 'Home', url: '/' },
  {
    title: 'More',
    children: [
      { title: 'C1', url: '/c1', current: true },
      { title: 'C2', url: '/c2' },
      { title: 'C3', url: 'https://c3.test', target: '_blank' as const },
    ],
  },
]
const buttonsByText = (root: ParentNode, text: string) =>
  Array.from(root.querySelectorAll<HTMLButtonElement>('button')).filter(
    (b) => b.textContent?.trim() === text,
  )
// The desktop sidebar is the base header's own markup; the mobile menu is
// teleported to <body>, outside it.
const sidebar = () => document.body.querySelector<HTMLElement>('header')!

describe('MclHeaderB sidebar collapse (#131)', () => {
  let w: ReturnType<typeof mount> | undefined
  const mountB = async (extra: Record<string, unknown> = {}) => {
    w = mount(MclHeaderB, {
      props: {
        ...props,
        menuItems: collapseItems,
        menuTextColor: 'dark-3',
        highlightColor: 'primary',
        ...extra,
      },
      attachTo: document.body,
    })
    await nextTick()
  }
  const desktopToggle = () => buttonsByText(sidebar(), 'More')[0]
  afterEach(() => {
    w?.unmount()
    w = undefined
    document.body.innerHTML = ''
  })

  it('the sidebar collapse toggle exposes aria-expanded and aria-controls and is type="button"', async () => {
    await mountB()
    const toggle = desktopToggle()
    expect(toggle.getAttribute('type')).toBe('button')
    expect(toggle.getAttribute('aria-expanded')).toBe('false')
    const controls = toggle.getAttribute('aria-controls')!
    expect(controls).toBeTruthy()
    expect(
      document.getElementById(controls)!.contains(linkByText(sidebar(), 'C1')),
    ).toBe(true)
    toggle.click()
    await nextTick()
    expect(toggle.getAttribute('aria-expanded')).toBe('true')
  })

  it('desktop and mobile collapses, and two with the same title, all control different panels', async () => {
    await mountB({
      menuItems: [
        { title: 'More', children: [{ title: 'X1', url: '/x1' }] },
        { title: 'More', children: [{ title: 'Y1', url: '/y1' }] },
      ],
    })
    await openDrawer()
    const toggles = buttonsByText(document.body, 'More')
    expect(toggles.length).toBe(4)
    const ids = toggles.map((t) => t.getAttribute('aria-controls')!)
    expect(new Set(ids).size).toBe(4)
    for (const [i, id] of ids.entries()) {
      const own = i % 2 === 0 ? 'X1' : 'Y1'
      const other = i % 2 === 0 ? 'Y1' : 'X1'
      expect(document.getElementById(id)!.textContent).toContain(own)
      expect(document.getElementById(id)!.textContent).not.toContain(other)
    }
  })

  it('choosing a desktop sidebar collapse link moves focus to that collapse toggle', async () => {
    await mountB()
    const toggle = desktopToggle()
    toggle.click()
    await nextTick()
    const c1 = linkByText(sidebar(), 'C1')
    c1.focus()
    c1.click()
    await nextTick()
    await settle()
    expect(document.activeElement).toBe(toggle)
    expect(toggle.getAttribute('aria-expanded')).toBe('false')
  })

  it('choosing a mobile collapse link leaves focus on the drawer button', async () => {
    await mountB()
    await openDrawer()
    buttonsByText(mobilePanel(), 'More')[0].click()
    await nextTick()
    const c1 = linkByText(mobilePanel(), 'C1')
    c1.focus()
    c1.click()
    await nextTick()
    await settle()
    expect(document.activeElement).toBe(menuButton())
  })

  it('a desktop top-level link chosen while a collapse is open keeps focus', async () => {
    await mountB()
    desktopToggle().click()
    await nextTick()
    const home = linkByText(sidebar(), 'Home')
    home.focus()
    home.click()
    await nextTick()
    await settle()
    expect(document.activeElement).toBe(home)
    expect(desktopToggle().getAttribute('aria-expanded')).toBe('false')
  })

  it('collapse-click still reports the state from before the click', async () => {
    const onCollapseClick = vi.fn()
    await mountB({ onCollapseClick })
    desktopToggle().click()
    await nextTick()
    expect(onCollapseClick).toHaveBeenCalledTimes(1)
    expect(onCollapseClick).toHaveBeenCalledWith(
      expect.any(Event),
      'More',
      false,
    )
  })

  it('collapse links: current has aria-current and its highlight drawn, _blank has new-tab text', async () => {
    await mountB()
    const one = linkByText(sidebar(), 'C1')
    const two = linkByText(sidebar(), 'C2')
    const three = Array.from(sidebar().querySelectorAll('a')).find((a) =>
      a.textContent?.includes('C3'),
    )!
    expect(one.getAttribute('aria-current')).toBe('page')
    expect(two.hasAttribute('aria-current')).toBe(false)
    expect(one.classList.contains('before:w-full')).toBe(true)
    expect(one.classList.contains('before:w-0')).toBe(false)
    expect(two.classList.contains('before:w-full')).toBe(false)
    expect(
      hasClasses(one, generateClass.textColorVariant({ color: 'dark-3' })),
    ).toBe(true)
    expect(
      hasClasses(one, generateClass.textColorVariant({ color: 'primary' })),
    ).toBe(false)
    expect(three.querySelector('.sr-only')?.textContent?.trim()).toBe(
      '(opens in a new tab)',
    )
    expect(two.querySelector('.sr-only')).toBeNull()
  })

  it('with showHighlight off, the current collapse link is underlined', async () => {
    await mountB({ showHighlight: false })
    const one = linkByText(sidebar(), 'C1')
    const two = linkByText(sidebar(), 'C2')
    expect(one.classList.contains('underline')).toBe(true)
    expect(two.classList.contains('underline')).toBe(false)
    // only the hovered colour, no competing text colour
    expect(
      hasClasses(one, generateClass.textColorVariant({ color: 'primary' })),
    ).toBe(true)
    expect(
      hasClasses(one, generateClass.textColorVariant({ color: 'dark-3' })),
    ).toBe(false)
  })

  it('a current mobile collapse link has its bar drawn from the left with no competing classes', async () => {
    await mountB()
    await openDrawer()
    const one = linkByText(mobilePanel(), 'C1')
    expect(one.classList.contains('before:w-full')).toBe(true)
    expect(one.classList.contains('before:left-0')).toBe(true)
    expect(one.classList.contains('before:w-0')).toBe(false)
    expect(one.classList.contains('before:left-full')).toBe(false)
  })
})
