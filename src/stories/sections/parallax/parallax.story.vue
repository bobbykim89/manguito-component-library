<script lang="ts" setup>
import { reactive, ref } from 'vue'
import ParallaxAlpha from '@/components/parallax-alpha'
import type {
  ColorPalette,
  HeadingSize,
  HeadingLevel,
} from '@/components/manguito-theme/theme/theme.types'
import { colors, headingTextLevel, headingTextSize } from '@/assets/options'

const stateAlpha = reactive<{
  sectionBgColor?: ColorPalette
  containerBgColor?: ColorPalette
  bgImage: string
  imgHeightSm?: number
  imgHeightLg?: number
  title: string
  titleLevel?: HeadingLevel
  titleSize?: HeadingSize
  titleColor?: ColorPalette
}>({
  sectionBgColor: 'transparent',
  containerBgColor: 'light-2',
  bgImage:
    'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1653539465/ManguitoPage/u94iug4r8non1fwprlmh.jpg',
  imgHeightSm: 256,
  imgHeightLg: 384,
  title: 'Parallax Alpha',
  titleLevel: 'h2',
  titleSize: 'md',
  titleColor: 'dark-3',
})
</script>

<template>
  <Story title="Parallax" group="section-comp">
    <Variant title="parallax-alpha">
      <parallax-alpha
        :title="stateAlpha.title"
        :title-level="stateAlpha.titleLevel"
        :title-size="stateAlpha.titleSize"
        :title-color="stateAlpha.titleColor"
        :section-bg-color="stateAlpha.sectionBgColor"
        :container-bg-color="stateAlpha.containerBgColor"
        :bg-image="stateAlpha.bgImage"
        :img-height-sm="stateAlpha.imgHeightSm"
        :img-height-lg="stateAlpha.imgHeightLg"
      ></parallax-alpha>
      <template #controls>
        <HstText title="title" v-model="stateAlpha.title" />
        <HstSelect
          title="title-level"
          v-model="stateAlpha.titleLevel"
          :options="headingTextLevel"
        />
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
          title="section-bg-color"
          v-model="stateAlpha.sectionBgColor"
          :options="colors"
        />
        <HstSelect
          title="container-bg-color"
          v-model="stateAlpha.containerBgColor"
          :options="colors"
        />
        <HstText title="bg-image" v-model="stateAlpha.bgImage" />
        <HstNumber
          title="img-height-sm"
          :step="1"
          v-model="stateAlpha.imgHeightSm"
        />
        <HstNumber
          title="img-height-lg"
          :step="1"
          v-model="stateAlpha.imgHeightLg"
        />
      </template>
    </Variant>
  </Story>
</template>
