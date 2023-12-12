import type { Meta, StoryObj } from '@storybook/vue3'
import ListClass from './List.vue'

const meta: Meta<typeof ListClass> = {
  title: 'Base/Utility Class/List Class',
}
export default meta

type Story = StoryObj<typeof ListClass>
export const listClassExample: Story = {
  render: () => ({
    components: { 'list-class': ListClass },
    template: '<list-class></list-class>',
  }),
  parameters: {
    controls: { disable: true },
  },
}
