<script setup lang="ts">
import { onMounted, provide, reactive, ref } from 'vue'
import { vClickOutside } from '../directives/index.js'
import type { InjectType } from './index.types.js'

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
onMounted(() => {
  dropdownState.buttonHeight = dropdownTarget.value.scrollHeight
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
