// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { renderOnServer } from '@mcl/ssr-test-utils'
import MclDropdownA from './MclDropdownA.vue'

const render = () =>
  h(MclDropdownA, {
    title: 'DROPDOWN-TITLE',
    dropdownItems: [{ title: 'Item One' }, { title: 'Item Two' }],
  })

describe('MclDropdownA (server)', () => {
  it('renders on the server', async () => {
    const { html } = await renderOnServer(render)
    expect(html).toContain('DROPDOWN-TITLE')
  })
})
