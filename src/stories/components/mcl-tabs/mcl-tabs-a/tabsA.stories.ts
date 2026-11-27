import {
  arrayControllers,
  booleanControllers,
  colorControllers,
  headingTextControllers,
  textControllers,
} from '@/assets/composables'
import type { ContentType } from '@/components/mcl-tabs/lib'
import { MclTabsA } from '@/components/mcl-tabs/lib'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, waitFor } from 'storybook/test'

const contentInfo: ContentType[] = [
  {
    title: 'First',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt blanditiis magni similique quidem nisi quae. Aspernatur ut tempora doloremque dicta ipsum temporibus eius delectus, quas nihil exercitationem, in impedit natus vitae, esse dolore quia totam consequuntur sequi sint odio ducimus explicabo aliquid omnis quam. Quasi porro eum distinctio perspiciatis fugit?',
  },
  {
    title: 'Second',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, accusantium. Optio molestias, quod inventore suscipit perferendis ex quaerat odit deleniti quidem laudantium ducimus recusandae illo possimus quam error tempora laborum sapiente magnam quas harum distinctio numquam saepe quasi! Officiis, ipsam!',
  },
  {
    title: 'Third',
    content:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores laboriosam totam, error reprehenderit quasi commodi, aspernatur a deserunt eligendi nobis sequi vero fuga in consequuntur ipsum. Quod nesciunt nulla corrupti voluptatibus? Natus, corporis quisquam! Corrupti eos, placeat, similique nostrum possimus officia aperiam cupiditate neque ducimus deserunt in quas earum, illo veritatis quos. Laudantium maxime voluptates facilis temporibus repellendus pariatur, quisquam, molestias quam, autem iste officia rerum hic rem. Minus, mollitia?',
  },
  {
    title: 'Fourth',
    content:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores laboriosam totam, error reprehenderit quasi commodi, aspernatur a deserunt eligendi nobis sequi vero fuga in consequuntur ipsum. Quod nesciunt nulla corrupti voluptatibus? Natus, corporis quisquam! Corrupti eos, placeat, similique nostrum possimus officia aperiam cupiditate neque ducimus deserunt in quas earum, illo veritatis quos. Laudantium maxime voluptates facilis temporibus repellendus pariatur, quisquam, molestias quam, autem iste officia rerum hic rem. Minus, mollitia?',
  },
  {
    title: 'Fifth',
    content:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores laboriosam totam, error reprehenderit quasi commodi, aspernatur a deserunt eligendi nobis sequi vero fuga in consequuntur ipsum. Quod nesciunt nulla corrupti voluptatibus? Natus, corporis quisquam! Corrupti eos, placeat, similique nostrum possimus officia aperiam cupiditate neque ducimus deserunt in quas earum, illo veritatis quos. Laudantium maxime voluptates facilis temporibus repellendus pariatur, quisquam, molestias quam, autem iste officia rerum hic rem. Minus, mollitia?',
  },
]

const meta: Meta<typeof MclTabsA> = {
  title: 'Components/Tabs/MclTabsA',
  component: MclTabsA,
  parameters: {
    a11y: { test: 'error' },
  },
  argTypes: {
    tabName: textControllers({
      name: 'tab-name',
      required: true,
      description: 'assign the name of tab (will be used for creating tab id)',
      category: 'Content Block',
    }),
    content: arrayControllers({
      name: 'content',
      required: true,
      description: 'assigns tab contnet of the component',
      defaultValue: undefined,
      category: 'Content Block',
    }),
    bgColor: colorControllers({
      name: 'bg-color',
      required: false,
      description: 'assigns background color of the component',
      defaultValue: 'light-1',
      category: 'Colors',
    }),
    tabColor: colorControllers({
      name: 'tab-color',
      required: false,
      description: 'assigns tab color of the component',
      defaultValue: 'primary',
      category: 'Colors',
    }),
    activeTitleColor: colorControllers({
      name: 'active-title-color',
      required: false,
      description: 'assigns text color active tab button',
      defaultValue: 'light-1',
      category: 'Title Block',
    }),
    inactiveTitleColor: colorControllers({
      name: 'inactive-title-color',
      required: false,
      description: 'assigns text color inactive tab button',
      defaultValue: 'light-1',
      category: 'Title Block',
    }),
    titleSize: headingTextControllers({
      name: 'title-size',
      required: false,
      description: 'assigns text size for tab button',
      defaultValue: 'md',
      category: 'Title Block',
    }),
    borderColor: colorControllers({
      name: 'border-color',
      required: false,
      description: 'assigns border color of the component',
      defaultValue: 'light-3',
      category: 'Borders',
    }),
    showShadow: booleanControllers({
      name: 'show-shadow',
      required: false,
      description: 'whether or not to display drop shadow on the component',
      defaultValue: true,
      category: 'Borders',
    }),
    rounded: booleanControllers({
      name: 'rounded',
      required: false,
      description: 'whether or not to have rounded corner on the component',
      defaultValue: true,
      category: 'Borders',
    }),
    showScrollButtons: booleanControllers({
      name: 'show-scroll-buttons',
      required: false,
      description: 'whether or not to display scroll buttons in mobile devices',
      defaultValue: true,
      category: 'Controls',
    }),
  },
  args: {
    tabName: 'mcl-tab-a',
    content: contentInfo,
    borderColor: 'light-3',
    bgColor: 'light-1',
    tabColor: 'primary',
    titleSize: 'md',
    activeTitleColor: 'dark-3',
    inactiveTitleColor: 'light-1',
    showShadow: true,
    rounded: true,
    showScrollButtons: true,
  },
}

export default meta

type Story = StoryObj<typeof MclTabsA>
export const MclTabsAExample: Story = {
  render: (args) => ({
    components: { 'mcl-tabs-a': MclTabsA },
    setup() {
      return { args }
    },
    template: '<mcl-tabs-a v-bind="args"></mcl-tabs-a>',
  }),
}

export const MclTabsASecondActive: Story = {
  ...MclTabsAExample,
  name: 'MclTabsA Second Active',
  play: async ({ canvas, userEvent }) => {
    const tab = canvas.getByRole('tab', { name: 'Second' })
    await userEvent.click(tab)
    await waitFor(() => expect(tab).toHaveAttribute('aria-selected', 'true'))
    const text = await canvas.findByText(/Quam, accusanti/)
    await waitFor(() => expect(text).toBeVisible())
  },
}

// Arrow keys, Home and End move focus and selection together (#132). Desktop
// width, where every tab fits and the scroll buttons are hidden.
export const MclTabsAKeyboard: Story = {
  ...MclTabsAExample,
  name: 'MclTabsA Keyboard',
  globals: { viewport: { value: 'desktop', isRotated: false } },
  play: async ({ canvas, userEvent }) => {
    const tab = (name: string) => canvas.getByRole('tab', { name })
    const expectSelected = async (name: string) => {
      await waitFor(() => expect(tab(name)).toHaveFocus())
      await expect(tab(name)).toHaveAttribute('aria-selected', 'true')
      await waitFor(() =>
        expect(canvas.getByRole('tabpanel', { name })).toBeVisible(),
      )
    }
    await userEvent.tab()
    await expectSelected('First')
    await userEvent.keyboard('{ArrowRight}')
    await expectSelected('Second')
    await userEvent.keyboard('{End}')
    await expectSelected('Fifth')
    await userEvent.keyboard('{Home}')
    await expectSelected('First')
  },
}

// At mobile width the strip scrolls and the scroll buttons overlay its edges.
// A tab reached by keyboard must stop beside a scroll button, not under it (#132).
export const MclTabsAKeyboardMobile: Story = {
  ...MclTabsAExample,
  name: 'MclTabsA Keyboard Mobile',
  globals: { viewport: { value: 'mobile', isRotated: false } },
  play: async ({ canvas, canvasElement, userEvent }) => {
    const strip = canvasElement.querySelector<HTMLElement>(
      '[role="tablist"] .overflow-x-auto',
    )!
    const scrollButton = (side: 'left' | 'right') =>
      canvasElement.querySelector<HTMLElement>(
        `[role="tablist"] > button.${side}-0`,
      )
    const expectClear = async (name: string) => {
      const focused = canvas.getByRole('tab', { name })
      await waitFor(() => expect(focused).toHaveFocus())
      // Wait until the buttons have caught up with the strip's scroll position.
      await waitFor(() => {
        const max = strip.scrollWidth - strip.clientWidth
        expect(!!scrollButton('left')).toBe(strip.scrollLeft > 0)
        expect(!!scrollButton('right')).toBe(strip.scrollLeft < max - 1)
      })
      const tabRect = focused.getBoundingClientRect()
      const left = scrollButton('left')
      const right = scrollButton('right')
      if (left) {
        await expect(tabRect.left).toBeGreaterThanOrEqual(
          left.getBoundingClientRect().right - 1,
        )
      }
      if (right) {
        await expect(tabRect.right).toBeLessThanOrEqual(
          right.getBoundingClientRect().left + 1,
        )
      }
    }
    await userEvent.tab()
    await expectClear('First')
    for (const name of ['Second', 'Third', 'Fourth', 'Fifth']) {
      await userEvent.keyboard('{ArrowRight}')
      await expectClear(name)
    }
    for (const name of ['Fourth', 'Third', 'Second', 'First']) {
      await userEvent.keyboard('{ArrowLeft}')
      await expectClear(name)
    }
    await userEvent.keyboard('{End}')
    await expectClear('Fifth')
    await userEvent.keyboard('{Home}')
    await expectClear('First')
  },
}
