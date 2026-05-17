<script setup lang="ts">
import { Modal } from '@/components/manguito-theme/lib'
import { ref } from 'vue'

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

const modalRef = ref<InstanceType<typeof Modal>>()

const openModal = () => {
  modalRef.value?.open()
  emit('open')
}
const closeModal = () => {
  modalRef.value?.close()
  emit('close')
}
</script>

<template>
  <div>
    <!-- Trigger slot -->
    <slot name="trigger" :open="openModal">
      <button class="btn btn-primary" @click="openModal">Open Modal</button>
    </slot>

    <Modal
      :id="modalId"
      ref="modalRef"
      :visible="initialVisible"
      @close="emit('update:visible', false); emit('close')"
      @open="emit('update:visible', true); emit('open')"
    >
      <template #header="{ close }">
        <div class="py-xs bg-light-1 border-b-light-4 flex justify-between border-b-2">
          <h3 class="h3-md">Modal</h3>
          <button @click="close" aria-label="Close">×</button>
        </div>
      </template>
      <template #body>
        <slot :close="closeModal">
          <div class="p-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Possimus dicta aspernatur animi eligendi ea repudiandae
            cupiditate exercitationem itaque labore dignissimos.
          </div>
        </slot>
      </template>
      <template #footer="{ close }">
        <div class="py-xs flex justify-end">
          <button class="btn btn-warning btn-round" @click="close">Close</button>
        </div>
      </template>
    </Modal>
  </div>
</template>
