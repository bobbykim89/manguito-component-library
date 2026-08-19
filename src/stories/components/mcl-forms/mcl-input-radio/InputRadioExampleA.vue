<script setup lang="ts">
import type { ColorPalette } from '@/components/manguito-theme/lib'
import { MclInputRadio, type InputSizeType } from '@/components/mcl-forms/lib'
import { ref } from 'vue'

withDefaults(
  defineProps<{
    radioSize?: InputSizeType
    bgColor?: ColorPalette
    checkedColor?: ColorPalette
    showShadow?: boolean
  }>(),
  {
    radioSize: 'md',
    bgColor: 'success',
    checkedColor: 'light-1',
    showShadow: false,
  },
)

const valueRef = ref<string | number>('')
const sampleData = [
  {
    id: 'item-1',
    value: 'first-item',
    text: 'First Item',
  },
  {
    id: 'item-2',
    value: 'second-item',
    text: 'Second Item',
  },
  {
    id: 'item-3',
    value: 'third-item',
    text: 'Third Item',
  },
]

const setValue = (e: Event, value: string | number) => {
  valueRef.value = value
}
</script>

<template>
  <section class="container rounded-md border px-sm py-lg">
    <h3 class="h3-md mb-md">MCL Input Radio Example A:</h3>
    <div class="mb-sm rounded-md border bg-light-2 p-sm">
      <div
        v-for="(item, idx) in sampleData"
        :key="idx"
        class="mb-2xs flex items-center gap-2xs last:mb-0"
      >
        <mcl-input-radio
          :id="item.id"
          :radio-size="radioSize"
          :bg-color="bgColor"
          :checked-color="checkedColor"
          :display-shadow="showShadow"
          :value="item.value"
          :checked="valueRef === item.value"
          @change="setValue"
        ></mcl-input-radio>
        <label :for="item.id"
          ><p>{{ item.text }}</p></label
        >
      </div>
    </div>
    <div>
      <p><span class="font-bold">Selected value: </span>{{ valueRef }}</p>
    </div>
  </section>
</template>
