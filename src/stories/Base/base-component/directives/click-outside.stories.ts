import type { Meta, StoryObj } from '@storybook/vue3'
import ClickOutside from './ClickOutside.vue'

const meta: Meta<typeof ClickOutside> = {
  title: 'Base/Base Component/Directives/Click Outside',
}
export default meta

type Story = StoryObj<typeof ClickOutside>
export const clickOutsideExample: Story = {
  render: () => ({
    components: { clickoutside: ClickOutside },
    template: '<clickoutside></clickoutside>',
  }),
}
