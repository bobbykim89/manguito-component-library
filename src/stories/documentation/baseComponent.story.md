# Base Components

Base components are included in `@bobbykim/manguito-theme`

## Collapse component

```vue
<script lang="ts" setup>
import { Collapse, vCollapse } from '@bobbykim/manguito-theme'
</script>

<template>
  <!-- single collapse component example -->
  <div>
    <!-- trigger collapse toggle  -->
    <button v-collapse:collapse-component-id>{{Tab button name}}</button>
    <button v-collapse:[when calling collapse-id dynamically]>
      {{Tab button name}}
    </button>
    <!-- trigger by 'a' tag -->
    <a href="#collapse-component-id" v-collapse>{{Tab button name here}}</a>
    <collapse
      collapse-id="collapse-component-id"
      class-name="tailwind css class"
    >
      <div>
        <!-- collapse content -->
      </div>
    </collapse>
  </div>
  <!-- accordion example -->
  <div>
    <button v-collapse:collapse-component-id-1>{{Tab button name}}</button>
    <collapse
      collapse-id="collapse-component-id-1"
      accordion="my-accordion-group"
    >
      <div>
        <!-- collapse content -->
      </div>
    </collapse>
    <button v-collapse:collapse-component-id-2>{{Tab button name}}</button>
    <collapse
      collapse-id="collapse-component-id-2"
      accordion="my-accordion-group"
    >
      <div>
        <!-- collapse content -->
      </div>
    </collapse>
    <button v-collapse:collapse-component-id-3>{{Tab button name}}</button>
    <collapse
      collapse-id="collapse-component-id-3"
      accordion="my-accordion-group"
    >
      <div>
        <!-- collapse content -->
      </div>
    </collapse>
  </div>
</template>
```

## Dropdown component

```vue
<script lang="ts" setup>
import { DropdownContainer, DropdownContent } from '@bobbykim/manguito-theme'
</script>

<template>
  <div>
    <dropdown-container>
      <template #toggler="{ toggle, dropdownState }">
        <button @click="toggle">
          <span> {{ button name }} </span>
        </button>
      </template>
      <dropdown-content v-slot="{ itemClick }" class-name="taildind css class">
        <button @click="itemClick()">
          {{ dropdown item }}
        </button>
        <button @click="itemClick()">
          {{ dropdown item }}
        </button>
        <button @click="itemClick()">
          {{ dropdown item }}
        </button>
      </dropdown-content>
    </dropdown-container>
  </div>
</template>
```
