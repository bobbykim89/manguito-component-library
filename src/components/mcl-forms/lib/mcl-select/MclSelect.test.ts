import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import MclFormGroup from '../mcl-form-group/MclFormGroup.vue'
import type { SelectOptions } from './index.types'
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
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS },
    })
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
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS },
    })
    await open(wrapper)
    expect(
      wrapper.find('input').attributes('aria-activedescendant'),
    ).toBeUndefined()
    await wrapper.find('input').trigger('keydown', { key: 'ArrowDown' })
    expect(wrapper.find('input').attributes('aria-activedescendant')).toBe(
      'colour-option-0',
    )
  })

  it('emits open and close', async () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS },
    })
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
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS },
    })
    const caret = wrapper.find('button[data-mcl="caret"]')
    expect(caret.exists()).toBe(true)
    expect(caret.attributes('type')).toBe('button')
    expect(caret.attributes('tabindex')).toBe('-1')
    expect(caret.attributes('aria-label')).toBeTruthy()
  })

  it('toggles the listbox from the caret', async () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS },
    })
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

  it('returns focus to the combobox after clearing', async () => {
    // The clear button's own `v-if` destroys it as a direct result of
    // activating it, which drops focus to <body>.
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS, modelValue: 'Red' },
      attachTo: document.body,
    })
    const input = wrapper.find('input[role="combobox"]').element
    await wrapper.find('button[data-mcl="clear"]').trigger('click')
    await nextTick()
    expect(wrapper.find('button[data-mcl="clear"]').exists()).toBe(false)
    expect(document.activeElement).toBe(input)
    wrapper.unmount()
  })
})

describe('MclSelect — selection', () => {
  it('selects on click and emits select and changed', async () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS },
    })
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
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS },
    })
    await open(wrapper)
    await wrapper.find('input').trigger('keydown', { key: 'ArrowDown' })
    await wrapper.find('input').trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('select')![0]).toEqual(['Red'])
  })

  it('closes the listbox after selecting', async () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS },
    })
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
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS },
    })
    await open(wrapper)
    await wrapper.find('input').setValue('re')
    expect(wrapper.findAll('[role="option"]')).toHaveLength(2)
  })

  it('does not throw on a regex metacharacter', async () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS },
    })
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

  it('gives the no-match region the id aria-controls names', async () => {
    // aria-expanded stays true with nothing matching, so the element
    // aria-controls names has to be the one that is actually on screen.
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS },
    })
    await open(wrapper)
    await wrapper.find('input').setValue('zzz')
    expect(wrapper.find('input').attributes('aria-controls')).toBe(
      'colour-listbox',
    )
    // The box carries the id inside the always-rendered status region (#130).
    expect(wrapper.find('[role="status"] #colour-listbox').exists()).toBe(true)
  })
})

describe('MclSelect — field context and validation', () => {
  it('generates an id when none is given', () => {
    expect(
      mount(MclSelect, { props: { options: OPTIONS } })
        .find('input')
        .attributes('id'),
    ).toBeTruthy()
  })

  it('renders its own error region and points at it', () => {
    const wrapper = mount(MclSelect, {
      props: {
        id: 'colour',
        options: OPTIONS,
        invalid: true,
        invalidFeedback: 'Pick one',
      },
    })
    expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
    expect(wrapper.find('input').attributes('aria-describedby')).toBe(
      'colour-error',
    )
    expect(wrapper.find('[role="alert"]').text()).toBe('Pick one')
  })

  it('defers to the group error region', () => {
    const wrapper = mount(MclFormGroup, {
      props: {
        fieldId: 'colour',
        label: 'Colour',
        invalid: true,
        invalidFeedback: 'Group',
      },
      slots: {
        default: () =>
          h(MclSelect, { options: OPTIONS, invalidFeedback: 'Mine' }),
      },
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
    expect(
      wrapper.find('button[data-mcl="caret"]').attributes('disabled'),
    ).toBeDefined()
  })
})

describe('MclSelect — a stale active index', () => {
  it('does not commit when the query narrows below the active option', async () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS },
    })
    await open(wrapper)
    const input = wrapper.find('input')
    await input.setValue('re')
    await input.trigger('keydown', { key: 'ArrowDown' })
    await input.trigger('keydown', { key: 'ArrowDown' })
    // 'red' leaves one option, so the highlight at index 1 no longer exists.
    await input.setValue('red')
    await input.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('select')).toBeFalsy()
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('does not commit, or name an option, when nothing matches', async () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS },
    })
    await open(wrapper)
    const input = wrapper.find('input')
    await input.setValue('re')
    await input.trigger('keydown', { key: 'ArrowDown' })
    await input.setValue('rezzz')
    expect(wrapper.findAll('[role="option"]')).toHaveLength(0)
    expect(
      wrapper.find('input').attributes('aria-activedescendant'),
    ).toBeUndefined()
    await input.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('select')).toBeFalsy()
  })

  it('does not commit when the parent replaces the options mid-navigation', async () => {
    // The dependent-select pattern: options arrive or change while the list is
    // open and the user has already moved the highlight.
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS },
    })
    await open(wrapper)
    const input = wrapper.find('input')
    await input.trigger('keydown', { key: 'ArrowDown' })
    await input.trigger('keydown', { key: 'ArrowDown' })
    await input.trigger('keydown', { key: 'ArrowDown' })
    await wrapper.setProps({ options: ['Red'] })
    await input.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('select')).toBeFalsy()
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })
})

describe('MclSelect — closing without selecting', () => {
  it('restores the display label when closed from the caret', async () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS, modelValue: 'Blue' },
    })
    await open(wrapper)
    await wrapper.find('input').setValue('re')
    await wrapper.find('button[data-mcl="caret"]').trigger('click')
    await nextTick()
    expect(wrapper.find('input').element.value).toBe('Blue')
    expect(wrapper.emitted('clear')).toBeFalsy()
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('restores the display label on Escape', async () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS, modelValue: 'Blue' },
    })
    await open(wrapper)
    await wrapper.find('input').setValue('re')
    await wrapper.find('input').trigger('keydown', { key: 'Escape' })
    await nextTick()
    expect(wrapper.find('input').element.value).toBe('Blue')
  })

  it('restores the display label when the user clicks outside', async () => {
    const wrapper = mount(MclSelect, {
      attachTo: document.body,
      props: { id: 'colour', options: OPTIONS, modelValue: 'Blue' },
    })
    await open(wrapper)
    await wrapper.find('input').setValue('re')
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()
    expect(wrapper.find('input').element.value).toBe('Blue')
    expect(wrapper.find('[role="listbox"]').exists()).toBe(false)
    wrapper.unmount()
  })

  it('drops the filter when the list is reopened', async () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS },
    })
    await open(wrapper)
    await wrapper.find('input').setValue('re')
    expect(wrapper.findAll('[role="option"]')).toHaveLength(2)
    const caret = wrapper.find('button[data-mcl="caret"]')
    await caret.trigger('click')
    await caret.trigger('click')
    await nextTick()
    expect(wrapper.find('input').element.value).toBe('')
    expect(wrapper.findAll('[role="option"]')).toHaveLength(3)
  })
})

describe('MclSelect — disabled while open', () => {
  it('closes the listbox when the field becomes disabled', async () => {
    // A form disabling itself on submit must not leave a committable list open.
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS },
    })
    await open(wrapper)
    expect(wrapper.find('[role="listbox"]').exists()).toBe(true)
    await wrapper.setProps({ disabled: true })
    await nextTick()
    expect(wrapper.find('[role="listbox"]').exists()).toBe(false)
  })
})

describe('MclSelect — dropdown slot', () => {
  it('exposes an option-id builder so slot content can be referenced', async () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS },
      slots: {
        dropdown: (slotProps: { optionId: (index: number) => string }) =>
          h('li', { id: slotProps.optionId(1), role: 'option' }, 'Custom'),
      },
    })
    await open(wrapper)
    expect(wrapper.find('[role="option"]').attributes('id')).toBe(
      'colour-option-1',
    )
  })
})

describe('MclSelect — the submitted name', () => {
  const OBJECT_OPTIONS = [
    { text: 'Red', value: 1 },
    { text: 'Green', value: 2 },
  ]

  it('keeps name off the combobox, whose value is a display label', () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', name: 'colour', options: OBJECT_OPTIONS },
    })
    expect(
      wrapper.find('input[role="combobox"]').attributes('name'),
    ).toBeUndefined()
  })

  it('submits the model value rather than the visible label', () => {
    const wrapper = mount(MclSelect, {
      props: {
        id: 'colour',
        name: 'colour',
        options: OBJECT_OPTIONS,
        modelValue: 2,
      },
    })
    // What the user sees.
    expect(
      (wrapper.find('input[role="combobox"]').element as HTMLInputElement)
        .value,
    ).toBe('Green')
    // What the server gets.
    const hidden = wrapper.find('input[type="hidden"]')
    expect(hidden.attributes('name')).toBe('colour')
    expect((hidden.element as HTMLInputElement).value).toBe('2')
  })

  it('submits the string itself for string options', () => {
    const hidden = mount(MclSelect, {
      props: {
        id: 'colour',
        name: 'colour',
        options: OPTIONS,
        modelValue: 'Green',
      },
    }).find('input[type="hidden"]')
    expect((hidden.element as HTMLInputElement).value).toBe('Green')
  })

  it('submits an empty value while nothing is selected', () => {
    const hidden = mount(MclSelect, {
      props: { id: 'colour', name: 'colour', options: OBJECT_OPTIONS },
    }).find('input[type="hidden"]')
    expect((hidden.element as HTMLInputElement).value).toBe('')
  })

  it('tracks a selection made through the listbox', async () => {
    // No `modelValue` prop, so defineModel keeps the value locally and the
    // hidden input has to follow the commit on its own.
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', name: 'colour', options: OBJECT_OPTIONS },
    })
    await open(wrapper)
    await wrapper.findAll('[role="option"]')[1].trigger('click')
    await nextTick()
    expect(
      (wrapper.find('input[type="hidden"]').element as HTMLInputElement).value,
    ).toBe('2')
    expect(
      (wrapper.find('input[role="combobox"]').element as HTMLInputElement)
        .value,
    ).toBe('Green')
  })

  it('renders no hidden input at all without a name', () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OBJECT_OPTIONS, modelValue: 2 },
    })
    expect(wrapper.find('input[type="hidden"]').exists()).toBe(false)
  })

  it('uses the name inherited from the group, which defaults to its fieldId', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'colour', label: 'Colour' },
      slots: {
        default: () => h(MclSelect, { options: OBJECT_OPTIONS, modelValue: 2 }),
      },
    })
    const hidden = wrapper.find('input[type="hidden"]')
    expect(hidden.attributes('name')).toBe('colour')
    expect((hidden.element as HTMLInputElement).value).toBe('2')
  })
})

describe('MclSelect — options arriving after the model', () => {
  it('resolves the label once the options load', async () => {
    // The ordinary edit-form sequence: a preselected id, options fetched after
    // mount. The box showed the raw value indefinitely before this.
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: [] as SelectOptions, modelValue: 2 },
    })
    const input = wrapper.find('input[role="combobox"]')
    expect((input.element as HTMLInputElement).value).toBe('2')
    await wrapper.setProps({
      options: [
        { text: 'Red', value: 1 },
        { text: 'Green', value: 2 },
      ],
    })
    expect((input.element as HTMLInputElement).value).toBe('Green')
  })

  it('leaves a live filter query alone when the options change', async () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS },
    })
    await open(wrapper)
    const input = wrapper.find('input[role="combobox"]')
    await input.setValue('gre')
    await wrapper.setProps({ options: [...OPTIONS, 'Grey'] })
    expect((input.element as HTMLInputElement).value).toBe('gre')
  })
})

describe('MclSelect — re-focusing an open listbox', () => {
  it('keeps the highlight when the input is focused again', async () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS },
    })
    await open(wrapper)
    const input = wrapper.find('input[role="combobox"]')
    await input.trigger('keydown', { key: 'ArrowDown' })
    expect(input.attributes('aria-activedescendant')).toBe('colour-option-0')
    await input.trigger('focus')
    await nextTick()
    expect(input.attributes('aria-activedescendant')).toBe('colour-option-0')
    expect(wrapper.find('[role="listbox"]').exists()).toBe(true)
  })
})

// #122: the shared keyboard focus ring goes on the visible box when its text
// input has focus, and on the clear button as its own tab stop.
describe('MclSelect — focus ring', () => {
  const box = (wrapper: any) =>
    wrapper.find('[role="combobox"]').element.parentElement as HTMLElement

  it('rings the visible box when its text input has keyboard focus', () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS },
    })
    expect(box(wrapper).className).toContain(
      'has-[input:focus-visible]:mcl-focus-ring',
    )
  })

  it('gives the clear button its own focus ring', async () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS },
    })
    await wrapper.find('[role="combobox"]').setValue('re')
    expect(wrapper.find('[data-mcl="clear"]').classes()).toContain(
      'focus-visible:mcl-focus-ring',
    )
  })

  it('no longer adds a border-coloured ring while open without the highlight bar', async () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS, showHighlight: false },
    })
    await open(wrapper)
    expect(wrapper.find('[role="listbox"]').exists()).toBe(true)
    expect(box(wrapper).className).not.toMatch(/\bring-4\b|ring-light-4/)
  })
})

// #130: attributes reach the focusable element; class and style stay on the wrapper.
describe('MclSelect — attribute passthrough (#130)', () => {
  it('forwards aria-label and title to the focusable element and keeps class on the wrapper', () => {
    const wrapper = mount(MclSelect, {
      props: { options: ['a', 'b'] },
      attrs: {
        'aria-label': 'Named',
        title: 'Tip',
        class: 'w-1/2',
        'data-testid': 'ctl',
      },
    })
    const control = wrapper.get('[role="combobox"]')
    expect(control.attributes('aria-label')).toBe('Named')
    expect(control.attributes('title')).toBe('Tip')
    expect(control.attributes('data-testid')).toBe('ctl')
    expect(wrapper.classes()).toContain('w-1/2')
    expect(wrapper.attributes('aria-label')).toBeUndefined()
    expect(wrapper.attributes('title')).toBeUndefined()
  })

  it('inside a labelled form group, the control has aria-labelledby = the group label id', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'grp', label: 'Group' },
      slots: { default: () => h(MclSelect, { options: ['a', 'b'] }) },
    })
    expect(wrapper.get('label').attributes('id')).toBe('grp-label')
    expect(wrapper.get('[role="combobox"]').attributes('aria-labelledby')).toBe(
      'grp-label',
    )
  })
})

// #130: opening on the chosen option, aria-selected following the highlight,
// a named popup and an announced no-match.
describe('MclSelect — opening on the chosen option (#130)', () => {
  const input = (wrapper: any) => wrapper.find('input')
  const optionStates = (wrapper: any) =>
    wrapper
      .findAll('[role="option"]')
      .map((o: any) => o.attributes('aria-selected'))

  it('opening on focus with a chosen value highlights that option: activeIndex, aria-activedescendant and aria-selected=true on it only', async () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS, modelValue: 'Green' },
    })
    await open(wrapper)
    await nextTick()
    expect(input(wrapper).attributes('aria-activedescendant')).toBe(
      'colour-option-1',
    )
    expect(optionStates(wrapper)).toEqual(['false', 'true', 'false'])
  })

  it('opening with ArrowDown while a value is chosen also starts on the chosen option', async () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS, modelValue: 'Blue' },
    })
    await input(wrapper).trigger('keydown', { key: 'ArrowDown' })
    await nextTick()
    await nextTick()
    expect(input(wrapper).attributes('aria-expanded')).toBe('true')
    expect(input(wrapper).attributes('aria-activedescendant')).toBe(
      'colour-option-2',
    )
  })

  it('reopening after a filter session still starts on the chosen option', async () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS, modelValue: 'Green' },
    })
    await open(wrapper)
    await input(wrapper).setValue('Bl')
    await input(wrapper).trigger('keydown', { key: 'Escape' })
    await input(wrapper).trigger('keydown', { key: 'ArrowDown' })
    await nextTick()
    await nextTick()
    expect(wrapper.findAll('[role="option"]')).toHaveLength(3)
    expect(input(wrapper).attributes('aria-activedescendant')).toBe(
      'colour-option-1',
    )
  })

  it('with no value, opening highlights nothing (aria-activedescendant absent)', async () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS },
    })
    await open(wrapper)
    await nextTick()
    expect(input(wrapper).attributes('aria-activedescendant')).toBeUndefined()
    expect(optionStates(wrapper)).toEqual(['false', 'false', 'false'])
  })

  it('ArrowDown from the chosen option moves to the next one', async () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS, modelValue: 'Red' },
    })
    await open(wrapper)
    await nextTick()
    await input(wrapper).trigger('keydown', { key: 'ArrowDown' })
    expect(input(wrapper).attributes('aria-activedescendant')).toBe(
      'colour-option-1',
    )
  })

  it('aria-selected follows the highlighted option as it moves, and is "false" on the rest', async () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS, modelValue: 'Red' },
    })
    await open(wrapper)
    await nextTick()
    await input(wrapper).trigger('keydown', { key: 'ArrowDown' })
    await input(wrapper).trigger('keydown', { key: 'ArrowDown' })
    expect(optionStates(wrapper)).toEqual(['false', 'false', 'true'])
  })
})

describe('MclSelect — popup name and status region (#130)', () => {
  const inGroup = (attrs: Record<string, unknown> = {}) =>
    mount(MclFormGroup, {
      props: { fieldId: 'grp', label: 'Colour' },
      slots: { default: () => h(MclSelect, { options: OPTIONS, ...attrs }) },
    })

  it('the listbox is named: consumer aria-label > consumer aria-labelledby > group label id', async () => {
    const byGroup = inGroup()
    await open(byGroup)
    expect(byGroup.get('[role="listbox"]').attributes('aria-labelledby')).toBe(
      'grp-label',
    )

    const byLabelledBy = inGroup({ 'aria-labelledby': 'mine' })
    await open(byLabelledBy)
    expect(
      byLabelledBy.get('[role="listbox"]').attributes('aria-labelledby'),
    ).toBe('mine')

    const byLabel = inGroup({ 'aria-label': 'Fruit' })
    await open(byLabel)
    const listbox = byLabel.get('[role="listbox"]')
    expect(listbox.attributes('aria-label')).toBe('Fruit')
    expect(listbox.attributes('aria-labelledby')).toBeUndefined()
  })

  it('the no-match box carries no name: it is a generic element, which ARIA does not let be named', async () => {
    const wrapper = inGroup()
    await open(wrapper)
    await wrapper.find('input').setValue('zzz')
    const box = wrapper.get('#grp-listbox')
    expect(box.attributes('role')).toBeUndefined()
    expect(box.attributes('aria-labelledby')).toBeUndefined()
    expect(box.attributes('aria-label')).toBeUndefined()
  })

  it('a role=status container exists before the list opens, and the no-match text appears inside it', async () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS, noMatchText: 'Nothing found.' },
    })
    const status = wrapper.get('[role="status"]')
    expect(status.text()).toBe('')
    await open(wrapper)
    await wrapper.find('input').setValue('zzz')
    expect(wrapper.get('[role="status"]').element).toBe(status.element)
    expect(status.text()).toBe('Nothing found.')
  })

  it('highlight bar has motion-reduce:before:transition-none and the caret has motion-reduce:transition-none', () => {
    const wrapper = mount(MclSelect, { props: { options: OPTIONS } })
    expect(wrapper.get('.relative.-top-1').classes()).toContain(
      'motion-reduce:before:transition-none',
    )
    expect(wrapper.get('[data-mcl="caret"] svg').classes()).toContain(
      'motion-reduce:transition-none',
    )
  })
})
