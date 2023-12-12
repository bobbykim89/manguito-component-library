import type { Meta, StoryObj } from '@storybook/vue3'
import Button from './Button.vue'

const meta: Meta<typeof Button> = {
  title: 'Base/Utility Class/Button Class',
}
export default meta

type Story = StoryObj<typeof Button>
export const buttonExample: Story = {
  render: () => ({
    components: { 'button-class': Button },
    template: '<button-class></button-class>',
  }),
  parameters: {
    controls: { disable: true },
  },
}
