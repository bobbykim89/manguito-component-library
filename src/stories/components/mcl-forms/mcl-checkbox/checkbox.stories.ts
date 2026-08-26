import {
  booleanControllers,
  colorControllers,
  inputSizeControllers,
  textControllers,
} from '@/assets/composables'
import { MclCheckbox, MclFormGroup } from '@/components/mcl-forms/lib'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import MclCheckboxMultiple from './MclCheckboxMultiple.vue'

const meta: Meta<typeof MclCheckbox> = {
  title: 'Components/Form/MclCheckbox',
  component: MclCheckbox,
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
    value: textControllers({
      name: 'value',
      required: false,
      description:
        'value submitted when checked. Native form behaviour only — `v-model` is a boolean and is unaffected by this.',
      category: 'Input Block',
    }),
    invalid: booleanControllers({
      name: 'invalid',
      required: false,
      description:
        'sets `aria-invalid`. Leave it unset to inherit from a surrounding MclFormGroup — `false` and "unset" are deliberately different. This control renders no error region of its own, so the message has to come from the group.',
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
    indicatorColor: colorControllers({
      name: 'indicator-color',
      required: false,
      defaultValue: 'dark-3',
      description: 'color of the check mark',
      category: 'Component Block',
    }),
    borderColor: colorControllers({
      name: 'border-color',
      required: false,
      defaultValue: 'dark-1',
      description: 'border color of checkbox, and its focus-ring color',
      category: 'Component Block',
    }),
    showShadow: booleanControllers({
      name: 'show-shadow',
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
    size: 'md',
    bgColor: 'light-1',
    checkedBgColor: 'warning',
    indicatorColor: 'dark-3',
    borderColor: 'dark-1',
    showShadow: false,
    rounded: false,
    value: 'checkbox-value',
  },
}

export default meta

type Story = StoryObj<typeof MclCheckbox>

export const MclCheckboxVModelExample: Story = {
  render: (args) => ({
    components: { 'mcl-checkbox': MclCheckbox },
    setup() {
      const isChecked = ref<boolean>(false)
      return { args, isChecked }
    },
    template:
      '<section><div class="flex items-center gap-2"><mcl-checkbox v-bind="args" v-model="isChecked"></mcl-checkbox><label :for="args.id">{{ args.value }}</label></div><div class="mt-xs">Checked: {{ isChecked }}</div></section>',
  }),
}

export const MclCheckboxChangeEventExample: Story = {
  render: (args) => ({
    components: { 'mcl-checkbox': MclCheckbox },
    setup() {
      const isChecked = ref<boolean>(false)
      const changeCount = ref<number>(0)
      // `change` carries the native Event; the checked state comes from the
      // model, not from the event payload.
      const onChange = (event: Event): void => {
        changeCount.value += 1
        console.log('native change target:', event.target)
      }
      return { args, isChecked, changeCount, onChange }
    },
    template:
      '<section><div class="flex items-center gap-2"><mcl-checkbox v-bind="args" v-model="isChecked" @change="onChange"></mcl-checkbox><label :for="args.id">{{ args.value }}</label></div><div class="mt-xs">Checked: {{ isChecked }}</div><div>change fired {{ changeCount }} time(s)</div></section>',
  }),
}

export const MclCheckboxInGroupExample: Story = {
  render: (args) => ({
    components: {
      'mcl-checkbox': MclCheckbox,
      'mcl-form-group': MclFormGroup,
    },
    setup() {
      const accepted = ref<boolean>(false)
      return { args, accepted }
    },
    // group-label so the legend labels the set and the inner <label> labels
    // the control itself — a single <label for> on the group would collide
    // with it. The group owns the error region either way: the checkbox
    // renders none of its own, so the group's `invalid` is what surfaces a
    // message.
    template:
      '<mcl-form-group group-label label="Terms" invalid-feedback="You must accept the terms to continue." :invalid="!accepted"><label class="flex items-center gap-2"><mcl-checkbox v-bind="args" v-model="accepted"></mcl-checkbox><span>I accept the terms</span></label></mcl-form-group>',
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
