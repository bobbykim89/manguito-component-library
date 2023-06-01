# @bobbykim/manguito-theme

manguito-theme includes basic config for MCL, including theme.types and generateClass function that returns tailwindCSS style classes.

## Demo

[MCL Histoire Page](https://manguito-component-library.vercel.app/story/src-stories-documentation-mcltheme-story-vue?variantId=src-stories-documentation-mcltheme-story-vue-0)

## Install

```sh
npm i -D tailwindcss postcss autoprefixer sass
npm i @bobbykim/manguito-theme
npx tailwindcss init -p
```

## Setup

tailwind.config.cjs

```cjs
const {
  mclTheme,
} = require('./src/components/manguito-theme/themeVariables.cjs')
module.exports = {
  content: [
    './src/**/*.{vue,ts,js,cjs}',
    './node_modules/@bobbykim/**/*.{vue,ts,js,cjs}',
  ],
  plugins: [mclTheme()],
}
```

## Theme color configuration

You can change theme colors by adding colors/spacing in `tailwind.config.cjs`

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
import generateClass from '@bobbykim/manguito-theme'
import type { <Type you need> } from '@bobbykim/manguito-theme/theme/theme.types'
...
</script>

<template>...</template>
```

## Authors

- **Bobby Kim** - _Initial work_

## License

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details
