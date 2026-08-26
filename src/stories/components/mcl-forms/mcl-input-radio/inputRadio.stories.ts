import {
  booleanControllers,
  colorControllers,
  inputSizeControllers,
  textControllers,
} from '@/assets/composables'
import { MclFormGroup, MclInputRadio } from '@/components/mcl-forms/lib'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import InputRadioExampleA from './InputRadioExampleA.vue'

const meta: Meta<typeof MclInputRadio> = {
  title: 'Components/Form/MclInputRadio',
  component: MclInputRadio,
  argTypes: {
    id: textControllers({
      name: 'id',
      required: false,
      description:
        "assigns id of the input. Omit it inside an MclFormGroup and the control inherits the group's id — except in `group-label` mode, where each radio generates its own.",
      category: 'Input Block',
    }),
    name: textControllers({
      name: 'name',
      required: false,
      description:
        'the attribute that makes a set of radios behave as one group. Inherited from a surrounding MclFormGroup when omitted, and — uniquely among these controls — falls back to the resolved id rather than being left empty.',
      category: 'Input Block',
    }),
    value: textControllers({
      name: 'value',
      required: false,
      description:
        'the value this radio contributes to the shared `v-model` when selected',
      defaultValue: '',
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
      description: 'assigns size of component',
      defaultValue: 'md',
      category: 'Component Block',
    }),
    bgColor: colorControllers({
      name: 'bg-color',
      required: false,
      description: 'background color of the unselected radio',
      defaultValue: 'light-1',
      category: 'Component Block',
    }),
    checkedBgColor: colorControllers({
      name: 'checked-bg-color',
      required: false,
      description: 'background color of the selected radio',
      defaultValue: 'success',
      category: 'Component Block',
    }),
    indicatorColor: colorControllers({
      name: 'indicator-color',
      required: false,
      description: 'color of the inner dot',
      defaultValue: 'light-1',
      category: 'Component Block',
    }),
    borderColor: colorControllers({
      name: 'border-color',
      required: false,
      description: 'border color of the radio, and its focus-ring color',
      defaultValue: 'dark-1',
      category: 'Component Block',
    }),
    showShadow: booleanControllers({
      name: 'show-shadow',
      required: false,
      description: 'whether or not to add drop shadow on the component',
      defaultValue: false,
      category: 'Component Block',
    }),
  },
  args: {
    size: 'md',
    bgColor: 'light-1',
    checkedBgColor: 'success',
    indicatorColor: 'light-1',
    borderColor: 'dark-1',
    showShadow: false,
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
      const selected = ref<string | number | null>('second')
      const items = [
        { value: 'first', text: 'First option' },
        { value: 'second', text: 'Second option' },
        { value: 'third', text: 'Third option' },
      ]
      return { args, selected, items }
    },
    // One v-model shared across the set, one `value` per radio. That is the
    // whole grouping mechanism — there is no `checked` prop any more.
    template:
      '<section><mcl-form-group group-label label="MCL Input Radio" text-bold><label v-for="item in items" :key="item.value" class="mb-2xs flex items-center gap-2xs last:mb-0"><mcl-input-radio v-bind="args" v-model="selected" :value="item.value" name="radio-example"></mcl-input-radio><span>{{ item.text }}</span></label></mcl-form-group><div class="mt-sm">Selected: {{ selected }}</div></section>',
  }),
}

export const MclInputRadioChangeEventExample: Story = {
  render: (args) => ({
    components: {
      'mcl-input-radio': MclInputRadio,
      'mcl-form-group': MclFormGroup,
    },
    setup() {
      const selected = ref<string | number | null>(null)
      const changeCount = ref<number>(0)
      const items = [
        { value: 'yes', text: 'Yes' },
        { value: 'no', text: 'No' },
      ]
      // `change` carries the native Event only; the selected value comes from
      // the model.
      const onChange = (): void => {
        changeCount.value += 1
      }
      return { args, selected, items, changeCount, onChange }
    },
    template:
      '<section><mcl-form-group group-label label="Change event" text-bold><label v-for="item in items" :key="item.value" class="mb-2xs flex items-center gap-2xs last:mb-0"><mcl-input-radio v-bind="args" v-model="selected" :value="item.value" name="radio-change" @change="onChange"></mcl-input-radio><span>{{ item.text }}</span></label></mcl-form-group><div class="mt-sm">Selected: {{ selected ?? "(none)" }}</div><div>change fired {{ changeCount }} time(s)</div></section>',
  }),
}

export const MclInputRadioInvalidExample: Story = {
  render: (args) => ({
    components: {
      'mcl-input-radio': MclInputRadio,
      'mcl-form-group': MclFormGroup,
    },
    setup() {
      const selected = ref<string | number | null>(null)
      const items = [
        { value: 'card', text: 'Card' },
        { value: 'transfer', text: 'Bank transfer' },
      ]
      return { args, selected, items }
    },
    // Radios render no error region of their own, so the group has to own it —
    // and a group that owns one must carry `invalid` itself.
    template:
      '<mcl-form-group group-label label="Payment method" text-bold invalid-feedback="Choose a payment method." :invalid="selected === null"><label v-for="item in items" :key="item.value" class="mb-2xs flex items-center gap-2xs last:mb-0"><mcl-input-radio v-bind="args" v-model="selected" :value="item.value" name="radio-invalid"></mcl-input-radio><span>{{ item.text }}</span></label></mcl-form-group>',
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
