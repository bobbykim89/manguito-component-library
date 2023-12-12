import type { Meta, StoryObj } from '@storybook/vue3'
import Sidebar from './Sidebar.vue'

const meta: Meta<typeof Sidebar> = {
  title: 'Base/Base Component/Sidebar Component',
}
export default meta

type Story = StoryObj<typeof Sidebar>
export const sidebarExample: Story = {
  render: () => ({
    components: { sidebar: Sidebar },
    template: '<sidebar></sidebar>',
  }),
  parameters: {
    controls: { disable: true },
  },
}
