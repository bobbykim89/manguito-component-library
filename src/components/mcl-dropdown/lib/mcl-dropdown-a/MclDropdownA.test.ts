import { afterEach, describe, expect, it, vi } from 'vitest'
import { h, nextTick } from 'vue'
import { hydrate } from '@mcl/test-utils/ssr'
import MclDropdownA from './MclDropdownA.vue'

const render = () =>
  h(MclDropdownA, {
    title: 'DROPDOWN-TITLE',
    dropdownItems: [{ title: 'Item One' }, { title: 'Item Two' }],
  })

describe('MclDropdownA (client)', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('hydrates with no warnings', async () => {
    const r = await hydrate(render)
    expect(r.warnings).toEqual([])
    r.unmount()
  })
})

const settle = () => new Promise((r) => setTimeout(r, 50))

const renderA11y =
  (extra: Record<string, unknown> = {}) =>
  () =>
    h(MclDropdownA, {
      title: 'DROPDOWN-TITLE',
      dropdownItems: [
        { title: 'Item One' },
        { title: 'Item Two' },
        { title: 'Item Three' },
      ],
      ...extra,
    })

const toggleOf = (root: ParentNode) =>
  root.querySelector<HTMLButtonElement>('button')!
const itemOf = (root: ParentNode, title: string) =>
  Array.from(root.querySelectorAll<HTMLButtonElement>('button')).find(
    (b) => b.textContent?.trim() === title,
  )!
const open = async (root: ParentNode) => {
  toggleOf(root).click()
  await nextTick()
}

describe('MclDropdownA accessibility (#135)', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('toggle exposes aria-expanded and aria-controls', async () => {
    const r = await hydrate(renderA11y())
    const toggle = toggleOf(r.container)
    expect(toggle.getAttribute('aria-expanded')).toBe('false')
    const controls = toggle.getAttribute('aria-controls')
    expect(controls).toBeTruthy()
    await open(r.container)
    expect(toggle.getAttribute('aria-expanded')).toBe('true')
    expect(
      itemOf(r.container, 'Item One').closest(`[id="${controls}"]`),
    ).not.toBeNull()
    r.unmount()
  })

  it('toggle and items are type="button"', async () => {
    const r = await hydrate(renderA11y())
    await open(r.container)
    expect(toggleOf(r.container).getAttribute('type')).toBe('button')
    for (const title of ['Item One', 'Item Two', 'Item Three']) {
      expect(itemOf(r.container, title).getAttribute('type')).toBe('button')
    }
    r.unmount()
  })

  it('choosing an item closes the list, returns focus to the toggle and emits item-click', async () => {
    const onItemClick = vi.fn()
    const r = await hydrate(renderA11y({ onItemClick }))
    await open(r.container)
    const item = itemOf(r.container, 'Item Two')
    item.focus()
    item.click()
    await nextTick()
    await settle()
    expect(r.container.textContent).not.toContain('Item Two')
    expect(document.activeElement).toBe(toggleOf(r.container))
    expect(onItemClick).toHaveBeenCalledTimes(1)
    expect(onItemClick).toHaveBeenCalledWith(expect.any(Event), {
      title: 'Item Two',
    })
    r.unmount()
  })
})

const key = (el: Element, k: string): KeyboardEvent => {
  const e = new KeyboardEvent('keydown', {
    key: k,
    bubbles: true,
    cancelable: true,
  })
  el.dispatchEvent(e)
  return e
}

describe('MclDropdownA arrow keys (#135)', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('ArrowDown from the open toggle focuses the first item and prevents default', async () => {
    const r = await hydrate(renderA11y())
    await open(r.container)
    const toggle = toggleOf(r.container)
    toggle.focus()
    const e = key(toggle, 'ArrowDown')
    expect(e.defaultPrevented).toBe(true)
    expect(document.activeElement).toBe(itemOf(r.container, 'Item One'))
    r.unmount()
  })

  it('ArrowDown and ArrowUp move one item and stop at the ends', async () => {
    const r = await hydrate(renderA11y())
    await open(r.container)
    const [one, two, three] = ['Item One', 'Item Two', 'Item Three'].map((t) =>
      itemOf(r.container, t),
    )
    one.focus()
    const steps: [string, HTMLElement][] = [
      ['ArrowDown', two],
      ['ArrowDown', three],
      ['ArrowDown', three],
      ['ArrowUp', two],
      ['ArrowUp', one],
      ['ArrowUp', one],
    ]
    for (const [k, expected] of steps) {
      const e = key(document.activeElement!, k)
      expect(e.defaultPrevented).toBe(true)
      expect(document.activeElement).toBe(expected)
    }
    r.unmount()
  })

  it('arrows follow focus moved by Tab', async () => {
    const r = await hydrate(renderA11y())
    await open(r.container)
    const two = itemOf(r.container, 'Item Two')
    two.focus()
    key(two, 'ArrowDown')
    expect(document.activeElement).toBe(itemOf(r.container, 'Item Three'))
    r.unmount()
  })

  it('ArrowUp from the open toggle prevents default and leaves focus on the toggle', async () => {
    const r = await hydrate(renderA11y())
    await open(r.container)
    const toggle = toggleOf(r.container)
    toggle.focus()
    const e = key(toggle, 'ArrowUp')
    expect(e.defaultPrevented).toBe(true)
    expect(document.activeElement).toBe(toggle)
    r.unmount()
  })

  it('arrows with the list closed are not handled', async () => {
    const r = await hydrate(renderA11y())
    const toggle = toggleOf(r.container)
    toggle.focus()
    let e!: KeyboardEvent
    expect(() => (e = key(toggle, 'ArrowDown'))).not.toThrow()
    expect(e.defaultPrevented).toBe(false)
    expect(document.activeElement).toBe(toggle)
    // closed again while the content may still be leaving
    await open(r.container)
    toggle.click()
    await nextTick()
    expect(key(toggle, 'ArrowDown').defaultPrevented).toBe(false)
    expect(key(toggle, 'ArrowUp').defaultPrevented).toBe(false)
    r.unmount()
  })

  it('other keys are not prevented', async () => {
    const r = await hydrate(renderA11y())
    await open(r.container)
    const one = itemOf(r.container, 'Item One')
    one.focus()
    expect(key(one, 'Tab').defaultPrevented).toBe(false)
    expect(key(one, 'a').defaultPrevented).toBe(false)
    r.unmount()
  })

  it('with no items, ArrowDown from the open toggle does not throw', async () => {
    const r = await hydrate(renderA11y({ dropdownItems: [] }))
    await open(r.container)
    const toggle = toggleOf(r.container)
    toggle.focus()
    expect(() => key(toggle, 'ArrowDown')).not.toThrow()
    expect(document.activeElement).toBe(toggle)
    r.unmount()
  })

  it('two dropdowns: arrows move only within their own items', async () => {
    const r = await hydrate(() =>
      h('div', [
        h('div', { id: 'a' }, [
          h(MclDropdownA, {
            title: 'A',
            dropdownItems: [{ title: 'A1' }, { title: 'A2' }],
          }),
        ]),
        h('div', { id: 'b' }, [
          h(MclDropdownA, {
            title: 'B',
            dropdownItems: [{ title: 'B1' }, { title: 'B2' }],
          }),
        ]),
      ]),
    )
    const a = r.container.querySelector('#a')!
    const b = r.container.querySelector('#b')!
    await open(a)
    // Opening B closes A by click-outside; A's items stay in the DOM while
    // they fade out, so a lookup that isn't scoped to B would reach them.
    await open(b)
    expect(itemOf(a, 'A2')).toBeTruthy()
    itemOf(b, 'B1').focus()
    key(document.activeElement!, 'ArrowUp')
    expect(document.activeElement).toBe(itemOf(b, 'B1'))
    key(document.activeElement!, 'ArrowDown')
    expect(document.activeElement).toBe(itemOf(b, 'B2'))
    key(document.activeElement!, 'ArrowDown')
    expect(document.activeElement).toBe(itemOf(b, 'B2'))
    r.unmount()
  })
})
