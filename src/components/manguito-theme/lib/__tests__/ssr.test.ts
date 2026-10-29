import { h, inject, Teleport } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import { hydrate } from './ssr'

describe('hydrate harness', () => {
  it('reports no warnings for markup that matches', async () => {
    const r = await hydrate(() => h('div', [h('p', 'same')]))
    expect(r.warnings).toEqual([])
    r.unmount()
  })
  it('reports a warning when server and client markup differ', async () => {
    let n = 0
    const r = await hydrate(() => h('p', String(n++))) // server "0", client "1"
    expect(r.warnings.length).toBeGreaterThan(0)
    r.unmount()
  })
  it('places body teleports so a teleported subtree hydrates cleanly', async () => {
    const r = await hydrate(() =>
      h('div', [h(Teleport, { to: 'body' }, [h('p', 'tp')])]),
    )
    expect(r.warnings).toEqual([])
    r.unmount()
  })
  it('forwards non-hydration warnings to console instead of dropping them', async () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    try {
      const Comp = {
        setup() {
          inject('missing-key')
          return () => h('p', 'x')
        },
      }
      const r = await hydrate(() => h(Comp))
      expect(r.warnings).toEqual([])
      const forwarded = spy.mock.calls.filter((c) =>
        String(c[0]).includes('missing-key'),
      )
      // once from the server render, once from the client mount
      expect(forwarded.length).toBeGreaterThanOrEqual(2)
      r.unmount()
    } finally {
      spy.mockRestore()
    }
  })
})
