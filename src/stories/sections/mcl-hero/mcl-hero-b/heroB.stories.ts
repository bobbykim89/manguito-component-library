import {
  booleanControllers,
  colorControllers,
  headingLevelControllers,
  headingTextControllers,
  textControllers,
} from '@/assets/composables'
import { MclHeroB } from '@/components/mcl-hero/lib'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof MclHeroB> = {
  title: 'Sections/Hero/MclHeroB',
  component: MclHeroB,
  argTypes: {
    title: textControllers({
      name: 'title',
      required: true,
      description: 'assigns title text for the hero component',
      category: 'Title Block',
    }),
    titleLevel: headingLevelControllers({
      name: 'title-level',
      required: false,
      description: 'assigns heading level of title text',
      defaultValue: 'h1',
      category: 'Title Block',
    }),
    titleSize: headingTextControllers({
      name: 'title-size',
      required: false,
      description: 'assigns text size of component title',
      defaultValue: 'md',
      category: 'Title Block',
    }),
    titleColor: colorControllers({
      name: 'title-color',
      required: false,
      description: 'assigns text color of component title',
      defaultValue: 'white',
      category: 'Title Block',
    }),
    displayHighlight: booleanControllers({
      name: 'display-highlight',
      required: false,
      description: 'whether or not to display highlight on title block',
      defaultValue: false,
      category: 'Title Block',
    }),
    highlightColor: colorControllers({
      name: 'highlight-color',
      required: false,
      description: 'assigns color of highlight on title block',
      defaultValue: 'dark-3',
      category: 'Title Block',
    }),
    imageSource: textControllers({
      name: 'image-source',
      required: true,
      description: 'assigns url for background image of component',
      category: 'Image Block',
    }),
    displayGradients: booleanControllers({
      name: 'display-gradient',
      required: false,
      description: 'whether or not to add gradient on the background image',
      defaultValue: true,
      category: 'Image Block',
    }),
    gradientColor: colorControllers({
      name: 'gradient-color',
      required: false,
      description: 'assigns color of gradient',
      defaultValue: 'dark-3',
      category: 'Image Block',
    }),
    fullWidth: booleanControllers({
      name: 'full-width',
      required: false,
      description:
        'whether to have component to have full width above 1280px screen width',
      defaultValue: true,
      category: 'Section',
    }),
  },
  args: {
    title: 'MCL Hero B',
    titleLevel: 'h1',
    titleSize: 'md',
    titleColor: 'white',
    displayHighlight: false,
    highlightColor: 'dark-3',
    fullWidth: true,
    imageSource:
      'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1650675406/ManguitoPage/hl38duquvda0ilultyqb.jpg',
    displayGradients: true,
    gradientColor: 'dark-3',
  },
}

export default meta

type Story = StoryObj<typeof MclHeroB>
export const MclHeroBExample: Story = {
  render: (args) => ({
    components: { 'mcl-hero-b': MclHeroB },
    setup() {
      return { args }
    },
    template: '<mcl-hero-b v-bind="args"></mcl-hero-b>',
  }),
}

export const MclHeroBSlotExample: Story = {
  render: (args) => ({
    components: { 'mcl-hero-b': MclHeroB },
    setup() {
      return { args }
    },
    template:
      '<mcl-hero-b v-bind="args"><div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat odio voluptate fuga quibusdam nostrum veritatis similique aperiam nobis debitis, excepturi id culpa quasi quos totam obcaecati deserunt ea quis sit quisquam alias nihil omnis! Aut culpa architecto repellat minima adipisci porro consequatur, officiis facere ea quos officia fugiat atque quia?</div></mcl-hero-b>',
  }),
}
