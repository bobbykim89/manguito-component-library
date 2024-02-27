import type { Meta, StoryObj } from '@storybook/vue3'
import {
  colorControllers,
  headingTextControllers,
  textControllers,
  booleanControllers,
  corsOptionControllers,
  targetOptionControllers,
  rangeControllers,
} from '@/assets/composables'
import { MclCardC } from '@/components/mcl-cards'

const meta: Meta<typeof MclCardC> = {
  title: 'Components/Cards/MclCardC',
  argTypes: {
    title: textControllers({
      name: 'title',
      required: false,
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
      defaultValue: 'dark-3',
      category: 'Title Block',
    }),
    displayTitle: booleanControllers({
      name: 'display-title',
      required: false,
      description: 'whether to display title block',
      defaultValue: false,
      category: 'Title Block',
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
    imageCors: corsOptionControllers({
      name: 'image-cors',
      required: false,
      description: 'cors option for image (anonymous|use-credentials)',
      defaultValue: 'anonymous',
      category: 'Image Block',
    }),
    cardColor: colorControllers({
      name: 'card-color',
      required: false,
      description: 'color of card component before flipping it',
      defaultValue: 'primary',
      category: 'Card Body',
    }),
    displayHighlight: booleanControllers({
      name: 'display-highlight',
      required: false,
      description: 'displays highlight under the title block',
      defaultValue: false,
      category: 'Highlight',
    }),
    highlightColor: colorControllers({
      name: 'highlight-color',
      required: false,
      description: 'assigns the color of the highlight',
      defaultValue: 'light-3',
      category: 'Highlight',
    }),
    highlightOpacity: rangeControllers({
      name: 'highlight-opacity',
      required: false,
      description: 'controls opacity of highlight',
      defaultValue: 80,
      controlOption: {
        min: 10,
        max: 100,
        step: 10,
      },
      category: 'Highlight',
    }),
  },
  args: {
    imageSource:
      'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1666385529/ManguitoPage/jvbzjwf6vprjcm1mqjpd.jpg',
    imageAlt: 'manguito perching',
    title: 'MCL Card C',
    titleSize: 'md',
    titleColor: 'dark-3',
    displayHighlight: false,
    highlightColor: 'light-3',
    highlightOpacity: 80,
    displayTitle: false,
    cardColor: 'primary',
    imageCors: 'anonymous',
  },
}

export default meta

type Story = StoryObj<typeof MclCardC>

export const MclCardCExample: Story = {
  render: (args) => ({
    components: { 'mcl-card-c': MclCardC },
    setup() {
      return { args }
    },
    template:
      '<section class="container"><mcl-card-c v-bind="args"><template #card-body><div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est tenetur impedit hic iure, consectetur cupiditate nesciunt ullam voluptatum veniam ipsam?</div></template></mcl-card-c></section>',
  }),
}
