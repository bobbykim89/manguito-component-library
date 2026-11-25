import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, waitFor } from 'storybook/test'
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
}

export const DropdownOpened: Story = {
  ...dropdownExample,
  name: 'Dropdown Opened',
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Dropdown Button' }),
    )
    const item = await canvas.findByRole('button', {
      name: 'Dropdown item example 1',
    })
    await waitFor(() => expect(item).toBeVisible())
  },
}
