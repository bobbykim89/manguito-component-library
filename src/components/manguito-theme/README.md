# @bobbykim/manguito-theme

manguito-theme includes basic config for MCL, including type definitions for theme and base components, and generateClass function that returns tailwindCSS style classes.

## Demo

[MCL Storybook Page](https://manguito-component-library.vercel.app/)

- [Installation](https://manguito-component-library.vercel.app/?path=/docs/introduction-installation--docs)
- Base Components
  - [Alert](https://manguito-component-library.vercel.app/?path=/docs/base-base-component-alert-component--alert)
  - [Card](https://manguito-component-library.vercel.app/?path=/docs/base-base-component-card-component--card)
  - [Carousel](https://manguito-component-library.vercel.app/?path=/docs/base-base-component-carousel-component--carousel)
  - [Collapse](https://manguito-component-library.vercel.app/?path=/docs/base-base-component-collapse-component--collapse)
  - [Dropdown](https://manguito-component-library.vercel.app/?path=/docs/base-base-component-dropdown-component--dropdown)
  - [Modal](https://manguito-component-library.vercel.app/?path=/docs/base-base-component-modal-component--modal)
  - [Sidebar](https://manguito-component-library.vercel.app/?path=/docs/base-base-component-sidebar-component--sidebar)
  - [Tabs](https://manguito-component-library.vercel.app/?path=/docs/base-base-component-tab-component--tabs)
  - [Tooltip](https://manguito-component-library.vercel.app/?path=/docs/base-base-component-directives-tooltip--tooltip)
  - [Click Outside](https://manguito-component-library.vercel.app/?path=/docs/base-base-component-directives-click-outside--clickoutside)
  - [Header (Horizontal)](https://manguito-component-library.vercel.app/?path=/docs/base-base-component-header-horizontal--headerhorizontal)
  - [Header (Vertical)](https://manguito-component-library.vercel.app/?path=/docs/base-base-component-header-vertical--headervertical)
- Utility Class
  - [Button Class](https://manguito-component-library.vercel.app/?path=/docs/base-utility-class-button-class--button)
  - [Link Class](https://manguito-component-library.vercel.app/?path=/docs/base-utility-class-link-class--link)
  - [List Class](https://manguito-component-library.vercel.app/?path=/docs/base-utility-class-list-class--list)

## Install

```sh
npm i -D tailwindcss postcss @tailwindcss/postcss sass @vueuse/core
npm i @bobbykim/manguito-theme
```

## Setup

in postcss.config.js file:

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

in you main css file

```css
@import 'tailwindcss';
@import '@bobbykim/manguito-theme/mcl-theme-v4.css';
@source '...<relative path from css file>/node_modules/@bobbykim';
```

## Theme color configuration

You can change theme configurations through few different methods.

Method 1: CSS Variable Override

```css
@import 'tailwindcss';

/* User's custom theme overrides */
:root {
  /* Custom color palette */
  --mcl-primary: #3b82f6; /* Custom blue */
  --mcl-secondary: #10b981; /* Custom green */
  --mcl-danger: #ef4444; /* Custom red */
  --mcl-warning: #f59e0b; /* Custom amber */

  /* Custom spacing */
  --mcl-spacing-xs: 12px; /* Instead of default 16px */
  --mcl-spacing-md: 24px; /* Instead of default 32px */

  /* Custom font sizes */
  --mcl-text-size-lg: 20px; /* Instead of default 18px */
}

/* Import MCL theme after defining overrides */
@import '@bobbykim/manguito-theme/mcl-theme-v4.css';
```

Method 2: CSS Layer Override

```css
@import 'tailwindcss';
@import '@bobbykim/manguito-theme/mcl-theme-v4.css';

@layer theme {
  @theme {
    /* Override specific colors */
    --color-primary: #8b5cf6;
    --color-secondary: #06b6d4;

    /* Add new custom colors */
    --color-brand: #ff6b35;
    --color-accent: #4ade80;

    /* Override spacing */
    --spacing-lg: 56px;
    --spacing-xl: 80px;
  }
}
```

Method 3: Dynamic Theme Switching
Users can implement theme switching by changing CSS variables dynamically:

```css
@import 'tailwindcss';

/* Light theme */
[data-theme='light'] {
  --mcl-primary: #2563eb;
  --mcl-secondary: #059669;
  --mcl-dark-3: #374151;
}

/* Dark theme */
[data-theme='dark'] {
  --mcl-primary: #3b82f6;
  --mcl-secondary: #10b981;
  --mcl-dark-3: #111827;
}

/* Import theme after defining theme variants */
@import '@bobbykim/manguito-theme/mcl-theme-v4.css';
```

## Usage

`import generateClass from '@bobbykim/manguito-theme'`

in Vue component file.

```vue
<script setup lang="ts">
...
import generateClass, { <Base component you need>} from '@bobbykim/manguito-theme'
import type { <Type you need> } from '@bobbykim/manguito-theme'
...
</script>

<template>...</template>
```

## Dependencies

- @vueuse/core
- vue

## Dev Dependencies

- autoprefixer
- postcss
- sass
- tailwindcss

## Maintainers

- **Bobby Kim** - _Initial work_

## License

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details
