import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
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

  describe('with measured heights', () => {
    const heights: Record<string, number> = { t0: 100, t1: 200 }
    beforeEach(() => {
      // jsdom has no layout or ResizeObserver; report a fixed content height
      // for each visible tab panel, the way a browser would after layout
      class FakeResizeObserver {
        constructor(private cb: ResizeObserverCallback) {}
        observe(el: HTMLElement) {
          setTimeout(() => {
            const blockSize =
              el.style.display === 'none' ? 0 : (heights[el.id] ?? 0)
            this.cb(
              [{ contentBoxSize: [{ inlineSize: 1, blockSize }] }] as never,
              this as never,
            )
          }, 5)
        }
        unobserve() {}
        disconnect() {}
      }
      vi.stubGlobal('ResizeObserver', FakeResizeObserver)
    })

    afterEach(() => {
      vi.unstubAllGlobals()
    })

    it('keeps --container-hts set across tab switches once measured', async () => {
      const r = await hydrate(render)
      expect(r.warnings).toEqual([])
      const root = r.container.firstElementChild as HTMLElement
      const hts = () => root.style.getPropertyValue('--container-hts')

      // record every style value the container goes through
      const seen: string[] = []
      const observer = new MutationObserver((records) => {
        for (const rec of records) seen.push(rec.oldValue ?? '')
      })
      observer.observe(root, {
        attributes: true,
        attributeFilter: ['style'],
        attributeOldValue: true,
      })

      await settle()
      expect(hts()).toBe('100px')
      ;(r.container.querySelector('.b1') as HTMLElement).click()
      await nextTick()
      await settle()
      expect(hts()).toBe('200px')
      ;(r.container.querySelector('.b0') as HTMLElement).click()
      await nextTick()
      await settle()
      expect(hts()).toBe('100px')

      observer.disconnect()
      seen.push(root.getAttribute('style') ?? '')
      const afterFirst = seen.slice(
        seen.findIndex((s) => s.includes('--container-hts')),
      )
      expect(afterFirst.length).toBeGreaterThan(1)
      for (const style of afterFirst) {
        expect(style, JSON.stringify(afterFirst)).toMatch(
          /--container-hts:\s*\d+px/,
        )
      }
      r.unmount()
    })
  })
})
