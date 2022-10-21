<script setup lang="ts">
import { reactive } from 'vue'
import BtnAlpha from '@/components/btn-alpha'
import BtnBeta from '@/components/btn-beta'
import type {
  ColorPalette,
  BodyText,
  ButtonSize,
} from '@/components/manguito-theme/theme/theme.types'
import { colors, bodyTextSize, buttonSize } from '@/assets/options'

const stateAlpha = reactive<{
  text: string
  color: ColorPalette
  textSize: BodyText
  buttonSize: ButtonSize
  block: boolean
  rounded: boolean
  displayShadow?: boolean
}>({
  text: 'Button Alpha',
  color: 'primary',
  textSize: 'md',
  buttonSize: 'medium',
  block: false,
  rounded: false,
  displayShadow: false,
})

const stateBeta = reactive<{
  color?: ColorPalette
  hoverColor?: ColorPalette
  textSize?: BodyText
  buttonSize?: ButtonSize
  isBlock?: boolean
  rounded?: boolean
  displayShadow?: boolean
  text: string
}>({
  color: 'primary',
  hoverColor: 'light-1',
  textSize: 'md',
  buttonSize: 'medium',
  isBlock: false,
  rounded: false,
  displayShadow: true,
  text: 'Button Beta',
})
</script>

<template>
  <Story title="Button" group="base-comp">
    <Variant title="btn-alpha">
      <btn-alpha
        :is-block="stateAlpha.block"
        :rounded="stateAlpha.rounded"
        :color="stateAlpha.color"
        :text-size="stateAlpha.textSize"
        :button-size="stateAlpha.buttonSize"
        :display-shadow="stateAlpha.displayShadow"
        >{{ stateAlpha.text }}</btn-alpha
      >
      <template #controls>
        <HstText title="Text" v-model="stateAlpha.text" />
        <HstSelect title="color" v-model="stateAlpha.color" :options="colors" />
        <HstSelect
          title="text-size"
          v-model="stateAlpha.textSize"
          :options="bodyTextSize"
        />
        <HstSelect
          title="button size"
          v-model="stateAlpha.buttonSize"
          :options="buttonSize"
        />
        <HstCheckbox title="is-block" v-model="stateAlpha.block" />
        <HstCheckbox title="rounded" v-model="stateAlpha.rounded" />
        <HstCheckbox
          title="display-shadow"
          v-model="stateAlpha.displayShadow"
        />
      </template>
    </Variant>
    <Variant title="btn-beta">
      <btn-beta
        :color="stateBeta.color"
        :hover-color="stateBeta.hoverColor"
        :text-size="stateBeta.textSize"
        :button-size="stateBeta.buttonSize"
        :is-block="stateBeta.isBlock"
        :rounded="stateBeta.rounded"
        :display-shadow="stateBeta.displayShadow"
        >{{ stateBeta.text }}</btn-beta
      >
      <template #controls>
        <HstText title="Text" v-model="stateBeta.text" />
        <HstSelect title="color" v-model="stateBeta.color" :options="colors" />
        <HstSelect
          title="hover-color"
          v-model="stateBeta.hoverColor"
          :options="colors"
        />
        <HstSelect
          title="text-size"
          v-model="stateBeta.textSize"
          :options="bodyTextSize"
        />
        <HstSelect
          title="button size"
          v-model="stateBeta.buttonSize"
          :options="buttonSize"
        />
        <HstCheckbox title="is-block" v-model="stateBeta.isBlock" />
        <HstCheckbox title="rounded" v-model="stateBeta.rounded" />
        <HstCheckbox title="display-shadow" v-model="stateBeta.displayShadow" />
      </template>
    </Variant>
  </Story>
</template>
