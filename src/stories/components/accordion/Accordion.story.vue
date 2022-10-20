<script setup lang="ts">
import { reactive } from 'vue'
import Accordion from '@/components/accordion'
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

const state = reactive<{
  borderColor?: ColorPalette
  rounded?: boolean
  displayHighlight?: boolean
  highlightLocation?: Location
  highlightColor?: ColorPalette
  highlightWidth?: Range<12>
  displayNumber?: boolean
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
  highlightLocation: 'left',
  highlightColor: 'secondary',
  highlightWidth: 8,
  displayNumber: true,
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
</script>

<template>
  <Story title="Accordion">
    <accordion
      :title="state.title"
      :title-size="state.titleSize"
      :title-color="state.titleColor"
      :border-color="state.borderColor"
      :rounded="state.rounded"
      :display-highlight="state.displayHighlight"
      :highlight-location="state.highlightLocation"
      :highlight-color="state.highlightColor"
      :highlight-width="state.highlightWidth"
      :display-number="state.displayNumber"
      :open-on-mount="state.openOnMount"
      :icon-color="state.iconColor"
      :bg-color="state.bgColor"
      :slot-bg-color="state.slotBgColor"
    >
      <div v-html="state.slotText"></div>
    </accordion>
    <template #controls>
      <HstText title="title" v-model="state.title" />
      <HstSelect
        title="title-size"
        v-model="state.titleSize"
        :options="headingTextSize"
      />
      <HstSelect
        title="title-color"
        v-model="state.titleColor"
        :options="colors"
      />
      <HstSelect
        title="border-color"
        v-model="state.borderColor"
        :options="colors"
      />
      <HstCheckbox title="rounded" v-model="state.rounded" />
      <HstCheckbox title="display-highlight" v-model="state.displayHighlight" />
      <HstSelect
        title="highlight-location"
        v-model="state.highlightLocation"
        :options="highlightLocationOptions"
      />
      <HstSelect
        title="highlight-color"
        v-model="state.highlightColor"
        :options="colors"
      />
      <HstSlider
        title="highlight-width"
        :modelValue="state.highlightWidth"
        @update:modelValue="state.highlightWidth = $event"
        :step="1"
        :min="1"
        :max="12"
      />
      <HstCheckbox title="display-number" v-model="state.displayNumber" />
      <HstCheckbox title="open-on-mount" v-model="state.openOnMount" />
      <HstSelect
        title="icon-color"
        v-model="state.iconColor"
        :options="colors"
      />
      <HstSelect title="bg-color" v-model="state.bgColor" :options="colors" />
      <HstSelect
        title="slot-bg-color"
        v-model="state.slotBgColor"
        :options="colors"
      />
      <HstTextarea v-model="state.slotText" title="Slot Text" />
    </template>
  </Story>
</template>
