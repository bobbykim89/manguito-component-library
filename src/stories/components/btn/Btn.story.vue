<script setup lang="ts">
import { defineComponent, reactive } from 'vue'
import Btn from '@/components/btn'
import type {
  ColorPalette,
  BodyText,
} from '@/components/manguito-theme/theme/theme.types'
import { colors, bodyTextSize, buttonSize } from '@/assets/options'

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
      <HstSelect title="color" v-model="state.color" :options="colors" />
      <HstSelect
        title="text-size"
        v-model="state.textSize"
        :options="bodyTextSize"
      />
      <HstSelect
        title="button size"
        v-model="state.buttonSize"
        :options="buttonSize"
      />
      <HstCheckbox title="is-block" v-model="state.block" />
      <HstCheckbox title="rounded" v-model="state.rounded" />
    </template>
  </Story>
</template>
