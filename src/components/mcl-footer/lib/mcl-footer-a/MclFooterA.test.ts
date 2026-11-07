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
