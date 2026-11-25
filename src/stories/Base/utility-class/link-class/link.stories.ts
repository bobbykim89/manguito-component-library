import type { Meta, StoryObj } from '@storybook/vue3-vite'
import LinkClass from './Link.vue'

const meta: Meta<typeof LinkClass> = {
  title: 'Base/Utility Class/Link Class',
  // Utility-class demo, not a component: no axe check.
  parameters: { a11y: { test: 'off' } },
}
export default meta

type Story = StoryObj<typeof LinkClass>
export const linkClassExample: Story = {
  render: () => ({
    components: { 'link-class': LinkClass },
    template: '<link-class></link-class>',
  }),
}
