import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import {
  getTargetElem,
  getTargetId,
  hasVisibleAttr,
  toggleVisibility,
} from '../shared.fn'

describe('getTargetId', () => {
  it('returns href without # for an anchor element', () => {
    const anchor = document.createElement('a')
    anchor.setAttribute('href', '#my-section')
    expect(getTargetId(anchor)).toBe('my-section')
  })
  it('returns href as-is when no leading # for an anchor element', () => {
    const anchor = document.createElement('a')
    anchor.setAttribute('href', 'my-section')
    expect(getTargetId(anchor)).toBe('my-section')
  })
  it('returns null for an anchor with no href', () => {
    const anchor = document.createElement('a')
    expect(getTargetId(anchor)).toBeNull()
  })
  it('returns directiveArg for a non-anchor element', () => {
    const div = document.createElement('div')
    expect(getTargetId(div, 'target-id')).toBe('target-id')
  })
  it('returns null for a non-anchor element with no directiveArg', () => {
    const div = document.createElement('div')
    expect(getTargetId(div)).toBeNull()
  })
})

describe('getTargetElem', () => {
  beforeEach(() => {
    const el = document.createElement('div')
    el.id = 'test-target'
    document.body.appendChild(el)
  })
  afterEach(() => {
    document.getElementById('test-target')?.remove()
  })

  it('returns the element when it exists in the DOM', () => {
    const result = getTargetElem('test-target')
    expect(result).not.toBeNull()
    expect(result?.id).toBe('test-target')
  })
  it('returns null when no element matches the id', () => {
    expect(getTargetElem('does-not-exist')).toBeNull()
  })
  it('returns null when targetId is null', () => {
    expect(getTargetElem(null)).toBeNull()
  })
})

describe('hasVisibleAttr', () => {
  it('returns true when element has a visible attribute', () => {
    const el = document.createElement('div')
    el.setAttribute('visible', 'true')
    expect(hasVisibleAttr(el)).toBe(true)
  })
  it('returns false when element has no visible attribute', () => {
    const el = document.createElement('div')
    expect(hasVisibleAttr(el)).toBe(false)
  })
})

describe('toggleVisibility', () => {
  it('flips visible from true to false', () => {
    const el = document.createElement('div')
    el.setAttribute('visible', 'true')
    toggleVisibility(el)
    expect(el.getAttribute('visible')).toBe('false')
  })
  it('flips visible from false to true', () => {
    const el = document.createElement('div')
    el.setAttribute('visible', 'false')
    toggleVisibility(el)
    expect(el.getAttribute('visible')).toBe('true')
  })
  it('sets visible to true when attribute is absent', () => {
    const el = document.createElement('div')
    toggleVisibility(el)
    expect(el.getAttribute('visible')).toBe('true')
  })
})
