import {
  computed,
  toValue,
  type ComputedRef,
  type MaybeRefOrGetter,
  type Ref,
} from 'vue'

export interface SelectKeyboardOptions {
  isOpen: Ref<boolean>
  /** The highlighted option index. `-1` means nothing is highlighted. */
  activeIndex: Ref<number>
  optionCount: MaybeRefOrGetter<number>
  /** Used to build option ids as `${idPrefix}-option-${index}`. */
  idPrefix: MaybeRefOrGetter<string>
  onSelect: (index: number) => void
  onClear: () => void
  /** Called after the active index moves, so the caller can scroll it into view. */
  onActiveChange?: (index: number) => void
}

export interface SelectKeyboard {
  onKeydown: (event: KeyboardEvent) => void
  activeDescendantId: ComputedRef<string | undefined>
}

/**
 * Keyboard behaviour for the ARIA combobox-with-listbox pattern.
 *
 * Handlers are bound to `keydown` rather than `keyup` so arrow keys can be
 * prevented from scrolling the page.
 *
 * @param options - reactive open/active state, counts, and the callbacks for
 *   committing and clearing.
 * @returns the `keydown` handler and the `aria-activedescendant` value.
 */
export const useSelectKeyboard = (
  options: SelectKeyboardOptions,
): SelectKeyboard => {
  const { isOpen, activeIndex, onSelect, onClear, onActiveChange } = options

  const move = (next: number): void => {
    const count = toValue(options.optionCount)
    const clamped = Math.max(0, Math.min(next, count - 1))
    activeIndex.value = clamped
    onActiveChange?.(clamped)
  }

  const close = (): void => {
    isOpen.value = false
    activeIndex.value = -1
  }

  const onKeydown = (event: KeyboardEvent): void => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        // Alt+ArrowDown opens without moving, per the APG.
        if (!isOpen.value) {
          isOpen.value = true
          return
        }
        if (event.altKey) return
        move(activeIndex.value + 1)
        return

      case 'ArrowUp':
        event.preventDefault()
        if (!isOpen.value) {
          isOpen.value = true
          return
        }
        move(activeIndex.value - 1)
        return

      case 'Home':
        if (!isOpen.value) return
        event.preventDefault()
        move(0)
        return

      case 'End':
        if (!isOpen.value) return
        event.preventDefault()
        move(toValue(options.optionCount) - 1)
        return

      case 'Enter':
        if (!isOpen.value || activeIndex.value < 0) return
        event.preventDefault()
        onSelect(activeIndex.value)
        return

      case 'Escape':
        // First Escape dismisses and keeps the value; a second, with nothing
        // open, clears it. The old handler wiped the model every time.
        if (isOpen.value) {
          close()
          return
        }
        onClear()
        return

      case 'Tab':
        // Dismiss without committing, and let focus move on.
        if (isOpen.value) {
          close()
        }
        return

      default:
        return
    }
  }

  const activeDescendantId = computed<string | undefined>(() =>
    isOpen.value && activeIndex.value >= 0
      ? `${toValue(options.idPrefix)}-option-${activeIndex.value}`
      : undefined,
  )

  return { onKeydown, activeDescendantId }
}
