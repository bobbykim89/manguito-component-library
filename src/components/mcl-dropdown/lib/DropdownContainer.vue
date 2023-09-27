<script setup lang="ts">
import { reactive, provide, ref, Directive } from 'vue'
import type { InjectType } from './index.types'

const emit = defineEmits(['click-outside', 'toggle'])
const dropdownTarget = ref(null)
const sharedState = reactive<InjectType>({
  active: false,
})
provide('sharedState', sharedState)
const toggle = (e: Event): void => {
  sharedState.active = !sharedState.active
  emit('toggle', e)
}
const onClickOutside = (e: Event): void => {
  sharedState.active = false
  emit('click-outside', e)
}
const vClickOutside: Directive = {
  mounted(el, binding) {
    el.__ClickOutsideHandler = (event: Event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event)
      }
    }
    document.body.addEventListener('click', el.__ClickOutsideHandler)
  },
  unmounted(el) {
    document.body.removeEventListener('click', el.__ClickOutsideHandler)
  },
}
</script>

<template>
  <div class="relative" ref="dropdownTarget" v-click-outside="onClickOutside">
    <slot name="toggler" :toggle="toggle" />
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped></style>
