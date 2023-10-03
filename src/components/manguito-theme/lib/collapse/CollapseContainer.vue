<script setup lang="ts">
import { reactive, provide, inject, ref } from 'vue'
import { CollapseState } from './index.types'

const props = withDefaults(
  defineProps<{
    collapseId: string
    accordion: boolean
  }>(),
  {
    accordion: false,
  }
)

const emit = defineEmits(['click-outside', 'toggle'])
let collapseState: CollapseState
if (props.accordion) {
  collapseState = inject<CollapseState>('collapseState', {
    [props.collapseId]: false,
  })
} else {
  collapseState = reactive<CollapseState>({
    [props.collapseId]: false,
  })
  provide('collapseState', collapseState)
}

const toggle = (e: Event): void => {
  collapseState[props.collapseId] = !collapseState[props.collapseId]
  emit('toggle', e)
}
</script>

<template>
  <div class="relative">
    <slot
      name="header"
      :toggle="toggle"
      :collapse-state="collapseState[props.collapseId]"
    />
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped></style>
