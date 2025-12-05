import type { Meta, StoryObj } from '@storybook/vue3'
import Tooltip from './Tooltip.vue'

const meta: Meta<typeof Tooltip> = {
  title: 'Base/Base Component/Directives/Tooltip',
}
export default meta

type Story = StoryObj<typeof Tooltip>
export const tooltipExample: Story = {
  render: () => ({
    components: { tooltip: Tooltip },
    template: '<tooltip></tooltip>',
  }),
}
