<script lang="ts" setup>
import { reactive } from 'vue'
import HeroBeta from '@/components/hero-beta'
import type {
  ColorPalette,
  HeadingSize,
  HeadingLevel,
  OpacityRange,
} from '@/components/manguito-theme/theme/theme.types'
import { colors, headingTextLevel, headingTextSize } from '@/assets/options'

const stateBeta = reactive<{
  title: string
  titleLevel?: HeadingLevel
  titleSize?: HeadingSize
  titleColor?: ColorPalette
  showTitleHighlight?: boolean
  titleHighlightColor?: ColorPalette
  fullWidth?: boolean
  bgImage: string
  displayGradients?: boolean
  gradientOpacity?: OpacityRange
  slotText?: string
}>({
  title: 'Hero Beta',
  titleLevel: 'h1',
  titleSize: 'md',
  titleColor: 'white',
  showTitleHighlight: false,
  titleHighlightColor: 'dark-3',
  fullWidth: true,
  bgImage:
    'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1650675432/ManguitoPage/zvgtgavhpuwsfesyhv0j.jpg',
  displayGradients: true,
  gradientOpacity: 50,
  slotText:
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat inventore repellendus corrupti labore doloribus, a nisi, animi tempora cupiditate doloremque enim sunt expedita possimus fuga, voluptates sed beatae sint alias.',
})
</script>

<template>
  <Story title="Hero">
    <Variant title="hero-beta">
      <hero-beta
        :title="stateBeta.title"
        :title-level="stateBeta.titleLevel"
        :title-size="stateBeta.titleSize"
        :title-color="stateBeta.titleColor"
        :show-title-highlight="stateBeta.showTitleHighlight"
        :title-highlight-color="stateBeta.titleHighlightColor"
        :full-width="stateBeta.fullWidth"
        :bg-image="stateBeta.bgImage"
        :display-gradients="stateBeta.displayGradients"
        :gradient-opacity="stateBeta.gradientOpacity"
      >
        <div v-html="stateBeta.slotText"></div>
      </hero-beta>
      <template #controls>
        <HstText title="title" v-model="stateBeta.title" />
        <HstSelect
          title="title-level"
          v-model="stateBeta.titleLevel"
          :options="headingTextLevel"
        />
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
        <HstCheckbox
          title="show-title-highlight"
          v-model="stateBeta.showTitleHighlight"
        />
        <HstSelect
          title="title-highlight-color"
          v-model="stateBeta.titleHighlightColor"
          :options="colors"
        />
        <HstCheckbox title="full-width" v-model="stateBeta.fullWidth" />
        <HstText title="bg-image" v-model="stateBeta.bgImage" />
        <HstCheckbox
          title="display-gradients"
          v-model="stateBeta.displayGradients"
        />
        <HstSlider
          title="gradient-opacity"
          :modelValue="stateBeta.gradientOpacity"
          @update:modelValue="stateBeta.gradientOpacity = $event"
          :step="10"
          :min="10"
          :max="100"
        />
        <HstTextarea title="slot-text" v-model="stateBeta.slotText" />
      </template>
    </Variant>
  </Story>
</template>

<style lang="scss" scoped></style>
