import type { MenuCollapseType, MenuItemType } from '@/components/mcl-header'
import { MclHeaderB } from '@/components/mcl-header'
import type { Meta, StoryObj } from '@storybook/vue3'

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
  argTypes: {},
  args: {
    logo: 'https://res.cloudinary.com/dwgni1x3t/image/upload/v1670275930/MCL/mcl-logo-square_jvgyxx.png',
    logoAlt: 'Manguito Component Library (MCL) logo',
    title: 'MCL Header B',
    titleBlockLink: '/',
    titleBlockAsLink: true,
    titleBlockLinkTarget: '_self',
    titleSize: 'md',
    titleColor: 'dark-3',
    menuItems: navItems,
    menuItemAsLink: true,
    menuTextSize: 'md',
    menuTextColor: 'dark-3',
    menuTextBold: false,
    displayHighlight: true,
    highlightColor: 'primary',
    bgColor: 'light-1',
    drawerBtnColor: 'dark-1',
    drawerBtnBorder: true,
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
