v
<script setup lang="ts">
import { Collapse, vCollapse } from '@/components/manguito-theme'

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
</script>

<template>
  <section class="container">
    <div class="text-center mb-md">
      <h2 class="text-info">Accordion Example:</h2>
    </div>
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
          :id="item.id"
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
  </section>
</template>

<style scoped></style>
