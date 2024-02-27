<script setup lang="ts">
import { ref } from 'vue'
import { DropdownContainer, DropdownContent } from '@/components/manguito-theme'

const dropdownItems = [
  {
    title: 'Dropdown item example 1',
  },
  {
    title: 'Dropdown item example 2',
  },
  {
    title: 'Dropdown item example 3',
  },
  {
    title: 'Dropdown item example 4',
  },
]

const dropdownSelectedRef = ref<string>('')
const dropdownSelectEvent = (item: string): void => {
  dropdownSelectedRef.value = item
}
</script>

<template>
  <section class="container">
    <div class="text-center mb-md">
      <h2 class="text-warning">Dropdown Component Example:</h2>
    </div>
    <div class="p-sm border-2 border-success rounded-md bg-white">
      <dropdown-container>
        <template #toggler="{ toggle, dropdownState }">
          <button @click="toggle" class="btn btn-progress btn-danger">
            <span> Dropdown Button </span>
          </button>
        </template>
        <dropdown-content v-slot="{ itemClick }">
          <button
            v-for="(item, idx) in dropdownItems"
            @click="itemClick(), dropdownSelectEvent(item.title)"
            class="px-xs py-2xs block bg-light-2 hover:bg-light-4 focus:bg-light-4 w-full"
          >
            {{ item.title }}
          </button>
        </dropdown-content>
      </dropdown-container>
      <div class="mt-sm">Selected Item: {{ dropdownSelectedRef }}</div>
    </div>
  </section>
</template>
