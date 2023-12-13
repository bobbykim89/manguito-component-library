# Button

## @bobbykim/btn-alpha

### Install

```sh
npm i @bobbykim/btn-alpha
```

### Usage

```vue
<script setup lang="ts">
...
import BtnAlpha from '@bobbykim/btn-alpha'
...
</script>

<template>
  <btn-alpha></btn-alpha>
</template>
```

### Dependencies

- @bobbykim/manguito-theme

### Props

| Prop           | Type                  | Required | Default | Description                                  |
| -------------- | --------------------- | -------- | ------- | -------------------------------------------- |
| color          | string (ColorPalette) | false    | primary | color of button component                    |
| text-size      | string (BodyText)     | false    | md      | size of text inside slot                     |
| buttonSize     | string (ButtonSize)   | false    | medium  | padding of button                            |
| block          | boolean               | false    | false   | button will have full width of its container |
| rounded        | boolean               | false    | false   | button will have round corner                |
| display-shadow | boolean               | false    | false   | add drop shadow on component                 |

### Types

```ts
type ButtonSize = 'small' | 'medium' | 'large'
```

### Emits

| Event     | Arguments | Usage                       |
| --------- | --------- | --------------------------- |
| btn-click | event     | emits event on button click |

### Slots

-Default slot

---

## Button-beta

### Install

```sh
npm i @bobbykim/btn-beta
```

### Usage

In your code

```vue
<script setup lang="ts">
...
import BtnBeta from '@bobbykim/btn-beta'
...
</script>

<template>
  <btn-beta></btn-beta>
</template>
```

### Dependencies

- @bobbykim/manguito-theme

### Props

| Prop           | Type                  | Required | Default | Description                                  |
| -------------- | --------------------- | -------- | ------- | -------------------------------------------- |
| color          | string (ColorPalette) | false    | primary | color of button component                    |
| hover-color    | string(ColorPalette)  | false    | light-1 | secondary color of button component          |
| text-size      | string (BodyText)     | false    | md      | size of text inside slot                     |
| buttonSize     | string (ButtonSize)   | false    | medium  | padding of button                            |
| is-block       | boolean               | false    | false   | button will have full width of its container |
| rounded        | boolean               | false    | false   | button will have round corner                |
| display-shadow | boolean               | false    | false   | add drop shadow on component                 |

### Types

```ts
type ButtonSize = 'small' | 'medium' | 'large'
```

### Emits

| Event     | Arguments | Usage                       |
| --------- | --------- | --------------------------- |
| btn-click | event     | emits event on button click |

### Slots

-Default slot
