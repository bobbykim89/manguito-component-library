import { afterEach, describe, expect, it } from 'vitest'
import { h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { hydrate } from '@mcl/test-utils/ssr'
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
    button(document).click()
    await nextTick()
    await settle()
    expect(drawer()).not.toBeNull()
    expect(drawer()!.textContent).toContain('MOBILE')
    expect(button(document).getAttribute('aria-expanded')).toBe('true')
    expect(overflow()).toBe('hidden')
    expect(events).toEqual([true])

    header.value!.headerClose()
    await nextTick()
    await settle()
    expect(drawer()).toBeNull()
    expect(overflow()).toBe('')
    r.unmount()
  })

  it('after mount, the only hamburger sits in the body-teleported drawer wrapper', async () => {
    const r = await hydrate(() =>
      h(HeaderVertical, null, {
        content,
        'mobile-content': () => h('span', 'MOBILE'),
      }),
    )
    await settle()
    expect(r.warnings).toEqual([])

    const buttons = document.querySelectorAll('button[aria-label]')
    expect(buttons).toHaveLength(1)
    const btn = buttons[0] as HTMLElement
    // not capped by any stacking context around the header
    expect(btn.closest('header')).toBeNull()
    expect(r.container.contains(btn)).toBe(false)
    const wrapper = btn.closest('div.relative.z-40') as HTMLElement
    expect(wrapper).not.toBeNull()
    expect(wrapper.parentElement).toBe(document.body)

    btn.click()
    await nextTick()
    await settle()
    // same z-40 wrapper as the open drawer, as before SSR support
    expect(drawer()).not.toBeNull()
    expect(wrapper.contains(drawer())).toBe(true)
    expect(document.querySelectorAll('button[aria-label]')).toHaveLength(1)
    r.unmount()
  })
})

// #110 items 5 and 6: unnamed <nav> landmarks, and a hamburger named only
// "Open"/"Close".
describe('HeaderVertical landmarks and menu button', () => {
  const headerWith = (props: Record<string, unknown> = {}) =>
    mount(HeaderVertical, {
      props,
      slots: { content, 'mobile-content': () => h('span', 'MOBILE') },
      attachTo: document.body,
    })
  const navLabels = () =>
    [...document.body.querySelectorAll('nav')].map((n) =>
      n.getAttribute('aria-label'),
    )
  const menuButton = () =>
    document.body.querySelector('button[aria-expanded]') as HTMLButtonElement

  afterEach(() => {
    document.body.innerHTML = ''
    document.documentElement.style.overflow = ''
  })

  it('labels every nav "Main" by default, and with navLabel when set', async () => {
    const w = headerWith()
    menuButton().click()
    await nextTick()
    expect(navLabels().length).toBeGreaterThan(0)
    expect(new Set(navLabels())).toEqual(new Set(['Main']))
    w.unmount()

    const w2 = headerWith({ navLabel: 'Primary' })
    menuButton().click()
    await nextTick()
    expect(new Set(navLabels())).toEqual(new Set(['Primary']))
    w2.unmount()
  })

  it('keeps the menu button name constant and reports state with aria-expanded', async () => {
    const w = headerWith()
    expect(menuButton().getAttribute('aria-label')).toBe('Menu')
    expect(menuButton().getAttribute('aria-expanded')).toBe('false')
    menuButton().click()
    await nextTick()
    expect(menuButton().getAttribute('aria-label')).toBe('Menu')
    expect(menuButton().getAttribute('aria-expanded')).toBe('true')
    w.unmount()
  })

  it('takes the menu button name from menuLabel', () => {
    const w = headerWith({ menuLabel: 'Navigation' })
    expect(menuButton().getAttribute('aria-label')).toBe('Navigation')
    w.unmount()
  })
})
