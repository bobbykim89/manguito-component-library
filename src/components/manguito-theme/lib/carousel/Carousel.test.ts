import { afterEach, describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import { hydrate } from '@mcl/test-utils/ssr'
import CarouselContainer from './CarouselContainer.vue'
import CarouselContent from './CarouselContent.vue'

const settle = () => new Promise((r) => setTimeout(r, 50))
const slides = () =>
  [0, 1, 2].map((n) =>
    h(CarouselContent, { slideNumber: n, id: `s${n}` }, () => `SLIDE ${n}`),
  )
const visible = (root: ParentNode) =>
  Array.from(
    root.querySelectorAll<HTMLElement>('[aria-roledescription="slide"]'),
  )
    .filter((el) => el.style.display !== 'none')
    .map((el) => el.id)

const render = (props: Record<string, unknown> = {}) => {
  let controls!: { next: () => void; prev: () => void; activeSlide: number }
  const fn = () =>
    h(CarouselContainer, props, {
      content: slides,
      'controller-bottom': (p: typeof controls) => {
        controls = p
        return h('span', `ACTIVE ${p.activeSlide}`)
      },
    })
  return { fn, controls: () => controls }
}

describe('Carousel (client)', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('hydrates with no warnings', async () => {
    const { fn } = render()
    const r = await hydrate(fn)
    await settle()
    expect(r.warnings).toEqual([])
    expect(visible(r.container)).toEqual(['s0'])
    r.unmount()
  })

  it('next() activates slide 1', async () => {
    const { fn, controls } = render()
    const r = await hydrate(fn)
    controls().next()
    await nextTick()
    await settle()
    expect(r.container.textContent).toContain('ACTIVE 1')
    expect(visible(r.container)).toContain('s1')
    r.unmount()
  })

  it('loop wraps from the last slide to 0', async () => {
    const { fn, controls } = render({ loop: true })
    const r = await hydrate(fn)
    for (let i = 0; i < 3; i++) {
      controls().next()
      await nextTick()
    }
    await settle()
    expect(r.container.textContent).toContain('ACTIVE 0')
    r.unmount()
  })
})

describe('Carousel semantics (#128)', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('container is a labelled carousel region', async () => {
    const a = render()
    const r = await hydrate(a.fn)
    const region = r.container.querySelector('[role="region"]')!
    expect(region.getAttribute('aria-roledescription')).toBe('carousel')
    expect(region.getAttribute('aria-label')).toBe('Carousel')
    r.unmount()
    const b = render({ ariaLabel: 'Featured' })
    const r2 = await hydrate(b.fn)
    expect(
      r2.container.querySelector('[role="region"]')!.getAttribute('aria-label'),
    ).toBe('Featured')
    r2.unmount()
  })

  it('slides are groups labelled n of m', async () => {
    const r = await hydrate(render().fn)
    await nextTick()
    const groups = Array.from(r.container.querySelectorAll('[id^="s"]'))
    expect(groups.map((g) => g.getAttribute('aria-label'))).toEqual([
      '1 of 3',
      '2 of 3',
      '3 of 3',
    ])
    for (const g of groups) {
      expect(g.getAttribute('role')).toBe('group')
      expect(g.getAttribute('aria-roledescription')).toBe('slide')
      expect(g.getAttribute('tabindex')).toBe('-1')
    }
    expect(r.container.querySelector('[role="tabpanel"]')).toBeNull()
    r.unmount()
  })

  it('live region wraps the keyed slide and survives a slide change', async () => {
    const a = render()
    const r = await hydrate(a.fn)
    const live = r.container.querySelector('[aria-live="polite"]')
    expect(live).not.toBeNull()
    expect(live!.querySelector('#s0')).not.toBeNull()
    a.controls().next()
    await nextTick()
    await settle()
    expect(r.container.querySelector('[aria-live="polite"]')).toBe(live)
    r.unmount()
  })
})
