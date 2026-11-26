import { afterEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { hydrate } from '@mcl/test-utils/ssr'
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

describe('Card image alt and title heading (#128)', () => {
  const mountCard = (props: Record<string, unknown>) =>
    mount(Card, { props: { imageSrc: '/x.png', ...props } })

  it('img has alt="" by default', () => {
    const w = mountCard({})
    expect(w.find('img').attributes('alt')).toBe('')
    w.unmount()
  })

  it('title renders at titleLevel, h3 by default', () => {
    const a = mountCard({ title: 'T' })
    expect(a.find('h3').text()).toBe('T')
    const cls = a.find('h3').attributes('class')
    a.unmount()
    const b = mountCard({ title: 'T', titleLevel: 'h2' })
    expect(b.find('h2').text()).toBe('T')
    expect(b.find('h2').attributes('class')).toBe(cls)
    expect(b.find('h3').exists()).toBe(false)
    b.unmount()
  })

  it('no title renders no heading', () => {
    const w = mountCard({})
    expect(w.find('h1, h2, h3, h4').exists()).toBe(false)
    w.unmount()
  })
})
