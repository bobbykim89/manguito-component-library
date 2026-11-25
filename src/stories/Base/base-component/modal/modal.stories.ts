import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, screen, waitFor } from 'storybook/test'
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
}

// Opens the variant with the component's own default header so axe scans the
// open modal.
export const ModalOpened: Story = {
  ...modalExample,
  name: 'Modal Opened',
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Modal Default Header' }),
    )
    const dialog = await screen.findByRole('dialog')
    // waitFor: the open transition starts at opacity 0
    await waitFor(() => expect(dialog).toBeVisible())
  },
}
