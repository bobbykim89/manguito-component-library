import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ListClass from './List.vue'

const meta: Meta<typeof ListClass> = {
  title: 'Base/Utility Class/List Class',
  // Utility-class demo, not a component: no axe check.
  parameters: { a11y: { test: 'off' } },
}
export default meta

type Story = StoryObj<typeof ListClass>
export const listClassExample: Story = {
  render: () => ({
    components: { 'list-class': ListClass },
    template: '<list-class></list-class>',
  }),
}
