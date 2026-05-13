<script setup lang="ts">
import { ref } from 'vue'

const isVisible = ref(false)
</script>

<template>
  <div class="bg-light-1 px-sm py-lg rounded-md drop-shadow-lg">
    <button @click="isVisible = !isVisible" class="btn btn-progress btn-success">
      <span>Toggle</span>
    </button>
    <Transition>
      <div
        v-if="isVisible"
        class="mt-sm bg-warning p-xs rounded-lg drop-shadow-lg"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
        voluptatibus ipsam reprehenderit id harum debitis cumque inventore
        commodi pariatur, voluptatum odio quis! Maiores voluptatibus, fuga
        corrupti tenetur ex sit. Repellendus quisquam adipisci non nobis illo
        deleniti expedita rem ipsum voluptates rerum. Officiis iste cumque
        rerum aliquam iure autem vitae dolores?
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
