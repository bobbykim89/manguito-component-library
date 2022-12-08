<p align="center">
    <img width="180" src="public/mcl-logo-square.png" alt="MCL Logo" />
</p>

# Manguito Component Library (MCL)

> A simple component library based on Vue 3, SASS and Tailwind CSS
> MCL uses vite as bundler

## Project Setup

### Install packages

```
npm install
```

### Bootstrap packages

```
npm run bootstrap
```

### Run dev server

```
npm run story:dev
```

### Create new component

```
npm run create
```

### Commit changes

```
git add . --or-- git add <file-name>
npm run commit
git push
```

## Installation

```
npm i -D tailwindcss postcss autoprefixer sass
npm i @bobbykim/manguito-theme
npx tailwindcss init -p
```

tailwind.config.cjs

```tailwind.config.cjs
const {
  mclTheme,
  mclHeading,
} = require('@bobbykim/manguito-theme/themeVariables.cjs')

module.exports = {
  content: ['./src/**/*.{vue,ts,js,cjs}', './node_modules/@bobbykim/**/*.{vue,ts,js,cjs}'],
  theme: mclTheme,
  plugins: [mclHeading],
}
```

## Usage

in your-file.vue

```your-file.vue
<script setup lang='ts'>
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

### Histoire Page

> Histoire
> @histoire/plugin-vue

### Package management

> Lerna

## License

[MIT](http://opensource.org/licenses/MIT)
