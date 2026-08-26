import {
  booleanControllers,
  colorControllers,
  inputTypeControllers,
  numberControllers,
  textControllers,
} from '@/assets/composables'
import { MclFormGroup, MclInputText } from '@/components/mcl-forms/lib'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import MclInputTextWithLabel from './MclInputTextWithLabel.vue'

const meta: Meta<typeof MclInputText> = {
  title: 'Components/Form/MclInputText',
  component: MclInputText,
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
        'submitted field name. Inherited from a surrounding MclFormGroup when omitted; deliberately never falls back to the generated id, so a nameless input posts nothing.',
      category: 'Input Block',
    }),
    type: inputTypeControllers({
      name: 'type',
      required: false,
      description: 'assigns accepted type of input for the component',
      defaultValue: 'text',
      category: 'Input Block',
    }),
    placeholder: textControllers({
      name: 'placeholder',
      required: false,
      description: 'assigns placeholder text for the input',
      category: 'Input Block',
    }),
    autocomplete: textControllers({
      name: 'autocomplete',
      required: false,
      description:
        'native autocomplete token, e.g. `email` or `current-password`',
      category: 'Input Block',
    }),
    showBorder: booleanControllers({
      name: 'show-border',
      required: false,
      description: 'whether or not to display border of the input component',
      defaultValue: false,
      category: 'Input Block',
    }),
    borderColor: colorControllers({
      name: 'border-color',
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
    textColor: colorControllers({
      name: 'text-color',
      required: false,
      description: 'assigns text color of the input component',
      defaultValue: 'black',
      category: 'Input Block',
    }),
    showShadow: booleanControllers({
      name: 'show-shadow',
      required: false,
      description: 'whether or not to add drop shadow around component',
      defaultValue: true,
      category: 'Input Block',
    }),
    pattern: textControllers({
      name: 'pattern',
      required: false,
      description: 'assigns patterns to validate input data',
      category: 'Validation',
    }),
    minLength: numberControllers({
      name: 'min-length',
      required: false,
      description: 'assigns min length to validate input data',
      category: 'Validation',
    }),
    maxLength: numberControllers({
      name: 'max-length',
      required: false,
      description: 'assigns max length to validate input data',
      category: 'Validation',
    }),
    invalidFeedback: textControllers({
      name: 'invalid-feedback',
      required: false,
      description:
        'error text rendered by this control. It only appears while `invalid` resolves true — the region is conditional so `role="alert"` announces on insertion. Ignored when a surrounding MclFormGroup owns the error region.',
      category: 'Validation',
    }),
    invalid: booleanControllers({
      name: 'invalid',
      required: false,
      description:
        'sets `aria-invalid` and reveals the error region. Leave it unset to inherit from a surrounding MclFormGroup — `false` and "unset" are deliberately different.',
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
    showHighlight: booleanControllers({
      name: 'show-highlight',
      required: false,
      description:
        'whether or not to add highlight at the bottom of input component. With it off, a focus-visible ring is emitted instead.',
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
    showBorder: false,
    borderColor: 'light-4',
    rounded: false,
    showHighlight: true,
    highlightColor: 'primary',
    bgColor: 'light-1',
    textColor: 'black',
    placeholder: '',
    type: 'text',
    showShadow: true,
  },
}

export default meta

type Story = StoryObj<typeof MclInputText>

export const MclInputTextExample: Story = {
  render: (args) => ({
    components: { 'mcl-input-text': MclInputText },
    setup() {
      const value = ref<string>('')
      return { args, value }
    },
    template:
      '<section><mcl-input-text v-bind="args" v-model="value"></mcl-input-text><div class="mt-xs">Value: {{ value || "(empty)" }}</div></section>',
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

export const MclInputTextInvalidFeedbackExample: Story = {
  args: {
    invalidFeedback: 'Enter at least 3 characters.',
    minLength: 3,
    // Without this the region does not render at all: FieldFeedback is
    // conditional on `invalid`, so `invalidFeedback` alone shows nothing.
    invalid: true,
  },
  render: (args) => ({
    components: { 'mcl-input-text': MclInputText },
    setup() {
      return { args }
    },
    template: '<mcl-input-text v-bind="args"></mcl-input-text>',
  }),
}

export const MclInputTextCustomInvalidFeedback: Story = {
  args: {
    invalidFeedback: 'overridden by the slot',
    invalid: true,
  },
  render: (args) => ({
    components: { 'mcl-input-text': MclInputText },
    setup() {
      return { args }
    },
    template:
      '<mcl-input-text v-bind="args"><template #invalid-feedback><div><p class="text-md font-bold text-warning">That username is taken.</p></div></template></mcl-input-text>',
  }),
}

export const MclInputTextLiveValidationExample: Story = {
  render: (args) => ({
    components: {
      'mcl-input-text': MclInputText,
      'mcl-form-group': MclFormGroup,
    },
    setup() {
      const email = ref<string>('')
      // A plain computed is enough: `invalid` is just a boolean the control
      // resolves, whether it comes from the control or the group.
      const isInvalid = ref<boolean>(false)
      const onInput = (): void => {
        isInvalid.value = email.value !== '' && !email.value.includes('@')
      }
      return { args, email, isInvalid, onInput }
    },
    template:
      '<mcl-form-group :field-id="args.id" label="Email address" help-text="Validation runs as you type." invalid-feedback="That does not look like an email address." :invalid="isInvalid"><mcl-input-text v-bind="args" type="email" v-model="email" placeholder="you@example.com" @input="onInput"></mcl-input-text></mcl-form-group>',
  }),
}

export const MclInputTextDisabledExample: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    components: { 'mcl-input-text': MclInputText },
    setup() {
      return { args }
    },
    template:
      '<mcl-input-text v-bind="args" model-value="Cannot edit this"></mcl-input-text>',
  }),
}
