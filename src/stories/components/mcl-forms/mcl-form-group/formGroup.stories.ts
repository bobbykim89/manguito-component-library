import {
  bodyTextControllers,
  booleanControllers,
  colorControllers,
  textControllers,
} from '@/assets/composables'
import {
  MclFormGroup,
  MclInputText,
  MclSelect,
} from '@/components/mcl-forms/lib'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import FormGroupFieldState from './FormGroupFieldState.vue'
import FormGroupRadioSet from './FormGroupRadioSet.vue'

const meta: Meta<typeof MclFormGroup> = {
  title: 'Components/Form/MclFormGroup',
  component: MclFormGroup,
  argTypes: {
    fieldId: textControllers({
      name: 'field-id',
      required: false,
      description:
        "drives both the label's `for` and the descendant control's id. Omit it and an id is generated — the control still picks it up.",
      category: 'Field',
    }),
    groupLabel: booleanControllers({
      name: 'group-label',
      required: false,
      description:
        'render `<fieldset>`/`<legend>` instead of `<label>`, for radio and checkbox sets. In fieldset mode each control generates its own id instead of sharing the group id.',
      defaultValue: false,
      category: 'Field',
    }),
    label: textControllers({
      name: 'label',
      required: false,
      description: 'assigns label text',
      category: 'Label',
    }),
    helpText: textControllers({
      name: 'help-text',
      required: false,
      description:
        'description text rendered under the label and wired to the control through `aria-describedby`',
      category: 'Label',
    }),
    invalidFeedback: textControllers({
      name: 'invalid-feedback',
      required: false,
      description:
        'error text owned by the group rather than the control. Presence of this prop is what makes the group own the error region, and it is decided once at setup — bind it to a string and use `\'\'` for "no error yet", never to a possibly-undefined value.',
      category: 'Validation',
    }),
    invalid: booleanControllers({
      name: 'invalid',
      required: false,
      description:
        'marks the group invalid and cascades to every descendant control that does not set `invalid` itself. A group owning the error region must carry this itself — its controls have already skipped their own region.',
      category: 'Validation',
    }),
    required: booleanControllers({
      name: 'required',
      required: false,
      description:
        'cascades to every descendant control that does not set `required` itself',
      category: 'Validation',
    }),
    disabled: booleanControllers({
      name: 'disabled',
      required: false,
      description:
        'cascades to every descendant control that does not set `disabled` itself',
      category: 'Validation',
    }),
    textColor: colorControllers({
      name: 'text-color',
      required: false,
      description: 'assigns label text color',
      defaultValue: 'dark-3',
      category: 'Text',
    }),
    textSize: bodyTextControllers({
      name: 'text-size',
      required: false,
      description: 'assigns text size for label',
      defaultValue: 'md',
      category: 'Text',
    }),
    textBold: booleanControllers({
      name: 'text-bold',
      required: false,
      description: 'whether or not to get label text bolded',
      defaultValue: false,
      category: 'Text',
    }),
  },
  args: {
    fieldId: 'mcl-form-group-field',
    groupLabel: false,
    label: 'MCL Form Group',
    helpText: '',
    textColor: 'dark-3',
    textSize: 'md',
    textBold: false,
  },
}

export default meta

type Story = StoryObj<typeof MclFormGroup>

export const MclFormGroupExample: Story = {
  render: (args) => ({
    components: {
      'mcl-form-group': MclFormGroup,
      'mcl-input-text': MclInputText,
    },
    setup() {
      return { args }
    },
    // No id on the control: in single-label mode it inherits the group's,
    // which is what binds the label to it.
    template:
      '<mcl-form-group v-bind="args"><mcl-input-text></mcl-input-text></mcl-form-group>',
  }),
}

export const MclCustomLabelExample: Story = {
  render: (args) => ({
    components: {
      'mcl-form-group': MclFormGroup,
      'mcl-input-text': MclInputText,
    },
    setup() {
      return { args }
    },
    template:
      '<mcl-form-group v-bind="args"><template #label><p class="btn btn-secondary mb-sm">{{ args.label }}</p></template><mcl-input-text></mcl-input-text></mcl-form-group>',
  }),
}

export const MclFormGroupHelpTextExample: Story = {
  args: {
    label: 'Display name',
    helpText: 'Shown on your public profile. 3-20 characters.',
  },
  render: (args) => ({
    components: {
      'mcl-form-group': MclFormGroup,
      'mcl-input-text': MclInputText,
    },
    setup() {
      return { args }
    },
    template:
      '<mcl-form-group v-bind="args"><mcl-input-text placeholder="manguito"></mcl-input-text></mcl-form-group>',
  }),
}

export const MclFormGroupCustomHelpSlotExample: Story = {
  args: {
    label: 'API token',
    helpText: 'placeholder, overridden by the slot',
  },
  render: (args) => ({
    components: {
      'mcl-form-group': MclFormGroup,
      'mcl-input-text': MclInputText,
    },
    setup() {
      return { args }
    },
    template:
      '<mcl-form-group v-bind="args"><template #help><span class="text-xs">Find this under <span class="font-bold">Settings &rarr; Developer</span>.</span></template><mcl-input-text placeholder="tok_..."></mcl-input-text></mcl-form-group>',
  }),
}

export const MclFormGroupOwnedFeedbackExample: Story = {
  args: {
    label: 'Email address',
    helpText: 'We only use this for account recovery.',
    invalidFeedback: 'Enter a valid email address.',
    invalid: true,
  },
  render: (args) => ({
    components: {
      'mcl-form-group': MclFormGroup,
      'mcl-input-text': MclInputText,
    },
    setup() {
      return { args }
    },
    // The group owns the error region here, so the control renders none of
    // its own and points aria-describedby at the group's.
    template:
      '<mcl-form-group v-bind="args"><mcl-input-text type="email" placeholder="you@example.com"></mcl-input-text></mcl-form-group>',
  }),
}

export const MclFormGroupCustomFeedbackSlotExample: Story = {
  args: {
    label: 'Email address',
    invalidFeedback: '',
    invalid: true,
  },
  render: (args) => ({
    components: {
      'mcl-form-group': MclFormGroup,
      'mcl-input-text': MclInputText,
    },
    setup() {
      return { args }
    },
    template:
      '<mcl-form-group v-bind="args"><template #invalid-feedback><p class="text-md font-bold text-warning">That address is already registered.</p></template><mcl-input-text type="email"></mcl-input-text></mcl-form-group>',
  }),
}

export const MclFormGroupCascadeExample: Story = {
  render: () => ({
    components: { 'form-group-field-state': FormGroupFieldState },
    template: '<form-group-field-state></form-group-field-state>',
  }),
}

export const MclFormGroupRadioSetExample: Story = {
  render: () => ({
    components: { 'form-group-radio-set': FormGroupRadioSet },
    template: '<form-group-radio-set></form-group-radio-set>',
  }),
}

export const MclFormGroupWithSelectExample: Story = {
  args: {
    label: 'Favourite bird',
    helpText: 'Start typing to filter the list.',
  },
  render: (args) => ({
    components: { 'mcl-form-group': MclFormGroup, 'mcl-select': MclSelect },
    setup() {
      const options = ['Manguito', 'Pollito', 'Lovebird', 'Cockatiel']
      return { args, options }
    },
    template:
      '<section class="min-h-[40vh]"><mcl-form-group v-bind="args"><mcl-select :options="options"></mcl-select></mcl-form-group></section>',
  }),
}
