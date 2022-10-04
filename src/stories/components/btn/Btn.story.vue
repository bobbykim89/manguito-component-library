<script setup lang="ts">
import { defineComponent } from 'vue'
import Btn from '@/components/btn'

defineComponent({
  name: 'Btn',
  components: {
    'btn': Btn
  },
})

</script>

<template>
  <Story title="Btn">
    <btn></btn>
  </Story>
</template>
