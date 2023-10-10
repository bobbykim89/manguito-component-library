# Navbar

## @bobbykim/nav-alpha

### Install

```sh
npm i @bobbykim/nav-alpha
```

### Usage

```vue
<script setup lang="ts">
...
import NavAlpha from '@bobbykim/nav-alpha'
...
</script>

<template>
  <nav-alpha></nav-alpha>
</template>
```

### Dependencies

- @bobbykim/manguito-theme

### Props

| Prop                 | Type                  | Required | Default | Description                                                             |
| -------------------- | --------------------- | -------- | ------- | ----------------------------------------------------------------------- |
| title                | string                | true     | null    | title of the component                                                  |
| title-size           | string (HeadingSize)  | false    | md      | size of the title text                                                  |
| title-color          | string (ColorPalette) | false    | dark-3  | color of the title texr                                                 |
| title-as-link        | boolean               | false    | true    | choice of title click event (link or emit event)                        |
| title-link           | string                | true     | null    | url of title link                                                       |
| title-link-target    | string (CtaTarget)    | false    | \_self  | target of title link                                                    |
| logo                 | string                | true     | null    | image source for logo of the component                                  |
| logo-small           | string                | false    | null    | image source for logo to be displayed in mobile screen (optional)       |
| logo-as-link         | boolean               | false    | true    | choice of logo click event (link or emit event)                         |
| logo-link            | string                | true     | null    | url of logo link                                                        |
| logo-link-target     | string (CtaTarget)    | false    | \_self  | target of logo link                                                     |
| nav-items            | array (NavItemType[]) | true     | null    | list of items to be displayed in the component                          |
| nav-items-as-link    | boolean               | false    | true    | choice of nav item click event (link or emit event)                     |
| menu-text-size       | string (BodyText)     | false    | md      | size of menu text                                                       |
| menu-text-color      | string (ColorPalette) | false    | dark-3  | color of menu text                                                      |
| menu-text-bold       | boolean               | false    | false   | make menu text bold                                                     |
| display-highlight    | boolean               | false    | true    | display the highlight under menu text on hover/focus                    |
| highlight-color      | string (ColorPalette) | false    | primary | color of menu highlight                                                 |
| bg-color             | string (ColorPalette) | false    | light-1 | background color of the component                                       |
| mobile-menu-bg-color | string (ColorPalette) | false    | light-2 | background color of nav link list in mobile device                      |
| secondary-color      | string                | false    | dark-1  | color of hamburger menu and dropdown focus/hover color in mobile device |
| hamburger-border     | boolean               | false    | true    | display border of hamburger menu on mobile screen                       |
| fade-in-on-scroll    | boolean               | false    | true    | fade in background effect on scroll                                     |
| scroll-distance      | number                | false    | 50 (px) | distance fade in effect will occur                                      |

### Types

```ts
interface NavItemType {
  title: string
  url: string
  target?: CtaTarget
}
interface NavCollapseType {
  title: string
  children: NavItemType[]
}
interface NavChildClickEventType {
  event: Event
  item: NavItemType
}
```

### Emits

| Event       | Arguments                                          | Usage                                                       |
| ----------- | -------------------------------------------------- | ----------------------------------------------------------- |
| logo-click  | event, title, link, target                         | Emitted on logo click when logo-as-link prop is disabled    |
| title-click | event, title, link, target                         | Emitted on title click when title-as-link prop is disabled  |
| menu-click  | event, navItem.title, navItem.link, navitem.target | Emitted on menu item click when nav-item-as-link is diabled |

### Slots

- `#nav-slot`: on right side of component on screen bigger than 768px
- `#mobile-slot`: below the nav menu on screen smaller than 768px
