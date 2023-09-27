<script setup lang="ts">
import { reactive, provide, ref, Directive } from 'vue'
import type { InjectType } from './index.types'

const dropdownTarget = ref(null)
const sharedState = reactive<InjectType>({
  active: false,
})
provide('sharedState', sharedState)
const toggle = (): void => {
  sharedState.active = !sharedState.active
}
const onClickOutside = (e: Event): void => {
  sharedState.active = false
}
const vClickOutside: Directive = {
  mounted(el, binding) {
    el.__ClickOutsideHandler__ = (event: Event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event)
      }
    }
    document.body.addEventListener('click', el.__ClickOutsideHandler__)
  },
  unmounted(el) {
    document.body.removeEventListener('click', el.__ClickOutsideHandler__)
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
