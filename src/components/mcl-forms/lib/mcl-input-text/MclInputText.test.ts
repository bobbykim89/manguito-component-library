import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import MclFormGroup from '../mcl-form-group/MclFormGroup.vue'
import MclInputText from './MclInputText.vue'

describe('MclInputText — basics', () => {
  it('renders a text input with a generated id when none is given', () => {
    const input = mount(MclInputText).find('input')
    expect(input.attributes('type')).toBe('text')
    expect(input.attributes('id')).toBeTruthy()
  })

  it('accepts the widened input types', () => {
    const input = mount(MclInputText, { props: { type: 'search' } }).find('input')
    expect(input.attributes('type')).toBe('search')
  })

  it('binds name, autocomplete, placeholder and the constraint attributes', () => {
    const input = mount(MclInputText, {
      props: {
        id: 'email',
        name: 'email',
        autocomplete: 'email',
        placeholder: 'you@example.com',
        minLength: 3,
        maxLength: 40,
        pattern: '.+@.+',
      },
    }).find('input')
    expect(input.attributes('name')).toBe('email')
    expect(input.attributes('autocomplete')).toBe('email')
    expect(input.attributes('placeholder')).toBe('you@example.com')
    expect(input.attributes('minlength')).toBe('3')
    expect(input.attributes('maxlength')).toBe('40')
    expect(input.attributes('pattern')).toBe('.+@.+')
  })

  it('updates the model on input', async () => {
    const wrapper = mount(MclInputText, { props: { id: 'email', modelValue: '' } })
    await wrapper.find('input').setValue('hello')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['hello'])
  })

  it('applies the surface classes', () => {
    const input = mount(MclInputText, {
      props: { id: 'email', bgColor: 'light-1', textColor: 'black', showShadow: true },
    }).find('input')
    expect(input.classes()).toContain('mcl-bg-light-1')
    expect(input.classes()).toContain('text-black')
    expect(input.classes()).toContain('shadow-md')
  })

  it('carries the peer class so the highlight bar reacts to focus', () => {
    expect(mount(MclInputText, { props: { id: 'email' } }).find('input').classes()).toContain(
      'peer',
    )
  })

  it('renders the highlight bar only when showHighlight is true', () => {
    const withBar = mount(MclInputText, { props: { id: 'email', showHighlight: true } })
    const withoutBar = mount(MclInputText, { props: { id: 'email', showHighlight: false } })
    expect(withBar.findAll('div').length).toBeGreaterThan(withoutBar.findAll('div').length)
  })

  it('uses a focus-visible ring when the highlight bar is off', () => {
    const input = mount(MclInputText, {
      props: { id: 'email', showHighlight: false, borderColor: 'primary' },
    }).find('input')
    expect(input.classes()).toContain('focus-visible:ring-primary')
  })
})

describe('MclInputText — validation', () => {
  it('sets no aria-invalid while valid', () => {
    const input = mount(MclInputText, { props: { id: 'email' } }).find('input')
    expect(input.attributes('aria-invalid')).toBeUndefined()
  })

  it('sets aria-invalid and points describedby at its own error region', () => {
    const wrapper = mount(MclInputText, {
      props: { id: 'email', invalid: true, invalidFeedback: 'Required' },
    })
    const input = wrapper.find('input')
    expect(input.attributes('aria-invalid')).toBe('true')
    expect(input.attributes('aria-describedby')).toBe('email-error')
    const alert = wrapper.find('[role="alert"]')
    expect(alert.attributes('id')).toBe('email-error')
    expect(alert.text()).toBe('Required')
  })

  it('renders no error region while valid', () => {
    const wrapper = mount(MclInputText, {
      props: { id: 'email', invalidFeedback: 'Required' },
    })
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  })

  it('inserts the alert on becoming invalid, so role=alert fires', async () => {
    // role="alert" announces on insertion. The old implementation kept the
    // container in the DOM and hid it with CSS, so it never announced.
    const wrapper = mount(MclInputText, {
      props: { id: 'email', invalid: false, invalidFeedback: 'Required' },
    })
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
    await wrapper.setProps({ invalid: true })
    expect(wrapper.find('[role="alert"]').exists()).toBe(true)
  })

  it('prefers the invalid-feedback slot', () => {
    const wrapper = mount(MclInputText, {
      props: { id: 'email', invalid: true, invalidFeedback: 'Ignored' },
      slots: { 'invalid-feedback': '<b>Custom</b>' },
    })
    expect(wrapper.find('[role="alert"]').text()).toBe('Custom')
  })

  it('uses no peer-invalid CSS to drive visibility', () => {
    // Removed on purpose: CSS-driven visibility disagreed with the
    // prop-driven aria wiring, so an error could show with no announcement.
    expect(mount(MclInputText, { props: { id: 'email' } }).html()).not.toContain(
      'peer-invalid',
    )
  })
})

describe('MclInputText — inside a group', () => {
  it('takes the group id and lets the label bind to it', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'email', label: 'Email' },
      slots: { default: () => h(MclInputText) },
    })
    expect(wrapper.find('input').attributes('id')).toBe('email')
    expect(wrapper.find('label').attributes('for')).toBe('email')
  })

  it('defers to the group error region and renders none of its own', () => {
    const wrapper = mount(MclFormGroup, {
      props: {
        fieldId: 'email',
        label: 'Email',
        invalid: true,
        invalidFeedback: 'From the group',
      },
      slots: { default: () => h(MclInputText, { invalidFeedback: 'Mine' }) },
    })
    const alerts = wrapper.findAll('[role="alert"]')
    expect(alerts).toHaveLength(1)
    expect(alerts[0].text()).toBe('From the group')
    expect(wrapper.find('input').attributes('aria-describedby')).toBe('email-error')
  })

  it('points describedby at description then error, in that order', () => {
    const wrapper = mount(MclFormGroup, {
      props: {
        fieldId: 'email',
        label: 'Email',
        helpText: 'We never share it.',
        invalid: true,
        invalidFeedback: 'Required',
      },
      slots: { default: () => h(MclInputText) },
    })
    expect(wrapper.find('input').attributes('aria-describedby')).toBe(
      'email-description email-error',
    )
  })

  it('inherits disabled and required', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'email', label: 'Email', disabled: true, required: true },
      slots: { default: () => h(MclInputText) },
    })
    const input = wrapper.find('input')
    expect(input.attributes('disabled')).toBeDefined()
    expect(input.attributes('required')).toBeDefined()
  })
})
