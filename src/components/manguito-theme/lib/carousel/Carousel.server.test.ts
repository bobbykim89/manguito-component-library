// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { renderOnServer } from '@mcl/test-utils/ssr'
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

  it('server html carries the carousel roles, with no wrong slide totals (#128)', async () => {
    const { html } = await renderOnServer(() =>
      h(CarouselContainer, null, { content: slides }),
    )
    expect(html).toContain('role="region"')
    expect(html).toContain('aria-roledescription="carousel"')
    expect(html).toContain('aria-live="polite"')
    expect(html).toContain('role="group"')
    expect(html).toContain('aria-roledescription="slide"')
    expect(html).not.toContain('role="tabpanel"')
    // the total is known only once every slide has registered
    expect(html).not.toMatch(/aria-label="\d+ of \d+"/)
  })
})
