# Parallax

## @bobbykim/parallax-alpha

### Install

```sh
npm i @bobbykim/parallax-alpha
```

### Usage

```vue
<script setup lang="ts">
...
import ParallaxAlpha from '@bobbykim/parallax-alpha'
...
</script>

<template>
  <parallax-alpha></parallax-alpha>
</template>
```

### Dependencies

- @bobbykim/manguito-theme

### Props

| Prop               | Type                  | Required | Default     | Description                                                                                                     |
| ------------------ | --------------------- | -------- | ----------- | --------------------------------------------------------------------------------------------------------------- |
| title              | string                | true     | null        | Title text of section                                                                                           |
| title-level        | string (HeadingLevel) | false    | h2          | Heading level of title text                                                                                     |
| title-size         | string (HeadingSize)  | false    | md          | Size of title text                                                                                              |
| title-color        | string (ColorPalette) | false    | dark-3      | Color of title text                                                                                             |
| section-bg-color   | string (ColorPalette) | false    | transparent | Background color of the component                                                                               |
| container-bg-color | string (ColorPalette) | false    | light-2     | Background color of content container                                                                           |
| bg-image           | string                | true     | null        | Url of background image for parallax component                                                                  |
| img-height-sm      | number                | false    | 256         | Height of image in mobile screen                                                                                |
| img-height-lg      | number                | false    | 384         | Height of imge in tablet or larger screen, applies img-height-sm if img-height-lg is smaller than img-height-sm |

### Slots

- `#content`: content area inside the container.
