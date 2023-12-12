import type { Meta, StoryObj } from '@storybook/vue3'
import Collapse from './Collapse.vue'
import CollapseRef from './CollapseRef.vue'
import CollapseAccordion from './CollapseAccordion.vue'

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
  parameters: {
    controls: { disable: true },
  },
}

export const collapseRefExample: Story = {
  render: () => ({
    components: { 'collapse-ref': CollapseRef },
    template: '<collapse-ref></collapse-ref>',
  }),
  parameters: {
    controls: { disable: true },
  },
}

export const collapseAccordionExample: Story = {
  render: () => ({
    components: { 'collapse-accordionf': CollapseAccordion },
    template: '<collapse-accordionf></collapse-accordionf>',
  }),
  parameters: {
    controls: { disable: true },
  },
}
