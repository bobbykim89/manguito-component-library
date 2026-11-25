import { hydrate } from '@mcl/test-utils/ssr'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import MclCardC from './MclCardC.vue'

const mountC = (props = {}, slot = '<p>Body</p>') =>
  mount(MclCardC, {
    props: { imageSource: 'x.jpg', title: 'Mango', ...props },
    slots: { 'card-body': slot },
    attachTo: document.body,
  })

describe('MclCardC', () => {
  describe('disclosure button', () => {
    it('renders one button type=button with aria-expanded=false and aria-controls pointing at the content region', () => {
      const wrapper = mountC()
      const buttons = wrapper.findAll('button')
      expect(buttons).toHaveLength(1)
      const button = buttons[0]
      expect(button.attributes('type')).toBe('button')
      expect(button.attributes('aria-expanded')).toBe('false')
      const region = wrapper.get(`#${button.attributes('aria-controls')}`)
      expect(region.attributes()).toHaveProperty('inert')
      expect(region.find('img').exists()).toBe(true)
      expect(region.text()).toContain('Body')
      wrapper.unmount()
    })

    it('flips on first click: aria-expanded=true, content no longer inert, no card-click', async () => {
      const wrapper = mountC()
      const button = wrapper.get('button')
      await button.trigger('click')
      expect(button.attributes('aria-expanded')).toBe('true')
      const region = wrapper.get(`#${button.attributes('aria-controls')}`)
      expect(region.attributes()).not.toHaveProperty('inert')
      expect(wrapper.emitted('card-click')).toBeUndefined()
      wrapper.unmount()
    })

    it('emits card-click (with the event) on the second click, and on every click after', async () => {
      const wrapper = mountC()
      const button = wrapper.get('button')
      await button.trigger('click')
      await button.trigger('click')
      await button.trigger('click')
      const emitted = wrapper.emitted('card-click')!
      expect(emitted).toHaveLength(2)
      expect(emitted[0][0]).toBeInstanceOf(Event)
      expect(button.attributes('aria-expanded')).toBe('true')
      wrapper.unmount()
    })

    it('does not cancel the click event', async () => {
      const wrapper = mountC()
      const ev = new MouseEvent('click', { bubbles: true, cancelable: true })
      wrapper.get('button').element.dispatchEvent(ev)
      expect(ev.defaultPrevented).toBe(false)
      wrapper.unmount()
    })
  })

  describe('accessible name', () => {
    // Chromium drops an aria-labelledby reference into inert content, which
    // left the button unnamed before the flip; the name is the title string.
    it('names the button with aria-label = title when the title is shown', () => {
      const wrapper = mountC({ showTitle: true })
      const button = wrapper.get('button')
      expect(wrapper.get('h3').text()).toBe('Mango')
      expect(button.attributes('aria-label')).toBe('Mango')
    })

    it('never takes its name from content inside an inert element', () => {
      const wrapper = mountC({ showTitle: true })
      const ids = (wrapper.get('button').attributes('aria-labelledby') ?? '')
        .split(' ')
        .filter(Boolean)
      for (const id of ids) {
        expect(document.getElementById(id)?.closest('[inert]')).toBeNull()
      }
      wrapper.unmount()
    })

    it('uses aria-label = title when showTitle is false', () => {
      const wrapper = mountC({ showTitle: false })
      const button = wrapper.get('button')
      expect(button.attributes('aria-label')).toBe('Mango')
      expect(button.attributes('aria-labelledby')).toBeUndefined()
    })

    it('falls back to imageAlt, then "Card", when title is empty', () => {
      const withAlt = mountC({ title: '', showTitle: true, imageAlt: 'A bird' })
      expect(withAlt.get('button').attributes('aria-label')).toBe('A bird')
      expect(
        withAlt.get('button').attributes('aria-labelledby'),
      ).toBeUndefined()

      const bare = mountC({ title: '' })
      expect(bare.get('button').attributes('aria-label')).toBe('Card')

      const noTitle = mount(MclCardC, { props: { imageSource: 'x.jpg' } })
      expect(noTitle.get('button').attributes('aria-label')).toBe('Card')
    })
  })

  describe('structure', () => {
    it('renders the title with titleLevel (h2)', () => {
      const wrapper = mountC({ showTitle: true, titleLevel: 'h2' })
      expect(wrapper.find('h2').exists()).toBe(true)
      expect(wrapper.find('h3').exists()).toBe(false)
    })

    it('defaults imageAlt to "" so the img always has an alt attribute', () => {
      const wrapper = mountC()
      expect(wrapper.get('img').attributes('alt')).toBe('')
    })

    it('turns the flip and fades off under reduced motion', async () => {
      const wrapper = mountC()
      const root = wrapper.get('.card')
      expect(root.classes()).toContain('motion-reduce:transition-none')
      expect(wrapper.get('img').classes()).toContain(
        'motion-reduce:transition-none',
      )
    })
  })

  describe('slot content', () => {
    it('a click on a link inside card-body does not emit card-click and is not prevented', async () => {
      const wrapper = mountC({}, '<a href="/x">More</a>')
      const button = wrapper.get('button')
      await button.trigger('click')
      const link = wrapper.get('a')
      const ev = new MouseEvent('click', { bubbles: true, cancelable: true })
      link.element.dispatchEvent(ev)
      expect(ev.defaultPrevented).toBe(false)
      expect(wrapper.emitted('card-click')).toBeUndefined()
      wrapper.unmount()
    })

    it('the slot is not inside the button', () => {
      const wrapper = mountC({}, '<a href="/x">More</a>')
      expect(
        wrapper.get('button').element.contains(wrapper.get('a').element),
      ).toBe(false)
      expect(wrapper.get('button').text()).toBe('')
    })
  })

  describe('server render', () => {
    it('hydrates without warnings, aria-controls resolves and the name survives', async () => {
      const { container, warnings, unmount } = await hydrate(() =>
        h(MclCardC, { imageSource: 'x.jpg', title: 'Mango', showTitle: true }),
      )
      expect(warnings).toEqual([])
      const button = container.querySelector('button')!
      const controls = button.getAttribute('aria-controls')!
      expect(container.querySelector(`#${controls}`)).not.toBeNull()
      expect(button.getAttribute('aria-label')).toBe('Mango')
      unmount()
    })
  })
})
