<script setup lang="ts">
import type { ColorPalette } from '@bobbykim/manguito-theme'
import generateClass, { vClickOutside } from '@bobbykim/manguito-theme'
import { useResizeObserver } from '@vueuse/core'
import {
  type ComponentPublicInstance,
  Transition,
  computed,
  ref,
  watch,
} from 'vue'
import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue'
import type { SelectOptionType, SelectOptions } from './index.types'

const props = withDefaults(
  defineProps<{
    id: string
    displayBorder?: boolean
    borderColor?: ColorPalette
    rounded?: boolean
    displayHighlight?: boolean
    highlightColor?: ColorPalette
    textcolor?: ColorPalette
    bgColor?: ColorPalette
    iconColor?: ColorPalette
    placeholder?: string
    displayShadow?: boolean
    required?: boolean
    options: SelectOptions
    selectColor?: ColorPalette
    invalidFeedback?: string
  }>(),
  {
    displayBorder: false,
    borderColor: 'light-4',
    rounded: false,
    displayHighlight: true,
    highlightColor: 'primary',
    textcolor: 'black',
    bgColor: 'light-1',
    iconColor: 'dark-4',
    selectColor: 'primary',
    placeholder: '',
    displayShadow: true,
    required: false,
    invalidFeedback: 'No match.',
  }
)

const slots = defineSlots<{
  'dropdown'(props: {
    optionClick: (e: Event, option: string | SelectOptionType) => void
    options: (string | SelectOptionType)[]
    activeIndex: number
    setRef: (
      el: Element | ComponentPublicInstance | null,
      index: number
    ) => void
    hover: (index: number) => void
  }): any
  'no-match': any
}>()

const emit = defineEmits<{
  (e: 'open'): void
  (e: 'close'): void
  (e: 'clear'): void
  (e: 'changed', value: string | number): void
  (e: 'select', value: string | number): void
}>()

const model = defineModel<string | number | null>({ default: null })

const componentRef = ref<HTMLElement>()
const inputBox = ref<HTMLInputElement>()
const dropdownRef = ref<HTMLElement>()
const listItemsRef = ref<Array<Element | ComponentPublicInstance | null | []>>(
  []
)
const selectedItemRef = ref<HTMLElement | null>(null)
const optionsWidth = ref<number>()
const inputFocus = ref<boolean>(false)
const selectedValue = ref<string | SelectOptionType>('')
const activeItemIdx = ref<number>(0)

const setInputFocus = () => {
  inputFocus.value = true
}

const handleEscapeKeyUp = () => {
  selectedValue.value = ''
  inputFocus.value = false
  selectedItemRef.value = null
  inputBox.value?.blur()
  model.value = ''
}

const handleClickOutside = () => {
  inputFocus.value = false
  activeItemIdx.value = 0
}

const handleToggle = () => {
  inputFocus.value = !inputFocus.value
  activeItemIdx.value = 0
  if (inputFocus.value === true) {
    inputBox.value?.focus()
  }
}

const clearInput = (e: Event) => {
  e.preventDefault()
  if (selectedValue.value !== '') {
    selectedValue.value = ''
  }
  activeItemIdx.value = 0
  model.value = ''
  emit('clear')
}

const setItemRef = (
  el: Element | ComponentPublicInstance | null,
  idx: number
) => {
  listItemsRef.value[idx] = el
}

const handleDropdownHide = (el: Element) => {
  ;(el as HTMLElement).style.pointerEvents = 'none'
}
const handleDropdownShown = (el: Element) => {
  ;(el as HTMLElement).style.pointerEvents = 'auto'
}

const handleDropDownItemMouseOver = (idx: number) => {
  activeItemIdx.value = idx
}

const handleOptionClick = (e: Event, option: string | SelectOptionType) => {
  e.preventDefault()
  selectedValue.value = typeof option === 'string' ? option : option.text
  const outputVal = typeof option === 'string' ? option : option.value
  model.value = outputVal
  inputFocus.value = false
  emit('select', outputVal)
}

const containerClass = computed(() => {
  const {
    bgColor,
    displayBorder,
    borderColor,
    displayHighlight,
    displayShadow,
    rounded,
    textcolor,
  } = props
  const classArray: string[] = [
    generateClass('BGCOLOR', bgColor),
    generateClass('TEXTCOLOR', textcolor),
  ]
  if (displayBorder) {
    classArray.push('border-2')
    classArray.push(generateClass('BORDER', borderColor))
  }
  if (!displayHighlight) {
    classArray.push('ring-offset-2 transition-all duration-300 ease-linear')
  }
  if (displayShadow) {
    classArray.push('shadow-md')
  }
  if (rounded) {
    classArray.push('rounded-md')
  }
  return classArray.join(' ')
})

const getHighlightClass = computed<string>(() => {
  /**
   * @param {ColorPalette} highlightColor
   * @param {boolean} rounded
   */

  const { highlightColor, rounded } = props
  const classArray: string[] = [generateClass('BEFOREBG', highlightColor)]
  if (rounded) classArray.push('rounded-b-md')
  return classArray.join(' ')
})

const optionsBlockClass = computed(() => {
  const { displayHighlight, bgColor, borderColor, rounded } = props
  const classArray: string[] = [
    generateClass('BGCOLOR', bgColor),
    generateClass('BORDER', borderColor),
  ]
  if (!displayHighlight) {
    classArray.push('mt-2xs')
  }
  if (rounded) {
    classArray.push('rounded-md')
  }
  return classArray.join(' ')
})

const filteredOptions = computed(() => {
  if (selectedValue.value === '') {
    return props.options
  } else {
    const filteredData = props.options.filter((data) => {
      const textVal = new RegExp(`${selectedValue.value}`, 'gi')
      return typeof data === 'string'
        ? data.match(textVal)
        : data.text.match(textVal)
    })
    return filteredData
  }
})

const handleOptionsWidth = computed(() => {
  return { width: `${optionsWidth.value}px` }
})

const { floatingStyles } = useFloating(componentRef, dropdownRef, {
  whileElementsMounted: autoUpdate,
  strategy: 'absolute',
  open: inputFocus,
  transform: false,
  placement: 'bottom',
  middleware: [flip(), offset(-2.2), shift()],
})

useResizeObserver(componentRef, () => {
  if (componentRef.value) {
    optionsWidth.value = componentRef.value.clientWidth
  }
})

const handleArrowButtonKeyUp = (key: 'up' | 'down') => {
  if (!inputFocus.value) return
  if (key === 'up' && activeItemIdx.value > 0) activeItemIdx.value--
  if (key === 'down' && activeItemIdx.value < filteredOptions.value.length - 1)
    activeItemIdx.value++
  console.log(activeItemIdx.value)
}
const handleEnterKeyUp = () => {
  if (!inputFocus.value) return
  const currentPointer: string | SelectOptionType =
    filteredOptions.value[activeItemIdx.value]
  let outputVal: string | number
  if (typeof currentPointer === 'string') {
    selectedValue.value = currentPointer
    outputVal = currentPointer
  } else {
    selectedValue.value = currentPointer.text
    outputVal = currentPointer.value
  }
  model.value = outputVal
  inputFocus.value = false
  emit('select', outputVal)
}
watch(inputFocus, (newVal) => {
  if (newVal === true) {
    emit('open')
  } else {
    emit('close')
  }
})

watch(model, (newVal) => {
  if (newVal === null) {
    inputFocus.value = false
    selectedItemRef.value = null
    return
  }
  emit('changed', newVal)
})

watch(activeItemIdx, () => {
  selectedItemRef.value = listItemsRef.value[activeItemIdx.value] as HTMLElement
  if (selectedItemRef.value && selectedItemRef.value.scrollIntoView) {
    selectedItemRef.value.scrollIntoView({ block: 'nearest' })
  }
})
</script>

<template>
  <div
    @keyup.esc="handleEscapeKeyUp"
    @keyup.down="handleArrowButtonKeyUp('down')"
    @keyup.up="handleArrowButtonKeyUp('up')"
    @keyup.enter="handleEnterKeyUp"
    v-click-outside="handleClickOutside"
    ref="componentRef"
    class="relative"
  >
    <div
      class="p-2xs flex relative gap-3xs"
      :class="[
        !displayHighlight &&
          inputFocus &&
          generateClass('RINGCOLOR', borderColor) + ' ring-4',
        containerClass,
      ]"
    >
      <input
        :id="id"
        type="text"
        class="w-full bg-transparent outline-none"
        v-model="selectedValue"
        ref="inputBox"
        role="combobox"
        autocomplete="off"
        :placeholder="placeholder"
        aria-autocomplete="list"
        :aria-expanded="inputFocus"
        @focus="setInputFocus"
      />
      <div
        class="flex items-center px-3xs"
        :class="[
          selectedValue === '' ? 'hidden cursor-text' : 'block cursor-pointer',
        ]"
        @click="clearInput"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          class="h-xs opacity-70"
          :class="[generateClass('SVGFILL', iconColor)]"
        >
          <!-- !Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
          <path
            d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
          />
        </svg>
      </div>
      <div class="flex items-center px-3xs" @click="handleToggle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          class="h-xs"
          :class="[
            !inputFocus ? 'rotate-0' : 'rotate-180',
            'transition-transform duration-300 ease-in',
            generateClass('SVGFILL', iconColor),
          ]"
        >
          <!-- Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
          <path
            d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
          />
        </svg>
      </div>
    </div>
    <div
      v-if="displayHighlight"
      class="relative h-3xs overflow-hidden before:absolute before:bottom-0 before:left-0 before:h-full before:w-0 before:transition-[width] before:duration-300 before:ease-linear -top-1"
      :class="[inputFocus ? 'before:w-full' : 'before:w-0', getHighlightClass]"
    ></div>
    <Transition
      name="options"
      @before-leave="handleDropdownHide"
      @enter="handleDropdownShown"
    >
      <ul
        :class="[optionsBlockClass]"
        class="max-h-[200px] overflow-y-auto border-2"
        :style="{ ...handleOptionsWidth, ...floatingStyles }"
        role="listbox"
        ref="dropdownRef"
        v-if="inputFocus"
      >
        <template v-if="filteredOptions.length > 0">
          <slot
            name="dropdown"
            :option-click="handleOptionClick"
            :options="filteredOptions"
            :active-index="activeItemIdx"
            :set-ref="setItemRef"
            :hover="handleDropDownItemMouseOver"
          >
            <li
              v-for="(option, idx) in filteredOptions"
              :key="idx"
              class="p-2xs cursor-pointer"
              role="option"
              :class="[
                activeItemIdx === idx &&
                  generateClass('BGCOLOR', highlightColor),
              ]"
              :ref="(el) => setItemRef(el, idx)"
              @click="handleOptionClick($event, option)"
              @mouseenter="handleDropDownItemMouseOver(idx)"
            >
              {{ typeof option === 'string' ? option : option.text }}
            </li>
          </slot>
        </template>
        <template v-else>
          <slot name="no-match">
            <li
              class="p-2xs cursor-pointer"
              :class="[generateClass('HVBGCOLOR', selectColor)]"
            >
              <span>{{ invalidFeedback }}</span>
            </li>
          </slot>
        </template>
      </ul>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.options-enter-active,
.options-leave-active {
  opacity: 1;
  transition: opacity 0.3s linear, transform 0.3s linear;
}
.options-enter-from,
.options-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
