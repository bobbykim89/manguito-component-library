import {
  arrayControllers,
  bodyTextControllers,
  booleanControllers,
  colorControllers,
  headingTextControllers,
  objectControllers,
  targetOptionControllers,
  textControllers,
} from '@/assets/composables'
import type { MenuItemType, SocialUrl } from '@/components/mcl-footer/lib'
import { MclFooterA } from '@/components/mcl-footer/lib'
import type { Meta, StoryObj } from '@storybook/vue3'

const navItems: MenuItemType[] = [
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
    title: 'About',
    url: 'https://manguitopage.herokuapp.com/about',
    target: '_blank',
  },
]
const secondaryNavItems: MenuItemType[] = [
  {
    title: 'Blog',
    url: '#',
    target: '_blank',
  },
  {
    title: 'Projects',
    url: '#',
    target: '_blank',
  },
  {
    title: 'Contact',
    url: '#',
    target: '_blank',
  },
]

const socialLinks: SocialUrl = {
  linkedin: 'https://www.linkedin.com/',
  github: 'https://github.com/',
  instagram: 'https://www.instagram.com/',
  twitter: 'https://twitter.com/',
}

const meta: Meta<typeof MclFooterA> = {
  title: 'Sections/Footer/MclFooterA',
  argTypes: {
    title: textControllers({
      name: 'title',
      required: true,
      description: 'assigns title text of the component',
      category: 'Title Block',
    }),
    titleSize: headingTextControllers({
      name: 'title-size',
      required: false,
      description: 'assigns title text size',
      defaultValue: 'md',
      category: 'Title Block',
    }),
    titleColor: colorControllers({
      name: 'title-color',
      required: false,
      description: 'assigns title text color',
      defaultValue: 'light-1',
      category: 'Title Block',
    }),
    copyText: textControllers({
      name: 'copy-text',
      required: false,
      description: 'assigns copy text of the component',
      category: 'Title Block',
    }),
    logo: textControllers({
      name: 'logo',
      required: true,
      description: 'assigns logo image url',
      category: 'Title Block',
    }),
    logoAlt: textControllers({
      name: 'logo-alt',
      required: false,
      description: 'assigns alt text for logo image',
      category: 'Title Block',
    }),
    logoAsLink: booleanControllers({
      name: 'logo-as-link',
      required: false,
      description: 'whether or not to have logo click event as a link event',
      defaultValue: true,
      category: 'Title Block',
    }),
    logoLink: textControllers({
      name: 'logo-link',
      required: false,
      description: 'assigns url for logo link click event',
      defaultValue: '/',
      category: 'Title Block',
    }),
    logoLinkTarget: targetOptionControllers({
      name: 'logo-link-target',
      required: false,
      description: 'assigns target option for logo link click event',
      defaultValue: '_self',
      category: 'Title Block',
    }),
    displaySocialIcons: booleanControllers({
      name: 'display-social-icons',
      required: false,
      description:
        'whether or not to display social icons on the footer component',
      defaultValue: true,
      category: 'Social Icons Block',
    }),
    socialIconColor: colorControllers({
      name: 'social-icon-color',
      required: false,
      description: 'assigns color of social icon',
      defaultValue: 'light-1',
      category: 'Social Icons Block',
    }),
    socialLinks: objectControllers({
      name: 'social-links',
      required: false,
      description: 'assigns social links variables',
      category: 'Social Icons Block',
    }),
    menuItems: arrayControllers({
      name: 'menu-items',
      required: true,
      description: 'assigns contents for component menu items',
      category: 'Menu Block',
    }),
    secondaryMenuItems: arrayControllers({
      name: 'secondary-menu-items',
      required: false,
      description:
        'assigns secondary contents for component menu items (optional)',
      category: 'Menu Block',
    }),
    menuItemAsLink: booleanControllers({
      name: 'menu-item-as-link',
      required: false,
      description:
        'whether or not to have menu items click event as link click event',
      category: 'Menu Block',
    }),
    menuTextSize: bodyTextControllers({
      name: 'menu-text-size',
      required: false,
      description: 'assigns text size for menu items',
      defaultValue: 'md',
      category: 'Menu Block',
    }),
    menuTextColor: colorControllers({
      name: 'menu-text-color',
      required: false,
      description: 'assigns text color for menu items',
      category: 'Menu Block',
    }),
    menuTextBold: booleanControllers({
      name: 'menu-text-bold',
      required: false,
      description: 'whether or not to have menu text bold',
      defaultValue: false,
      category: 'Menu Block',
    }),
    displayHighlight: booleanControllers({
      name: 'display-highlight',
      required: false,
      description:
        'whether or not to add highlight on hover/focus on menu items',
      defaultValue: true,
      category: 'Menu Block',
    }),
    highlightColor: colorControllers({
      name: 'highlight-color',
      required: false,
      description: 'assigns highlight color on menu items',
      defaultValue: 'primary',
      category: 'Menu Block',
    }),
    bgColor: colorControllers({
      name: 'bg-color',
      required: false,
      description: 'assigns background color of the component',
      defaultValue: 'dark-3',
      category: 'Colors',
    }),
    borderTopColor: colorControllers({
      name: 'border-top-color',
      required: false,
      description: 'assigns the color of border-top of the component',
      defaultValue: 'primary',
      category: 'Colors',
    }),
    headlineColor: colorControllers({
      name: 'headline-color',
      required: false,
      description: 'assigns the color of the headline that comes under logo',
      defaultValue: 'light-1',
      category: 'Colors',
    }),
  },
  args: {
    title: 'MCL Footer A',
    titleSize: 'md',
    titleColor: 'light-1',
    copyText: 'Manguito Component Library',
    logo: 'https://res.cloudinary.com/dwgni1x3t/image/upload/v1670261556/MCL/mcl-logo-light_eqxliq.png',
    logoAlt: 'Manguito Component Library (MCL) logo',
    logoAsLink: true,
    logoLink: '/',
    logoLinkTarget: '_self',
    displaySocialIcons: true,
    socialIconColor: 'light-1',
    socialLinks: socialLinks,
    menuItems: navItems,
    secondaryMenuItems: secondaryNavItems,
    menuItemAsLink: true,
    menuTextSize: 'md',
    menuTextColor: 'light-1',
    menuTextBold: false,
    displayHighlight: true,
    highlightColor: 'primary',
    bgColor: 'dark-3',
    borderTopColor: 'primary',
    headlineColor: 'light-1',
  },
}

export default meta

type Story = StoryObj<typeof MclFooterA>

export const MclFooterAExample: Story = {
  render: (args) => ({
    components: { 'mcl-footer-a': MclFooterA },
    setup() {
      return { args }
    },
    template: '<mcl-footer-a v-bind="args"></mcl-footer-a>',
  }),
}
