# @bobbykim/manguito-theme

manguito-theme includes basic config for MCL, including type definitions for theme and base components, and generateClass function that returns tailwindCSS style classes.

## Demo

[MCL Storybook Page](https://manguito-component-library.vercel.app/)

- [Installation](https://manguito-component-library.vercel.app/?path=/docs/introduction-installation--docs)
- Base Components
  - [Alert](https://manguito-component-library.vercel.app/?path=/docs/base-base-component-alert-component--alert)
  - [Card](https://manguito-component-library.vercel.app/?path=/docs/base-base-component-card-component--card)
  - [Carousel](https://manguito-component-library.vercel.app/?path=/docs/base-base-component-carousel-component--carousel)
  - [Collapse](https://manguito-component-library.vercel.app/?path=/docs/base-base-component-collapse-component--collapse)
  - [Dropdown](https://manguito-component-library.vercel.app/?path=/docs/base-base-component-dropdown-component--dropdown)
  - [Modal](https://manguito-component-library.vercel.app/?path=/docs/base-base-component-modal-component--modal)
  - [Sidebar](https://manguito-component-library.vercel.app/?path=/docs/base-base-component-sidebar-component--sidebar)
  - [Tabs](https://manguito-component-library.vercel.app/?path=/docs/base-base-component-tab-component--tabs)
  - [Tooltip](https://manguito-component-library.vercel.app/?path=/docs/base-base-component-directives-tooltip--tooltip)
  - [Click Outside](https://manguito-component-library.vercel.app/?path=/docs/base-base-component-directives-click-outside--clickoutside)
  - [Header (Horizontal)](https://manguito-component-library.vercel.app/?path=/docs/base-base-component-header-horizontal--headerhorizontal)
  - [Header (Vertical)](https://manguito-component-library.vercel.app/?path=/docs/base-base-component-header-vertical--headervertical)
- Utility Class
  - [Button Class](https://manguito-component-library.vercel.app/?path=/docs/base-utility-class-button-class--button)
  - [Link Class](https://manguito-component-library.vercel.app/?path=/docs/base-utility-class-link-class--link)
  - [List Class](https://manguito-component-library.vercel.app/?path=/docs/base-utility-class-list-class--list)

## Install

```sh
npm i -D tailwindcss postcss @tailwindcss/postcss sass @vueuse/core
npm i @bobbykim/manguito-theme
```

## Setup

in postcss.config.js file:

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

in you main css file

```css
@import 'tailwindcss';
@import '@bobbykim/manguito-theme/mcl-theme-v4.css';
@source '...<relative path from css file>/node_modules/@bobbykim';
```

## Theme color configuration

You can change theme configurations through few different methods.

Method 1: CSS Variable Override

```css
@import 'tailwindcss';

/* User's custom theme overrides */
:root {
  /* Custom color palette */
  --mcl-primary: #3b82f6; /* Custom blue */
  --mcl-secondary: #10b981; /* Custom green */
  --mcl-danger: #ef4444; /* Custom red */
  --mcl-warning: #f59e0b; /* Custom amber */

  /* Custom spacing */
  --mcl-spacing-xs: 12px; /* Instead of default 16px */
  --mcl-spacing-md: 24px; /* Instead of default 32px */

  /* Custom font sizes */
  --mcl-text-size-lg: 20px; /* Instead of default 18px */
}

/* Import MCL theme after defining overrides */
@import '@bobbykim/manguito-theme/mcl-theme-v4.css';
```

Method 2: CSS Layer Override

```css
@import 'tailwindcss';
@import '@bobbykim/manguito-theme/mcl-theme-v4.css';

@layer theme {
  @theme {
    /* Override specific colors */
    --color-primary: #8b5cf6;
    --color-secondary: #06b6d4;

    /* Add new custom colors */
    --color-brand: #ff6b35;
    --color-accent: #4ade80;

    /* Override spacing */
    --spacing-lg: 56px;
    --spacing-xl: 80px;
  }
}
```

Method 3: Dynamic Theme Switching
Users can implement theme switching by changing CSS variables dynamically:

```css
@import 'tailwindcss';

/* Light theme */
[data-theme='light'] {
  --mcl-primary: #2563eb;
  --mcl-secondary: #059669;
  --mcl-dark-3: #374151;
}

/* Dark theme */
[data-theme='dark'] {
  --mcl-primary: #3b82f6;
  --mcl-secondary: #10b981;
  --mcl-dark-3: #111827;
}

/* Import theme after defining theme variants */
@import '@bobbykim/manguito-theme/mcl-theme-v4.css';
```

## Usage

`import generateClass from '@bobbykim/manguito-theme'`

in Vue component file.

```vue
<script setup lang="ts">
...
import generateClass, { <Base component you need> } from '@bobbykim/manguito-theme'
import type { <Type you need> } from '@bobbykim/manguito-theme'
...
</script>

<template>...</template>
```

### Collapse

The base `Collapse` component provides an animated height/opacity transition for collapsible content. It is controlled entirely from the outside — via the `:visible` prop or the `open()` / `close()` / `toggle()` methods exposed through a template ref.

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| `id` | `string` | auto-generated | ID used to identify the panel within an `AccordionGroup`; also rendered as the element's `id` attribute |
| `visible` | `boolean` | `false` | Initial open state; reactive — updating it opens or closes the panel |
| `class-name` | `string \| string[]` | `''` | CSS class(es) applied to the inner content wrapper |

**Exposed methods:** `open()`, `close()`, `toggle()`

**Events:** `open(visible: boolean)`, `close(visible: boolean)`

---

#### Standalone collapse

A single panel triggered by a button. Hold a template `ref` to the component instance and call `toggle()`.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Collapse } from '@bobbykim/manguito-theme'

const collapseRef = ref<InstanceType<typeof Collapse>>()
</script>

<template>
  <button @click="collapseRef?.toggle()">Toggle</button>
  <Collapse ref="collapseRef" id="panel-1" class-name="p-4">
    Collapsible content here.
  </Collapse>
</template>
```

---

#### Accordion with `AccordionGroup`

Wrap `Collapse` panels in `AccordionGroup` — each panel's `id` prop is how the group tracks which one is open. Triggers call `toggle()` via a template ref on each panel.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { AccordionGroup, Collapse } from '@bobbykim/manguito-theme'

const panel1 = ref<InstanceType<typeof Collapse>>()
const panel2 = ref<InstanceType<typeof Collapse>>()
</script>

<template>
  <AccordionGroup>
    <div>
      <button @click="panel1?.toggle()">Panel 1</button>
      <Collapse ref="panel1" id="panel-1" class-name="p-4">
        Content for panel 1.
      </Collapse>
    </div>
    <div>
      <button @click="panel2?.toggle()">Panel 2</button>
      <Collapse ref="panel2" id="panel-2" class-name="p-4">
        Content for panel 2.
      </Collapse>
    </div>
  </AccordionGroup>
</template>
```

---

#### Accordion with `v-for`

When panels are generated from an array, store refs in an array and call `toggle()` on the matching ref.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { AccordionGroup, Collapse } from '@bobbykim/manguito-theme'

const items = [
  { id: 'panel-1', title: 'Section 1', content: 'Content for section 1.' },
  { id: 'panel-2', title: 'Section 2', content: 'Content for section 2.' },
  { id: 'panel-3', title: 'Section 3', content: 'Content for section 3.' },
]

const panelRefs = ref<InstanceType<typeof Collapse>[]>([])
</script>

<template>
  <AccordionGroup>
    <div v-for="(item, index) in items" :key="item.id">
      <button @click="panelRefs[index]?.toggle()">{{ item.title }}</button>
      <Collapse
        :ref="(el) => { if (el) panelRefs[index] = el as InstanceType<typeof Collapse> }"
        :id="item.id"
        class-name="p-4"
      >
        {{ item.content }}
      </Collapse>
    </div>
  </AccordionGroup>
</template>
```

---

### AccordionGroup

`AccordionGroup` is a wrapper component that ensures only one collapse item is open at a time. Use it with `MclCollapseA` or `MclCollapseB` from `@bobbykim/mcl-collapse`.

```vue
<script setup lang="ts">
import { AccordionGroup } from '@bobbykim/manguito-theme'
import { MclCollapseA } from '@bobbykim/mcl-collapse'
</script>

<template>
  <AccordionGroup>
    <MclCollapseA collapse-id="a1" title="Item 1">
      <template #content>...</template>
    </MclCollapseA>
    <MclCollapseA collapse-id="a2" title="Item 2">
      <template #content>...</template>
    </MclCollapseA>
  </AccordionGroup>
</template>
```

### Modal and Sidebar — preferred usage patterns

**Imperative control via `defineExpose`:**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Modal } from '@bobbykim/manguito-theme'

const modalRef = ref()
</script>

<template>
  <button @click="modalRef.open()">Open</button>
  <Modal ref="modalRef" title="My Modal">...</Modal>
</template>
```

**Reactive control via `:visible` prop:**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Modal } from '@bobbykim/manguito-theme'

const isOpen = ref(false)
</script>

<template>
  <button @click="isOpen = true">Open</button>
  <Modal :visible="isOpen" title="My Modal">...</Modal>
</template>
```

### Deprecated directives

The following directives are deprecated and will be removed in a future release. They remain functional for `Modal` and `Sidebar` during the transition period but **no longer work** with `MclCollapseA` or `MclCollapseB`.

| Directive | Status | Replacement |
|---|---|---|
| `v-toggle` | Deprecated, still functional on Modal/Sidebar | `defineExpose` ref or `:visible` prop |
| `v-collapse` | Deprecated, non-functional on collapse components | `AccordionGroup` wrapper |

## Dependencies

- @vueuse/core
- vue

## Dev Dependencies

- autoprefixer
- postcss
- sass
- tailwindcss

## Maintainers

- **Bobby Kim** - _Initial work_

## License

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details
