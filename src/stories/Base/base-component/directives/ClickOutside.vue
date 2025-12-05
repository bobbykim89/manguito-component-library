<script setup lang="ts">
import { vClickOutside } from '@/components/manguito-theme/lib'
import { ref } from 'vue'

const showModal = ref<boolean>(false)
const modalRef = ref<HTMLElement>()

const closeModal = () => {
  showModal.value = false
}
</script>

<template>
  <div>
    <button @click="showModal = true" class="btn btn-secondary">
      Open Modal
    </button>

    <Teleport to="body">
      <div v-if="showModal" class="flex justify-center">
        <div
          v-click-outside="closeModal"
          class="bg-light-4 border-dark-1 p-sm mx-auto max-w-[28rem] rounded-md drop-shadow-md md:max-w-[36rem]"
          ref="modalRef"
        >
          <h2>Simple Modal</h2>
          <p class="mb-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi omnis
            ratione voluptates recusandae quas labore eaque quo est nihil unde
            quisquam doloribus, veniam tenetur molestias earum quis enim, quasi
            commodi corrupti totam? Velit facilis eligendi ullam ex nihil
            incidunt nulla impedit magni ad, explicabo temporibus sequi
            voluptates deleniti, harum sit!
          </p>
          <button class="btn btn-warning" @click="closeModal">Close</button>
        </div>
      </div>
    </Teleport>
  </div>
</template>
