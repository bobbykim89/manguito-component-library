<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import CarouselAlpha from '@/components/carousel-alpha'
import CardAlpha from '@/components/card-alpha'
import CardBeta from '@/components/card-beta'
import type {
  ColorPalette,
  HeadingSize,
  CtaTarget,
  CrossOrigin,
  BodyText,
  SpacingLevel,
} from '@/components/manguito-theme/theme/theme.types'
import {
  colors,
  bodyTextSize,
  buttonSize,
  targetOption,
  headingTextSize,
  spacingOptions,
} from '@/assets/options'
import generateClass from '@/components/manguito-theme'

const cardInfo: any[] = [
  {
    title: 'Card 1',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia, voluptas.',
    img: 'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1666385584/ManguitoPage/tveqbper01iikyrfvgie.jpg',
    url: 'https://manguitopage.herokuapp.com/',
  },
  {
    title: 'Card 2',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, sint?',
    img: 'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1666385555/ManguitoPage/hbezblnxgp6cocryveqp.jpg',
    url: 'https://manguitopage.herokuapp.com/',
  },
  {
    title: 'Card 3',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, veniam!',
    img: 'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1666385529/ManguitoPage/jvbzjwf6vprjcm1mqjpd.jpg',
    url: 'https://manguitopage.herokuapp.com/',
  },
  {
    title: 'Card 4',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus, illum!',
    img: 'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1666385507/ManguitoPage/iso3exu8vhgxrjtcoidn.jpg',
    url: 'https://manguitopage.herokuapp.com/',
  },
  {
    title: 'Card 5',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, similique?',
    img: 'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1662351942/ManguitoPage/jmeckqlcpvlrsy0lwkve.jpg',
    url: 'https://manguitopage.herokuapp.com/',
  },
  {
    title: 'Card 6',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, excepturi.',
    img: 'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1662351910/ManguitoPage/arvk0suxerpkepbenpbb.jpg',
    url: 'https://manguitopage.herokuapp.com/',
  },
  {
    title: 'Card 7',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure, numquam?',
    img: 'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1662351885/ManguitoPage/uxwaefimmhmks78ahxsl.jpg',
    url: 'https://manguitopage.herokuapp.com/',
  },
  {
    title: 'Card 8',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, ipsa.',
    img: 'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1659679135/ManguitoPage/ofumcnn0asbk2t8bwub7.jpg',
    url: 'https://manguitopage.herokuapp.com/',
  },
]

const stateAlpha = reactive<{
  title: string
  titleSize?: HeadingSize
  titleColor?: ColorPalette
  bgColor?: ColorPalette
  displayTagLine?: boolean
  tagLineUpperCase?: boolean
  tagLine?: string
  tagLineSize?: BodyText
  tagLineColor?: ColorPalette
  displayHighlight?: boolean
  highlightColor?: ColorPalette
  btnColor?: ColorPalette
  btnBgColor?: ColorPalette
  cardsContent: any[]
  cardsGap?: SpacingLevel
  slotText?: string
}>({
  title: 'Carousel Alpha',
  titleSize: 'md',
  titleColor: 'dark-3',
  bgColor: 'light-1',
  displayTagLine: true,
  tagLineUpperCase: true,
  tagLine: 'Lorem ipsum',
  tagLineSize: 'md',
  tagLineColor: 'dark-1',
  displayHighlight: true,
  highlightColor: 'primary',
  btnColor: 'dark-3',
  btnBgColor: 'light-4',
  cardsContent: cardInfo,
  cardsGap: 'xs',
  slotText:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quas tempora consequatur totam voluptas error doloribus inventore aliquam repudiandae quaerat.',
})
</script>

<template>
  <Story title="Carousel" group="section-comp">
    <Variant title="carousel-alpha">
      <div class="py-sm">
        <h2 class="h2-sm uppercase pl-xs sm:pl-md mb-md mt-sm">
          <span class="bg-warning px-xs py-2xs rounded-md"
            >card-alpha example:</span
          >
        </h2>
        <carousel-alpha
          :title="stateAlpha.title"
          :title-size="stateAlpha.titleSize"
          :title-color="stateAlpha.titleColor"
          :bg-color="stateAlpha.bgColor"
          :display-tag-line="stateAlpha.displayTagLine"
          :tag-line-upper-case="stateAlpha.tagLineUpperCase"
          :tag-line="stateAlpha.tagLine"
          :tag-line-size="stateAlpha.tagLineSize"
          :tag-line-color="stateAlpha.tagLineColor"
          :display-highlight="stateAlpha.displayHighlight"
          :highlight-color="stateAlpha.highlightColor"
          :btn-color="stateAlpha.btnColor"
          :btn-bg-color="stateAlpha.btnBgColor"
          :cards-content="stateAlpha.cardsContent"
          :cards-gap="stateAlpha.cardsGap"
        >
          <template #description>
            <div v-html="stateAlpha.slotText"></div>
          </template>
          <template #carousel="{ setRef, cards }">
            <card-beta
              v-for="(card, i) in cards"
              :key="i"
              :ref="(el) => setRef(el)"
              :title="card.title"
              :image-source="card.img"
              :cta-as-link="true"
              :cta-link="card.url"
              cta-target="_blank"
              class="h-full"
            >
              <div
                class="py-2xs px-xs bg-light-2/50"
                v-html="card.description"
              ></div>
            </card-beta>
          </template>
        </carousel-alpha>
      </div>
      <div class="py-sm">
        <h2 class="h2-sm uppercase pl-xs sm:pl-md mb-md mt-sm">
          <span class="bg-warning px-xs py-2xs rounded-md"
            >card-beta example:</span
          >
        </h2>
        <carousel-alpha
          :title="stateAlpha.title"
          :title-size="stateAlpha.titleSize"
          :title-color="stateAlpha.titleColor"
          :bg-color="stateAlpha.bgColor"
          :display-tag-line="stateAlpha.displayTagLine"
          :tag-line-upper-case="stateAlpha.tagLineUpperCase"
          :tag-line="stateAlpha.tagLine"
          :tag-line-size="stateAlpha.tagLineSize"
          :tag-line-color="stateAlpha.tagLineColor"
          :display-highlight="stateAlpha.displayHighlight"
          :highlight-color="stateAlpha.highlightColor"
          :btn-color="stateAlpha.btnColor"
          :btn-bg-color="stateAlpha.btnBgColor"
          :cards-content="stateAlpha.cardsContent"
          :cards-gap="stateAlpha.cardsGap"
        >
          <template #description>
            <div v-html="stateAlpha.slotText"></div>
          </template>
          <template #carousel="{ setRef, cards }">
            <card-alpha
              v-for="(card, i) in cards"
              :key="i"
              :ref="(el) => setRef(el)"
              :title="card.title"
              label-text="card-alpha"
              :image-source="card.img"
              :enlarge-on-hover="true"
              cta-text="Read more"
              :cta-link="card.url"
              cta-target="_blank"
              class="h-full"
            >
              <div v-html="card.description"></div>
            </card-alpha>
          </template>
        </carousel-alpha>
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
        <HstSelect
          title="bg-color"
          v-model="stateAlpha.bgColor"
          :options="colors"
        />
        <HstCheckbox
          title="display-tag-line"
          v-model="stateAlpha.displayTagLine"
        />
        <HstCheckbox
          title="tag-line-upper-case"
          v-model="stateAlpha.tagLineUpperCase"
        />
        <HstText title="tag-line" v-model="stateAlpha.tagLine" />
        <HstSelect
          title="tag-line-size"
          v-model="stateAlpha.tagLineSize"
          :options="bodyTextSize"
        />
        <HstSelect
          title="tag-line-color"
          v-model="stateAlpha.tagLineColor"
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
          title="btn-color"
          v-model="stateAlpha.btnColor"
          :options="colors"
        />
        <HstSelect
          title="btn-bg-color"
          v-model="stateAlpha.btnBgColor"
          :options="colors"
        />
        <HstSelect
          title="cards-gap"
          v-model="stateAlpha.cardsGap"
          :options="spacingOptions"
        />
        <HstTextarea v-model="stateAlpha.slotText" title="Slot Text" />
      </template>
    </Variant>
  </Story>
</template>
