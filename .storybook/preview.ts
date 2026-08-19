import type { Preview } from '@storybook/vue3-vite'
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
      height: '835px',
    },
  },
  laptop: {
    name: 'Laptop',
    styles: {
      width: '1024px',
      height: '835px',
    },
  },
  desktop: {
    name: 'Desktop',
    styles: {
      width: '1440px',
      height: '835px',
    },
  },
}

const preview: Preview = {
  parameters: {
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Introduction', 'Base', 'Components', 'Sections'],
      },
    },
    viewport: {
      options: customViewports,
    },
  },
  initialGlobals: {
    backgrounds: {
      value: 'dark',
    },
  },
}

export default preview
