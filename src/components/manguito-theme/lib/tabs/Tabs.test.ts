import { afterEach, describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import { hydrate } from '../__tests__/ssr'
import TabContainer from './TabContainer.vue'
import TabContent from './TabContent.vue'

const render = () =>
  h(TabContainer, null, {
    'tab-button': ({ update }: { update: (n: number) => void }) => [
      h('button', { class: 'b0', onClick: () => update(0) }, 'one'),
      h('button', { class: 'b1', onClick: () => update(1) }, 'two'),
    ],
    'tab-content': () => [
      h(TabContent, { tabNumber: 0, id: 't0' }, () => 'A'),
      h(TabContent, { tabNumber: 1, id: 't1' }, () => 'B'),
    ],
  })

const settle = () => new Promise((r) => setTimeout(r, 50))

describe('Tabs (client)', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('hydrates with no warnings', async () => {
    const r = await hydrate(render)
    expect(r.warnings).toEqual([])
    r.unmount()
  })

  it('switching tabs after hydration shows the other tab', async () => {
    const r = await hydrate(render)
    const panel = (id: string) =>
      r.container.querySelector(`#${id}`) as HTMLElement
    expect(panel('t0').style.display).not.toBe('none')
    ;(r.container.querySelector('.b1') as HTMLElement).click()
    await nextTick()
    await settle()
    expect(panel('t1').style.display).not.toBe('none')
    expect(panel('t0').style.display).toBe('none')
    r.unmount()
  })
})
