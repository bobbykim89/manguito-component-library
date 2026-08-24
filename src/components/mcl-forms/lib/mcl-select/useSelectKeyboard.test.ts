import { describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { useSelectKeyboard } from './useSelectKeyboard'

const setup = (overrides: Record<string, unknown> = {}) => {
  const isOpen = ref(false)
  const activeIndex = ref(-1)
  const onSelect = vi.fn()
  const onClear = vi.fn()
  const onActiveChange = vi.fn()
  const kb = useSelectKeyboard({
    isOpen,
    activeIndex,
    optionCount: 3,
    idPrefix: 'colour',
    onSelect,
    onClear,
    onActiveChange,
    ...overrides,
  })
  return { isOpen, activeIndex, onSelect, onClear, onActiveChange, kb }
}

const key = (k: string, init: KeyboardEventInit = {}) =>
  new KeyboardEvent('keydown', { key: k, cancelable: true, ...init })

describe('useSelectKeyboard — opening', () => {
  it('ArrowDown opens a closed listbox without selecting', () => {
    const { isOpen, activeIndex, onSelect, kb } = setup()
    kb.onKeydown(key('ArrowDown'))
    expect(isOpen.value).toBe(true)
    expect(activeIndex.value).toBe(-1)
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('Alt+ArrowDown opens without selecting', () => {
    const { isOpen, activeIndex, kb } = setup()
    kb.onKeydown(key('ArrowDown', { altKey: true }))
    expect(isOpen.value).toBe(true)
    expect(activeIndex.value).toBe(-1)
  })

  it('prevents default on ArrowDown so the page does not scroll', () => {
    const { kb } = setup()
    const event = key('ArrowDown')
    kb.onKeydown(event)
    expect(event.defaultPrevented).toBe(true)
  })
})

describe('useSelectKeyboard — moving', () => {
  it('ArrowDown moves from -1 to 0 then onward, clamping at the end', () => {
    const { isOpen, activeIndex, kb } = setup()
    isOpen.value = true
    kb.onKeydown(key('ArrowDown'))
    expect(activeIndex.value).toBe(0)
    kb.onKeydown(key('ArrowDown'))
    kb.onKeydown(key('ArrowDown'))
    expect(activeIndex.value).toBe(2)
    kb.onKeydown(key('ArrowDown'))
    expect(activeIndex.value).toBe(2)
  })

  it('ArrowUp moves back and clamps at 0', () => {
    const { isOpen, activeIndex, kb } = setup()
    isOpen.value = true
    activeIndex.value = 2
    kb.onKeydown(key('ArrowUp'))
    expect(activeIndex.value).toBe(1)
    kb.onKeydown(key('ArrowUp'))
    kb.onKeydown(key('ArrowUp'))
    expect(activeIndex.value).toBe(0)
  })

  it('Home and End jump to the ends', () => {
    const { isOpen, activeIndex, kb } = setup()
    isOpen.value = true
    kb.onKeydown(key('End'))
    expect(activeIndex.value).toBe(2)
    kb.onKeydown(key('Home'))
    expect(activeIndex.value).toBe(0)
  })

  it('prevents default on Home and End', () => {
    const { isOpen, kb } = setup()
    isOpen.value = true
    const home = key('Home')
    const end = key('End')
    kb.onKeydown(home)
    kb.onKeydown(end)
    expect(home.defaultPrevented).toBe(true)
    expect(end.defaultPrevented).toBe(true)
  })

  it('notifies onActiveChange so the caller can scroll it into view', () => {
    const { isOpen, onActiveChange, kb } = setup()
    isOpen.value = true
    kb.onKeydown(key('ArrowDown'))
    expect(onActiveChange).toHaveBeenCalledWith(0)
  })

  it('ignores movement keys while closed except the opening ones', () => {
    const { activeIndex, kb } = setup()
    kb.onKeydown(key('Home'))
    expect(activeIndex.value).toBe(-1)
  })
})

describe('useSelectKeyboard — committing and dismissing', () => {
  it('Enter selects the active option', () => {
    const { isOpen, activeIndex, onSelect, kb } = setup()
    isOpen.value = true
    activeIndex.value = 1
    kb.onKeydown(key('Enter'))
    expect(onSelect).toHaveBeenCalledWith(1)
  })

  it('Enter does nothing with no active option', () => {
    const { isOpen, onSelect, kb } = setup()
    isOpen.value = true
    kb.onKeydown(key('Enter'))
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('Enter does nothing while closed', () => {
    const { activeIndex, onSelect, kb } = setup()
    activeIndex.value = 1
    kb.onKeydown(key('Enter'))
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('Escape closes and keeps the value', () => {
    // The old handler wiped the model on every Escape, which contradicts the
    // ARIA combobox pattern.
    const { isOpen, onClear, kb } = setup()
    isOpen.value = true
    kb.onKeydown(key('Escape'))
    expect(isOpen.value).toBe(false)
    expect(onClear).not.toHaveBeenCalled()
  })

  it('a second Escape while closed clears', () => {
    const { isOpen, onClear, kb } = setup()
    kb.onKeydown(key('Escape'))
    expect(onClear).toHaveBeenCalledTimes(1)
    expect(isOpen.value).toBe(false)
  })

  it('Tab closes without committing and does not prevent default', () => {
    const { isOpen, onSelect, kb } = setup()
    isOpen.value = true
    const event = key('Tab')
    kb.onKeydown(event)
    expect(isOpen.value).toBe(false)
    expect(onSelect).not.toHaveBeenCalled()
    expect(event.defaultPrevented).toBe(false)
  })
})

describe('useSelectKeyboard — activeDescendantId', () => {
  it('is undefined while closed', () => {
    const { kb } = setup()
    expect(kb.activeDescendantId.value).toBeUndefined()
  })

  it('is undefined when open with nothing active', () => {
    const { isOpen, kb } = setup()
    isOpen.value = true
    expect(kb.activeDescendantId.value).toBeUndefined()
  })

  it('names the active option when one is active', () => {
    const { isOpen, activeIndex, kb } = setup()
    isOpen.value = true
    activeIndex.value = 1
    expect(kb.activeDescendantId.value).toBe('colour-option-1')
  })
})

describe('useSelectKeyboard — boundary conditions with empty lists', () => {
  it('ArrowDown with empty list keeps activeIndex at -1 and does not call onActiveChange', () => {
    const { isOpen, activeIndex, onActiveChange, kb } = setup({ optionCount: 0 })
    isOpen.value = true
    kb.onKeydown(key('ArrowDown'))
    expect(activeIndex.value).toBe(-1)
    expect(onActiveChange).not.toHaveBeenCalled()
  })

  it('Home with empty list keeps activeIndex at -1', () => {
    const { isOpen, activeIndex, kb } = setup({ optionCount: 0 })
    isOpen.value = true
    kb.onKeydown(key('Home'))
    expect(activeIndex.value).toBe(-1)
  })

  it('End with empty list keeps activeIndex at -1', () => {
    const { isOpen, activeIndex, kb } = setup({ optionCount: 0 })
    isOpen.value = true
    kb.onKeydown(key('End'))
    expect(activeIndex.value).toBe(-1)
  })

  it('Enter after ArrowDown on empty list does not call onSelect', () => {
    const { isOpen, onSelect, kb } = setup({ optionCount: 0 })
    isOpen.value = true
    kb.onKeydown(key('ArrowDown'))
    kb.onKeydown(key('Enter'))
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('activeDescendantId stays undefined even after navigation on empty list', () => {
    const { isOpen, kb } = setup({ optionCount: 0 })
    isOpen.value = true
    kb.onKeydown(key('ArrowDown'))
    expect(kb.activeDescendantId.value).toBeUndefined()
  })

  it('ArrowUp from nothing goes to the last option', () => {
    const { isOpen, activeIndex, kb } = setup()
    isOpen.value = true
    kb.onKeydown(key('ArrowUp'))
    expect(activeIndex.value).toBe(2)
  })

  it('ArrowDown from nothing still goes to the first option', () => {
    const { isOpen, activeIndex, kb } = setup()
    isOpen.value = true
    kb.onKeydown(key('ArrowDown'))
    expect(activeIndex.value).toBe(0)
  })
})
