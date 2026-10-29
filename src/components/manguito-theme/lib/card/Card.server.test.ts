// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { renderOnServer } from '../__tests__/ssr'
import Card from './Card.vue'

describe('Card (server)', () => {
  it('renders title and body slot', async () => {
    const { html } = await renderOnServer(() =>
      h(Card, { title: 'CARD TITLE' }, { body: () => 'BODY TEXT' }),
    )
    expect(html).toContain('CARD TITLE')
    expect(html).toContain('BODY TEXT')
  })

  it('renders default slot with noBody', async () => {
    const { html } = await renderOnServer(() =>
      h(Card, { noBody: true }, { default: () => 'DEFAULT TEXT' }),
    )
    expect(html).toContain('DEFAULT TEXT')
  })
})
