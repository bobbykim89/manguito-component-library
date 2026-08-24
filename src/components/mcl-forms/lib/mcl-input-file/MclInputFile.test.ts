import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import MclFormGroup from '../mcl-form-group/MclFormGroup.vue'
import MclInputFile from './MclInputFile.vue'

describe('MclInputFile — structure', () => {
  it('renders a file input and a browse button', () => {
    const wrapper = mount(MclInputFile, { props: { id: 'avatar' } })
    const input = wrapper.find('input[type="file"]')
    expect(input.exists()).toBe(true)
    expect(input.attributes('id')).toBe('avatar')
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.attributes('type')).toBe('button')
    expect(button.attributes('aria-controls')).toBe('avatar')
  })

  it('shows the button text', () => {
    expect(
      mount(MclInputFile, { props: { id: 'avatar', buttonText: 'Pick one' } })
        .find('button')
        .text(),
    ).toBe('Pick one')
  })

  it('binds accept, name, required and disabled', () => {
    const input = mount(MclInputFile, {
      props: {
        id: 'avatar',
        name: 'avatar',
        accept: 'image/png',
        required: true,
        disabled: true,
      },
    }).find('input[type="file"]')
    expect(input.attributes('accept')).toBe('image/png')
    expect(input.attributes('name')).toBe('avatar')
    expect(input.attributes('required')).toBeDefined()
    expect(input.attributes('disabled')).toBeDefined()
  })

  it('renders no clear button unless showClear is set', () => {
    const without = mount(MclInputFile, { props: { id: 'avatar' } })
    expect(without.findAll('button')).toHaveLength(1)
    const with_ = mount(MclInputFile, {
      props: { id: 'avatar', showClear: true },
    })
    expect(with_.findAll('button')).toHaveLength(2)
  })
})

describe('MclInputFile — the clear button', () => {
  const clearButton = (wrapper: any) => wrapper.findAll('button')[1]

  it('is type="button" so it cannot submit a surrounding form', () => {
    // Live bug before this rewrite: no type attribute meant type="submit".
    const wrapper = mount(MclInputFile, {
      props: { id: 'avatar', showClear: true },
    })
    expect(clearButton(wrapper).attributes('type')).toBe('button')
  })

  it('has an accessible name', () => {
    const wrapper = mount(MclInputFile, {
      props: { id: 'avatar', showClear: true },
    })
    expect(clearButton(wrapper).attributes('aria-label')).toBeTruthy()
  })

  it('clears the model exactly once per click', async () => {
    // The handler used to sit on both the wrapping div and the button, so one
    // click fired it twice.
    const file = new File(['x'], 'x.png', { type: 'image/png' })
    const wrapper = mount(MclInputFile, {
      props: { id: 'avatar', showClear: true, modelValue: file },
    })
    await clearButton(wrapper).trigger('click')
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toHaveLength(1)
    expect(emitted![0]).toEqual([null])
  })

  it('remounts the input so the browser clears its value', async () => {
    const file = new File(['x'], 'x.png', { type: 'image/png' })
    const wrapper = mount(MclInputFile, {
      props: { id: 'avatar', showClear: true, modelValue: file },
    })
    const before = wrapper.find('input[type="file"]').element
    await clearButton(wrapper).trigger('click')
    expect(wrapper.find('input[type="file"]').element).not.toBe(before)
  })
})

describe('MclInputFile — validation', () => {
  it('renders an error region and points at it', () => {
    const wrapper = mount(MclInputFile, {
      props: { id: 'avatar', invalid: true, invalidFeedback: 'Pick a file' },
    })
    const input = wrapper.find('input[type="file"]')
    expect(input.attributes('aria-invalid')).toBe('true')
    expect(input.attributes('aria-describedby')).toBe('avatar-error')
    expect(wrapper.find('[role="alert"]').text()).toBe('Pick a file')
  })

  it('renders no error region while valid', () => {
    const wrapper = mount(MclInputFile, {
      props: { id: 'avatar', invalidFeedback: 'Pick a file' },
    })
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  })
})

describe('MclInputFile — inside a group', () => {
  it('takes the group id and inherits disabled', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'avatar', label: 'Avatar', disabled: true },
      slots: { default: () => h(MclInputFile) },
    })
    const input = wrapper.find('input[type="file"]')
    expect(input.attributes('id')).toBe('avatar')
    expect(input.attributes('disabled')).toBeDefined()
  })

  it('defers to the group error region', () => {
    const wrapper = mount(MclFormGroup, {
      props: {
        fieldId: 'avatar',
        label: 'Avatar',
        invalid: true,
        invalidFeedback: 'Group',
      },
      slots: { default: () => h(MclInputFile, { invalidFeedback: 'Mine' }) },
    })
    const alerts = wrapper.findAll('[role="alert"]')
    expect(alerts).toHaveLength(1)
    expect(alerts[0].text()).toBe('Group')
  })
})
