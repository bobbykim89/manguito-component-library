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
import { MclSelect } from '@/components/mcl-forms'

const selectOptions = [
  { text: 'Item 1', value: 'value 1' },
  { text: 'Item 2', value: 'value 2' },
  { text: 'Item 3', value: 'value 3' },
  { text: 'Item 4', value: 'value 4' },
  { text: 'Item 5', value: 'value 5' },
]

const meta: Meta<typeof MclSelect> = {
  title: 'Components/Form/MclSelect',
  argTypes: {},
  args: {
    id: 'mcl-select',
    displayBorder: false,
    borderColor: 'light-4',
    rounded: false,
    displayHighlight: true,
    highlightColor: 'primary',
    bgColor: 'light-1',
    arrowColor: 'dark-4',
    placeholder: '',
    displayShadow: true,
    required: false,
    options: selectOptions,
  },
}

export default meta

type Story = StoryObj<typeof MclSelect>
export const MclSelectExample: Story = {
  render: (args) => ({
    components: { 'mcl-select': MclSelect },
    data() {
      return {
        text: '',
      }
    },
    setup() {
      return { args }
    },
    template:
      '<section><mcl-select v-bind="args" v-model="text"></mcl-select><div>Output text: {{text}}</div></section>',
  }),
}
