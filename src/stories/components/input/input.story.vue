<script setup lang="ts">
import { reactive, ref } from 'vue'
import MclInput from '@/components/mcl-input'
import MclTextArea from '@/components/mcl-text-area'
import BtnAlpha from '@/components/btn-alpha'
import type {
  ColorPalette,
  InputType,
  BodyText,
  SpacingLevel,
} from '@/components/manguito-theme/theme/theme.types'
import {
  colors,
  bodyTextSize,
  inputOptions,
  spacingOptions,
} from '@/assets/options'

const inputRef = ref('')
const textOutput = ref('')
const handleSubmit = (): void => {
  if (inputRef.value !== '') {
    textOutput.value = inputRef.value
    inputRef.value = ''
  }
}
const handleCancel = (): void => {
  if (inputRef.value !== '') {
    console.log('cancelled!')
    inputRef.value = ''
  } else {
    console.log('there is no text!')
  }
}

const stateAlpha = reactive<{
  identifier: string
  displayLabel?: boolean
  labelText?: string
  labelSize?: BodyText
  labelColor?: ColorPalette
  labelBold?: boolean
  displayBorder?: boolean
  borderColor?: ColorPalette
  displayHighlight?: boolean
  highlightColor?: ColorPalette
  bgColor?: ColorPalette
  placeholder?: string
  type?: InputType
  displayShadow?: boolean
  isRequired?: boolean
  spacing?: SpacingLevel
}>({
  identifier: 'mcl-input',
  displayLabel: true,
  labelText: 'MCL Input',
  labelSize: 'md',
  labelColor: 'dark-3',
  labelBold: true,
  displayBorder: false,
  borderColor: 'light-4',
  displayHighlight: true,
  highlightColor: 'primary',
  bgColor: 'light-1',
  placeholder: '',
  type: 'text',
  displayShadow: true,
  isRequired: false,
  spacing: 'md',
})

const stateBeta = reactive<{
  identifier: string
  displayLabel?: boolean
  labelText?: string
  labelSize?: BodyText
  labelColor?: ColorPalette
  labelBold?: boolean
  displayBorder?: boolean
  borderColor?: ColorPalette
  displayHighlight?: boolean
  highlightColor?: ColorPalette
  bgColor?: ColorPalette
  placeholder?: string
  displayShadow?: boolean
  isRequired?: boolean
  rows?: number
  spacing?: SpacingLevel
}>({
  identifier: 'mcl-text-area',
  displayLabel: true,
  labelText: 'MCL Textarea',
  labelSize: 'md',
  labelColor: 'dark-3',
  labelBold: true,
  displayBorder: false,
  borderColor: 'light-4',
  displayHighlight: true,
  highlightColor: 'primary',
  bgColor: 'light-1',
  placeholder: '',
  displayShadow: true,
  isRequired: false,
  rows: 5,
  spacing: 'md',
})
</script>

<template>
  <Story title="Input" group="base-comp">
    <Variant title="mcl-input">
      <form
        class="max-w-lg p-md m-xs md:mx-auto border border-light-3 rounded"
        @submit.prevent="handleSubmit"
      >
        <mcl-input
          :identifier="stateAlpha.identifier"
          :display-label="stateAlpha.displayLabel"
          :label-text="stateAlpha.labelText"
          :label-size="stateAlpha.labelSize"
          :label-color="stateAlpha.labelColor"
          :label-bold="stateAlpha.labelBold"
          :display-border="stateAlpha.displayBorder"
          :border-color="stateAlpha.borderColor"
          :display-highlight="stateAlpha.displayHighlight"
          :highlight-color="stateAlpha.highlightColor"
          :bg-color="stateAlpha.bgColor"
          :placeholder="stateAlpha.placeholder"
          :type="stateAlpha.type"
          :display-shadow="stateAlpha.displayShadow"
          :is-required="stateAlpha.isRequired"
          :spacing="stateAlpha.spacing"
          v-model="inputRef"
        ></mcl-input>
        <div class="flex justify-end items-center">
          <btn-alpha type="submit" class="mr-2xs">Submit</btn-alpha>
          <btn-alpha type="button" color="secondary" @btn-click="handleCancel"
            >Cancel</btn-alpha
          >
        </div>
      </form>
      <div class="flex flex-col items-center justify-center">
        <p class="mb-xs">Submitted text is:</p>
        <div class="max-w-xs md:max-w-md">
          <div v-html="textOutput" class="whitespace-pre-line"></div>
        </div>
      </div>
      <template #controls>
        <HstText title="identifier" v-model="stateAlpha.identifier" />
        <HstCheckbox title="display-label" v-model="stateAlpha.displayLabel" />
        <HstText title="label-text" v-model="stateAlpha.labelText" />
        <HstSelect
          title="label-size"
          v-model="stateAlpha.labelSize"
          :options="bodyTextSize"
        />
        <HstSelect
          title="label-color"
          v-model="stateAlpha.labelColor"
          :options="colors"
        />
        <HstCheckbox title="label-bold" v-model="stateAlpha.labelBold" />
        <HstCheckbox
          title="display-border"
          v-model="stateAlpha.displayBorder"
        />
        <HstSelect
          title="border-color"
          v-model="stateAlpha.borderColor"
          :options="colors"
        />
        <HstCheckbox
          title="display-highlight"
          v-model="stateAlpha.displayHighlight"
        />
        <HstSelect
          title="highlight-color"
          v-model="stateAlpha.highlightColor"
          :options="colors"
        />
        <HstSelect
          title="bg-color"
          v-model="stateAlpha.bgColor"
          :options="colors"
        />
        <HstText title="placeholder" v-model="stateAlpha.placeholder" />
        <HstSelect
          title="type"
          v-model="stateAlpha.type"
          :options="inputOptions"
        />
        <HstCheckbox
          title="display-shadow"
          v-model="stateAlpha.displayShadow"
        />
        <HstCheckbox title="is-required" v-model="stateAlpha.isRequired" />
        <HstSelect
          title="spacing"
          v-model="stateAlpha.spacing"
          :options="spacingOptions"
        />
      </template>
    </Variant>
    <Variant title="mcl-text-area">
      <form
        class="max-w-lg p-md m-xs md:mx-auto border border-light-3 rounded"
        @submit.prevent="handleSubmit"
      >
        <mcl-text-area
          :identifier="stateBeta.identifier"
          :display-label="stateBeta.displayLabel"
          :label-text="stateBeta.labelText"
          :label-size="stateBeta.labelSize"
          :label-color="stateBeta.labelColor"
          :label-bold="stateBeta.labelBold"
          :display-border="stateBeta.displayBorder"
          :border-color="stateBeta.borderColor"
          :display-highlight="stateBeta.displayHighlight"
          :highlight-color="stateBeta.highlightColor"
          :bg-color="stateBeta.bgColor"
          :placeholder="stateBeta.placeholder"
          :display-shadow="stateBeta.displayShadow"
          :is-required="stateBeta.isRequired"
          :rows="stateBeta.rows"
          :spacing="stateBeta.spacing"
          v-model="inputRef"
        ></mcl-text-area>
        <div class="flex justify-end items-center">
          <btn-alpha type="submit" class="mr-2xs">Submit</btn-alpha>
          <btn-alpha type="button" color="secondary" @btn-click="handleCancel"
            >Cancel</btn-alpha
          >
        </div>
      </form>
      <div class="flex flex-col justify-center items-center">
        <p class="mb-xs">Submitted text is:</p>
        <div class="max-w-xs md:max-w-md">
          <div v-html="textOutput" class="whitespace-pre-line"></div>
        </div>
      </div>
      <template #controls>
        <HstText title="identifier" v-model="stateBeta.identifier" />
        <HstCheckbox title="display-label" v-model="stateBeta.displayLabel" />
        <HstText title="label-text" v-model="stateBeta.labelText" />
        <HstSelect
          title="label-size"
          v-model="stateBeta.labelSize"
          :options="bodyTextSize"
        />
        <HstSelect
          title="label-color"
          v-model="stateBeta.labelColor"
          :options="colors"
        />
        <HstCheckbox title="label-bold" v-model="stateBeta.labelBold" />
        <HstCheckbox title="display-border" v-model="stateBeta.displayBorder" />
        <HstSelect
          title="border-color"
          v-model="stateBeta.borderColor"
          :options="colors"
        />
        <HstCheckbox
          title="display-highlight"
          v-model="stateBeta.displayHighlight"
        />
        <HstSelect
          title="highlight-color"
          v-model="stateBeta.highlightColor"
          :options="colors"
        />
        <HstSelect
          title="bg-color"
          v-model="stateBeta.bgColor"
          :options="colors"
        />
        <HstText title="placeholder" v-model="stateBeta.placeholder" />
        <HstNumber v-model="stateBeta.rows" :step="1" title="rows" />
        <HstCheckbox title="display-shadow" v-model="stateBeta.displayShadow" />
        <HstCheckbox title="is-required" v-model="stateBeta.isRequired" />
        <HstSelect
          title="spacing"
          v-model="stateBeta.spacing"
          :options="spacingOptions"
        />
      </template>
    </Variant>
  </Story>
</template>
