<script setup lang="ts">
import { provideAccordion } from '../composables'

provideAccordion()
</script>

<template>
  <div>
    <slot />
  </div>
</template>
