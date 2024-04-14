import {
  arrayControllers,
  bodyTextControllers,
  booleanControllers,
  colorControllers,
  fontWeightControllers,
  textControllers,
} from '@/assets/composables'
import type { DropdownItem } from '@/components/mcl-dropdown/lib'
import { MclDropdownA } from '@/components/mcl-dropdown/lib'
import type { Meta, StoryObj } from '@storybook/vue3'

const dropdownItems: DropdownItem[] = [
  {
    title: 'Dropdown item example 1',
    link: '#',
  },
  {
    title: 'Dropdown item example 2',
    link: '#',
  },
  {
    title: 'Dropdown item example 3',
    link: '#',
  },
  {
    title: 'Dropdown item example 4',
    link: '#',
  },
]

const meta: Meta<typeof MclDropdownA> = {
  title: 'Components/Dropdown/MclDropdownA',
  argTypes: {
    title: textControllers({
      name: 'title',
      required: true,
      description: 'assigns title text on the button',
      category: 'Button',
    }),
    buttonColor: colorControllers({
      name: 'button-color',
      required: false,
      description: 'assigns color of dropdown button',
      defaultValue: 'warning',
      category: 'Button',
    }),
    buttonRounded: booleanControllers({
      name: 'button-rounded',
      required: false,
      description: 'whether or not to round the border of button',
      defaultValue: false,
      category: 'Button',
    }),
    buttonTextColor: colorControllers({
      name: 'button-text-color',
      required: false,
      description: 'assigns text color of button',
      defaultValue: 'black',
      category: 'Button',
    }),
    buttonInvert: booleanControllers({
      name: 'button-invert',
      required: false,
      description: 'whether or not to apply inveerted button style',
      defaultValue: false,
      category: 'Button',
    }),
    dropdownItems: arrayControllers({
      name: 'dropdown-items',
      required: true,
      description: 'assigns contents inside of dropdown',
      category: 'Dropdown',
    }),
    dropdownColor: colorControllers({
      name: 'dropdown-color',
      required: false,
      description: 'assigns color of dropdown',
      defaultValue: 'white',
      category: 'Dropdown',
    }),
    displayBorder: booleanControllers({
      name: 'display-border',
      required: false,
      description: 'whether or not to display border of dropdown list',
      defaultValue: true,
      category: 'Dropdown',
    }),
    rounded: booleanControllers({
      name: 'rounded',
      required: false,
      description: 'whether or not to round the border of dropdown list',
      defaultValue: true,
      category: 'Dropdown',
    }),
    displayShadow: booleanControllers({
      name: 'display-shadow',
      required: false,
      description: 'whether or not to add drop shadow on dropdown list',
      defaultValue: true,
      category: 'Dropdown',
    }),
    hoverBgColor: colorControllers({
      name: 'hover-bg-color',
      required: false,
      description: 'assigns background color of dropdown on hover',
      defaultValue: 'light-4',
      category: 'Dropdown',
    }),
    dropdownTextSize: bodyTextControllers({
      name: 'dropdown-text-size',
      required: false,
      description: 'assigns text size of dropdown items',
      defaultValue: 'md',
      category: 'Dropdown',
    }),
    dropdownFontWeight: fontWeightControllers({
      name: 'dropdown-font-weight',
      required: false,
      description: 'assigns font weight of dropdown items',
      defaultValue: 'normal',
      category: 'Dropdown',
    }),
    dropdownTextColor: colorControllers({
      name: 'dropdown-text-color',
      required: false,
      description: 'assigns text color of dropdown items',
      defaultValue: 'dark-3',
      category: 'Dropdown',
    }),
    displaySeparator: booleanControllers({
      name: 'display-separator',
      required: false,
      description:
        'whether or not to add separating line between dropdown items',
      defaultValue: false,
      category: 'Dropdown',
    }),
  },
  args: {
    title: 'MCL Dropdown A',
    buttonColor: 'warning',
    buttonRounded: false,
    buttonTextColor: 'black',
    buttonInvert: false,
    dropdownItems,
    dropdownColor: 'white',
    displayBorder: true,
    rounded: true,
    displayShadow: true,
    hoverBgColor: 'light-4',
    dropdownTextSize: 'md',
    dropdownFontWeight: 'normal',
    dropdownTextColor: 'dark-3',
    displaySeparator: false,
  },
}

export default meta

type Story = StoryObj<typeof MclDropdownA>
export const MclDropdownAExample: Story = {
  render: (args) => ({
    components: { 'mcl-dropdown-a': MclDropdownA },
    setup() {
      return { args }
    },
    template:
      '<section class="h-[40vh]"><mcl-dropdown-a v-bind="args"></mcl-dropdown-a></section>',
  }),
}
