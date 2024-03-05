import {
  booleanControllers,
  colorControllers,
  rangeControllers,
} from '@/assets/composables'
import { HeaderVertical } from '@/components/manguito-theme'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof HeaderVertical> = {
  title: 'Base/Base Component/Header (Vertical)',
  argTypes: {
    bgColor: colorControllers({
      name: 'bg-color',
      required: false,
      description: 'assigns background color of the component',
      defaultValue: 'light-1',
      category: 'Colors',
    }),
    mobileMenuBgColor: colorControllers({
      name: 'mobile-menu-bg-color',
      required: false,
      defaultValue: 'light-2',
      description: 'assigns background color for mobile menu',
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
    mobileMenuBgColor: 'light-2',
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
      '<section><header-vertical v-bind="args"><template #content><div><h4>Content Slot</h4></div></template><template #content-bottom><div><p>Content-bottom Slot</p></div></template><template #mobile-content><div><h3>Mobile Content Slot</h3></div></template><div class="min-h-[100vh] bg-primary"><h3 class="h3-md text-center pt-md">Inside Header Component</h3></div><div class="min-h-[100vh] bg-secondary"><h3 class="h3-md text-center pt-md">Inside Header Component</h3></div></header-vertical><div class="min-h-[50vh] bg-success"><h3 class="h3-md text-center pt-md">Outside Header Component</h3></div></section>',
  }),
}
