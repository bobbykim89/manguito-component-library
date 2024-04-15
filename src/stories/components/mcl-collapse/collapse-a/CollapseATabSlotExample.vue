<script setup lang="ts">
import { MclCollapseA } from '@/components/mcl-collapse/lib'
import { ref } from 'vue'

const headSlotToggle = ref<boolean>(false)
const handleHeadSlotClick = (): void => {
  headSlotToggle.value = !headSlotToggle.value
}
</script>

<template>
  <section class="container">
    <div class="text-center mb-md">
      <h2 class="text-warning">MCL Collapse A Tab slot example</h2>
    </div>
    <div class="mb-lg">
      <mcl-collapse-a
        collapse-id="my-collapse-component-2"
        title="MCL Collapse A Example"
      >
        <template #tab>
          <div
            class="cursor-pointer transition-all ease-in duration-150 hover:opacity-80"
            :class="[headSlotToggle ? 'text-success' : 'text-danger']"
            @click="handleHeadSlotClick"
          >
            <svg
              class="w-sm"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentColor"
            >
              <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
              <path
                d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
              />
            </svg>
          </div>
        </template>
        <template #content>
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga
              quo incidunt a blanditiis mollitia ea est? Fugit voluptate
              expedita magni vitae iste. Nulla aperiam voluptate ullam dolor
              officiis earum quis aliquam at ducimus porro. Quidem, molestias!
              Voluptates perferendis distinctio ipsam dicta optio non
              praesentium, maiores commodi. Natus, ducimus doloremque?
            </p>
          </div>
        </template>
      </mcl-collapse-a>
    </div>
  </section>
</template>
