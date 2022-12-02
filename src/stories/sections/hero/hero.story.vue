<script lang="ts" setup>
import { reactive } from 'vue'
import HeroAlpha from '@/components/hero-alpha'
import HeroBeta from '@/components/hero-beta'
import HeroGamma from '@/components/hero-gamma'
import type {
  ColorPalette,
  HeadingSize,
  HeadingLevel,
  OpacityRange,
  Directions,
} from '@/components/manguito-theme/theme/theme.types'
import { colors, headingTextLevel, headingTextSize } from '@/assets/options'

const direction: string[] = ['left', 'right']

const stateAlpha = reactive<{
  title: string
  titleLevel?: HeadingLevel
  titleSize?: HeadingSize
  titleColor?: ColorPalette
  displaySubTitle: boolean
  subTitle?: string
  subTitleLevel?: HeadingLevel
  subTitleSize?: HeadingSize
  subTitleColor?: ColorPalette
  displaySubTitleHighlight?: boolean
  subTitleHighlightColor?: ColorPalette
  bgImage: string
  bgColor?: ColorPalette
  imgPosition?: Directions
  displayFilter?: boolean
  filterOpacity?: OpacityRange
  slotText?: string
}>({
  title: 'Hero Alpha',
  titleLevel: 'h1',
  titleSize: 'md',
  titleColor: 'dark-3',
  displaySubTitle: true,
  subTitle: 'This is subtitle',
  subTitleLevel: 'h3',
  subTitleSize: 'md',
  subTitleColor: 'dark-3',
  displaySubTitleHighlight: false,
  subTitleHighlightColor: 'primary',
  bgImage:
    'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1650675406/ManguitoPage/hl38duquvda0ilultyqb.jpg',
  bgColor: 'white',
  imgPosition: 'right',
  displayFilter: true,
  filterOpacity: 30,
  slotText:
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat odio voluptate fuga quibusdam nostrum veritatis similique aperiam nobis debitis, excepturi id culpa quasi quos totam obcaecati deserunt ea quis sit quisquam alias nihil omnis! Aut culpa architecto repellat minima adipisci porro consequatur, officiis facere ea quos officia fugiat atque quia?',
})

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
  <Story title="Hero" group="section-comp">
    <Variant title="hero-alpha">
      <hero-alpha
        :title="stateAlpha.title"
        :title-level="stateAlpha.titleLevel"
        :title-size="stateAlpha.titleSize"
        :display-sub-title="stateAlpha.displaySubTitle"
        :sub-title="stateAlpha.subTitle"
        :sub-title-level="stateAlpha.subTitleLevel"
        :sub-title-size="stateAlpha.subTitleSize"
        :display-sub-title-highlight="stateAlpha.displaySubTitleHighlight"
        :sub-title-highlight-color="stateAlpha.subTitleHighlightColor"
        :title-color="stateAlpha.titleColor"
        :sub-title-color="stateAlpha.subTitleColor"
        :bg-image="stateAlpha.bgImage"
        :bg-color="stateAlpha.bgColor"
        :img-position="stateAlpha.imgPosition"
        :display-filter="stateAlpha.displayFilter"
        :filter-opacity="stateAlpha.filterOpacity"
      >
        <div v-html="stateAlpha.slotText"></div>
      </hero-alpha>
      <template #controls>
        <HstText title="bg-image" v-model="stateAlpha.bgImage" />
        <HstSelect
          title="bg-color"
          v-model="stateAlpha.bgColor"
          :options="colors"
        />
        <HstSelect
          title="img-position"
          v-model="stateAlpha.imgPosition"
          :options="direction"
        />
        <HstCheckbox
          title="display-filter"
          v-model="stateAlpha.displayFilter"
        />
        <HstSlider
          title="filter-opacity"
          :modelValue="stateAlpha.filterOpacity"
          @update:modelValue="stateAlpha.filterOpacity = $event"
          :step="10"
          :min="10"
          :max="100"
        />
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
        <HstCheckbox
          title="display-sub-title"
          v-model="stateAlpha.displaySubTitle"
        />
        <HstSelect
          title="sub-title-level"
          v-model="stateAlpha.subTitleLevel"
          :options="headingTextLevel"
        />
        <HstSelect
          title="sub-title-size"
          v-model="stateAlpha.subTitleSize"
          :options="headingTextSize"
        />
        <HstSelect
          title="sub-title-color"
          v-model="stateAlpha.subTitleColor"
          :options="colors"
        />
        <HstCheckbox
          title="display-sub-title-highlight"
          v-model="stateAlpha.displaySubTitleHighlight"
        />
        <HstSelect
          title="sub-title-highlight-color"
          v-model="stateAlpha.subTitleHighlightColor"
          :options="colors"
        />
      </template>
    </Variant>
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
    <Variant title="hero-gamma">
      <hero-gamma
        title="Hero Gamma"
        image-source="https://images.unsplash.com/photo-1575408264798-b50b252663e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1053&q=80"
        label-text="lorem ipsum"
      ></hero-gamma>
    </Variant>
  </Story>
</template>

<style lang="scss" scoped></style>
