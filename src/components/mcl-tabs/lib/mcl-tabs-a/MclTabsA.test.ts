import { afterEach, describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import { hydrate } from '@mcl/ssr-test-utils'
import MclTabsA from './MclTabsA.vue'

const settle = () => new Promise((r) => setTimeout(r, 50))
const content = [
  { title: 'TAB-ONE', content: '<p>FIRST-CONTENT</p>' },
  { title: 'TAB-TWO', content: '<p>SECOND-CONTENT</p>' },
]
const render = () => h(MclTabsA, { tabName: 'demo', content })
const panel = (i: number) =>
  document.getElementById(`demo-tab-${i}`) as HTMLElement

describe('MclTabsA (client)', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('hydrates with no warnings', async () => {
    const r = await hydrate(render)
    await settle()
    expect(r.warnings).toEqual([])
    r.unmount()
  })

  it('clicking the second tab after hydration shows its content', async () => {
    const r = await hydrate(render)
    expect(panel(0).style.display).not.toBe('none')
    const tabs = r.container.querySelectorAll<HTMLElement>('button[role="tab"]')
    tabs[1].click()
    await nextTick()
    await settle()
    expect(panel(1).style.display).not.toBe('none')
    expect(panel(0).style.display).toBe('none')
    r.unmount()
  })
})
