import {
  booleanControllers,
  colorControllers,
  headingLevelControllers,
  headingTextControllers,
  rangeControllers,
  textControllers,
  xDirControllers,
} from '@/assets/composables'
import { MclHeroA } from '@/components/mcl-hero/lib'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof MclHeroA> = {
  title: 'Sections/Hero/MclHeroA',
  component: MclHeroA,
  argTypes: {
    title: textControllers({
      name: 'title',
      required: true,
      description: 'Assigns title text for hero section',
      category: 'Title Block',
    }),
    titleLevel: headingLevelControllers({
      name: 'title-level',
      required: false,
      description: 'assigns what heading level to use',
      defaultValue: 'h1',
      category: 'Title Block',
    }),
    titleColor: colorControllers({
      name: 'title-color',
      required: false,
      description: 'color of title text',
      defaultValue: 'dark-3',
      category: 'Title Block',
    }),
    titleSize: headingTextControllers({
      name: 'title-size',
      required: false,
      description: 'size of title text',
      defaultValue: 'md',
      category: 'Title Block',
    }),
    displaySubTitle: booleanControllers({
      name: 'display-sub-title',
      required: false,
      description: 'whether or not to display subtitle block',
      defaultValue: false,
      category: 'Title Block',
    }),
    subTitle: textControllers({
      name: 'sub-title',
      required: false,
      description: 'assigns sub title text',
      category: 'Title Blockp',
    }),
    subTitleLevel: headingLevelControllers({
      name: 'sub-title-level',
      required: false,
      description: 'assigns heading level of sub title',
      defaultValue: 'h3',
      category: 'Title Block',
    }),
    subTitleSize: headingTextControllers({
      name: 'sub-title-size',
      required: false,
      description: 'size of sub title text',
      defaultValue: 'md',
      category: 'Title Block',
    }),
    subTitleColor: colorControllers({
      name: 'sub-title-color',
      required: false,
      description: 'color of sub title text',
      defaultValue: 'dark-3',
      category: 'Title Block',
    }),
    displayHighlight: booleanControllers({
      name: 'display-highlight',
      required: false,
      description: 'add highlight on the title block',
      defaultValue: false,
      category: 'Title Block',
    }),
    highlightColor: colorControllers({
      name: 'highlight-color',
      required: false,
      description: 'assigns color of highlight',
      defaultValue: 'warning',
      category: 'Title Block',
    }),
    imageSource: textControllers({
      name: 'bg-image',
      required: true,
      description: 'assigns image url for hero section',
      category: 'Image Block',
    }),
    imgPosition: xDirControllers({
      name: 'img-position',
      required: false,
      description: 'assigns position of image for hero section',
      defaultValue: 'right',
      category: 'Image Block',
    }),
    mobileImageBlur: booleanControllers({
      name: 'mobile-image-blur',
      required: false,
      description: 'blur the image in mobile screen',
      defaultValue: false,
      category: 'Image Block',
    }),
    bgColor: colorControllers({
      name: 'bg-color',
      required: false,
      description: 'assigns background color of the component',
      defaultValue: 'white',
      category: 'Background',
    }),
    displayFilter: booleanControllers({
      name: 'display-filter',
      required: false,
      description:
        'wheter or not to display background filter on mobile screen, filter color is equivalent to bg-color value',
      defaultValue: true,
      category: 'Background',
    }),
    filterOpacity: rangeControllers({
      name: 'filter-opacity',
      required: false,
      description: 'assigns opacity of background filter on mobile screen',
      controlOption: {
        min: 0,
        max: 100,
        step: 10,
      },
      defaultValue: 30,
      category: 'Background',
    }),
  },
  args: {
    title: 'MCL Hero A',
    titleLevel: 'h1',
    titleSize: 'md',
    titleColor: 'dark-3',
    displaySubTitle: false,
    subTitle: 'Lorem ipsum',
    subTitleLevel: 'h3',
    subTitleSize: 'md',
    subTitleColor: 'dark-3',
    displayHighlight: false,
    highlightColor: 'warning',
    imageSource:
      'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1650675406/ManguitoPage/hl38duquvda0ilultyqb.jpg',
    imgPosition: 'right',
    bgColor: 'white',
    mobileImageBlur: false,
    displayFilter: true,
    filterOpacity: 30,
  },
}

export default meta

type Story = StoryObj<typeof MclHeroA>
export const MclHeroAExample: Story = {
  render: (args) => ({
    components: { 'mcl-hero-a': MclHeroA },
    setup() {
      return { args }
    },
    template: '<mcl-hero-a v-bind="args"></mcl-hero-a>',
  }),
}

export const MclHeroASlotExample: Story = {
  render: (args) => ({
    components: { 'mcl-hero-a': MclHeroA },
    setup() {
      return { args }
    },
    template:
      '<mcl-hero-a v-bind="args"><div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat odio voluptate fuga quibusdam nostrum veritatis similique aperiam nobis debitis, excepturi id culpa quasi quos totam obcaecati deserunt ea quis sit quisquam alias nihil omnis! Aut culpa architecto repellat minima adipisci porro consequatur, officiis facere ea quos officia fugiat atque quia?</div></mcl-hero-a>',
  }),
}
