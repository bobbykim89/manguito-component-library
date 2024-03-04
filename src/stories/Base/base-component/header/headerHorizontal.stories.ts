import {
  booleanControllers,
  colorControllers,
  numberControllers,
} from '@/assets/composables'
import { HeaderHorizontal } from '@/components/manguito-theme'
import type { Meta, StoryObj } from '@storybook/vue3'
import HeaderHorizontalExample from './HeaderHorizontalExample.vue'

const meta: Meta<typeof HeaderHorizontal> = {
  title: 'Base/Base Component/Header (Horizontal)',
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
      description: 'assigns background color of collapsable mobile menu',
      defaultValue: 'light-2',
      category: 'Colors',
    }),
    drawerBtnColor: colorControllers({
      name: 'drawer-btn-color',
      required: false,
      description: 'assigns color for drawer button',
      defaultValue: 'dark-1',
      category: 'Colors',
    }),
    drawerBtnBorder: booleanControllers({
      name: 'drawer-btn-border',
      required: false,
      description: 'whether or not to display border for drawer button',
      defaultValue: true,
      category: 'Colors',
    }),
    fadeInOnScroll: booleanControllers({
      name: 'fade-in-on-scroll',
      required: false,
      description: 'whether or not to fade in compoent on scroll',
      defaultValue: true,
      category: 'Scroll',
    }),
    scrollDistance: numberControllers({
      name: 'scroll-distance',
      required: false,
      description: 'assigns distance (px) to trigger fade in effect',
      defaultValue: 50,
      category: 'Scroll',
    }),
    sticky: {
      name: 'sticky',
      type: { name: 'string', required: false },
      description: 'assign what screen size to trigger sticky effect',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: 'all' },
        category: 'Scroll',
      },
      control: { type: 'select' },
      options: ['none', 'tablet', 'pc', 'all'],
    },
  },
  args: {
    bgColor: 'light-1',
    mobileMenuBgColor: 'light-2',
    drawerBtnColor: 'dark-1',
    drawerBtnBorder: true,
    fadeInOnScroll: true,
    scrollDistance: 50,
    sticky: 'all',
  },
}

export default meta
type Story = StoryObj<typeof HeaderHorizontal>
export const HeaderHorizontalEmptySlots: Story = {
  render: (args) => ({
    components: { 'header-horizontal': HeaderHorizontal },
    setup() {
      return { args }
    },
    template:
      '<section><header-horizontal v-bind="args"></header-horizontal></section>',
  }),
}

export const HeaderHorizontalWithContent: Story = {
  render: (args) => ({
    components: { 'header-horizontal-example': HeaderHorizontalExample },
    setup() {
      return { args }
    },
    template:
      '<header-horizontal-example v-bind="args"></header-horizontal-example>',
  }),
}
