import { afterEach, describe, expect, it } from 'vitest'
import { h } from 'vue'
import { hydrate } from '@mcl/ssr-test-utils'
import MclDropdownA from './MclDropdownA.vue'

const render = () =>
  h(MclDropdownA, {
    title: 'DROPDOWN-TITLE',
    dropdownItems: [{ title: 'Item One' }, { title: 'Item Two' }],
  })

describe('MclDropdownA (client)', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('hydrates with no warnings', async () => {
    const r = await hydrate(render)
    expect(r.warnings).toEqual([])
    r.unmount()
  })
})
