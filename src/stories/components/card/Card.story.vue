<script setup lang="ts">
import { reactive } from 'vue'
import CardAlpha from '@/components/card-alpha'
import type {
  ColorPalette,
  HeadingSize,
  CtaTarget,
} from '@/components/manguito-theme/theme/theme.types'
import {
  colors,
  bodyTextSize,
  buttonSize,
  targetOption,
  headingTextSize,
} from '@/assets/options'

const stateAlpha = reactive<{
  title: string
  titleSize?: HeadingSize
  titleColor?: ColorPalette
  borderColor?: ColorPalette
  bgColor?: ColorPalette
  displayImage?: boolean
  imageSource?: string
  imageAlt?: string
  displayCta?: boolean
  ctaText?: string
  ctaColor?: ColorPalette
  ctaLink?: string
  ctaTarget?: CtaTarget
  displayLabel?: boolean
  labelText?: string
  labelTextColor?: ColorPalette
  labelColor?: ColorPalette
  enlargeOnHover?: boolean
  displayHighlight?: boolean
  highlightColor?: ColorPalette
  rounded?: boolean
  displayShadow?: boolean
  slotText?: string
}>({
  title: 'Title text',
  titleSize: 'md',
  titleColor: 'dark-3',
  borderColor: 'light-3',
  bgColor: 'light-1',
  displayImage: true,
  imageSource:
    'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1666385529/ManguitoPage/jvbzjwf6vprjcm1mqjpd.jpg',
  imageAlt: 'Manguito is perching',
  displayCta: true,
  ctaColor: 'primary',
  ctaLink: 'https://manguitopage.herokuapp.com/',
  ctaTarget: '_blank',
  ctaText: 'cta text',
  displayLabel: true,
  labelText: 'Lorem ipsum',
  labelTextColor: 'light-1',
  labelColor: 'dark-4',
  displayHighlight: true,
  highlightColor: 'primary',
  enlargeOnHover: false,
  rounded: true,
  displayShadow: true,
  slotText:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est tenetur impedit hic iure, consectetur cupiditate nesciunt ullam voluptatum veniam ipsam?',
})
</script>

<template>
  <Story title="Card" group="base-comp">
    <Variant title="card-alpha">
      <div class="p-md">
        <card-alpha
          :title="stateAlpha.title"
          :title-size="stateAlpha.titleSize"
          :title-color="stateAlpha.titleColor"
          :border-color="stateAlpha.borderColor"
          :bg-color="stateAlpha.bgColor"
          :display-image="stateAlpha.displayImage"
          :image-source="stateAlpha.imageSource"
          :image-alt="stateAlpha.imageAlt"
          :display-cta="stateAlpha.displayCta"
          :cta-color="stateAlpha.ctaColor"
          :cta-link="stateAlpha.ctaLink"
          :cta-target="stateAlpha.ctaTarget"
          :cta-text="stateAlpha.ctaText"
          :display-label="stateAlpha.displayLabel"
          :label-text="stateAlpha.labelText"
          :label-color="stateAlpha.labelColor"
          :display-highlight="stateAlpha.displayHighlight"
          :highlight-color="stateAlpha.highlightColor"
          :enlarge-on-hover="stateAlpha.enlargeOnHover"
          :rounded="stateAlpha.rounded"
          :display-shadow="stateAlpha.displayShadow"
        >
          <div v-html="stateAlpha.slotText"></div>
        </card-alpha>
      </div>
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
        <HstCheckbox
          title="display-highlight"
          v-model="stateAlpha.displayHighlight"
        />
        <HstSelect
          title="highlight-color"
          v-model="stateAlpha.highlightColor"
          :options="colors"
        />
        <HstCheckbox title="display-label" v-model="stateAlpha.displayLabel" />
        <HstText title="label-text" v-model="stateAlpha.labelText" />
        <HstSelect
          title="label-color"
          v-model="stateAlpha.labelColor"
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
        <HstCheckbox
          title="enlarge-on-hover"
          v-model="stateAlpha.enlargeOnHover"
        />
        <HstCheckbox title="rounded" v-model="stateAlpha.rounded" />
        <HstCheckbox
          title="display-shadow"
          v-model="stateAlpha.displayShadow"
        />
        <HstCheckbox title="display-image" v-model="stateAlpha.displayImage" />
        <HstText title="image-source" v-model="stateAlpha.imageSource" />
        <HstText title="image-alt" v-model="stateAlpha.imageAlt" />
        <HstCheckbox title="display-cta" v-model="stateAlpha.displayCta" />
        <HstSelect
          title="cta-color"
          v-model="stateAlpha.ctaColor"
          :options="colors"
        />
        <HstText title="cta-text" v-model="stateAlpha.ctaText" />
        <HstText title="cta-link" v-model="stateAlpha.ctaLink" />
        <HstSelect
          title="cta-target"
          v-model="stateAlpha.ctaTarget"
          :options="targetOption"
        />
        <HstTextarea v-model="stateAlpha.slotText" title="Slot Text" />
      </template>
    </Variant>
  </Story>
</template>

<style lang="sass" scoped></style>
