<script setup lang="ts">
import { withDefaults, ref, onMounted } from 'vue'
import type {} from '@mcl/manguito-theme/theme/theme.types'
import generateClass from '@mcl/manguito-theme'

const props = withDefaults(
  defineProps<{
    title: string
  }>(),
  {}
)

const prevBtn = ref()
const nextBtn = ref()
const slideContainer = ref()
const carouselCards = ref([])

let currentIndex: number = 0
let isMoving: boolean = false

const setCarouselRef = (el): void => {
  carouselCards.value.push(el)
}

onMounted(() => {
  console.log(carouselCards.value[2].clientHeight)
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
          <p class="max-w-2xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quas
            tempora consequatur totam voluptas error doloribus inventore aliquam
            repudiandae quaerat.
          </p>
          <div class="flex space-x-4">
            <button
              class="grid place-items-center text-primary bg-secondary hover:bg-opacity-80 rounded-full p-2 focus:outline-none focus:ring-4 ring-offset-2 ring-offset-inherit ring-secondary disabled:bg-opacity-20 disabled:text-warning transition-all duration-200"
              disabled
            >
              <svg
                class="w-md h-md"
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
            >
              <svg
                class="w-md h-md"
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
        <slot :set-ref="setCarouselRef"></slot>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
