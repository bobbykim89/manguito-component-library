import {
  booleanControllers,
  colorControllers,
  switchSizeControllers,
  textControllers,
} from '@/assets/composables'
import { MclFormGroup, MclInputSwitch } from '@/components/mcl-forms/lib'
import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

const meta: Meta<typeof MclInputSwitch> = {
  title: 'Components/Form/MclInputSwitch',
  component: MclInputSwitch,
  argTypes: {
    id: textControllers({
      name: 'id',
      required: true,
      description: 'assigns id of component',
      category: 'Input Block',
    }),
    sliderColor: colorControllers({
      name: 'slider-color',
      required: false,
      description: 'assigns color of switch slider',
      defaultValue: 'light-1',
      category: 'Switch Block',
    }),
    onColor: colorControllers({
      name: 'on-color',
      required: false,
      description: 'assigns switch color when it is checked',
      defaultValue: 'success',
      category: 'Switch Block',
    }),
    offColor: colorControllers({
      name: 'off-color',
      required: false,
      description: 'assigns switch color when it is unchecked',
      defaultValue: 'dark-1',
      category: 'Switch Block',
    }),
    switchSize: switchSizeControllers({
      name: 'switch-size',
      required: false,
      description: 'assigns size of switch between sm|md|lg',
      defaultValue: 'md',
      category: 'Switch Block',
    }),
    rounded: booleanControllers({
      name: 'rounded',
      required: false,
      description: 'whether or not to have switch to have rounded corner',
      defaultValue: true,
      category: 'Switch Block',
    }),
  },
  args: {
    id: 'mcl-input-switch',
    sliderColor: 'light-1',
    onColor: 'success',
    offColor: 'dark-1',
    switchSize: 'md',
    rounded: true,
  },
}

export default meta

type Story = StoryObj<typeof MclInputSwitch>
export const MclInputSwitchExample: Story = {
  render: (args) => ({
    components: {
      'mcl-input-switch': MclInputSwitch,
      'mcl-form-group': MclFormGroup,
    },
    setup() {
      return { args }
    },
    template:
      '<mcl-form-group :label-for="args.id" label="MCL Input Switch"><mcl-input-switch v-bind="args"></mcl-input-switch></mcl-form-group>',
  }),
}

export const MclInputSwitchExample2: Story = {
  render: (args) => ({
    components: {
      'mcl-input-switch': MclInputSwitch,
      'mcl-form-group': MclFormGroup,
    },
    setup() {
      const statusRef = ref<boolean>(true)
      return { args, statusRef }
    },
    template:
      '<section class="bg-light-1 rounded-md px-sm py-md"><mcl-form-group :label-for="args.id" label="MCL Input Switch Example 2"><mcl-input-switch v-bind="args" v-model="statusRef"></mcl-input-switch></mcl-form-group><div class="mt-xs">Switch status: {{ statusRef }}</div></section>',
  }),
}
