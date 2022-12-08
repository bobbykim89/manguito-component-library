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
  mclHeading,
} = require('@bobbykim/manguito-theme/themeVariables.cjs')

module.exports = {
  content: [
    './src/**/*.{vue,ts,js,cjs}',
    './node_modules/@bobbykim/**/*.{vue,ts,js,cjs}',
  ],
  theme: mclTheme,
  plugins: [mclHeading],
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
