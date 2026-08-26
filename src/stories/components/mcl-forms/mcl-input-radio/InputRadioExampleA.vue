<script setup lang="ts">
import type { ColorPalette } from '@/components/manguito-theme/lib'
import {
  MclFormGroup,
  MclInputRadio,
  type InputSizeType,
} from '@/components/mcl-forms/lib'
import { ref } from 'vue'

withDefaults(
  defineProps<{
    size?: InputSizeType
    bgColor?: ColorPalette
    checkedBgColor?: ColorPalette
    indicatorColor?: ColorPalette
    borderColor?: ColorPalette
    showShadow?: boolean
  }>(),
  {
    size: 'md',
    bgColor: 'light-1',
    checkedBgColor: 'success',
    indicatorColor: 'light-1',
    borderColor: 'dark-1',
    showShadow: false,
  },
)

/**
 * A radio set is one shared model plus a `value` per radio — there is no
 * `checked` prop and no `(event, value)` change payload. `name` is what ties
 * the set together for native form submission and for arrow-key navigation.
 */
const valueRef = ref<string | number | null>(null)

const sampleData = [
  { value: 'first-item', text: 'First Item' },
  { value: 'second-item', text: 'Second Item' },
  { value: 'third-item', text: 'Third Item' },
]
</script>

<template>
  <section class="container rounded-md border px-sm py-lg">
    <h3 class="h3-md mb-md">MCL Input Radio Example A:</h3>
    <div class="mb-sm rounded-md border bg-light-2 p-sm">
      <mcl-form-group
        group-label
        label="Pick one"
        help-text="Arrow keys move within the set; the shared name is what groups it."
        text-bold
      >
        <!--
          group-label renders a <legend> and no `for`, so each radio generates
          its own id — the control goes inside the <label> rather than beside
          it.
        -->
        <label
          v-for="item in sampleData"
          :key="item.value"
          class="mb-2xs flex items-center gap-2xs last:mb-0"
        >
          <mcl-input-radio
            v-model="valueRef"
            name="input-radio-example-a"
            :value="item.value"
            :size="size"
            :bg-color="bgColor"
            :checked-bg-color="checkedBgColor"
            :indicator-color="indicatorColor"
            :border-color="borderColor"
            :show-shadow="showShadow"
          ></mcl-input-radio>
          <span>{{ item.text }}</span>
        </label>
      </mcl-form-group>
    </div>
    <div>
      <p>
        <span class="font-bold">Selected value: </span
        >{{ valueRef ?? '(none)' }}
      </p>
    </div>
  </section>
</template>
