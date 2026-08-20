<script setup lang="ts">
import type {
  BodyText,
  ColorPalette,
  HeadingSize,
  SpacingLevel,
} from '@bobbykim/manguito-theme'
import { generateClass } from '@bobbykim/manguito-theme'
import { computed, ref } from 'vue'
import type { BtnNav, MclCarouselASlotProps } from './index.types'
import { useCarouselSlide } from './useCarouselSlide'

const props = withDefaults(
  defineProps<{
    title: string
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
const { isPrevDisabled, isNextDisabled, goTo } =
  useCarouselSlide(slideContainer)

const handleSlideBtnClick = (e: Event, btn: BtnNav): void => {
  // Emit only once the move is accepted, preserving the previous behaviour
  // where a click landing mid-transition was ignored outright.
  if (!goTo(btn)) return
  if (btn === 'prev') emit('btn-prev', e)
  else emit('btn-next', e)
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

/** Shared by both navigation buttons; the ring matches the button background. */
const navBtnClass = computed(() =>
  [
    generateClass.textColorVariant({ color: props.btnColor }),
    generateClass.bgColorVariant({ color: props.btnBgColor }),
    generateClass.ringColorVariant({ color: props.btnBgColor }),
  ].join(' '),
)

const cardsGapClass = computed(() =>
  generateClass.gapVariant({ spacing: props.cardsGap }),
)
</script>

<template>
  <section class="overflow-hidden py-lg lg:py-xl" :class="sectionBgClass">
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
          <h2 class="tracking-wide" :class="titleClass" v-html="title"></h2>
        </div>
        <div
          class="relative flex flex-wrap items-center justify-center space-y-4 space-x-4 sm:flex-nowrap sm:justify-start"
        >
          <div class="max-w-144">
            <slot name="description"></slot>
          </div>
          <div class="flex space-x-4">
            <button
              class="grid place-items-center rounded-full p-xs ring-offset-2 ring-offset-inherit transition-all duration-200 hover:bg-opacity-80 focus:ring-4 focus:outline-none disabled:opacity-50"
              :class="navBtnClass"
              :disabled="isPrevDisabled"
              @click="handleSlideBtnClick($event, 'prev')"
              aria-label="previous"
            >
              <svg
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
              class="grid place-items-center rounded-full p-xs ring-offset-2 ring-offset-inherit transition-all duration-200 hover:bg-opacity-80 focus:ring-4 focus:outline-none disabled:opacity-50"
              :class="navBtnClass"
              :disabled="isNextDisabled"
              @click="handleSlideBtnClick($event, 'next')"
              aria-label="next"
            >
              <svg
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
        class="flex gap-xs px-xs transition-transform duration-500"
        :class="cardsGapClass"
        ref="slideContainer"
      >
        <slot name="carousel" :cards="content" :set-ref="setCarouselRef"></slot>
      </div>
    </div>
  </section>
</template>
