import type { Meta, StoryObj } from '@storybook/vue3'
import {
  colorControllers,
  textControllers,
  booleanControllers,
  inputTypeControllers,
  numberControllers,
} from '@/assets/composables'
import { MclInputText } from '@/components/mcl-forms'
import MclInputTextWithLabel from './MclInputTextWithLabel.vue'

const meta: Meta<typeof MclInputText> = {
  title: 'Components/Form/MclInputText',
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
    type: inputTypeControllers({
      name: 'type',
      required: false,
      description: 'assigns accepted type of input for the component',
      defaultValue: 'text',
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
    pattern: textControllers({
      name: 'pattern',
      required: false,
      description: 'assigns patterns to validate input data',
      category: 'Input Block',
    }),
    minLength: numberControllers({
      name: 'min-length',
      required: false,
      description: 'assigns min length to validate input data',
      category: 'Input Block',
    }),
    maxLength: numberControllers({
      name: 'max-length',
      required: false,
      description: 'assigns max length to validate input data',
      category: 'Input Block',
    }),
    invalidFeedback: textControllers({
      name: 'invalid-feedback',
      required: false,
      description: 'assigns text being displayed when input value is not valid',
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
    id: 'mcl-input-text',
    displayBorder: false,
    borderColor: 'light-4',
    rounded: false,
    displayHighlight: true,
    highlightColor: 'primary',
    bgColor: 'light-1',
    textcolor: 'black',
    placeholder: '',
    type: 'text',
    displayShadow: true,
    required: false,
  },
}

export default meta

type Story = StoryObj<typeof MclInputText>
export const MclInputTextExample: Story = {
  render: (args) => ({
    components: { 'mcl-input-text': MclInputText },
    setup() {
      return { args }
    },
    template: '<mcl-input-text v-bind="args"></mcl-input-text>',
  }),
}

export const MclInputTextWithLabelExample: Story = {
  render: () => ({
    components: {
      'mcl-input-text-with-label': MclInputTextWithLabel,
    },
    template: '<mcl-input-text-with-label></mcl-input-text-with-label>',
  }),
}

export const MclInputTextCustomInvalidFeedback: Story = {
  render: (args) => ({
    components: { 'mcl-input-text': MclInputText },
    setup() {
      return { args }
    },
    template:
      '<mcl-input-text v-bind="args"><template #invalid-feedback><div><p class="text-md text-warning font-bold">{{ args.invalidFeedback}}</p></div></template></mcl-input-text>',
  }),
}
