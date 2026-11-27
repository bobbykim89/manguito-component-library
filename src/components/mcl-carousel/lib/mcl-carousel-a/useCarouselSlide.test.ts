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
      const left = i * (CARD + GAP) + translateOf(row)
      return rect(left, left + CARD)
    }
  })
  section.getBoundingClientRect = () => rect(0, view)
  await nextTick()
  return { section, row }
}

describe('useCarouselSlide (#133)', () => {
  const originalGetComputedStyle = window.getComputedStyle
  beforeEach(() => {
    transitionDuration = ''
    observerCallback = undefined
    window.getComputedStyle = ((el: Element) => {
      const real = originalGetComputedStyle(el)
      return new Proxy(real, {
        get(target, prop) {
          if (prop === 'transitionDuration') return transitionDuration
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

  it('visibleRange reports the cards fully in view at the current index', async () => {
    await mountWithLayout()
    expect(api.visibleRange()).toEqual({ first: 0, last: 1 })
    api.goTo('next')
    expect(api.visibleRange()).toEqual({ first: 1, last: 2 })
  })
})
