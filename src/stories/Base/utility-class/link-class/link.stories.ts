import type { Meta, StoryObj } from '@storybook/vue3'
import LinkClass from './Link.vue'

const meta: Meta<typeof LinkClass> = {
  title: 'Base/Utility Class/Link Class',
}
export default meta

type Story = StoryObj<typeof LinkClass>
export const linkClassExample: Story = {
  render: () => ({
    components: { 'link-class': LinkClass },
    template: '<link-class></link-class>',
  }),
}
