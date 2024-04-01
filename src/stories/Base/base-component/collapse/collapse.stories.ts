import type { Meta, StoryObj } from '@storybook/vue3'
import Collapse from './Collapse.vue'
import CollapseAccordion from './CollapseAccordion.vue'
import CollapseRef from './CollapseRef.vue'

const meta: Meta<typeof Collapse> = {
  title: 'Base/Base Component/Collapse Component',
}
export default meta

type Story = StoryObj<typeof Collapse>
export const collapseExample: Story = {
  render: () => ({
    components: { collapse: Collapse },
    template: '<collapse></collapse>',
  }),
}

export const collapseRefExample: Story = {
  render: () => ({
    components: { 'collapse-ref': CollapseRef },
    template: '<collapse-ref></collapse-ref>',
  }),
}

export const collapseAccordionExample: Story = {
  render: () => ({
    components: { 'collapse-accordion': CollapseAccordion },
    template: '<collapse-accordion></collapse-accordion>',
  }),
}
