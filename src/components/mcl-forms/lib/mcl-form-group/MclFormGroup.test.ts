import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { useFieldContext } from '../common/fieldContext'
import type { FieldContext } from '../common/index.types'
import MclFormGroup from './MclFormGroup.vue'

/** A minimal control that reports the context it injected. */
const Probe = defineComponent({
  props: {
    id: { type: String, default: undefined },
    invalid: { type: Boolean, default: undefined },
    required: { type: Boolean, default: undefined },
    disabled: { type: Boolean, default: undefined },
  },
  setup(props) {
    const ctx = useFieldContext(props)
    return { ctx }
  },
  render() {
    return h('input', {
      id: (this.ctx as FieldContext).id,
      'aria-describedby': (this.ctx as FieldContext).describedBy.value,
    })
  },
})

const ctxOf = (wrapper: any): FieldContext =>
  wrapper.findComponent(Probe).vm.ctx as FieldContext

describe('MclFormGroup — single-control (label) mode', () => {
  it('renders a label bound to the generated field id', () => {
    const wrapper = mount(MclFormGroup, {
      props: { label: 'Email' },
      slots: { default: () => h(Probe) },
    })
    const label = wrapper.find('label')
    const input = wrapper.find('input')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('Email')
    expect(label.attributes('for')).toBe(input.attributes('id'))
  })

  it('uses an explicit fieldId for both the label and the control', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'email', label: 'Email' },
      slots: { default: () => h(Probe) },
    })
    expect(wrapper.find('label').attributes('for')).toBe('email')
    expect(wrapper.find('input').attributes('id')).toBe('email')
  })

  it('renders no fieldset in label mode', () => {
    const wrapper = mount(MclFormGroup, {
      props: { label: 'Email' },
      slots: { default: () => h(Probe) },
    })
    expect(wrapper.find('fieldset').exists()).toBe(false)
  })

  it('prefers the label slot over the label prop', () => {
    const wrapper = mount(MclFormGroup, {
      props: { label: 'Ignored' },
      slots: { label: '<span>Custom</span>', default: () => h(Probe) },
    })
    expect(wrapper.find('label').text()).toBe('Custom')
  })
})

describe('MclFormGroup — group (fieldset) mode', () => {
  it('renders a fieldset and legend instead of a label', () => {
    const wrapper = mount(MclFormGroup, {
      props: { groupLabel: true, label: 'Colour' },
      slots: { default: () => [h(Probe), h(Probe)] },
    })
    expect(wrapper.find('fieldset').exists()).toBe(true)
    expect(wrapper.find('legend').text()).toBe('Colour')
    expect(wrapper.find('label').exists()).toBe(false)
  })

  it('gives each control a distinct id', () => {
    const wrapper = mount(MclFormGroup, {
      props: { groupLabel: true, fieldId: 'colour', label: 'Colour' },
      slots: { default: () => [h(Probe), h(Probe), h(Probe)] },
    })
    const ids = wrapper.findAll('input').map((i) => i.attributes('id'))
    expect(new Set(ids).size).toBe(3)
    expect(ids).not.toContain('colour')
  })

  it('publishes isGroupLabel on the context', () => {
    const wrapper = mount(MclFormGroup, {
      props: { groupLabel: true, label: 'Colour' },
      slots: { default: () => h(Probe) },
    })
    expect(ctxOf(wrapper).isGroupLabel).toBe(true)
  })
})

describe('MclFormGroup — help text', () => {
  it('renders help text with the description id and points controls at it', () => {
    const wrapper = mount(MclFormGroup, {
      props: {
        fieldId: 'email',
        label: 'Email',
        helpText: 'We never share it.',
      },
      slots: { default: () => h(Probe) },
    })
    const help = wrapper.find('#email-description')
    expect(help.exists()).toBe(true)
    expect(help.text()).toBe('We never share it.')
    expect(ctxOf(wrapper).descriptionId).toBe('email-description')
  })

  it('renders no description region and no descriptionId without help text', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'email', label: 'Email' },
      slots: { default: () => h(Probe) },
    })
    expect(wrapper.find('#email-description').exists()).toBe(false)
    expect(ctxOf(wrapper).descriptionId).toBeUndefined()
  })

  it('treats a help slot as help text', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'email', label: 'Email' },
      slots: { help: '<em>Slotted</em>', default: () => h(Probe) },
    })
    expect(wrapper.find('#email-description').text()).toBe('Slotted')
  })
})

describe('MclFormGroup — feedback ownership', () => {
  it('owns the region when invalidFeedback is given and renders it when invalid', () => {
    const wrapper = mount(MclFormGroup, {
      props: {
        fieldId: 'email',
        label: 'Email',
        invalid: true,
        invalidFeedback: 'Required',
      },
      slots: { default: () => h(Probe) },
    })
    const alert = wrapper.find('[role="alert"]')
    expect(alert.exists()).toBe(true)
    expect(alert.attributes('id')).toBe('email-error')
    expect(alert.text()).toBe('Required')
    expect(ctxOf(wrapper).feedbackOwnedByGroup).toBe(true)
  })

  it('claims ownership from the slot alone', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'email', label: 'Email', invalid: true },
      slots: { 'invalid-feedback': '<b>Bad</b>', default: () => h(Probe) },
    })
    expect(wrapper.find('[role="alert"]').text()).toBe('Bad')
    expect(ctxOf(wrapper).feedbackOwnedByGroup).toBe(true)
  })

  it('does not claim ownership with neither prop nor slot', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'email', label: 'Email', invalid: true },
      slots: { default: () => h(Probe) },
    })
    expect(ctxOf(wrapper).feedbackOwnedByGroup).toBe(false)
  })

  it('claims ownership even while valid, so the flag never freezes wrong', () => {
    // ownsFeedback is decided from *presence* at setup, never from a current
    // value. Deriving it from "is there an error right now" would freeze it.
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'email', label: 'Email', invalidFeedback: 'Required' },
      slots: { default: () => h(Probe) },
    })
    expect(ctxOf(wrapper).feedbackOwnedByGroup).toBe(true)
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  })
})

describe('MclFormGroup — reactivity through the provider', () => {
  it('propagates a later invalid flip to the control', async () => {
    // The group must pass getters, not values. It builds an object literal
    // (hasHelpText/ownsFeedback come from slot presence), and a literal of
    // plain values would snapshot at setup and never update.
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'email', label: 'Email', invalidFeedback: 'Required' },
      slots: { default: () => h(Probe) },
    })
    expect(ctxOf(wrapper).invalid.value).toBe(false)
    expect(wrapper.find('input').attributes('aria-describedby')).toBeUndefined()

    await wrapper.setProps({ invalid: true })
    expect(ctxOf(wrapper).invalid.value).toBe(true)
    expect(wrapper.find('input').attributes('aria-describedby')).toBe(
      'email-error',
    )
    expect(wrapper.find('[role="alert"]').exists()).toBe(true)
  })

  it('propagates required and disabled flips', async () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'email', label: 'Email' },
      slots: { default: () => h(Probe) },
    })
    expect(ctxOf(wrapper).required.value).toBe(false)
    await wrapper.setProps({ required: true, disabled: true })
    expect(ctxOf(wrapper).required.value).toBe(true)
    expect(ctxOf(wrapper).disabled.value).toBe(true)
  })
})

describe('MclFormGroup — label styling', () => {
  it('applies colour and size classes to the label text', () => {
    const wrapper = mount(MclFormGroup, {
      props: {
        label: 'Email',
        textColor: 'primary',
        textSize: 'lg',
        textBold: true,
      },
      slots: { default: () => h(Probe) },
    })
    const text = wrapper.find('label span')
    expect(text.classes()).toContain('text-primary')
    expect(text.classes()).toContain('font-bold')
  })
})

describe('MclFormGroup — fieldset mode with help text and an error region together', () => {
  it('renders both regions inside the fieldset and wires a control to both', () => {
    const wrapper = mount(MclFormGroup, {
      props: {
        groupLabel: true,
        fieldId: 'colour',
        label: 'Colour',
        invalid: true,
        helpText: 'Pick one.',
        invalidFeedback: 'Required',
      },
      slots: { default: () => h(Probe) },
    })
    const help = wrapper.find('#colour-description')
    expect(help.exists()).toBe(true)
    expect(help.text()).toBe('Pick one.')
    const alert = wrapper.find('[role="alert"]')
    expect(alert.exists()).toBe(true)
    expect(alert.attributes('id')).toBe('colour-error')
    expect(wrapper.find('input').attributes('aria-describedby')).toBe(
      'colour-description colour-error',
    )
  })
})

describe('MclFormGroup — slot-over-prop precedence', () => {
  it('prefers the invalid-feedback slot over the invalidFeedback prop', () => {
    const wrapper = mount(MclFormGroup, {
      props: {
        fieldId: 'email',
        label: 'Email',
        invalid: true,
        invalidFeedback: 'Prop',
      },
      slots: { 'invalid-feedback': '<b>Slotted</b>', default: () => h(Probe) },
    })
    const alert = wrapper.find('[role="alert"]')
    expect(alert.text()).toBe('Slotted')
    expect(alert.text()).not.toContain('Prop')
  })

  it('prefers the help slot over the helpText prop', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'email', label: 'Email', helpText: 'Prop text' },
      slots: { help: '<em>Slotted help</em>', default: () => h(Probe) },
    })
    const help = wrapper.find('#email-description')
    expect(help.text()).toBe('Slotted help')
    expect(help.text()).not.toContain('Prop text')
  })
})

describe('MclFormGroup — presence, not truthiness', () => {
  it('owns the region from invalidFeedback presence even when its value is an empty string', () => {
    // A group bound to `ref('')` (the idiomatic "no error yet" binding) must
    // still claim ownership at setup, or a later non-empty value never finds
    // an error region to render into.
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'email', label: 'Email', invalidFeedback: '' },
      slots: { default: () => h(Probe) },
    })
    expect(ctxOf(wrapper).feedbackOwnedByGroup).toBe(true)
  })
})

describe('MclFormGroup — groupLabel is frozen consistently with the context', () => {
  it('keeps the rendered branch and the published isGroupLabel in agreement after a later groupLabel flip', async () => {
    // isGroupLabel is documented as decided once, at setup, not reactive.
    // The bug this guards against is the branch and the context disagreeing:
    // a later groupLabel flip rendering <fieldset> while the context still
    // reports isGroupLabel: false (or vice versa) is what let every control
    // in the set claim the group's element id verbatim, producing duplicate
    // ids among the fieldset's own children.
    const wrapper = mount(MclFormGroup, {
      props: { groupLabel: false, fieldId: 'g', label: 'Group' },
      slots: { default: () => [h(Probe), h(Probe)] },
    })
    await wrapper.setProps({ groupLabel: true })

    const isFieldset = wrapper.find('fieldset').exists()
    expect(isFieldset).toBe(ctxOf(wrapper).isGroupLabel)

    if (isFieldset) {
      const ids = wrapper.findAll('input').map((i) => i.attributes('id'))
      expect(new Set(ids).size).toBe(ids.length)
    }
  })
})
