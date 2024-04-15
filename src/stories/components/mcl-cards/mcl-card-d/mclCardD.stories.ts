import {
  booleanControllers,
  colorControllers,
  corsOptionControllers,
  headingTextControllers,
  rangeControllers,
  textControllers,
} from '@/assets/composables'
import { MclCardD } from '@/components/mcl-cards/lib'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof MclCardD> = {
  title: 'Components/Cards/MclCardD',
  component: MclCardD,
  argTypes: {
    title: textControllers({
      name: 'title',
      required: true,
      description: 'text in titleblock of component',
      category: 'Title Block',
    }),
    titleSize: headingTextControllers({
      name: 'title-size',
      required: false,
      description: 'title text font size',
      defaultValue: 'md',
      category: 'Title Block',
    }),
    titleColor: colorControllers({
      name: 'title-color',
      required: false,
      description: 'color of title text',
      defaultValue: 'dark-4',
      category: 'Title Block',
    }),
    imageSource: textControllers({
      name: 'image-source',
      required: false,
      description: 'image source of the card',
      category: 'Image Block',
    }),
    imageAlt: textControllers({
      name: 'image-alt',
      required: false,
      description: 'alt text for card image',
      category: 'Image Block',
    }),
    imageCors: corsOptionControllers({
      name: 'image-cors',
      required: false,
      description: 'cors option for image (anonymous|use-credentials)',
      defaultValue: 'anonymous',
      category: 'Image Block',
    }),
    displayImage: booleanControllers({
      name: 'displayImage',
      required: false,
      description: 'whether or not to display card image',
      defaultValue: true,
      category: 'Image Block',
    }),
    bgColor: colorControllers({
      name: 'bg-color',
      required: false,
      description: 'assigns the background color of the component',
      defaultValue: 'light-1',
      category: 'Card Body',
    }),
    borderWidth: rangeControllers({
      name: 'border-width',
      required: false,
      description: 'controls border width',
      defaultValue: 80,
      controlOption: {
        min: 1,
        max: 10,
        step: 1,
      },
      category: 'Card Body',
    }),
    borderColor: colorControllers({
      name: 'border-color',
      required: false,
      description: 'border color of card component',
      defaultValue: 'light-3',
      category: 'Card Body',
    }),
    gradient1: colorControllers({
      name: 'gradient-1',
      required: false,
      description: 'set color of gradient 1',
      defaultValue: 'primary',
      category: 'Card Body',
    }),
    gradient2: colorControllers({
      name: 'gradient-2',
      required: false,
      description: 'set color of gradient 2',
      defaultValue: 'secondary',
      category: 'Card Body',
    }),
    ctaText: textControllers({
      name: 'cta-text',
      required: false,
      description: 'text displayed on cta',
      defaultValue: 'Read more',
      category: 'CTA',
    }),
    ctaLink: textControllers({
      name: 'cta-link',
      required: true,
      description: 'cta link url',
      defaultValue: 'Read more',
      category: 'CTA',
    }),
    ctaAsLink: booleanControllers({
      name: 'cta-as-link',
      required: false,
      description: 'let cta button default behavior as a link',
      defaultValue: false,
      category: 'CTA',
    }),
    ctaButton: booleanControllers({
      name: 'cta-button',
      required: false,
      description: 'displays cta as a button',
      defaultValue: false,
      category: 'CTA',
    }),
    ctaButtonColor: colorControllers({
      name: 'cta-button-color',
      required: false,
      description: 'color of cta when it is displayed as a button',
      defaultValue: 'warning',
      category: 'CTA',
    }),
    ctaButtonBlock: booleanControllers({
      name: 'cta-button-block',
      required: false,
      description: 'displays cta button as a block (full width)',
      defaultValue: false,
      category: 'CTA',
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
      description: 'color of highlight under the title block',
      defaultValue: 'primary',
      category: 'Highlight',
    }),
  },
  args: {
    displayImage: true,
    imageSource:
      'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1666385529/ManguitoPage/jvbzjwf6vprjcm1mqjpd.jpg',
    imageAlt: 'picture of a bird',
    imageCors: 'anonymous',
    title: 'MCL Card D',
    titleSize: 'md',
    titleColor: 'dark-4',
    bgColor: 'light-1',
    displayHighlight: true,
    highlightColor: 'primary',
    ctaText: 'Read more',
    ctaLink: '/',
    ctaLinkTarget: '_self',
    ctaButton: false,
    ctaButtonColor: 'warning',
    ctaAsLink: false,
    ctaButtonBlock: false,
    borderWidth: 3,
    borderColor: 'light-3',
    gradient1: 'primary',
    gradient2: 'secondary',
  },
}

export default meta

type Story = StoryObj<typeof MclCardD>

export const MclCardDExample: Story = {
  render: (args) => ({
    components: { 'mcl-card-d': MclCardD },
    setup() {
      return { args }
    },
    template:
      '<section class="container"><mcl-card-d v-bind="args"><div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est tenetur impedit hic iure, consectetur cupiditate nesciunt ullam voluptatum veniam ipsam?</div></mcl-card-d></section>',
  }),
}
