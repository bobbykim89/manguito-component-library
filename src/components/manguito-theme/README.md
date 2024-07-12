# @bobbykim/manguito-theme

manguito-theme includes basic config for MCL, including type definitions for theme and base components, and generateClass function that returns tailwindCSS style classes.

## Demo

[MCL Storybook Page](https://manguito-component-library.vercel.app/)

- [Installation](https://manguito-component-library.vercel.app/?path=/docs/introduction-installation--docs)
- Base Components
  - [Alert](https://manguito-component-library.vercel.app/?path=/docs/base-base-component-alert-component--alert)
  - [Carousel](https://manguito-component-library.vercel.app/?path=/docs/base-base-component-carousel-component--carousel)
  - [Collapse](https://manguito-component-library.vercel.app/?path=/docs/base-base-component-collapse-component--collapse)
  - [Dropdown](https://manguito-component-library.vercel.app/?path=/docs/base-base-component-dropdown-component--dropdown)
  - [Modal](https://manguito-component-library.vercel.app/?path=/docs/base-base-component-modal-component--modal)
  - [Sidebar](https://manguito-component-library.vercel.app/?path=/docs/base-base-component-sidebar-component--sidebar)
  - [Tabs](https://manguito-component-library.vercel.app/?path=/docs/base-base-component-tab-component--tabs)
  - [Tooltip](https://manguito-component-library.vercel.app/?path=/docs/base-base-component-tooltip-component--tooltip)
  - [Header (Horizontal)](https://manguito-component-library.vercel.app/?path=/docs/base-base-component-header-horizontal--headerhorizontal)
  - [Header (Vertical)](https://manguito-component-library.vercel.app/?path=/docs/base-base-component-header-vertical--headervertical)
- Utility Class
  - [Button Class](https://manguito-component-library.vercel.app/?path=/docs/base-utility-class-button-class--button)
  - [Link Class](https://manguito-component-library.vercel.app/?path=/docs/base-utility-class-link-class--link)
  - [List Class](https://manguito-component-library.vercel.app/?path=/docs/base-utility-class-list-class--list)

## Install

```sh
npm i -D tailwindcss postcss autoprefixer sass @vueuse/core
npm i @bobbykim/manguito-theme
npx tailwindcss init -p
```

## Setup

tailwind.config.{js|ts}

```ts
import type { Config } from 'tailwindcss'
import { mclTheme } from '@bobbykim/manguito-theme/mcl-theme'

export default {
  content: ['./src/**/*.{vue,ts,js,cjs}'],
  plugins: [mclTheme({})],
} satisfies Config
```

## Theme color configuration

You can change theme colors by adding colors/spacing in `tailwind.config.cjs` | `tailwind.config.js` | `tailwind.config.ts`

```cjs
module.exports = {
  content: [
    './src/**/*.{vue,ts,js,cjs}',
    './node_modules/@bobbykim/**/*.{vue,ts,js,cjs}',
  ],
  plugins: [
    mclTheme({
      colors: {
        primary: '#ec489a',
        secondary: '#00feda',
        success: '#78be20',
        info: '#00a3e0',
        warning: '#f1ac18',
        danger: '#cc2f2f',
        'light-1': '#fafafa',
        'light-2': '#f1f1f1',
        'light-3': '#e8e8e8',
        'light-4': '#d0d0d0',
        'dark-1': '#747474',
        'dark-2': '#484848',
        'dark-3': '#1f2937',
        'dark-4': '#191919',
      },
      spacing: {
        '3xs': '4px',
        '2xs': '8px',
        xs: '16px',
        sm: '24px',
        md: '32px',
        lg: '48px',
        xl: '64px',
        '2xl': '96px',
        '3xl': '128px',
      },
    }),
  ],
}
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
