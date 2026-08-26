<script setup lang="ts">
import type { ColorPalette } from '@/components/manguito-theme/lib'
import {
  MclCheckbox,
  MclFormGroup,
  type InputSizeType,
} from '@/components/mcl-forms/lib'
import { computed, ref } from 'vue'

withDefaults(
  defineProps<{
    size?: InputSizeType
    bgColor?: ColorPalette
    checkedBgColor?: ColorPalette
    indicatorColor?: ColorPalette
    borderColor?: ColorPalette
    showShadow?: boolean
    rounded?: boolean
  }>(),
  {
    size: 'md',
    bgColor: 'light-1',
    checkedBgColor: 'warning',
    indicatorColor: 'dark-3',
    borderColor: 'dark-1',
    showShadow: false,
    rounded: false,
  },
)

interface CheckboxInfo {
  text: string
  value: string
}

const checkboxInfo: CheckboxInfo[] = [
  { text: 'Item 1', value: 'value-1' },
  { text: 'Item 2', value: 'value-2' },
  { text: 'Item 3', value: 'value-3' },
  { text: 'Item 4', value: 'value-4' },
  { text: 'Item 5', value: 'value-5' },
]

/**
 * MclCheckbox's `v-model` is a plain boolean — one model per box — so a set is
 * held as a boolean per value rather than as a single array model. `value` is
 * still worth setting: it is what each box submits in a native form post.
 */
const checkedState = ref<Record<string, boolean>>(
  Object.fromEntries(checkboxInfo.map((item) => [item.value, false])),
)

const selectedItems = computed<string[]>(() =>
  checkboxInfo
    .map((item) => item.value)
    .filter((value) => checkedState.value[value]),
)
</script>

<template>
  <div class="rounded-md bg-light-1 px-md py-sm">
    <mcl-form-group
      group-label
      label="Multiple Checkbox Example:"
      help-text="One boolean model per checkbox; the set shares a submitted name."
      text-bold
    >
      <!--
        The control sits inside the <label>: group-label mode renders a
        <legend> and no `for`, so each checkbox generates its own id and
        implicit labelling is the correct association.
      -->
      <label
        v-for="item in checkboxInfo"
        :key="item.value"
        class="mb-2xs flex items-center gap-2 last:mb-sm"
      >
        <mcl-checkbox
          v-model="checkedState[item.value]"
          name="multiple-checkbox"
          :value="item.value"
          :size="size"
          :bg-color="bgColor"
          :checked-bg-color="checkedBgColor"
          :indicator-color="indicatorColor"
          :border-color="borderColor"
          :show-shadow="showShadow"
          :rounded="rounded"
        ></mcl-checkbox>
        <span>{{ item.text }}</span>
      </label>
    </mcl-form-group>

    <div class="rounded-md bg-warning px-sm py-xs">
      <div class="font-bold">Checked items:</div>
      <div v-if="selectedItems.length === 0">(none)</div>
      <div v-for="value in selectedItems" :key="value">
        <span>{{ value }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
