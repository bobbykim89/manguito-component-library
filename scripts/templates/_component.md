<script setup lang="ts">
import { defineComponent, withDefaults } from 'vue'

defineComponent({
  name: '{%componentName%}',
})

const props = withDefaults(
  defineProps<{}>(),
  {}
)

</script>

<template>
  {%componentName%}
</template>

<style lang="scss" scoped></style>
