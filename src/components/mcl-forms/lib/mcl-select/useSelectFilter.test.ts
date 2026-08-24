import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import type { SelectOptionType } from './index.types'
import {
  escapeRegExp,
  optionLabel,
  optionValue,
  useSelectFilter,
} from './useSelectFilter'

describe('escapeRegExp', () => {
  it('escapes regex metacharacters', () => {
    expect(escapeRegExp('a(b)c')).toBe('a\\(b\\)c')
    expect(escapeRegExp('1+1')).toBe('1\\+1')
    expect(escapeRegExp('a.b')).toBe('a\\.b')
  })
  it('leaves plain text alone', () => {
    expect(escapeRegExp('hello')).toBe('hello')
  })
})

describe('optionLabel / optionValue', () => {
  it('reads a string option as both label and value', () => {
    expect(optionLabel('red')).toBe('red')
    expect(optionValue('red')).toBe('red')
  })
  it('reads an object option', () => {
    const option: SelectOptionType = { text: 'Red', value: 1 }
    expect(optionLabel(option)).toBe('Red')
    expect(optionValue(option)).toBe(1)
  })
})

describe('useSelectFilter', () => {
  const strings = ['Red', 'Green', 'Blue']
  const objects: SelectOptionType[] = [
    { text: 'Red', value: 1 },
    { text: 'Green', value: 2 },
    { text: 'Blue', value: 3 },
  ]

  it('returns every option for an empty query', () => {
    const filtered = useSelectFilter(strings, '')
    expect(filtered.value).toHaveLength(3)
  })

  it('filters string options case-insensitively', () => {
    expect(useSelectFilter(strings, 're').value).toEqual(['Red', 'Green'])
    expect(useSelectFilter(strings, 'RED').value).toEqual(['Red'])
  })

  it('filters object options on their text', () => {
    expect(useSelectFilter(objects, 'blu').value).toEqual([{ text: 'Blue', value: 3 }])
  })

  it('returns an empty array when nothing matches', () => {
    expect(useSelectFilter(strings, 'zzz').value).toEqual([])
  })

  it('does not throw on regex metacharacters', () => {
    // The old implementation did `new RegExp(query, 'gi')`, so this threw.
    expect(() => useSelectFilter(strings, '(').value).not.toThrow()
    expect(useSelectFilter(strings, '(').value).toEqual([])
  })

  it('matches a literal parenthesis when one is present', () => {
    const withParens = ['Red (dark)', 'Green']
    expect(useSelectFilter(withParens, '(dark)').value).toEqual(['Red (dark)'])
  })

  it('recomputes when the query ref changes', () => {
    const query = ref('')
    const filtered = useSelectFilter(strings, query)
    expect(filtered.value).toHaveLength(3)
    query.value = 'blue'
    expect(filtered.value).toEqual(['Blue'])
  })

  it('recomputes when the options ref changes', () => {
    const options = ref<string[]>(['Red'])
    const filtered = useSelectFilter(options, '')
    expect(filtered.value).toEqual(['Red'])
    options.value = ['Red', 'Green']
    expect(filtered.value).toEqual(['Red', 'Green'])
  })
})
