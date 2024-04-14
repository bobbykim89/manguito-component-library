import {
  bodyTextControllers,
  booleanControllers,
  colorControllers,
  headingLevelControllers,
  headingTextControllers,
  textControllers,
} from '@/assets/composables'
import { MclHeroC } from '@/components/mcl-hero/lib'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof MclHeroC> = {
  title: 'Sections/Hero/MclHeroC',
  component: MclHeroC,
  argTypes: {
    title: textControllers({
      name: 'title',
      required: true,
      description: 'assigns title text of component',
      category: 'Title Block',
    }),
    titleLevel: headingLevelControllers({
      name: 'title-level',
      required: false,
      description: 'assigns heading level for title text',
      defaultValue: 'h1',
      category: 'Title Block',
    }),
    titleSize: headingTextControllers({
      name: 'title-size',
      required: false,
      description: 'assigns heading text size',
      defaultValue: 'md',
      category: 'Title Block',
    }),
    titleColor: colorControllers({
      name: 'title-color',
      required: false,
      description: 'assigns color of heading text',
      defaultValue: 'dark-3',
      category: 'Title Block',
    }),
    displayTitleShadow: booleanControllers({
      name: 'display-title-shadow',
      required: false,
      description: 'whether or not to add drop shadow on title text',
      defaultValue: true,
      category: 'Title Block',
    }),
    displayHighlight: booleanControllers({
      name: 'display-highlight',
      required: false,
      description: 'whether or not to display highlight under title text',
      defaultValue: true,
      category: 'Highlight',
    }),
    highlightColor: colorControllers({
      name: 'highlight-color',
      required: false,
      description: 'assigns color of highlight',
      defaultValue: 'primary',
      category: 'Highlight',
    }),
    displayLabel: booleanControllers({
      name: 'display-label',
      required: false,
      description: 'whether or not to display label above title text',
      defaultValue: true,
      category: 'Label',
    }),
    labelText: textControllers({
      name: 'label-text',
      required: false,
      description: 'assigns label text',
      category: 'Label',
    }),
    labelTextSize: bodyTextControllers({
      name: 'label-text-size',
      required: false,
      description: 'assigns label text size',
      defaultValue: 'md',
      category: 'Label',
    }),
    labelTextColor: colorControllers({
      name: 'label-text-color',
      required: false,
      description: 'assigns label text color',
      defaultValue: 'light-3',
      category: 'Label',
    }),
    labelBgColor: colorControllers({
      name: 'label-bg-color',
      required: false,
      description: 'assigns label background color',
      defaultValue: 'dark-3',
      category: 'Label',
    }),
    imageSource: textControllers({
      name: 'image-source',
      required: true,
      description: 'assigns url for background image',
      category: 'Background',
    }),
    displayGradient: booleanControllers({
      name: 'display-gradient',
      required: false,
      description: 'whether or not to add gradient on background',
      defaultValue: true,
      category: 'Background',
    }),
    gradientColor: colorControllers({
      name: 'gradient-color',
      required: false,
      description: 'assigns color of background gradient',
      defaultValue: 'primary',
      category: 'Background',
    }),
  },
  args: {
    title: 'MCL Hero C',
    titleLevel: 'h1',
    titleSize: 'md',
    titleColor: 'dark-3',
    displayTitleShadow: true,
    displayHighlight: true,
    imageSource:
      'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1650675406/ManguitoPage/hl38duquvda0ilultyqb.jpg',
    displayGradient: true,
    highlightColor: 'primary',
    gradientColor: 'primary',
    displayLabel: true,
    labelText: 'Lorem Ipsum',
    labelTextSize: 'md',
    labelTextColor: 'light-1',
    labelBgColor: 'dark-3',
  },
}

export default meta

type Story = StoryObj<typeof MclHeroC>

export const MclHeroCExample: Story = {
  render: (args) => ({
    components: { 'mcl-hero-c': MclHeroC },
    setup() {
      return { args }
    },
    template: '<mcl-hero-c v-bind="args"></mcl-hero-c>',
  }),
}

export const MclHeroCSlotExample: Story = {
  render: (args) => ({
    components: { 'mcl-hero-c': MclHeroC },
    setup() {
      return { args }
    },
    template:
      '<mcl-hero-c v-bind="args"><div class="bg-light-2/60 p-xs sm:p-sm lg:p-md rounded-md">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat odio voluptate fuga quibusdam nostrum veritatis similique aperiam nobis debitis, excepturi id culpa quasi quos totam obcaecati deserunt ea quis sit quisquam alias nihil omnis! Aut culpa architecto repellat minima adipisci porro consequatur, officiis facere ea quos officia fugiat atque quia?</div></mcl-hero-c>',
  }),
}
