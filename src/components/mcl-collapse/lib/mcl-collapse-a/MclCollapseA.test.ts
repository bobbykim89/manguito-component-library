import { afterEach, describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import { AccordionGroup } from '@bobbykim/manguito-theme'
import { hydrate } from '@mcl/test-utils/ssr'
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

  // #107: inside an AccordionGroup only the first item that starts `visible`
  // opens, and each header's aria-expanded has to match its own panel.
  it('in an AccordionGroup, only the first visible item opens and headers match their panels', async () => {
    const item = (id: string, text: string) =>
      h(
        MclCollapseA,
        { collapseId: id, title: id, visible: true },
        { content: () => h('span', text) },
      )
    const r = await hydrate(() =>
      h(AccordionGroup, null, {
        default: () => [item('g1', 'ONE'), item('g2', 'TWO')],
      }),
    )
    await settle()
    const state = (id: string) => ({
      panelOpen:
        (document.getElementById(id)!.firstElementChild as HTMLElement).style
          .display !== 'none',
      ariaExpanded: document
        .getElementById(`${id}-trigger`)!
        .getAttribute('aria-expanded'),
    })
    expect(state('g1')).toEqual({ panelOpen: true, ariaExpanded: 'true' })
    expect(state('g2')).toEqual({ panelOpen: false, ariaExpanded: 'false' })
    expect(r.warnings).toEqual([])
    r.unmount()
  })
})
