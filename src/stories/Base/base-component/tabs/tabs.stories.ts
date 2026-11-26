import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, waitFor } from 'storybook/test'
// import {TabContainer, TabContent} from '@/components/manguito-theme/lib'
import TabExample from './TabExample.vue'
import TabExample2 from './TabExample2.vue'

const meta: Meta<typeof TabExample> = {
  title: 'Base/Base Component/Tab Component',
  parameters: { a11y: { test: 'error' } },
}
export default meta

type Story = StoryObj<typeof TabExample>
export const tabExample: Story = {
  render: () => ({
    components: { 'tab-example': TabExample },
    template: '<tab-example></tab-example>',
  }),
}

export const tabExample2: Story = {
  render: () => ({
    components: { 'tab-example-2': TabExample2 },
    template: '<tab-example-2></tab-example-2>',
  }),
}

export const TabSecondActive: Story = {
  ...tabExample,
  name: 'Tab Second Active',
  play: async ({ canvas, canvasElement, userEvent }) => {
    const tab = canvas.getByRole('tab', { name: 'Tab 1' })
    await userEvent.click(tab)
    await waitFor(() => expect(tab).toHaveAttribute('aria-selected', 'true'))
    await waitFor(() =>
      expect(canvasElement.querySelector('#tab-1')).toBeVisible(),
    )
    await expect(canvasElement.querySelector('#tab-0')).not.toBeVisible()
  },
}

// Keyboard model (#128): one Tab stop for the tab set, arrow keys and
// Home/End move the selection, and Tab then moves into the visible panel.
export const TabKeyboard: Story = {
  ...tabExample,
  name: 'Tab Keyboard',
  play: async ({ canvas, canvasElement, userEvent }) => {
    const tab = (n: number) => canvas.getByRole('tab', { name: `Tab ${n}` })
    const panel = (n: number) => canvasElement.querySelector(`#tab-${n}`)
    // The keyed transition keeps the old panels until it ends.
    const settled = () =>
      waitFor(() =>
        expect(
          canvasElement.querySelectorAll('[role="tabpanel"]'),
        ).toHaveLength(4),
      )

    await userEvent.tab()
    await expect(tab(0)).toHaveFocus()

    await userEvent.keyboard('{ArrowRight}')
    await waitFor(() => expect(tab(1)).toHaveFocus())
    await expect(tab(1)).toHaveAttribute('aria-selected', 'true')
    await expect(tab(1)).toHaveAttribute('tabindex', '0')
    await expect(tab(0)).toHaveAttribute('tabindex', '-1')
    await waitFor(() => expect(panel(1)).toBeVisible())

    await userEvent.keyboard('{End}')
    await waitFor(() => expect(tab(3)).toHaveFocus())
    await expect(tab(3)).toHaveAttribute('aria-selected', 'true')

    await userEvent.keyboard('{Home}')
    await waitFor(() => expect(tab(0)).toHaveFocus())
    await expect(tab(0)).toHaveAttribute('aria-selected', 'true')
    await settled()
    await waitFor(() => expect(panel(0)).toBeVisible())

    // Panel 0 has nothing focusable, so the panel itself takes focus.
    await userEvent.tab()
    await expect(panel(0)).toHaveFocus()
    await expect(panel(0)).toHaveAttribute('aria-labelledby', tab(0).id)
  },
}
