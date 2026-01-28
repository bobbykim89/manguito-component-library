import type { Meta, StoryObj } from '@storybook/vue3'
import ModalPattern from './ModalPattern.vue'
import Toggle from './Toggle.vue'

const meta: Meta<typeof Toggle> = {
  title: 'Base/Base Component/Directives/Toggle',
}
export default meta

type Story = StoryObj<typeof Toggle>
export const toggleExample: Story = {
  render: () => ({
    components: { toggle: Toggle },
    template: '<toggle></toggle>',
  }),
}

export const modalPatternExample: Story = {
  render: () => ({
    components: { modal: ModalPattern },
    template: '<modal modal-id="my-modal"></modal>',
  }),
}
