import {
  bodyTextControllers,
  booleanControllers,
  colorControllers,
  headingTextControllers,
  rangeControllers,
  textControllers,
} from '@/assets/composables'
import GrandCanyonImage from '@/assets/images/grandcanyon-image.jpg'
import { Card } from '@/components/manguito-theme/lib'
import type { Meta, StoryObj } from '@storybook/vue3'
import { computed } from 'vue'
import CardExamplesVue from './CardExamples.vue'

const meta: Meta<typeof Card> = {
  title: 'Base/Base Component/Card Component',
  component: Card,
  argTypes: {
    variant: colorControllers({
      name: 'variant',
      required: false,
      defaultValue: 'light-1',
      description: 'assigns background color of the card component.',
      category: 'Card Body',
    }),
    border: booleanControllers({
      name: 'border',
      required: false,
      defaultValue: false,
      description: 'whether or not to add border to the card component.',
      category: 'Card Body',
    }),
    borderVariant: colorControllers({
      name: 'border-variant',
      required: false,
      defaultValue: 'light-4',
      description: 'assigns borde color of the card component',
      category: 'Card Body',
    }),
    rounded: booleanControllers({
      name: 'rounded',
      required: false,
      defaultValue: false,
      description:
        'whether or not to have rounded corners of the card component',
      category: 'Card Body',
    }),
    shadow: booleanControllers({
      name: 'shadow',
      required: false,
      defaultValue: false,
      description:
        'whether or not to have drop shadow around the card component',
      category: 'Card Body',
    }),
    glass: booleanControllers({
      name: 'glass',
      required: false,
      defaultValue: false,
      description:
        'whether or not to add glassmorphism effect on the background of the card component',
      category: 'Card Body',
    }),
    glassBlur: bodyTextControllers({
      name: 'glass-blur',
      required: false,
      defaultValue: 'sm',
      description: 'assigns blur filter size of the glassmorphism effect',
      category: 'Card Body',
    }),
    glassOpacity: rangeControllers({
      name: 'glass-opacity',
      required: false,
      defaultValue: 10,
      description: 'assigns filter opacity of the glassmorphism effect.',
      category: 'Card Body',
      controlOption: {
        min: 10,
        max: 100,
        step: 10,
      },
    }),
    cardClass: textControllers({
      name: 'card-class',
      required: false,
      description: 'assigns custom style class for card body',
      category: 'Card Body',
    }),
    imageSrc: textControllers({
      name: 'image-src',
      required: false,
      description: 'assigns image url of the card',
      category: 'Image Block',
    }),
    imageAlt: textControllers({
      name: 'image-alt',
      required: false,
      description: 'assigns image alt of the card',
      category: 'Image Block',
    }),
    noImage: booleanControllers({
      name: 'no-image',
      required: false,
      defaultValue: false,
      description: 'whether or not to display image block.',
      category: 'Image Block',
    }),
    title: textControllers({
      name: 'title',
      required: false,
      description: 'assigns the title text of the card component',
      category: 'Body Block',
    }),
    titleSize: headingTextControllers({
      name: 'title-size',
      required: false,
      defaultValue: 'md',
      description: 'assigns the size of title text',
      category: 'Body Block',
    }),
    titleVariant: colorControllers({
      name: 'title-variant',
      required: false,
      defaultValue: 'dark-4',
      description: 'assigns the color of title text',
      category: 'Body Block',
    }),
    noBody: booleanControllers({
      name: 'no-body',
      required: false,
      defaultValue: false,
      description: 'whether or not to have body block',
      category: 'Body Block',
    }),
    header: textControllers({
      name: 'header',
      required: false,
      description: 'assigns text for header block',
      category: 'Header Block',
    }),
    footer: textControllers({
      name: 'footer',
      required: false,
      description: 'assigns text for footer block',
      category: 'Footer Block',
    }),
  },
  args: {
    variant: 'light-1',
    border: false,
    borderVariant: 'light-4',
    rounded: false,
    shadow: false,
    glass: false,
    glassBlur: 'sm',
    glassOpacity: 10,
    imageSrc:
      'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1666385529/ManguitoPage/jvbzjwf6vprjcm1mqjpd.jpg',
    imageAlt: 'Manguito is perching',
    noImage: false,
    noBody: false,
    header: 'Header text',
    footer: 'Footer text',
    title: 'Base Card',
    titleVariant: 'dark-4',
    titleSize: 'md',
    cardClass: '',
  },
}

export default meta

type Story = StoryObj<typeof Card>

export const BaseCardExample: Story = {
  render: (args) => ({
    components: { card: Card },
    setup() {
      const bgImage = computed(() => {
        return { 'background-image': `url('${GrandCanyonImage}')` }
      })
      return { args, bgImage }
    },
    template:
      '<section :style="bgImage" class="container bg-cover bg-no-repeat bg-center px-md py-lg"><div class="grid lg:grid-cols-3 gap-4"><card v-bind="args"><template #body><div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est tenetur impedit hic iure, consectetur cupiditate nesciunt ullam voluptatum veniam ipsam?</div></template></card></div></section>',
  }),
}

export const MoreCardExamples = {
  render: () => ({
    components: { 'card-examples': CardExamplesVue },
    template: '<card-examples></card-examples>',
  }),
}
