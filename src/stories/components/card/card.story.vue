<script setup lang="ts">
import { reactive } from 'vue'
import CardAlpha from '@/components/card-alpha'
import CardBeta from '@/components/card-beta'
import CardGamma from '@/components/card-gamma'
import CardDelta from '@/components/card-delta'
import type { CustomColorType } from '@/components/card-delta/CardDelta.vue'
import type {
  ColorPalette,
  HeadingSize,
  CtaTarget,
  CrossOrigin,
  OpacityRange,
  Range,
} from '@/components/manguito-theme/theme/theme.types'
import {
  colors,
  bodyTextSize,
  buttonSize,
  targetOption,
  headingTextSize,
  corsOptions,
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
  imageCors?: CrossOrigin
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
  ctaAsLink?: boolean
  slotText?: string
}>({
  title: 'Card Alpha',
  titleSize: 'md',
  titleColor: 'dark-3',
  borderColor: 'light-3',
  bgColor: 'light-1',
  displayImage: true,
  imageSource:
    'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1666385529/ManguitoPage/jvbzjwf6vprjcm1mqjpd.jpg',
  imageAlt: 'Manguito is perching',
  imageCors: 'anonymous',
  displayCta: true,
  ctaColor: 'primary',
  ctaLink: 'https://manguitopage.herokuapp.com/',
  ctaTarget: '_self',
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
  ctaAsLink: true,
  slotText:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est tenetur impedit hic iure, consectetur cupiditate nesciunt ullam voluptatum veniam ipsam?',
})

const stateBeta = reactive<{
  title: string
  titleSize?: HeadingSize
  titleColor?: ColorPalette
  titleBlockColor?: ColorPalette
  borderColor?: ColorPalette
  imageSource?: string
  imageAlt?: string
  imageCors?: CrossOrigin
  displayGrayScale?: boolean
  ctaAsLink?: boolean
  ctaLink?: string
  ctaTarget?: CtaTarget
  rounded?: boolean
  slotText?: string
}>({
  title: 'Card Beta',
  titleSize: 'md',
  titleColor: 'light-1',
  titleBlockColor: 'dark-4',
  borderColor: 'light-3',
  displayGrayScale: true,
  imageSource:
    'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1666385529/ManguitoPage/jvbzjwf6vprjcm1mqjpd.jpg',
  imageAlt: 'Manguito is perching',
  imageCors: 'anonymous',
  ctaAsLink: false,
  ctaLink: 'https://manguitopage.herokuapp.com/',
  ctaTarget: '_self',
  rounded: false,
  slotText:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est tenetur impedit hic iure, consectetur cupiditate nesciunt ullam voluptatum veniam ipsam?',
})

const stateGamma = reactive<{
  imageSource: string
  imageAlt?: string
  title?: string
  titleSize?: HeadingSize
  titleColor?: ColorPalette
  displayHighlight?: boolean
  highlightColor?: ColorPalette
  highlightOpacity?: OpacityRange
  displayTitle?: boolean
  cardColor?: ColorPalette
  crossOrigin?: CrossOrigin
  slotText?: string
}>({
  imageSource:
    'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1666385529/ManguitoPage/jvbzjwf6vprjcm1mqjpd.jpg',
  imageAlt: 'a bird',
  title: 'Card Gamma',
  titleSize: 'md',
  titleColor: 'dark-3',
  displayHighlight: false,
  highlightColor: 'light-3',
  highlightOpacity: 80,
  displayTitle: false,
  cardColor: 'primary',
  crossOrigin: 'anonymous',
  slotText:
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae, natus.',
})

const stateDelta = reactive<{
  displayImage?: boolean
  imageSource?: string
  imageAlt?: string
  crossOrigin?: CrossOrigin
  title: string
  titleSize?: HeadingSize
  titleColor?: ColorPalette
  backgroundColor?: ColorPalette
  displayHighlight?: boolean
  highlightColor?: ColorPalette
  ctaText: string
  ctaLink: string
  ctaLinkTarget?: CtaTarget
  ctaAsLink?: boolean
  ctaButton?: boolean
  ctaButtonColor?: ColorPalette
  ctaButtonBlock?: boolean
  borderWidth?: Range<1, 10>
  borderColor?: ColorPalette
  gradient1?: ColorPalette
  gradient2?: ColorPalette
  customColor?: CustomColorType
  slotText?: string
}>({
  displayImage: true,
  imageSource:
    'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1666385529/ManguitoPage/jvbzjwf6vprjcm1mqjpd.jpg',
  imageAlt: 'picture of a bird',
  crossOrigin: 'anonymous',
  title: 'Card Delta',
  titleSize: 'md',
  titleColor: 'dark-4',
  backgroundColor: 'light-1',
  displayHighlight: true,
  highlightColor: 'primary',
  ctaText: 'Read more',
  ctaLink: '/',
  ctaLinkTarget: '_self',
  ctaButton: false,
  ctaButtonColor: 'warning',
  ctaAsLink: true,
  ctaButtonBlock: false,
  borderWidth: 3,
  borderColor: 'light-3',
  gradient1: 'primary',
  gradient2: 'secondary',
  customColor: {},
  slotText:
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat, numquam.',
})
const handleCardClick = (e: Event) => {
  console.log('card clicked!', e)
}
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
          :image-cors="stateAlpha.imageCors"
          :display-cta="stateAlpha.displayCta"
          :cta-as-link="stateAlpha.ctaAsLink"
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
          @card-btn-click="handleCardClick"
          @card-click="handleCardClick"
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
        <HstSelect
          title="image-cors"
          v-model="stateAlpha.imageCors"
          :options="corsOptions"
        />
        <HstCheckbox title="display-cta" v-model="stateAlpha.displayCta" />
        <HstCheckbox title="cta-as-link" v-model="stateAlpha.ctaAsLink" />
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
    <Variant title="card-beta">
      <div class="p-md">
        <card-beta
          :title="stateBeta.title"
          :title-size="stateBeta.titleSize"
          :title-color="stateBeta.titleColor"
          :title-block-color="stateBeta.titleBlockColor"
          :border-color="stateBeta.borderColor"
          :display-gray-scale="stateBeta.displayGrayScale"
          :image-source="stateBeta.imageSource"
          :image-alt="stateBeta.imageAlt"
          :image-cors="stateBeta.imageCors"
          :cta-as-link="stateBeta.ctaAsLink"
          :cta-link="stateBeta.ctaLink"
          :cta-target="stateBeta.ctaTarget"
          :rounded="stateBeta.rounded"
          @card-click="handleCardClick"
        >
          <div v-html="stateBeta.slotText" class="bg-light-1/50 p-xs"></div>
        </card-beta>
      </div>
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
          title="title-block-color"
          v-model="stateBeta.titleBlockColor"
          :options="colors"
        />
        <HstSelect
          title="border-color"
          v-model="stateBeta.borderColor"
          :options="colors"
        />
        <HstCheckbox title="rounded" v-model="stateBeta.rounded" />
        <HstCheckbox
          title="display-gray-scale"
          v-model="stateBeta.displayGrayScale"
        />
        <HstText title="image-source" v-model="stateBeta.imageSource" />
        <HstText title="image-alt" v-model="stateBeta.imageAlt" />
        <HstSelect
          title="image-cors"
          v-model="stateBeta.imageCors"
          :options="corsOptions"
        />
        <HstCheckbox title="cta-as-link" v-model="stateBeta.ctaAsLink" />
        <HstText title="cta-link" v-model="stateBeta.ctaLink" />
        <HstSelect
          title="cta-target"
          v-model="stateBeta.ctaTarget"
          :options="targetOption"
        />
        <HstTextarea v-model="stateBeta.slotText" title="Slot Text" />
      </template>
    </Variant>
    <Variant title="card-gamma">
      <div class="p-md">
        <card-gamma
          :image-source="stateGamma.imageSource"
          :image-alt="stateGamma.imageAlt"
          :display-title="stateGamma.displayTitle"
          :title="stateGamma.title"
          :title-size="stateGamma.titleSize"
          :title-color="stateGamma.titleColor"
          :display-highlight="stateGamma.displayHighlight"
          :highlight-color="stateGamma.highlightColor"
          :highlight-opacity="stateGamma.highlightOpacity"
          :card-color="stateGamma.cardColor"
          :cross-origin="stateGamma.crossOrigin"
          @card-click="handleCardClick"
        >
          <template #card-body>
            <div v-html="stateGamma.slotText"></div>
          </template>
        </card-gamma>
      </div>
      <template #controls>
        <HstText title="image-source" v-model="stateGamma.imageSource" />
        <HstText title="image-alt" v-model="stateGamma.imageAlt" />
        <HstCheckbox title="display-title" v-model="stateGamma.displayTitle" />
        <HstText title="title" v-model="stateGamma.title" />
        <HstSelect
          title="title-size"
          v-model="stateGamma.titleSize"
          :options="headingTextSize"
        />
        <HstSelect
          title="title-color"
          v-model="stateGamma.titleColor"
          :options="colors"
        />
        <HstCheckbox
          title="display-highlight"
          v-model="stateGamma.displayHighlight"
        />
        <HstSelect
          title="highlight-color"
          v-model="stateGamma.highlightColor"
          :options="colors"
        />
        <HstSlider
          title="highlight-opacity"
          v-model="stateGamma.highlightOpacity"
          :step="10"
          :min="10"
          :max="100"
        />
        <HstSelect
          title="card-color"
          v-model="stateGamma.cardColor"
          :options="colors"
        />
        <HstSelect
          title="cross-origin"
          v-model="stateGamma.crossOrigin"
          :options="corsOptions"
        />
        <HstTextarea v-model="stateGamma.slotText" title="Slot Text" />
      </template>
    </Variant>
    <Variant title="card-delta">
      <div class="p-md">
        <card-delta
          :display-image="stateDelta.displayImage"
          :image-source="stateDelta.imageSource"
          :image-alt="stateDelta.imageAlt"
          :cross-origin="stateDelta.crossOrigin"
          :title="stateDelta.title"
          :title-size="stateDelta.titleSize"
          :title-color="stateDelta.titleColor"
          :background-color="stateDelta.backgroundColor"
          :display-highlight="stateDelta.displayHighlight"
          :highlight-color="stateDelta.highlightColor"
          :cta-text="stateDelta.ctaText"
          :cta-link="stateDelta.ctaLink"
          :cta-link-target="stateDelta.ctaLinkTarget"
          :cta-as-link="stateDelta.ctaAsLink"
          :cta-button="stateDelta.ctaButton"
          :cta-button-color="stateDelta.ctaButtonColor"
          :cta-button-block="stateDelta.ctaButtonBlock"
          :border-width="stateDelta.borderWidth"
          :border-color="stateDelta.borderColor"
          :gradient1="stateDelta.gradient1"
          :gradient2="stateDelta.gradient2"
          :custom-color="stateDelta.customColor"
          @card-click="handleCardClick"
        >
          <div v-html="stateDelta.slotText"></div>
        </card-delta>
      </div>
      <template #controls>
        <HstCheckbox title="display-image" v-model="stateDelta.displayImage" />
        <HstText title="image-source" v-model="stateDelta.imageSource" />
        <HstText title="image-alt" v-model="stateDelta.imageAlt" />
        <HstSelect
          title="cross-origin"
          v-model="stateDelta.crossOrigin"
          :options="corsOptions"
        />
        <HstText title="title" v-model="stateDelta.title" />
        <HstSelect
          title="title-size"
          v-model="stateDelta.titleSize"
          :options="headingTextSize"
        />
        <HstSelect
          title="title-color"
          v-model="stateDelta.titleColor"
          :options="colors"
        />
        <HstCheckbox
          title="display-highlight"
          v-model="stateDelta.displayHighlight"
        />
        <HstSelect
          title="highlight-color"
          v-model="stateDelta.highlightColor"
          :options="colors"
        />
        <HstText title="cta-text" v-model="stateDelta.ctaText" />
        <HstText title="cta-link" v-model="stateDelta.ctaLink" />
        <HstSelect
          title="cta-link-target"
          v-model="stateDelta.ctaLinkTarget"
          :options="targetOption"
        />
        <HstCheckbox title="cta-as-link" v-model="stateDelta.ctaAsLink" />
        <HstCheckbox title="cta-button" v-model="stateDelta.ctaButton" />
        <HstSelect
          title="cta-button-color"
          v-model="stateDelta.ctaButtonColor"
          :options="colors"
        />
        <HstCheckbox
          title="cta-button-block"
          v-model="stateDelta.ctaButtonBlock"
        />
        <HstSlider
          title="border-width"
          v-model="stateDelta.borderWidth"
          :step="1"
          :min="1"
          :max="10"
        />
        <HstSelect
          title="border-color"
          v-model="stateDelta.borderColor"
          :options="colors"
        />
        <HstSelect
          title="gradient1"
          v-model="stateDelta.gradient1"
          :options="colors"
        />
        <HstSelect
          title="gradient2"
          v-model="stateDelta.gradient2"
          :options="colors"
        />
        <HstJson title="custom-color" v-model="stateDelta.customColor" />
        <HstTextarea v-model="stateDelta.slotText" title="Slot Text" />
      </template>
    </Variant>
  </Story>
</template>

<style lang="sass" scoped></style>
