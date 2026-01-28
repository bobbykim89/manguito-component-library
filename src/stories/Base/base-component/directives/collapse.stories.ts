import type { Meta, StoryObj } from '@storybook/vue3'
import Collapse from './Collapse.vue'

const meta: Meta<typeof Collapse> = {
  title: 'Base/Base Component/Directives/Collapse',
}
export default meta

type Story = StoryObj<typeof Collapse>
export const collapseExample: Story = {
  render: () => ({
    components: { collapse: Collapse },
    template: '<collapse></collapse>',
  }),
}
