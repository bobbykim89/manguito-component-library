import type { Meta, StoryObj } from '@storybook/vue3'
// import {TabContainer, TabContent} from '@/components/manguito-theme/lib'
import TabExample from './TabExample.vue'

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
