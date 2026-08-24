import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import MclFormGroup from '../mcl-form-group/MclFormGroup.vue'
import MclSelect from './MclSelect.vue'

const OPTIONS = ['Red', 'Green', 'Blue']

const open = async (wrapper: any) => {
  await wrapper.find('input').trigger('focus')
  await nextTick()
}

describe('MclSelect — combobox wiring', () => {
  it('renders a combobox input with the listbox wiring', () => {
    const input = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS },
    }).find('input')
    expect(input.attributes('role')).toBe('combobox')
    expect(input.attributes('aria-autocomplete')).toBe('list')
    expect(input.attributes('aria-expanded')).toBe('false')
    expect(input.attributes('aria-controls')).toBe('colour-listbox')
  })

  it('binds required as aria-required', () => {
    // The prop was accepted and never used before this rewrite.
    const input = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS, required: true },
    }).find('input')
    expect(input.attributes('aria-required')).toBe('true')
  })

  it('opens on focus and reports expanded', async () => {
    const wrapper = mount(MclSelect, { props: { id: 'colour', options: OPTIONS } })
    await open(wrapper)
    expect(wrapper.find('input').attributes('aria-expanded')).toBe('true')
    const listbox = wrapper.find('[role="listbox"]')
    expect(listbox.exists()).toBe(true)
    expect(listbox.attributes('id')).toBe('colour-listbox')
    expect(wrapper.findAll('[role="option"]')).toHaveLength(3)
  })

  it('gives each option a stable id and an aria-selected state', async () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS, modelValue: 'Green' },
    })
    await open(wrapper)
    const options = wrapper.findAll('[role="option"]')
    expect(options[0].attributes('id')).toBe('colour-option-0')
    expect(options[1].attributes('aria-selected')).toBe('true')
    expect(options[0].attributes('aria-selected')).toBe('false')
  })

  it('shows every option when opened with a value already selected', async () => {
    // The seeded label is a display value, not a filter: opening must not
    // narrow the list to the one option whose text happens to match.
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS, modelValue: 'Green' },
    })
    expect(wrapper.find('input').element.value).toBe('Green')
    await open(wrapper)
    expect(wrapper.findAll('[role="option"]')).toHaveLength(3)
  })

  it('sets no aria-activedescendant until the user moves', async () => {
    const wrapper = mount(MclSelect, { props: { id: 'colour', options: OPTIONS } })
    await open(wrapper)
    expect(wrapper.find('input').attributes('aria-activedescendant')).toBeUndefined()
    await wrapper.find('input').trigger('keydown', { key: 'ArrowDown' })
    expect(wrapper.find('input').attributes('aria-activedescendant')).toBe(
      'colour-option-0',
    )
  })

  it('emits open and close', async () => {
    const wrapper = mount(MclSelect, { props: { id: 'colour', options: OPTIONS } })
    await open(wrapper)
    expect(wrapper.emitted('open')).toBeTruthy()
    await wrapper.find('input').trigger('keydown', { key: 'Escape' })
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})

describe('MclSelect — controls are buttons', () => {
  it('renders the caret as a button outside the tab order', async () => {
    // Previously a <div @click>: not focusable, no accessible name. It stays
    // out of the tab order because the input already owns aria-expanded.
    const wrapper = mount(MclSelect, { props: { id: 'colour', options: OPTIONS } })
    const caret = wrapper.find('button[data-mcl="caret"]')
    expect(caret.exists()).toBe(true)
    expect(caret.attributes('type')).toBe('button')
    expect(caret.attributes('tabindex')).toBe('-1')
    expect(caret.attributes('aria-label')).toBeTruthy()
  })

  it('toggles the listbox from the caret', async () => {
    const wrapper = mount(MclSelect, { props: { id: 'colour', options: OPTIONS } })
    await wrapper.find('button[data-mcl="caret"]').trigger('click')
    expect(wrapper.find('[role="listbox"]').exists()).toBe(true)
  })

  it('renders a focusable, labelled clear button once there is a value', async () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS, modelValue: 'Red' },
    })
    const clear = wrapper.find('button[data-mcl="clear"]')
    expect(clear.exists()).toBe(true)
    expect(clear.attributes('type')).toBe('button')
    expect(clear.attributes('tabindex')).toBeUndefined()
    expect(clear.attributes('aria-label')).toBeTruthy()
  })

  it('clears the model and emits clear', async () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS, modelValue: 'Red' },
    })
    await wrapper.find('button[data-mcl="clear"]').trigger('click')
    expect(wrapper.emitted('clear')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')!.at(-1)).toEqual([null])
  })
})

describe('MclSelect — selection', () => {
  it('selects on click and emits select and changed', async () => {
    const wrapper = mount(MclSelect, { props: { id: 'colour', options: OPTIONS } })
    await open(wrapper)
    await wrapper.findAll('[role="option"]')[1].trigger('click')
    expect(wrapper.emitted('select')![0]).toEqual(['Green'])
    expect(wrapper.emitted('update:modelValue')!.at(-1)).toEqual(['Green'])
  })

  it('selects object options by their value', async () => {
    const wrapper = mount(MclSelect, {
      props: {
        id: 'colour',
        options: [
          { text: 'Red', value: 1 },
          { text: 'Green', value: 2 },
        ],
      },
    })
    await open(wrapper)
    await wrapper.findAll('[role="option"]')[1].trigger('click')
    expect(wrapper.emitted('select')![0]).toEqual([2])
  })

  it('selects the active option on Enter', async () => {
    const wrapper = mount(MclSelect, { props: { id: 'colour', options: OPTIONS } })
    await open(wrapper)
    await wrapper.find('input').trigger('keydown', { key: 'ArrowDown' })
    await wrapper.find('input').trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('select')![0]).toEqual(['Red'])
  })

  it('closes the listbox after selecting', async () => {
    const wrapper = mount(MclSelect, { props: { id: 'colour', options: OPTIONS } })
    await open(wrapper)
    await wrapper.findAll('[role="option"]')[0].trigger('click')
    await nextTick()
    expect(wrapper.find('[role="listbox"]').exists()).toBe(false)
  })
})

describe('MclSelect — Escape semantics', () => {
  it('the first Escape closes and keeps the value', async () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS, modelValue: 'Red' },
    })
    await open(wrapper)
    await wrapper.find('input').trigger('keydown', { key: 'Escape' })
    await nextTick()
    expect(wrapper.find('[role="listbox"]').exists()).toBe(false)
    expect(wrapper.emitted('clear')).toBeFalsy()
  })

  it('a second Escape while closed clears', async () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS, modelValue: 'Red' },
    })
    await open(wrapper)
    await wrapper.find('input').trigger('keydown', { key: 'Escape' })
    await wrapper.find('input').trigger('keydown', { key: 'Escape' })
    expect(wrapper.emitted('clear')).toBeTruthy()
  })
})

describe('MclSelect — filtering and no-match', () => {
  it('filters as the query is typed', async () => {
    const wrapper = mount(MclSelect, { props: { id: 'colour', options: OPTIONS } })
    await open(wrapper)
    await wrapper.find('input').setValue('re')
    expect(wrapper.findAll('[role="option"]')).toHaveLength(2)
  })

  it('does not throw on a regex metacharacter', async () => {
    const wrapper = mount(MclSelect, { props: { id: 'colour', options: OPTIONS } })
    await open(wrapper)
    await expect(wrapper.find('input').setValue('(')).resolves.not.toThrow()
  })

  it('announces no-match through role=status, not as an option', async () => {
    // An <li aria-live> inside role="listbox" is announced as selectable.
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS, noMatchText: 'Nothing found.' },
    })
    await open(wrapper)
    await wrapper.find('input').setValue('zzz')
    const status = wrapper.find('[role="status"]')
    expect(status.exists()).toBe(true)
    expect(status.text()).toBe('Nothing found.')
    expect(wrapper.findAll('[role="option"]')).toHaveLength(0)
  })
})

describe('MclSelect — field context and validation', () => {
  it('generates an id when none is given', () => {
    expect(mount(MclSelect, { props: { options: OPTIONS } }).find('input').attributes('id'))
      .toBeTruthy()
  })

  it('renders its own error region and points at it', () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS, invalid: true, invalidFeedback: 'Pick one' },
    })
    expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
    expect(wrapper.find('input').attributes('aria-describedby')).toBe('colour-error')
    expect(wrapper.find('[role="alert"]').text()).toBe('Pick one')
  })

  it('defers to the group error region', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'colour', label: 'Colour', invalid: true, invalidFeedback: 'Group' },
      slots: { default: () => h(MclSelect, { options: OPTIONS, invalidFeedback: 'Mine' }) },
    })
    const alerts = wrapper.findAll('[role="alert"]')
    expect(alerts).toHaveLength(1)
    expect(alerts[0].text()).toBe('Group')
  })

  it('inherits disabled and disables the input and controls', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'colour', label: 'Colour', disabled: true },
      slots: { default: () => h(MclSelect, { options: OPTIONS }) },
    })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    expect(wrapper.find('button[data-mcl="caret"]').attributes('disabled')).toBeDefined()
  })
})
