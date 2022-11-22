<script setup lang="ts">
import { reactive } from 'vue'
import CardAlpha from '@/components/card-alpha'
import type {
  ColorPalette,
  HeadingSize,
  CtaTarget,
} from '@/components/manguito-theme/theme/theme.types'

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
    </Variant>
  </Story>
</template>

<style lang="sass" scoped></style>
