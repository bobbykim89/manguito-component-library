<script setup lang="ts">
import { defineComponent } from 'vue'
import {%componentName%} from '@/components/{%componentDir%}'

defineComponent({
  name: '{%componentName%}',
  components: {
    '{%componentDir%}': {%componentName%}
  },
})

</script>

<template>
  <Story title="{%componentName%}">
    <{%componentDir%}></{%componentDir%}>
  </Story>
</template>
