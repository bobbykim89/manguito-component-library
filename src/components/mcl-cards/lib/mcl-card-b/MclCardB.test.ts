import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import MclCardB from './MclCardB.vue'

const mountB = (props = {}, slot = '<p class="slot-text">Body</p>') =>
  mount(MclCardB, {
    props: { title: 'Mango', imageSource: 'x.jpg', ctaLink: '/next', ...props },
    slots: { default: slot },
  })

const target = (wrapper: ReturnType<typeof mountB>) =>
  wrapper.get('[data-mcl-card-target]')

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
      await wrapper.get('[data-mcl-card-target]').trigger('click')

      const [, item] = wrapper.emitted('card-click')![0]
      expect(item).toEqual({ title: 'Card', url: '/next', target: '_blank' })
      expect(log).not.toHaveBeenCalled()
    })
  })

  describe('target', () => {
    it('renders the target as <a href target> inside the title heading when ctaAsLink is true; not prevented', () => {
      const wrapper = mountB({ ctaAsLink: true, ctaTarget: '_self' })
      const link = target(wrapper)
      expect(link.element.tagName).toBe('A')
      expect(link.attributes('href')).toBe('/next')
      expect(link.attributes('target')).toBe('_self')
      expect(link.element.parentElement!.tagName).toBe('H3')

      const ev = new MouseEvent('click', { bubbles: true, cancelable: true })
      link.element.dispatchEvent(ev)
      expect(ev.defaultPrevented).toBe(false)
      expect(wrapper.emitted('card-click')).toHaveLength(1)
    })

    it('renders the target as <button type=button> inside the title heading when ctaAsLink is false', () => {
      const wrapper = mountB()
      const button = target(wrapper)
      expect(button.element.tagName).toBe('BUTTON')
      expect(button.attributes('type')).toBe('button')
      expect(button.attributes('href')).toBeUndefined()
      expect(button.element.parentElement!.tagName).toBe('H3')
      expect(wrapper.find('a').exists()).toBe(false)
    })

    it('the target accessible content is just the title; the default slot and img are outside it', () => {
      const wrapper = mountB()
      const el = target(wrapper).element
      expect(el.textContent!.trim()).toBe('Mango')
      expect(el.contains(wrapper.get('.slot-text').element)).toBe(false)
      expect(el.contains(wrapper.get('img').element)).toBe(false)
    })

    it('adds the sr-only new-tab cue when ctaTarget is _blank and ctaAsLink is true', () => {
      const blank = mountB({ ctaAsLink: true, ctaTarget: '_blank' })
      const cue = target(blank).get('.sr-only')
      expect(cue.element.textContent).toBe(' (opens in a new tab)')

      expect(
        target(mountB({ ctaAsLink: true, ctaTarget: '_self' }))
          .find('.sr-only')
          .exists(),
      ).toBe(false)
      expect(
        target(mountB({ ctaAsLink: false, ctaTarget: '_blank' }))
          .find('.sr-only')
          .exists(),
      ).toBe(false)
    })
  })

  describe('slot content', () => {
    it('a click on a link in the default slot does not emit card-click', () => {
      const wrapper = mountB({}, '<a href="/x" class="slot-link">More</a>')
      const ev = new MouseEvent('click', { bubbles: true, cancelable: true })
      wrapper.get('.slot-link').element.dispatchEvent(ev)
      expect(ev.defaultPrevented).toBe(false)
      expect(wrapper.emitted('card-click')).toBeUndefined()
    })
  })

  describe('structure', () => {
    // Keyboard focus only: a mouse click also focuses the target, and the
    // overlay must not stay revealed after the pointer leaves.
    it('overlay is revealed by keyboard focus (focus-visible inside it), not any focus', () => {
      const wrapper = mountB()
      const overlay = wrapper.get('.peer')
      expect(overlay.classes()).toContain('hover:opacity-100')
      expect(overlay.classes()).toContain('has-[:focus-visible]:opacity-100')
      expect(overlay.classes()).not.toContain('focus-within:opacity-100')
      const img = wrapper.get('img').classes()
      expect(img).toContain('peer-has-[:focus-visible]:grayscale-0')
      expect(img).not.toContain('peer-focus-within:grayscale-0')
    })

    it("the target keeps the heading's start alignment (buttons centre text)", () => {
      expect(target(mountB()).classes()).toContain('text-start')
    })

    it('renders the title with titleLevel and defaults imageAlt to ""', () => {
      const wrapper = mountB({ titleLevel: 'h2' })
      expect(wrapper.get('h2').text()).toBe('Mango')
      expect(wrapper.find('h3').exists()).toBe(false)
      expect(wrapper.get('img').attributes('alt')).toBe('')
    })
  })
})
