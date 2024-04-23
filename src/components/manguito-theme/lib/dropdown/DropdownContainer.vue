<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { vClickOutside } from '../directives'
import { dropdownInjectionKey } from './DropdownInjectionKey'

const slots = defineSlots<{
  default: any
  toggler(props: { dropdownState: boolean; toggle: (arg: Event) => void }): any
}>()
const emit = defineEmits<{
  (e: 'click-outside', event: Event): void
  (e: 'toggle', event: Event): void
}>()
const dropdownTarget = ref<HTMLElement>()
const dropdownActive = ref<boolean>(false)
const dropdownBtnHeight = ref<number>(0)
const closeDropdown = () => {
  dropdownActive.value = false
}
provide(dropdownInjectionKey, {
  active: dropdownActive,
  buttonHeight: dropdownBtnHeight,
  closeDropdown,
})
const toggle = (e: Event): void => {
  dropdownActive.value = !dropdownActive.value
  emit('toggle', e)
}
const onClickOutside = (e: Event): void => {
  dropdownActive.value = false
  emit('click-outside', e)
}
const onEscape = (): void => {
  dropdownActive.value = false
}
onMounted(() => {
  dropdownBtnHeight.value = dropdownTarget.value!.scrollHeight
})
</script>

<template>
  <div
    class="relative"
    ref="dropdownTarget"
    v-click-outside="onClickOutside"
    @keyup.esc="onEscape"
  >
    <slot name="toggler" :toggle="toggle" :dropdown-state="dropdownActive" />
    <slot></slot>
  </div>
</template>
