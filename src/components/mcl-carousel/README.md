# @bobbykim/mcl-carousel

## Demo

[MCL Storybook Page](https://manguito-component-library.vercel.app/)

- [MCL Carousel A](https://manguito-component-library.vercel.app/?path=/docs/sections-carousel-mclcarousela--mclcarousela)

## Install

```sh
npm i @bobbykim/mcl-carousel
```

## Usage

`import { MclCarouselA } from "@bobbykim/mcl-carousel"`;

```vue
<script setup lang="ts">
...
import { MclCarouselA } from "@bobbykim/mcl-carousel"
...
</script>

<template>
  <mcl-carousel-a>
    <!-- adding nested card-components -->
    <template #carousel="{ setRef, cards }">
      <card-component
        v-for="(card, i) in cards"
        :key="i"
        :ref="(el) => setRef(el)"
        class="mr-xs last:mr-0 h-full"
      ></card-component>
    </template>
  </mcl-carousel-a>
</template>
```

## Dependencies

- @bobbykim/manguito-theme

## Maintainer

- **Bobby Kim** - _Initial work_

## License

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details
