import {
  colorControllers,
  headingLevelControllers,
  headingTextControllers,
  numberControllers,
  textControllers,
} from '@/assets/composables'
import { MclContainerB } from '@/components/mcl-container/lib'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof MclContainerB> = {
  title: 'Sections/Container/MclContainerB',
  component: MclContainerB,
  argTypes: {
    title: textControllers({
      name: 'title',
      required: true,
      description: 'assigns title text',
      category: 'Title Block',
    }),
    titleLevel: headingLevelControllers({
      name: 'title-level',
      required: false,
      description: 'assigns heading level for the title text',
      defaultValue: 'h2',
      category: 'Title Block',
    }),
    titleSize: headingTextControllers({
      name: 'title-size',
      required: false,
      description: 'assigns title text size',
      defaultValue: 'md',
      category: 'Title Block',
    }),
    titleColor: colorControllers({
      name: 'title-color',
      required: false,
      description: 'assigns color of the title text',
      defaultValue: 'dark-3',
      category: 'Title Block',
    }),
    sectionBgColor: colorControllers({
      name: 'section-bg-color',
      required: false,
      description: 'assigns background color of the section',
      defaultValue: 'transparent',
      category: 'Background',
    }),
    containerBgColor: colorControllers({
      name: 'container-bg-color',
      required: false,
      description: 'assigns background color of container',
      defaultValue: 'light-2',
      category: 'Background',
    }),
    imageSource: textControllers({
      name: 'image-source',
      required: true,
      description: 'assigns url for parallax image',
      category: 'Image',
    }),
    imgHeightDesktop: numberControllers({
      name: 'img-height-desktop',
      required: false,
      description: 'assigns image height for desktop screen size',
      defaultValue: 384,
      category: 'Image',
    }),
    imgHeightMobile: numberControllers({
      name: 'img-heright-mobile',
      required: false,
      description: 'assigns image height for mobile screen size',
      defaultValue: 256,
      category: 'Image',
    }),
  },
  args: {
    sectionBgColor: 'transparent',
    containerBgColor: 'light-2',
    imageSource:
      'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1653539465/ManguitoPage/u94iug4r8non1fwprlmh.jpg',
    imgHeightMobile: 256,
    imgHeightDesktop: 384,
    title: 'MCL Container B',
    titleLevel: 'h2',
    titleSize: 'md',
    titleColor: 'dark-3',
  },
}

export default meta

type Story = StoryObj<typeof MclContainerB>
export const MclContainerBExample: Story = {
  render: (args) => ({
    components: { 'mcl-container-b': MclContainerB },
    setup() {
      return { args }
    },
    template:
      '<mcl-container-b v-bind="args"><template #content><div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa enim, maxime est veniam consequatur animi omnis modi at labore corrupti illo, blanditiis ducimus, tempora vel voluptas suscipit aliquam! Unde dicta enim hic esse facere delectus vero minima sunt dignissimos, veniam cumque asperiores nemo natus libero saepe, eaque, aspernatur id quibusdam.</div></template></mcl-container-b>',
  }),
}
