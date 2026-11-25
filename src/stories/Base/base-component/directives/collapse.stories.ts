import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Collapse from './Collapse.vue'

const meta: Meta<typeof Collapse> = {
  title: 'Base/Base Component/Directives/Collapse',
  // Deprecated directive: no axe check (see CLAUDE.md).
  parameters: { a11y: { test: 'off' } },
}
export default meta

type Story = StoryObj<typeof Collapse>
export const collapseExample: Story = {
  render: () => ({
    components: { collapse: Collapse },
    template: '<collapse></collapse>',
  }),
}
