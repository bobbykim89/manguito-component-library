import { describe, expect, it } from 'vitest'
import { ValidateMclClass } from '../validator'

describe('ValidateMclClass.validateColorType', () => {
  const v = new ValidateMclClass('BGCOLOR')
  it('returns true for a valid color palette value', () => {
    expect(v.validateColorType('primary')).toBe(true)
  })
  it('returns true for hyphenated colors like light-1', () => {
    expect(v.validateColorType('light-1')).toBe(true)
  })
  it('returns false for an invalid color string', () => {
    expect(v.validateColorType('neon-green' as any)).toBe(false)
  })
  it('returns false for a non-string value', () => {
    expect(v.validateColorType(42 as any)).toBe(false)
  })
  it('returns false when classType is not a color type', () => {
    const wrongType = new ValidateMclClass('MARGIN')
    expect(wrongType.validateColorType('primary')).toBe(false)
  })
})

describe('ValidateMclClass.validateSpaceType', () => {
  const v = new ValidateMclClass('MARGIN')
  it('returns true for a valid spacing level', () => {
    expect(v.validateSpaceType('md')).toBe(true)
  })
  it('returns true for 0', () => {
    expect(v.validateSpaceType('0')).toBe(true)
  })
  it('returns false for an invalid spacing string', () => {
    expect(v.validateSpaceType('huge' as any)).toBe(false)
  })
  it('returns false when classType is not a spacing type', () => {
    const wrongType = new ValidateMclClass('BGCOLOR')
    expect(wrongType.validateSpaceType('md')).toBe(false)
  })
})

describe('ValidateMclClass.validateHeadingTextSizeType', () => {
  const v = new ValidateMclClass('H1')
  it('returns true for a valid heading size', () => {
    expect(v.validateHeadingTextSizeType('lg')).toBe(true)
  })
  it('returns false for an invalid size string', () => {
    expect(v.validateHeadingTextSizeType('jumbo' as any)).toBe(false)
  })
  it('returns false when classType is not a heading type', () => {
    const wrongType = new ValidateMclClass('BODYTEXT')
    expect(wrongType.validateHeadingTextSizeType('md')).toBe(false)
  })
})

describe('ValidateMclClass.validateBodyTextSizeType', () => {
  const v = new ValidateMclClass('BODYTEXT')
  it('returns true for a valid body text size', () => {
    expect(v.validateBodyTextSizeType('sm')).toBe(true)
  })
  it('returns false for an invalid size', () => {
    expect(v.validateBodyTextSizeType('huge' as any)).toBe(false)
  })
})

describe('ValidateMclClass.validateFontWeightType', () => {
  const v = new ValidateMclClass('FONTWEIGHT')
  it('returns true for bold', () => {
    expect(v.validateFontWeightType('bold')).toBe(true)
  })
  it('returns true for light', () => {
    expect(v.validateFontWeightType('light')).toBe(true)
  })
  it('returns false for an invalid weight', () => {
    expect(v.validateFontWeightType('heavy' as any)).toBe(false)
  })
})

describe('ValidateMclClass.validateOpacityType', () => {
  const v = new ValidateMclClass('OPACITY')
  it('returns true for 100', () => {
    expect(v.validateOpacityType(100)).toBe(true)
  })
  it('returns true for a valid multiple of 10', () => {
    expect(v.validateOpacityType(70)).toBe(true)
  })
  it('returns false for a non-multiple of 10', () => {
    expect(v.validateOpacityType(55 as any)).toBe(false)
  })
  it('returns false for a string value', () => {
    expect(v.validateOpacityType('50' as any)).toBe(false)
  })
})

describe('ValidateMclClass.validateRangeType', () => {
  const v = new ValidateMclClass('BORDERW')
  it('returns true for 1', () => {
    expect(v.validateRangeType(1)).toBe(true)
  })
  it('returns true for 12', () => {
    expect(v.validateRangeType(12)).toBe(true)
  })
  it('returns false for 0', () => {
    expect(v.validateRangeType(0 as any)).toBe(false)
  })
  it('returns false for 13', () => {
    expect(v.validateRangeType(13 as any)).toBe(false)
  })
  it('returns false for a string value', () => {
    expect(v.validateRangeType('5' as any)).toBe(false)
  })
})

describe('ValidateMclClass.validateAlignment', () => {
  const v = new ValidateMclClass('TEXTALIGN')
  it('returns true for center', () => {
    expect(v.validateAlignment('center')).toBe(true)
  })
  it('returns true for right', () => {
    expect(v.validateAlignment('right')).toBe(true)
  })
  it('returns false for an invalid alignment', () => {
    expect(v.validateAlignment('justify' as any)).toBe(false)
  })
})
