# @bobbykim/carousel-alpha

## Demo

[MCL Histoire Page](https://manguito-component-library.vercel.app/story/src-stories-sections-carousel-carousel-story-vue?variantId=src-stories-sections-carousel-carousel-story-vue-0)

## Install

```sh
npm i @bobbykim/carousel-alpha
```

## Usage

`import CarouselAlpha from "@bobbykim/carousel-alpha"`;

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

## Required packages

- @bobbykim/manguito-theme
- @bobbykim/card-alpha
- @bobbykim/card-beta
- @bobbykim/card-delta

## Maintainers

- **Bobby Kim** - _Initial work_

## License

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details
