import { describe, expect, it } from 'vitest'
import { reactive } from 'vue'
import { useToggleControl, type ToggleControlOptions } from './useToggleControl'

const base = (): ToggleControlOptions => ({
  size: 'md',
  bgColor: 'light-1',
  checkedBgColor: 'warning',
  indicatorColor: 'dark-3',
  borderColor: 'dark-1',
  showShadow: false,
  rounded: false,
})

describe('useToggleControl — boxClass', () => {
  it('composes background, border, indicator, checked background and focus ring', () => {
    const { boxClass } = useToggleControl(base())
    expect(boxClass.value).toBe(
      'mcl-bg-light-1 border-dark-1 before:bg-dark-3 ' +
        'peer-checked:bg-warning peer-focus-visible:ring-2 ring-offset-2 ' +
        'peer-focus-visible:ring-dark-1',
    )
  })

  it('always emits a focus-visible ring — this is the WCAG 2.4.7 fix', () => {
    const { boxClass } = useToggleControl(base())
    expect(boxClass.value).toContain('peer-focus-visible:ring-2')
    expect(boxClass.value).toContain('peer-focus-visible:ring-dark-1')
  })

  it('maps dark-4 correctly, unlike the hand-written maps it replaces', () => {
    const { boxClass } = useToggleControl({
      ...base(),
      checkedBgColor: 'dark-4',
      indicatorColor: 'dark-4',
    })
    expect(boxClass.value).toContain('peer-checked:bg-dark-4')
    expect(boxClass.value).toContain('before:bg-dark-4')
    expect(boxClass.value).not.toContain('bg-dark-1')
  })

  it('adds drop-shadow-md when showShadow is true', () => {
    const { boxClass } = useToggleControl({ ...base(), showShadow: true })
    expect(boxClass.value).toContain('drop-shadow-md')
  })

  it('adds rounding to both box and indicator when rounded is true', () => {
    const { boxClass } = useToggleControl({ ...base(), rounded: true })
    expect(boxClass.value).toContain('rounded-md')
    expect(boxClass.value).toContain('before:rounded-[3px]')
  })

  it('recomputes when the reactive source changes', () => {
    const props = reactive(base())
    const { boxClass } = useToggleControl(props)
    expect(boxClass.value).toContain('peer-checked:bg-warning')
    props.checkedBgColor = 'success'
    expect(boxClass.value).toContain('peer-checked:bg-success')
  })
})

describe('useToggleControl — sizeClass', () => {
  it('returns small dimensions for sm', () => {
    const { sizeClass } = useToggleControl({ ...base(), size: 'sm' })
    expect(sizeClass.value).toBe('h-xs w-xs before:h-2xs before:w-2xs')
  })
  it('returns medium dimensions for md', () => {
    const { sizeClass } = useToggleControl({ ...base(), size: 'md' })
    // 12px is an arbitrary value on purpose: the indicator is half the box at
    // every size (sm 16->8, md 24->12, lg 32->16) and the token scale jumps
    // 2xs=8px -> xs=16px, so md's half has no token. Do not "fix" this to 3xs,
    // which is 4px and would shrink the indicator to a third of its size.
    expect(sizeClass.value).toBe('h-sm w-sm before:h-[12px] before:w-[12px]')
  })
  it('returns large dimensions for lg', () => {
    const { sizeClass } = useToggleControl({ ...base(), size: 'lg' })
    expect(sizeClass.value).toBe('h-md w-md before:h-xs before:w-xs')
  })
})

describe('useToggleControl — switchVars', () => {
  it('returns the four CSS custom properties for md', () => {
    const { switchVars } = useToggleControl(base())
    expect(switchVars.value).toEqual({
      '--switch-width': '45px',
      '--switch-height': '25.5px',
      '--slider-size': '19.5px',
      '--gutter-size': '3px',
    })
  })
  it('returns smaller values for sm', () => {
    const { switchVars } = useToggleControl({ ...base(), size: 'sm' })
    expect(switchVars.value['--switch-width']).toBe('30px')
    expect(switchVars.value['--slider-size']).toBe('13px')
  })
  it('returns larger values for lg', () => {
    const { switchVars } = useToggleControl({ ...base(), size: 'lg' })
    expect(switchVars.value['--switch-width']).toBe('60px')
    expect(switchVars.value['--slider-size']).toBe('26px')
  })
})

describe('useToggleControl — optional rounded', () => {
  // MclInputRadio deliberately has no `rounded` prop (a radio stays circular),
  // so it must be able to pass its props proxy directly rather than a spread
  // literal, which would snapshot every value at setup.
  const withoutRounded = (): ToggleControlOptions => ({
    size: 'md',
    bgColor: 'light-1',
    checkedBgColor: 'warning',
    indicatorColor: 'dark-3',
    borderColor: 'dark-1',
    showShadow: false,
  })

  it('defaults to false, emitting no rounding classes', () => {
    const { boxClass } = useToggleControl(withoutRounded())
    expect(boxClass.value).not.toContain('rounded-md')
    expect(boxClass.value).not.toContain('before:rounded-[3px]')
  })

  it('stays reactive when the property is absent from the source object', () => {
    const props = reactive(withoutRounded())
    const { boxClass } = useToggleControl(props)
    expect(boxClass.value).toContain('peer-checked:bg-warning')
    props.checkedBgColor = 'success'
    expect(boxClass.value).toContain('peer-checked:bg-success')
    expect(boxClass.value).not.toContain('rounded-md')
  })
})

describe('useToggleControl — switchVars isolation', () => {
  it('returns a copy, so a caller cannot mutate the shared size table', () => {
    const first = useToggleControl(base()).switchVars.value
    first['--switch-width'] = 'tampered'
    expect(useToggleControl(base()).switchVars.value['--switch-width']).toBe(
      '45px',
    )
  })
})
