import {
  arrayControllers,
  booleanControllers,
  colorControllers,
  textControllers,
} from '@/assets/composables'
import { MclFormGroup, MclSelect } from '@/components/mcl-forms/lib'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import MclSelectCustomSlot from './MclSelectCustomSlot.vue'
import MclSelectExampleVue from './MclSelectExample.vue'

const selectOptions = [
  { text: 'Item 1', value: 'value 1' },
  { text: 'Item 2', value: 'value 2' },
  { text: 'Item 3', value: 'value 3' },
  { text: 'Item 4', value: 'value 4' },
  { text: 'Item 5', value: 'value 5' },
]

const meta: Meta<typeof MclSelect> = {
  title: 'Components/Form/MclSelect',
  component: MclSelect,
  argTypes: {
    options: arrayControllers({
      name: 'options',
      required: true,
      description:
        'assigns selectable options. Either `string[]` or `{ text, value }[]` — `text` is displayed, `value` is what the model and the form post carry.',
      category: 'Options Block',
    }),
    id: textControllers({
      name: 'id',
      required: false,
      description:
        "assigns id of the component. Omit it inside an MclFormGroup and the control inherits the group's id, which is what binds the group label to it.",
      category: 'Input Block',
    }),
    name: textControllers({
      name: 'name',
      required: false,
      description:
        'submitted field name. Rendered on a hidden input carrying the selected `value`, not on the visible combobox — whose value is the display label. A select with no name contributes nothing to a form.',
      category: 'Input Block',
    }),
    placeholder: textControllers({
      name: 'placeholder',
      required: false,
      description: 'assigns placeholder text',
      defaultValue: '',
      category: 'Input Block',
    }),
    noMatchText: textControllers({
      name: 'no-match-text',
      required: false,
      description: 'assigns text when there is no matching option available',
      defaultValue: 'No match.',
      category: 'Options Block',
    }),
    optionHoverColor: colorControllers({
      name: 'option-hover-color',
      required: false,
      description:
        'background color of the active option — the one Enter would commit, whether it was reached by pointer or by arrow key',
      defaultValue: 'primary',
      category: 'Options Block',
    }),
    showBorder: booleanControllers({
      name: 'show-border',
      required: false,
      description: 'whether or not to display border of the component',
      defaultValue: false,
      category: 'Component Block',
    }),
    borderColor: colorControllers({
      name: 'border-color',
      required: false,
      description:
        'assigns color of the border. Also the open-state ring color when `show-highlight` is off.',
      defaultValue: 'light-4',
      category: 'Component Block',
    }),
    rounded: booleanControllers({
      name: 'rounded',
      required: false,
      description: 'whether or not to have border rounded',
      defaultValue: false,
      category: 'Component Block',
    }),
    textColor: colorControllers({
      name: 'text-color',
      required: false,
      description: 'assigns text color of the component',
      defaultValue: 'black',
      category: 'Component Block',
    }),
    bgColor: colorControllers({
      name: 'bg-color',
      required: false,
      description:
        'assigns background color of the component and background color of options block',
      defaultValue: 'light-1',
      category: 'Component Block',
    }),
    iconColor: colorControllers({
      name: 'icon-color',
      required: false,
      description: 'assigns color of caret and clear icons',
      defaultValue: 'dark-4',
      category: 'Component Block',
    }),
    showShadow: booleanControllers({
      name: 'show-shadow',
      required: false,
      description: 'whether or not to add shadow on the component',
      defaultValue: true,
      category: 'Component Block',
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
        'sets `aria-required`. Unset inherits from a surrounding MclFormGroup.',
      category: 'Validation',
    }),
    disabled: booleanControllers({
      name: 'disabled',
      required: false,
      description:
        'disables the combobox and both buttons, and closes an open listbox. Unset inherits from a surrounding MclFormGroup.',
      category: 'Validation',
    }),
    showHighlight: booleanControllers({
      name: 'show-highlight',
      required: false,
      description:
        'whether or not to display the highlight bar on open. With it off, an open-state ring in `border-color` is emitted instead.',
      defaultValue: true,
      category: 'Highlight',
    }),
    highlightColor: colorControllers({
      name: 'highlight-color',
      required: false,
      description: 'assigns color of highlight',
      defaultValue: 'primary',
      category: 'Highlight',
    }),
  },
  args: {
    id: 'mcl-select',
    showBorder: false,
    borderColor: 'light-4',
    rounded: false,
    showHighlight: true,
    highlightColor: 'primary',
    textColor: 'black',
    bgColor: 'light-1',
    iconColor: 'dark-4',
    optionHoverColor: 'primary',
    placeholder: '',
    showShadow: true,
    noMatchText: 'No match.',
    options: selectOptions,
  },
}

export default meta

type Story = StoryObj<typeof MclSelect>

export const MclSelectExample: Story = {
  render: (args) => ({
    components: { 'mcl-select': MclSelect, 'mcl-form-group': MclFormGroup },
    setup() {
      const selected = ref<string | number | null>(null)
      return { args, selected }
    },
    template:
      '<section class="h-[40vh] rounded bg-light-1 p-md"><mcl-form-group :field-id="args.id" label="MCL Select" help-text="Type to filter; arrow keys move the highlight; Enter commits."><mcl-select v-bind="args" v-model="selected"></mcl-select></mcl-form-group><div class="mt-sm">Model value: {{ selected ?? "(none)" }}</div></section>',
  }),
}

export const MclSelectExampleFloatingUi: Story = {
  render: (args) => ({
    components: { 'mcl-select': MclSelect, 'mcl-form-group': MclFormGroup },
    setup() {
      return { args }
    },
    // The listbox is positioned by floating-ui, so it flips above the input
    // rather than being clipped when there is no room below.
    template:
      '<section class="h-[50vh] bg-warning"></section><section class="h-[40vh] rounded bg-light-1 p-md"><mcl-form-group :field-id="args.id" label="MCL Select"><mcl-select v-bind="args"></mcl-select></mcl-form-group></section><section class="h-[50vh] bg-success"></section>',
  }),
}

export const MclSelectEventsExample: Story = {
  render: (args) => ({
    components: { 'mcl-select': MclSelect, 'mcl-form-group': MclFormGroup },
    setup() {
      const selected = ref<string | number | null>(null)
      const log = ref<string[]>([])
      const record = (entry: string): void => {
        // Newest first, capped so the panel does not grow without bound.
        log.value = [entry, ...log.value].slice(0, 8)
      }
      return {
        args,
        selected,
        log,
        onOpen: () => record('open'),
        onClose: () => record('close'),
        onClear: () => record('clear'),
        onSelect: (value: string | number) => record(`select: ${value}`),
        onChanged: (value: string | number) => record(`changed: ${value}`),
      }
    },
    template:
      '<section class="h-[55vh] rounded bg-light-1 p-md"><mcl-form-group :field-id="args.id" label="Events"><mcl-select v-bind="args" v-model="selected" @open="onOpen" @close="onClose" @clear="onClear" @select="onSelect" @changed="onChanged"></mcl-select></mcl-form-group><div class="mt-sm rounded-md bg-light-2 px-sm py-xs text-sm"><div class="font-bold">Event log (newest first):</div><div v-if="log.length === 0">(nothing yet)</div><div v-for="(entry, idx) in log" :key="idx">{{ entry }}</div></div></section>',
  }),
}

export const MclSelectInvalidFeedbackExample: Story = {
  args: {
    invalidFeedback: 'Choose an option.',
  },
  render: (args) => ({
    components: { 'mcl-select': MclSelect },
    setup() {
      const selected = ref<string | number | null>(null)
      return { args, selected }
    },
    template:
      '<section class="h-[40vh] p-md"><mcl-select v-bind="args" v-model="selected" :invalid="selected === null"></mcl-select></section>',
  }),
}

export const MclSelectExampleStringArrayOptions: Story = {
  render: () => ({
    components: { 'mcl-select-example-vue': MclSelectExampleVue },
    template: '<mcl-select-example-vue></mcl-select-example-vue>',
  }),
}

export const MclSelectExampleCustomSlotExample: Story = {
  render: () => ({
    components: { 'mcl-select-custom-slot': MclSelectCustomSlot },
    template: '<mcl-select-custom-slot></mcl-select-custom-slot>',
  }),
}
