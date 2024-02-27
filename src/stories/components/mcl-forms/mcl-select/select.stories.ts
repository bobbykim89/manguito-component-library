import type { Meta, StoryObj } from '@storybook/vue3'
import {
  colorControllers,
  textControllers,
  booleanControllers,
  arrayControllers,
} from '@/assets/composables'
import { MclSelect, MclFormGroup } from '@/components/mcl-forms'
import MclSelectExampleVue from './MclSelectExample.vue'

const selectOptions = [
  { text: 'Item 1', value: 'value 1' },
  { text: 'Item 2', value: 'value 2' },
  { text: 'Item 3', value: 'value 3' },
  { text: 'Item 4', value: 'value 4' },
  { text: 'Item 5', value: 'value 5' },
]

const meta: Meta<typeof MclSelect> = {
  title: 'Components/Form/MclSelect',
  argTypes: {
    id: textControllers({
      name: 'id',
      required: true,
      description: 'assigns id of the component',
      category: 'ID',
    }),
    displayBorder: booleanControllers({
      name: 'display-border',
      required: false,
      description: 'whether or not to disply border of the component',
      defaultValue: false,
      category: 'Component Block',
    }),
    borderColor: colorControllers({
      name: 'border-color',
      required: false,
      description: 'assigns color of the border',
      defaultValue: 'light-4',
      category: 'Component Block',
    }),
    rounded: booleanControllers({
      name: 'rounded',
      required: false,
      description: 'whether or not to have border rounded',
      defaultValue: false,
      category: 'Component Block',
    }),
    textcolor: colorControllers({
      name: 'text-color',
      required: false,
      description: 'assigns text color of the component',
      defaultValue: 'black',
      category: 'Component Block',
    }),
    bgColor: colorControllers({
      name: 'bg-color',
      required: false,
      description:
        'assigns background color of the component and background color of options block',
      defaultValue: 'light-1',
      category: 'Component Block',
    }),
    iconColor: colorControllers({
      name: 'icon-color',
      required: false,
      description: 'assigns color of arrow and clear input icons',
      defaultValue: 'dark-4',
      category: 'Component Block',
    }),
    displayShadow: booleanControllers({
      name: 'display-shadow',
      required: false,
      description: 'whether or not to add shadow on the component',
      defaultValue: true,
      category: 'Component Block',
    }),
    selectColor: colorControllers({
      name: 'select-color',
      required: false,
      description: 'assigns options color when it is on hover.',
      defaultValue: 'primary',
      category: 'Options Block',
    }),
    invalidFeedback: textControllers({
      name: 'invalid-feedback',
      required: false,
      description: 'assigns text when there is no matching option available',
      defaultValue: 'No match.',
      category: 'Options Block',
    }),
    options: arrayControllers({
      name: 'options',
      required: true,
      description: 'assigns selectable options',
      category: 'Options Block',
    }),
    placeholder: textControllers({
      name: 'placeholder',
      required: false,
      description: 'assigns placeholder text',
      defaultValue: '',
      category: 'Input Block',
    }),
    required: booleanControllers({
      name: 'required',
      required: false,
      description: 'whether or not to have this input value required',
      defaultValue: false,
      category: 'Input Block',
    }),
    displayHighlight: booleanControllers({
      name: 'display-highlight',
      required: false,
      description: 'whether or not to display highlight on focus',
      defaultValue: true,
      category: 'Highlight',
    }),
    highlightColor: colorControllers({
      name: 'highlight-color',
      required: false,
      description: 'assigns color oh highlight',
      defaultValue: 'primary',
      category: 'Highlight',
    }),
  },
  args: {
    id: 'mcl-select',
    displayBorder: false,
    borderColor: 'light-4',
    rounded: false,
    displayHighlight: true,
    highlightColor: 'primary',
    textcolor: 'black',
    bgColor: 'light-1',
    iconColor: 'dark-4',
    selectColor: 'primary',
    placeholder: '',
    displayShadow: true,
    required: false,
    invalidFeedback: 'No match.',
    options: selectOptions,
  },
}

export default meta

type Story = StoryObj<typeof MclSelect>
export const MclSelectExample: Story = {
  render: (args) => ({
    components: { 'mcl-select': MclSelect, 'mcl-form-group': MclFormGroup },
    setup() {
      return { args }
    },
    template:
      '<mcl-form-group :label-for="args.id" label="MCL Select"><mcl-select v-bind="args"></mcl-select></mcl-form-group>',
  }),
}

export const MclSelectExampleStringArrayOptions: Story = {
  render: () => ({
    components: { 'mcl-select-example-vue': MclSelectExampleVue },
    template: '<mcl-select-example-vue></mcl-select-example-vue>',
  }),
}
