import { afterEach, describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import { hydrate } from '@mcl/ssr-test-utils'
import MclCollapseA from './MclCollapseA.vue'

const settle = () => new Promise((r) => setTimeout(r, 50))
const render = () =>
  h(
    MclCollapseA,
    { collapseId: 'c1', title: 'TITLE-TEXT' },
    { content: () => h('span', 'BODY-TEXT') },
  )
const panel = () =>
  document.getElementById('c1')!.firstElementChild as HTMLElement

describe('MclCollapseA (client)', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('hydrates with no warnings', async () => {
    const r = await hydrate(render)
    expect(r.warnings).toEqual([])
    r.unmount()
  })

  it('toggling after hydration opens a closed panel', async () => {
    const r = await hydrate(render)
    expect(panel().style.display).toBe('none')
    ;(document.getElementById('c1-trigger') as HTMLElement).click()
    await nextTick()
    await settle()
    expect(panel().style.display).not.toBe('none')
    expect(
      document.getElementById('c1-trigger')!.getAttribute('aria-expanded'),
    ).toBe('true')
    r.unmount()
  })
})
