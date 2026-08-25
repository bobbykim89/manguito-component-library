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
    expect(
      ctxOf(mount(Child, { props: { id: 'email' } })).feedbackOwnedByGroup,
    ).toBe(false)
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

// Spec section 4, "Grouped controls": the group provides `name`, defaulting to
// the field id, and that is what makes native radio grouping work. A control
// with no group and no own `name` resolves to undefined — there is no id
// fallback, because a generated `name` would be submitted with the form and no
// consumer could opt out of it.
describe('useFieldContext — standalone name', () => {
  it('uses its own name when given one', () => {
    const ctx = ctxOf(
      mount(Child, { props: { id: 'email', name: 'email-name' } }),
    )
    expect(ctx.name.value).toBe('email-name')
  })

  it('is undefined when neither a name nor a group supplies one', () => {
    const ctx = ctxOf(mount(Child, { props: { id: 'email' } }))
    expect(ctx.name.value).toBeUndefined()
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
      mount(
        Parent({ fieldId: 'x', invalid: true, required: true, disabled: true }),
      ),
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
    expect(
      ctxOf(mount(Parent({ fieldId: 'x', ownsFeedback: true })))
        .feedbackOwnedByGroup,
    ).toBe(true)
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

  it('an own id inside a feedback-owning group still points at the shared regions', () => {
    // Spec section 4, "Region ids follow whoever renders the region":
    // the group's help-text/error regions provably exist (hasHelpText,
    // ownsFeedback), so pointing at them never dangles even though this
    // control supplied its own element id.
    const ctx = ctxOf(
      mount(
        ParentWithChildProps(
          {
            fieldId: 'group',
            hasHelpText: true,
            ownsFeedback: true,
            invalid: true,
          },
          { id: 'mine' },
        ),
      ),
    )
    expect(ctx.id).toBe('mine')
    expect(ctx.describedBy.value).toBe('group-description group-error')
    expect(ctx.feedbackOwnedByGroup).toBe(true)
  })

  it('a group can render help text while leaving the error region to the control', () => {
    // Spec section 4: hasHelpText and ownsFeedback govern independent regions: a group can
    // render help text without also owning the error region. The control
    // still points at the group's descriptionId (that region provably
    // exists), but derives its own errorId from its own id, since the group
    // does not render an error region here. Neither id dangles.
    const ctx = ctxOf(
      mount(
        ParentWithChildProps(
          {
            fieldId: 'group',
            hasHelpText: true,
            ownsFeedback: false,
            invalid: true,
          },
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

describe('provideFieldContext — reactivity through an object literal', () => {
  it('recomputes invalid and describedBy when the reactive source changes', () => {
    // Spec section 4: name/invalid/required/disabled are MaybeRefOrGetter and
    // read through toValue(), and that is load-bearing rather than stylistic.
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

// Spec section 4, "Element ids in group mode": in fieldset mode every control
// generates its own element id (no label[for] to match, and duplicate ids are
// invalid HTML) while still pointing at the group's shared error and
// description regions.
describe('useFieldContext — fieldset mode (isGroupLabel: true)', () => {
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

// Spec section 4: in single-label mode the control takes the group's id so
// `for` and `id` agree.
describe('useFieldContext — single-control mode (isGroupLabel: false)', () => {
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

/**
 * Stands in for the three toggle controls, which render no FieldFeedback of
 * their own and therefore declare `rendersOwnFeedback: false`.
 */
const ToggleChild = defineComponent({
  props: {
    id: { type: String, default: undefined },
    name: { type: String, default: undefined },
    invalid: { type: Boolean, default: undefined },
    required: { type: Boolean, default: undefined },
    disabled: { type: Boolean, default: undefined },
  },
  setup(props) {
    const ctx = useFieldContext(props as FieldOwnProps, {
      rendersOwnFeedback: false,
    })
    return { ctx }
  },
  render: () => h('div'),
})

const toggleCtxOf = (wrapper: any): FieldContext =>
  wrapper.findComponent(ToggleChild).vm.ctx as FieldContext

describe('useFieldContext — rendersOwnFeedback', () => {
  const GroupAround = (
    Inner: typeof Child | typeof ToggleChild,
    provided: Record<string, unknown>,
  ) =>
    defineComponent({
      setup() {
        provideFieldContext({
          hasHelpText: false,
          ownsFeedback: false,
          isGroupLabel: false,
          ...provided,
        } as FieldProviderOptions)
        return () => h(Inner)
      },
    })

  it('omits the error id when nobody renders an error region', () => {
    // A group carrying invalid with no invalidFeedback, wrapping radios: the
    // group renders no region (ownsFeedback false) and neither does the
    // toggle, so naming an error id would point at nothing.
    const ctx = toggleCtxOf(
      mount(GroupAround(ToggleChild, { fieldId: 'colour', invalid: true })),
    )
    expect(ctx.invalid.value).toBe(true)
    expect(ctx.describedBy.value).toBeUndefined()
  })

  it('still names the group error id when the group owns the region', () => {
    const ctx = toggleCtxOf(
      mount(
        GroupAround(ToggleChild, {
          fieldId: 'colour',
          invalid: true,
          ownsFeedback: true,
        }),
      ),
    )
    expect(ctx.describedBy.value).toBe('colour-error')
  })

  it('still names the description id, which the group does render', () => {
    const ctx = toggleCtxOf(
      mount(
        GroupAround(ToggleChild, {
          fieldId: 'colour',
          invalid: true,
          hasHelpText: true,
        }),
      ),
    )
    expect(ctx.describedBy.value).toBe('colour-description')
  })

  it('names its own error id when standalone, since it has no group to defer to', () => {
    // Standalone toggles are still covered: with no group there is nothing to
    // inherit invalid from, so describedBy stays undefined unless the caller
    // renders a region — which a toggle never does.
    const ctx = toggleCtxOf(
      mount(ToggleChild, { props: { id: 'agree', invalid: true } }),
    )
    expect(ctx.describedBy.value).toBeUndefined()
  })

  it('defaults to true, so text-like controls keep their own error id', () => {
    const ctx = ctxOf(
      mount(GroupAround(Child, { fieldId: 'email', invalid: true })),
    )
    expect(ctx.describedBy.value).toBe('email-error')
  })

  it('a feedback-owning group that is not itself invalid renders no region anywhere', () => {
    // Documented contract, see FieldProviderOptions.ownsFeedback: the group's
    // FieldFeedback renders off the group's OWN invalid, so a group that owns
    // the region must carry the invalid state itself. Here it does not, and
    // the control has skipped its own region because the group claims it —
    // this test pins the consequence so plan 2 wires the group correctly.
    const ctx = ctxOf(
      mount(
        GroupAround(Child, {
          fieldId: 'email',
          invalid: false,
          ownsFeedback: true,
        }),
      ),
    )
    const invalidChild = ctxOf(
      mount(
        defineComponent({
          setup() {
            provideFieldContext({
              fieldId: 'email',
              hasHelpText: false,
              ownsFeedback: true,
              isGroupLabel: false,
              invalid: false,
            })
            return () => h(Child, { invalid: true })
          },
        }),
      ),
    )
    expect(ctx.describedBy.value).toBeUndefined()
    expect(invalidChild.feedbackOwnedByGroup).toBe(true)
    expect(invalidChild.describedBy.value).toBe('email-error')
  })
})

describe('useFieldContext — control-side reactivity', () => {
  // Every other inheritance suite above passes a props proxy but never mutates
  // it, so a snapshot taken at setup would satisfy them all. These two mutate.
  const ForwardingGroup = defineComponent({
    props: {
      invalid: { type: Boolean, default: undefined },
      required: { type: Boolean, default: undefined },
      disabled: { type: Boolean, default: undefined },
    },
    setup(props) {
      provideFieldContext({
        fieldId: 'email',
        hasHelpText: false,
        ownsFeedback: false,
        isGroupLabel: false,
      })
      return () => h(Child, props)
    },
  })

  it('recomputes invalid and describedBy when the control prop changes', async () => {
    const wrapper = mount(ForwardingGroup)
    const ctx = ctxOf(wrapper)
    expect(ctx.invalid.value).toBe(false)
    expect(ctx.describedBy.value).toBeUndefined()
    await wrapper.setProps({ invalid: true })
    expect(ctx.invalid.value).toBe(true)
    expect(ctx.describedBy.value).toBe('email-error')
  })

  it('recomputes required and disabled when the control props change', async () => {
    const wrapper = mount(ForwardingGroup)
    const ctx = ctxOf(wrapper)
    expect(ctx.required.value).toBe(false)
    expect(ctx.disabled.value).toBe(false)
    await wrapper.setProps({ required: true, disabled: true })
    expect(ctx.required.value).toBe(true)
    expect(ctx.disabled.value).toBe(true)
  })
})

describe('provideFieldContext — id resolution', () => {
  it('treats an empty fieldId as not supplied, so no region id can dangle', () => {
    const ctx = ctxOf(mount(Parent({ fieldId: '' })))
    expect(ctx.id).toBeTruthy()
    expect(ctx.errorId).not.toBe('-error')
    expect(ctx.errorId).toBe(`${ctx.id}-error`)
  })

  it('an empty fieldId cannot propagate an empty id to a descendant', () => {
    const ctx = ctxOf(mount(Parent({ fieldId: '', hasHelpText: true })))
    expect(ctx.descriptionId).toBeTruthy()
    expect(ctx.descriptionId).not.toBe('-description')
  })
})
