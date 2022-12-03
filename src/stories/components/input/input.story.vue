<script setup lang="ts">
import { reactive, ref } from 'vue'
import MclInput from '@/components/mcl-input'
import BtnAlpha from '@/components/btn-alpha'
import type {
  ColorPalette,
  InputType,
  BodyText,
} from '@/components/manguito-theme/theme/theme.types'
import { colors, bodyTextSize, inputOptions } from '@/assets/options'

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
          v-model="inputRef"
        ></mcl-input>
        <div class="flex justify-end items-center mt-2xs">
          <btn-alpha type="submit" class="mr-2xs">Submit</btn-alpha>
          <btn-alpha type="button" color="secondary" @btn-click="handleCancel"
            >Cancel</btn-alpha
          >
        </div>
      </form>
      <div class="flex justify-center">
        <p>Submitted text is: {{ textOutput }}</p>
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
        <HstCheckbox title="display-bold" v-model="stateAlpha.labelBold" />
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
      </template>
    </Variant>
  </Story>
</template>
