import {
  booleanControllers,
  colorControllers,
  textControllers,
} from '@/assets/composables'
import { MclFormGroup, MclInputFile } from '@/components/mcl-forms/lib'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

const meta: Meta<typeof MclInputFile> = {
  title: 'Components/Form/MclInputFile',
  component: MclInputFile,
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
        'submitted field name. Inherited from a surrounding MclFormGroup when omitted; deliberately never falls back to the generated id.',
      category: 'Input Block',
    }),
    accept: textControllers({
      name: 'accept',
      required: false,
      description: 'assigns accepted file type of input',
      defaultValue: 'image/jpg,image/jpeg,image/png',
      category: 'Input Block',
    }),
    showBorder: booleanControllers({
      name: 'show-border',
      required: false,
      description: 'whether or not to display border of component',
      defaultValue: false,
      category: 'Input Block',
    }),
    borderColor: colorControllers({
      name: 'border-color',
      required: false,
      description: 'assigns border color of the component',
      defaultValue: 'light-4',
      category: 'Input Block',
    }),
    bgColor: colorControllers({
      name: 'bg-color',
      required: false,
      description: 'assigns background color of the component',
      defaultValue: 'light-1',
      category: 'Input Block',
    }),
    rounded: booleanControllers({
      name: 'rounded',
      required: false,
      description: 'whether or not to have rounded border',
      defaultValue: false,
      category: 'Input Block',
    }),
    showShadow: booleanControllers({
      name: 'show-shadow',
      required: false,
      description: 'whether or not to add shadow to component',
      defaultValue: true,
      category: 'Input Block',
    }),
    textColor: colorControllers({
      name: 'text-color',
      required: false,
      description: 'assigns text color inside input',
      defaultValue: 'black',
      category: 'Input Block',
    }),
    buttonText: textControllers({
      name: 'button-text',
      required: false,
      description: 'assigns text inside the button left side of component',
      defaultValue: 'Browse File',
      category: 'Button Block',
    }),
    buttonTextColor: colorControllers({
      name: 'button-text-color',
      required: false,
      description: 'assigns text color inside the button',
      defaultValue: 'dark-3',
      category: 'Button Block',
    }),
    buttonColor: colorControllers({
      name: 'button-color',
      required: false,
      description: 'assigns the color of button',
      defaultValue: 'light-4',
      category: 'Button Block',
    }),
    showClear: booleanControllers({
      name: 'show-clear',
      required: false,
      description:
        'whether or not to display clear button on right side of component. It is a `type="button"`, so it never submits a surrounding form.',
      defaultValue: false,
      category: 'Button Block',
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
        'whether or not to make input value required. Unset inherits from a surrounding MclFormGroup.',
      category: 'Validation',
    }),
    disabled: booleanControllers({
      name: 'disabled',
      required: false,
      description:
        'disables the input and both buttons. Unset inherits from a surrounding MclFormGroup.',
      category: 'Validation',
    }),
  },
  args: {
    id: 'mcl-input-file',
    showBorder: false,
    borderColor: 'light-4',
    bgColor: 'light-1',
    rounded: false,
    showShadow: true,
    textColor: 'black',
    accept: 'image/jpg,image/jpeg,image/png',
    buttonText: 'Browse File',
    buttonTextColor: 'dark-3',
    buttonColor: 'light-4',
    showClear: false,
  },
}

export default meta

type Story = StoryObj<typeof MclInputFile>

export const MclInputFileExample: Story = {
  render: (args) => ({
    components: {
      'mcl-input-file': MclInputFile,
      'mcl-form-group': MclFormGroup,
    },
    setup() {
      const fileRef = ref<File | null>(null)
      return { args, fileRef }
    },
    template:
      '<section><mcl-form-group :field-id="args.id" label="MCL Input File"><mcl-input-file v-bind="args" v-model="fileRef"></mcl-input-file></mcl-form-group><div class="mt-sm">Selected file name: {{ fileRef ? fileRef.name : "(none)" }}</div></section>',
  }),
}

export const MclInputFileClearableExample: Story = {
  args: {
    showClear: true,
  },
  render: (args) => ({
    components: {
      'mcl-input-file': MclInputFile,
      'mcl-form-group': MclFormGroup,
    },
    setup() {
      const fileRef = ref<File | null>(null)
      return { args, fileRef }
    },
    // Clearing remounts the underlying input — the only reliable way to reset
    // a file input's value across browsers.
    template:
      '<section><mcl-form-group :field-id="args.id" label="Avatar" help-text="JPG or PNG. Use the clear button to reset the field."><mcl-input-file v-bind="args" v-model="fileRef"></mcl-input-file></mcl-form-group><div class="mt-sm">Selected file name: {{ fileRef ? fileRef.name : "(none)" }}</div></section>',
  }),
}

export const MclInputFileInvalidFeedbackExample: Story = {
  args: {
    showClear: true,
    invalidFeedback: 'A file is required.',
  },
  render: (args) => ({
    components: { 'mcl-input-file': MclInputFile },
    setup() {
      const fileRef = ref<File | null>(null)
      return { args, fileRef }
    },
    // `invalid` is driven by state rather than being a fixed arg, so the
    // message clears once a file is chosen.
    template:
      '<mcl-input-file v-bind="args" v-model="fileRef" :invalid="fileRef === null"></mcl-input-file>',
  }),
}

export const MclInputFileCustomInvalidFeedback: Story = {
  args: {
    invalid: true,
    invalidFeedback: 'overridden by the slot',
  },
  render: (args) => ({
    components: { 'mcl-input-file': MclInputFile },
    setup() {
      return { args }
    },
    template:
      '<mcl-input-file v-bind="args"><template #invalid-feedback><p class="text-md font-bold text-warning">That file is larger than 2&nbsp;MB.</p></template></mcl-input-file>',
  }),
}

export const MclInputFileDisabledExample: Story = {
  args: {
    showClear: true,
  },
  render: (args) => ({
    components: {
      'mcl-input-file': MclInputFile,
      'mcl-form-group': MclFormGroup,
    },
    setup() {
      const fileRef = ref<File | null>(null)
      return { args, fileRef }
    },
    // `disabled` set on the group cascades to the input and both buttons.
    template:
      '<mcl-form-group :field-id="args.id" label="Attachment" help-text="Disabled by the group, not by the control." disabled><mcl-input-file v-bind="args" v-model="fileRef"></mcl-input-file></mcl-form-group>',
  }),
}
