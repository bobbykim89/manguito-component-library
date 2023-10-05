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
  [props.collapseId]: {
    open: false,
  },
})
provide('collapseState', collapseState)

const toggle = (e: Event): void => {
  collapseState[props.collapseId].open = !collapseState[props.collapseId].open
  console.log(collapseState[props.collapseId])
  emit('toggle', e)
}
</script>

<template>
  <div class="relative">
    <div>
      <slot
        name="header"
        :toggle="toggle"
        :collapse-state="collapseState[props.collapseId].open"
      />
    </div>
    <div>
      <slot name="content"></slot>
    </div>
    <div>
      <slot
        name="footer"
        :toggle="toggle"
        :collapse-state="collapseState[props.collapseId].open"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
