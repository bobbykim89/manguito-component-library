import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, screen, waitFor } from 'storybook/test'
import ClickOutside from './ClickOutside.vue'

const meta: Meta<typeof ClickOutside> = {
  title: 'Base/Base Component/Directives/Click Outside',
  parameters: { a11y: { test: 'error' } },
}
export default meta

type Story = StoryObj<typeof ClickOutside>
export const clickOutsideExample: Story = {
  render: () => ({
    components: { clickoutside: ClickOutside },
    template: '<clickoutside></clickoutside>',
  }),
}

// Open, left open so axe checks the panel (#128).
export const ClickOutsideOpened: Story = {
  ...clickOutsideExample,
  name: 'Click Outside Opened',
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open Panel' }))
    const panel = await screen.findByRole('region', { name: 'Simple Panel' })
    await expect(panel).toHaveFocus()
  },
}

// The opener toggles the panel and its aria-expanded follows; Escape closes
// the panel and returns focus to the opener (#128).
export const ClickOutsideToggle: Story = {
  ...clickOutsideExample,
  name: 'Click Outside Toggle',
  play: async ({ canvas, userEvent }) => {
    const opener = canvas.getByRole('button', { name: 'Open Panel' })
    await userEvent.click(opener)
    await screen.findByRole('region', { name: 'Simple Panel' })
    await expect(opener).toHaveAttribute('aria-expanded', 'true')

    await userEvent.click(opener)
    await waitFor(() =>
      expect(screen.queryByRole('region', { name: 'Simple Panel' })).toBeNull(),
    )
    await expect(opener).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(opener)
    const panel = await screen.findByRole('region', { name: 'Simple Panel' })
    await expect(panel).toHaveFocus()
    await userEvent.keyboard('{Escape}')
    await waitFor(() =>
      expect(screen.queryByRole('region', { name: 'Simple Panel' })).toBeNull(),
    )
    await expect(opener).toHaveFocus()
  },
}
