<script setup lang="ts">
import { MclCollapseB } from '@/components/mcl-collapse'

const accordionContent = [
  {
    id: 'collapse-item-1',
    title: 'Collapse Item 1',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga quo incidunt a blanditiis mollitia ea est? Fugit voluptate expedita magni vitae iste. Nulla aperiam voluptate ullam dolor officiis earum quis aliquam at ducimus porro. Quidem, molestias! Voluptates perferendis distinctio ipsam dicta optio non praesentium, maiores commodi. Natus, ducimus doloremque?',
  },
  {
    id: 'collapse-item-2',
    title: 'Collapse Item 2',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga quo incidunt a blanditiis mollitia ea est? Fugit voluptate expedita magni vitae iste. Nulla aperiam voluptate ullam dolor officiis earum quis aliquam at ducimus porro. Quidem, molestias! Voluptates perferendis distinctio ipsam dicta optio non praesentium, maiores commodi. Natus, ducimus doloremque?',
  },
  {
    id: 'collapse-item-3',
    title: 'Collapse Item 3',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga quo incidunt a blanditiis mollitia ea est? Fugit voluptate expedita magni vitae iste. Nulla aperiam voluptate ullam dolor officiis earum quis aliquam at ducimus porro. Quidem, molestias! Voluptates perferendis distinctio ipsam dicta optio non praesentium, maiores commodi. Natus, ducimus doloremque?',
  },
  {
    id: 'collapse-item-4',
    title: 'Collapse Item 4',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga quo incidunt a blanditiis mollitia ea est? Fugit voluptate expedita magni vitae iste. Nulla aperiam voluptate ullam dolor officiis earum quis aliquam at ducimus porro. Quidem, molestias! Voluptates perferendis distinctio ipsam dicta optio non praesentium, maiores commodi. Natus, ducimus doloremque?',
  },
]
</script>

<template>
  <section class="container">
    <div class="text-center mb-md">
      <h2 class="text-danger">MCL Collapse B accordion example</h2>
    </div>
    <div>
      <mcl-collapse-b
        v-for="(item, idx) in accordionContent"
        :collapse-id="item.id"
        :title="item.title"
        :visible="idx === 0 ? true : false"
        accordion="my-mcl-collapse-b"
        class="mb-xs last:mb-0"
      >
        <div v-html="item.content"></div>
      </mcl-collapse-b>
    </div>
  </section>
</template>
