# Card

## @bobbykim/card-alpha

### Install

```sh
npm i @bobbykim/card-alpha
```

## Usage

In your code

```vue
<script setup lang="ts">
...
import CardAlpha from '@bobbykim/card-alpha'
...
</script>

<template>
  <card-alpha></card-alpha>
</template>
```

### Dependencies

- @bobbykim/manguito-theme
- @bobbykim/btn-alpha

### Props

| Prop              | Type                  | Required | Default     | Description                                     |
| ----------------- | --------------------- | -------- | ----------- | ----------------------------------------------- |
| title             | string                | true     | null        | title of component                              |
| title-size        | string (HeadingSize)  | false    | md          | title size                                      |
| title-color       | string (ColorPalette) | false    | dark-3      | color of title                                  |
| border-color      | string (ColorPalette) | false    | light-3     | color of card border                            |
| bg-color          | string (ColorPalette) | false    | light-1     | background color of card                        |
| display-image     | boolean               | false    | true        | display card image                              |
| image-source      | string                | false    | null        | url of card image source                        |
| image-alt         | string                | false    | null        | alt text of card image                          |
| image-cors        | string (CrossOrigin)  | false    | anonymous   | cors attribute of card image                    |
| display-cta       | boolean               | false    | true        | display cta button                              |
| cta-text          | string                | false    | null        | cta button text                                 |
| cta-color         | string (ColorPalette) | false    | primary     | color of cta button                             |
| cta-link          | string                | false    | null        | cta link of button                              |
| cta-target        | string (CtaTarget)    | false    | '\_self'    | target of cta link on click                     |
| cta-as-link       | boolean               | false    | true        | whether to use cta as link or emitter on click  |
| display-label     | boolean               | false    | true        | display label above title in the component      |
| label-text        | string                | false    | Lorem ipsum | label text of the component                     |
| label-text-color  | string (ColorPalette) | false    | light-1     | label text-color                                |
| label-color       | string (ColorPalette) | false    | dark-4      | baclground color of label                       |
| enlarge-on-hover  | boolean               | false    | false       | scale the component while on hover              |
| display-highlight | boolean               | false    | true        | display highlight under the title               |
| highlight-color   | string (ColorPalette) | false    | primary     | color of highlight                              |
| rounded           | boolean               | false    | true        | rounded corner of card component and cta button |
| display-shadow    | boolean               | false    | true        | display box shadow on the component             |

### Types

```ts
type CrossOrigin = 'use-credentials' | 'anonymous'
type CtaTarget = '_self' | '_blank'
```

### Emits

| Event          | Arguments                 | Usage                                                   |
| -------------- | ------------------------- | ------------------------------------------------------- |
| card-btn-click | event, title, url, target | Emitted on logo click when cta-as-link prop is disabled |
| card-click     | event, title, url, target | Emitted on card click                                   |

### Slots

-Default slot

## @bobbykim/card-beta

### Install

```sh
npm i @bobbykim/card-beta
```

### Usage

In your code

```vue
<script setup lang="ts">
...
import CardBeta from '@bobbykim/card-beta'
...
</script>

<template>
  <card-beta></card-beta>
</template>
```

### Dependencies

- @bobbykim/manguito-theme

### Props

| Prop               | Type                  | Required | Default   | Description                                           |
| ------------------ | --------------------- | -------- | --------- | ----------------------------------------------------- |
| title              | string                | true     | null      | title of component                                    |
| title-size         | string (HeadingSize)  | false    | md        | title size                                            |
| title-color        | string (ColorPalette) | false    | dark-3    | color of title                                        |
| title-block-color  | string (ColorPalette) | false    | dark-4    | color of title block                                  |
| border-color       | string (ColorPalette) | false    | light-3   | color of card border                                  |
| image-source       | string                | false    | null      | url of card image source                              |
| image-alt          | string                | false    | null      | alt text of card image                                |
| image-cors         | string (CrossOrigin)  | false    | anonymous | cors attribute of card image                          |
| display-gray-scale | boolean               | false    | true      | add gray scale to card image that disappears on hover |
| cta-link           | string                | false    | null      | cta link of button                                    |
| cta-target         | string (CtaTarget)    | false    | '\_self'  | target of cta link on click                           |
| cta-as-link        | boolean               | false    | true      | whether to use cta as link or emitter on click        |
| rounded            | boolean               | false    | true      | rounded corner of card component and cta button       |

### Emits

| Event      | Arguments                 | Usage                                                    |
| ---------- | ------------------------- | -------------------------------------------------------- |
| card-click | event, title, url, target | Emitted on title click when cta-as-link prop is disabled |

### Slots

-Default slot
