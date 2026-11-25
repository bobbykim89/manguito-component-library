import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import MclCardA from './MclCardA.vue'

const mountA = (props = {}, slot = '<p>Body</p>') =>
  mount(MclCardA, {
    props: {
      title: 'Mango',
      imageSource: 'x.jpg',
      ctaText: 'Read more',
      ctaLink: '/mango',
      ...props,
    },
    slots: { default: slot },
  })

const cardButton = (wrapper: ReturnType<typeof mountA>) =>
  wrapper.get('[data-mcl-card-target]')

describe('MclCardA', () => {
  describe('card button', () => {
    it('has a button type=button named by the title heading (aria-labelledby) that emits card-click with CardClickEvent', async () => {
      const wrapper = mountA({ ctaTarget: '_blank' })
      const button = cardButton(wrapper)
      expect(button.element.tagName).toBe('BUTTON')
      expect(button.attributes('type')).toBe('button')
      const heading = wrapper.get('h3')
      expect(button.attributes('aria-labelledby')).toBe(
        heading.attributes('id'),
      )
      expect(heading.text()).toBe('Mango')

      await button.trigger('click')
      const [event, item] = wrapper.emitted('card-click')![0]
      expect(event).toBeInstanceOf(Event)
      expect(item).toEqual({ title: 'Mango', url: '/mango', target: '_blank' })
      expect(wrapper.emitted('card-btn-click')).toBeUndefined()
    })

    it('the root has no click handler of its own', async () => {
      const wrapper = mountA()
      await wrapper.trigger('click')
      expect(wrapper.emitted('card-click')).toBeUndefined()
    })
  })

  describe('CTA', () => {
    it('renders the CTA as <button type=button> by default (ctaAsLink false) and emits card-btn-click, not card-click', async () => {
      const wrapper = mountA()
      const cta = wrapper.get('.btn')
      expect(cta.element.tagName).toBe('BUTTON')
      expect(cta.attributes('type')).toBe('button')
      expect(cta.attributes('href')).toBeUndefined()
      expect(cta.text()).toBe('Read more')

      await cta.trigger('click')
      const [, item] = wrapper.emitted('card-btn-click')![0]
      expect(item).toEqual({ title: 'Mango', url: '/mango', target: '_self' })
      expect(wrapper.emitted('card-click')).toBeUndefined()
    })

    it('renders the CTA as <a href target> when ctaAsLink is true; click is not prevented', () => {
      const wrapper = mountA({ ctaAsLink: true, ctaTarget: '_self' })
      const cta = wrapper.get('.btn')
      expect(cta.element.tagName).toBe('A')
      expect(cta.attributes('href')).toBe('/mango')
      expect(cta.attributes('target')).toBe('_self')
      expect(cta.attributes('type')).toBeUndefined()

      const ev = new MouseEvent('click', { bubbles: true, cancelable: true })
      cta.element.dispatchEvent(ev)
      expect(ev.defaultPrevented).toBe(false)
      expect(wrapper.emitted('card-btn-click')).toHaveLength(1)
      expect(wrapper.emitted('card-click')).toBeUndefined()
    })

    it('CTA has aria-describedby pointing at the title id', () => {
      const wrapper = mountA()
      expect(wrapper.get('h3').attributes('id')).toBeTruthy()
      expect(wrapper.get('.btn').attributes('aria-describedby')).toBe(
        wrapper.get('h3').attributes('id'),
      )
    })

    it('adds the sr-only " (opens in a new tab)" cue to the CTA link only when ctaTarget is _blank', () => {
      const blank = mountA({ ctaAsLink: true, ctaTarget: '_blank' })
      const cue = blank.get('.btn .sr-only')
      expect(cue.text()).toBe('(opens in a new tab)')
      expect(cue.element.textContent).toBe(' (opens in a new tab)')

      expect(
        mountA({ ctaAsLink: true, ctaTarget: '_self' })
          .find('.sr-only')
          .exists(),
      ).toBe(false)
      // A button doesn't navigate, so it never says it opens a tab
      expect(
        mountA({ ctaAsLink: false, ctaTarget: '_blank' })
          .find('.sr-only')
          .exists(),
      ).toBe(false)
    })
  })

  describe('slot content', () => {
    it('a click on a link in the default slot emits neither event and is not prevented', () => {
      const wrapper = mountA({}, '<a href="/x" class="slot-link">More</a>')
      const ev = new MouseEvent('click', { bubbles: true, cancelable: true })
      wrapper.get('.slot-link').element.dispatchEvent(ev)
      expect(ev.defaultPrevented).toBe(false)
      expect(wrapper.emitted('card-click')).toBeUndefined()
      expect(wrapper.emitted('card-btn-click')).toBeUndefined()
    })

    it('slot and CTA are not inside the card button', () => {
      const wrapper = mountA({}, '<a href="/x" class="slot-link">More</a>')
      const button = cardButton(wrapper).element
      expect(button.contains(wrapper.get('.slot-link').element)).toBe(false)
      expect(button.contains(wrapper.get('.btn').element)).toBe(false)
      expect(button.textContent).toBe('')
    })
  })

  describe('structure', () => {
    it('renders the title with titleLevel and defaults imageAlt to ""', () => {
      const wrapper = mountA({ titleLevel: 'h2' })
      expect(wrapper.get('h2').text()).toBe('Mango')
      expect(wrapper.find('h3').exists()).toBe(false)
      expect(wrapper.get('img').attributes('alt')).toBe('')
    })

    it('enlargeOnHover adds motion-reduce:transition-none and motion-reduce:hover:scale-100', () => {
      const classes = mountA({ enlargeOnHover: true }).classes()
      expect(classes).toContain('hover:scale-105')
      expect(classes).toContain('motion-reduce:transition-none')
      expect(classes).toContain('motion-reduce:hover:scale-100')
    })
  })
})
