import { afterEach, describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import { hydrate } from '../__tests__/ssr'
import CarouselContainer from './CarouselContainer.vue'
import CarouselContent from './CarouselContent.vue'

const settle = () => new Promise((r) => setTimeout(r, 50))
const slides = () =>
  [0, 1, 2].map((n) =>
    h(CarouselContent, { slideNumber: n, id: `s${n}` }, () => `SLIDE ${n}`),
  )
const visible = (root: ParentNode) =>
  Array.from(root.querySelectorAll<HTMLElement>('[role="tabpanel"]'))
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
