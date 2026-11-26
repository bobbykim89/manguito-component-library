import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, screen, waitFor } from 'storybook/test'
import Tooltip from './Tooltip.vue'

const meta: Meta<typeof Tooltip> = {
  title: 'Base/Base Component/Directives/Tooltip',
  parameters: { a11y: { test: 'error' } },
}
export default meta

type Story = StoryObj<typeof Tooltip>
export const tooltipExample: Story = {
  render: () => ({
    components: { tooltip: Tooltip },
    template: '<tooltip></tooltip>',
  }),
}

export const TooltipShown: Story = {
  ...tooltipExample,
  name: 'Tooltip Shown',
  play: async ({ canvas, userEvent }) => {
    const [trigger] = canvas.getAllByRole('button', { name: 'Default' })
    await userEvent.tab()
    await expect(trigger).toHaveFocus()
    const tip = await screen.findByRole('tooltip')
    await waitFor(() => expect(tip).toBeVisible())
  },
}
