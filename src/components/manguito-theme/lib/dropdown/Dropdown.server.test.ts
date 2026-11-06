// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { renderOnServer } from '../__tests__/ssr'
import DropdownContainer from './DropdownContainer.vue'
import DropdownContent from './DropdownContent.vue'

describe('Dropdown (server)', () => {
  it('renders the toggler and keeps content closed', async () => {
    const { html } = await renderOnServer(() =>
      h(DropdownContainer, null, {
        toggler: () => h('button', 'TOGGLER'),
        default: () =>
          h(DropdownContent, null, { default: () => 'MENU ITEMS' }),
      }),
    )
    expect(html).toContain('TOGGLER')
    expect(html).not.toContain('MENU ITEMS')
  })
})
