<script setup lang="ts">
import type { ColorPalette } from '@bobbykim/manguito-theme'
import { generateClass } from '@bobbykim/manguito-theme'
import { vClickOutside } from '@bobbykim/manguito-theme/directives'
import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue'
import { useResizeObserver } from '@vueuse/core'
import { computed, ref, watch, type ComponentPublicInstance } from 'vue'
import CaretDown from '../assets/CaretDown.vue'
import XMark from '../assets/XMark.vue'
import FieldFeedback from '../common/FieldFeedback.vue'
import { useFieldContext } from '../common/fieldContext'
import { useInputSurface } from '../common/useInputSurface'
import type { SelectOptionType, SelectOptions } from './index.types'
import { optionLabel, optionValue, useSelectFilter } from './useSelectFilter'
import { useSelectKeyboard } from './useSelectKeyboard'

const props = withDefaults(
  defineProps<{
    options: SelectOptions
    id?: string
    name?: string
    placeholder?: string
    showBorder?: boolean
    borderColor?: ColorPalette
    rounded?: boolean
    showHighlight?: boolean
    highlightColor?: ColorPalette
    textColor?: ColorPalette
    bgColor?: ColorPalette
    iconColor?: ColorPalette
    optionHoverColor?: ColorPalette
    showShadow?: boolean
    noMatchText?: string
    invalidFeedback?: string
    invalid?: boolean
    required?: boolean
    disabled?: boolean
  }>(),
  {
    placeholder: '',
    showBorder: false,
    borderColor: 'light-4',
    rounded: false,
    showHighlight: true,
    highlightColor: 'primary',
    textColor: 'black',
    bgColor: 'light-1',
    iconColor: 'dark-4',
    optionHoverColor: 'primary',
    showShadow: true,
    noMatchText: 'No match.',
    invalid: undefined,
    required: undefined,
    disabled: undefined,
  },
)

const model = defineModel<string | number | null>({ default: null })

const emit = defineEmits<{
  (e: 'open'): void
  (e: 'close'): void
  (e: 'clear'): void
  (e: 'changed', value: string | number): void
  (e: 'select', value: string | number): void
}>()

defineSlots<{
  dropdown?(props: {
    options: (string | SelectOptionType)[]
    activeIndex: number
    optionClick: (option: string | SelectOptionType) => void
    setRef: (el: Element | ComponentPublicInstance | null, index: number) => void
    hover: (index: number) => void
    optionId: (index: number) => string
  }): unknown
  'no-match'?: () => unknown
  'invalid-feedback'?: () => unknown
}>()

const field = useFieldContext(props)
const surfaceClass = useInputSurface(props)

const rootRef = ref<HTMLElement>()
const inputRef = ref<HTMLInputElement>()
const dropdownRef = ref<HTMLElement>()
const itemRefs = ref<Array<Element | ComponentPublicInstance | null>>([])
const dropdownWidth = ref<number>()

const isOpen = ref<boolean>(false)
const activeIndex = ref<number>(-1)

/** The label to show for a model value, so the box is not blank on mount. */
const labelForValue = (value: string | number | null): string => {
  if (value === null || value === '') return ''
  const match = (props.options as (string | SelectOptionType)[]).find(
    (option) => optionValue(option) === value,
  )
  return match ? optionLabel(match) : String(value)
}

// Seeded from the model: a select mounted with a value must render it, and the
// clear button only appears once there is text to clear.
const query = ref<string>(labelForValue(model.value))
// A query seeded from the model is a display label, not a filter. The APG
// list-autocomplete pattern opens showing every option with the selection
// marked, and narrows only once the user types — so filtering is gated on real
// input rather than on `query` being non-empty.
const isFiltering = ref<boolean>(false)

const filteredOptions = useSelectFilter(
  () => props.options,
  () => (isFiltering.value ? query.value : ''),
)

const setItemRef = (
  el: Element | ComponentPublicInstance | null,
  index: number,
): void => {
  itemRefs.value[index] = el
}

const scrollActiveIntoView = (index: number): void => {
  const el = itemRefs.value[index] as HTMLElement | undefined
  el?.scrollIntoView?.({ block: 'nearest' })
}

// Every entry point routes through these two rather than repeating the state
// writes inline: focus, the caret, click-outside, Escape and Tab all opened or
// closed the list longhand, and only some of them knew `isFiltering` existed.
const openList = (): void => {
  isOpen.value = true
  isFiltering.value = false
  activeIndex.value = -1
}

const closeList = (): void => {
  isOpen.value = false
  activeIndex.value = -1
}

const commit = (option: string | SelectOptionType): void => {
  query.value = optionLabel(option)
  const value = optionValue(option)
  model.value = value
  // Cleared before closing so the falling-edge watcher's label restore is a
  // no-op here: `query` already holds the committed option's label.
  isFiltering.value = false
  isOpen.value = false
  activeIndex.value = -1
  emit('select', value)
}

const clear = (): void => {
  query.value = ''
  activeIndex.value = -1
  model.value = null
  isFiltering.value = false
  emit('clear')
}

const { onKeydown, activeDescendantId } = useSelectKeyboard({
  isOpen,
  activeIndex,
  optionCount: () => filteredOptions.value.length,
  idPrefix: () => field.id,
  onSelect: (index) => {
    // `activeIndex` can outlive the option it pointed at, because the
    // candidate set shrinks whenever the query narrows or the parent swaps
    // `options`. Committing an out-of-range index reads `undefined`.
    const option = filteredOptions.value[index]
    if (option !== undefined) commit(option)
  },
  onClear: clear,
  onActiveChange: scrollActiveIntoView,
})

const toggle = (): void => {
  if (isOpen.value) {
    closeList()
    return
  }
  openList()
  inputRef.value?.focus()
}

const highlightClass = computed<string>(() => {
  const classArray: string[] = [
    generateClass.beforeBgColorVariant({ color: props.highlightColor }),
  ]
  if (props.rounded) classArray.push('rounded-b-md')
  return classArray.join(' ')
})

const listboxClass = computed<string>(() => {
  const classArray: string[] = [
    generateClass.bgColorVariant({ color: props.bgColor }),
    generateClass.borderColorVariant({ color: props.borderColor }),
  ]
  if (!props.showHighlight) classArray.push('mt-2xs')
  if (props.rounded) classArray.push('rounded-md')
  return classArray.join(' ')
})

const isSelected = (option: string | SelectOptionType): boolean =>
  model.value !== null && model.value !== '' && optionValue(option) === model.value

const { floatingStyles } = useFloating(rootRef, dropdownRef, {
  whileElementsMounted: autoUpdate,
  strategy: 'absolute',
  open: isOpen,
  transform: false,
  placement: 'bottom',
  middleware: [flip(), offset(-2.2), shift()],
})

useResizeObserver(rootRef, () => {
  if (rootRef.value) dropdownWidth.value = rootRef.value.clientWidth
})

// A candidate set that changes under a live highlight leaves `activeIndex`
// pointing at an option that no longer exists: Enter would commit `undefined`
// and `aria-activedescendant` would name a missing element.
watch(filteredOptions, () => {
  activeIndex.value = -1
})

// The falling edge is the one place a filter session ends, so every close path
// — caret, click-outside, Escape, Tab — restores the display label and drops
// the filter without each site having to remember to.
watch(isOpen, (open) => {
  if (open) {
    emit('open')
    return
  }
  if (isFiltering.value) {
    query.value = labelForValue(model.value)
    isFiltering.value = false
  }
  emit('close')
})

// A form that disables itself on submit must not leave an open listbox behind
// that still commits on click.
watch(
  () => field.disabled.value,
  (isDisabled) => {
    if (isDisabled) closeList()
  },
)

// Keeps the box in sync with the model when it is set from outside. `commit`
// has already written the same label, so this is a no-op in that path.
watch(model, (value) => {
  query.value = labelForValue(value)
  isFiltering.value = false
  if (value !== null) emit('changed', value)
})
</script>

<template>
  <div ref="rootRef" v-click-outside="closeList" class="relative">
    <div
      class="relative flex gap-3xs p-2xs"
      :class="[
        surfaceClass,
        !showHighlight &&
          isOpen &&
          generateClass.ringColorVariant({ color: borderColor }) + ' ring-4',
      ]"
    >
      <input
        :id="field.id"
        ref="inputRef"
        v-model="query"
        type="text"
        role="combobox"
        autocomplete="off"
        class="w-full bg-transparent outline-none disabled:cursor-not-allowed"
        :name="field.name.value"
        :placeholder="placeholder"
        :disabled="field.disabled.value"
        aria-autocomplete="list"
        :aria-expanded="isOpen"
        :aria-controls="`${field.id}-listbox`"
        :aria-activedescendant="activeDescendantId"
        :aria-required="field.required.value || undefined"
        :aria-invalid="field.invalid.value || undefined"
        :aria-describedby="field.describedBy.value"
        @focus="openList"
        @input="isFiltering = true"
        @keydown="onKeydown"
      />
      <!-- A real button now: the old <div @click> was neither focusable nor named. -->
      <button
        v-if="query !== ''"
        data-mcl="clear"
        type="button"
        aria-label="Clear selection"
        class="flex items-center px-3xs"
        :disabled="field.disabled.value"
        @click="clear"
      >
        <x-mark :color="iconColor" class-name="h-xs opacity-70"></x-mark>
      </button>
      <!--
        tabindex="-1" on purpose: the input already carries aria-expanded, so a
        second tab stop for the same action is noise for keyboard users.
      -->
      <button
        data-mcl="caret"
        type="button"
        tabindex="-1"
        aria-label="Toggle options"
        class="flex items-center px-3xs"
        :disabled="field.disabled.value"
        @click="toggle"
      >
        <caret-down
          :color="iconColor"
          :class-name="`h-xs transition-transform duration-300 ease-in ${isOpen ? 'rotate-180' : 'rotate-0'}`"
        ></caret-down>
      </button>
    </div>

    <div
      v-if="showHighlight"
      class="relative -top-1 h-3xs overflow-hidden before:absolute before:bottom-0 before:left-0 before:h-full before:transition-[width] before:duration-300 before:ease-linear"
      :class="[isOpen ? 'before:w-full' : 'before:w-0', highlightClass]"
    ></div>

    <transition name="options">
      <ul
        v-if="isOpen && filteredOptions.length > 0"
        :id="`${field.id}-listbox`"
        ref="dropdownRef"
        role="listbox"
        class="max-h-[12.5rem] overflow-y-auto border-2"
        :class="listboxClass"
        :style="{ width: `${dropdownWidth}px`, ...floatingStyles }"
      >
        <slot
          name="dropdown"
          :options="filteredOptions"
          :active-index="activeIndex"
          :option-click="commit"
          :set-ref="setItemRef"
          :hover="(index: number) => (activeIndex = index)"
          :option-id="(index: number) => `${field.id}-option-${index}`"
        >
          <li
            v-for="(option, index) in filteredOptions"
            :id="`${field.id}-option-${index}`"
            :key="index"
            :ref="(el) => setItemRef(el, index)"
            role="option"
            class="cursor-pointer p-2xs"
            :aria-selected="isSelected(option)"
            :class="[
              activeIndex === index &&
                generateClass.bgColorVariant({ color: optionHoverColor }),
            ]"
            @click="commit(option)"
            @mouseenter="activeIndex = index"
          >
            {{ optionLabel(option) }}
          </li>
        </slot>
      </ul>
    </transition>

    <!--
      Outside the listbox, deliberately. An <li aria-live> inside
      role="listbox" is announced to screen readers as a selectable option.
      It takes over the listbox id and the popup's own border, width and
      floating position: it is the element `aria-controls` names while it is
      the one on screen. It is mutually exclusive with the <ul> in state, but
      the two overlap for the duration of the <transition> leave, so the
      listbox id is briefly duplicated. The shared `dropdownRef` still
      resolves to this region: Vue nulls a string ref synchronously on
      unmount, while this region's ref assignment is queued as a post-render
      job in the same flush, so it runs after the <ul>'s unmount clears the
      ref.
    -->
    <div
      v-if="isOpen && filteredOptions.length === 0"
      :id="`${field.id}-listbox`"
      ref="dropdownRef"
      role="status"
      class="border-2 p-2xs"
      :class="listboxClass"
      :style="{ width: `${dropdownWidth}px`, ...floatingStyles }"
    >
      <slot name="no-match">
        <span>{{ noMatchText }}</span>
      </slot>
    </div>

    <field-feedback
      v-if="!field.feedbackOwnedByGroup"
      :id="field.errorId"
      :invalid="field.invalid.value"
      :text="invalidFeedback"
    >
      <slot v-if="$slots['invalid-feedback']" name="invalid-feedback" />
    </field-feedback>
  </div>
</template>

<style lang="scss" scoped>
.options-enter-active,
.options-leave-active {
  opacity: 1;
  transition:
    opacity 0.3s linear,
    transform 0.3s linear;
}
.options-enter-from,
.options-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
/* Replaces the two transition hooks that set style.pointerEvents by hand. */
.options-leave-active {
  pointer-events: none;
}
</style>
