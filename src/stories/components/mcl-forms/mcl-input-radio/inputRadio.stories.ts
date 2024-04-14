import {
  booleanControllers,
  colorControllers,
  switchSizeControllers,
  textControllers,
} from '@/assets/composables'
import { MclFormGroup, MclInputRadio } from '@/components/mcl-forms/lib'
import type { Meta, StoryObj } from '@storybook/vue3'
import InputRadioExampleA from './InputRadioExampleA.vue'

const meta: Meta<typeof MclInputRadio> = {
  title: 'Components/Form/MclInputRadio',
  argTypes: {
    id: textControllers({
      name: 'id',
      required: true,
      description: 'assigns id of the component',
      category: 'Input Block',
    }),
    value: textControllers({
      name: 'id',
      required: false,
      description: 'assigns value of the component',
      defaultValue: '',
      category: 'Input Block',
    }),
    checked: booleanControllers({
      name: 'checked',
      required: false,
      description: 'whether or not to have item checked',
      defaultValue: false,
      category: 'Input Block',
    }),
    radioSize: switchSizeControllers({
      name: 'radio-size',
      required: false,
      description: 'assigns size of component',
      defaultValue: 'md',
      category: 'Component Block',
    }),
    bgColor: colorControllers({
      name: 'bg-color',
      required: false,
      description: 'assigns color of the component',
      defaultValue: 'success',
      category: 'Component Block',
    }),
    checkedColor: colorControllers({
      name: 'checked-color',
      required: false,
      description: 'assigns color of component when checked',
      category: 'Component Block',
    }),
    displayShadow: booleanControllers({
      name: 'display-shadow',
      required: false,
      description: 'whether or not to add drop shadow on the component',
      category: 'Component Block',
    }),
  },
  args: {
    id: 'mcl-input-radio',
    value: '',
    checked: false,
    radioSize: 'md',
    bgColor: 'success',
    checkedColor: 'light-1',
    displayShadow: false,
  },
}

export default meta

type Story = StoryObj<typeof MclInputRadio>
export const MclInputRadioExample: Story = {
  render: (args) => ({
    components: {
      'mcl-input-radio': MclInputRadio,
      'mcl-form-group': MclFormGroup,
    },
    setup() {
      return { args }
    },
    template:
      '<mcl-form-group :label-for="args.id" label="MCL Input Switch"><mcl-input-radio v-bind="args"></mcl-input-radio></mcl-form-group>',
  }),
}

export const MclInputRadioExampleA: Story = {
  render: (args) => ({
    components: {
      'input-radio-example-a': InputRadioExampleA,
    },
    setup() {
      return { args }
    },
    template: '<input-radio-example-a v-bind="args"></input-radio-example-a>',
  }),
}
