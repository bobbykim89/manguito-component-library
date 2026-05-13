# @bobbykim/mcl-collapse

## Demo

[MCL Storybook Page](https://manguito-component-library.vercel.app/)

- [MCL Collapse A](https://manguito-component-library.vercel.app/?path=/docs/components-collapse-mclcollapsea--mclcollapsea)
- [MCL Collapse B](https://manguito-component-library.vercel.app/?path=/docs/components-collapse-mclcollapseb--mclcollapseb)

## Install

```sh
npm i @bobbykim/mcl-collapse
```

## Usage

### Standalone collapse

Each component manages its own open/close state internally. No wrapper needed.

```vue
<script setup lang="ts">
import { MclCollapseA, MclCollapseB } from '@bobbykim/mcl-collapse'
</script>

<template>
  <MclCollapseA collapse-id="item-1" title="Section 1">
    <template #content>Content here</template>
  </MclCollapseA>

  <MclCollapseB collapse-id="item-2" title="Section 2">
    Content here
  </MclCollapseB>
</template>
```

### Accordion group

Wrap components in `AccordionGroup` to ensure only one item is open at a time. `AccordionGroup` is exported from `@bobbykim/manguito-theme`.

```vue
<script setup lang="ts">
import { AccordionGroup } from '@bobbykim/manguito-theme'
import { MclCollapseA } from '@bobbykim/mcl-collapse'
</script>

<template>
  <AccordionGroup>
    <MclCollapseA collapse-id="item-1" title="Item 1">
      <template #content>Content 1</template>
    </MclCollapseA>
    <MclCollapseA collapse-id="item-2" title="Item 2">
      <template #content>Content 2</template>
    </MclCollapseA>
    <MclCollapseA collapse-id="item-3" title="Item 3">
      <template #content>Content 3</template>
    </MclCollapseA>
  </AccordionGroup>
</template>
```

## Migration from v-collapse

The `v-collapse` directive and `accordion` prop are deprecated. Components no longer respond to `v-collapse` — state is managed internally.

| Old | New |
|---|---|
| `v-collapse:itemId` on trigger | handled internally — no change needed |
| `:accordion="groupName"` prop | wrap components in `<AccordionGroup>` |

## Dependencies

- @bobbykim/manguito-theme

## Maintainer

- **Bobby Kim** - _Initial work_

## License

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details
