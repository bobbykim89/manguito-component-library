import type { Meta, StoryObj } from '@storybook/vue3'
import {
  colorControllers,
  headingTextControllers,
  textControllers,
  booleanControllers,
  corsOptionControllers,
  targetOptionControllers,
} from '@/assets/composables'
import { MclCardA } from '@/components/mcl-cards'

const meta: Meta<typeof MclCardA> = {
  title: 'Components/Cards/MclCardA',
  argTypes: {
    title: textControllers({
      name: 'title',
      required: true,
      description: 'assigns title text of card',
      defaultValue: undefined,
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
    displayImage: booleanControllers({
      name: 'display-image',
      required: false,
      description: 'displays image block on the card',
      defaultValue: true,
      category: 'Image Block',
    }),
    imageSource: textControllers({
      name: 'image-source',
      required: false,
      description: 'image source on the card',
      defaultValue: undefined,
      category: 'Image Block',
    }),
    imageAlt: textControllers({
      name: 'image-alt',
      required: false,
      description: 'image alt text on the card',
      defaultValue: undefined,
      category: 'Image Block',
    }),
    imageCors: corsOptionControllers({
      name: 'image-cors',
      required: false,
      description: 'cors option for image (anonymous|use-credentials)',
      defaultValue: 'anonymous',
      category: 'Image Block',
    }),
    borderColor: colorControllers({
      name: 'border-color',
      required: false,
      description: 'assigns the border color of the component',
      defaultValue: 'light-3',
      category: 'Border',
    }),
    displayShadow: booleanControllers({
      name: 'display-shadow',
      required: false,
      description: 'adds drop shadow at the border of component',
      defaultValue: true,
      category: 'Border',
    }),
    rounded: booleanControllers({
      name: 'rounded',
      required: false,
      description: 'rounds the edges of the component',
      defaultValue: true,
      category: 'Border',
    }),
    displayCta: booleanControllers({
      name: 'display-cta',
      required: false,
      description: 'displays cta button on the card component',
      defaultValue: true,
      category: 'CTA',
    }),
    ctaText: textControllers({
      name: 'cta-text',
      required: false,
      description: 'text on the cta button',
      defaultValue: 'cta text',
      category: 'CTA',
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
    ctaColor: colorControllers({
      name: 'cta-color',
      required: false,
      description: 'assigns the color of the cta button',
      defaultValue: 'primary',
      category: 'CTA',
    }),
    displayLabel: booleanControllers({
      name: 'display-label',
      required: false,
      description: 'displays label',
      defaultValue: true,
      category: 'Label',
    }),
    labelText: textControllers({
      name: 'label-text',
      required: false,
      description: 'set label text',
      defaultValue: 'Lorem ipsum',
      category: 'Label',
    }),
    labelTextColor: colorControllers({
      name: 'label-text-color',
      required: false,
      description: 'assigns the color of the label text',
      defaultValue: 'light-1',
      category: 'Label',
    }),
    labelColor: colorControllers({
      name: 'label-color',
      required: false,
      description: 'assigns the background color of the label',
      defaultValue: 'dark-4',
      category: 'Label',
    }),
    displayHighlight: booleanControllers({
      name: 'display-highlight',
      required: false,
      description: 'displays highlight under the title block',
      defaultValue: true,
      category: 'Highlight',
    }),
    highlightColor: colorControllers({
      name: 'highlight-color',
      required: false,
      description: 'assigns the color of the highlight',
      defaultValue: 'primary',
      category: 'Highlight',
    }),
    enlargeOnHover: booleanControllers({
      name: 'enlarge-on-hover',
      required: false,
      description: 'displays highlight under the title block',
      defaultValue: false,
      category: 'Body',
    }),
    bgColor: colorControllers({
      name: 'bg-color',
      required: false,
      description: 'assigns the background color of the component',
      defaultValue: 'light-1',
      category: 'Body',
    }),
  },
  args: {
    title: 'MCL Card A',
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
  },
}

export default meta

type Story = StoryObj<typeof MclCardA>

export const MclCardAExample: Story = {
  render: (args) => ({
    components: { 'mcl-card-a': MclCardA },
    setup() {
      return { args }
    },
    template:
      '<section class="container"><mcl-card-a v-bind="args"><div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est tenetur impedit hic iure, consectetur cupiditate nesciunt ullam voluptatum veniam ipsam?</div></mcl-card-a></section>',
  }),
}
