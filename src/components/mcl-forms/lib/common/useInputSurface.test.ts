import { describe, expect, it } from 'vitest'
import { reactive } from 'vue'
import { useInputSurface, type InputSurfaceOptions } from './useInputSurface'

const base = (): InputSurfaceOptions => ({
  bgColor: 'light-1',
  textColor: 'black',
  borderColor: 'light-4',
  showBorder: false,
  showShadow: false,
  showHighlight: true,
  rounded: false,
})

describe('useInputSurface', () => {
  it('emits background and text colour with all flags off', () => {
    const surface = useInputSurface(base())
    expect(surface.value).toBe('mcl-bg-light-1 text-black')
  })

  it('adds border-2 and the border colour when showBorder is true', () => {
    const surface = useInputSurface({ ...base(), showBorder: true })
    expect(surface.value).toBe(
      'mcl-bg-light-1 text-black border-2 border-light-4',
    )
  })

  it('adds the focus-visible ring only when showHighlight is false', () => {
    const withHighlight = useInputSurface({ ...base(), showHighlight: true })
    expect(withHighlight.value).not.toContain('focus-visible:ring-light-4')

    const withoutHighlight = useInputSurface({
      ...base(),
      showHighlight: false,
    })
    expect(withoutHighlight.value).toContain('focus-visible:ring-4')
    expect(withoutHighlight.value).toContain('focus-visible:ring-light-4')
  })

  it('adds shadow-md when showShadow is true', () => {
    const surface = useInputSurface({ ...base(), showShadow: true })
    expect(surface.value).toContain('shadow-md')
  })

  it('adds rounded-md when rounded is true', () => {
    const surface = useInputSurface({ ...base(), rounded: true })
    expect(surface.value).toContain('rounded-md')
  })

  it('keeps a stable class order across all flags', () => {
    const surface = useInputSurface({
      ...base(),
      showBorder: true,
      showShadow: true,
      showHighlight: false,
      rounded: true,
    })
    expect(surface.value).toBe(
      'mcl-bg-light-1 text-black border-2 border-light-4 ' +
        'focus-visible:ring-4 ring-offset-2 transition-all duration-300 ease-linear ' +
        'focus-visible:ring-light-4 shadow-md rounded-md',
    )
  })

  it('recomputes when the reactive source changes', () => {
    const props = reactive(base())
    const surface = useInputSurface(props)
    expect(surface.value).toContain('mcl-bg-light-1')
    props.bgColor = 'dark-3'
    expect(surface.value).toContain('mcl-bg-dark-3')
    expect(surface.value).not.toContain('mcl-bg-light-1')
  })
})

describe('useInputSurface — optional showHighlight', () => {
  // MclInputFile has no highlight bar and therefore no `showHighlight` prop, so
  // it must be able to pass its props proxy directly. A spread literal to fill
  // the field in would snapshot every value at setup — the same silent freeze
  // the provider side already had to fix.
  const withoutHighlight = (): InputSurfaceOptions => ({
    bgColor: 'light-1',
    textColor: 'black',
    borderColor: 'light-4',
    showBorder: false,
    showShadow: false,
    rounded: false,
  })

  it('defaults to false, emitting the focus-visible ring', () => {
    const surface = useInputSurface(withoutHighlight())
    expect(surface.value).toContain('focus-visible:ring-4')
    expect(surface.value).toContain('focus-visible:ring-light-4')
  })

  it('stays reactive when the property is absent from the source object', () => {
    const props = reactive(withoutHighlight())
    const surface = useInputSurface(props)
    expect(surface.value).toContain('mcl-bg-light-1')
    props.bgColor = 'dark-3'
    expect(surface.value).toContain('mcl-bg-dark-3')
    expect(surface.value).toContain('focus-visible:ring-4')
  })
})
