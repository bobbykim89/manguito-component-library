<script setup lang="ts" generic="T = string | number">
import { ref } from 'vue'
import { MclCheckbox, type InputSizeType } from '@/components/mcl-forms/lib'
import type { ColorPalette } from '@/components/manguito-theme/lib'

const props = defineProps<{
  inputSize?: InputSizeType
  bgColor?: ColorPalette
  checkedBgColor?: ColorPalette
  checkColor?: ColorPalette
  borderColor?: ColorPalette
  displayShadow?: boolean
  rounded?: boolean
}>()

interface CheckboxInfo {
  text: string
  value: string | number
}

const checkboxInfo: CheckboxInfo[] = [
  { text: 'Item 1', value: 'value-1' },
  { text: 'Item 2', value: 'value-2' },
  { text: 'Item 3', value: 'value-3' },
  { text: 'Item 4', value: 'value-4' },
  { text: 'Item 5', value: 'value-5' },
]
const selectedItems = ref<CheckboxInfo['value'][]>([])

const handleCheckboxClick = (
  e: Event,
  checked: boolean,
  value: string | number,
  item: CheckboxInfo
) => {
  e.preventDefault()
  if (checked) {
    selectedItems.value?.push(value)
  }
  if (!checked) {
    const elemIdx = selectedItems.value.findIndex((el) => {
      return el === item.value
    })
    selectedItems.value.splice(elemIdx, 1)
  }
}
</script>

<template>
  <div class="px-md py-sm bg-light-1 rounded-md">
    <div class="mb-sm">
      <h3 class="h3-md">Multiple Checkbox Example:</h3>
    </div>
    <div>
      <div
        v-for="(item, idx) in checkboxInfo"
        :key="idx"
        class="flex gap-2 mb-2xs last:mb-sm"
      >
        <MclCheckbox
          :id="`checkbox-${idx}`"
          :value="item.value"
          :input-size="inputSize"
          :bg-color="bgColor"
          :checked-bg-color="checkedBgColor"
          :check-color="checkColor"
          :border-color="borderColor"
          :display-shadow="displayShadow"
          :rounded="rounded"
          @checkbox-click="
            ($event, checked, value) =>
              handleCheckboxClick($event, checked, value, item)
          "
        ></MclCheckbox
        ><label :for="`checkbox-${idx}`">{{ item.text }}</label>
      </div>
    </div>
    <div class="px-sm py-xs bg-warning rounded-md">
      <div>Checked items:</div>
      <div v-for="(item, idx) in selectedItems" :key="idx">
        <span>{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
