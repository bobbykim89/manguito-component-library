import { describe, expect, it } from 'vitest'
import { generateClass } from '../index'

describe('generateClass — color types', () => {
  it('BGCOLOR: valid color returns mcl-bg-* class', () => {
    expect(generateClass('BGCOLOR', 'primary')).toBe('mcl-bg-primary')
  })
  it('BGCOLOR: invalid color returns single space', () => {
    expect(generateClass('BGCOLOR', 'neon-green' as any)).toBe(' ')
  })
  it('HVBGCOLOR: valid color returns hover:bg-* class', () => {
    expect(generateClass('HVBGCOLOR', 'secondary')).toBe('hover:bg-secondary')
  })
  it('TEXTCOLOR: valid color returns text-* class', () => {
    expect(generateClass('TEXTCOLOR', 'success')).toBe('text-success')
  })
  it('OUTLINE: valid color returns mcl-outline-* class', () => {
    expect(generateClass('OUTLINE', 'danger')).toBe('mcl-outline-danger')
  })
  it('FOCUSOUTLINE: valid color returns focus:mcl-outline-* class', () => {
    expect(generateClass('FOCUSOUTLINE', 'primary')).toBe(
      'focus:mcl-outline-primary'
    )
  })
})

describe('generateClass — heading types', () => {
  it('H1: valid size returns h1-* class', () => {
    expect(generateClass('H1', 'sm')).toBe('h1-sm')
  })
  it('H2: valid size returns h2-* class', () => {
    expect(generateClass('H2', 'md')).toBe('h2-md')
  })
  it('H1: invalid size returns single space', () => {
    expect(generateClass('H1', 'jumbo' as any)).toBe(' ')
  })
})

describe('generateClass — text types', () => {
  it('BODYTEXT: valid size returns text-* class', () => {
    expect(generateClass('BODYTEXT', 'md')).toBe('text-md')
  })
  it('FONTWEIGHT: bold returns font-bold', () => {
    expect(generateClass('FONTWEIGHT', 'bold')).toBe('font-bold')
  })
  it('TEXTALIGN: center returns text-center', () => {
    expect(generateClass('TEXTALIGN', 'center')).toBe('text-center')
  })
})

describe('generateClass — border width types', () => {
  it('BORDERW: 1 returns border-[1px]', () => {
    expect(generateClass('BORDERW', 1)).toBe('border-[1px]')
  })
  it('BORDERW: 0 (out of range) returns single space', () => {
    expect(generateClass('BORDERW', 0 as any)).toBe(' ')
  })
})

describe('generateClass — opacity types', () => {
  it('OPACITY: 50 returns opacity-50', () => {
    expect(generateClass('OPACITY', 50)).toBe('opacity-50')
  })
  it('OPACITY: 10 returns opacity-10', () => {
    expect(generateClass('OPACITY', 10)).toBe('opacity-10')
  })
  it('OPACITY: 55 (not a multiple of 10) returns single space', () => {
    expect(generateClass('OPACITY', 55 as any)).toBe(' ')
  })
})

describe('generateClass — spacing types', () => {
  it('MARGIN: sm returns m-sm', () => {
    expect(generateClass('MARGIN', 'sm')).toBe('m-sm')
  })
  it('PADDING: lg returns p-lg', () => {
    expect(generateClass('PADDING', 'lg')).toBe('p-lg')
  })
  it('GAP: 0 returns gap-0', () => {
    expect(generateClass('GAP', '0')).toBe('gap-0')
  })
})
