# Container

## @bobbykim/container-alpha

### Install

```sh
npm i @bobbykim/container-alpha
```

### Usage

In your code

```vue
<script setup lang="ts">
...
import ContainerAlpha from '@bobbykim/container-alpha'
...
</script>

<template>
  <container-alpha></container-alpha>
</template>
```

### Dependencies

- @bobbykim/manguito-theme

### Props

| Prop                 | Type                  | Required | Default | Description                                          |
| -------------------- | --------------------- | -------- | ------- | ---------------------------------------------------- |
| section-bg           | string (ColorPalette) | false    | light-1 | section background color                             |
| container-bg         | string (ColorPalette) | false    | primary | container area background color                      |
| top-direction        | string (Position)     | false    | left    | direction of top part triangle                       |
| bottom-direction     | string (Position)     | false    | left    | direction of bottom part triangle                    |
| display-right-column | boolean               | false    | true    | display second column on the right side of container |
| left-column-width    | number (ColumnWidth)  | false    | 50      | width of left side of column in container            |

### Types

```ts
type ColumnWidth = 25 | 50 | 75 | 100
```

### Slots

- `#left-column`: slot in the left column section
- `#right-column`: slot in the right column section
