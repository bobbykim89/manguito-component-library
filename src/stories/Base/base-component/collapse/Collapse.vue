<script setup lang="ts">
import { Collapse } from '@/components/manguito-theme/lib'
import { vCollapse } from '@/components/manguito-theme/lib/directives'
</script>

<template>
  <section class="container">
    <div class="mb-md text-center">
      <h2 class="text-warning">Custom Collapse Component Example:</h2>
    </div>
    <div class="p-2xs border-success mb-lg rounded-md border-2 bg-white">
      <a
        href="#my-collapse-component"
        v-collapse
        class="btn btn-full btn-warning btn-no-ring"
        >Tab Button</a
      >
      <collapse id="my-collapse-component" class-name="bg-light-3 p-xs">
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga quo
          incidunt a blanditiis mollitia ea est? Fugit voluptate expedita magni
          vitae iste. Nulla aperiam voluptate ullam dolor officiis earum quis
          aliquam at ducimus porro. Quidem, molestias! Voluptates perferendis
          distinctio ipsam dicta optio non praesentium, maiores commodi. Natus,
          ducimus doloremque?
        </div>
      </collapse>
    </div>
  </section>
</template>

<style scoped></style>
@/components/manguito-theme/lib/index
