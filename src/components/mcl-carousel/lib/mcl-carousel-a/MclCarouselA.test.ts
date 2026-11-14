import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import MclCarouselA from './MclCarouselA.vue'

// #122: the arrows use the shared two-tone keyboard focus ring, not a ring in
// the button colour (a light-4 ring was 1.37:1 on a light-2 card).
describe('MclCarouselA — navigation focus', () => {
  it('gives both navigation buttons the shared keyboard focus ring', () => {
    const wrapper = mount(MclCarouselA, {
      props: { title: 'Fruit', content: [1, 2, 3] },
    })
    for (const label of ['previous', 'next']) {
      const button = wrapper.find(`button[aria-label="${label}"]`)
      expect(button.exists()).toBe(true)
      expect(button.classes()).toContain('focus-visible:mcl-focus-ring')
      expect(button.classes().join(' ')).not.toMatch(
        /focus:ring-4|focus:outline-none|ring-offset|ring-light-4/,
      )
    }
  })
})
