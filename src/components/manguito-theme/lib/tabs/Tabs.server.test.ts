// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { renderOnServer } from '../__tests__/ssr'
import TabContainer from './TabContainer.vue'
import TabContent from './TabContent.vue'

const render = () =>
  h(TabContainer, null, {
    'tab-button': ({ update }: { update: (n: number) => void }) => [
      h('button', { onClick: () => update(0) }, 'one'),
      h('button', { onClick: () => update(1) }, 'two'),
    ],
    'tab-content': () => [
      h(TabContent, { tabNumber: 0, id: 't0' }, () => 'A'),
      h(TabContent, { tabNumber: 1, id: 't1' }, () => 'B'),
    ],
  })

describe('Tabs (server)', () => {
  it('active tab content is in server html and not clamped', async () => {
    const { html } = await renderOnServer(render)
    expect(html).toContain('A')
    expect(html).toContain('role="tablist"')
    expect(html).not.toContain('--container-hts:0px')
  })
})
