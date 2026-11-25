import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, waitFor } from 'storybook/test'
import Collapse from './Collapse.vue'
import CollapseAccordion from './CollapseAccordion.vue'
import CollapseRef from './CollapseRef.vue'

const meta: Meta<typeof Collapse> = {
  title: 'Base/Base Component/Collapse Component',
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

// a11y: the story's own trigger button has no aria-expanded / aria-controls,
// so the open state is asserted on the panel only.
export const CollapseOpened: Story = {
  ...collapseExample,
  name: 'Collapse Opened',
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Tab Button' }))
    const panel = canvasElement.querySelector('#my-collapse-component')
    await waitFor(() => expect(panel).toBeVisible())
  },
}
