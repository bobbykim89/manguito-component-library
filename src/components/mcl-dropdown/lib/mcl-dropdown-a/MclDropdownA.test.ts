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
