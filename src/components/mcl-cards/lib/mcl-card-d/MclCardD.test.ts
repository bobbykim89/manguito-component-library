import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import MclCardD from './MclCardD.vue'

const mountD = (props = {}) =>
  mount(MclCardD, {
    props: { title: 'Mango', ctaLink: '/mango', ...props },
  })

const cta = (wrapper: ReturnType<typeof mountD>) => wrapper.get('a, button')

describe('MclCardD', () => {
  describe('CTA', () => {
    it('renders the CTA as <button type=button> by default and emits card-click with CardClickEvent', async () => {
      const wrapper = mountD({ ctaLinkTarget: '_blank' })
      const button = cta(wrapper)
      expect(button.element.tagName).toBe('BUTTON')
      expect(button.attributes('type')).toBe('button')
      expect(button.attributes('href')).toBeUndefined()
      expect(button.text()).toBe('Read more')
      // looks like the link it replaces
      expect(button.classes()).toContain('mcl-link')
      expect(button.classes()).toContain('cursor-pointer')
      // buttons centre wrapped text; the inline link it replaces didn't
      expect(button.classes()).toContain('text-start')

      await button.trigger('click')
      const [event, item] = wrapper.emitted('card-click')![0]
      expect(event).toBeInstanceOf(Event)
      expect(item).toEqual({ title: 'Mango', url: '/mango', target: '_blank' })
    })

    it('keeps the button style when ctaButton is set', () => {
      const button = cta(mountD({ ctaButton: true }))
      expect(button.element.tagName).toBe('BUTTON')
      expect(button.classes()).toContain('btn')
    })

    it('renders the CTA as <a href target> when ctaAsLink is true; click not prevented', () => {
      const wrapper = mountD({ ctaAsLink: true })
      const link = cta(wrapper)
      expect(link.element.tagName).toBe('A')
      expect(link.attributes('href')).toBe('/mango')
      expect(link.attributes('target')).toBe('_self')
      expect(link.attributes('type')).toBeUndefined()

      const ev = new MouseEvent('click', { bubbles: true, cancelable: true })
      link.element.dispatchEvent(ev)
      expect(ev.defaultPrevented).toBe(false)
      expect(wrapper.emitted('card-click')).toHaveLength(1)
    })

    it('CTA has aria-describedby pointing at the title id', () => {
      const wrapper = mountD()
      const id = wrapper.get('h3').attributes('id')
      expect(id).toBeTruthy()
      expect(cta(wrapper).attributes('aria-describedby')).toBe(id)
    })

    it('adds the sr-only new-tab cue when ctaLinkTarget is _blank and ctaAsLink is true', () => {
      const blank = cta(mountD({ ctaAsLink: true, ctaLinkTarget: '_blank' }))
      expect(blank.get('.sr-only').element.textContent).toBe(
        ' (opens in a new tab)',
      )
      expect(
        cta(mountD({ ctaAsLink: true, ctaLinkTarget: '_self' }))
          .find('.sr-only')
          .exists(),
      ).toBe(false)
      expect(
        cta(mountD({ ctaAsLink: false, ctaLinkTarget: '_blank' }))
          .find('.sr-only')
          .exists(),
      ).toBe(false)
    })
  })

  describe('structure', () => {
    it('renders the title with titleLevel (default h3)', () => {
      expect(mountD().get('h3').text()).toBe('Mango')
      const h2 = mountD({ titleLevel: 'h2' })
      expect(h2.get('h2').text()).toBe('Mango')
      expect(h2.find('h3').exists()).toBe(false)
    })
  })
})
