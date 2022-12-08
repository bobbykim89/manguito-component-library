# @bobbykim/manguito-theme

manguito-theme includes basic config for MCL, including theme.types and generateClass function that returns tailwindCSS style classes.

## Demo

[Enjoy]({%sbLink%})

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
import generateClass from '@bobbykim/manguito-theme'
...
</script>

<template>
  ...
  <component-name></component-name>
  ...
</template>
```

## Authors

- **Bobby Kim** - _Initial work_

## License

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details
