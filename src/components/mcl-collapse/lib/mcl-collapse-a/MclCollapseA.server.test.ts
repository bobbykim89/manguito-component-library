// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { renderOnServer } from '@mcl/ssr-test-utils'
import MclCollapseA from './MclCollapseA.vue'

const render = () =>
  h(
    MclCollapseA,
    { collapseId: 'c1', title: 'TITLE-TEXT' },
    { content: () => h('span', 'BODY-TEXT') },
  )

describe('MclCollapseA (server)', () => {
  it('renders on the server', async () => {
    const { html } = await renderOnServer(render)
    expect(html).toContain('TITLE-TEXT')
  })

  it('a closed panel content is in server html', async () => {
    const { html } = await renderOnServer(render)
    expect(html).toContain('BODY-TEXT')
  })
})
