// @vitest-environment node
import { h, Teleport } from 'vue'
import { describe, expect, it } from 'vitest'
import { renderOnServer } from './ssr'

describe('renderOnServer harness', () => {
  it('runs without a DOM', () => {
    expect(typeof document).toBe('undefined')
  })
  it('returns html and teleport buffers', async () => {
    const { html, teleports } = await renderOnServer(() =>
      h('div', [h(Teleport, { to: 'body' }, [h('p', 'tp')])]),
    )
    expect(html).toContain('<div')
    expect(teleports.body).toContain('tp')
  })
})
