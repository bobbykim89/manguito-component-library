import {
  booleanControllers,
  colorControllers,
  rangeControllers,
} from '@/assets/composables'
import { HeaderVertical } from '@/components/manguito-theme/lib'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof HeaderVertical> = {
  title: 'Base/Base Component/Header (Vertical)',
  component: HeaderVertical,
  argTypes: {
    bgColor: colorControllers({
      name: 'bg-color',
      required: false,
      description: 'assigns background color of the component',
      defaultValue: 'light-1',
      category: 'Colors',
    }),
    drawerBtnColor: colorControllers({
      name: 'drawer-btn-color',
      required: false,
      defaultValue: 'dark-1',
      description: 'assigns color of drawer button',
      category: 'Colors',
    }),
    drawerBtnBorder: booleanControllers({
      name: 'drawer-btn-border',
      required: false,
      defaultValue: false,
      description: 'whether or not to display border of drawer button',
      category: 'Colors',
    }),
    headerWidth: rangeControllers({
      name: 'header-width',
      required: false,
      defaultValue: 160,
      description: 'assigns max-width of component in desktop screen',
      category: 'Size',
      controlOption: {
        min: 10,
        max: 500,
        step: 10,
      },
    }),
  },
  args: {
    bgColor: 'light-1',
    drawerBtnColor: 'dark-1',
    drawerBtnBorder: true,
    headerWidth: 160,
  },
}

export default meta
type Story = StoryObj<typeof HeaderVertical>
export const HeaderVerticalExample: Story = {
  render: (args) => ({
    components: { 'header-vertical': HeaderVertical },
    setup() {
      return { args }
    },
    template:
      '<section><div class="lg:flex"><header-vertical v-bind="args"><template #content><div><h4>Content Slot</h4></div></template><template #content-bottom><div><p>Content-bottom Slot</p></div></template><template #mobile-content><div><h3>Mobile Content Slot</h3></div></template></header-vertical><div class="w-full"><div class="min-h-[100vh] bg-primary px-xs"><h3 class="h3-md text-center pt-md">Content Title</h3><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur numquam error velit ipsa aliquam commodi impedit aut, incidunt, maiores amet modi voluptate unde dolorem dicta similique quisquam aperiam laborum eum qui minima magni aliquid dolorum? Ab, deserunt. Dignissimos ex voluptatem delectus praesentium doloremque harum culpa exercitationem, numquam repudiandae rem rerum eaque a eum doloribus! Deleniti laborum nam et animi soluta eligendi repellat maiores dolore possimus. Voluptate laboriosam obcaecati et voluptates corrupti ipsam tempore praesentium autem commodi reprehenderit! Fuga odit maiores esse dolorum unde aliquid rerum numquam quaerat cupiditate tempora provident dicta quam nobis, sapiente consequatur. Minima doloremque eum soluta id!</p></div><div class="min-h-[100vh] bg-secondary px-xs"><h3 class="h3-md text-center pt-md">Content Title</h3><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur numquam error velit ipsa aliquam commodi impedit aut, incidunt, maiores amet modi voluptate unde dolorem dicta similique quisquam aperiam laborum eum qui minima magni aliquid dolorum? Ab, deserunt. Dignissimos ex voluptatem delectus praesentium doloremque harum culpa exercitationem, numquam repudiandae rem rerum eaque a eum doloribus! Deleniti laborum nam et animi soluta eligendi repellat maiores dolore possimus. Voluptate laboriosam obcaecati et voluptates corrupti ipsam tempore praesentium autem commodi reprehenderit! Fuga odit maiores esse dolorum unde aliquid rerum numquam quaerat cupiditate tempora provident dicta quam nobis, sapiente consequatur. Minima doloremque eum soluta id!</p></div></div></div><div class="min-h-[50vh] bg-success"><h3 class="h3-md text-center pt-md">Footer</h3></div></section>',
  }),
}
