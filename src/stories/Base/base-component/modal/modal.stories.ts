import type { Meta, StoryObj } from '@storybook/vue3'
import Modal from './Modal.vue'

const meta: Meta<typeof Modal> = {
  title: 'Base/Base Component/Modal Component',
}
export default meta

type Story = StoryObj<typeof Modal>
export const modalExample: Story = {
  render: () => ({
    components: { modal: Modal },
    template: '<modal></modal>',
  }),
  parameters: {
    controls: { disable: true },
  },
}
