<script setup lang="ts">
import { AccordionGroup, Collapse } from '@/components/manguito-theme/lib'
import { useCollapseTrigger } from '@/components/manguito-theme/lib/composables'
import { computed, ref } from 'vue'

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

const panelRefs = collapseContent.map(() =>
  ref<InstanceType<typeof Collapse>>(),
)
// One trigger per panel: aria-expanded and aria-controls for both its header
// and footer buttons, kept in sync with the panel.
const triggers = collapseContent.map((item, idx) =>
  useCollapseTrigger(panelRefs[idx], { id: item.id, visible: idx === 0 }),
)
// A top-level ref, so the template unwraps it.
const triggerAttrs = computed(() => triggers.map((t) => t.attrs.value))

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
    <div class="mb-md text-center">
      <h2 class="text-info">Accordion Example:</h2>
    </div>
    <div class="rounded-md border-2 border-warning bg-white p-2xs">
      <AccordionGroup>
        <div
          v-for="(item, idx) in collapseContent"
          :key="item.id"
          class="mb-md last:mb-0"
        >
          <button
            v-bind="triggerAttrs[idx]"
            @click="triggers[idx].toggle()"
            class="btn btn-full"
            :class="customButtonColor(idx)"
          >
            {{ item.title }} Header
          </button>
          <Collapse
            :ref="
              (el) => {
                panelRefs[idx].value = (el ?? undefined) as
                  | InstanceType<typeof Collapse>
                  | undefined
              }
            "
            :id="item.id"
            custom-class="bg-light-3 p-xs"
            :visible="idx === 0"
          >
            <div>{{ item.content }}</div>
          </Collapse>
          <button
            v-bind="triggerAttrs[idx]"
            @click="triggers[idx].toggle()"
            class="btn btn-invert btn-full"
            :class="customButtonColor(idx)"
          >
            <span>{{ item.title }} Footer</span>
          </button>
        </div>
      </AccordionGroup>
    </div>
  </section>
</template>

<style scoped></style>
