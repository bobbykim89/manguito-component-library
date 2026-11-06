// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { renderOnServer } from '@mcl/ssr-test-utils'
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
