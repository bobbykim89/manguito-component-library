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

## Sidebar component

```vue
<script lang="ts" setup>
import { Sidebar, vToggle } from '@bobbykim/manguito-theme'
</script>

<template>
  <div>
    <!-- trigger collapse toggle  -->
    <button v-sidebar:sidebar-component-id>{{Tab button name}}</button>
    <button v-sidebar:[when calling sidebar-id dynamically]>
      {{Tab button name}}
    </button>
    <!-- trigger by 'a' tag -->
    <a href="#sidebar-component-id" v-sidebar>{{Tab button name here}}</a>
    <sidebar
      sidebar-id="sidebar-component-id"
      placement="'left'|'right'"
      class-name="taildind css class"
      backdrop-color="dark-1"
      width="300"
      @toggle="$event"
      @close="$event"
    >
      <!-- add a button to close sidebar -->
      <template #header="{ close }">
        <button @click="close">Button</button>
      </template>
      <template #body> ...body content </template>
      <template #footer> ...footer content </template>
    </sidebar>
    <!-- sidebar with no backdrop -->
    <sidebar sidebar-id="sidebar-component-id" no-backdrop></sidebar>
    <!-- load page with open sidebar -->
    <sidebar sidebar-id="sidebar-component-id" visible></sidebar>
  </div>
</template>
```

## Modal component

```vue
<script lang="ts" setup>
import { Modal, vToggle } from '@bobbykim/manguito-theme'
</script>

<template>
  <div>
    <!-- trigger collapse toggle  -->
    <button v-modal:modal-component-id>{{Tab button name}}</button>
    <button v-modal:[when calling modal-id dynamically]>
      {{Tab button name}}
    </button>
    <!-- trigger by 'a' tag -->
    <a href="#modal-component-id" v-modal>{{Tab button name here}}</a>
    <modal
      modal-id="modal-component-id"
      placement="'top'|'center'|'bottom'"
      class-name="taildind css class"
      backdrop-color="dark-1"
      @toggle="$event"
      @close="$event"
    >
      <!-- add a button to close modal -->
      <template #header="{ close, status }">
        <button @click="close">Button</button>
      </template>
      <template #body> ...body content </template>
      <template #footer> ...footer content </template>
    </modal>
    <!-- modal with no backdrop -->
    <modal modal-id="modal-component-id" no-backdrop></modal>
    <!-- load page with open modal -->
    <modal modal-id="modal-component-id" visible></modal>
  </div>
</template>
```
