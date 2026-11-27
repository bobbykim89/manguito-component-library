// @vitest-environment node
import { renderOnServer } from '@mcl/test-utils/ssr'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import MclCarouselA from './MclCarouselA.vue'

const render =
  (props: Record<string, unknown> = {}) =>
  () =>
    h(MclCarouselA, { title: 'Fruit', content: [1, 2, 3], ...props })

describe('MclCarouselA (server) accessibility (#133)', () => {
  it('server html carries the carousel semantics', async () => {
    const { html } = await renderOnServer(render())
    const section = /<section[^>]*>/.exec(html)![0]
    expect(section).toContain('aria-roledescription="carousel"')
    const labelledBy = /aria-labelledby="([^"]+)"/.exec(section)![1]
    expect(html).toMatch(new RegExp(`<h2[^>]*id="${labelledBy}"`))
    expect(html).toContain('Fruit')

    const rowId =
      /<div[^>]*id="([^"]+)"[^>]*class="[^"]*transition-transform/.exec(
        html,
      )?.[1]
    expect(rowId).toBeTruthy()
    const buttons = html.match(/<button[^>]*>/g) ?? []
    expect(buttons).toHaveLength(2)
    const [prev, next] = buttons
    for (const b of buttons) {
      expect(b).toContain('type="button"')
      expect(b).toContain(`aria-controls="${rowId}"`)
      expect(b).not.toMatch(/\sdisabled/)
    }
    expect(prev).toContain('aria-label="Previous cards"')
    expect(prev).toContain('aria-disabled="true"')
    expect(next).toContain('aria-label="Next cards"')
    expect(next).toContain('aria-disabled="false"')
  })

  it('titleLevel renders that heading', async () => {
    const { html } = await renderOnServer(render({ titleLevel: 'h3' }))
    expect(html).toContain('<h3')
    expect(html).not.toContain('<h2')
  })
})
