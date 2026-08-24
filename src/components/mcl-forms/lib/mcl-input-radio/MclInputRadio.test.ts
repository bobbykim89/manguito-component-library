import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import MclFormGroup from '../mcl-form-group/MclFormGroup.vue'
import MclInputRadio from './MclInputRadio.vue'

describe('MclInputRadio — structure', () => {
  it('renders a native radio and an aria-hidden visual dot', () => {
    const wrapper = mount(MclInputRadio, { props: { id: 'red', value: 'red' } })
    expect(wrapper.find('input[type="radio"]').exists()).toBe(true)
    expect(wrapper.find('span[aria-hidden="true"]').exists()).toBe(true)
  })

  it('puts the input before the visual dot so peer-* selectors apply', () => {
    const html = mount(MclInputRadio, { props: { id: 'red' } }).html()
    expect(html.indexOf('<input')).toBeLessThan(html.indexOf('<span'))
  })

  it('gives the visual dot a focus-visible ring', () => {
    const span = mount(MclInputRadio, { props: { id: 'red' } }).find('span')
    expect(span.classes().join(' ')).toContain('peer-focus-visible:ring')
  })

  it('stays circular and accepts no rounded prop', () => {
    // Shape is how users tell a radio from a checkbox.
    const wrapper = mount(MclInputRadio, { props: { id: 'red' } })
    expect(wrapper.find('span').classes()).toContain('rounded-full')
    expect(Object.keys(MclInputRadio.props ?? {})).not.toContain('rounded')
  })

  it('accepts no `checked` prop', () => {
    expect(Object.keys(MclInputRadio.props ?? {})).not.toContain('checked')
  })
})

describe('MclInputRadio — v-model', () => {
  it('emits its value on selection', async () => {
    const wrapper = mount(MclInputRadio, {
      props: { id: 'red', value: 'red', modelValue: null },
    })
    await wrapper.find('input').setValue(true)
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['red'])
  })

  it('is checked when the model matches its value', () => {
    const wrapper = mount(MclInputRadio, {
      props: { id: 'red', value: 'red', modelValue: 'red' },
    })
    expect((wrapper.find('input').element as HTMLInputElement).checked).toBe(true)
  })

  it('is unchecked when the model is a different value', () => {
    const wrapper = mount(MclInputRadio, {
      props: { id: 'red', value: 'red', modelValue: 'blue' },
    })
    expect((wrapper.find('input').element as HTMLInputElement).checked).toBe(false)
  })

  it('emits change with the native event', async () => {
    const wrapper = mount(MclInputRadio, { props: { id: 'red', value: 'red' } })
    await wrapper.find('input').trigger('change')
    expect(wrapper.emitted('change')![0][0]).toBeInstanceOf(Event)
  })
})

describe('MclInputRadio — grouping by name', () => {
  it('falls back to its own id when no name is given or inherited', () => {
    // This control is the sole exception to the context's no-id-fallback rule,
    // because name is what makes a radio set behave as one.
    const input = mount(MclInputRadio, { props: { id: 'red', value: 'red' } }).find('input')
    expect(input.attributes('name')).toBe('red')
  })

  it('prefers an explicit name', () => {
    const input = mount(MclInputRadio, {
      props: { id: 'red', name: 'colour', value: 'red' },
    }).find('input')
    expect(input.attributes('name')).toBe('colour')
  })

  it('shares one inherited name across a fieldset group, with distinct ids', () => {
    const wrapper = mount(MclFormGroup, {
      props: { groupLabel: true, fieldId: 'colour', label: 'Colour' },
      slots: {
        default: () => [
          h(MclInputRadio, { value: 'red' }),
          h(MclInputRadio, { value: 'green' }),
          h(MclInputRadio, { value: 'blue' }),
        ],
      },
    })
    const inputs = wrapper.findAll('input')
    expect(inputs).toHaveLength(3)
    expect(inputs.map((i) => i.attributes('name'))).toEqual([
      'colour',
      'colour',
      'colour',
    ])
    const ids = inputs.map((i) => i.attributes('id'))
    expect(new Set(ids).size).toBe(3)
  })
})

describe('MclInputRadio — colours, size, context', () => {
  it('applies the checked background and the indicator colour', () => {
    const span = mount(MclInputRadio, {
      props: { id: 'red', checkedBgColor: 'success', indicatorColor: 'white' },
    }).find('span')
    expect(span.classes()).toContain('peer-checked:bg-success')
    expect(span.classes()).toContain('before:bg-white')
  })

  it('applies the size classes', () => {
    const span = mount(MclInputRadio, { props: { id: 'red', size: 'sm' } }).find('span')
    expect(span.classes()).toContain('h-xs')
  })

  it('inherits disabled from the group', () => {
    const wrapper = mount(MclFormGroup, {
      props: { groupLabel: true, fieldId: 'colour', label: 'Colour', disabled: true },
      slots: { default: () => h(MclInputRadio, { value: 'red' }) },
    })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('does not claim an error region it never renders', () => {
    const wrapper = mount(MclFormGroup, {
      props: { groupLabel: true, fieldId: 'colour', label: 'Colour', invalid: true },
      slots: { default: () => h(MclInputRadio, { value: 'red' }) },
    })
    expect(wrapper.find('input').attributes('aria-describedby')).toBeUndefined()
  })

  it('generates its own element id inside a fieldset rather than taking the group id', () => {
    const wrapper = mount(MclFormGroup, {
      props: { groupLabel: true, fieldId: 'colour', label: 'Colour' },
      slots: { default: () => h(MclInputRadio, { value: 'red' }) },
    })
    const id = wrapper.find('input').attributes('id')
    expect(id).toBeTruthy()
    expect(id).not.toBe('colour')
  })

  it('applies the border colour to the focus ring', () => {
    const span = mount(MclInputRadio, {
      props: { id: 'red', borderColor: 'primary' },
    }).find('span')
    expect(span.classes()).toContain('peer-focus-visible:ring-primary')
  })
})
