import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, screen, waitFor, within } from 'storybook/test'
import Sidebar from './Sidebar.vue'

const meta: Meta<typeof Sidebar> = {
  title: 'Base/Base Component/Sidebar Component',
  parameters: { a11y: { test: 'error' } },
}
export default meta

type Story = StoryObj<typeof Sidebar>
export const sidebarExample: Story = {
  render: () => ({
    components: { sidebar: Sidebar },
    template: '<sidebar></sidebar>',
  }),
}

// Opens the variant with the component's own default header so axe scans the
// open sidebar.
export const SidebarOpened: Story = {
  ...sidebarExample,
  name: 'Sidebar Opened',
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Sidebar Default Header' }),
    )
    const dialog = await screen.findByRole('dialog')
    // waitFor: the open transition starts at opacity 0
    await waitFor(() => expect(dialog).toBeVisible())
  },
}

// Custom-header sidebars open (#128), so axe checks their `aria-label` names
// and their icon-only close buttons.
const customHeaderOpened = (opener: string): Story => ({
  ...sidebarExample,
  name: `${opener} Opened`,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: opener }))
    const dialog = await screen.findByRole('dialog', { name: opener })
    await waitFor(() => expect(dialog).toBeVisible())
    await expect(
      within(dialog).getByRole('button', { name: 'Close' }),
    ).toBeVisible()
  },
})

export const SidebarLeftOpened = customHeaderOpened('Sidebar Left')
export const SidebarRightOpened = customHeaderOpened('Sidebar Right')
