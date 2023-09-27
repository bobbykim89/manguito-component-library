<script setup lang="ts">
import { ref, reactive, provide } from 'vue'
import DropdownContainer from './lib/DropdownContainer.vue'
import DropdownContent from './lib/DropdownContent.vue'

export interface DropdownItem {
  title: string
  link?: string
}

const props = withDefaults(
  defineProps<{
    title?: string
    dropdownItems: DropdownItem[]
  }>(),
  {
    title: 'toggle',
  }
)
</script>

<template>
  <div>
    <dropdown-container>
      <template #toggler="{ toggle, dropdownState }">
        <button
          @click="toggle"
          class="btn btn-warning flex justify-between items-center gap-2xs"
        >
          <span>
            {{ title }}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            class="h-xs"
            :class="[
              !dropdownState ? 'rotate-0' : 'rotate-180',
              'transition-all duration-300 ease-in',
            ]"
          >
            <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
            <path
              d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z"
            />
          </svg>
        </button>
      </template>
      <dropdown-content v-slot="{ itemClick }">
        <div
          v-for="(item, idx) in dropdownItems"
          :key="idx"
          class="block hover:bg-gray-200 my-1 px-4 py-1 font-medium text-gray-800"
        >
          <a :href="item.link" @click="itemClick" class="">{{ item.title }}</a>
        </div>
      </dropdown-content>
    </dropdown-container>
  </div>
</template>

<style lang="scss" scoped></style>
