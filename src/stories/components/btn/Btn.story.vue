<script setup lang="ts">
import { defineComponent, reactive } from 'vue'
import Btn from '@/components/btn'
import type {
  ColorPalette,
  BodyText,
} from '@/components/manguito-theme/theme/theme.types'

defineComponent({
  name: 'Btn',
  components: {
    btn: Btn,
  },
})

type ButtonSize = 'small' | 'medium' | 'large'

const state = reactive<{
  text: string
  color: ColorPalette
  textSize: BodyText
  buttonSize: ButtonSize
  block: boolean
  rounded: boolean
}>({
  text: 'Button Text',
  color: 'primary',
  textSize: 'md',
  buttonSize: 'medium',
  block: false,
  rounded: false,
})

const colors = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'danger',
  'light-1',
  'light-2',
  'light-3',
  'light-4',
  'dark-1',
  'dark-2',
  'dark-3',
  'dark-4',
  'black',
  'white',
]

const bodyTextSize = ['xs', 'sm', 'md', 'lg', 'xl']
const buttonSize = ['small', 'medium', 'large']
</script>

<template>
  <Story title="Btn">
    <btn
      :is-block="state.block"
      :rounded="state.rounded"
      :color="state.color"
      :text-size="state.textSize"
      :button-size="state.buttonSize"
      >{{ state.text }}</btn
    >
    <template #controls>
      <HstText title="Text" v-model="state.text" />
      <HstSelect title="Button Color" v-model="state.color" :options="colors" />
      <HstSelect
        title="Text Size"
        v-model="state.textSize"
        :options="bodyTextSize"
      />
      <HstSelect
        title="Button Size"
        v-model="state.buttonSize"
        :options="buttonSize"
      />
      <HstCheckbox title="Full Width" v-model="state.block" />
      <HstCheckbox title="Rounded Corner" v-model="state.rounded" />
    </template>
  </Story>
</template>
