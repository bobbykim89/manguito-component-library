import {
  arrayControllers,
  bodyTextControllers,
  booleanControllers,
  colorControllers,
  headingLevelControllers,
  headingTextControllers,
  rangeControllers,
  targetOptionControllers,
  textControllers,
} from '@/assets/composables'
import type {
  MenuCollapseType,
  MenuItemType,
} from '@/components/mcl-header/lib'
import { MclHeaderB } from '@/components/mcl-header/lib'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, screen, waitFor } from 'storybook/test'
import HeaderBSlotItem from './HeaderBSlotItem.vue'

const navItems: Array<MenuItemType | MenuCollapseType> = [
  {
    title: 'Home',
    url: 'https://manguitopage.herokuapp.com/',
    target: '_blank',
  },
  {
    title: 'Gallery',
    url: 'https://manguitopage.herokuapp.com/gallery',
    target: '_blank',
    current: true,
  },
  {
    title: 'Extra Items',
    children: [
      {
        title: 'Extra Items Child Link 1',
        url: '#',
        target: '_self',
      },
      {
        title: 'Extra Items Child Link 2',
        url: '#',
        target: '_self',
      },
      {
        title: 'Extra Items Child Link 3',
        url: '#',
        target: '_self',
      },
    ],
  },
  {
    title: 'About',
    url: 'https://manguitopage.herokuapp.com/about',
    target: '_blank',
  },
  {
    title: 'More Items',
    children: [
      {
        title: 'More Items Child Link 1',
        url: '#',
        target: '_self',
      },
      {
        title: 'More Items Child Link 2',
        url: '#',
        target: '_self',
      },
      {
        title: 'More Items Child Link 3',
        url: '#',
        target: '_self',
      },
    ],
  },
]

const meta: Meta<typeof MclHeaderB> = {
  title: 'Sections/Header/MclHeaderB',
  component: MclHeaderB,
  parameters: { a11y: { test: 'error' } },
  argTypes: {
    titleLevel: headingLevelControllers({
      name: 'title-level',
      required: false,
      description:
        'heading element for the title; leave unset for plain text (not a heading)',
      category: 'Title Block',
    }),
    logo: textControllers({
      name: 'logo',
      required: true,
      description: 'assign url for logo',
      category: 'Title Block',
    }),
    logoAlt: textControllers({
      name: 'logo-alt',
      required: false,
      defaultValue: '',
      description: 'assigns logo alt text for logo image',
      category: 'Title Block',
    }),
    title: textControllers({
      name: 'title',
      required: true,
      description: 'assigns title text',
      category: 'Title Block',
    }),
    titleBlockLink: textControllers({
      name: 'title-block-link',
      required: true,
      description: 'assigns link url for title block (logo, title)',
      category: 'Title Block',
    }),
    titleBlockAsLink: booleanControllers({
      name: 'title-block-as-link',
      required: false,
      defaultValue: false,
      description:
        'whether or not to have title block click event as link event',
      category: 'Title Block',
    }),
    titleBlockLinkTarget: targetOptionControllers({
      name: 'title-block-link-target',
      required: false,
      defaultValue: '_self',
      description: 'assigns target option for title block link',
      category: 'Title Block',
    }),
    titleSize: headingTextControllers({
      name: 'title-size',
      required: false,
      defaultValue: 'md',
      description: 'assigns title text size',
      category: 'Title Block',
    }),
    titleColor: colorControllers({
      name: 'title-color',
      required: false,
      defaultValue: 'dark-3',
      description: 'assigns title text color',
      category: 'Title Block',
    }),
    menuItems: arrayControllers({
      name: 'menu-items',
      required: true,
      description: 'assigns contents for menu items',
      category: 'Menu Block',
    }),
    menuItemAsLink: booleanControllers({
      name: 'menu-item-as-link',
      required: false,
      defaultValue: false,
      description: 'whether or not to have menu item click event as link event',
      category: 'Menu Block',
    }),
    menuTextSize: bodyTextControllers({
      name: 'menu-text-size',
      required: false,
      defaultValue: 'md',
      description: 'assigns menu item text size',
      category: 'Menu Block',
    }),
    menuTextColor: colorControllers({
      name: 'menu-text-color',
      required: false,
      defaultValue: 'dark-3',
      description: 'assigns text color of menu items',
      category: 'Menu Block',
    }),
    menuTextBold: booleanControllers({
      name: 'menu-text-bold',
      required: false,
      defaultValue: false,
      description: 'whether or not to have menu item text bolded',
      category: 'Menu Block',
    }),
    showHighlight: booleanControllers({
      name: 'show-highlight',
      required: false,
      defaultValue: true,
      description: 'whether or not to add highlight effect for menu items',
      category: 'Menu Block',
    }),
    highlightColor: colorControllers({
      name: 'highlight-color',
      required: false,
      defaultValue: 'primary',
      description: 'assigns highlight color',
      category: 'Menu Block',
    }),
    bgColor: colorControllers({
      name: 'bg-color',
      required: false,
      defaultValue: 'light-1',
      description: 'assigns background color of component',
      category: 'Layout Block',
    }),
    drawerBtnColor: colorControllers({
      name: 'drawer-btn-color',
      required: false,
      defaultValue: 'dark-1',
      description: 'assigns color of drawer button (hamburger menu button)',
      category: 'Layout Block',
    }),
    showDrawerBorder: booleanControllers({
      name: 'show-drawer-border',
      required: false,
      defaultValue: true,
      description:
        'whether or not to add border on drawer button (hamburger menu button)',
      category: 'Layout Block',
    }),
    headerWidth: rangeControllers({
      name: 'header-width',
      required: false,
      defaultValue: 160,
      description: 'assigns max-width of component in desktop screen',
      category: 'Size',
      controlOption: {
        min: 10,
        max: 500,
        step: 10,
      },
    }),
  },
  args: {
    logo: 'https://res.cloudinary.com/dwgni1x3t/image/upload/v1670275930/MCL/mcl-logo-square_jvgyxx.png',
    logoAlt: 'Manguito Component Library (MCL) logo',
    title: 'MCL Header B',
    titleBlockLink: '/',
    titleBlockAsLink: false,
    titleBlockLinkTarget: '_self',
    titleSize: 'md',
    titleColor: 'dark-3',
    menuItems: navItems,
    menuItemAsLink: false,
    menuTextSize: 'md',
    menuTextColor: 'dark-3',
    menuTextBold: false,
    showHighlight: true,
    highlightColor: 'primary',
    bgColor: 'light-1',
    drawerBtnColor: 'dark-1',
    showDrawerBorder: true,
    headerWidth: 160,
  },
}

export default meta
type Story = StoryObj<typeof MclHeaderB>

export const MclHeaderBExample: Story = {
  render: (args) => ({
    components: { 'mcl-header-b': MclHeaderB },
    setup() {
      return { args }
    },
    template:
      '<mcl-header-b v-bind="args"><template #default><div class="min-h-[100vh] bg-primary"><h3 class="h3-md text-center pt-md">Inside Header Component</h3></div><div class="min-h-[100vh] bg-secondary"><h3 class="h3-md text-center pt-md">Inside Header Component</h3></div></template></mcl-header-b>',
  }),
}

export const MclHeaderBSlotExample: Story = {
  render: (args) => ({
    components: {
      'mcl-header-b': MclHeaderB,
      'header-b-slot-item': HeaderBSlotItem,
    },
    setup() {
      return { args }
    },
    template:
      '<section><mcl-header-b v-bind="args"><template #default><div class="min-h-[100vh] bg-primary"><h3 class="h3-md text-center pt-md">Inside Header Component</h3></div><div class="min-h-[100vh] bg-secondary"><h3 class="h3-md text-center pt-md">Inside Header Component</h3></div></template><template #content-bottom><header-b-slot-item :color="args.highlightColor"></header-b-slot-item></template><template #mobile-bottom><header-b-slot-item :color="args.highlightColor"></header-b-slot-item></template></mcl-header-b></section><div class="min-h-[50vh] bg-success"><h3 class="h3-md text-center pt-md">Outside Header Component</h3></div>',
  }),
}

// Mobile width so the nav drawer button (lg:hidden) is rendered and opened.
// The drawer is teleported to <body>, hence `screen`.
export const MclHeaderBMobileOpened: Story = {
  ...MclHeaderBExample,
  name: 'MclHeaderB Mobile Opened',
  globals: { viewport: { value: 'mobile', isRotated: false } },
  play: async ({ userEvent }) => {
    const drawerButton = await screen.findByRole('button', { name: 'Menu' })
    await expect(drawerButton).toBeVisible()
    await userEvent.click(drawerButton)
    await waitFor(() =>
      expect(drawerButton).toHaveAttribute('aria-expanded', 'true'),
    )
    const [link] = await screen.findAllByRole('link')
    await waitFor(() => expect(link).toBeVisible())
    await userEvent.click(screen.getByRole('button', { name: /Extra Items/ }))
    const child = await screen.findByRole('link', {
      name: 'Extra Items Child Link 1',
    })
    await waitFor(() => expect(child).toBeVisible())
  },
}

// Desktop width: the sidebar's own collapse, not the mobile drawer (#131).
export const MclHeaderBKeyboard: Story = {
  ...MclHeaderBExample,
  name: 'MclHeaderB Keyboard',
  globals: { viewport: { value: 'desktop', isRotated: false } },
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole('button', { name: 'Extra Items' })
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(toggle)
    await waitFor(() => expect(toggle).toHaveAttribute('aria-expanded', 'true'))
    const child = canvas.getByRole('link', {
      name: 'Extra Items Child Link 1',
    })
    await waitFor(() => expect(child).toBeVisible())
    child.focus()
    await userEvent.keyboard('{Enter}')
    await waitFor(() => expect(toggle).toHaveFocus())
    await waitFor(() =>
      expect(toggle).toHaveAttribute('aria-expanded', 'false'),
    )
  },
}
