import { mount, type VueWrapper } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { h, nextTick } from 'vue'
import type { MclCarouselASlotProps } from './index.types'
import MclCarouselA from './MclCarouselA.vue'

// #122: the arrows use the shared two-tone keyboard focus ring, not a ring in
// the button colour (a light-4 ring was 1.37:1 on a light-2 card).
describe('MclCarouselA — navigation focus', () => {
  it('gives both navigation buttons the shared keyboard focus ring', () => {
    const wrapper = mount(MclCarouselA, {
      props: { title: 'Fruit', content: [1, 2, 3] },
    })
    for (const label of ['Previous cards', 'Next cards']) {
      const button = wrapper.find(`button[aria-label="${label}"]`)
      expect(button.exists()).toBe(true)
      expect(button.classes()).toContain('focus-visible:mcl-focus-ring')
      expect(button.classes().join(' ')).not.toMatch(
        /focus:ring-4|focus:outline-none|ring-offset|ring-light-4/,
      )
    }
  })
})

// #133. Layout in jsdom: 8 cards, 100px wide with a 10px gap, the first card's
// untransformed left edge at x = 0 and a clipping section from 0 to `view` px.
// The first card's rect follows the row's inline transform.
describe('MclCarouselA accessibility (#133)', () => {
  const CARD = 100
  const GAP = 10
  let wrapper: VueWrapper | undefined
  let observerCallback: IntersectionObserverCallback | undefined

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

  const mountCarousel = (props: Record<string, unknown> = {}) => {
    wrapper = mount(MclCarouselA, {
      props: { title: 'Fruit', content: [1, 2, 3, 4, 5, 6, 7, 8], ...props },
      attachTo: document.body,
      slots: {
        carousel: ({ cards, slideAttrs }: MclCarouselASlotProps) =>
          cards.map((_, i) =>
            h('div', { key: i, class: 'card', ...slideAttrs(i) }, [
              h('a', { href: '#' }, `Card ${i + 1}`),
            ]),
          ),
      },
    })
    return wrapper
  }
  const button = (name: string) =>
    document.querySelector<HTMLButtonElement>(`button[aria-label="${name}"]`)!
  const row = () =>
    document.getElementById(
      button('Next cards').getAttribute('aria-controls')!,
    )!
  const section = () => document.querySelector('section')!
  const cardLink = (n: number) => row().children[n - 1].querySelector('a')!
  const status = () =>
    document.querySelector('[aria-live="polite"][aria-atomic="true"]')!
  const layout = (view = 250) => {
    const r = row()
    Array.from(r.children as HTMLCollectionOf<HTMLElement>).forEach(
      (card, i) => {
        Object.defineProperty(card, 'offsetLeft', {
          value: i * (CARD + GAP),
          configurable: true,
        })
        Object.defineProperty(card, 'offsetWidth', {
          value: CARD,
          configurable: true,
        })
        card.getBoundingClientRect = () => {
          const left = i * (CARD + GAP) + translateOf(r)
          return rect(left, left + CARD)
        }
      },
    )
    section().getBoundingClientRect = () => rect(0, view)
  }

  beforeEach(() => {
    observerCallback = undefined
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
    vi.unstubAllGlobals()
    document.body.innerHTML = ''
  })

  it('nav buttons are named, typed and control the row', () => {
    mountCarousel()
    for (const name of ['Previous cards', 'Next cards']) {
      const b = button(name)
      expect(b.getAttribute('type')).toBe('button')
      expect(b.getAttribute('aria-controls')).toBe(row().id)
      expect(row().id).not.toBe('')
    }
  })

  it('an aria-disabled button ignores activation and keeps focus', async () => {
    const w = mountCarousel()
    const prev = button('Previous cards')
    expect(prev.getAttribute('aria-disabled')).toBe('true')
    expect(prev.hasAttribute('disabled')).toBe(false)
    prev.focus()
    prev.click()
    await nextTick()
    expect(w.emitted('btn-prev')).toBeUndefined()
    expect(row().style.transform).toBe('')
    expect(document.activeElement).toBe(prev)
  })

  it('Next at the end stays focused and becomes aria-disabled', async () => {
    const w = mountCarousel()
    layout(300)
    await nextTick() // the last-card observer is created after mount
    const next = button('Next cards')
    next.focus()
    for (let i = 0; i < 5; i++) next.click()
    // the observer sees the last card 80% in view: Next stops here
    observerCallback!(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    )
    await nextTick()
    expect(next.getAttribute('aria-disabled')).toBe('true')
    expect(next.hasAttribute('disabled')).toBe(false)
    expect(document.activeElement).toBe(next)
    const moves = w.emitted('btn-next')!.length
    const transform = row().style.transform
    next.click()
    await nextTick()
    expect(w.emitted('btn-next')!.length).toBe(moves)
    expect(row().style.transform).toBe(transform)
  })

  it('nav buttons dim with aria-disabled:opacity-50, not disabled:opacity-50', () => {
    mountCarousel()
    for (const name of ['Previous cards', 'Next cards']) {
      expect(button(name).classList).toContain('aria-disabled:opacity-50')
      expect(button(name).classList).not.toContain('disabled:opacity-50')
    }
  })

  it('slideAttrs labels each slide n of total', () => {
    mountCarousel()
    Array.from(row().children).forEach((card, i) => {
      expect(card.getAttribute('role')).toBe('group')
      expect(card.getAttribute('aria-roledescription')).toBe('slide')
      expect(card.getAttribute('aria-label')).toBe(`${i + 1} of 8`)
    })
  })

  it('the status message is empty on load and names the cards in view after a button move', async () => {
    mountCarousel()
    layout()
    expect(status().classList).toContain('sr-only')
    expect(status().textContent).toBe('')
    button('Next cards').click()
    await nextTick()
    expect(status().textContent).toBe('Cards 2 to 3 of 8')
  })

  it('the status message uses the singular when one card is fully in view', async () => {
    mountCarousel()
    layout(150)
    button('Next cards').click()
    await nextTick()
    expect(status().textContent).toBe('Card 2 of 8')
  })

  it('keyboard focus on a card out of view slides it into view without emitting', async () => {
    const w = mountCarousel()
    layout()
    cardLink(5).focus()
    await nextTick()
    expect(row().style.transform).toBe('translateX(-330px)')
    expect(w.emitted('btn-next')).toBeUndefined()
    expect(w.emitted('btn-prev')).toBeUndefined()
    expect(status().textContent).toBe('')
  })

  it('pointer focus does not slide the carousel', async () => {
    mountCarousel()
    layout()
    const link = cardLink(3)
    link.dispatchEvent(new Event('pointerdown', { bubbles: true }))
    link.focus()
    await nextTick()
    expect(row().style.transform).toBe('')
  })

  it('the clipping section is never left scrolled', async () => {
    mountCarousel()
    let scrollLeft = 0
    Object.defineProperty(section(), 'scrollLeft', {
      get: () => scrollLeft,
      set: (v: number) => {
        scrollLeft = v
      },
      configurable: true,
    })
    section().scrollLeft = 40
    section().dispatchEvent(new Event('scroll'))
    await nextTick()
    expect(section().scrollLeft).toBe(0)
  })

  it('the row skips its slide animation under reduced motion', () => {
    mountCarousel()
    expect(row().classList).toContain('motion-reduce:transition-none')
  })
})
