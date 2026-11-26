// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { renderOnServer } from '@mcl/test-utils/ssr'
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

const renderBound = () =>
  h(TabContainer, null, {
    'tab-button': ({
      tabAttrs,
    }: {
      tabAttrs: (n: number) => Record<string, unknown>
    }) => [0, 1].map((i) => h('button', tabAttrs(i), `tab ${i}`)),
    'tab-content': () => [
      h(TabContent, { tabNumber: 0, id: 't0' }, () => 'A'),
      h(TabContent, { tabNumber: 1, id: 't1' }, () => 'B'),
    ],
  })

describe('Tabs (server)', () => {
  it('server html carries the tab and panel wiring (#128)', async () => {
    const { html } = await renderOnServer(renderBound)
    expect(html).toContain('role="tab"')
    expect(html).toContain('aria-selected="true"')
    const tabId = html.match(/role="tab"[^>]*\sid="([^"]+)"|id="([^"]+)"[^>]*role="tab"/)
    const id = tabId?.[1] ?? tabId?.[2]
    expect(id).toBeTruthy()
    expect(html).toContain(`aria-labelledby="${id}"`)
  })

  it('active tab content is in server html and not clamped', async () => {
    const { html } = await renderOnServer(render)
    expect(html).toContain('A')
    expect(html).toContain('role="tablist"')
    expect(html).not.toContain('--container-hts:0px')
  })
})
