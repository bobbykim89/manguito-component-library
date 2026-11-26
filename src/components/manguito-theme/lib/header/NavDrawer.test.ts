import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import NavDrawer from './NavDrawer.vue'

const props = { toggle: false, bgColor: 'light-1' as const }

describe('NavDrawer (#128)', () => {
  it('is a type=button with aria-controls and no checkbox', () => {
    const w = mount(NavDrawer, { props: { ...props, controls: 'm1' } })
    const btn = w.find('button')
    expect(btn.attributes('type')).toBe('button')
    expect(btn.attributes('aria-controls')).toBe('m1')
    expect(w.find('input').exists()).toBe(false)
    w.unmount()
  })

  it('uses the shared focus ring, not outline-none', () => {
    const w = mount(NavDrawer, { props })
    const cls = w.find('button').classes()
    expect(cls).toContain('focus-visible:mcl-focus-ring')
    expect(cls).not.toContain('outline-none')
    expect(cls).not.toContain('focus:ring-4')
    w.unmount()
  })

  it('marks the icon open from the toggle prop', async () => {
    const w = mount(NavDrawer, { props })
    const icon = () => w.find('.hamburger__icon')
    expect(icon().classes()).not.toContain('hamburger__icon--open')
    await w.setProps({ toggle: true })
    expect(icon().classes()).toContain('hamburger__icon--open')
    w.unmount()
  })
})
