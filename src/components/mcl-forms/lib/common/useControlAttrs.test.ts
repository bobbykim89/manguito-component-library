import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { computed, defineComponent, h } from 'vue'
import type { FieldContext } from './index.types'
import { useControlAttrs } from './useControlAttrs'

const fieldWith = (labelledBy?: string) =>
  ({ labelledBy: computed(() => labelledBy) }) as unknown as FieldContext

/** Exposes what the composable returns, for the attrs it is mounted with. */
const Probe = (labelledBy?: string) =>
  defineComponent({
    inheritAttrs: false,
    setup() {
      return useControlAttrs(fieldWith(labelledBy))
    },
    render: () => h('div'),
  })

const run = (attrs: Record<string, unknown>, labelledBy?: string) => {
  const vm = mount(Probe(labelledBy), { attrs }).vm as unknown as {
    rootAttrs: Record<string, unknown>
    controlAttrs: Record<string, unknown>
  }
  return { root: vm.rootAttrs, control: vm.controlAttrs }
}

describe('useControlAttrs', () => {
  it('puts class and style in rootAttrs and nothing else', () => {
    const { root } = run({ class: 'w-1/2', style: 'color: red', title: 't' })
    expect(Object.keys(root).sort()).toEqual(['class', 'style'])
  })

  it('puts aria-label, title, data-testid, autofocus and listeners in controlAttrs', () => {
    const onFocus = () => {}
    const { control } = run({
      'aria-label': 'Named',
      title: 't',
      'data-testid': 'x',
      autofocus: true,
      onFocus,
      class: 'c',
    })
    expect(control).toMatchObject({
      'aria-label': 'Named',
      title: 't',
      'data-testid': 'x',
      autofocus: true,
      onFocus,
    })
    expect(control).not.toHaveProperty('class')
  })

  it('drops owned keys (id, name, required, disabled, aria-describedby, role, type, aria-invalid) from controlAttrs', () => {
    const owned = [
      'id',
      'name',
      'type',
      'role',
      'required',
      'disabled',
      'aria-invalid',
      'aria-describedby',
      'aria-expanded',
      'aria-controls',
      'aria-activedescendant',
      'aria-required',
    ]
    const { control } = run(Object.fromEntries(owned.map((k) => [k, 'x'])))
    for (const key of owned) expect(control).not.toHaveProperty(key)
  })

  it('aria-labelledby: consumer value > none when consumer aria-label > field.labelledBy', () => {
    expect(
      run({ 'aria-labelledby': 'mine' }, 'grp-label').control[
        'aria-labelledby'
      ],
    ).toBe('mine')
    expect(
      run({ 'aria-label': 'Named' }, 'grp-label').control['aria-labelledby'],
    ).toBeUndefined()
    expect(run({}, 'grp-label').control['aria-labelledby']).toBe('grp-label')
    expect(run({}).control['aria-labelledby']).toBeUndefined()
  })
})
