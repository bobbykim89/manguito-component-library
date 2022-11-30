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
} from '@/components/manguito-theme/theme/theme.types'
import {
  colors,
  bodyTextSize,
  buttonSize,
  targetOption,
  headingTextSize,
  corsOptions,
} from '@/assets/options'

const cardInfo: [] = [
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

const stateAlpha = reactive<{}>({})
</script>

<template>
  <Story title="Carousel" group="section-comp">
    <Variant title="carousel-alpha">
      <div>
        <carousel-alpha title="carousel-alpha" :cards-content="cardInfo">
          <template #description>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quas
              tempora consequatur totam
              <strong>voluptas error</strong> doloribus inventore aliquam
              repudiandae quaerat.
            </p>
          </template>
          <template #carousel="{ setRef, cards }">
            <!-- <card-alpha
              v-for="(card, i) in cards"
              :key="i"
              :ref="(el) => setRef(el)"
              :title="card.title"
              label-text="Manguito"
              :image-source="card.img"
              :enlarge-on-hover="true"
              cta-text="Read more"
              :cta-link="card.url"
              cta-target="_blank"
              class="mr-xs last:mr-0 h-full"
            >
              <div v-html="card.description"></div>
            </card-alpha> -->
            <card-beta
              v-for="(card, i) in cards"
              :key="i"
              :ref="(el) => setRef(el)"
              :title="card.title"
              :image-source="card.img"
              :cta-as-link="true"
              :cta-link="card.url"
              cta-target="_blank"
              class="mr-4 last:mr-0 h-full"
            >
              <div
                class="py-2xs px-xs bg-light-2/50"
                v-html="card.description"
              ></div>
            </card-beta>
          </template>
        </carousel-alpha>
      </div>
    </Variant>
  </Story>
</template>
