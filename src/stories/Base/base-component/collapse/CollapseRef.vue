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
    <div class="text-center mb-md">
      <h2 class="text-danger">Trigger collapse through ref:</h2>
    </div>
    <div class="p-2xs border-2 border-success rounded-md mb-lg bg-white">
      <button
        @click="handleCollapse"
        class="btn btn-full btn-danger btn-no-ring"
      >
        Trigger toggle
      </button>
      <collapse ref="collapseRef" class-name="bg-light-3 p-xs">
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
