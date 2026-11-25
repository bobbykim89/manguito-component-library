import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Button from './Button.vue'

const meta: Meta<typeof Button> = {
  title: 'Base/Utility Class/Button Class',
  // Utility-class demo, not a component: no axe check.
  parameters: { a11y: { test: 'off' } },
}
export default meta

type Story = StoryObj<typeof Button>
export const buttonExample: Story = {
  render: () => ({
    components: { 'button-class': Button },
    template: '<button-class></button-class>',
  }),
}
