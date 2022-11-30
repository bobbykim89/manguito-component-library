<script setup lang="ts">
import { withDefaults, ref, onMounted, computed } from 'vue'
import type {
  HeadingSize,
  ColorPalette,
  BodyText,
  SpacingLevel,
} from '@mcl/manguito-theme/theme/theme.types'
import generateClass from '@mcl/manguito-theme'
import CardAlpha from '@mcl/card-alpha'
import CardBeta from '@mcl/card-beta'

type BtnNav = 'prev' | 'next'

const props = withDefaults(
  defineProps<{
    title: string
    titleSize?: HeadingSize
    titleColor?: ColorPalette
    displaySubTitle?: boolean
    subTitle?: string
    subTitleSize?: BodyText
    subTitleColor?: ColorPalette
    description?: string
    displayHighlight?: boolean
    highlightColor?: ColorPalette
    btnColor?: ColorPalette
    btnIconColor?: ColorPalette
    cardsContent: any[]
    cardsGap?: SpacingLevel
  }>(),
  {
    titleSize: 'md',
    titleColor: 'dark-3',
    displaySubTitle: true,
    subTitleSize: 'md',
    subTitleColor: 'success',
    displayHighlight: true,
    highlightColor: 'primary',
    btnColor: 'primary',
    btnIconColor: 'light-3',
    cardsGap: 'xs',
  }
)

const prevBtn = ref()
const nextBtn = ref()
const slideContainer = ref()
const carouselCards = ref<
  null | InstanceType<typeof CardAlpha | typeof CardBeta>[]
>([])

const currentIndex = ref(0)
const isNextBtnDisabled = ref(false)
let isMoving: boolean = false
const cardsSpace = (): number => {
  switch (props.cardsGap) {
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
const setCarouselRef = (el): void => {
  carouselCards.value.push(el)
  // carouselCards.value = el
}

// navigation btn control function
const handleSlideBtnClick = (btn: BtnNav): void => {
  if (isMoving) {
    return
  }
  isMoving = true
  btn === 'prev' ? currentIndex.value-- : currentIndex.value++
  console.log(currentIndex)
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

onMounted(() => {
  // handle slide movement
  slideContainer.value.addEventListener('sliderMove', () => {
    slideContainer.value.style.transform = `translateX(-${
      currentIndex.value *
      (carouselCards.value[0].$el.clientWidth + cardsSpace())
    }px)`

    isNextBtnDisabled.value = false
  })

  // transition end event
  slideContainer.value.addEventListener(
    'transitionend',
    () => (isMoving = false)
  )

  // intersection observer for slider
  slideObserver.observe(carouselCards.value[carouselCards.value.length - 1].$el)
})
</script>

<template>
  <section class="py-lg lg:py-xl overflow-hidden">
    <div class="container grid gap-4 text-center sm:text-left">
      <div class="relative">
        <div
          class="hidden sm:block absolute w-md bg-primary/25 -left-4 h-full"
        ></div>
        <div class="relative">
          <small class="tracking-widest text-secondary uppercase"
            >Small title</small
          >
          <h2 class="tracking-wide">CarouselAlpha {{ title }}</h2>
        </div>
        <div
          class="relative flex flex-wrap sm:flex-nowrap justify-center sm:justify-start items-center space-x-4 space-y-4"
        >
          <div class="max-w-2xl">
            <slot name="description"></slot>
          </div>
          <div class="flex space-x-4">
            <button
              class="grid place-items-center text-primary bg-secondary hover:bg-opacity-80 rounded-full p-2 focus:outline-none focus:ring-4 ring-offset-2 ring-offset-inherit ring-secondary disabled:bg-opacity-20 disabled:text-warning transition-all duration-200"
              :disabled="currentIndex === 0"
              @click="handleSlideBtnClick('prev')"
            >
              <svg
                class="w-sm h-sm"
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
              class="grid place-items-center text-primary bg-secondary hover:bg-opacity-80 rounded-full p-2 focus:outline-none focus:ring-4 ring-offset-2 ring-offset-inherit ring-secondary disabled:bg-opacity-20 disabled:text-warning transition-all duration-200"
              :disabled="isNextBtnDisabled"
              @click="handleSlideBtnClick('next')"
            >
              <svg
                class="w-sm h-sm"
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
    <div class="container mt-md sm:mt-lg lg:mt-xl xs:w-screen">
      <div class="flex transition-transform duration-500" ref="slideContainer">
        <slot
          name="carousel"
          :cards="cardsContent"
          :set-ref="setCarouselRef"
        ></slot>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
