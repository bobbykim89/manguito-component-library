import {
  arrayControllers,
  bodyTextControllers,
  booleanControllers,
  colorControllers,
  headingTextControllers,
  spacingControllers,
  textControllers,
} from '@/assets/composables'
import { MclCardA } from '@/components/mcl-cards/lib'
import { MclCarouselA } from '@/components/mcl-carousel/lib'
import type { Meta, StoryObj } from '@storybook/vue3'
import MclCarouselACardB from './MclCarouselACardB.vue'
import MclCarouselCardD from './MclCarouselCardD.vue'

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

const meta: Meta<typeof MclCarouselA> = {
  title: 'Sections/Carousel/MclCarouselA',
  argTypes: {
    title: textControllers({
      name: 'title',
      required: true,
      description: 'assigns title text for the section',
      category: 'Title Block',
    }),
    titleSize: headingTextControllers({
      name: 'title-size',
      required: false,
      description: 'assigns the size of title text',
      defaultValue: 'md',
      category: 'Title Block',
    }),
    titleColor: colorControllers({
      name: 'title-color',
      required: false,
      description: 'assigns the color of title text',
      defaultValue: 'dark-3',
      category: 'Title Block',
    }),
    tagLine: textControllers({
      name: 'tag-line',
      required: false,
      description: 'assigns tagline text above title block',
      category: 'Title Block',
    }),
    tagLineSize: bodyTextControllers({
      name: 'tag-line-size',
      required: false,
      description: 'font size of tagline above title block',
      defaultValue: 'md',
      category: 'Title Block',
    }),
    displayTagLine: booleanControllers({
      name: 'display-tag-line',
      required: false,
      description: 'displays tagline text above title block',
      defaultValue: true,
      category: 'Title Block',
    }),
    tagLineColor: colorControllers({
      name: 'tag-line-color',
      required: false,
      description: 'color of tagline text',
      defaultValue: 'dark-1',
      category: 'Title Block',
    }),
    displayHighlight: booleanControllers({
      name: 'display-highlight',
      required: false,
      description: 'displays highlight on the left side of title block',
      defaultValue: true,
      category: 'Title Block',
    }),
    highlightColor: colorControllers({
      name: 'highlight-color',
      required: false,
      description: 'color of highlight on the left side of title block',
      defaultValue: 'primary',
      category: 'Title Block',
    }),
    bgColor: colorControllers({
      name: 'bg-color',
      required: false,
      description: 'assigns the section background color',
      defaultValue: 'light-1',
      category: 'Colors',
    }),
    btnColor: colorControllers({
      name: 'btn-color',
      required: false,
      description: 'assigns the color of chevron icons in carousel buttons',
      defaultValue: 'dark-3',
      category: 'Colors',
    }),
    btnBgColor: colorControllers({
      name: 'btn-bg-color',
      required: false,
      description: 'assigns the color of title text',
      defaultValue: 'light-4',
      category: 'Colors',
    }),
    cardsGap: spacingControllers({
      name: 'cards-gap',
      required: false,
      description: 'set space between carousel items',
      defaultValue: 'xs',
      category: 'Content',
    }),
    content: arrayControllers({
      name: 'content',
      required: true,
      description: 'array of content that goes to carousel cards',
      category: 'Content',
    }),
  },
  args: {
    title: 'MCL Carousel A',
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
    content: cardInfo,
    cardsGap: 'xs',
  },
}

export default meta

type Story = StoryObj<typeof MclCarouselA>

export const MclCarouselExampleA: Story = {
  render: (args) => ({
    components: { 'mcl-carousel-a': MclCarouselA, 'mcl-card-a': MclCardA },
    setup() {
      return { args }
    },
    template:
      '<mcl-carousel-a v-bind="args"><template #description><div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quas tempora consequatur totam voluptas error doloribus inventore aliquam repudiandae quaerat.</div></template><template #carousel="{ setRef, cards }"><mcl-card-a v-for="(card, i) in cards" :key="i" :ref="(el) => setRef(el)" :title="card.title" label-text="card-alpha" :image-source="card.img" :enlarge-on-hover="true" cta-text="Read more" :cta-link="card.url" cta-target="_blank" class="h-full"><div v-html="card.description"></div></mcl-card-a></template></mcl-carousel-a>',
  }),
}

export const MclCarouselCardBExample: Story = {
  render: () => ({
    components: { 'mcl-carousel-card-b': MclCarouselACardB },
    template: '<mcl-carousel-card-b></mcl-carousel-card-b>',
  }),
}

export const MclCarouselCardDExample: Story = {
  render: () => ({
    components: { 'mcl-carousel-card-d': MclCarouselCardD },
    template: '<mcl-carousel-card-d></mcl-carousel-card-d>',
  }),
}
