import type { Meta, StoryObj } from '@storybook/vue3'
import {
  colorControllers,
  headingTextControllers,
  textControllers,
  booleanControllers,
  bodyTextControllers,
  spacingControllers,
  arrayControllers,
} from '@/assets/composables'
import { MclFooterA } from '@/components/mcl-footer'
import type { MenuItemType, SocialUrl } from '@/components/mcl-footer'

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
  argTypes: {},
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
    navItemAsLink: true,
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
