<script setup lang="ts">
import { ref, reactive, provide } from 'vue'
import DropdownContainer from './lib/DropdownContainer.vue'
import DropdownContent from './lib/DropdownContent.vue'
import DropdownItem from './lib/DropdownItem.vue'

const props = withDefaults(
  defineProps<{
    title?: string
  }>(),
  {
    title: 'toggle',
  }
)
</script>

<template>
  <div>
    <dropdown-container>
      <template #toggler="{ toggle }">
        <button @click="toggle" class="btn btn-primary">{{ title }}</button>
      </template>
      <dropdown-content v-slot="{ itemClick }">
        <dropdown-item @click="itemClick">1</dropdown-item>
        <dropdown-item>Manguito is cute manguito is cute</dropdown-item>
        <dropdown-item>3</dropdown-item>
      </dropdown-content>
    </dropdown-container>
  </div>
</template>

<style lang="scss" scoped></style>
