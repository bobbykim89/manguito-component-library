import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, screen, waitFor } from 'storybook/test'
import {
  DropdownContainer,
  DropdownContent,
  Modal as BaseModal,
} from '@/components/manguito-theme/lib'
import { ref } from 'vue'
import Modal from './Modal.vue'

const meta: Meta<typeof Modal> = {
  title: 'Base/Base Component/Modal Component',
  parameters: { a11y: { test: 'error' } },
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

// Escape order (#128): with a Dropdown open inside the dialog, the first
// Escape closes only the menu (focus back on its toggler) and the second
// closes the dialog.
export const ModalNestedEscape: Story = {
  name: 'Modal Nested Escape',
  render: () => ({
    components: { BaseModal, DropdownContainer, DropdownContent },
    setup() {
      const modalRef = ref<InstanceType<typeof BaseModal>>()
      return { modalRef }
    },
    template: `<section>
      <button type="button" class="btn btn-primary" @click="modalRef?.open()">Open Modal With Menu</button>
      <BaseModal ref="modalRef" id="modal-nested-escape" title="Modal with a menu">
        <template #body>
          <div class="p-xs">
            <DropdownContainer>
              <template #toggler="{ toggle, attrs }">
                <button type="button" v-bind="attrs" @click="toggle" class="btn btn-danger">Menu in modal</button>
              </template>
              <DropdownContent v-slot="{ itemClick }">
                <button type="button" @click="itemClick()" class="block w-full bg-light-2 px-xs py-2xs">Menu item</button>
              </DropdownContent>
            </DropdownContainer>
          </div>
        </template>
      </BaseModal>
    </section>`,
  }),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Open Modal With Menu' }),
    )
    const dialog = await screen.findByRole('dialog', {
      name: 'Modal with a menu',
    })
    await waitFor(() => expect(dialog).toBeVisible())
    // The focus trap (and its Escape handling) starts once the enter animation
    // ends; activating it moves focus into the dialog.
    await waitFor(() =>
      expect(dialog.contains(document.activeElement)).toBe(true),
    )

    const toggler = screen.getByRole('button', { name: 'Menu in modal' })
    await userEvent.click(toggler)
    const item = await screen.findByRole('button', { name: 'Menu item' })
    await waitFor(() => expect(item).toBeVisible())
    item.focus()

    await userEvent.keyboard('{Escape}')
    await waitFor(() =>
      expect(toggler).toHaveAttribute('aria-expanded', 'false'),
    )
    await expect(toggler).toHaveFocus()
    await expect(dialog).toBeVisible()

    await userEvent.keyboard('{Escape}')
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    )
  },
}
