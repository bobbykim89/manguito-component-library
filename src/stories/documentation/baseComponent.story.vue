<script setup lang="ts">
import { ref } from 'vue'
import {
  Collapse,
  vCollapse,
  DropdownContainer,
  DropdownContent,
} from '@/components/manguito-theme'

const collapseContent = [
  {
    id: '1',
    title: 'Accordion 1',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga quo incidunt a blanditiis mollitia ea est? Fugit voluptate expedita magni vitae iste. Nulla aperiam voluptate ullam dolor officiis earum quis aliquam at ducimus porro. Quidem, molestias! Voluptates perferendis distinctio ipsam dicta optio non praesentium, maiores commodi. Natus, ducimus doloremque?',
  },
  {
    id: '2',
    title: 'Accordion 2',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga quo incidunt a blanditiis mollitia ea est? Fugit voluptate expedita magni vitae iste. Nulla aperiam voluptate ullam dolor officiis earum quis aliquam at ducimus porro. Quidem, molestias! Voluptates perferendis distinctio ipsam dicta optio non praesentium, maiores commodi. Natus, ducimus doloremque?',
  },
  {
    id: '3',
    title: 'Accordion 3',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga quo incidunt a blanditiis mollitia ea est? Fugit voluptate expedita magni vitae iste. Nulla aperiam voluptate ullam dolor officiis earum quis aliquam at ducimus porro. Quidem, molestias! Voluptates perferendis distinctio ipsam dicta optio non praesentium, maiores commodi. Natus, ducimus doloremque?',
  },
  {
    id: '4',
    title: 'Accordion 4',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga quo incidunt a blanditiis mollitia ea est? Fugit voluptate expedita magni vitae iste. Nulla aperiam voluptate ullam dolor officiis earum quis aliquam at ducimus porro. Quidem, molestias! Voluptates perferendis distinctio ipsam dicta optio non praesentium, maiores commodi. Natus, ducimus doloremque?',
  },
]
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
const customButtonColor = (idx: number): string => {
  switch (idx) {
    case 0:
      return 'btn-primary'
    case 1:
      return 'btn-secondary'
    case 2:
      return 'btn-success'
    case 3:
      return 'btn-danger'
    default:
      return ' '
  }
}
const dropdownSelectedRef = ref<string>('')
const dropdownSelectEvent = (item: string): void => {
  dropdownSelectedRef.value = item
}
</script>

<template>
  <Story title="Base Component" group="design-system">
    <Variant title="Collapse">
      <div class="p-md">
        <h2 class="mb-md">Custom Collapse Component Example:</h2>
        <div class="p-2xs border-2 border-success rounded-md mb-lg bg-white">
          <a
            href="#my-collapse-component"
            v-collapse
            class="btn btn-full btn-warning"
            >Tab Button</a
          >
          <collapse
            collapse-id="my-collapse-component"
            class-name="bg-light-3 p-xs"
          >
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga
              quo incidunt a blanditiis mollitia ea est? Fugit voluptate
              expedita magni vitae iste. Nulla aperiam voluptate ullam dolor
              officiis earum quis aliquam at ducimus porro. Quidem, molestias!
              Voluptates perferendis distinctio ipsam dicta optio non
              praesentium, maiores commodi. Natus, ducimus doloremque?
            </div>
          </collapse>
        </div>
        <h2 class="mb-md">Accordion Example:</h2>
        <div class="p-2xs border-2 border-warning rounded-md bg-white">
          <div v-for="(item, idx) in collapseContent" class="mb-md last:mb-0">
            <a
              :href="`#${item.id}`"
              v-collapse
              class="btn btn-full"
              :class="customButtonColor(idx)"
              >{{ item.title }} Header</a
            >
            <collapse
              :collapse-id="item.id"
              class-name="bg-light-3 p-xs"
              :visible="idx === 0 ? true : false"
              accordion="my-accordion"
            >
              <div>
                {{ item.content }}
              </div>
            </collapse>
            <button
              v-collapse:[item.id]
              class="btn btn-invert btn-full btn-no-ring"
              :class="customButtonColor(idx)"
            >
              <span> {{ item.title }} Footer </span>
            </button>
          </div>
        </div>
      </div>
    </Variant>
    <Variant title="Dropdown">
      <div class="p-md">
        <h2 class="mb-md">Custom Dropdown Component Example:</h2>
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
      </div>
    </Variant>
  </Story>
</template>
