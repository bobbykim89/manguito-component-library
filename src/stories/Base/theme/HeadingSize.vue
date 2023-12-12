<script lang="ts" setup>
interface HeadingItem {
  class: string
  mobile: string
  md: string
  lg: string
}

interface HeadingSizeClass {
  h1: HeadingItem[]
  h2: HeadingItem[]
  h3: HeadingItem[]
  h4: HeadingItem[]
}

const headingTextSize: HeadingSizeClass = {
  h1: [
    {
      class: 'h1-sm',
      mobile: '24px',
      md: '24px',
      lg: '36px',
    },
    {
      class: 'h1-md',
      mobile: '30px',
      md: '30px',
      lg: '40px',
    },
    {
      class: 'h1-lg',
      mobile: '36px',
      md: '36px',
      lg: '56px',
    },
    {
      class: 'h1-xl',
      mobile: '56px',
      md: '56px',
      lg: '72px',
    },
  ],
  h2: [
    {
      class: 'h2-sm',
      mobile: '18px',
      md: '18px',
      lg: '24px',
    },
    {
      class: 'h2-md',
      mobile: '24px',
      md: '24px',
      lg: '36px',
    },
    {
      class: 'h2-lg',
      mobile: '30px',
      md: '30px',
      lg: '48px',
    },
    {
      class: 'h2-xl',
      mobile: '48px',
      md: '48px',
      lg: '60px',
    },
  ],
  h3: [
    {
      class: 'h3-sm',
      mobile: '16px',
      md: '16px',
      lg: '16px',
    },
    {
      class: 'h3-md',
      mobile: '18px',
      md: '18px',
      lg: '20px',
    },
    {
      class: 'h3-lg',
      mobile: '18px',
      md: '18px',
      lg: '24px',
    },
    {
      class: 'h3-xl',
      mobile: '30px',
      md: '30px',
      lg: '36px',
    },
  ],
  h4: [
    {
      class: 'h4-sm',
      mobile: '14px',
      md: '14px',
      lg: '16px',
    },
    {
      class: 'h4-md',
      mobile: '16px',
      md: '16px',
      lg: '18px',
    },
    {
      class: 'h4-lg',
      mobile: '16px',
      md: '16px',
      lg: '20px',
    },
    {
      class: 'h4-xl',
      mobile: '24px',
      md: '24px',
      lg: '30px',
    },
  ],
}
</script>

<template>
  <section class="container">
    <div class="text-center mb-lg">
      <h2 class="text-secondary">Heading Size</h2>
    </div>
    <div class="grid grid-cols-5 gap-1 content-center">
      <div class="flex items-center justify-center bg-danger text-white">
        <h4 class="h4-sm py-3xs">Level</h4>
      </div>
      <div class="flex items-center justify-center bg-danger text-white">
        <h4 class="h4-sm py-3xs">Class</h4>
      </div>
      <div class="flex items-center justify-center bg-danger text-white">
        <h4 class="h4-sm py-3xs">Mobile (>640px)</h4>
      </div>
      <div class="flex items-center justify-center bg-danger text-white">
        <h4 class="h4-sm py-3xs">md (>768px)</h4>
      </div>
      <div class="flex items-center justify-center bg-danger text-white">
        <h4 class="h4-sm py-3xs">md (>1024px)</h4>
      </div>
      <!-- h1 -->
      <div class="row-span-4 flex items-center justify-center bg-light-1">
        <p class="text-sm py-3xs">H1</p>
      </div>
      <div
        class="col-span-4 grid grid-cols-4 gap-1 content-center"
        v-for="(item, i) in headingTextSize.h1"
        :key="i"
      >
        <div class="flex items-center justify-center bg-light-2">
          <p class="text-sm py-3xs" v-html="item.class"></p>
        </div>
        <div class="flex items-center justify-center bg-light-2">
          <p class="text-sm py-3xs" v-html="item.mobile"></p>
        </div>
        <div class="flex items-center justify-center bg-light-2">
          <p class="text-sm py-3xs" v-html="item.md"></p>
        </div>
        <div class="flex items-center justify-center bg-light-2">
          <p class="text-sm py-3xs" v-html="item.lg"></p>
        </div>
      </div>
      <!-- h2 -->
      <div class="row-span-4 flex items-center justify-center bg-warning">
        <p class="text-sm py-3xs">H2</p>
      </div>
      <div
        class="col-span-4 grid grid-cols-4 gap-1 content-center"
        v-for="(item, i) in headingTextSize.h2"
        :key="i"
      >
        <div class="flex items-center justify-center bg-warning">
          <p class="text-sm py-3xs" v-html="item.class"></p>
        </div>
        <div class="flex items-center justify-center bg-warning">
          <p class="text-sm py-3xs" v-html="item.mobile"></p>
        </div>
        <div class="flex items-center justify-center bg-warning">
          <p class="text-sm py-3xs" v-html="item.md"></p>
        </div>
        <div class="flex items-center justify-center bg-warning">
          <p class="text-sm py-3xs" v-html="item.lg"></p>
        </div>
      </div>
      <!-- h3 -->
      <div class="row-span-4 flex items-center justify-center bg-light-1">
        <p class="text-sm py-3xs">H3</p>
      </div>
      <div
        class="col-span-4 grid grid-cols-4 gap-1 content-center"
        v-for="(item, i) in headingTextSize.h3"
        :key="i"
      >
        <div class="flex items-center justify-center bg-light-2">
          <p class="text-sm py-3xs" v-html="item.class"></p>
        </div>
        <div class="flex items-center justify-center bg-light-2">
          <p class="text-sm py-3xs" v-html="item.mobile"></p>
        </div>
        <div class="flex items-center justify-center bg-light-2">
          <p class="text-sm py-3xs" v-html="item.md"></p>
        </div>
        <div class="flex items-center justify-center bg-light-2">
          <p class="text-sm py-3xs" v-html="item.lg"></p>
        </div>
      </div>
      <!-- h4 -->
      <div class="row-span-4 flex items-center justify-center bg-warning">
        <p class="text-sm py-3xs">H4</p>
      </div>
      <div
        class="col-span-4 grid grid-cols-4 gap-1 content-center"
        v-for="(item, i) in headingTextSize.h4"
        :key="i"
      >
        <div class="flex items-center justify-center bg-warning">
          <p class="text-sm py-3xs" v-html="item.class"></p>
        </div>
        <div class="flex items-center justify-center bg-warning">
          <p class="text-sm py-3xs" v-html="item.mobile"></p>
        </div>
        <div class="flex items-center justify-center bg-warning">
          <p class="text-sm py-3xs" v-html="item.md"></p>
        </div>
        <div class="flex items-center justify-center bg-warning">
          <p class="text-sm py-3xs" v-html="item.lg"></p>
        </div>
      </div>
    </div>
  </section>
</template>
