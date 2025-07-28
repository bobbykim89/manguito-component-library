<script lang="ts" setup>
interface SizeItem {
  size: string;
  class: string;
}

interface SpacingClass {
  "3xs": SizeItem;
  "2xs": SizeItem;
  xs: SizeItem;
  sm: SizeItem;
  md: SizeItem;
  lg: SizeItem;
  xl: SizeItem;
  "2xl": SizeItem;
  "3xl": SizeItem;
}

interface BreakpointClass {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
}

const breakPoint: BreakpointClass = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};
</script>

<template>
  <section class="container">
    <div class="mb-lg text-center">
      <h2 class="text-danger">Breakpoint</h2>
    </div>
    <div
      class="mb-2xs grid grid-cols-2 content-center gap-6"
      v-for="(size, index) in breakPoint"
      :key="index"
    >
      <div class="flex items-center justify-center">
        <h3 class="h3-md text-warning drop-shadow-md" v-html="index"></h3>
      </div>
      <div class="p-xs flex items-center justify-center bg-white">
        <h3 class="h3-md" v-html="size"></h3>
      </div>
    </div>
  </section>
</template>
