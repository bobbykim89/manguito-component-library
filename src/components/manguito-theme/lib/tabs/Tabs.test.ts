import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { h, nextTick } from 'vue'
import { hydrate } from '@mcl/test-utils/ssr'
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

type TabSlot = {
  update: (n: number) => void
  tabAttrs: (n: number) => Record<string, unknown>
}

// Three tabs bound with `tabAttrs`; `bound` picks which indexes bind it.
const renderBound =
  (bound: number[] = [0, 1, 2]) =>
  () =>
    h(TabContainer, null, {
      'tab-button': ({ update, tabAttrs }: TabSlot) =>
        [0, 1, 2].map((i) =>
          h(
            'button',
            bound.includes(i)
              ? { class: `b${i}`, ...tabAttrs(i) }
              : { class: `b${i}`, onClick: () => update(i) },
            `tab ${i}`,
          ),
        ),
      'tab-content': () =>
        [0, 1, 2].map((i) =>
          h(TabContent, { tabNumber: i, id: `p${i}` }, () => `P${i}`),
        ),
    })

const key = (el: Element, k: string) => {
  const e = new KeyboardEvent('keydown', {
    key: k,
    bubbles: true,
    cancelable: true,
  })
  el.dispatchEvent(e)
  return e
}

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

  describe('tabAttrs keyboard model (#128)', () => {
    const tab = (root: ParentNode, i: number) =>
      root.querySelector(`.b${i}`) as HTMLElement
    const shown = (root: ParentNode, id: string) =>
      (root.querySelector(`#${id}`) as HTMLElement).style.display !== 'none'

    it('hydrates bound tabs with no warnings', async () => {
      const r = await hydrate(renderBound())
      await settle()
      expect(r.warnings).toEqual([])
      r.unmount()
    })

    it('tabAttrs gives the active tab tabindex 0 and aria-selected', async () => {
      const r = await hydrate(renderBound())
      await nextTick()
      const t0 = tab(r.container, 0)
      expect(t0.getAttribute('role')).toBe('tab')
      expect(t0.getAttribute('aria-selected')).toBe('true')
      expect(t0.getAttribute('tabindex')).toBe('0')
      expect(t0.getAttribute('aria-controls')).toBe('p0')
      for (const i of [1, 2]) {
        expect(tab(r.container, i).getAttribute('aria-selected')).toBe('false')
        expect(tab(r.container, i).getAttribute('tabindex')).toBe('-1')
      }
      r.unmount()
    })

    it('ArrowRight moves focus and selection to the next tab, wrapping', async () => {
      const r = await hydrate(renderBound())
      tab(r.container, 0).focus()
      key(tab(r.container, 0), 'ArrowRight')
      await nextTick()
      await settle()
      expect(document.activeElement).toBe(tab(r.container, 1))
      expect(tab(r.container, 1).getAttribute('aria-selected')).toBe('true')
      expect(shown(r.container, 'p1')).toBe(true)
      key(tab(r.container, 1), 'ArrowRight')
      await nextTick()
      key(tab(r.container, 2), 'ArrowRight')
      await nextTick()
      await settle()
      expect(document.activeElement).toBe(tab(r.container, 0))
      r.unmount()
    })

    it('ArrowLeft wraps from the first tab to the last', async () => {
      const r = await hydrate(renderBound())
      key(tab(r.container, 0), 'ArrowLeft')
      await nextTick()
      await settle()
      expect(document.activeElement).toBe(tab(r.container, 2))
      expect(tab(r.container, 2).getAttribute('aria-selected')).toBe('true')
      r.unmount()
    })

    it('Home and End go to the first and last tab', async () => {
      const r = await hydrate(renderBound())
      key(tab(r.container, 0), 'End')
      await nextTick()
      await settle()
      expect(document.activeElement).toBe(tab(r.container, 2))
      key(tab(r.container, 2), 'Home')
      await nextTick()
      await settle()
      expect(document.activeElement).toBe(tab(r.container, 0))
      expect(tab(r.container, 0).getAttribute('aria-selected')).toBe('true')
      r.unmount()
    })

    it('handled keys call preventDefault and ArrowDown is ignored', async () => {
      const r = await hydrate(renderBound())
      tab(r.container, 0).focus()
      expect(key(tab(r.container, 0), 'ArrowDown').defaultPrevented).toBe(false)
      await nextTick()
      expect(document.activeElement).toBe(tab(r.container, 0))
      expect(key(tab(r.container, 0), 'ArrowRight').defaultPrevented).toBe(true)
      r.unmount()
    })

    it('clicking a bound tab selects it', async () => {
      const r = await hydrate(renderBound())
      tab(r.container, 2).click()
      await nextTick()
      await settle()
      expect(tab(r.container, 2).getAttribute('aria-selected')).toBe('true')
      expect(shown(r.container, 'p2')).toBe(true)
      r.unmount()
    })

    it('panels are labelled by their bound tab and have tabindex 0', async () => {
      const r = await hydrate(renderBound())
      const p1 = r.container.querySelector('#p1') as HTMLElement
      expect(p1.getAttribute('aria-labelledby')).toBe(tab(r.container, 1).id)
      expect(tab(r.container, 1).id).not.toBe('')
      expect(p1.getAttribute('tabindex')).toBe('0')
      r.unmount()
    })

    it('only panels whose tab was bound get aria-labelledby', async () => {
      const partly = await hydrate(renderBound([0, 1]))
      expect(
        partly.container.querySelector('#p1')!.getAttribute('aria-labelledby'),
      ).toBe(tab(partly.container, 1).id)
      expect(
        partly.container.querySelector('#p2')!.hasAttribute('aria-labelledby'),
      ).toBe(false)
      partly.unmount()
      const none = await hydrate(render)
      expect(none.container.querySelector('[aria-labelledby]')).toBeNull()
      none.unmount()
    })

    it('the tab count stays right after many switches', async () => {
      const r = await hydrate(renderBound())
      for (const i of [1, 2, 0, 2]) {
        tab(r.container, i).click()
        await nextTick()
        await settle()
      }
      key(tab(r.container, 2), 'Home')
      await nextTick()
      key(tab(r.container, 0), 'End')
      await nextTick()
      await settle()
      expect(document.activeElement).toBe(tab(r.container, 2))
      expect(tab(r.container, 2).getAttribute('aria-controls')).toBe('p2')
      r.unmount()
    })
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
