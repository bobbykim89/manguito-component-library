import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import MclCardB from './MclCardB.vue'

describe('MclCardB', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('emits', () => {
    it('emits card-click with the card details and logs nothing', async () => {
      const log = vi.spyOn(console, 'log').mockImplementation(() => {})
      const wrapper = mount(MclCardB, {
        props: { title: 'Card', ctaLink: '/next', ctaTarget: '_blank' },
      })
      await wrapper.find('a').trigger('click')

      const [, item] = wrapper.emitted('card-click')![0]
      expect(item).toEqual({ title: 'Card', url: '/next', target: '_blank' })
      expect(log).not.toHaveBeenCalled()
    })
  })
})
