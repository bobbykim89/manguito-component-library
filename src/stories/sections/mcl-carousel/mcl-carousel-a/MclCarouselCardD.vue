<script setup lang="ts">
import { MclCardD } from '@/components/mcl-cards/lib'
import { MclCarouselA } from '@/components/mcl-carousel/lib'

const cardInfo: any[] = [
  {
    title: 'Card 1',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia, voluptas.',
    img: 'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1666385584/ManguitoPage/tveqbper01iikyrfvgie.jpg',
    alt: 'Peach-faced lovebird perched on a kitchen shelf',
    url: 'https://manguitopage.herokuapp.com/',
  },
  {
    title: 'Card 2',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, sint?',
    img: 'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1666385555/ManguitoPage/hbezblnxgp6cocryveqp.jpg',
    alt: 'Lovebird nibbling a half-eaten apple held in a hand',
    url: 'https://manguitopage.herokuapp.com/',
  },
  {
    title: 'Card 3',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, veniam!',
    img: 'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1666385529/ManguitoPage/jvbzjwf6vprjcm1mqjpd.jpg',
    alt: 'Lovebird perched on a forearm next to a wristwatch',
    url: 'https://manguitopage.herokuapp.com/',
  },
  {
    title: 'Card 4',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus, illum!',
    img: 'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1666385507/ManguitoPage/iso3exu8vhgxrjtcoidn.jpg',
    alt: 'Lovebird eating berries and nuts from a white bowl',
    url: 'https://manguitopage.herokuapp.com/',
  },
  {
    title: 'Card 5',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, similique?',
    img: 'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1662351942/ManguitoPage/jmeckqlcpvlrsy0lwkve.jpg',
    alt: 'Lovebird standing on a pile of coins on a blanket',
    url: 'https://manguitopage.herokuapp.com/',
  },
  {
    title: 'Card 6',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, excepturi.',
    img: 'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1662351910/ManguitoPage/arvk0suxerpkepbenpbb.jpg',
    alt: 'Lovebird lying on its back on a blanket, being petted',
    url: 'https://manguitopage.herokuapp.com/',
  },
  {
    title: 'Card 7',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure, numquam?',
    img: 'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1662351885/ManguitoPage/uxwaefimmhmks78ahxsl.jpg',
    alt: 'Lovebird lying on a blanket beside a tablet, being petted',
    url: 'https://manguitopage.herokuapp.com/',
  },
  {
    title: 'Card 8',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, ipsa.',
    img: 'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1659679135/ManguitoPage/ofumcnn0asbk2t8bwub7.jpg',
    alt: 'Lovebird perched on a backpack strap in a living room',
    url: 'https://manguitopage.herokuapp.com/',
  },
]
</script>

<template>
  <mcl-carousel-a title="MCL Carousel Card D Example" :content="cardInfo">
    <template #description
      ><div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quas
        tempora consequatur totam voluptas error doloribus inventore aliquam
        repudiandae quaerat.
      </div></template
    >
    <template #carousel="{ cards, slideAttrs }">
      <mcl-card-d
        v-for="(card, i) in cards"
        :key="i"
        v-bind="slideAttrs(i)"
        :title="card.title"
        :image-source="card.img"
        :image-alt="card.alt"
        cta-text="Read more"
        :cta-link="card.url"
        cta-target="_blank"
        class="h-full"
      >
        <div v-html="card.description"></div>
      </mcl-card-d>
    </template>
  </mcl-carousel-a>
</template>
@/components/mcl-cards/lib
