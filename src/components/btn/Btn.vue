<script setup lang="ts">
import { defineComponent, defineProps, withDefaults } from 'vue'

defineComponent({
  name: 'Btn',
})

withDefaults(
  defineProps<{}>(),
  {}
)

</script>

<template>
  Btn
</template>

<style lang="scss" scoped></style>
