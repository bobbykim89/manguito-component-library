import { afterEach, describe, expect, it } from 'vitest'
import { h } from 'vue'
import { hydrate } from '../__tests__/ssr'
import Card from './Card.vue'

describe('Card (client)', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('hydrates with no warnings and renders title and body', async () => {
    const r = await hydrate(() =>
      h(
        Card,
        { title: 'CARD TITLE', header: 'HEAD', footer: 'FOOT' },
        { body: () => 'BODY TEXT' },
      ),
    )
    expect(r.warnings).toEqual([])
    expect(r.container.querySelector('h3')!.textContent).toBe('CARD TITLE')
    expect(r.container.textContent).toContain('BODY TEXT')
    r.unmount()
  })

  it('renders the default slot with noBody', async () => {
    const r = await hydrate(() =>
      h(Card, { noBody: true }, { default: () => 'DEFAULT TEXT' }),
    )
    expect(r.warnings).toEqual([])
    expect(r.container.textContent).toContain('DEFAULT TEXT')
    r.unmount()
  })
})
