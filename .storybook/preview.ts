import type { Preview } from '@storybook/vue3'
import '../src/assets/style.css'

const customViewports = {
  mobile: {
    name: 'Mobile',
    styles: {
      width: '425px',
      height: '835px',
    },
  },
  tablet: {
    name: 'Tablet',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
  laptop: {
    name: 'Laptop',
    styles: {
      width: '1024px',
      height: '1024px',
    },
  },
  laptopLarge: {
    name: 'Laptop (L)',
    styles: {
      width: '1440px',
      height: '1024px',
    },
  },
}

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        expanded: true,
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
    },
    options: {
      storySort: {
        order: ['Introduction', 'Base', 'Components', 'Sections'],
      },
    },
    viewport: {
      viewports: customViewports,
    },
  },
}

export default preview
