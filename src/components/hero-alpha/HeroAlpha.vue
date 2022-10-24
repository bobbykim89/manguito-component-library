<script setup lang="ts">
import { withDefaults } from 'vue'
import generateClass from '@mcl/manguito-theme'
import type {
  HeadingLevel,
  HeadingSize,
  ColorPalette,
  Directions,
} from '@mcl/manguito-theme/theme/theme.types'

const props = withDefaults(
  defineProps<{
    title: string
    titleLevel?: HeadingLevel
    titleSize?: HeadingSize
    displaySubTitle: boolean
    subTitle?: string
    subTitleLevel?: HeadingLevel
    subTitleSize?: HeadingSize
    titleColor?: ColorPalette
    bgImage: string
    bgColor?: ColorPalette
    imgPosition?: Directions
  }>(),
  {
    titleLevel: 'h1',
    titleSize: 'md',
    displaySubTitle: false,
    subTitleLevel: 'h2',
    subTitleSize: 'md',
    titleColor: 'dark-3',
    imgPosition: 'right',
  }
)
</script>

<template>
  <section class="relative bg-white overflow-hidden">
    <div class="max-w-7xl mx-auto">
      <div
        class="relative z-10 py-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32"
      >
        <svg
          class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
          fill="currentColor"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon points="50,0 100,0 50,100 0,100" />
        </svg>
        <main
          class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28"
        >
          <div class="text-center lg:text-left">
            <h1
              class="text-4xl tracking-tight font-bold text-gray-900 text-2xl md:text-5xl"
            >
              {{ title }}
            </h1>
            <h2 v-if="displaySubTitle">{{ subTitle }}</h2>
            <p
              class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
            >
              Bobby’s Cookbook is a online cookbook webapp for people who like
              to look up on recipes quickly without any advertisement or
              scrolling all the way down to ingredients and direction. Everyone
              is welcomed to share their recipes and hope you have great cooking
              experience!
            </p>
            <div
              class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
            >
              <div class="rounded-md shadow"></div>
              <div class="mt-3 sm:mt-0 sm:ml-3">
                <a
                  href="/signup"
                  class="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-[#d45464] hover:bg-[#cc080b] md:py-4 md:text-lg md:px-10 transition ease-in duration-150"
                >
                  To Sign Up
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
      <img
        class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
        :src="bgImage"
        alt="banner image"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
