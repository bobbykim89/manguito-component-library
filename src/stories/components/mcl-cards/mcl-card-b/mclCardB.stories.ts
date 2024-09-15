import {
  booleanControllers,
  colorControllers,
  headingTextControllers,
  targetOptionControllers,
  textControllers,
} from '@/assets/composables'
import { MclCardB } from '@/components/mcl-cards/lib'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof MclCardB> = {
  title: 'Components/Cards/MclCardB',
  component: MclCardB,
  argTypes: {
    title: textControllers({
      name: 'title',
      required: true,
      description: 'text in the title block of the component',
      category: 'Title Block',
    }),
    titleSize: headingTextControllers({
      name: 'title-size',
      required: false,
      description: 'title text size',
      defaultValue: 'md',
      category: 'Title Block',
    }),
    titleColor: colorControllers({
      name: 'title-color',
      required: false,
      description: 'title text color',
      defaultValue: 'light-1',
      category: 'Title Block',
    }),
    titleBlockColor: colorControllers({
      name: 'title-block-color',
      required: false,
      description: 'background color of title block',
      defaultValue: 'dark-4',
      category: 'Title Block',
    }),
    borderColor: colorControllers({
      name: 'border-color',
      required: false,
      description: 'border color of card component',
      defaultValue: 'light-3',
      category: 'Card Body',
    }),
    rounded: booleanControllers({
      name: 'rounded',
      required: false,
      description: 'add rounded corners on card component',
      defaultValue: false,
      category: 'Card Body',
    }),
    imageSource: textControllers({
      name: 'image-source',
      required: true,
      description: 'image source of the card',
      category: 'Image Block',
    }),
    imageAlt: textControllers({
      name: 'image-alt',
      required: false,
      description: 'alt text for card image',
      category: 'Image Block',
    }),
    displayGrayScale: booleanControllers({
      name: 'display-grayscale',
      required: false,
      description: 'add grayscale on card image',
      defaultValue: true,
      category: 'Image Block',
    }),
    ctaLink: textControllers({
      name: 'cta-link',
      required: false,
      description: 'cta link url',
      defaultValue: '#',
      category: 'CTA',
    }),
    ctaTarget: targetOptionControllers({
      name: 'cta-target',
      required: false,
      description: 'set cta target option',
      defaultValue: '_self',
      category: 'CTA',
    }),
    ctaAsLink: booleanControllers({
      name: 'cta-as-link',
      required: false,
      description: 'let cta button default behavior as a link',
      defaultValue: true,
      category: 'CTA',
    }),
  },
  args: {
    title: 'MCL Card B',
    titleSize: 'md',
    titleColor: 'light-1',
    titleBlockColor: 'dark-4',
    borderColor: 'light-3',
    displayGrayScale: true,
    imageSource:
      'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1666385529/ManguitoPage/jvbzjwf6vprjcm1mqjpd.jpg',
    imageAlt: 'Manguito is perching',
    ctaAsLink: false,
    ctaLink: 'https://manguitopage.herokuapp.com/',
    ctaTarget: '_self',
    rounded: false,
  },
}

export default meta

type Story = StoryObj<typeof MclCardB>

export const MclCardBExample: Story = {
  render: (args) => ({
    components: { 'mcl-card-b': MclCardB },
    setup() {
      return { args }
    },
    template:
      '<section class="container"><mcl-card-b v-bind="args"><div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est tenetur impedit hic iure, consectetur cupiditate nesciunt ullam voluptatum veniam ipsam?</div></mcl-card-b></section>',
  }),
}
