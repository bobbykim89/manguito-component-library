import type { Meta, StoryObj } from '@storybook/vue3-vite'
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
