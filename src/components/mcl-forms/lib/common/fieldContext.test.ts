import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h, type ComputedRef } from 'vue'
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
    expect(ctx.name).toBe('colour-set')
  })

  it('defaults name to the field id when the provider gives none', () => {
    const ctx = ctxOf(mount(Parent({ fieldId: 'colour' })))
    expect(ctx.name).toBe('colour')
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

  it('an explicit disabled=false overrides an inherited disabled=true', () => {
    // This is why invalid/required/disabled must be `boolean | undefined`:
    // with a `false` default there is no way to tell "not passed" from "passed false".
    const ctx = ctxOf(
      mount(ParentWithChildProps({ disabled: true }, { disabled: false })),
    )
    expect(ctx.disabled.value).toBe(false)
  })

  it('an omitted prop still inherits', () => {
    const ctx = ctxOf(mount(ParentWithChildProps({ disabled: true }, {})))
    expect(ctx.disabled.value).toBe(true)
  })

  it('an explicit name wins over the provider name', () => {
    const ctx = ctxOf(
      mount(ParentWithChildProps({ name: 'group-name' }, { name: 'own-name' })),
    )
    expect(ctx.name).toBe('own-name')
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
