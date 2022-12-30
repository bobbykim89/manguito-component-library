# Hero

## @bobbykim/hero-alpha

### Install

```sh
npm i @bobbykim/hero-alpha
```

### Usage

`import HeroAlpha from "@bobbykim/hero-alpha"`;

In your code

```vue
<script setup lang="ts">
...
import HeroAlpha from '@bobbykim/hero-alpha'
...
</script>

<template>
  <hero-alpha></hero-alpha>
</template>
```

### Required packages

- @bobbykim/manguito-theme

### Props

| Prop                        | Type                  | Required | Default | Description                                            |
| --------------------------- | --------------------- | -------- | ------- | ------------------------------------------------------ |
| title                       | string                | true     | null    | title of hero section component                        |
| title-level                 | string (HeadingLevel) | false    | h1      | heading level of title                                 |
| title-size                  | string (HeadingSize)  | false    | md      | size of title                                          |
| title-color                 | string (ColorPalette) | false    | dark-3  | color of title                                         |
| display-subtitle            | boolean               | false    | true    | display subtitle of component                          |
| sub-title                   | string                | false    | null    | subtitle text of component                             |
| sub-title-level             | string (HeadingLevel) | false    | h3      | heading level of subtitle                              |
| sub-title-size              | string (HeadingSize)  | false    | md      | size of subtitle                                       |
| sub-title-color             | string (ColorPalette) | false    | dark-3  | color of subtitle                                      |
| display-sub-title-highlight | boolean               | false    | false   | highlight the subtitle                                 |
| sub-title-highlight-color   | string (ColorPalette) | false    | primary | color of highlight on subtitle                         |
| bg-image                    | string                | true     | null    | bg image source of component                           |
| bg-color                    | string (ColorPalette) | false    | white   | background color of component                          |
| img-position                | string (Directions)   | false    | right   | location of image in desktop screen                    |
| display-filter              | boolean               | false    | true    | display filter above background image in mobile screen |
| filter-opacity              | number                | false    | 30      | opacity of filter in mobile screen                     |

### Types

```ts
type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4'
type HeadingSize = 'sm' | 'md' | 'lg' | 'xl'
type Directions = 'left' | 'right'
```

---

## hero-beta

hero beta description

## hero-gamma

currently parallax effect is not applied properly in Histoire.js, but still it is working properly in application
