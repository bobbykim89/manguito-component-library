<script lang="ts" setup>
interface SizeItem {
  size: string
  class: string
}

interface SpacingClass {
  '3xs': SizeItem
  '2xs': SizeItem
  xs: SizeItem
  sm: SizeItem
  md: SizeItem
  lg: SizeItem
  xl: SizeItem
  '2xl': SizeItem
  '3xl': SizeItem
}

interface BreakpointClass {
  sm: string
  md: string
  lg: string
  xl: string
}

const breakPoint: BreakpointClass = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
}
</script>

<template>
  <section class="container">
    <div class="text-center mb-lg">
      <h2 class="text-danger">Breakpoint</h2>
    </div>
    <div
      class="grid grid-cols-2 gap-6 content-center mb-2xs"
      v-for="(size, index) in breakPoint"
      :key="index"
    >
      <div class="flex items-center justify-center">
        <h3 class="h3-md drop-shadow-md text-warning" v-html="index"></h3>
      </div>
      <div class="flex items-center justify-center bg-white p-xs">
        <h3 class="h3-md" v-html="size"></h3>
      </div>
    </div>
  </section>
</template>
