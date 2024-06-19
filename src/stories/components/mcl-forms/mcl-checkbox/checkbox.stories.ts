import {
  bodyTextControllers,
  booleanControllers,
  colorControllers,
  textControllers,
} from '@/assets/composables'
import { MclCheckbox } from '@/components/mcl-forms/lib'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof MclCheckbox> = {
  title: 'Components/Form/MclCheckbox',
}

export default meta

type Story = StoryObj<typeof MclCheckbox>
export const MclCheckboxExample: Story = {
  render: (args) => ({
    components: { 'mcl-checkbox': MclCheckbox },
    setup() {
      return { args }
    },
    template: '<mcl-checkbox v-bind="args"></mcl-checkbox>',
  }),
}
