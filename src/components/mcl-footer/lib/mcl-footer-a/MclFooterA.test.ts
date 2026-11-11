import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import MclFooterA from './MclFooterA.vue'

const props = {
  title: 'Footer',
  logo: '/logo.svg',
  logoLink: '/',
  socialIconColor: 'light-1' as const,
  menuItems: [{ title: 'Home', url: '/' }],
}
const menuLink = (wrapper: ReturnType<typeof mount>) =>
  wrapper.findAll('a.nav__text').find((a) => a.text() === 'Home')!

describe('MclFooterA', () => {
  describe('props', () => {
    it('makes menu items bold when menuTextBold is true', () => {
      const wrapper = mount(MclFooterA, {
        props: { ...props, menuTextBold: true },
      })
      expect(menuLink(wrapper).classes()).toContain('font-bold')
    })

    it('leaves menu items regular weight by default', () => {
      const wrapper = mount(MclFooterA, { props })
      expect(menuLink(wrapper).classes()).not.toContain('font-bold')
    })
  })
})

// #110 items 7 and 8: an unnamed footer nav, and social links announced as buttons.
describe('MclFooterA accessibility', () => {
  it('labels its nav "Footer" by default, and with navLabel when set', () => {
    expect(
      mount(MclFooterA, { props }).find('nav').attributes('aria-label'),
    ).toBe('Footer')
    expect(
      mount(MclFooterA, { props: { ...props, navLabel: 'Site links' } })
        .find('nav')
        .attributes('aria-label'),
    ).toBe('Site links')
  })

  it('renders social links as plain links that open safely in a new tab', () => {
    const wrapper = mount(MclFooterA, {
      props: {
        ...props,
        socialLinks: { github: 'https://github.com/example' },
      },
    })
    const link = wrapper.find('a[href="https://github.com/example"]')
    expect(link.exists()).toBe(true)
    expect(link.attributes('role')).toBeUndefined()
    expect(link.attributes('target')).toBe('_blank')
    expect(link.attributes('rel')).toBe('noopener noreferrer')
    expect(link.attributes('aria-label')).toBe('GitHub (opens in new tab)')
  })
})
