<script setup lang="ts">
import { AccordionGroup } from '@/components/manguito-theme/lib'
import { MclCollapseA } from '@/components/mcl-collapse/lib'

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
    <div class="mb-md text-center">
      <h2 class="text-danger">MCL Collapse A accordion example</h2>
    </div>
    <AccordionGroup>
      <mcl-collapse-a
        v-for="item in accordionContent"
        :key="item.id"
        :collapse-id="item.id"
        :title="item.title"
        class="mb-xs last:mb-0"
      >
        <template #content>
          <div v-html="item.content"></div>
        </template>
      </mcl-collapse-a>
    </AccordionGroup>
  </section>
</template>
