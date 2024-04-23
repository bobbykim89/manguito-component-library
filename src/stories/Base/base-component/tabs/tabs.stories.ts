import type { Meta, StoryObj } from '@storybook/vue3'
// import {TabContainer, TabContent} from '@/components/manguito-theme/lib'
import TabExample from './TabExample.vue'
import TabExample2 from './TabExample2.vue'

const meta: Meta<typeof TabExample> = {
  title: 'Base/Base Component/Tab Component',
}
export default meta

type Story = StoryObj<typeof TabExample>
export const tabExample: Story = {
  render: () => ({
    components: { 'tab-example': TabExample },
    template: '<tab-example></tab-example>',
  }),
}

export const tabExample2: Story = {
  render: () => ({
    components: { 'tab-example-2': TabExample2 },
    template: '<tab-example-2></tab-example-2>',
  }),
}
