import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import FieldFeedback from './FieldFeedback.vue'

describe('FieldFeedback', () => {
  it('renders nothing when not invalid', () => {
    const wrapper = mount(FieldFeedback, {
      props: { id: 'email-error', text: 'Required' },
    })
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
    expect(wrapper.text()).toBe('')
  })

  it('renders the alert region when invalid', () => {
    const wrapper = mount(FieldFeedback, {
      props: { id: 'email-error', invalid: true, text: 'Required' },
    })
    const alert = wrapper.find('[role="alert"]')
    expect(alert.exists()).toBe(true)
    expect(alert.attributes('id')).toBe('email-error')
    expect(alert.text()).toBe('Required')
  })

  it('is inserted rather than merely unhidden, so role=alert announces', async () => {
    // The bug this component fixes: MclInputText's error container is always in
    // the DOM and CSS-hidden, so the alert never fires.
    const wrapper = mount(FieldFeedback, {
      props: { id: 'email-error', invalid: false, text: 'Required' },
    })
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
    await wrapper.setProps({ invalid: true })
    await nextTick()
    expect(wrapper.find('[role="alert"]').exists()).toBe(true)
  })

  it('is removed again when validity is restored', async () => {
    const wrapper = mount(FieldFeedback, {
      props: { id: 'email-error', invalid: true, text: 'Required' },
    })
    await wrapper.setProps({ invalid: false })
    await nextTick()
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  })

  it('prefers slot content over the text prop', () => {
    const wrapper = mount(FieldFeedback, {
      props: { id: 'email-error', invalid: true, text: 'Required' },
      slots: { default: '<strong>Custom message</strong>' },
    })
    expect(wrapper.find('strong').text()).toBe('Custom message')
    expect(wrapper.text()).not.toContain('Required')
  })

  it('renders nothing when invalid with no text and no slot', () => {
    // An empty region would be an aria-describedby target with nothing to
    // announce, so having no message to show is treated as having no region.
    const wrapper = mount(FieldFeedback, {
      props: { id: 'email-error', invalid: true },
    })
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
    expect(wrapper.text()).toBe('')
  })

  it('renders when invalid with a slot but no text prop', () => {
    const wrapper = mount(FieldFeedback, {
      props: { id: 'email-error', invalid: true },
      slots: { default: '<strong>Custom message</strong>' },
    })
    expect(wrapper.find('[role="alert"]').exists()).toBe(true)
    expect(wrapper.find('strong').text()).toBe('Custom message')
  })
})
