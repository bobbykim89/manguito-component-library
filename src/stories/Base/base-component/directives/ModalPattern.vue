<script setup lang="ts">
import { vToggle } from '@/components/manguito-theme/lib'
import { observeVisibleAttr } from '@/components/manguito-theme/lib/composables'
import { computed, ref } from 'vue'

interface Props {
  modalId: string
  initialVisible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  initialVisible: false,
})

const emit = defineEmits<{
  'update:visible': [visible: boolean]
  open: []
  close: []
}>()

const modalRef = ref<HTMLElement>()
const isVisible = ref(props.initialVisible)

// Observe attribute changes from v-toggle
observeVisibleAttr(modalRef, (visible) => {
  isVisible.value = visible
  emit('update:visible', visible)
  visible ? emit('open') : emit('close')
})

const modalClasses = computed(() => ({
  'modal-open': isVisible.value,
  'modal-closed': !isVisible.value,
}))
</script>

<template>
  <div>
    <!-- Trigger slot -->
    <slot name="trigger" :visible="isVisible">
      <button class="btn btn-primary" v-toggle:[modalId]>Open Modal</button>
    </slot>

    <!-- Modal element -->
    <Teleport to="body">
      <div
        :id="modalId"
        ref="modalRef"
        :visible="isVisible"
        :class="modalClasses"
        class="modal"
      >
        <Transition name="modal-fade">
          <div v-if="isVisible" class="modal-overlay">
            <div class="bg-light-1 p-sm width-[90%] max-w-[32rem] rounded-lg">
              <slot :close="() => (isVisible = false)" />

              <div class="flex justify-end">
                <button v-toggle:[modalId] class="modal-close font-bold">
                  ×
                </button>
              </div>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Possimus dicta aspernatur animi eligendi ea repudiandae
                cupiditate exercitationem itaque labore dignissimos modi
                deleniti quae, perferendis architecto aliquam qui quidem,
                sapiente maiores, doloremque ullam neque quia! Placeat
                perspiciatis quia consectetur culpa neque dignissimos, deleniti
                dolorem ex est fugit hic mollitia tempore laboriosam?
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  pointer-events: none;
}

.modal-open {
  pointer-events: auto;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  max-width: 32rem;
  width: 90%;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
