<script setup lang="ts">
import { reactive } from 'vue'
import AccordionAlpha from '@/components/accordion-alpha'
import AccordionBeta from '@/components/accordion-beta'
import type {
  ColorPalette,
  Location,
  Range,
  HeadingSize,
} from '@/components/manguito-theme/theme/theme.types'
import {
  colors,
  bodyTextSize,
  headingTextSize,
  buttonSize,
  highlightLocationOptions,
} from '@/assets/options'

const stateAlpha = reactive<{
  borderColor?: ColorPalette
  rounded?: boolean
  displayHighlight?: boolean
  highlightColor?: ColorPalette
  highlightWidth?: Range<12>
  title: string
  titleSize?: HeadingSize
  titleColor?: ColorPalette
  openOnMount?: boolean
  iconColor?: ColorPalette
  bgColor?: ColorPalette
  slotBgColor?: ColorPalette
  slotText: string
}>({
  borderColor: 'light-4',
  rounded: false,
  displayHighlight: true,
  highlightColor: 'secondary',
  highlightWidth: 8,
  title: 'Title Here',
  titleSize: 'sm',
  titleColor: 'dark-3',
  openOnMount: false,
  iconColor: 'dark-3',
  bgColor: 'white',
  slotBgColor: 'light-2',
  slotText:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga quo incidunt a blanditiis mollitia ea est? Fugit voluptate expedita magni vitae iste. Nulla aperiam voluptate ullam dolor officiis earum quis aliquam at ducimus porro. Quidem, molestias! Voluptates perferendis distinctio ipsam dicta optio non praesentium, maiores commodi. Natus, ducimus doloremque?',
})

const stateBeta = reactive<{
  title: string
  titleColor?: ColorPalette
  titleSize?: HeadingSize
  borderColor?: ColorPalette
  bgColor?: ColorPalette
  btnColor?: ColorPalette
  iconColor?: ColorPalette
  rounded?: boolean
  displayShadow?: boolean
  openOnMount?: boolean
  slotText: string
}>({
  title: 'This is title',
  titleColor: 'light-1',
  titleSize: 'md',
  borderColor: 'light-3',
  bgColor: 'light-1',
  btnColor: 'primary',
  iconColor: 'light-1',
  rounded: true,
  displayShadow: true,
  openOnMount: false,
  slotText:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga quo incidunt a blanditiis mollitia ea est? Fugit voluptate expedita magni vitae iste. Nulla aperiam voluptate ullam dolor officiis earum quis aliquam at ducimus porro. Quidem, molestias! Voluptates perferendis distinctio ipsam dicta optio non praesentium, maiores commodi. Natus, ducimus doloremque?',
})
</script>

<template>
  <Story title="Accordion" group="base-comp">
    <Variant title="accordion-alpha">
      <accordion-alpha
        :title="stateAlpha.title"
        :title-size="stateAlpha.titleSize"
        :title-color="stateAlpha.titleColor"
        :border-color="stateAlpha.borderColor"
        :rounded="stateAlpha.rounded"
        :display-highlight="stateAlpha.displayHighlight"
        :highlight-color="stateAlpha.highlightColor"
        :highlight-width="stateAlpha.highlightWidth"
        :open-on-mount="stateAlpha.openOnMount"
        :icon-color="stateAlpha.iconColor"
        :bg-color="stateAlpha.bgColor"
        :slot-bg-color="stateAlpha.slotBgColor"
      >
        <div v-html="stateAlpha.slotText"></div>
      </accordion-alpha>
      <template #controls>
        <HstText title="title" v-model="stateAlpha.title" />
        <HstSelect
          title="title-size"
          v-model="stateAlpha.titleSize"
          :options="headingTextSize"
        />
        <HstSelect
          title="title-color"
          v-model="stateAlpha.titleColor"
          :options="colors"
        />
        <HstSelect
          title="border-color"
          v-model="stateAlpha.borderColor"
          :options="colors"
        />
        <HstSelect
          title="bg-color"
          v-model="stateAlpha.bgColor"
          :options="colors"
        />
        <HstSelect
          title="slot-bg-color"
          v-model="stateAlpha.slotBgColor"
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
        <HstSlider
          title="highlight-width"
          :modelValue="stateAlpha.highlightWidth"
          @update:modelValue="stateAlpha.highlightWidth = $event"
          :step="1"
          :min="1"
          :max="12"
        />
        <HstCheckbox title="open-on-mount" v-model="stateAlpha.openOnMount" />
        <HstSelect
          title="icon-color"
          v-model="stateAlpha.iconColor"
          :options="colors"
        />
        <HstTextarea v-model="stateAlpha.slotText" title="Slot Text" />
      </template>
    </Variant>
    <Variant title="accordion-beta">
      <accordion-beta
        :title="stateBeta.title"
        :title-color="stateBeta.titleColor"
        :title-size="stateBeta.titleSize"
        :border-color="stateBeta.borderColor"
        :bg-color="stateBeta.bgColor"
        :btn-color="stateBeta.btnColor"
        :icon-color="stateBeta.iconColor"
        :rounded="stateBeta.rounded"
        :display-shadow="stateBeta.displayShadow"
        :open-on-mount="stateBeta.openOnMount"
      >
        <div v-html="stateBeta.slotText"></div>
      </accordion-beta>
      <template #controls>
        <HstText title="title" v-model="stateBeta.title" />
        <HstSelect
          title="title-size"
          v-model="stateBeta.titleSize"
          :options="headingTextSize"
        />
        <HstSelect
          title="title-color"
          v-model="stateBeta.titleColor"
          :options="colors"
        />
        <HstSelect
          title="border-color"
          v-model="stateBeta.borderColor"
          :options="colors"
        />
        <HstSelect
          title="bg-color"
          v-model="stateBeta.bgColor"
          :options="colors"
        />
        <HstSelect
          title="btn-color"
          v-model="stateBeta.btnColor"
          :options="colors"
        />
        <HstSelect
          title="icon-color"
          v-model="stateBeta.iconColor"
          :options="colors"
        />
        <HstCheckbox title="rounded" v-model="stateBeta.rounded" />
        <HstCheckbox title="display-shadow" v-model="stateBeta.displayShadow" />
        <HstCheckbox title="open-on-mount" v-model="stateBeta.openOnMount" />
        <HstTextarea v-model="stateBeta.slotText" title="Slot Text" />
      </template>
    </Variant>
  </Story>
</template>
