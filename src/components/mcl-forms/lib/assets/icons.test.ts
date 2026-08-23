import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import CaretDown from './CaretDown.vue'
import XMark from './XMark.vue'

const icons = [
  ['CaretDown', CaretDown],
  ['XMark', XMark],
] as const

describe.each(icons)('%s', (_name, Icon) => {
  it('is hidden from assistive technology', () => {
    // Both icons sit next to a labelled control, so announcing them is noise.
    // CaretDown currently carries role="img", which is wrong for a decoration.
    const svg = mount(Icon).find('svg')
    expect(svg.attributes('aria-hidden')).toBe('true')
    expect(svg.attributes('focusable')).toBe('false')
    expect(svg.attributes('role')).toBeUndefined()
  })

  it('applies the default fill colour', () => {
    expect(mount(Icon).find('svg').classes()).toContain('fill-dark-4')
  })

  it('applies an explicit fill colour', () => {
    const svg = mount(Icon, { props: { color: 'primary' } }).find('svg')
    expect(svg.classes()).toContain('fill-primary')
    expect(svg.classes()).not.toContain('fill-dark-4')
  })

  it('carries no default size, so className is the only sizing source', () => {
    // Appending className would not override a built-in `h-md w-md`: Tailwind
    // utilities of the same property resolve by stylesheet order, not by
    // class-attribute order. Having no default is what makes the icon reusable.
    const classes = mount(Icon).find('svg').classes()
    expect(classes.some((c) => /^h-|^w-|^size-/.test(c))).toBe(false)
  })

  it('takes its size and transforms from className', () => {
    const svg = mount(Icon, {
      props: { className: 'h-xs rotate-180' },
    }).find('svg')
    expect(svg.classes()).toContain('h-xs')
    expect(svg.classes()).toContain('rotate-180')
    expect(svg.classes()).toContain('fill-dark-4')
  })

  it('renders exactly one path', () => {
    expect(mount(Icon).findAll('path')).toHaveLength(1)
  })
})

describe('icon viewBoxes', () => {
  it('CaretDown uses the Font Awesome caret-down box', () => {
    expect(mount(CaretDown).find('svg').attributes('viewBox')).toBe('0 0 320 512')
  })
  it('XMark uses the Font Awesome xmark box', () => {
    expect(mount(XMark).find('svg').attributes('viewBox')).toBe('0 0 384 512')
  })
})
