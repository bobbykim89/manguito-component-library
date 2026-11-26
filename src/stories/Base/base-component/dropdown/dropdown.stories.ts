import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, waitFor } from 'storybook/test'
import Dropdown from './Dropdown.vue'

const meta: Meta<typeof Dropdown> = {
  title: 'Base/Base Component/Dropdown Component',
  parameters: { a11y: { test: 'error' } },
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

// Keyboard (#128): open from the keyboard, Tab into the menu, and Escape
// closes it and returns focus to the toggler.
export const DropdownKeyboard: Story = {
  ...dropdownExample,
  name: 'Dropdown Keyboard',
  play: async ({ canvas, userEvent }) => {
    const toggler = canvas.getByRole('button', { name: 'Dropdown Button' })
    await expect(toggler).toHaveAttribute('aria-expanded', 'false')

    await userEvent.tab()
    await expect(toggler).toHaveFocus()
    await userEvent.keyboard('{Enter}')
    await waitFor(() =>
      expect(toggler).toHaveAttribute('aria-expanded', 'true'),
    )
    const item = await canvas.findByRole('button', {
      name: 'Dropdown item example 1',
    })
    await waitFor(() => expect(item).toBeVisible())
    await expect(toggler).toHaveAttribute(
      'aria-controls',
      item.closest('[id]')?.id,
    )

    await userEvent.tab()
    await expect(item).toHaveFocus()

    await userEvent.keyboard('{Escape}')
    await waitFor(() =>
      expect(toggler).toHaveAttribute('aria-expanded', 'false'),
    )
    await expect(toggler).toHaveFocus()
  },
}
