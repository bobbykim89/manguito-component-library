// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { renderOnServer } from '@mcl/ssr-test-utils'
import MclCollapseB from './MclCollapseB.vue'

const render = () =>
  h(
    MclCollapseB,
    { collapseId: 'c1', title: 'TITLE-TEXT' },
    { default: () => h('span', 'BODY-TEXT') },
  )

describe('MclCollapseB (server)', () => {
  it('renders on the server', async () => {
    const { html } = await renderOnServer(render)
    expect(html).toContain('TITLE-TEXT')
  })

  it('a closed panel content is in server html', async () => {
    const { html } = await renderOnServer(render)
    expect(html).toContain('BODY-TEXT')
  })
})
