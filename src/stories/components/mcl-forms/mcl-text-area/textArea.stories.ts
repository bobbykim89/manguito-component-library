import type { Meta, StoryObj } from '@storybook/vue3'
import {
  colorControllers,
  headingTextControllers,
  textControllers,
  booleanControllers,
  bodyTextControllers,
  spacingControllers,
  arrayControllers,
  inputTypeControllers,
  numberControllers,
} from '@/assets/composables'
import { MclTextArea } from '@/components/mcl-forms'
import MclTextAreaWithLabel from './MclTextAreaWithLabel.vue'

const meta: Meta<typeof MclTextArea> = {
  title: 'Components/Form/MclTextArea',
  argTypes: {
    id: textControllers({
      name: 'id',
      required: true,
      description: 'assigns id of the input component',
      category: 'ID',
    }),
    displayBorder: booleanControllers({
      name: 'display-border',
      required: false,
      description: 'whether or not to display border of the input component',
      defaultValue: false,
      category: 'Input Block',
    }),
    borderColor: colorControllers({
      name: 'borer-color',
      required: false,
      description: 'assigns border color of input component',
      defaultValue: 'light-4',
      category: 'Input Block',
    }),
    rounded: booleanControllers({
      name: 'rounded',
      required: false,
      description: 'whether or not to round the corner of the input component',
      defaultValue: false,
      category: 'Input Block',
    }),
    bgColor: colorControllers({
      name: 'bg-color',
      required: false,
      description: 'assigns background color of the input component',
      defaultValue: 'light-1',
      category: 'Input Block',
    }),
    textcolor: colorControllers({
      name: 'text-color',
      required: false,
      description: 'assigns text color of the input component',
      defaultValue: 'black',
      category: 'Input Block',
    }),
    placeholder: textControllers({
      name: 'placeholder',
      required: false,
      description: 'assigns placeholder text for the input',
      category: 'Input Block',
    }),
    displayShadow: booleanControllers({
      name: 'display-shadow',
      required: false,
      description: 'whether or not to add drop shadow around component',
      defaultValue: true,
      category: 'Input Block',
    }),
    required: booleanControllers({
      name: 'required',
      required: false,
      description:
        "whether or not to add 'required' attribute in this input component",
      defaultValue: false,
      category: 'Input Block',
    }),
    rows: numberControllers({
      name: 'rows',
      required: false,
      description: 'assigns numbers of rows for this component',
      defaultValue: 5,
      category: 'Input Block',
    }),
    displayHighlight: booleanControllers({
      name: 'display-highlight',
      required: false,
      description:
        'whether or not to add highlight at the bottom of input component',
      defaultValue: true,
      category: 'Highlight',
    }),
    highlightColor: colorControllers({
      name: 'highlight-color',
      required: false,
      description: 'assigns highlight color',
      defaultValue: 'primary',
      category: 'Highlight',
    }),
  },
  args: {
    id: 'mcl-text-area',
    displayBorder: false,
    borderColor: 'light-4',
    rounded: false,
    displayHighlight: true,
    highlightColor: 'primary',
    bgColor: 'light-1',
    textcolor: 'black',
    placeholder: '',
    displayShadow: true,
    required: false,
    rows: 5,
  },
}

export default meta

type Story = StoryObj<typeof MclTextArea>
export const MclTextAreaExample: Story = {
  render: (args) => ({
    components: { 'mcl-text-area': MclTextArea },
    setup() {
      return { args }
    },
    template: '<mcl-text-area v-bind="args"></mcl-text-area>',
  }),
}

export const MclTextAreaWithLabelExample: Story = {
  render: () => ({
    components: { 'mcl-text-area-with-label': MclTextAreaWithLabel },
    template: '<mcl-text-area-with-label></mcl-text-area-with-label>',
  }),
}
