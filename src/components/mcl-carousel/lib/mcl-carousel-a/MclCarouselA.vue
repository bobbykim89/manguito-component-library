<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type {
  HeadingSize,
  ColorPalette,
  BodyText,
  SpacingLevel,
} from '@bobbykim/manguito-theme'
import generateClass from '@bobbykim/manguito-theme'
import { MclCardA, MclCardB, MclCardC, MclCardD } from '@bobbykim/mcl-cards'

type BtnNav = 'prev' | 'next'

const props = withDefaults(
  defineProps<{
    title: string
    titleSize?: HeadingSize
    titleColor?: ColorPalette
    bgColor?: ColorPalette
    displayTagLine?: boolean
    tagLineUpperCase?: boolean
    tagLine?: string
    tagLineSize?: BodyText
    tagLineColor?: ColorPalette
    displayHighlight?: boolean
    highlightColor?: ColorPalette
    btnColor?: ColorPalette
    btnBgColor?: ColorPalette
    content: any[]
    cardsGap?: SpacingLevel
  }>(),
  {
    titleSize: 'md',
    titleColor: 'dark-3',
    bgColor: 'light-1',
    displayTagLine: true,
    tagLineUpperCase: true,
    tagLineSize: 'md',
    tagLineColor: 'dark-1',
    displayHighlight: true,
    highlightColor: 'primary',
    btnColor: 'dark-3',
    btnBgColor: 'light-4',
    cardsGap: 'xs',
  }
)
const slideContainer = ref()
const carouselCards = ref<
  | null
  | InstanceType<
      typeof MclCardA | typeof MclCardB | typeof MclCardC | typeof MclCardD
    >[]
>([])
const emit = defineEmits(['btn-prev', 'btn-next'])

const currentIndex = ref(0)
const isNextBtnDisabled = ref(false)
let isMoving: boolean = false
const cardsSpace = (gap: SpacingLevel): number => {
  switch (gap) {
    case '0':
      return 0
    case '3xs':
      return 4
    case '2xs':
      return 8
    case 'xs':
      return 16
    case 'sm':
      return 24
    case 'md':
      return 32
    case 'lg':
      return 48
    case 'xl':
      return 64
    case '2xl':
      return 96
    case '3xl':
      return 128
  }
}

// assign ref as
const setCarouselRef = (el: any): void => {
  carouselCards.value!.push(el)
  // carouselCards.value = el
}

// navigation btn control function
const handleSlideBtnClick = (e: Event, btn: BtnNav): void => {
  if (isMoving) {
    return
  }
  isMoving = true
  // btn === 'prev' ? currentIndex.value-- : currentIndex.value++
  if (btn === 'prev') {
    currentIndex.value--
    emit('btn-prev', e)
  }
  if (btn === 'next') {
    currentIndex.value++
    emit('btn-next', e)
  }
  slideContainer.value.dispatchEvent(new Event('sliderMove'))
}

// intersection observer
const slideObserver = new IntersectionObserver(
  (slide) => {
    if (slide[0].isIntersecting) {
      // add disable attribute
      isNextBtnDisabled.value = true
    }
  },
  { threshold: 0.75 }
)

const getTitleClass = (size: HeadingSize, color: ColorPalette): string => {
  /**
   * @size - titleSize
   * @color - titleColor
   */

  const classArray = [
    generateClass('H2', size),
    generateClass('TEXTCOLOR', color),
  ]

  return classArray.join(' ')
}

const getTaglineClass = (
  size: BodyText,
  color: ColorPalette,
  upper: boolean
): string => {
  /**
   * @size - tagLineSize
   * @color - tagLineColor
   * @upper - tagLineUpperCase
   */

  const classArray = [
    generateClass('BODYTEXT', size),
    generateClass('TEXTCOLOR', color),
  ]

  if (upper) {
    classArray.push('uppercase')
  }

  return classArray.join(' ')
}

const getButtonClass = (color: ColorPalette, bgColor: ColorPalette): string => {
  /**
   * @color - btnColor
   * @bgColor - btnBgColor
   */

  const classArray = [
    generateClass('TEXTCOLOR', color),
    generateClass('BGCOLOR', bgColor),
    generateClass('RINGCOLOR', bgColor),
  ]

  return classArray.join(' ')
}

const handleSlide = (): void => {
  slideContainer.value.style.transform = `translateX(-${
    currentIndex.value *
    (carouselCards.value![0].$el.clientWidth + cardsSpace(props.cardsGap) + 2)
  }px)`

  isNextBtnDisabled.value = false
}

const handleTransitionEnd = (): void => {
  isMoving = false
}

onMounted(() => {
  if (typeof window !== undefined) {
    // handle slide movement
    slideContainer.value.addEventListener('sliderMove', handleSlide)
    // handle transition end event
    slideContainer.value.addEventListener('transitionend', handleTransitionEnd)

    // intersection observer for slider
    slideObserver.observe(
      carouselCards.value![carouselCards.value!.length - 1].$el
    )
  }
})

onBeforeUnmount(() => {
  slideContainer.value.removeEventListener('sliderMove', handleSlide)
  slideContainer.value.removeEventListener('transitionend', handleTransitionEnd)
  slideObserver.unobserve(
    carouselCards.value![carouselCards.value!.length - 1].$el
  )
})
</script>

<template>
  <section
    class="py-lg lg:py-xl overflow-hidden"
    :class="generateClass('BGCOLOR', bgColor)"
  >
    <div class="container px-xs sm:px-md text-center sm:text-left">
      <div class="relative">
        <div
          v-if="displayHighlight"
          class="hidden sm:block absolute w-md bg-opacity-25 -left-4 h-full"
          :class="generateClass('BGCOLOR', highlightColor)"
        ></div>
        <div class="relative">
          <span
            v-if="displayTagLine"
            class="tracking-widest"
            :class="
              getTaglineClass(tagLineSize, tagLineColor, tagLineUpperCase)
            "
            v-html="tagLine"
          ></span>
          <h2
            class="tracking-wide"
            :class="getTitleClass(titleSize, titleColor)"
            v-html="title"
          ></h2>
        </div>
        <div
          class="relative flex flex-wrap sm:flex-nowrap justify-center sm:justify-start items-center space-x-4 space-y-4"
        >
          <div class="max-w-xl">
            <slot name="description"></slot>
          </div>
          <div class="flex space-x-4">
            <button
              class="grid place-items-center hover:bg-opacity-80 rounded-full p-xs focus:outline-none focus:ring-4 ring-offset-2 ring-offset-inherit disabled:opacity-50 transition-all duration-200"
              :class="getButtonClass(btnColor, btnBgColor)"
              :disabled="currentIndex === 0"
              @click="handleSlideBtnClick($event, 'prev')"
              aria-label="previous"
            >
              <svg
                class="w-xs h-xs"
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
              class="grid place-items-center hover:bg-opacity-80 rounded-full p-xs focus:outline-none focus:ring-4 ring-offset-2 ring-offset-inherit disabled:opacity-50 transition-all duration-200"
              :class="getButtonClass(btnColor, btnBgColor)"
              :disabled="isNextBtnDisabled"
              @click="handleSlideBtnClick($event, 'next')"
              aria-label="next"
            >
              <svg
                class="w-xs h-xs"
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
        class="flex transition-transform duration-500 px-xs gap-xs"
        :class="generateClass('GAP', cardsGap)"
        ref="slideContainer"
      >
        <slot name="carousel" :cards="content" :set-ref="setCarouselRef"></slot>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
