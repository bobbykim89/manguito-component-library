import {
  booleanControllers,
  colorControllers,
  columnWidthControllers,
  xDirControllers,
} from '@/assets/composables'
import { MclContainerA } from '@/components/mcl-container/lib'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof MclContainerA> = {
  title: 'Sections/Container/MclContainerA',
  argTypes: {
    sectionBg: colorControllers({
      name: 'section-bg',
      required: false,
      description: 'assigns section background color',
      defaultValue: 'light-1',
      category: 'Section',
    }),
    containerBg: colorControllers({
      name: 'container-bg',
      required: false,
      description: 'assigns background color inside container',
      defaultValue: 'primary',
      category: 'Container',
    }),
    topDirection: xDirControllers({
      name: 'top-direction',
      required: false,
      description: 'assigns direction for top edge of container',
      defaultValue: 'left',
      category: 'Container',
    }),
    bottomDirection: xDirControllers({
      name: 'bottom-direction',
      required: false,
      description: 'assigns direction for boggom edge of container',
      defaultValue: 'left',
      category: 'Container',
    }),
    twoColumns: booleanControllers({
      name: 'two-columns',
      required: false,
      description: 'whether or not to split the container into two columns',
      defaultValue: true,
      category: 'Container',
    }),
    leftColumnWidth: columnWidthControllers({
      name: 'left-column-width',
      required: false,
      description:
        'assigns width of left side columns when container is splitted to two columns',
      defaultValue: 50,
      category: 'Container',
    }),
  },
  args: {
    sectionBg: 'light-1',
    containerBg: 'primary',
    topDirection: 'left',
    bottomDirection: 'left',
    twoColumns: true,
    leftColumnWidth: 50,
  },
}

export default meta

type Story = StoryObj<typeof MclContainerA>
export const MclContainerAExample: Story = {
  render: (args) => ({
    components: { 'mcl-container-a': MclContainerA },
    setup() {
      return { args }
    },
    template:
      '<mcl-container-a v-bind="args"><template #left-column><div class="md:p-2xs"><img class="aspect-square object-cover object-top rounded-md drop-shadow-lg" src="https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1666385584/ManguitoPage/tveqbper01iikyrfvgie.jpg" alt="manguito sitting on the top of fridge" /></div></template><template #right-column><div class="h-full flex items-center"><div class="md:m-2xs bg-light-3 p-xs md:p-sm rounded-md aspect-square"><h2 class="h2-md mb-sm">MCL Container A</h2><div class="mb-xs"><p class="font-bold">Items inside container component are arbitrary items added just for portrait.</p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga quo incidunt a blanditiis mollitia ea est? Fugit voluptate expedita magni vitae iste. Nulla aperiam voluptate ullam dolor officiis earum quis aliquam at ducimus porro.</div></div></div></template></mcl-container-a>',
  }),
}
