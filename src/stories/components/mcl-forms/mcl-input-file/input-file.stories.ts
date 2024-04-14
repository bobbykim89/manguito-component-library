import {
  booleanControllers,
  colorControllers,
  textControllers,
} from '@/assets/composables'
import { MclFormGroup, MclInputFile } from '@/components/mcl-forms/lib'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof MclInputFile> = {
  title: 'Components/Form/MclInputFile',
  argTypes: {
    id: textControllers({
      name: 'id',
      required: true,
      description: 'assigns id of component',
      category: 'Input Block',
    }),
    displayBorder: booleanControllers({
      name: 'display-border',
      required: false,
      description: 'whether or not todisplay border of component',
      defaultValue: false,
      category: 'Input Block',
    }),
    borderColor: colorControllers({
      name: 'border-color',
      required: false,
      description: 'assigns border color of the component',
      defaultValue: 'light-4',
      category: 'Input Block',
    }),
    bgColor: colorControllers({
      name: 'bg-color',
      required: false,
      description: 'assigns background color of the component',
      defaultValue: 'light-1',
      category: 'Input Block',
    }),
    rounded: booleanControllers({
      name: 'rounded',
      required: false,
      description: 'whether or not to have rounded border',
      defaultValue: false,
      category: 'Input Block',
    }),
    displayShadow: booleanControllers({
      name: 'display-shadow',
      required: false,
      description: 'whether or not to add shadow to component',
      defaultValue: true,
      category: 'Input Block',
    }),
    textColor: colorControllers({
      name: 'text-color',
      required: false,
      description: 'assigns text color inside input',
      defaultValue: 'black',
      category: 'Input Block',
    }),
    isRequired: booleanControllers({
      name: 'is-required',
      required: false,
      description: 'whether or not to make input value required',
      defaultValue: false,
      category: 'Input Block',
    }),
    accept: textControllers({
      name: 'accept',
      required: false,
      description: 'assigns accepted file type of input',
      defaultValue: 'image/jpg,image/jpeg,image/png',
      category: 'Input Block',
    }),
    buttonText: textControllers({
      name: 'button-text',
      required: false,
      description: 'assigns text inside the button left side of component',
      defaultValue: 'Browse File',
      category: 'Button Block',
    }),
    buttonTextColor: colorControllers({
      name: 'button-text-color',
      required: false,
      description: 'assigns text color inside the button',
      defaultValue: 'dark-3',
      category: 'Button Block',
    }),
    buttonColor: colorControllers({
      name: 'button-color',
      required: false,
      description: 'assigns the color of button',
      defaultValue: 'light-4',
      category: 'Button Block',
    }),
    displayClear: booleanControllers({
      name: 'display-clear',
      required: false,
      description:
        'whether or not to display clear button on right side of component',
      defaultValue: false,
      category: 'Button Block',
    }),
  },
  args: {
    id: 'mcl-input-file',
    displayBorder: false,
    borderColor: 'light-4',
    bgColor: 'light-1',
    rounded: false,
    displayShadow: true,
    textColor: 'black',
    isRequired: false,
    accept: 'image/jpg,image/jpeg,image/png',
    buttonText: 'Browse File',
    buttonTextColor: 'dark-3',
    buttonColor: 'light-4',
    displayClear: false,
  },
}

export default meta

type Story = StoryObj<typeof MclInputFile>
export const MclInputFileExample: Story = {
  render: (args) => ({
    components: {
      'mcl-input-file': MclInputFile,
      'mcl-form-group': MclFormGroup,
    },
    setup() {
      return { args }
    },
    template:
      '<mcl-form-group :label-for="args.id" label="MCL Input Switch"><mcl-input-file v-bind="args"></mcl-input-file></mcl-form-group>',
  }),
}
