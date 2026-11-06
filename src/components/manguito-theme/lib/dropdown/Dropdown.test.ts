import { afterEach, describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import { hydrate } from '../__tests__/ssr'
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
