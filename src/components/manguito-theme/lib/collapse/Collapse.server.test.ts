// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { renderOnServer } from '../__tests__/ssr'
import AccordionGroup from './AccordionGroup.vue'
import Collapse from './Collapse.vue'

const slots = { default: () => 'BODY' }

describe('Collapse (server)', () => {
  it('open collapse puts its content in server html', async () => {
    const { html } = await renderOnServer(() =>
      h(Collapse, { visible: true }, slots),
    )
    expect(html).toContain('BODY')
    expect(html).not.toContain('display:none')
  })

  it('closed collapse puts its content in server html, hidden', async () => {
    const { html } = await renderOnServer(() => h(Collapse, null, slots))
    expect(html).toContain('BODY')
    expect(html).toContain('display:none')
  })

  it('AccordionGroup renders all panel contents', async () => {
    const { html } = await renderOnServer(() =>
      h(AccordionGroup, null, {
        default: () => [
          h(Collapse, { id: 'a' }, { default: () => 'ONE' }),
          h(Collapse, { id: 'b' }, { default: () => 'TWO' }),
          h(Collapse, { id: 'c' }, { default: () => 'THREE' }),
        ],
      }),
    )
    for (const t of ['ONE', 'TWO', 'THREE']) expect(html).toContain(t)
  })
})
