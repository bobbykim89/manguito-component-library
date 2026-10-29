import { afterEach, describe, expect, it } from 'vitest'
import { h, nextTick, ref } from 'vue'
import { hydrate } from '../__tests__/ssr'
import HeaderVertical from './HeaderVertical.vue'

const settle = () => new Promise((r) => setTimeout(r, 50))
const overflow = () => document.documentElement.style.overflow
const drawer = () => document.body.querySelector('nav.fixed')
const button = (root: ParentNode) =>
  root.querySelector('button[aria-label]') as HTMLElement

const content = () => h('span', 'DESKTOP')

describe('HeaderVertical (client)', () => {
  afterEach(() => {
    document.body.innerHTML = ''
    document.documentElement.style.overflow = ''
  })

  it('hydrates with no warnings, with and without mobile-content', async () => {
    const a = await hydrate(() =>
      h(HeaderVertical, null, {
        content,
        'mobile-content': () => h('span', 'MOBILE'),
      }),
    )
    await settle()
    expect(a.warnings).toEqual([])
    a.unmount()
    const b = await hydrate(() => h(HeaderVertical, null, { content }))
    await settle()
    expect(b.warnings).toEqual([])
    b.unmount()
  })

  it('hamburger toggles the drawer after hydration', async () => {
    const header = ref<InstanceType<typeof HeaderVertical> | null>(null)
    const events: boolean[] = []
    const r = await hydrate(() =>
      h(
        HeaderVertical,
        {
          ref: header,
          onToggleDrawer: (_e: Event, open: boolean) => events.push(open),
        },
        { content, 'mobile-content': () => h('span', 'MOBILE') },
      ),
    )
    await settle()
    expect(drawer()).toBeNull()
    button(r.container).click()
    await nextTick()
    await settle()
    expect(drawer()).not.toBeNull()
    expect(drawer()!.textContent).toContain('MOBILE')
    expect(button(r.container).getAttribute('aria-expanded')).toBe('true')
    expect(overflow()).toBe('hidden')
    expect(events).toEqual([true])

    header.value!.headerClose()
    await nextTick()
    await settle()
    expect(drawer()).toBeNull()
    expect(overflow()).toBe('')
    r.unmount()
  })
})
