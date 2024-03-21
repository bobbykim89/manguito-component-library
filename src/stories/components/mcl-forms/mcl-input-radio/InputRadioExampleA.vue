<script setup lang="ts">
import type { RadioSizeType } from '@/components/mcl-forms'
import { MclInputRadio } from '@/components/mcl-forms'
import type { ColorPalette } from '@bobbykim/manguito-theme'
import { ref } from 'vue'

withDefaults(
  defineProps<{
    radioSize?: RadioSizeType
    bgColor?: ColorPalette
    checkedColor?: ColorPalette
    displayShadow?: boolean
  }>(),
  {
    radioSize: 'md',
    bgColor: 'success',
    checkedColor: 'light-1',
    displayShadow: false,
  }
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
  <section class="container py-lg px-sm border rounded-md">
    <h3 class="h3-md mb-md">MCL Input Radio Example A:</h3>
    <div class="border rounded-md bg-light-2 p-sm mb-sm">
      <div
        v-for="(item, idx) in sampleData"
        :key="idx"
        class="flex gap-2xs mb-2xs last:mb-0 items-center"
      >
        <mcl-input-radio
          :id="item.id"
          :radio-size="radioSize"
          :bg-color="bgColor"
          :checked-color="checkedColor"
          :display-shadow="displayShadow"
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
