import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import { generateClass } from '@bobbykim/manguito-theme'
import { h, nextTick } from 'vue'
import { hydrate } from '@mcl/test-utils/ssr'
import MclTabsA from './MclTabsA.vue'

const settle = () => new Promise((r) => setTimeout(r, 50))
const content = [
  { title: 'TAB-ONE', content: '<p>FIRST-CONTENT</p>' },
  { title: 'TAB-TWO', content: '<p>SECOND-CONTENT</p>' },
]
const render = () => h(MclTabsA, { tabName: 'demo', content })
const panel = (i: number) =>
  document.getElementById(`demo-tab-${i}`) as HTMLElement

describe('MclTabsA (client)', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('hydrates with no warnings', async () => {
    const r = await hydrate(render)
    await settle()
    expect(r.warnings).toEqual([])
    r.unmount()
  })

  it('clicking the second tab after hydration shows its content', async () => {
    const r = await hydrate(render)
    expect(panel(0).style.display).not.toBe('none')
    const tabs = r.container.querySelectorAll<HTMLElement>('button[role="tab"]')
    tabs[1].click()
    await nextTick()
    await settle()
    expect(panel(1).style.display).not.toBe('none')
    expect(panel(0).style.display).toBe('none')
    r.unmount()
  })
})

describe('MclTabsA accessibility (#132)', () => {
  const content3 = [
    { title: 'TAB-ONE', content: '<p>FIRST-CONTENT</p>' },
    { title: 'TAB-TWO', content: '<p>SECOND-CONTENT</p>' },
    { title: 'TAB-THREE', content: '<p>THIRD-CONTENT</p>' },
  ]
  let wrapper: VueWrapper | undefined
  const tabs = (root: ParentNode = document) =>
    Array.from(root.querySelectorAll<HTMLElement>('[role="tab"]'))
  const shown = (i: number) => !!panel(i) && panel(i).style.display !== 'none'
  const press = async (key: string) => {
    ;(document.activeElement as HTMLElement).dispatchEvent(
      new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }),
    )
    await nextTick()
    await nextTick()
  }
  const mountTabs = (props: Record<string, unknown> = {}, items = content3) => {
    wrapper = mount(MclTabsA, {
      props: { tabName: 'demo', content: items, ...props },
      attachTo: document.body,
    })
    return wrapper
  }

  afterEach(() => {
    wrapper?.unmount()
    wrapper = undefined
    document.body.innerHTML = ''
  })

  it('each tab controls its panel and each panel is labelled by its tab', async () => {
    mountTabs()
    await nextTick()
    tabs().forEach((tab, i) => {
      expect(tab.getAttribute('aria-controls')).toBe(`demo-tab-${i}`)
    })
    expect(panel(0).getAttribute('aria-labelledby')).toBe(tabs()[0].id)
    expect(tabs()[0].id).not.toBe('')
  })

  it('the selected tab is not disabled and is the only Tab stop', async () => {
    mountTabs()
    await nextTick()
    const all = tabs()
    expect(all).toHaveLength(3)
    all.forEach((tab) => {
      expect(tab.hasAttribute('disabled')).toBe(false)
      expect(tab.getAttribute('type')).toBe('button')
    })
    expect(all.map((t) => t.getAttribute('tabindex'))).toEqual([
      '0',
      '-1',
      '-1',
    ])
  })

  it('clicking a tab selects it and leaves focus on it', async () => {
    mountTabs()
    await nextTick()
    const second = tabs()[1]
    second.focus()
    second.click()
    await nextTick()
    expect(second.getAttribute('aria-selected')).toBe('true')
    expect(document.activeElement).toBe(second)
    expect(shown(1)).toBe(true)
  })

  it('ArrowRight, ArrowLeft, Home and End move focus and selection', async () => {
    mountTabs()
    await nextTick()
    tabs()[0].focus()
    const expectAt = (i: number) => {
      const tab = tabs()[i]
      expect(document.activeElement).toBe(tab)
      expect(tab.getAttribute('aria-selected')).toBe('true')
      expect(shown(i)).toBe(true)
    }
    await press('ArrowRight')
    expectAt(1)
    await press('End')
    expectAt(2)
    await press('Home')
    expectAt(0)
    await press('ArrowLeft')
    expectAt(2)
  })

  it('tab-click fires on a click with the mouse event and the title', async () => {
    const onTabClick = vi.fn()
    mountTabs({ onTabClick })
    await nextTick()
    tabs()[1].click()
    await nextTick()
    expect(onTabClick).toHaveBeenCalledTimes(1)
    expect(onTabClick).toHaveBeenCalledWith(expect.any(MouseEvent), 'TAB-TWO')
  })

  it('tab-click fires on keyboard selection with the keyboard event and the new title', async () => {
    const onTabClick = vi.fn()
    mountTabs({ onTabClick })
    await nextTick()
    tabs()[0].focus()
    await press('ArrowRight')
    await press('ArrowRight')
    expect(onTabClick).toHaveBeenCalledTimes(2)
    expect(onTabClick.mock.calls[0][0]).toBeInstanceOf(KeyboardEvent)
    expect(onTabClick.mock.calls[0][1]).toBe('TAB-TWO')
    expect(onTabClick.mock.calls[1][0]).toBeInstanceOf(KeyboardEvent)
    expect(onTabClick.mock.calls[1][1]).toBe('TAB-THREE')
  })

  it('tab-click does not fire for the already-selected tab or for unhandled keys', async () => {
    const onTabClick = vi.fn()
    mountTabs({ onTabClick })
    await nextTick()
    const first = tabs()[0]
    first.focus()
    first.click()
    await nextTick()
    await press('Tab')
    await press('a')
    expect(onTabClick).not.toHaveBeenCalled()
    expect(document.activeElement).toBe(first)
    expect(shown(0)).toBe(true)
  })

  it('a single tab: arrows, Home and End do not throw and emit nothing', async () => {
    const onTabClick = vi.fn()
    mountTabs({ onTabClick }, [content3[0]])
    await nextTick()
    const only = tabs()[0]
    only.focus()
    for (const key of ['ArrowRight', 'ArrowLeft', 'Home', 'End']) {
      await press(key)
    }
    expect(onTabClick).not.toHaveBeenCalled()
    expect(document.activeElement).toBe(only)
    expect(only.getAttribute('aria-selected')).toBe('true')
  })

  it('a tab reached by an arrow key is scrolled clear of the scroll buttons', async () => {
    // scrollIntoView honours the strip's scroll-padding; focus() alone does not.
    const scrollIntoView = vi.fn()
    Element.prototype.scrollIntoView = scrollIntoView
    try {
      mountTabs()
      await nextTick()
      tabs()[0].focus()
      await press('ArrowRight')
      expect(scrollIntoView).toHaveBeenCalledWith({
        block: 'nearest',
        inline: 'nearest',
      })
      expect(scrollIntoView.mock.contexts.at(-1)).toBe(tabs()[1])
    } finally {
      delete (Element.prototype as Partial<Element>).scrollIntoView
    }
  })

  it('tab titles are spans with the h3 classes, not headings', async () => {
    mountTabs()
    await nextTick()
    expect(wrapper!.find('h3').exists()).toBe(false)
    const h3Classes = generateClass.h3Variant({ size: 'md' }).split(' ')
    tabs().forEach((tab) => {
      const title = tab.querySelector('span')!
      expect(title).not.toBeNull()
      h3Classes.forEach((c) => expect(title.classList).toContain(c))
    })
  })

  it('tabs use the shared focus ring instead of focus:outline-none', async () => {
    mountTabs()
    await nextTick()
    tabs().forEach((tab) => {
      expect(tab.classList).toContain('focus-visible:mcl-focus-ring')
      expect(tab.classList).not.toContain('focus:outline-none')
    })
  })
})

describe('MclTabsA scroll buttons (#132)', () => {
  let wrapper: VueWrapper | undefined
  let reduceMotion = false
  const originalMatchMedia = window.matchMedia

  const root = () => wrapper!.element as HTMLElement
  const strip = () => root().querySelector<HTMLElement>('.overflow-x-auto')!
  const scrollButtons = () =>
    Array.from(
      root().querySelectorAll<HTMLButtonElement>('button:not([role="tab"])'),
    )
  // Make the strip overflow in jsdom, then report a scroll so the buttons update.
  const overflow = async (scrollLeft: number) => {
    const el = strip()
    Object.defineProperty(el, 'scrollWidth', { value: 500, configurable: true })
    Object.defineProperty(el, 'clientWidth', { value: 100, configurable: true })
    Object.defineProperty(el, 'scrollLeft', {
      value: scrollLeft,
      configurable: true,
    })
    el.scrollBy = vi.fn()
    el.dispatchEvent(new Event('scroll'))
    await nextTick()
    return el
  }
  const mountTabs = () => {
    wrapper = mount(MclTabsA, {
      props: { tabName: 'demo', content },
      attachTo: document.body,
    })
  }

  beforeEach(() => {
    reduceMotion = false
    window.matchMedia = vi.fn((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)' && reduceMotion,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })) as unknown as typeof window.matchMedia
  })
  afterEach(() => {
    wrapper?.unmount()
    wrapper = undefined
    window.matchMedia = originalMatchMedia
    document.body.innerHTML = ''
  })

  it('scroll buttons are hidden from assistive tech and out of the Tab order', async () => {
    mountTabs()
    await overflow(50)
    const buttons = scrollButtons()
    expect(buttons).toHaveLength(2)
    buttons.forEach((b) => {
      expect(b.getAttribute('aria-hidden')).toBe('true')
      expect(b.getAttribute('tabindex')).toBe('-1')
      expect(b.hasAttribute('aria-label')).toBe(false)
      expect(b.getAttribute('type')).toBe('button')
    })
  })

  it('pressing a scroll button does not take focus', async () => {
    mountTabs()
    await overflow(0)
    const first = root().querySelector<HTMLElement>('[role="tab"]')!
    first.focus()
    const right = scrollButtons()[0]
    const down = new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    })
    right.dispatchEvent(down)
    expect(down.defaultPrevented).toBe(true)
    right.click()
    expect(document.activeElement).toBe(first)
  })

  it('scroll buttons are at least 24px wide', async () => {
    mountTabs()
    await overflow(50)
    scrollButtons().forEach((b) => {
      expect(b.classList).toContain('min-w-[24px]')
    })
  })

  it("the strip reserves the scroll buttons' width when scrolling a tab into view", () => {
    mountTabs()
    expect(strip().classList).toContain('scroll-px-6')
    expect(strip().classList).toContain('lg:scroll-px-0')
  })

  it('scroll buttons scroll smoothly, or instantly with reduced motion', async () => {
    for (const reduce of [false, true]) {
      reduceMotion = reduce
      mountTabs()
      const el = await overflow(50)
      const [left, right] = scrollButtons()
      const behavior = reduce ? 'auto' : 'smooth'
      right.click()
      expect(el.scrollBy).toHaveBeenLastCalledWith({ left: 100, behavior })
      left.click()
      expect(el.scrollBy).toHaveBeenLastCalledWith({ left: -100, behavior })
      wrapper!.unmount()
      wrapper = undefined
    }
  })
})
