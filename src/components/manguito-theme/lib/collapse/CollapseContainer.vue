<script setup lang="ts">
import { reactive, provide, inject, ref } from 'vue'
import { CollapseState } from './index.types'

const props = withDefaults(
  defineProps<{
    collapseId: string
    accordion?: boolean
  }>(),
  {
    accordion: false,
  }
)

const emit = defineEmits(['toggle'])
const collapseState = reactive<CollapseState>({
  id: props.collapseId,
  open: false,
})
provide('collapseState', collapseState)

const toggle = (e: Event): void => {
  collapseState.open = !collapseState.open
  console.log(props.collapseId, collapseState.open)
  emit('toggle', e)
}
</script>

<template>
  <div class="relative">
    <slot name="header" :toggle="toggle" :collapse-state="collapseState.open" />
    <slot></slot>
    <slot name="footer" :toggle="toggle" :collapse-state="collapseState.open" />
  </div>
</template>

<style lang="scss" scoped></style>
