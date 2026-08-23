import { describe, expect, it } from 'vitest'
import {
  bgColorVariant,
  borderWidthVariant,
  bodyTextVariant,
  fontWeightVariant,
  generateClass,
  h1Variant,
  h2Variant,
  marginVariant,
  opacityVariant,
  outlineColorVariant,
  focusOutlineColorVariant,
  paddingVariant,
  gapVariant,
  textColorVariant,
  hoverBgColorVariant,
  peerCheckedBgColorVariant,
  peerFocusVisibleRingColorVariant,
  focusVisibleRingColorVariant,
} from '../index'
import type { ColorPalette } from '../static/theme.types'

describe('generateClass namespace — color variants', () => {
  it('bgColorVariant: primary returns mcl-bg-primary', () => {
    expect(bgColorVariant({ color: 'primary' })).toBe('mcl-bg-primary')
    expect(generateClass.bgColorVariant({ color: 'primary' })).toBe(
      'mcl-bg-primary',
    )
  })
  it('bgColorVariant: unknown color returns empty string', () => {
    expect(bgColorVariant({ color: 'neon-green' as any })).toBe('')
  })
  it('hoverBgColorVariant: secondary returns hover:bg-secondary', () => {
    expect(hoverBgColorVariant({ color: 'secondary' })).toBe(
      'hover:bg-secondary',
    )
    expect(generateClass.hoverBgColorVariant({ color: 'secondary' })).toBe(
      'hover:bg-secondary',
    )
  })
  it('textColorVariant: success returns text-success', () => {
    expect(textColorVariant({ color: 'success' })).toBe('text-success')
    expect(generateClass.textColorVariant({ color: 'success' })).toBe(
      'text-success',
    )
  })
  it('outlineColorVariant: danger returns mcl-outline-danger', () => {
    expect(outlineColorVariant({ color: 'danger' })).toBe('mcl-outline-danger')
    expect(generateClass.outlineColorVariant({ color: 'danger' })).toBe(
      'mcl-outline-danger',
    )
  })
  it('focusOutlineColorVariant: primary returns focus:mcl-outline-primary', () => {
    expect(focusOutlineColorVariant({ color: 'primary' })).toBe(
      'focus:mcl-outline-primary',
    )
    expect(generateClass.focusOutlineColorVariant({ color: 'primary' })).toBe(
      'focus:mcl-outline-primary',
    )
  })
})

describe('generateClass namespace — heading variants', () => {
  it('h1Variant: sm returns h1-sm', () => {
    expect(h1Variant({ size: 'sm' })).toBe('h1-sm')
    expect(generateClass.h1Variant({ size: 'sm' })).toBe('h1-sm')
  })
  it('h2Variant: md returns h2-md', () => {
    expect(h2Variant({ size: 'md' })).toBe('h2-md')
    expect(generateClass.h2Variant({ size: 'md' })).toBe('h2-md')
  })
  it('h1Variant: unknown size returns empty string', () => {
    expect(h1Variant({ size: 'jumbo' as any })).toBe('')
  })
})

describe('generateClass namespace — text variants', () => {
  it('bodyTextVariant: md returns text-md', () => {
    expect(bodyTextVariant({ size: 'md' })).toBe('text-md')
    expect(generateClass.bodyTextVariant({ size: 'md' })).toBe('text-md')
  })
  it('fontWeightVariant: bold returns font-bold', () => {
    expect(fontWeightVariant({ weight: 'bold' })).toBe('font-bold')
    expect(generateClass.fontWeightVariant({ weight: 'bold' })).toBe(
      'font-bold',
    )
  })
  it('textAlignVariant: center returns text-center', () => {
    expect(generateClass.textAlignVariant({ align: 'center' })).toBe(
      'text-center',
    )
  })
})

describe('generateClass namespace — border width variants', () => {
  it('borderWidthVariant: 1 returns border-[1px]', () => {
    expect(borderWidthVariant({ width: 1 })).toBe('border-[1px]')
    expect(generateClass.borderWidthVariant({ width: 1 })).toBe('border-[1px]')
  })
  it('borderWidthVariant: 12 returns border-[12px]', () => {
    expect(borderWidthVariant({ width: 12 })).toBe('border-[12px]')
  })
  it('borderWidthVariant: out-of-range returns empty string', () => {
    expect(borderWidthVariant({ width: 0 as any })).toBe('')
  })
})

describe('generateClass namespace — opacity variants', () => {
  it('opacityVariant: 50 returns opacity-50', () => {
    expect(opacityVariant({ opacity: 50 })).toBe('opacity-50')
    expect(generateClass.opacityVariant({ opacity: 50 })).toBe('opacity-50')
  })
  it('opacityVariant: 10 returns opacity-10', () => {
    expect(opacityVariant({ opacity: 10 })).toBe('opacity-10')
  })
  it('opacityVariant: invalid value returns empty string', () => {
    expect(opacityVariant({ opacity: 55 as any })).toBe('')
  })
})

describe('generateClass namespace — spacing variants', () => {
  it('marginVariant: sm returns m-sm', () => {
    expect(marginVariant({ spacing: 'sm' })).toBe('m-sm')
    expect(generateClass.marginVariant({ spacing: 'sm' })).toBe('m-sm')
  })
  it('paddingVariant: lg returns p-lg', () => {
    expect(paddingVariant({ spacing: 'lg' })).toBe('p-lg')
    expect(generateClass.paddingVariant({ spacing: 'lg' })).toBe('p-lg')
  })
  it('gapVariant: 0 returns gap-0', () => {
    expect(gapVariant({ spacing: '0' })).toBe('gap-0')
    expect(generateClass.gapVariant({ spacing: '0' })).toBe('gap-0')
  })
})

describe('generateClass namespace — peer and focus-visible variants', () => {
  it('peerCheckedBgColorVariant: warning returns peer-checked:bg-warning', () => {
    expect(peerCheckedBgColorVariant({ color: 'warning' })).toBe(
      'peer-checked:bg-warning',
    )
    expect(generateClass.peerCheckedBgColorVariant({ color: 'warning' })).toBe(
      'peer-checked:bg-warning',
    )
  })
  it('peerCheckedBgColorVariant: dark-4 returns peer-checked:bg-dark-4, not dark-1', () => {
    // The hand-written maps this variant replaces both mapped dark-4 to bg-dark-1.
    expect(peerCheckedBgColorVariant({ color: 'dark-4' })).toBe(
      'peer-checked:bg-dark-4',
    )
  })
  it('peerCheckedBgColorVariant: unknown color returns empty string', () => {
    expect(peerCheckedBgColorVariant({ color: 'neon-green' as any })).toBe('')
  })
  it('peerFocusVisibleRingColorVariant: primary returns peer-focus-visible:ring-primary', () => {
    expect(peerFocusVisibleRingColorVariant({ color: 'primary' })).toBe(
      'peer-focus-visible:ring-primary',
    )
    expect(
      generateClass.peerFocusVisibleRingColorVariant({ color: 'primary' }),
    ).toBe('peer-focus-visible:ring-primary')
  })
  it('focusVisibleRingColorVariant: light-4 returns focus-visible:ring-light-4', () => {
    expect(focusVisibleRingColorVariant({ color: 'light-4' })).toBe(
      'focus-visible:ring-light-4',
    )
    expect(generateClass.focusVisibleRingColorVariant({ color: 'light-4' })).toBe(
      'focus-visible:ring-light-4',
    )
  })
  it('all three cover every ColorPalette member', () => {
    // Keyed by ColorPalette rather than written as a literal list: adding a
    // member to the palette without a variant entry then fails to compile here
    // instead of silently dropping out of the sweep.
    const expectedSuffix: Record<ColorPalette, string> = {
      primary: 'primary',
      secondary: 'secondary',
      success: 'success',
      danger: 'danger',
      info: 'info',
      warning: 'warning',
      'light-1': 'light-1',
      'light-2': 'light-2',
      'light-3': 'light-3',
      'light-4': 'light-4',
      'dark-1': 'dark-1',
      'dark-2': 'dark-2',
      'dark-3': 'dark-3',
      'dark-4': 'dark-4',
      black: 'black',
      white: 'white',
      transparent: 'transparent',
    }
    const colors = Object.keys(expectedSuffix) as ColorPalette[]
    expect(colors).toHaveLength(17)
    for (const color of colors) {
      const suffix = expectedSuffix[color]
      expect(peerCheckedBgColorVariant({ color })).toBe(
        `peer-checked:bg-${suffix}`,
      )
      expect(peerFocusVisibleRingColorVariant({ color })).toBe(
        `peer-focus-visible:ring-${suffix}`,
      )
      expect(focusVisibleRingColorVariant({ color })).toBe(
        `focus-visible:ring-${suffix}`,
      )
    }
  })
})
