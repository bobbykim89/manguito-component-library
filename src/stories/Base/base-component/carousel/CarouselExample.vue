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
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi repudiandae impedit nostrum vero iusto labore ipsum possimus ducimus voluptatem vitae fugit, natus ipsam, error fuga architecto unde nulla tempora, et nobis expedita repellendus odit veritatis eum. Quidem praesentium dolorum tempore eligendi blanditiis vitae ad nemo, quod veritatis molestias quo esse!',
  },
  {
    title: 'Third Slide',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi repudiandae impedit nostrum vero iusto labore ipsum possimus ducimus voluptatem vitae fugit, natus ipsam, error fuga architecto unde nulla tempora, et nobis expedita repellendus odit veritatis eum. Quidem praesentium dolorum tempore eligendi blanditiis vitae ad nemo, quod veritatis molestias quo esse!',
  },
  {
    title: 'Fourth Slide',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi repudiandae impedit nostrum vero iusto labore ipsum possimus ducimus voluptatem vitae fugit, natus ipsam, error fuga architecto unde nulla tempora, et nobis expedita repellendus odit veritatis eum. Quidem praesentium dolorum tempore eligendi blanditiis vitae ad nemo, quod veritatis molestias quo esse!',
  },
]
</script>

<template>
  <section>
    <CarouselContainer
      loop
      body-class="py-lg bg-light-1 rounded-md drop-shadow-md"
      content-container-class="px-md"
      navigation-class="absolute inset-0"
    >
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
      <template #navigation="{ next, prev }">
        <button @click="prev" class="absolute left-0 top-1/2 -translate-y-1/2">
          Prev
        </button>
        <button
          @click="next"
          class="absolute left-full top-1/2 -translate-y-1/2"
        >
          Next
        </button>
      </template>
    </CarouselContainer>
  </section>
</template>

<style scoped></style>
