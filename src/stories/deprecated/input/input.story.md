# Input

## @bobbykim/mcl-input

mcl input description

## @bobbykim/mcl-text-area

mcl text area description

## @bobbykim/mcl-input-file

### Install

```sh
npm i @bobbykim/mcl-input-file
```

### Usage

`import MclInputFile from "@bobbykim/mcl-input-file"`;

In your code

```vue
<script setup lang="ts">
...
import MclInputFile from '@bobbykim/mcl-input-file'
...
</script>

<template>
  <mcl-input-file></mcl-input-file>
</template>
```

### Required packages

- @bobbykim/manguito-theme

### Props

| Prop              | Type                  | Required | Default                        | Description                                      |
| ----------------- | --------------------- | -------- | ------------------------------ | ------------------------------------------------ |
| identifier        | string                | true     | null                           | input component id                               |
| display-label     | boolean               | false    | true                           | display label above input                        |
| label-text        | string                | false    | null                           | label text to be displayed                       |
| label-color       | string (ColorPalette) | false    | dark-3                         | color of label text                              |
| label-bold        | boolean               | false    | true                           | make label text bold                             |
| display-border    | boolean               | false    | false                          | display border of input component                |
| border-color      | string (ColorPalette) | false    | light-4                        | border color of the component                    |
| bg-color          | string (ColorPalette) | false    | light-1                        | background color of the component                |
| button-text       | string                | false    | Browse                         | text for button on the component                 |
| button-text-color | string (ColorPalette) | false    | dark-3                         | color of text on the button of component         |
| button-color      | string (ColorPalette) | false    | light-4                        | background color of the button                   |
| display-shadow    | boolean               | false    | true                           | display box shadow around the component          |
| is-required       | boolean               | false    | false                          | make input variable required for form submission |
| accept            | string                | false    | image/jpg,image/jpeg,image/png | sets acceptable file format                      |
| spacing           | string (SpacingLevel) | false    | md                             | sets margin-bottom of the component              |
