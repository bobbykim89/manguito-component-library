import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, waitFor } from 'storybook/test'
import Collapse from './Collapse.vue'
import CollapseAccordion from './CollapseAccordion.vue'
import CollapseRef from './CollapseRef.vue'

const meta: Meta<typeof Collapse> = {
  title: 'Base/Base Component/Collapse Component',
  parameters: { a11y: { test: 'error' } },
}
export default meta

type Story = StoryObj<typeof Collapse>
export const collapseExample: Story = {
  render: () => ({
    components: { collapse: Collapse },
    template: '<collapse></collapse>',
  }),
}

export const collapseRefExample: Story = {
  render: () => ({
    components: { 'collapse-ref': CollapseRef },
    template: '<collapse-ref></collapse-ref>',
  }),
}

export const collapseAccordionExample: Story = {
  render: () => ({
    components: { 'collapse-accordion': CollapseAccordion },
    template: '<collapse-accordion></collapse-accordion>',
  }),
}

export const CollapseOpened: Story = {
  ...collapseExample,
  name: 'Collapse Opened',
  play: async ({ canvas, canvasElement, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: 'Tab Button' })
    await userEvent.click(trigger)
    const panel = canvasElement.querySelector('#my-collapse-component')
    await waitFor(() => expect(panel).toBeVisible())
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    await expect(trigger).toHaveAttribute(
      'aria-controls',
      'my-collapse-component',
    )
  },
}
