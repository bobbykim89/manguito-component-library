import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import MclFormGroup from '../mcl-form-group/MclFormGroup.vue'
import MclInputSwitch from './MclInputSwitch.vue'

describe('MclInputSwitch — structure and ARIA', () => {
  it('renders a checkbox with role="switch"', () => {
    const input = mount(MclInputSwitch, { props: { id: 'notify' } }).find(
      'input',
    )
    expect(input.attributes('type')).toBe('checkbox')
    expect(input.attributes('role')).toBe('switch')
  })

  it('does not hand-bind aria-checked', () => {
    // HTML-AAM maps a checkbox's native checked state already; a bound copy
    // is redundant and can only desync.
    const wrapper = mount(MclInputSwitch, {
      props: { id: 'notify', modelValue: true },
    })
    expect(wrapper.find('input').attributes('aria-checked')).toBeUndefined()
  })

  it('puts the input before the slider so peer-* selectors apply', () => {
    const html = mount(MclInputSwitch, { props: { id: 'notify' } }).html()
    expect(html.indexOf('<input')).toBeLessThan(html.indexOf('<span'))
  })

  it('gives the slider a focus-visible ring', () => {
    const span = mount(MclInputSwitch, { props: { id: 'notify' } }).find('span')
    expect(span.classes().join(' ')).toContain('peer-focus-visible:ring')
  })

  it('toggles once for a click that bubbles up to the wrapper', async () => {
    // The old wrapper handler double-toggled: a click on the contained input
    // bubbled up and called inputRef.click() again. A real click is driven
    // here rather than asserting on an `onclick` attribute, which can never
    // fail: Vue compiles @click to a prop and never to an attribute.
    const wrapper = mount(MclInputSwitch, {
      props: { id: 'notify', modelValue: false },
      attachTo: document.body,
    })
    ;(wrapper.find('input').element as HTMLInputElement).click()
    await nextTick()
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
    wrapper.unmount()
  })

  it('does nothing when the click lands on the wrapper itself', async () => {
    const wrapper = mount(MclInputSwitch, {
      props: { id: 'notify', modelValue: false },
      attachTo: document.body,
    })
    ;(wrapper.element as HTMLElement).click()
    await nextTick()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    wrapper.unmount()
  })

  it('rounds to a pill, never the checkbox radii', () => {
    // `rounded` defaults to true here, so this is what every existing switch
    // renders. The composable owns the shape, so only one radius is emitted.
    const classes = mount(MclInputSwitch, { props: { id: 'notify' } })
      .find('span')
      .classes()
    expect(classes).toContain('rounded-full')
    expect(classes).toContain('before:rounded-full')
    expect(classes).not.toContain('rounded-md')
    expect(classes).not.toContain('before:rounded-[3px]')
  })

  it('emits no rounding when rounded is switched off', () => {
    const classes = mount(MclInputSwitch, {
      props: { id: 'notify', rounded: false },
    })
      .find('span')
      .classes()
    expect(classes).not.toContain('rounded-full')
    expect(classes).not.toContain('rounded-md')
  })

  it('still recomputes the box classes after a prop change', async () => {
    // MclInputSwitch cannot hand its bare props proxy to useToggleControl any
    // more (it has to add `roundedClass`), so the wrapper object it builds
    // must read through the proxy rather than snapshot it.
    const wrapper = mount(MclInputSwitch, {
      props: { id: 'notify', checkedBgColor: 'success' },
    })
    expect(wrapper.find('span').classes()).toContain('peer-checked:bg-success')
    await wrapper.setProps({ checkedBgColor: 'warning' })
    expect(wrapper.find('span').classes()).toContain('peer-checked:bg-warning')
    expect(wrapper.find('span').classes()).not.toContain(
      'peer-checked:bg-success',
    )
  })
})

describe('MclInputSwitch — toggling', () => {
  it('toggles the model exactly once per interaction', async () => {
    const wrapper = mount(MclInputSwitch, {
      props: { id: 'notify', modelValue: false },
    })
    await wrapper.find('input').setValue(true)
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toHaveLength(1)
    expect(emitted![0]).toEqual([true])
  })

  it('emits change with the native event', async () => {
    const wrapper = mount(MclInputSwitch, { props: { id: 'notify' } })
    await wrapper.find('input').trigger('change')
    expect(wrapper.emitted('change')![0][0]).toBeInstanceOf(Event)
  })
})

describe('MclInputSwitch — sizing and colours', () => {
  it('sets the CSS custom properties for md', () => {
    const style = mount(MclInputSwitch, { props: { id: 'notify' } })
      .find('div')
      .attributes('style')
    expect(style).toContain('--switch-width: 45px')
    expect(style).toContain('--slider-size: 19.5px')
  })

  it('sets larger custom properties for lg', () => {
    const style = mount(MclInputSwitch, { props: { id: 'notify', size: 'lg' } })
      .find('div')
      .attributes('style')
    expect(style).toContain('--switch-width: 60px')
  })

  it('applies bgColor as the off track and checkedBgColor as the on track', () => {
    const span = mount(MclInputSwitch, {
      props: { id: 'notify', bgColor: 'dark-1', checkedBgColor: 'success' },
    }).find('span')
    expect(span.classes()).toContain('mcl-bg-dark-1')
    expect(span.classes()).toContain('peer-checked:bg-success')
  })

  it('applies indicatorColor to the knob', () => {
    const span = mount(MclInputSwitch, {
      props: { id: 'notify', indicatorColor: 'white' },
    }).find('span')
    expect(span.classes()).toContain('before:bg-white')
  })

  it('maps dark-4 correctly, unlike the map it replaces', () => {
    const span = mount(MclInputSwitch, {
      props: { id: 'notify', checkedBgColor: 'dark-4' },
    }).find('span')
    expect(span.classes()).toContain('peer-checked:bg-dark-4')
  })
})

describe('MclInputSwitch — field context', () => {
  it('inherits disabled from the group', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'notify', label: 'Notify', disabled: true },
      slots: { default: () => h(MclInputSwitch) },
    })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('does not claim an error region it never renders', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'notify', label: 'Notify', invalid: true },
      slots: { default: () => h(MclInputSwitch) },
    })
    expect(wrapper.find('input').attributes('aria-describedby')).toBeUndefined()
  })

  it('takes the group id in single-control mode', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'notify', label: 'Notify' },
      slots: { default: () => h(MclInputSwitch) },
    })
    expect(wrapper.find('input').attributes('id')).toBe('notify')
    expect(wrapper.find('label').attributes('for')).toBe('notify')
  })
})
