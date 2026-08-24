import { computed, toValue, type ComputedRef, type MaybeRefOrGetter } from 'vue'
import type { SelectOptionType, SelectOptions } from './index.types'

/**
 * Escapes regex metacharacters so a user's query is matched literally.
 *
 * @param value - raw query text.
 * @returns the query with metacharacters escaped.
 */
export const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/**
 * Reads an option's display text, normalising the string/object union.
 *
 * @param option - a plain string option or a `{ text, value }` option.
 * @returns the text to render.
 */
export const optionLabel = (option: string | SelectOptionType): string =>
  typeof option === 'string' ? option : option.text

/**
 * Reads an option's model value, normalising the string/object union.
 *
 * @param option - a plain string option or a `{ text, value }` option.
 * @returns the value to emit.
 */
export const optionValue = (
  option: string | SelectOptionType,
): string | number => (typeof option === 'string' ? option : option.value)

/**
 * Filters options by a query, matching case-insensitively on the option's
 * display text.
 *
 * @param options - the full option list; ref, getter or plain value.
 * @param query - the current query text; ref, getter or plain value.
 * @returns the matching options, or all of them when the query is empty.
 */
export const useSelectFilter = (
  options: MaybeRefOrGetter<SelectOptions>,
  query: MaybeRefOrGetter<string>,
): ComputedRef<(string | SelectOptionType)[]> =>
  computed<(string | SelectOptionType)[]>(() => {
    const all = toValue(options) as (string | SelectOptionType)[]
    const term = toValue(query)
    if (term === '') {
      return all
    }
    // Escaped, because an unescaped query throws on `(` and friends.
    const pattern = new RegExp(escapeRegExp(term), 'i')
    return all.filter((option) => pattern.test(optionLabel(option)))
  })
