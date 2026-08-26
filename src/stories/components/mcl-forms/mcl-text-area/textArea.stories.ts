import {
  booleanControllers,
  colorControllers,
  numberControllers,
  textControllers,
} from '@/assets/composables'
import { MclFormGroup, MclTextArea } from '@/components/mcl-forms/lib'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import MclTextAreaWithLabel from './MclTextAreaWithLabel.vue'

const meta: Meta<typeof MclTextArea> = {
  title: 'Components/Form/MclTextArea',
  component: MclTextArea,
  argTypes: {
    id: textControllers({
      name: 'id',
      required: false,
      description:
        "assigns id of the textarea. Omit it inside an MclFormGroup and the control inherits the group's id, which is what binds the group label to it.",
      category: 'Input Block',
    }),
    name: textControllers({
      name: 'name',
      required: false,
      description:
        'submitted field name. Inherited from a surrounding MclFormGroup when omitted; deliberately never falls back to the generated id.',
      category: 'Input Block',
    }),
    placeholder: textControllers({
      name: 'placeholder',
      required: false,
      description: 'assigns placeholder text for the input',
      category: 'Input Block',
    }),
    rows: numberControllers({
      name: 'rows',
      required: false,
      description: 'assigns numbers of rows for this component',
      defaultValue: 5,
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
    invalidFeedback: textControllers({
      name: 'invalid-feedback',
      required: false,
      description:
        'error text rendered by this control. It only appears while `invalid` resolves true. Ignored when a surrounding MclFormGroup owns the error region.',
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
        'marks the textarea required. Unset inherits from a surrounding MclFormGroup.',
      category: 'Validation',
    }),
    disabled: booleanControllers({
      name: 'disabled',
      required: false,
      description:
        'disables the textarea. Unset inherits from a surrounding MclFormGroup.',
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
    id: 'mcl-text-area',
    showBorder: false,
    borderColor: 'light-4',
    rounded: false,
    showHighlight: true,
    highlightColor: 'primary',
    bgColor: 'light-1',
    textColor: 'black',
    placeholder: '',
    showShadow: true,
    rows: 5,
  },
}

export default meta

type Story = StoryObj<typeof MclTextArea>

export const MclTextAreaExample: Story = {
  render: (args) => ({
    components: { 'mcl-text-area': MclTextArea },
    setup() {
      const value = ref<string>('')
      return { args, value }
    },
    template:
      '<section><mcl-text-area v-bind="args" v-model="value"></mcl-text-area><div class="mt-xs">{{ value.length }} character(s)</div></section>',
  }),
}

export const MclTextAreaWithLabelExample: Story = {
  render: () => ({
    components: { 'mcl-text-area-with-label': MclTextAreaWithLabel },
    template: '<mcl-text-area-with-label></mcl-text-area-with-label>',
  }),
}

export const MclTextAreaInvalidFeedbackExample: Story = {
  args: {
    invalidFeedback: 'Tell us a little more — 20 characters minimum.',
    // The error region is conditional on `invalid`; `invalidFeedback` alone
    // renders nothing.
    invalid: true,
  },
  render: (args) => ({
    components: { 'mcl-text-area': MclTextArea },
    setup() {
      return { args }
    },
    template: '<mcl-text-area v-bind="args"></mcl-text-area>',
  }),
}

export const MclTextAreaCustomInvalidFeedback: Story = {
  args: {
    invalidFeedback: 'overridden by the slot',
    invalid: true,
  },
  render: (args) => ({
    components: { 'mcl-text-area': MclTextArea },
    setup() {
      return { args }
    },
    template:
      '<mcl-text-area v-bind="args"><template #invalid-feedback><p class="text-md font-bold text-warning">This field cannot be left blank.</p></template></mcl-text-area>',
  }),
}

export const MclTextAreaInGroupExample: Story = {
  render: (args) => ({
    components: {
      'mcl-text-area': MclTextArea,
      'mcl-form-group': MclFormGroup,
    },
    setup() {
      const notes = ref<string>('')
      return { args, notes }
    },
    // The group owns the error region here, so the textarea renders none of
    // its own and points aria-describedby at the group's.
    template:
      '<mcl-form-group :field-id="args.id" label="Notes" help-text="Markdown is supported." invalid-feedback="Notes cannot be empty." :invalid="notes.length === 0"><mcl-text-area v-bind="args" v-model="notes" :rows="4"></mcl-text-area></mcl-form-group>',
  }),
}
