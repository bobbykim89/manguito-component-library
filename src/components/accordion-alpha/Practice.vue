<script setup lang="ts">
import { Collapse, vToggle } from '@bobbykim/manguito-theme'

const props = withDefaults(
  defineProps<{
    open?: boolean
  }>(),
  {
    open: false,
  }
)

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
const handleClick = (e: Event) => {
  console.log(e)
}
</script>

<template>
  <div>
    <div
      v-for="(item, idx) in collapseContent"
      class="p-xs border-2 border-warning mb-md last:mb-0 bg-white"
    >
      <a :href="`#${item.id}`" v-toggle class="btn btn-secondary btn-full">{{
        item.title
      }}</a>
      <collapse
        :collapse-id="item.id"
        class-name="bg-secondary p-xs"
        :open="idx === 0 ? true : false"
        @accordion-event="handleClick"
        accordion="my-accordion"
      >
        <div>
          {{ item.content }}
        </div>
      </collapse>
      <button v-toggle:[item.id] class="btn btn-progress btn-full btn-no-ring">
        <span>
          {{ item.title }}
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped></style>
