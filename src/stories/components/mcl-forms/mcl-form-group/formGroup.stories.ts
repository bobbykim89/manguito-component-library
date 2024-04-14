import {
  bodyTextControllers,
  booleanControllers,
  colorControllers,
  textControllers,
} from '@/assets/composables'
import { MclFormGroup } from '@/components/mcl-forms/lib'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof MclFormGroup> = {
  title: 'Components/Form/MclFormGroup',
  argTypes: {
    labelFor: textControllers({
      name: 'label-for',
      required: true,
      description: 'assigns target id for the label',
      category: 'Label',
    }),
    label: textControllers({
      name: 'label',
      required: false,
      description: 'assigns label text',
      category: 'Label',
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
    labelFor: 'input-text',
    label: 'MCL Form Group',
    textColor: 'dark-3',
    textSize: 'md',
    textBold: false,
  },
}

export default meta

type Story = StoryObj<typeof MclFormGroup>
export const MclFormGroupExample: Story = {
  render: (args) => ({
    components: { 'mcl-form-group': MclFormGroup },
    setup() {
      return { args }
    },
    template:
      '<mcl-form-group v-bind="args"><input class="block border" type="text" :id="args.labelFor" /></mcl-form-group>',
  }),
}

export const MclCustomLabelExample: Story = {
  render: (args) => ({
    components: { 'mcl-form-group': MclFormGroup },
    setup() {
      return { args }
    },
    template:
      '<mcl-form-group v-bind="args"><template #label><p class="btn btn-secondary mb-sm">{{args.label}}</p></template><input class="block border" type="text" :id="args.labelFor" /></mcl-form-group>',
  }),
}
