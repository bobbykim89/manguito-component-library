// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { renderOnServer } from '@mcl/test-utils/ssr'
import MclTabsA from './MclTabsA.vue'

const content = [
  { title: 'TAB-ONE', content: '<p>FIRST-CONTENT</p>' },
  { title: 'TAB-TWO', content: '<p>SECOND-CONTENT</p>' },
]
const render = () => h(MclTabsA, { tabName: 'demo', content })

describe('MclTabsA (server)', () => {
  it('renders on the server', async () => {
    const { html } = await renderOnServer(render)
    expect(html).toContain('TAB-ONE')
    expect(html).toContain('TAB-TWO')
  })

  it('the first tab content is in server html and not clamped', async () => {
    const { html } = await renderOnServer(render)
    expect(html).toContain('FIRST-CONTENT')
    expect(html).not.toContain('--container-hts:0px')
  })
})

describe('MclTabsA (server) accessibility (#132)', () => {
  it('tabs are server-rendered with tab semantics and aria-controls pointing at their panels', async () => {
    const { html } = await renderOnServer(render)
    const openTags = html.match(/<button[^>]*role="tab"[^>]*>/g) ?? []
    expect(openTags).toHaveLength(2)
    openTags.forEach((tag, i) => {
      expect(tag).toContain('type="button"')
      expect(tag).toContain(`aria-controls="demo-tab-${i}"`)
      expect(tag).toContain(`aria-selected="${i === 0}"`)
      expect(tag).toContain(`tabindex="${i === 0 ? 0 : -1}"`)
      expect(tag).not.toMatch(/\sdisabled/)
    })
    expect(html).not.toContain('<h3')
  })
})
