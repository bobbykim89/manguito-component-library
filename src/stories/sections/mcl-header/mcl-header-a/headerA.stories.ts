import {
  arrayControllers,
  bodyTextControllers,
  booleanControllers,
  colorControllers,
  headingTextControllers,
  numberControllers,
  targetOptionControllers,
  textControllers,
} from '@/assets/composables'
import type {
  MenuCollapseType,
  MenuItemType,
} from '@/components/mcl-header/lib'
import { MclHeaderA } from '@/components/mcl-header/lib'
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

const meta: Meta<typeof MclHeaderA> = {
  title: 'Sections/Header/MclHeaderA',
  component: MclHeaderA,
  argTypes: {
    logo: textControllers({
      name: 'logo',
      required: true,
      description: 'assigns logo icon url for the component',
      category: 'Title Block',
    }),
    logoSmall: textControllers({
      name: 'logo-small',
      required: false,
      description: 'assigns logo icon url for mobile screen size (optional)',
      category: 'Title Block',
    }),
    logoAlt: textControllers({
      name: 'logo-alt',
      required: false,
      description: 'assigns alt text for logo icons',
      category: 'Title Block',
    }),
    title: textControllers({
      name: 'title',
      required: true,
      description: 'assigns title text of the component',
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
      description: 'assigns title heading text size for the component',
      defaultValue: 'md',
      category: 'Title Block',
    }),
    titleColor: colorControllers({
      name: 'title-color',
      required: false,
      description: 'assigns title text color',
      defaultValue: 'dark-3',
      category: 'Title Block',
    }),
    menuItems: arrayControllers({
      name: 'menu-items',
      required: true,
      description: 'assigns items that goes into menu',
      category: 'Menu Block',
    }),
    menuItemAsLink: booleanControllers({
      name: 'menu-items-as-link',
      required: false,
      description:
        'whether or not to handle menu item click event as link event',
      defaultValue: false,
      category: 'Menu Block',
    }),
    menuTextSize: bodyTextControllers({
      name: 'menu-text-size',
      required: false,
      description: 'assigns text size for menu items',
      category: 'Menu Block',
    }),
    menuTextColor: colorControllers({
      name: 'menu-text-color',
      required: false,
      description: 'assigns text color of menu items',
      defaultValue: 'dark-3',
      category: 'Menu Block',
    }),
    menuTextBold: booleanControllers({
      name: 'menu-text-bold',
      required: false,
      description: 'whether or not to bold the menu text',
      defaultValue: false,
      category: 'Menu Block',
    }),
    displayHighlight: booleanControllers({
      name: 'display-highlight',
      required: false,
      description:
        'whether or not to display highlight on hover/focus for menu items',
      defaultValue: true,
      category: 'Menu Block',
    }),
    highlightColor: colorControllers({
      name: 'highlight-color',
      required: false,
      description: 'assigns highlight color',
      defaultValue: 'primary',
      category: 'Menu Block',
    }),
    bgColor: colorControllers({
      name: 'bg-color',
      required: false,
      description: 'assigns background color of component',
      defaultValue: 'light-1',
      category: 'Colors',
    }),
    mobileMenuBgColor: colorControllers({
      name: 'mobile-menu-bg-color',
      required: false,
      description:
        'assigns background color of uncollapsed area in mobile screen',
      defaultValue: 'light-2',
      category: 'Colors',
    }),
    drawerBtnColor: colorControllers({
      name: 'secondary-color',
      required: false,
      description:
        'assigns color of dropdown hover background color and hamburger menu color',
      defaultValue: 'dark-1',
      category: 'Colors',
    }),
    drawerBtnBorder: booleanControllers({
      name: 'hamburgerBorder',
      required: false,
      description: 'whether or not to display border for hamburger menu',
      defaultValue: true,
      category: 'MISC',
    }),
    fadeInOnScroll: booleanControllers({
      name: 'fade-in-on-scroll',
      required: false,
      description:
        'whether or not to fade in the opacity of component on scroll',
      defaultValue: true,
      category: 'MISC',
    }),
    scrollDistance: numberControllers({
      name: 'scroll-distance',
      required: false,
      description: 'assigns distance (in px) to activate fade-in effect',
      defaultValue: 50,
      category: 'MISC',
    }),
  },
  args: {
    logo: 'https://res.cloudinary.com/dwgni1x3t/image/upload/v1670261556/MCL/mcl-logo-light_eqxliq.png',
    logoSmall:
      'https://res.cloudinary.com/dwgni1x3t/image/upload/v1670275930/MCL/mcl-logo-square_jvgyxx.png',
    logoAlt: 'Manguito Component Library (MCL) logo',
    title: 'MCL Header A',
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
    displayHighlight: true,
    highlightColor: 'primary',
    bgColor: 'light-1',
    mobileMenuBgColor: 'light-2',
    drawerBtnColor: 'dark-1',
    drawerBtnBorder: true,
    fadeInOnScroll: true,
    scrollDistance: 50,
  },
}

export default meta

type Story = StoryObj<typeof MclHeaderA>

export const MclHeaderAExample: Story = {
  render: (args) => ({
    components: { 'mcl-header-a': MclHeaderA },
    setup() {
      return { args }
    },
    template: '<mcl-header-a v-bind="args"></mcl-header-a>',
  }),
}

export const MclHeaderScrollExample: Story = {
  render: (args) => ({
    components: {
      'mcl-header-a': MclHeaderA,
    },
    setup() {
      const setConsole = () => {
        console.log('close-header')
      }
      return { args, setConsole }
    },
    template:
      '<section><mcl-header-a v-bind="args"><template #content-right><div class="flex justify-center items-center gap-4"><button class="btn btn-primary" @click="setConsole">Button 1</button><button class="btn btn-secondary" @click="setConsole">Button 2</button></div></template><template #mobile-bottom="{headerClose}"><div class="flex justify-center items-center gap-4"><button class="btn" btn-primary @click="headerClose(), setConsole()">Button 1</button><button class="btn btn-secondary" @click="headerClose(), setConsole()">Button 2</button></div></template></mcl-header-a><div class="h-[1000px] bg-primary"></div><div class="h-[1000px] bg-secondary"></div></section>',
  }),
}
