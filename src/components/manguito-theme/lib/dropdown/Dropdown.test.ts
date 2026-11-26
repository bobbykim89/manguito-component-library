import { afterEach, describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import { hydrate } from '@mcl/test-utils/ssr'
import DropdownContainer from './DropdownContainer.vue'
import DropdownContent from './DropdownContent.vue'

const settle = () => new Promise((r) => setTimeout(r, 50))

const render = (onClickOutside?: (e: Event) => void) => () =>
  h(
    DropdownContainer,
    { onClickOutside },
    {
      toggler: (p: { toggle: (e: Event) => void }) =>
        h('button', { id: 'trigger', onClick: p.toggle }, 'TOGGLER'),
      default: () => h(DropdownContent, null, { default: () => 'MENU ITEMS' }),
    },
  )

describe('Dropdown (client)', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('hydrates with no warnings', async () => {
    const r = await hydrate(render())
    await settle()
    expect(r.warnings).toEqual([])
    r.unmount()
  })

  it('trigger toggles the content', async () => {
    const r = await hydrate(render())
    const trigger = r.container.querySelector<HTMLElement>('#trigger')!
    expect(r.container.textContent).not.toContain('MENU ITEMS')
    trigger.click()
    await nextTick()
    expect(r.container.textContent).toContain('MENU ITEMS')
    trigger.click()
    await nextTick()
    await settle()
    expect(r.container.textContent).not.toContain('MENU ITEMS')
    r.unmount()
  })

  it('click outside emits click-outside and closes', async () => {
    const events: Event[] = []
    const r = await hydrate(render((e) => events.push(e)))
    r.container.querySelector<HTMLElement>('#trigger')!.click()
    await nextTick()
    expect(r.container.textContent).toContain('MENU ITEMS')
    document.body.click()
    await nextTick()
    await settle()
    expect(events).toHaveLength(1)
    expect(r.container.textContent).not.toContain('MENU ITEMS')
    r.unmount()
  })
})

type TogglerProps = {
  toggle: (e?: Event) => void
  dropdownState: boolean
  attrs: Record<string, unknown>
}

// A bound toggler and a menu whose item closes it through `itemClick`.
const renderBound =
  (opts: { noEvent?: boolean } = {}) =>
  () =>
    h('div', [
      h('input', { id: 'outside' }),
      h(DropdownContainer, null, {
        toggler: (p: TogglerProps) =>
          h(
            'button',
            {
              id: 'trigger',
              ...p.attrs,
              onClick: opts.noEvent ? () => p.toggle() : p.toggle,
            },
            'TOGGLER',
          ),
        default: () =>
          h(DropdownContent, null, {
            default: ({ itemClick }: { itemClick: () => void }) =>
              h('button', { id: 'item', onClick: itemClick }, 'ITEM'),
          }),
      }),
    ])

const escape = (el: Element) => {
  const e = new KeyboardEvent('keydown', {
    key: 'Escape',
    bubbles: true,
    cancelable: true,
  })
  el.dispatchEvent(e)
  return e
}

describe('Dropdown toggler wiring and focus return (#128)', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  const open = async (root: ParentNode) => {
    root.querySelector<HTMLElement>('#trigger')!.click()
    await nextTick()
    const item = root.querySelector<HTMLElement>('#item')!
    item.focus()
    return item
  }

  it('toggler attrs expose expanded state and point at the content', async () => {
    const r = await hydrate(renderBound())
    const trigger = r.container.querySelector<HTMLElement>('#trigger')!
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
    const controls = trigger.getAttribute('aria-controls')
    expect(controls).toBeTruthy()
    await open(r.container)
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
    expect(
      r.container.querySelector('#item')!.closest(`#${controls}`),
    ).not.toBeNull()
    r.unmount()
  })

  it('Escape closes the menu, focuses the toggler and prevents default', async () => {
    const r = await hydrate(renderBound())
    const item = await open(r.container)
    const e = escape(item)
    await nextTick()
    await settle()
    expect(e.defaultPrevented).toBe(true)
    expect(r.container.textContent).not.toContain('ITEM')
    expect(document.activeElement?.id).toBe('trigger')
    r.unmount()
  })

  it('Escape with the menu closed is not handled', async () => {
    const r = await hydrate(renderBound())
    const trigger = r.container.querySelector<HTMLElement>('#trigger')!
    expect(escape(trigger).defaultPrevented).toBe(false)
    r.unmount()
  })

  it('itemClick from inside returns focus to the toggler', async () => {
    const r = await hydrate(renderBound())
    const item = await open(r.container)
    item.click()
    await nextTick()
    await settle()
    expect(r.container.textContent).not.toContain('ITEM')
    expect(document.activeElement?.id).toBe('trigger')
    r.unmount()
  })

  it('click outside closes without moving focus', async () => {
    const r = await hydrate(renderBound())
    await open(r.container)
    const outside = r.container.querySelector<HTMLElement>('#outside')!
    outside.focus()
    outside.click()
    await nextTick()
    await settle()
    expect(r.container.textContent).not.toContain('ITEM')
    expect(document.activeElement).toBe(outside)
    r.unmount()
  })

  it('toggle() with no event still returns focus', async () => {
    const r = await hydrate(renderBound({ noEvent: true }))
    const item = await open(r.container)
    expect(() => escape(item)).not.toThrow()
    await nextTick()
    await settle()
    expect(document.activeElement?.id).toBe('trigger')
    r.unmount()
  })
})

describe('Dropdown focus return edge cases (#128 review)', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('a click on a non-focusable wrapper still returns focus to its button', async () => {
    const r = await hydrate(() =>
      h(DropdownContainer, null, {
        toggler: (p: TogglerProps) =>
          h('div', { id: 'wrap', onClick: p.toggle }, [
            h('button', { id: 'trigger', ...p.attrs }, 'TOGGLER'),
          ]),
        default: () =>
          h(DropdownContent, null, {
            default: ({ itemClick }: { itemClick: () => void }) =>
              h('button', { id: 'item', onClick: itemClick }, 'ITEM'),
          }),
      }),
    )
    r.container.querySelector<HTMLElement>('#trigger')!.click()
    await nextTick()
    const item = r.container.querySelector<HTMLElement>('#item')!
    item.focus()
    item.click()
    await nextTick()
    await settle()
    expect(document.activeElement?.id).toBe('trigger')
    r.unmount()
  })

  it('toggle() with no event still emits an Event', async () => {
    const events: unknown[] = []
    const r = await hydrate(() =>
      h(
        DropdownContainer,
        { onToggle: (e: Event) => events.push(e) },
        {
          toggler: (p: TogglerProps) =>
            h('button', { id: 'trigger', onClick: () => p.toggle() }, 'T'),
          default: () => h(DropdownContent, null, { default: () => 'M' }),
        },
      ),
    )
    r.container.querySelector<HTMLElement>('#trigger')!.click()
    await nextTick()
    expect(events).toHaveLength(1)
    expect(events[0]).toBeInstanceOf(Event)
    r.unmount()
  })
})
