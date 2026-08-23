import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h, reactive, type ComputedRef } from 'vue'
import {
  provideFieldContext,
  useFieldContext,
  type FieldProviderOptions,
} from './fieldContext'
import type { FieldContext, FieldOwnProps } from './index.types'

/** Renders nothing; exposes the injected context for assertions. */
// `default: undefined` on the booleans is load-bearing, not incidental: without
// it Vue's boolean casting turns an omitted prop into `false` and every
// inheritance test below would pass for the wrong reason. See Global Constraints.
const Child = defineComponent({
  props: {
    id: { type: String, default: undefined },
    name: { type: String, default: undefined },
    invalid: { type: Boolean, default: undefined },
    required: { type: Boolean, default: undefined },
    disabled: { type: Boolean, default: undefined },
  },
  setup(props) {
    const ctx = useFieldContext(props as FieldOwnProps)
    return { ctx }
  },
  render: () => h('div'),
})

const Parent = (options: Record<string, unknown> = {}) =>
  defineComponent({
    setup() {
      provideFieldContext({
        hasHelpText: false,
        ownsFeedback: false,
        isGroupLabel: false,
        ...options,
      } as FieldProviderOptions)
      return () => h(Child)
    },
  })

// `any` deliberately: mount() is generic, so a single concrete wrapper type
// cannot accept every mount call below.
const ctxOf = (wrapper: any): FieldContext =>
  wrapper.findComponent(Child).vm.ctx as FieldContext

describe('useFieldContext — standalone (no provider)', () => {
  it('uses its own id when given one', () => {
    const wrapper = mount(Child, { props: { id: 'email' } })
    expect(ctxOf(wrapper).id).toBe('email')
  })

  it('falls back to a generated id when none is given', () => {
    const wrapper = mount(Child)
    const { id } = ctxOf(wrapper)
    expect(id).toBeTruthy()
    expect(typeof id).toBe('string')
  })

  it('derives errorId from the resolved id', () => {
    const wrapper = mount(Child, { props: { id: 'email' } })
    expect(ctxOf(wrapper).errorId).toBe('email-error')
  })

  it('has no descriptionId when standalone', () => {
    const wrapper = mount(Child, { props: { id: 'email' } })
    expect(ctxOf(wrapper).descriptionId).toBeUndefined()
  })

  it('defaults invalid, required and disabled to false', () => {
    const ctx = ctxOf(mount(Child, { props: { id: 'email' } }))
    expect(ctx.invalid.value).toBe(false)
    expect(ctx.required.value).toBe(false)
    expect(ctx.disabled.value).toBe(false)
  })

  it('describedBy is undefined when valid', () => {
    const ctx = ctxOf(mount(Child, { props: { id: 'email' } }))
    expect(ctx.describedBy.value).toBeUndefined()
  })

  it('describedBy is the error id when invalid', () => {
    const ctx = ctxOf(mount(Child, { props: { id: 'email', invalid: true } }))
    expect(ctx.describedBy.value).toBe('email-error')
  })

  it('does not claim group feedback ownership', () => {
    expect(ctxOf(mount(Child, { props: { id: 'email' } })).feedbackOwnedByGroup).toBe(
      false,
    )
  })

  it('treats an empty-string id as not supplied', () => {
    const ctx = ctxOf(mount(Child, { props: { id: '' } }))
    expect(ctx.id).toBeTruthy()
    expect(ctx.errorId).not.toBe('-error')
  })

  it('reports isGroupLabel as false when standalone', () => {
    const ctx = ctxOf(mount(Child, { props: { id: 'email' } }))
    expect(ctx.isGroupLabel).toBe(false)
  })
})

describe('useFieldContext — standalone name (Ruling D)', () => {
  it('uses its own name when given one', () => {
    const ctx = ctxOf(
      mount(Child, { props: { id: 'email', name: 'email-name' } }),
    )
    expect(ctx.name.value).toBe('email-name')
  })

  it('falls back to its own id when no name is given', () => {
    const ctx = ctxOf(mount(Child, { props: { id: 'email' } }))
    expect(ctx.name.value).toBe('email')
  })
})

describe('useFieldContext — inheriting from a provider', () => {
  it('takes the id from the provider', () => {
    const ctx = ctxOf(mount(Parent({ fieldId: 'from-group' })))
    expect(ctx.id).toBe('from-group')
    expect(ctx.errorId).toBe('from-group-error')
  })

  it('generates an id in the provider when none is given', () => {
    const ctx = ctxOf(mount(Parent()))
    expect(ctx.id).toBeTruthy()
    expect(ctx.errorId).toBe(`${ctx.id}-error`)
  })

  it('inherits name, which is what makes radio groups work', () => {
    const ctx = ctxOf(mount(Parent({ fieldId: 'colour', name: 'colour-set' })))
    expect(ctx.name.value).toBe('colour-set')
  })

  it('defaults name to the field id when the provider gives none', () => {
    const ctx = ctxOf(mount(Parent({ fieldId: 'colour' })))
    expect(ctx.name.value).toBe('colour')
  })

  it('inherits invalid, required and disabled', () => {
    const ctx = ctxOf(
      mount(Parent({ fieldId: 'x', invalid: true, required: true, disabled: true })),
    )
    expect(ctx.invalid.value).toBe(true)
    expect(ctx.required.value).toBe(true)
    expect(ctx.disabled.value).toBe(true)
  })

  it('exposes descriptionId only when the provider has help text', () => {
    expect(ctxOf(mount(Parent({ fieldId: 'x' }))).descriptionId).toBeUndefined()
    expect(
      ctxOf(mount(Parent({ fieldId: 'x', hasHelpText: true }))).descriptionId,
    ).toBe('x-description')
  })

  it('orders describedBy as description then error', () => {
    const ctx = ctxOf(
      mount(Parent({ fieldId: 'x', hasHelpText: true, invalid: true })),
    )
    expect(ctx.describedBy.value).toBe('x-description x-error')
  })

  it('describedBy is the description id alone when valid', () => {
    const ctx = ctxOf(mount(Parent({ fieldId: 'x', hasHelpText: true })))
    expect(ctx.describedBy.value).toBe('x-description')
  })

  it('reports group feedback ownership when the provider owns it', () => {
    expect(ctxOf(mount(Parent({ fieldId: 'x', ownsFeedback: true }))).feedbackOwnedByGroup).toBe(
      true,
    )
  })
})

describe('useFieldContext — explicit props beat the provider', () => {
  const ParentWithChildProps = (
    provided: Record<string, unknown>,
    childProps: Record<string, unknown>,
  ) =>
    defineComponent({
      setup() {
        provideFieldContext({
          hasHelpText: false,
          ownsFeedback: false,
          isGroupLabel: false,
          ...provided,
        } as FieldProviderOptions)
        return () => h(Child, childProps)
      },
    })

  it('an explicit id wins over the provider id', () => {
    const ctx = ctxOf(
      mount(ParentWithChildProps({ fieldId: 'group' }, { id: 'mine' })),
    )
    expect(ctx.id).toBe('mine')
    expect(ctx.errorId).toBe('mine-error')
  })

  it('an own id inside a feedback-owning group still points at the shared regions (Ruling B)', () => {
    // Region ids follow who RENDERS the region, not who owns the element id:
    // the group's help-text/error regions provably exist (hasHelpText,
    // ownsFeedback), so pointing at them never dangles even though this
    // control supplied its own element id.
    const ctx = ctxOf(
      mount(
        ParentWithChildProps(
          { fieldId: 'group', hasHelpText: true, ownsFeedback: true, invalid: true },
          { id: 'mine' },
        ),
      ),
    )
    expect(ctx.id).toBe('mine')
    expect(ctx.describedBy.value).toBe('group-description group-error')
    expect(ctx.feedbackOwnedByGroup).toBe(true)
  })

  it('a group can render help text while leaving the error region to the control (Ruling B, flags are independent)', () => {
    // hasHelpText and ownsFeedback govern independent regions: a group can
    // render help text without also owning the error region. The control
    // still points at the group's descriptionId (that region provably
    // exists), but derives its own errorId from its own id, since the group
    // does not render an error region here. Neither id dangles.
    const ctx = ctxOf(
      mount(
        ParentWithChildProps(
          { fieldId: 'group', hasHelpText: true, ownsFeedback: false, invalid: true },
          { id: 'mine' },
        ),
      ),
    )
    expect(ctx.descriptionId).toBe('group-description')
    expect(ctx.errorId).toBe('mine-error')
    expect(ctx.describedBy.value).toBe('group-description mine-error')
    expect(ctx.feedbackOwnedByGroup).toBe(false)
  })

  it('an explicit disabled=false overrides an inherited disabled=true', () => {
    // This is why invalid/required/disabled must be `boolean | undefined`:
    // with a `false` default there is no way to tell "not passed" from "passed false".
    const ctx = ctxOf(
      mount(ParentWithChildProps({ disabled: true }, { disabled: false })),
    )
    expect(ctx.disabled.value).toBe(false)
  })

  it('an explicit invalid=false overrides an inherited invalid=true', () => {
    const ctx = ctxOf(
      mount(ParentWithChildProps({ invalid: true }, { invalid: false })),
    )
    expect(ctx.invalid.value).toBe(false)
  })

  it('an explicit required=false overrides an inherited required=true', () => {
    const ctx = ctxOf(
      mount(ParentWithChildProps({ required: true }, { required: false })),
    )
    expect(ctx.required.value).toBe(false)
  })

  it('an omitted prop still inherits', () => {
    const ctx = ctxOf(mount(ParentWithChildProps({ disabled: true }, {})))
    expect(ctx.disabled.value).toBe(true)
  })

  it('an explicit name wins over the provider name', () => {
    const ctx = ctxOf(
      mount(ParentWithChildProps({ name: 'group-name' }, { name: 'own-name' })),
    )
    expect(ctx.name.value).toBe('own-name')
  })
})

describe('provideFieldContext — the returned context', () => {
  it('returns the same shape the child injects, for the group to render with', () => {
    const Group = defineComponent({
      setup() {
        const ctx: FieldContext = provideFieldContext({
          fieldId: 'x',
          hasHelpText: true,
          ownsFeedback: true,
          isGroupLabel: false,
          invalid: true,
        })
        return { ctx }
      },
      render: () => h('div'),
    })
    const ctx = mount(Group).vm.ctx as FieldContext
    expect(ctx.id).toBe('x')
    expect(ctx.errorId).toBe('x-error')
    expect(ctx.descriptionId).toBe('x-description')
    expect(ctx.feedbackOwnedByGroup).toBe(true)
    const describedBy: ComputedRef<string | undefined> = ctx.describedBy
    expect(describedBy.value).toBe('x-description x-error')
  })
})

describe('provideFieldContext — reactivity through an object literal (Ruling A)', () => {
  it('recomputes invalid and describedBy when the reactive source changes', () => {
    // A plain object literal is exactly what MclFormGroup must pass, because
    // hasHelpText/ownsFeedback are derived from slot/prop *presence* rather
    // than being props themselves — it cannot forward its whole `props`
    // proxy. The getter is what keeps `invalid` live; a literal
    // `invalid: state.invalid` would snapshot the value read at setup and
    // never update, which is exactly the defect the review measured.
    const state = reactive({ invalid: false })
    const Group = defineComponent({
      setup() {
        const ctx = provideFieldContext({
          fieldId: 'x',
          hasHelpText: true,
          ownsFeedback: true,
          isGroupLabel: false,
          invalid: () => state.invalid,
        })
        return { ctx }
      },
      render: () => h('div'),
    })
    const ctx = mount(Group).vm.ctx as FieldContext
    expect(ctx.invalid.value).toBe(false)
    expect(ctx.describedBy.value).toBe('x-description')
    state.invalid = true
    expect(ctx.invalid.value).toBe(true)
    expect(ctx.describedBy.value).toBe('x-description x-error')
  })
})

describe('useFieldContext — fieldset mode (isGroupLabel: true, Ruling C)', () => {
  it('gives sibling controls distinct element ids while sharing the group error id and name', () => {
    const GroupWithTwoChildren = defineComponent({
      setup() {
        provideFieldContext({
          fieldId: 'colour',
          name: 'colour-set',
          hasHelpText: false,
          ownsFeedback: true,
          isGroupLabel: true,
        })
        return () => h('div', [h(Child), h(Child)])
      },
    })
    const wrapper = mount(GroupWithTwoChildren)
    const [first, second] = wrapper
      .findAllComponents(Child)
      .map((c) => c.vm.ctx as FieldContext)
    expect(first.id).not.toBe(second.id)
    expect(first.errorId).toBe('colour-error')
    expect(second.errorId).toBe('colour-error')
    expect(first.name.value).toBe('colour-set')
    expect(second.name.value).toBe('colour-set')
  })

  it('reports isGroupLabel truthfully, so a control can tell it is part of a set', () => {
    const GroupWithOneChild = defineComponent({
      setup() {
        provideFieldContext({
          fieldId: 'colour',
          hasHelpText: false,
          ownsFeedback: true,
          isGroupLabel: true,
        })
        return () => h(Child)
      },
    })
    const ctx = ctxOf(mount(GroupWithOneChild))
    expect(ctx.isGroupLabel).toBe(true)
  })
})

describe('useFieldContext — single-control mode (isGroupLabel: false, Ruling C)', () => {
  it('gives the control the group id so <label for> can bind to it', () => {
    const GroupWithTwoChildren = defineComponent({
      setup() {
        provideFieldContext({
          fieldId: 'email',
          hasHelpText: false,
          ownsFeedback: false,
          isGroupLabel: false,
        })
        return () => h('div', [h(Child), h(Child)])
      },
    })
    const wrapper = mount(GroupWithTwoChildren)
    const [first, second] = wrapper
      .findAllComponents(Child)
      .map((c) => c.vm.ctx as FieldContext)
    // Single-control mode assumes the group renders exactly one control; both
    // ending up with the group's id here is why isGroupLabel:true exists for
    // genuinely multi-control groups (see the fieldset-mode suite above).
    expect(first.id).toBe('email')
    expect(second.id).toBe('email')
  })
})
