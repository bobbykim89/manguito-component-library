import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import MclFormGroup from '../mcl-form-group/MclFormGroup.vue'
import MclCheckbox from './MclCheckbox.vue'

describe('MclCheckbox — structure', () => {
  it('renders a native checkbox and an aria-hidden visual box', () => {
    const wrapper = mount(MclCheckbox, { props: { id: 'agree' } })
    const input = wrapper.find('input[type="checkbox"]')
    expect(input.exists()).toBe(true)
    expect(input.attributes('id')).toBe('agree')
    expect(wrapper.find('span[aria-hidden="true"]').exists()).toBe(true)
  })

  it('puts the input before the visual box so peer-* selectors apply', () => {
    // Tailwind's peer-* compiles to a sibling selector, so the input must
    // precede the span in DOM order or none of the visual states work.
    const html = mount(MclCheckbox, { props: { id: 'agree' } }).html()
    expect(html.indexOf('<input')).toBeLessThan(html.indexOf('<span'))
  })

  it('overlays the input at opacity-0 rather than hiding it', () => {
    // sr-only or display:none would remove it as a click target; the whole
    // point is that the native input IS the click and focus target.
    const classes = mount(MclCheckbox, { props: { id: 'agree' } })
      .find('input')
      .classes()
    expect(classes).toContain('peer')
    expect(classes).toContain('opacity-0')
    expect(classes).toContain('absolute')
    expect(classes).not.toContain('sr-only')
  })

  it('gives the visual box a focus-visible ring', () => {
    // This is the WCAG 2.4.7 fix: before the refactor there was no focus
    // indicator of any kind on this control.
    const span = mount(MclCheckbox, { props: { id: 'agree' } }).find('span')
    expect(span.classes().join(' ')).toContain('peer-focus-visible:ring')
  })

  it('exposes no click handler on the visual box', () => {
    // The old implementation forwarded clicks with checkboxRef.click().
    const wrapper = mount(MclCheckbox, { props: { id: 'agree' } })
    expect(wrapper.find('span').attributes('onclick')).toBeUndefined()
  })
})

describe('MclCheckbox — v-model and change', () => {
  it('updates the model when toggled', async () => {
    const wrapper = mount(MclCheckbox, {
      props: { id: 'agree', modelValue: false },
    })
    await wrapper.find('input').setValue(true)
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
  })

  it('reflects the model in the input checked state', () => {
    const wrapper = mount(MclCheckbox, {
      props: { id: 'agree', modelValue: true },
    })
    expect((wrapper.find('input').element as HTMLInputElement).checked).toBe(true)
  })

  it('emits change with the native event', async () => {
    const wrapper = mount(MclCheckbox, { props: { id: 'agree' } })
    await wrapper.find('input').trigger('change')
    const change = wrapper.emitted('change')
    expect(change).toBeTruthy()
    expect(change![0][0]).toBeInstanceOf(Event)
  })

  it('accepts no `checked` prop', () => {
    // Removed: :checked alongside v-model is two sources of truth.
    expect(Object.keys(MclCheckbox.props ?? {})).not.toContain('checked')
  })
})

describe('MclCheckbox — colours and size', () => {
  it('maps dark-4 correctly, unlike the map it replaces', () => {
    // The deleted local map sent dark-4 to bg-dark-1.
    const span = mount(MclCheckbox, {
      props: { id: 'agree', checkedBgColor: 'dark-4' },
    }).find('span')
    expect(span.classes()).toContain('peer-checked:bg-dark-4')
  })

  it('applies indicatorColor to the checkmark', () => {
    const span = mount(MclCheckbox, {
      props: { id: 'agree', indicatorColor: 'white' },
    }).find('span')
    expect(span.classes()).toContain('before:bg-white')
  })

  it('applies the size classes', () => {
    const span = mount(MclCheckbox, { props: { id: 'agree', size: 'lg' } }).find('span')
    expect(span.classes()).toContain('h-md')
    expect(span.classes()).toContain('w-md')
  })
})

describe('MclCheckbox — field context', () => {
  it('generates an id when none is given', () => {
    const id = mount(MclCheckbox).find('input').attributes('id')
    expect(id).toBeTruthy()
    expect(id).not.toBe('')
  })

  it('inherits disabled and required from the group', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'agree', label: 'Agree', disabled: true, required: true },
      slots: { default: () => h(MclCheckbox) },
    })
    const input = wrapper.find('input')
    expect(input.attributes('disabled')).toBeDefined()
    expect(input.attributes('required')).toBeDefined()
  })

  it('an explicit disabled=false overrides an inherited true', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'agree', label: 'Agree', disabled: true },
      slots: { default: () => h(MclCheckbox, { disabled: false }) },
    })
    expect(wrapper.find('input').attributes('disabled')).toBeUndefined()
  })

  it('does not claim an error region it never renders', () => {
    // rendersOwnFeedback: false. A group carrying invalid with no
    // invalidFeedback renders no region, so describedby must stay empty.
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'agree', label: 'Agree', invalid: true },
      slots: { default: () => h(MclCheckbox) },
    })
    expect(wrapper.find('input').attributes('aria-describedby')).toBeUndefined()
  })

  it('points at the group error region when the group owns one', () => {
    const wrapper = mount(MclFormGroup, {
      props: {
        fieldId: 'agree',
        label: 'Agree',
        invalid: true,
        invalidFeedback: 'Required',
      },
      slots: { default: () => h(MclCheckbox) },
    })
    expect(wrapper.find('input').attributes('aria-describedby')).toBe('agree-error')
    expect(wrapper.find('#agree-error').exists()).toBe(true)
  })

  it('binds name and value for native form submission', () => {
    const input = mount(MclCheckbox, {
      props: { id: 'agree', name: 'terms', value: 'yes' },
    }).find('input')
    expect(input.attributes('name')).toBe('terms')
    expect(input.attributes('value')).toBe('yes')
  })

  it('emits no name when neither given nor inherited', () => {
    // A generated name would silently enter form submissions.
    expect(mount(MclCheckbox).find('input').attributes('name')).toBeUndefined()
  })
})
