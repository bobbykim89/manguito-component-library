import { mount, type VueWrapper } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import {
  useCarouselSlide,
  type UseCarouselSlideReturn,
} from './useCarouselSlide'

// Layout used by every test: 8 cards, 100px wide with a 10px gap, the first
// card's untransformed left edge at x = 0, and a clipping section from 0 to
// `view` px. The first card's rect follows the row's inline transform.
const CARD = 100
const GAP = 10
const translateOf = (row: HTMLElement): number => {
  const m = /translateX\((-?[\d.]+)px\)/.exec(row.style.transform)
  return m ? Number(m[1]) : 0
}
const rect = (left: number, right: number) =>
  ({
    left,
    right,
    width: right - left,
    top: 0,
    bottom: 0,
    height: 0,
    x: left,
    y: 0,
  }) as DOMRect

let api: UseCarouselSlideReturn
let wrapper: VueWrapper | undefined
let transitionDuration = ''
let transitionProperty = 'all'
let sectionScroll = 0
let observerCallback: IntersectionObserverCallback | undefined

const Harness = defineComponent({
  setup() {
    const section = ref<HTMLElement | null>(null)
    const row = ref<HTMLElement | null>(null)
    api = useCarouselSlide(row, section)
    return () =>
      h('section', { ref: section }, [
        h(
          'div',
          { ref: row },
          Array.from({ length: 8 }, (_, i) =>
            h('div', { key: i, class: 'card' }),
          ),
        ),
      ])
  },
})

const mountWithLayout = async (view = 250) => {
  wrapper = mount(Harness, { attachTo: document.body })
  const section = wrapper.element as HTMLElement
  const row = section.firstElementChild as HTMLElement
  const cards = Array.from(row.children) as HTMLElement[]
  cards.forEach((card, i) => {
    Object.defineProperty(card, 'offsetLeft', {
      value: i * (CARD + GAP),
      configurable: true,
    })
    Object.defineProperty(card, 'offsetWidth', {
      value: CARD,
      configurable: true,
    })
    card.getBoundingClientRect = () => {
      // the browser may scroll the clipping section, which shifts every card
      const left = i * (CARD + GAP) + translateOf(row) - sectionScroll
      return rect(left, left + CARD)
    }
  })
  section.getBoundingClientRect = () => rect(0, view)
  Object.defineProperty(section, 'scrollLeft', {
    get: () => sectionScroll,
    configurable: true,
  })
  await nextTick()
  return { section, row }
}

describe('useCarouselSlide (#133)', () => {
  const originalGetComputedStyle = window.getComputedStyle
  beforeEach(() => {
    transitionDuration = ''
    transitionProperty = 'all'
    sectionScroll = 0
    observerCallback = undefined
    window.getComputedStyle = ((el: Element) => {
      const real = originalGetComputedStyle(el)
      return new Proxy(real, {
        get(target, prop) {
          if (prop === 'transitionDuration') return transitionDuration
          if (prop === 'transitionProperty') return transitionProperty
          if (prop === 'transform')
            return (el as HTMLElement).style.transform || 'none'
          const value = Reflect.get(target, prop)
          return typeof value === 'function' ? value.bind(target) : value
        },
      })
    }) as typeof window.getComputedStyle
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(cb: IntersectionObserverCallback) {
          observerCallback = cb
        }
        observe() {}
        unobserve() {}
        disconnect() {}
        takeRecords() {
          return []
        }
      },
    )
  })
  afterEach(() => {
    wrapper?.unmount()
    wrapper = undefined
    window.getComputedStyle = originalGetComputedStyle
    vi.unstubAllGlobals()
    document.body.innerHTML = ''
  })

  it('moves on every press when the row has no transition (reduced motion)', async () => {
    await mountWithLayout()
    expect(api.goTo('next')).toBe(true)
    expect(api.goTo('next')).toBe(true)
    expect(api.goTo('next')).toBe(true)
    expect(api.currentIndex.value).toBe(3)
  })

  it('still ignores a press while a transition is running', async () => {
    const { row } = await mountWithLayout()
    transitionDuration = '0.5s'
    expect(api.goTo('next')).toBe(true)
    expect(api.goTo('next')).toBe(false)
    row.dispatchEvent(new Event('transitionend'))
    expect(api.goTo('next')).toBe(true)
  })

  it('reveal moves the fewest card-aligned steps and ignores the guard', async () => {
    const { row } = await mountWithLayout()
    transitionDuration = '0.5s'
    api.goTo('next')
    expect(api.reveal(4)).toBe(true)
    expect(api.currentIndex.value).toBe(3)
    expect(row.style.transform).toBe('translateX(-330px)')
  })

  it('reveal of a card already fully in view does nothing', async () => {
    const { row } = await mountWithLayout()
    expect(api.reveal(1)).toBe(false)
    expect(api.currentIndex.value).toBe(0)
    expect(row.style.transform).toBe('')
  })

  it('reveal past where Next stops keeps Next disabled', async () => {
    await mountWithLayout(300)
    for (let i = 0; i < 5; i++) api.goTo('next')
    expect(api.currentIndex.value).toBe(5)
    // the observer sees the last card 80% in view: Next stops here
    observerCallback!(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    )
    expect(api.isNextDisabled.value).toBe(true)
    expect(api.reveal(7)).toBe(true)
    expect(api.currentIndex.value).toBe(6)
    expect(api.isNextDisabled.value).toBe(true)
  })

  it('moves on every press when transition-property is none (motion-reduce:transition-none)', async () => {
    await mountWithLayout()
    // Tailwind's motion-reduce:transition-none keeps duration-500's 0.5s
    transitionProperty = 'none'
    transitionDuration = '0.5s'
    expect(api.goTo('next')).toBe(true)
    expect(api.goTo('next')).toBe(true)
    expect(api.goTo('next')).toBe(true)
    expect(api.currentIndex.value).toBe(3)
  })

  it('reveal measures correctly while the browser has scrolled the section', async () => {
    await mountWithLayout()
    // Chromium scrolls the overflow-hidden section to the focused card
    // before focusin fires
    sectionScroll = 500
    expect(api.reveal(7)).toBe(true)
    expect(api.currentIndex.value).toBe(6)
  })

  it('Next stays disabled when Prev returns to where Next stopped after a follow move', async () => {
    await mountWithLayout(300)
    for (let i = 0; i < 5; i++) api.goTo('next')
    observerCallback!(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    )
    api.reveal(7)
    expect(api.currentIndex.value).toBe(6)
    // the last card never drops below 75% in view, so the observer stays quiet
    api.goTo('prev')
    expect(api.currentIndex.value).toBe(5)
    expect(api.isNextDisabled.value).toBe(true)
  })

  it('visibleRange reports the cards fully in view at the current index', async () => {
    await mountWithLayout()
    expect(api.visibleRange()).toEqual({ first: 0, last: 1 })
    api.goTo('next')
    expect(api.visibleRange()).toEqual({ first: 1, last: 2 })
  })
})
