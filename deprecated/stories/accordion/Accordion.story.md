# Accordion

## @bobbykim/accordion-alpha

### Install

```sh
npm i @bobbykim/accordion-alpha
```

### Usage

In your code

```vue
<script setup lang="ts">
...
import AccordionAlpha from '@bobbykim/accordion-alpha'
...
</script>

<template>
  <accordion-alpha></accordion-alpha>
</template>
```

### Dependencies

- @bobbykim/manguito-theme

### Props

| Prop              | Type                   | Required | Default   | Description                                      |
| ----------------- | ---------------------- | -------- | --------- | ------------------------------------------------ |
| collapse-id       | string                 | true     | null      | id to trigger collapse event                     |
| title             | string                 | true     | null      | title of component                               |
| title-color       | string (ColorPalette)  | false    | dark-3    | color of title                                   |
| title-size        | string (HeadingSize)   | false    | sm        | size of title                                    |
| border-color      | string (Color Palette) | false    | light-4   | color of component border                        |
| rounded           | boolean                | false    | false     | rounding border of component                     |
| display-highlight | boolean                | false    | true      | displaying highlight on left side of component   |
| highlight-color   | string (ColorPalette)  | false    | secondary | color of highlight                               |
| visible           | boolean                | false    | false     | whether to have content visible                  |
| icon-color        | string (ColorPalette)  | false    | dark-3    | color of chevron icon at the bottom of component |
| bg-color          | string (ColorPalette)  | false    | white     | color of accordion head                          |
| slot-bg-color     | string (ColorPalette)  | false    | light-2   | background color of collapsable slot             |
| accordion         | string                 | false    | null      | name of accordion group                          |

### Emits

| Event           | Arguments      | Usage                             |
| --------------- | -------------- | --------------------------------- |
| accordion-open  | visible, title | emits event on toggling component |
| accordion-close | visible, title | emits event on toggling component |

### Slots

- `#tab`: slot in the right side of accordion head, does not affected by default accordion click behavior (toggle)
- `#content`: slot in the content area

---

## @bobbykim/accordion-beta

### Install

```sh
npm i @bobbykim/accordion-beta
```

### Usage

In your code

```vue
<script setup lang="ts">
...
import AccordionBeta from '@bobbykim/accordion-beta'
...
</script>

<template>
  <accordion-beta></accordion-beta>
</template>
```

### Dependencies

- @bobbykim/manguito-theme

### Props

| Prop           | Type                  | Required | Default | Description                                            |
| -------------- | --------------------- | -------- | ------- | ------------------------------------------------------ |
| collapse-id    | string                | true     | null    | id to trigger collapse event                           |
| title          | string                | true     | null    | title of component                                     |
| title-color    | string (ColorPalette) | false    | light-1 | color of title                                         |
| title-size     | string (HeadingSize)  | false    | md      | size of title                                          |
| border-color   | string (ColorPalette) | false    | light-3 | border color of component                              |
| bg-color       | string (ColorPalette) | false    | light-1 | color of ring and background color of collapsable slot |
| btn-color      | string (ColorPalette) | false    | primary | background color of title area                         |
| icon-color     | string (ColorPalette) | false    | light-1 | color of chevron icon on right side                    |
| rounded        | boolean               | false    | true    | rounding border of component                           |
| display-shadow | boolean               | false    | true    | add box shadow on the component                        |
| visible        | boolean               | false    | false   | component toggled open when component is mounted       |
| accordion      | string                | false    | null    | name of accordion group                                |

### Emits

| Event           | Arguments      | Usage                             |
| --------------- | -------------- | --------------------------------- |
| accordion-open  | visible, title | emits event on toggling component |
| accordion-close | visible, title | emits event on toggling component |

### Slots

-Default slot
