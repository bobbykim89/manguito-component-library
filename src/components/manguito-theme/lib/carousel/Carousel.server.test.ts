// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { renderOnServer } from '../__tests__/ssr'
import CarouselContainer from './CarouselContainer.vue'
import CarouselContent from './CarouselContent.vue'

const slides = () =>
  [0, 1, 2].map((n) =>
    h(CarouselContent, { slideNumber: n, id: `s${n}` }, () => `SLIDE ${n}`),
  )

describe('Carousel (server)', () => {
  it('renders slides and controller slots', async () => {
    const { html } = await renderOnServer(() =>
      h(CarouselContainer, null, {
        content: slides,
        'controller-bottom': () => h('span', 'CONTROLS'),
      }),
    )
    expect(html).toContain('SLIDE 0')
    expect(html).toContain('CONTROLS')
    expect(html).toContain('id="s0"')
  })
})
