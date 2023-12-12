import type { Preview } from '@storybook/vue3'
import '../src/assets/style.css'

const customViewports = {
  small: {
    name: 'Small',
    styles: {
      width: '640px',
      height: '1024px',
    },
  },
  medium: {
    name: 'Medium',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
  large: {
    name: 'Large',
    styles: {
      width: '1024px',
      height: '1024px',
    },
  },
  xLarge: {
    name: 'X-large',
    styles: {
      width: '1280px',
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
