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
