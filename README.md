<p align="center">
  <a href="https://manguito-component-library.vercel.app" target="_blank">
    <img width="180" src="public/mcl-logo-square.png" alt="MCL Logo" />
  </a>
</p>

# Manguito Component Library (MCL)

<div align="center">
<a href="https://www.npmjs.com/package/@bobbykim/manguito-theme" target="_blank"><img src="https://img.shields.io/npm/v/@bobbykim/manguito-theme.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/package/@bobbykim/manguito-theme" target="_blank"><img src="https://img.shields.io/npm/l/@bobbykim/manguito-theme.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/package/@bobbykim/manguito-theme" target="_blank"><img src="https://img.shields.io/npm/dm/@bobbykim/manguito-theme.svg" alt="NPM Downloads" /></a>
</div>
<br></br>

> A simple component library based on Vue 3, SASS and Tailwind CSS
> MCL uses vite as bundler

## Project Setup

### Install packages

```sh
pnpm install
```

### Run dev server

```sh
pnpm run story:dev
```

### Create new component

```sh
pnpm run package:create
```

### Commit changes

```sh
git add . --or-- git add <file-name>
pnpm commit
git push
```

## Installation

```sh
pnpm i -D tailwindcss postcss autoprefixer sass
pnpm i @bobbykim/manguito-theme
npx tailwindcss init -p
```

tailwind.config.js

```js
const { mclTheme } = require('@bobbykim/mcl-theme')
module.exports = {
  content: [
    './src/**/*.{vue,ts,js,cjs}',
    './node_modules/@bobbykim/**/*.{vue,ts,js,cjs}',
  ],
  plugins: [mclTheme()],
}
```

## Usage

in your-file.vue

```vue
<script setup lang="ts">
import {ComponentName} from '@bobbykim/<PackageName>'
...
</script>

<template>
  ...
  <component-name></component-name>
  ...
</template>
```

## Dependencies

### Components

> Vue
> Vite
> SASS
> Typescript
> Tailwind CSS (tailwindcss, autoprefixer, postcss)
> @vitejs/plugin-vue
> vue-tsc
> @vueuse/core

### Story Page

> Storybook
> @storybook/vue3

### Package management

> Lerna
> pnpm workspace

## License

[MIT](http://opensource.org/licenses/MIT)
