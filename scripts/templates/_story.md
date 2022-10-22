<script setup lang="ts">
import { reactive } from 'vue'
import {%componentName%} from '@/components/{%componentDir%}'

</script>

<template>
  <Story title="{%componentName%}">
    <{%componentDir%}></{%componentDir%}>
  </Story>
</template>
