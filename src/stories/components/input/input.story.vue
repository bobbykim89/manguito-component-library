<script setup lang="ts">
import { reactive, ref } from 'vue'
import MclInput from '@/components/mcl-input'
import MclTextArea from '@/components/mcl-text-area'
import MclInputFile from '@/components/mcl-input-file'
import MclSelect from '@/components/mcl-select'
import MclInputSwitch from '@/components/mcl-input-switch'
import MclDropdown from '@/components/mcl-dropdown'
import type { SelectOptionType } from '@/components/mcl-select/MclSelect.vue'
import type { SwitchSizeType } from '@/components/mcl-input-switch/MclInputSwitch.vue'
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
  switchSizeOptions,
} from '@/assets/options'

const inputRef = ref('')
const inputFileRef = ref()
const textOutput = ref('')
const fileSizeRef = ref('')
const switchRef = ref<boolean>(false)
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

const handleFileSubmit = (): void => {
  console.log(inputFileRef.value)
  if (
    inputFileRef.value !== '' &&
    inputFileRef.value !== undefined &&
    inputFileRef.value !== null
  ) {
    textOutput.value = inputFileRef.value.name
    fileSizeRef.value = inputFileRef.value.size
    inputFileRef.value = ''
    return
  }
  textOutput.value =
    '<span class="text-primary text-lg">Please add file first :)</span>'
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
  rounded?: boolean
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
  rounded: false,
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
  rounded?: boolean
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
  rounded: false,
  displayHighlight: true,
  highlightColor: 'primary',
  bgColor: 'light-1',
  placeholder: '',
  displayShadow: true,
  isRequired: false,
  rows: 5,
  spacing: 'md',
})

const stateGamma = reactive<{
  identifier: string
  displayLabel?: boolean
  labelText?: string
  labelSize?: BodyText
  labelColor?: ColorPalette
  labelBold?: boolean
  displayBorder?: boolean
  borderColor?: ColorPalette
  rounded?: boolean
  displayHighlight?: boolean
  highlightColor?: ColorPalette
  bgColor?: ColorPalette
  buttonText: string
  buttonTextColor?: ColorPalette
  buttonColor?: ColorPalette
  displayShadow?: boolean
  placeholder?: string
  isRequired?: boolean
  accept?: string
  spacing?: SpacingLevel
}>({
  identifier: 'mcl-input-file',
  displayLabel: true,
  labelText: 'MCL Input File',
  labelSize: 'md',
  labelColor: 'dark-3',
  labelBold: true,
  displayBorder: false,
  borderColor: 'light-4',
  rounded: false,
  displayHighlight: true,
  highlightColor: 'primary',
  bgColor: 'light-1',
  buttonText: 'Browse',
  buttonTextColor: 'dark-3',
  buttonColor: 'light-4',
  displayShadow: true,
  placeholder: 'Placeholder',
  isRequired: false,
  accept: 'image/jpg,image/jpeg,image/png',
  spacing: 'md',
})

const stateDelta = reactive<{
  identifier: string
  displayLabel?: boolean
  labelText?: string
  labelSize?: BodyText
  labelColor?: ColorPalette
  labelBold?: boolean
  displayBorder?: boolean
  borderColor?: ColorPalette
  rounded?: boolean
  displayHighlight?: boolean
  highlightColor?: ColorPalette
  bgColor?: ColorPalette
  arrowColor?: ColorPalette
  placeholder?: string
  displayShadow?: boolean
  isRequired?: boolean
  spacing?: SpacingLevel
  options: SelectOptionType[]
  modelValue?: string
}>({
  identifier: 'mcl-select',
  displayLabel: true,
  labelText: 'MCL Select',
  labelSize: 'md',
  labelColor: 'dark-3',
  labelBold: true,
  displayBorder: false,
  borderColor: 'light-4',
  rounded: false,
  displayHighlight: true,
  highlightColor: 'primary',
  bgColor: 'light-1',
  arrowColor: 'dark-4',
  placeholder: 'Placeholder',
  displayShadow: true,
  isRequired: false,
  spacing: 'md',
  options: [
    { text: 'Item 1', value: 'value 1' },
    { text: 'Item 2', value: 'value 2' },
    { text: 'Item 3', value: 'value 3' },
    { text: 'Item 4', value: 'value 4' },
  ],
})
const stateEpsilon = reactive<{
  identifier: string
  horizontal?: boolean
  displayLabel?: boolean
  labelText?: string
  labelSize?: BodyText
  labelColor?: ColorPalette
  labelBold?: boolean
  sliderColor?: ColorPalette
  onColor?: ColorPalette
  offColor?: ColorPalette
  switchSize?: SwitchSizeType
  rounded?: boolean
  spacing?: SpacingLevel
  modelValue?: boolean
}>({
  identifier: 'mcl-input-switch',
  horizontal: true,
  displayLabel: true,
  labelText: 'MCL Input Switch',
  labelSize: 'md',
  labelColor: 'dark-3',
  labelBold: true,
  sliderColor: 'light-1',
  onColor: 'success',
  offColor: 'dark-1',
  switchSize: 'md',
  rounded: true,
  spacing: 'sm',
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
          :rounded="stateAlpha.rounded"
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
        <HstCheckbox title="rounded" v-model="stateAlpha.rounded" />
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
          :rounded="stateBeta.rounded"
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
        <HstCheckbox title="rounded" v-model="stateBeta.rounded" />
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
    <Variant title="mcl-input-file">
      <form
        class="max-w-lg p-md m-xs md:mx-auto border border-light-3 rounded"
        @submit.prevent="handleFileSubmit"
      >
        <mcl-input-file
          :identifier="stateGamma.identifier"
          :display-label="stateGamma.displayLabel"
          :label-text="stateGamma.labelText"
          :label-size="stateGamma.labelSize"
          :label-color="stateGamma.labelColor"
          :label-bold="stateGamma.labelBold"
          :display-border="stateGamma.displayBorder"
          :border-color="stateGamma.borderColor"
          :rounded="stateGamma.rounded"
          :display-highlight="stateGamma.displayHighlight"
          :highlight-color="stateGamma.highlightColor"
          :bg-color="stateGamma.bgColor"
          :button-text="stateGamma.buttonText"
          :button-text-color="stateGamma.buttonTextColor"
          :button-color="stateGamma.buttonColor"
          :display-shadow="stateGamma.displayShadow"
          :placeholder="stateGamma.placeholder"
          :is-required="stateGamma.isRequired"
          :accept="stateGamma.accept"
          :spacing="stateGamma.spacing"
          v-model="inputFileRef"
        ></mcl-input-file>
        <div class="flex justify-end items-center">
          <btn-alpha type="submit" class="mr-2xs">Submit</btn-alpha>
        </div>
      </form>
      <div class="flex flex-col justify-center items-center">
        <p class="mb-xs">Submitted File name is:</p>
        <div class="max-w-xs md:max-w-md mb-sm">
          <div v-html="textOutput" class="whitespace-pre-line"></div>
        </div>
        <p class="mb-xs">Submitted File size is:</p>
        <div class="max-w-xs md:max-w-md">
          <div v-html="fileSizeRef" class="whitespace-pre-line"></div>
        </div>
      </div>
      <template #controls>
        <HstText title="identifier" v-model="stateGamma.identifier" />
        <HstCheckbox title="display-label" v-model="stateGamma.displayLabel" />
        <HstText title="label-text" v-model="stateGamma.labelText" />
        <HstSelect
          title="label-size"
          v-model="stateGamma.labelSize"
          :options="bodyTextSize"
        />
        <HstSelect
          title="label-color"
          v-model="stateGamma.labelColor"
          :options="colors"
        />
        <HstCheckbox title="label-bold" v-model="stateGamma.labelBold" />
        <HstCheckbox
          title="display-border"
          v-model="stateGamma.displayBorder"
        />
        <HstSelect
          title="border-color"
          v-model="stateGamma.borderColor"
          :options="colors"
        />
        <HstCheckbox title="rounded" v-model="stateGamma.rounded" />
        <HstCheckbox
          title="display-highlight"
          v-model="stateGamma.displayHighlight"
        />
        <HstSelect
          title="highlight-color"
          v-model="stateGamma.highlightColor"
          :options="colors"
        />
        <HstSelect
          title="bg-color"
          v-model="stateGamma.bgColor"
          :options="colors"
        />
        <HstText title="button-text" v-model="stateGamma.buttonText" />
        <HstSelect
          title="button-text-color"
          v-model="stateGamma.buttonTextColor"
          :options="colors"
        />
        <HstSelect
          title="button-color"
          v-model="stateGamma.buttonColor"
          :options="colors"
        />
        <HstCheckbox
          title="display-shadow"
          v-model="stateGamma.displayShadow"
        />
        <HstText title="placeholder" v-model="stateGamma.placeholder" />
        <HstCheckbox title="is-required" v-model="stateGamma.isRequired" />
        <HstText title="accept" v-model="stateGamma.accept" />
        <HstSelect
          title="spacing"
          v-model="stateGamma.spacing"
          :options="spacingOptions"
        />
      </template>
    </Variant>
    <Variant title="mcl-select">
      <form
        class="max-w-lg p-md m-xs md:mx-auto border border-light-3 rounded"
        @submit.prevent="handleSubmit"
      >
        <mcl-select
          :identifier="stateDelta.identifier"
          :display-label="stateDelta.displayLabel"
          :label-text="stateDelta.labelText"
          :label-size="stateDelta.labelSize"
          :label-color="stateDelta.labelColor"
          :label-bold="stateDelta.labelBold"
          :display-border="stateDelta.displayBorder"
          :border-color="stateDelta.borderColor"
          :rounded="stateDelta.rounded"
          :display-highlight="stateDelta.displayHighlight"
          :highlight-color="stateDelta.highlightColor"
          :bg-color="stateDelta.bgColor"
          :arrow-color="stateDelta.arrowColor"
          :placeholder="stateDelta.placeholder"
          :display-shadow="stateDelta.displayShadow"
          :is-required="stateDelta.isRequired"
          :spacing="stateDelta.spacing"
          :options="stateDelta.options"
          v-model="inputRef"
        ></mcl-select>
        <div class="flex justify-end items-center">
          <button class="btn btn-warning mr-2xs" type="submit">Submit</button>
          <button class="btn btn-secondary" type="button" @click="handleCancel">
            Cancel
          </button>
        </div>
      </form>
      <div class="flex flex-col justify-center items-center">
        <p class="mb-xs">Selected value is:</p>
        <div class="max-w-xs md:max-w-md">
          <div v-html="textOutput" class="whitespace-pre-line"></div>
        </div>
      </div>
      <template #controls>
        <HstText title="identifier" v-model="stateDelta.identifier" />
        <HstCheckbox title="display-label" v-model="stateDelta.displayLabel" />
        <HstText title="label-text" v-model="stateDelta.labelText" />
        <HstSelect
          title="label-size"
          v-model="stateDelta.labelSize"
          :options="bodyTextSize"
        />
        <HstSelect
          title="label-color"
          v-model="stateDelta.labelColor"
          :options="colors"
        />
        <HstCheckbox title="label-bold" v-model="stateDelta.labelBold" />
        <HstCheckbox
          title="display-border"
          v-model="stateDelta.displayBorder"
        />
        <HstSelect
          title="border-color"
          v-model="stateDelta.borderColor"
          :options="colors"
        />
        <HstCheckbox title="rounded" v-model="stateDelta.rounded" />
        <HstCheckbox
          title="display-highlight"
          v-model="stateDelta.displayHighlight"
        />
        <HstSelect
          title="highlight-color"
          v-model="stateDelta.highlightColor"
          :options="colors"
        />
        <HstSelect
          title="bg-color"
          v-model="stateDelta.bgColor"
          :options="colors"
        />
        <HstSelect
          title="arrow-color"
          v-model="stateDelta.arrowColor"
          :options="colors"
        />
        <HstText title="placeholder" v-model="stateDelta.placeholder" />
        <HstCheckbox
          title="display-shadow"
          v-model="stateDelta.displayShadow"
        />
        <HstCheckbox title="is-required" v-model="stateDelta.isRequired" />
        <HstSelect
          title="spacing"
          v-model="stateDelta.spacing"
          :options="spacingOptions"
        />
      </template>
    </Variant>
    <Variant title="mcl-input-switch">
      <div
        class="max-w-[450px] bg-white rounded-lg border-2 border-dark-3 p-md"
      >
        <form>
          <mcl-input-switch
            :identifier="stateEpsilon.identifier"
            :horizontal="stateEpsilon.horizontal"
            :display-label="stateEpsilon.displayLabel"
            :label-text="stateEpsilon.labelText"
            :label-color="stateEpsilon.labelColor"
            :label-bold="stateEpsilon.labelBold"
            :slider-color="stateEpsilon.sliderColor"
            :on-color="stateEpsilon.onColor"
            :off-color="stateEpsilon.offColor"
            :switch-size="stateEpsilon.switchSize"
            :rounded="stateEpsilon.rounded"
            :spacing="stateEpsilon.spacing"
            v-model="switchRef"
          ></mcl-input-switch>
        </form>
        <p class="mb-0">Switch Value: {{ switchRef }}</p>
      </div>
      <template #controls>
        <HstText title="identifier" v-model="stateEpsilon.identifier" />
        <HstCheckbox title="horizontal" v-model="stateEpsilon.horizontal" />
        <HstCheckbox
          title="display-label"
          v-model="stateEpsilon.displayLabel"
        />
        <HstText title="label-text" v-model="stateEpsilon.labelText" />
        <HstSelect
          title="label-size"
          v-model="stateEpsilon.labelSize"
          :options="bodyTextSize"
        />
        <HstSelect
          title="label-color"
          v-model="stateEpsilon.labelColor"
          :options="colors"
        />
        <HstCheckbox title="label-bold" v-model="stateEpsilon.labelBold" />
        <HstSelect
          title="slider-color"
          v-model="stateEpsilon.sliderColor"
          :options="colors"
        />
        <HstSelect
          title="on-color"
          v-model="stateEpsilon.onColor"
          :options="colors"
        />
        <HstSelect
          title="off-color"
          v-model="stateEpsilon.offColor"
          :options="colors"
        />
        <HstSelect
          title="switch-size"
          v-model="stateEpsilon.switchSize"
          :options="switchSizeOptions"
        />
        <HstCheckbox title="rounded" v-model="stateEpsilon.rounded" />
        <HstSelect
          title="spacing"
          v-model="stateEpsilon.spacing"
          :options="spacingOptions"
        />
      </template>
    </Variant>
    <Variant title="mcl-dropdown">
      <div class="border-2 rounded-lg p-lg border-dark-3 max-w-[350px]">
        <mcl-dropdown></mcl-dropdown>
        <div class="mt-md">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat odio
          voluptate fuga quibusdam nostrum veritatis similique aperiam nobis
          debitis, excepturi id culpa quasi quos totam obcaecati deserunt ea
          quis sit quisquam alias nihil omnis! Aut culpa architecto repellat
          minima adipisci porro consequatur, officiis facere ea quos officia
          fugiat atque quia?
        </div>
      </div>
    </Variant>
  </Story>
</template>
