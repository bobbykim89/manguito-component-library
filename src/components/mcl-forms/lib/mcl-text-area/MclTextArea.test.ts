import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import MclFormGroup from '../mcl-form-group/MclFormGroup.vue'
import MclTextArea from './MclTextArea.vue'

describe('MclTextArea — basics', () => {
  it('renders a textarea with a generated id and default rows', () => {
    const ta = mount(MclTextArea).find('textarea')
    expect(ta.exists()).toBe(true)
    expect(ta.attributes('id')).toBeTruthy()
    expect(ta.attributes('rows')).toBe('5')
  })

  it('honours an explicit rows value', () => {
    expect(
      mount(MclTextArea, { props: { rows: 12 } }).find('textarea').attributes('rows'),
    ).toBe('12')
  })

  it('updates the model on input', async () => {
    const wrapper = mount(MclTextArea, { props: { id: 'bio', modelValue: '' } })
    await wrapper.find('textarea').setValue('hello')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['hello'])
  })

  it('applies the surface classes and the peer class', () => {
    const ta = mount(MclTextArea, {
      props: { id: 'bio', bgColor: 'light-1', showShadow: true },
    }).find('textarea')
    expect(ta.classes()).toContain('mcl-bg-light-1')
    expect(ta.classes()).toContain('shadow-md')
    expect(ta.classes()).toContain('peer')
  })

  it('carries no dead input__text class', () => {
    // Defined nowhere in the repo; a leftover from before Tailwind v4.
    expect(mount(MclTextArea, { props: { id: 'bio' } }).html()).not.toContain('input__text')
  })

  it('binds name, placeholder, required and disabled', () => {
    const ta = mount(MclTextArea, {
      props: { id: 'bio', name: 'bio', placeholder: 'About you', required: true, disabled: true },
    }).find('textarea')
    expect(ta.attributes('name')).toBe('bio')
    expect(ta.attributes('placeholder')).toBe('About you')
    expect(ta.attributes('required')).toBeDefined()
    expect(ta.attributes('disabled')).toBeDefined()
  })
})

describe('MclTextArea — validation (new in this release)', () => {
  it('renders an error region and points at it', () => {
    // The component previously accepted aria-invalid with nowhere to point.
    const wrapper = mount(MclTextArea, {
      props: { id: 'bio', invalid: true, invalidFeedback: 'Too short' },
    })
    const ta = wrapper.find('textarea')
    expect(ta.attributes('aria-invalid')).toBe('true')
    expect(ta.attributes('aria-describedby')).toBe('bio-error')
    const alert = wrapper.find('[role="alert"]')
    expect(alert.attributes('id')).toBe('bio-error')
    expect(alert.text()).toBe('Too short')
  })

  it('renders no error region while valid', () => {
    const wrapper = mount(MclTextArea, {
      props: { id: 'bio', invalidFeedback: 'Too short' },
    })
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
    expect(wrapper.find('textarea').attributes('aria-invalid')).toBeUndefined()
  })

  it('inserts the alert on becoming invalid', async () => {
    const wrapper = mount(MclTextArea, {
      props: { id: 'bio', invalid: false, invalidFeedback: 'Too short' },
    })
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
    await wrapper.setProps({ invalid: true })
    expect(wrapper.find('[role="alert"]').exists()).toBe(true)
  })

  it('prefers the invalid-feedback slot', () => {
    const wrapper = mount(MclTextArea, {
      props: { id: 'bio', invalid: true, invalidFeedback: 'Ignored' },
      slots: { 'invalid-feedback': '<b>Custom</b>' },
    })
    expect(wrapper.find('[role="alert"]').text()).toBe('Custom')
  })
})

describe('MclTextArea — inside a group', () => {
  it('takes the group id and defers to the group error region', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'bio', label: 'Bio', invalid: true, invalidFeedback: 'Group' },
      slots: { default: () => h(MclTextArea, { invalidFeedback: 'Mine' }) },
    })
    expect(wrapper.find('textarea').attributes('id')).toBe('bio')
    const alerts = wrapper.findAll('[role="alert"]')
    expect(alerts).toHaveLength(1)
    expect(alerts[0].text()).toBe('Group')
  })

  it('inherits disabled', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'bio', label: 'Bio', disabled: true },
      slots: { default: () => h(MclTextArea) },
    })
    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined()
  })

  it('includes the description id in describedby', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'bio', label: 'Bio', helpText: 'Keep it short.' },
      slots: { default: () => h(MclTextArea) },
    })
    expect(wrapper.find('textarea').attributes('aria-describedby')).toBe('bio-description')
  })
})
