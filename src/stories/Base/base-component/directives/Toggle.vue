<script setup lang="ts">
import { observeVisibleAttr } from '@/components/manguito-theme/lib/composables'
import { vToggle } from '@/components/manguito-theme/lib/directives'
import { ref } from 'vue'

const componentRef = ref<HTMLElement>()
const visibleRef = ref<boolean>(false)

const handleVisibility = (visible: boolean = false) => {
  visibleRef.value = visible
}
observeVisibleAttr(componentRef, handleVisibility)
</script>

<template>
  <div class="bg-light-1 px-sm py-lg rounded-md drop-shadow-lg">
    <button v-toggle:my-text class="btn btn-progress btn-success">
      <span>Toggle</span>
    </button>
    <div id="my-text" :visible="visibleRef" ref="componentRef">
      <Transition>
        <div
          v-if="visibleRef"
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
