<script setup lang="ts">
import { reactive, provide, ref, Directive, onMounted } from 'vue'
import type { InjectType } from './index.types'

const emit = defineEmits(['click-outside', 'toggle'])
const dropdownTarget = ref()
const dropdownState = reactive<InjectType>({
  active: false,
  buttonHeight: 0,
})
provide('dropdownState', dropdownState)
const toggle = (e: Event): void => {
  dropdownState.active = !dropdownState.active
  emit('toggle', e)
}
const onClickOutside = (e: Event): void => {
  dropdownState.active = false
  emit('click-outside', e)
}
const onEscape = (): void => {
  dropdownState.active = false
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
onMounted(() => {
  if (typeof window !== undefined) {
    dropdownState.buttonHeight = dropdownTarget.value.scrollHeight
  }
})
</script>

<template>
  <div
    class="relative"
    ref="dropdownTarget"
    v-click-outside="onClickOutside"
    @keyup.esc="onEscape"
  >
    <slot
      name="toggler"
      :toggle="toggle"
      :dropdown-state="dropdownState.active"
    />
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped></style>
