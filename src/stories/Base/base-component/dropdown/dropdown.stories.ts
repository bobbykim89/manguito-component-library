import type { Meta, StoryObj } from '@storybook/vue3'
import Dropdown from './Dropdown.vue'

const meta: Meta<typeof Dropdown> = {
  title: 'Base/Base Component/Dropdown Component',
}
export default meta

type Story = StoryObj<typeof Dropdown>
export const dropdownExample: Story = {
  render: () => ({
    components: { dropdown: Dropdown },
    template: '<dropdown></dropdown>',
  }),
  parameters: {
    controls: { disable: true },
  },
}
