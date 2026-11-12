<script setup lang="ts">
// Uses useCollapseTrigger from an SFC template, exactly as the docs show.
import { ref } from 'vue'
import Collapse from '../../collapse/Collapse.vue'
import { useCollapseTrigger } from '../useCollapseTrigger'

const collapseRef = ref<InstanceType<typeof Collapse>>()
const { attrs, toggle } = useCollapseTrigger(collapseRef, { id: 'fixture' })
</script>

<template>
  <button v-bind="attrs" @click="toggle">Toggle</button>
  <Collapse ref="collapseRef" id="fixture">BODY</Collapse>
</template>
