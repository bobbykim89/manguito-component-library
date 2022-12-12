# Carousel

## @bobbykim/carousel-alpha

## Install

```sh
npm i @bobbykim/carousel-alpha
```

## Usage

In your code

```vue
<script setup lang="ts">
...
import CarouselAlpha from '@bobbykim/carousel-alpha'
...
</script>

<template>
  <carousel-alpha>
    <!-- adding nested card-components -->
    <template #carousel="{ setRef, cards }">
      <card-component
        v-for="(card, i) in cards"
        :key="i"
        :ref="(el) => setRef(el)"
        class="mr-xs last:mr-0 h-full"
      ></card-component>
    </template>
  </carousel-alpha>
</template>
```

## Dependencies

- @bobbykim/manguito-theme
- @bobbykim/card-alpha
- @bobbykim/card-beta

### Props

| Prop                | Type                  | Required | Default   | Description                                    |
| ------------------- | --------------------- | -------- | --------- | ---------------------------------------------- |
| title               | string                | true     | null      | title of component                             |
| title-size          | string (HeadingSize)  | false    | md        | title size                                     |
| title-color         | string (ColorPalette) | false    | dark-3    | color of title                                 |
| bg-color            | string (ColorPalette) | false    | light-1   | background color of section                    |
| display-tag-line    | boolean               | false    | true      | display small text above the title             |
| tag-line-upper-case | boolean               | false    | true      | display tag-line text in upper case            |
| tag-line            | string                | false    | null      | tag line text                                  |
| tag-line-size       | string (BodyText)     | false    | md        | size of tag-line text                          |
| tag-line-color      | string (ColorPalette) | false    | dark-1    | color of tag-line text                         |
| display-highlight   | boolean               | false    | true      | display highlight on left side of text section |
| highlight-color     | string (ColorPalette) | false    | primary   | color of highlight                             |
| btn-color           | string (ColorPalette) | false    | dark-3    | color of svg icon inside navigation button     |
| btn-bg-color        | string (ColorPalette) | false    | 'light-4' | color of navigation button color               |
| cardsContent        | []                    | true     | null      | information to get inside the card slider area |
| cards-gap           | string (SpacingLevel) | false    | xs        | gap between each card component                |

### Emits

| Event    | Arguments | Usage                        |
| -------- | --------- | ---------------------------- |
| btn-prev | event     | Emitted prev button click    |
| btn-next | event     | Emitted on next button click |

### Slots

- `#description`: slot in the text section
- `#carousel`: default card slider-section at the bottom of the component

### Notes

- currently only supporting card-alpha and card-beta component inside slot
