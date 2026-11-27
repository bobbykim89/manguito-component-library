import { afterEach, describe, expect, it, vi } from 'vitest'
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

const key = (el: Element, k: string): KeyboardEvent => {
  const e = new KeyboardEvent('keydown', {
    key: k,
    bubbles: true,
    cancelable: true,
  })
  el.dispatchEvent(e)
  return e
}
const dropdownItems = [
  {
    title: 'More',
    children: [
      { title: 'C1', url: '/c1', current: true },
      { title: 'C2', url: '/c2' },
      { title: 'C3', url: 'https://c3.test', target: '_blank' as const },
    ],
  },
]
const c3 = (root: ParentNode = document.body) =>
  Array.from(root.querySelectorAll('a')).find((a) =>
    a.textContent?.includes('C3'),
  )!

describe('MclHeaderA desktop dropdown (#131)', () => {
  let w: ReturnType<typeof mount> | undefined
  // Real <Transition>s (mount stubs them by default), so closing content
  // stays in the DOM while it leaves, as in a browser.
  const mountA = (extra: Record<string, unknown> = {}) => {
    w = mount(MclHeaderA, {
      props: { ...props, menuItems: dropdownItems, ...extra },
      attachTo: document.body,
      global: { stubs: { transition: false } },
    })
  }
  const toggle = () => buttonByText(document.body, 'More')
  const open = async () => {
    toggle().click()
    await nextTick()
  }
  afterEach(() => {
    w?.unmount()
    w = undefined
    document.body.innerHTML = ''
  })

  it('the dropdown toggle exposes aria-expanded and aria-controls and is type="button"', async () => {
    mountA()
    expect(toggle().getAttribute('type')).toBe('button')
    expect(toggle().getAttribute('aria-expanded')).toBe('false')
    const controls = toggle().getAttribute('aria-controls')
    expect(controls).toBeTruthy()
    await open()
    expect(toggle().getAttribute('aria-expanded')).toBe('true')
    expect(
      document
        .getElementById(controls!)!
        .contains(linkByText(document.body, 'C1')),
    ).toBe(true)
  })

  it('choosing a dropdown link closes it and returns focus to its toggle', async () => {
    mountA()
    await open()
    const c2 = linkByText(document.body, 'C2')
    c2.focus()
    c2.click()
    await nextTick()
    await settle()
    expect(linkByText(document.body, 'C2')).toBeUndefined()
    expect(document.activeElement).toBe(toggle())
  })

  it('collapse-click still reports the state from before the click', async () => {
    const onCollapseClick = vi.fn()
    mountA({ onCollapseClick })
    await open()
    expect(onCollapseClick).toHaveBeenCalledTimes(1)
    expect(onCollapseClick).toHaveBeenCalledWith(
      expect.any(Event),
      'More',
      false,
    )
  })

  it('ArrowDown from the open toggle focuses the first link and prevents default', async () => {
    mountA()
    await open()
    toggle().focus()
    const e = key(toggle(), 'ArrowDown')
    expect(e.defaultPrevented).toBe(true)
    expect(document.activeElement).toBe(linkByText(document.body, 'C1'))
  })

  it('ArrowDown and ArrowUp move one link and stop at the ends', async () => {
    mountA()
    await open()
    const one = linkByText(document.body, 'C1')
    const two = linkByText(document.body, 'C2')
    const three = c3()
    one.focus()
    const steps: [string, HTMLElement][] = [
      ['ArrowDown', two],
      ['ArrowDown', three],
      ['ArrowDown', three],
      ['ArrowUp', two],
      ['ArrowUp', one],
      ['ArrowUp', one],
    ]
    for (const [k, expected] of steps) {
      const e = key(document.activeElement!, k)
      expect(e.defaultPrevented).toBe(true)
      expect(document.activeElement).toBe(expected)
    }
  })

  it('arrows follow focus moved by Tab', async () => {
    mountA()
    await open()
    linkByText(document.body, 'C2').focus()
    key(document.activeElement!, 'ArrowDown')
    expect(document.activeElement).toBe(c3())
  })

  it('ArrowUp from the open toggle prevents default and keeps focus on it', async () => {
    mountA()
    await open()
    toggle().focus()
    const e = key(toggle(), 'ArrowUp')
    expect(e.defaultPrevented).toBe(true)
    expect(document.activeElement).toBe(toggle())
  })

  it('arrows with the dropdown closed are not handled', async () => {
    mountA()
    toggle().focus()
    let e!: KeyboardEvent
    expect(() => (e = key(toggle(), 'ArrowDown'))).not.toThrow()
    expect(e.defaultPrevented).toBe(false)
    expect(key(toggle(), 'ArrowUp').defaultPrevented).toBe(false)
    expect(document.activeElement).toBe(toggle())
    // closed again while the links may still be leaving
    await open()
    toggle().click()
    await nextTick()
    expect(key(toggle(), 'ArrowDown').defaultPrevented).toBe(false)
    expect(key(toggle(), 'ArrowUp').defaultPrevented).toBe(false)
  })

  it('other keys are not prevented', async () => {
    mountA()
    await open()
    const one = linkByText(document.body, 'C1')
    one.focus()
    expect(key(one, 'Tab').defaultPrevented).toBe(false)
    expect(key(one, 'a').defaultPrevented).toBe(false)
  })

  it('two dropdowns: arrows move only within their own links', async () => {
    mountA({
      menuItems: [
        {
          title: 'A',
          children: [
            { title: 'A1', url: '/a1' },
            { title: 'A2', url: '/a2' },
          ],
        },
        {
          title: 'B',
          children: [
            { title: 'B1', url: '/b1' },
            { title: 'B2', url: '/b2' },
          ],
        },
      ],
    })
    buttonByText(document.body, 'A').click()
    await nextTick()
    // Opening B closes A by click-outside; A's links stay in the DOM while
    // they fade out, so a lookup that isn't scoped to B would reach them.
    buttonByText(document.body, 'B').click()
    await nextTick()
    expect(linkByText(document.body, 'A2')).toBeTruthy()
    const b1 = linkByText(document.body, 'B1')
    const b2 = linkByText(document.body, 'B2')
    b1.focus()
    key(document.activeElement!, 'ArrowUp')
    expect(document.activeElement).toBe(b1)
    key(document.activeElement!, 'ArrowDown')
    expect(document.activeElement).toBe(b2)
    key(document.activeElement!, 'ArrowDown')
    expect(document.activeElement).toBe(b2)
  })

  it('dropdown links: current has aria-current and the highlight background, _blank has new-tab text', async () => {
    mountA()
    await open()
    const one = linkByText(document.body, 'C1')
    const two = linkByText(document.body, 'C2')
    const highlightBg = generateClass.bgColorVariant({ color: 'primary' })
    expect(one.getAttribute('aria-current')).toBe('page')
    expect(hasClasses(one, highlightBg)).toBe(true)
    expect(two.hasAttribute('aria-current')).toBe(false)
    expect(hasClasses(two, highlightBg)).toBe(false)
    expect(c3().querySelector('.sr-only')?.textContent?.trim()).toBe(
      '(opens in a new tab)',
    )
    expect(two.querySelector('.sr-only')).toBeNull()
  })

  it('the dropdown toggle uses the shared focus ring', () => {
    mountA()
    expect(toggle().classList.contains('focus-visible:mcl-focus-ring')).toBe(
      true,
    )
    expect(toggle().classList.contains('outline-none')).toBe(false)
  })
})

describe('MclHeaderA mobile collapse (#131)', () => {
  let w: ReturnType<typeof mount> | undefined
  const mountA = async (extra: Record<string, unknown> = {}) => {
    w = mount(MclHeaderA, {
      props: { ...props, menuItems: dropdownItems, ...extra },
      attachTo: document.body,
    })
    await openDrawer()
  }
  const toggles = (title = 'More') =>
    Array.from(mobilePanel().querySelectorAll('button')).filter(
      (b) => b.textContent?.trim() === title,
    )
  afterEach(() => {
    w?.unmount()
    w = undefined
    document.body.innerHTML = ''
  })

  it('the mobile collapse toggle exposes aria-expanded and aria-controls and is type="button"', async () => {
    await mountA()
    const [toggle] = toggles()
    expect(toggle.getAttribute('type')).toBe('button')
    expect(toggle.getAttribute('aria-expanded')).toBe('false')
    const controls = toggle.getAttribute('aria-controls')!
    expect(controls).toBeTruthy()
    expect(
      document
        .getElementById(controls)!
        .contains(linkByText(mobilePanel(), 'C1')),
    ).toBe(true)
    toggle.click()
    await nextTick()
    await settle()
    expect(toggle.getAttribute('aria-expanded')).toBe('true')
    expect(toggle.querySelector('svg')!.classList.contains('rotate-180')).toBe(
      true,
    )
  })

  it('two mobile collapses with the same title control different panels', async () => {
    await mountA({
      menuItems: [
        { title: 'More', children: [{ title: 'X1', url: '/x1' }] },
        { title: 'More', children: [{ title: 'Y1', url: '/y1' }] },
      ],
    })
    const [first, second] = toggles()
    const a = first.getAttribute('aria-controls')!
    const b = second.getAttribute('aria-controls')!
    expect(a).not.toBe(b)
    expect(document.getElementById(a)!.textContent).toContain('X1')
    expect(document.getElementById(a)!.textContent).not.toContain('Y1')
    expect(document.getElementById(b)!.textContent).toContain('Y1')
  })

  it('no id is built from the item title', async () => {
    await mountA()
    expect(document.getElementById('nav-more')).toBeNull()
  })

  it('mobile collapse-click still reports the state from before the click', async () => {
    const onCollapseClick = vi.fn()
    await mountA({ onCollapseClick })
    toggles()[0].click()
    await nextTick()
    expect(onCollapseClick).toHaveBeenCalledTimes(1)
    expect(onCollapseClick).toHaveBeenCalledWith(
      expect.any(Event),
      'More',
      false,
    )
  })

  it('choosing a mobile collapse link returns focus to the drawer button', async () => {
    await mountA()
    toggles()[0].click()
    await nextTick()
    const c1 = linkByText(mobilePanel(), 'C1')
    c1.focus()
    c1.click()
    await nextTick()
    await settle()
    expect(document.activeElement).toBe(menuButton())
  })

  it('mobile collapse links: current is underlined with aria-current, _blank has new-tab text', async () => {
    await mountA()
    const one = linkByText(mobilePanel(), 'C1')
    const two = linkByText(mobilePanel(), 'C2')
    expect(one.getAttribute('aria-current')).toBe('page')
    expect(one.classList.contains('underline')).toBe(true)
    expect(two.hasAttribute('aria-current')).toBe(false)
    expect(two.classList.contains('underline')).toBe(false)
    expect(
      c3(mobilePanel()).querySelector('.sr-only')?.textContent?.trim(),
    ).toBe('(opens in a new tab)')
    expect(two.querySelector('.sr-only')).toBeNull()
  })

  it('the mobile collapse toggle uses the shared focus ring', async () => {
    await mountA()
    const [toggle] = toggles()
    expect(toggle.classList.contains('focus-visible:mcl-focus-ring')).toBe(true)
    expect(toggle.classList.contains('outline-none')).toBe(false)
  })
})
