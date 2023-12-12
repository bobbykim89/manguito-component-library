<script lang="ts" setup>
interface SizeItem {
  size: string
  class: string
}

interface BodyTextClass {
  xs: SizeItem
  sm: SizeItem
  md: SizeItem
  lg: SizeItem
  xl: SizeItem
}

const bodyTextSize: BodyTextClass = {
  xs: { size: '12px', class: 'text-xs' },
  sm: { size: '14px', class: 'text-sm' },
  md: { size: '16px', class: 'text-md' },
  lg: { size: '18px', class: 'text-lg' },
  xl: { size: '20px', class: 'text-xl' },
}
</script>

<template>
  <section class="container">
    <div class="text-center mb-lg">
      <h2 class="text-success">Breakpoint</h2>
    </div>
    <div
      class="grid grid-cols-2 gap-6 content-center mb-2xs"
      v-for="(unit, index) in bodyTextSize"
      :key="index"
    >
      <div class="flex items-center justify-center">
        <h3 class="drop-shadow-md text-warning">
          {{ index }}: {{ unit.size }}
        </h3>
      </div>
      <div class="flex items-center justify-center bg-white p-xs">
        <div :class="unit.class">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
          debitis, natus, veniam reiciendis voluptatum dolore minima qui iure
          quam vitae fuga, et accusamus excepturi eos dolorem illum molestias
          quo nesciunt.
        </div>
      </div>
    </div>
  </section>
</template>
