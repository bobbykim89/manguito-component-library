<script setup lang="ts">
import type {
  BodyText,
  ColorPalette,
  HeadingLevel,
  HeadingSize,
  SpacingLevel,
} from '@bobbykim/manguito-theme'
import { generateClass } from '@bobbykim/manguito-theme'
import { computed, ref, useId } from 'vue'
import type { BtnNav, MclCarouselASlotProps, SlideAttrs } from './index.types'
import { useCarouselSlide } from './useCarouselSlide'

const props = withDefaults(
  defineProps<{
    title: string
    /** Heading element for the title (#133). The look comes from `titleSize`. */
    titleLevel?: HeadingLevel
    titleSize?: HeadingSize
    titleColor?: ColorPalette
    bgColor?: ColorPalette
    showTagLine?: boolean
    tagLineUpperCase?: boolean
    tagLine?: string
    tagLineSize?: BodyText
    tagLineColor?: ColorPalette
    showHighlight?: boolean
    highlightColor?: ColorPalette
    btnColor?: ColorPalette
    btnBgColor?: ColorPalette
    /** Passed straight through to the `carousel` slot; shape is the consumer's. */
    content: any[]
    cardsGap?: SpacingLevel
  }>(),
  {
    titleLevel: 'h2',
    titleSize: 'md',
    titleColor: 'dark-3',
    bgColor: 'light-1',
    showTagLine: true,
    tagLineUpperCase: true,
    tagLineSize: 'md',
    tagLineColor: 'dark-1',
    showHighlight: true,
    highlightColor: 'primary',
    btnColor: 'dark-3',
    btnBgColor: 'light-4',
    cardsGap: 'xs',
  },
)

const emit = defineEmits<{
  (e: 'btn-prev', event: Event): void
  (e: 'btn-next', event: Event): void
}>()

defineSlots<{
  description?: any
  carousel?: (props: MclCarouselASlotProps) => any
}>()

// --- slide mechanics ---

/** The translated flex row. Its children are the cards. */
const slideContainer = ref<HTMLElement | null>(null)
/** The clipping section; "in view" is measured against it (#133). */
const sectionRef = ref<HTMLElement | null>(null)
const { isPrevDisabled, isNextDisabled, goTo, reveal, visibleRange } =
  useCarouselSlide(slideContainer, sectionRef)

// --- accessibility (#133) ---

const titleId = useId()
const rowId = useId()

/**
 * What a screen reader hears after a button move. Empty on load so nothing is
 * announced then; a follow move is already announced through the focused card.
 */
const statusText = ref('')
const updateStatus = (): void => {
  const range = visibleRange()
  if (!range) return
  const total = props.content.length
  statusText.value =
    range.first === range.last
      ? `Card ${range.first + 1} of ${total}`
      : `Cards ${range.first + 1} to ${range.last + 1} of ${total}`
}

const slideAttrs = (index: number): SlideAttrs => ({
  role: 'group',
  'aria-roledescription': 'slide',
  'aria-label': `${index + 1} of ${props.content.length}`,
})

const handleSlideBtnClick = (e: Event, btn: BtnNav): void => {
  // The buttons stay focusable at the ends (aria-disabled, not disabled), so
  // a press there must do nothing.
  if (btn === 'prev' ? isPrevDisabled.value : isNextDisabled.value) return
  // Emit only once the move is accepted, preserving the previous behaviour
  // where a click landing mid-transition was ignored outright.
  if (!goTo(btn)) return
  updateStatus()
  if (btn === 'prev') emit('btn-prev', e)
  else emit('btn-next', e)
}

/**
 * A pointer press focuses on mousedown, before click. Sliding then would move
 * another card under the pointer and lose the click, so focus that comes from
 * a pointer press inside the row doesn't trigger a follow move.
 */
let pointerFocus = false
const onRowPointerdown = (): void => {
  pointerFocus = true
}
const clearPointerFocus = (): void => {
  pointerFocus = false
}

/** Focus follow: a card that gets keyboard focus slides fully into view. */
const onRowFocusin = (e: FocusEvent): void => {
  if (pointerFocus) return
  const row = slideContainer.value
  if (!row || !(e.target instanceof Node)) return
  const index = Array.from(row.children).findIndex((card) =>
    card.contains(e.target as Node),
  )
  if (index !== -1) reveal(index)
}

/**
 * Focusing a clipped element makes the browser scroll the nearest scroll
 * container, this overflow-hidden section, which fights the transform.
 */
const onSectionScroll = (): void => {
  if (sectionRef.value && sectionRef.value.scrollLeft !== 0) {
    sectionRef.value.scrollLeft = 0
  }
}

/**
 * @deprecated No-op, kept so existing `:ref="(el) => setRef(el)"` bindings in
 * the `carousel` slot keep working. Cards are now read from the DOM, so
 * nothing needs registering. Scheduled for removal in the next major version.
 */
const setCarouselRef = (): void => {}

// --- derived classes ---
// Previously functions taking (size, color) arguments, but every call site
// passed the matching props, so they are plain derived values.

const sectionBgClass = computed(() =>
  generateClass.bgColorVariant({ color: props.bgColor }),
)

const highlightBgClass = computed(() =>
  generateClass.bgColorVariant({ color: props.highlightColor }),
)

const titleClass = computed(() =>
  [
    generateClass.h2Variant({ size: props.titleSize }),
    generateClass.textColorVariant({ color: props.titleColor }),
  ].join(' '),
)

const tagLineClass = computed(() => {
  const classes = [
    generateClass.bodyTextVariant({ size: props.tagLineSize }),
    generateClass.textColorVariant({ color: props.tagLineColor }),
  ]
  if (props.tagLineUpperCase) classes.push('uppercase')
  return classes.join(' ')
})

/**
 * Shared by both navigation buttons. Their keyboard focus ring is the shared
 * two-tone `mcl-focus-ring` (#122), not the button colour.
 */
const navBtnClass = computed(() =>
  [
    generateClass.textColorVariant({ color: props.btnColor }),
    generateClass.bgColorVariant({ color: props.btnBgColor }),
  ].join(' '),
)

const cardsGapClass = computed(() =>
  generateClass.gapVariant({ spacing: props.cardsGap }),
)
</script>

<template>
  <section
    ref="sectionRef"
    class="overflow-hidden py-lg lg:py-xl"
    :class="sectionBgClass"
    aria-roledescription="carousel"
    :aria-labelledby="titleId"
    @scroll="onSectionScroll"
  >
    <div class="container px-xs text-center sm:px-md sm:text-left">
      <div class="relative">
        <div
          v-if="showHighlight"
          class="absolute -left-4 hidden h-full w-md bg-opacity-25 sm:block"
          :class="highlightBgClass"
        ></div>
        <div class="relative">
          <span
            v-if="showTagLine"
            class="tracking-widest"
            :class="tagLineClass"
            v-html="tagLine"
          ></span>
          <component
            :is="titleLevel"
            :id="titleId"
            class="tracking-wide"
            :class="titleClass"
            ><span v-html="title"></span
          ></component>
        </div>
        <div
          class="relative flex flex-wrap items-center justify-center space-y-4 space-x-4 sm:flex-nowrap sm:justify-start"
        >
          <div class="max-w-144">
            <slot name="description"></slot>
          </div>
          <div class="flex space-x-4">
            <button
              type="button"
              class="grid place-items-center rounded-full p-xs transition-all duration-200 hover:bg-opacity-80 focus-visible:mcl-focus-ring aria-disabled:opacity-50"
              :class="navBtnClass"
              :aria-disabled="isPrevDisabled"
              :aria-controls="rowId"
              aria-label="Previous cards"
              @click="handleSlideBtnClick($event, 'prev')"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                class="h-xs w-xs"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                fill="currentColor"
              >
                <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                <path
                  d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
                />
              </svg>
            </button>
            <button
              type="button"
              class="grid place-items-center rounded-full p-xs transition-all duration-200 hover:bg-opacity-80 focus-visible:mcl-focus-ring aria-disabled:opacity-50"
              :class="navBtnClass"
              :aria-disabled="isNextDisabled"
              :aria-controls="rowId"
              aria-label="Next cards"
              @click="handleSlideBtnClick($event, 'next')"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                class="h-xs w-xs"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                fill="currentColor"
              >
                <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                <path
                  d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-md sm:mt-lg lg:mt-xl">
      <div
        :id="rowId"
        class="flex gap-xs px-xs transition-transform duration-500 motion-reduce:transition-none"
        :class="cardsGapClass"
        ref="slideContainer"
        @pointerdown="onRowPointerdown"
        @click="clearPointerFocus"
        @keydown="clearPointerFocus"
        @focusin="onRowFocusin"
      >
        <slot
          name="carousel"
          :cards="content"
          :set-ref="setCarouselRef"
          :slide-attrs="slideAttrs"
        ></slot>
      </div>
      <p class="sr-only" aria-live="polite" aria-atomic="true">
        {{ statusText }}
      </p>
    </div>
  </section>
</template>
