<script setup lang="ts">
import {
  CarouselContainer,
  CarouselContent,
} from '@/components/manguito-theme/lib'

const contentData = [
  {
    title: 'First Slide',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi repudiandae impedit nostrum vero iusto labore ipsum possimus ducimus voluptatem vitae fugit, natus ipsam, error fuga architecto unde nulla tempora, et nobis expedita repellendus odit veritatis eum. Quidem praesentium dolorum tempore eligendi blanditiis vitae ad nemo, quod veritatis molestias quo esse!',
  },
  {
    title: 'Second Slide',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ratione laudantium reprehenderit rerum harum numquam aperiam deleniti, et pariatur quae inventore provident sint veniam ipsam exercitationem reiciendis incidunt soluta aspernatur consequatur eius dignissimos quia voluptatibus ipsa dolores! Officiis temporibus, omnis ratione quia voluptatum perspiciatis voluptatem autem, placeat inventore quis obcaecati quisquam quam delectus voluptate dolor neque a, consectetur esse odit ipsam exercitationem pariatur. Reiciendis a omnis iure tempore sint laborum eaque error enim suscipit ipsam.',
  },
  {
    title: 'Third Slide',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi repudiandae impedit nostrum vero iusto labore ipsum possimus ducimus voluptatem vitae fugit, natus ipsam, error fuga architecto unde nulla tempora, et nobis expedita repellendus odit veritatis eum. Quidem praesentium dolorum tempore eligendi blanditiis vitae ad nemo, quod veritatis molestias quo esse!',
  },
  {
    title: 'Fourth Slide',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium asperiores odio et omnis soluta ipsa, odit quo labore debitis, ut deleniti. Soluta veniam veritatis aperiam cupiditate numquam, quaerat maiores et neque magnam aspernatur, odit omnis ea ipsa facere? Vero, libero veniam ullam quod alias, totam nihil perspiciatis, porro nam dolorem esse nesciunt maiores ad suscipit nobis amet eaque aspernatur. Architecto, itaque. Quaerat esse obcaecati earum reprehenderit velit saepe. Exercitationem, perspiciatis asperiores sunt quibusdam quod quae saepe maxime id harum dignissimos. Maxime at autem similique magni aut non dolor temporibus, saepe libero quisquam vel officiis? Quam nihil illum nemo facere ea!',
  },
]
</script>

<template>
  <section>
    <CarouselContainer
      loop
      auto
      body-class="bg-light-1 rounded-md drop-shadow-md"
      content-container-class="py-lg px-md md:py-xl md:px-lg"
      controller-top-class="absolute left-0 top-0 flex items-center h-full"
      controller-bottom-class="absolute right-0 top-0 flex items-center h-full"
    >
      <template #controller-top="{ prev }">
        <button
          @click="prev"
          class="pl-3xs md:pl-2xs text-dark-1 hover:opacity-60 transition-opacity duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            fill="currentColor"
            class="h-sm"
          >
            <!-- !Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
            <path
              d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
            />
          </svg>
        </button>
      </template>
      <template #content>
        <CarouselContent
          v-for="(item, idx) in contentData"
          :id="`slide-example1-${idx}`"
          :slide-number="idx"
        >
          <div>
            <h3 class="h3-md mb-sm">{{ item.title }}</h3>
            <div v-html="item.text"></div>
          </div>
        </CarouselContent>
      </template>
      <template #controller-bottom="{ next }">
        <button
          @click="next"
          class="pr-3xs md:pr-2xs text-dark-1 hover:opacity-60 transition-opacity duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            fill="currentColor"
            class="h-sm"
          >
            <!-- !Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
            <path
              d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
            />
          </svg>
        </button>
      </template>
    </CarouselContainer>
  </section>
</template>

<style scoped></style>
