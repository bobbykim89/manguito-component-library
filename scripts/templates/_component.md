<script setup lang="ts">
import { defineComponent, defineProps, withDefaults } from 'vue'

defineComponent({
  name: '{%componentName%}',
})

withDefaults(
  defineProps<{}>(),
  {}
)

</script>

<template>
  {%componentName%}
</template>

<style lang="scss" scoped></style>
