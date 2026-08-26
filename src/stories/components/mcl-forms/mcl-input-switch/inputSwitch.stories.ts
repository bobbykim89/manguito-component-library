import {
  booleanControllers,
  colorControllers,
  inputSizeControllers,
  textControllers,
} from '@/assets/composables'
import { MclFormGroup, MclInputSwitch } from '@/components/mcl-forms/lib'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

const meta: Meta<typeof MclInputSwitch> = {
  title: 'Components/Form/MclInputSwitch',
  component: MclInputSwitch,
  argTypes: {
    id: textControllers({
      name: 'id',
      required: false,
      description:
        "assigns id of the input. Omit it inside an MclFormGroup and the control inherits the group's id, which is what binds the group label to it.",
      category: 'Input Block',
    }),
    name: textControllers({
      name: 'name',
      required: false,
      description:
        'submitted field name. Inherited from a surrounding MclFormGroup when omitted; never falls back to the generated id.',
      category: 'Input Block',
    }),
    invalid: booleanControllers({
      name: 'invalid',
      required: false,
      description:
        'sets `aria-invalid`. Leave it unset to inherit from a surrounding MclFormGroup. This control renders no error region of its own, so the message has to come from the group.',
      category: 'Validation',
    }),
    required: booleanControllers({
      name: 'required',
      required: false,
      description:
        'marks the input required. Unset inherits from a surrounding MclFormGroup.',
      category: 'Validation',
    }),
    disabled: booleanControllers({
      name: 'disabled',
      required: false,
      description:
        'disables the input. Unset inherits from a surrounding MclFormGroup.',
      category: 'Validation',
    }),
    size: inputSizeControllers({
      name: 'size',
      required: false,
      description: 'assigns size of switch between sm|md|lg',
      defaultValue: 'md',
      category: 'Switch Block',
    }),
    bgColor: colorControllers({
      name: 'bg-color',
      required: false,
      description: 'the track color when off',
      defaultValue: 'dark-1',
      category: 'Switch Block',
    }),
    checkedBgColor: colorControllers({
      name: 'checked-bg-color',
      required: false,
      description: 'the track color when on',
      defaultValue: 'success',
      category: 'Switch Block',
    }),
    indicatorColor: colorControllers({
      name: 'indicator-color',
      required: false,
      description: 'the sliding knob color',
      defaultValue: 'light-1',
      category: 'Switch Block',
    }),
    borderColor: colorControllers({
      name: 'border-color',
      required: false,
      description: 'border color of the track, and its focus-ring color',
      defaultValue: 'dark-1',
      category: 'Switch Block',
    }),
    showShadow: booleanControllers({
      name: 'show-shadow',
      required: false,
      description: 'whether or not to add shadow on the switch',
      defaultValue: false,
      category: 'Switch Block',
    }),
    rounded: booleanControllers({
      name: 'rounded',
      required: false,
      description:
        'whether or not the switch is a full pill with a round knob. Set false for a soft rectangle.',
      defaultValue: true,
      category: 'Switch Block',
    }),
  },
  args: {
    id: 'mcl-input-switch',
    size: 'md',
    bgColor: 'dark-1',
    checkedBgColor: 'success',
    indicatorColor: 'light-1',
    borderColor: 'dark-1',
    showShadow: false,
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
      const statusRef = ref<boolean>(false)
      return { args, statusRef }
    },
    template:
      '<mcl-form-group :field-id="args.id" label="MCL Input Switch"><mcl-input-switch v-bind="args" v-model="statusRef"></mcl-input-switch></mcl-form-group>',
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
      '<section class="rounded-md bg-light-1 px-sm py-md"><mcl-form-group :field-id="args.id" label="MCL Input Switch Example 2" help-text="The control carries role=switch for you; Space toggles it."><mcl-input-switch v-bind="args" v-model="statusRef"></mcl-input-switch></mcl-form-group><div class="mt-xs">Switch status: {{ statusRef }}</div></section>',
  }),
}

export const MclInputSwitchChangeEventExample: Story = {
  render: (args) => ({
    components: {
      'mcl-input-switch': MclInputSwitch,
      'mcl-form-group': MclFormGroup,
    },
    setup() {
      const statusRef = ref<boolean>(false)
      const changeCount = ref<number>(0)
      const onChange = (): void => {
        changeCount.value += 1
      }
      return { args, statusRef, changeCount, onChange }
    },
    template:
      '<section><mcl-form-group :field-id="args.id" label="Change event"><mcl-input-switch v-bind="args" v-model="statusRef" @change="onChange"></mcl-input-switch></mcl-form-group><div class="mt-xs">Status: {{ statusRef }}</div><div>change fired {{ changeCount }} time(s)</div></section>',
  }),
}

export const MclInputSwitchDisabledExample: Story = {
  render: (args) => ({
    components: {
      'mcl-input-switch': MclInputSwitch,
      'mcl-form-group': MclFormGroup,
    },
    setup() {
      const statusRef = ref<boolean>(true)
      return { args, statusRef }
    },
    // `disabled` is set on the group, not the control — it cascades down.
    template:
      '<mcl-form-group :field-id="args.id" label="Disabled by the group" help-text="The switch sets no disabled prop of its own." disabled><mcl-input-switch v-bind="args" v-model="statusRef"></mcl-input-switch></mcl-form-group>',
  }),
}
