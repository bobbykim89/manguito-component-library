import { afterEach, describe, expect, it } from 'vitest'
import { h, nextTick, ref } from 'vue'
import { hydrate, renderOnServer } from '../__tests__/ssr'
import AccordionGroup from './AccordionGroup.vue'
import Collapse from './Collapse.vue'

const settle = () => new Promise((r) => setTimeout(r, 50))
const slots = { default: () => h('span', { class: 'body' }, 'BODY') }
const panelOf = (root: ParentNode) =>
  root.querySelector('.body')!.parentElement!.parentElement as HTMLElement
const idsOf = (html: string) =>
  [...html.matchAll(/<div id="([^"]+)"/g)].map((m) => m[1])
const hydratedIds = (root: ParentNode) =>
  [...root.querySelectorAll('div[id]')].map((e) => e.id)

describe('Collapse (client)', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('hydrates open and closed with no warnings', async () => {
    const a = await hydrate(() => h(Collapse, { visible: true }, slots))
    expect(a.warnings).toEqual([])
    a.unmount()
    const b = await hydrate(() => h(Collapse, null, slots))
    expect(b.warnings).toEqual([])
    b.unmount()
  })

  it('a hydrated closed panel opens on toggle', async () => {
    const c = ref<InstanceType<typeof Collapse> | null>(null)
    const onOpen = (v: boolean) => opens.push(v)
    const opens: boolean[] = []
    const r = await hydrate(() => h(Collapse, { ref: c, onOpen }, slots))
    expect(panelOf(r.container).style.display).toBe('none')
    c.value!.toggle()
    await nextTick()
    await settle()
    expect(panelOf(r.container).style.display).not.toBe('none')
    expect(opens).toEqual([true])
    r.unmount()
  })

  it('ids match between server and client', async () => {
    const cases: Array<() => ReturnType<typeof h>> = [
      () => h(Collapse, { id: 'panel-1' }, slots),
      () => h(Collapse, null, slots),
      () =>
        h(AccordionGroup, null, {
          default: () => [
            h(Collapse, null, slots),
            h(Collapse, null, slots),
            h(Collapse, null, slots),
          ],
        }),
    ]
    for (const render of cases) {
      const server = idsOf((await renderOnServer(render)).html)
      const r = await hydrate(render)
      expect(hydratedIds(r.container)).toEqual(server)
      expect(r.warnings).toEqual([])
      r.unmount()
    }
  })

  it('AccordionGroup opens one panel at a time', async () => {
    const a = ref<InstanceType<typeof Collapse> | null>(null)
    const b = ref<InstanceType<typeof Collapse> | null>(null)
    const r = await hydrate(() =>
      h(AccordionGroup, null, {
        default: () => [
          h(Collapse, { id: 'a', ref: a }, slots),
          h(Collapse, { id: 'b', ref: b }, slots),
        ],
      }),
    )
    const display = (id: string) =>
      (document.getElementById(id)!.firstElementChild as HTMLElement).style
        .display
    a.value!.open()
    await nextTick()
    await settle()
    expect(display('a')).not.toBe('none')
    b.value!.open()
    await nextTick()
    await settle()
    expect(display('b')).not.toBe('none')
    expect(display('a')).toBe('none')
    r.unmount()
  })
})
