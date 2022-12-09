# Manguito Components Library

Manguito Components Library(MCL) is a components library based on Vue 3, Vite and Tailwind CSS.

### Install

```sh
npm i -D tailwindcss postcss autoprefixer sass
npm i @bobbykim/manguito-theme
npx tailwindcss init -p
```

Your main CSS file

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

tailwind.config.cjs

```js
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

### Usage

```vue
<script setup lang="ts">
...
import generateClass from '@bobbykim/manguito-theme'
import type {} from '@bobbykim/manguito-theme/theme/theme.types'
...
</script>
```

### Required packages

- tailwindcss
- autoprefixer
- postcss
- sass
