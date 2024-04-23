<p align="center">
    <img width="180" src="public/mcl-logo-square.png" alt="MCL Logo" />
</p>

# Manguito Component Library (MCL)

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
import ComponentName from '@bobbykim/<ComponentName>'
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
