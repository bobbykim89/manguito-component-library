<script setup lang="ts">
import { Collapse } from '@/components/manguito-theme/lib'
import { useCollapseTrigger } from '@/components/manguito-theme/lib/composables'
import { ref } from 'vue'

const collapseRef = ref<InstanceType<typeof Collapse>>()
// aria-expanded and aria-controls for the button, kept in sync with the panel
const { attrs: triggerAttrs, toggle } = useCollapseTrigger(collapseRef, {
  id: 'my-collapse-component',
})
</script>

<template>
  <section class="container">
    <div class="mb-md text-center">
      <h2 class="text-warning">Custom Collapse Component Example:</h2>
    </div>
    <div class="mb-lg rounded-md border-2 border-success bg-white p-2xs">
      <button
        v-bind="triggerAttrs"
        @click="toggle"
        class="btn btn-full btn-warning"
      >
        Tab Button
      </button>
      <collapse
        ref="collapseRef"
        id="my-collapse-component"
        custom-class="bg-light-3 p-xs"
      >
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
