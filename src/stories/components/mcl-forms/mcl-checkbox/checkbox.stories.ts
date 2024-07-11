import {
  booleanControllers,
  colorControllers,
  switchSizeControllers,
  textControllers,
} from '@/assets/composables'
import { MclCheckbox } from '@/components/mcl-forms/lib'
import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import MclCheckboxMultiple from './MclCheckboxMultiple.vue'

const meta: Meta<typeof MclCheckbox> = {
  title: 'Components/Form/MclCheckbox',
  component: MclCheckbox,
  argTypes: {
    id: textControllers({
      name: 'id',
      required: true,
      description: 'assigns id of input component',
      category: 'Input Block',
    }),
    value: textControllers({
      name: 'value',
      required: false,
      description: 'value of checkbox component',
      category: 'Input Block',
    }),
    checked: booleanControllers({
      name: 'checked',
      required: false,
      description: 'whether or not to have checkbox checked in default',
      defaultValue: false,
      category: 'Input Block',
    }),
    inputSize: switchSizeControllers({
      name: 'input-size',
      required: false,
      defaultValue: 'md',
      description: 'size of checkbox',
      category: 'Component Block',
    }),
    bgColor: colorControllers({
      name: 'bg-color',
      required: false,
      defaultValue: 'light-1',
      description: 'background color of unchecked checkbox',
      category: 'Component Block',
    }),
    checkedBgColor: colorControllers({
      name: 'checked-bg-color',
      required: false,
      defaultValue: 'warning',
      description: 'background color of checked checkbox',
      category: 'Component Block',
    }),
    checkColor: colorControllers({
      name: 'check-color',
      required: false,
      defaultValue: 'dark-3',
      description: 'color of check icon',
      category: 'Component Block',
    }),
    borderColor: colorControllers({
      name: 'border-color',
      required: false,
      defaultValue: 'dark-1',
      description: 'border color of checkbox',
      category: 'Component Block',
    }),
    displayShadow: booleanControllers({
      name: 'display-shadow',
      required: false,
      defaultValue: false,
      description: 'whether or not to add shadow on the checkbox',
      category: 'Component Block',
    }),
    rounded: booleanControllers({
      name: 'rounded',
      required: false,
      defaultValue: false,
      description: 'whether or not to have rounded corner',
      category: 'Component Block',
    }),
  },
  args: {
    id: 'my-checkbox',
    inputSize: 'md',
    bgColor: 'light-1',
    checkedBgColor: 'warning',
    checkColor: 'dark-3',
    borderColor: 'dark-1',
    displayShadow: false,
    rounded: false,
    value: 'checkbox-value',
    checked: false,
  },
}

export default meta

type Story = StoryObj<typeof MclCheckbox>
export const MclCheckboxEventExample: Story = {
  render: (args) => ({
    components: { 'mcl-checkbox': MclCheckbox },
    setup() {
      const checkboxVal = ref<string | number>('')
      const isChecked = ref<boolean>()
      const handleCheckboxClick = (
        e: Event,
        checked: boolean,
        value: string | number
      ) => {
        e.preventDefault()
        checkboxVal.value = value
        isChecked.value = checked
      }
      return { args, checkboxVal, handleCheckboxClick, isChecked }
    },
    template:
      '<section><div class="flex gap-2"><mcl-checkbox v-bind="args" @checkbox-click="handleCheckboxClick"></mcl-checkbox><label :for="args.id">{{ args.value }}</label></div><div>Checked: {{ isChecked }}</div><div>current value is: {{ checkboxVal }}</div></section>',
  }),
}

export const MclCheckboxVModelExample: Story = {
  render: (args: Meta<typeof MclCheckbox>['args']) => ({
    components: { 'mcl-checkbox': MclCheckbox },
    setup() {
      const modelVal = ref<boolean>()
      return { args, modelVal }
    },
    template:
      '<section><div class="flex gap-2"><mcl-checkbox v-bind="args" v-model="modelVal"></mcl-checkbox><label :for="args.id">{{ args.value }}</label></div><div>Checked: {{ modelVal }}</div></section>',
  }),
}

export const MultipleMclCheckboxExample: Story = {
  render: (args) => ({
    components: { 'mcl-checkbox-multiple': MclCheckboxMultiple },
    setup() {
      return { args }
    },
    template:
      '<section><mcl-checkbox-multiple v-bind="args"></mcl-checkbox-multiple></section>',
  }),
}
