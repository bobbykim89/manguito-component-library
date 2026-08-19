<script setup lang="ts">
import { Collapse } from '@/components/manguito-theme/lib'
import { ref } from 'vue'
const collapseRef = ref<InstanceType<typeof Collapse>>()

const handleCollapse = () => {
  // toggle collapse
  collapseRef.value!.toggle()
}
</script>

<template>
  <section class="container">
    <div class="mb-md text-center">
      <h2 class="text-danger">Trigger collapse through ref:</h2>
    </div>
    <div class="mb-lg rounded-md border-2 border-success bg-white p-2xs">
      <button
        @click="handleCollapse"
        class="btn btn-full btn-no-ring btn-danger"
      >
        Trigger toggle
      </button>
      <collapse ref="collapseRef" custom-class="bg-light-3 p-xs">
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
@/components/manguito-theme/lib/index
