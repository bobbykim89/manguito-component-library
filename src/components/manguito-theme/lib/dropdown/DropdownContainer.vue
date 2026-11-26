<script setup lang="ts">
import { computed, nextTick, onMounted, provide, ref, useId } from 'vue'
import { vClickOutside } from '../directives'
import { dropdownInjectionKey } from './DropdownInjectionKey'
import type { DropdownTogglerAttrs } from './index.types'

defineSlots<{
  default: any
  toggler(props: {
    dropdownState: boolean
    toggle: (arg?: Event) => void
    /** Bind on the toggle button: `v-bind="attrs"` (#128). */
    attrs: DropdownTogglerAttrs
  }): any
}>()
const emit = defineEmits<{
  (e: 'click-outside', event: Event): void
  (e: 'toggle', event: Event): void
}>()
const dropdownTarget = ref<HTMLElement>()
const dropdownActive = ref<boolean>(false)
const dropdownBtnHeight = ref<number>(0)
const contentId = useId()

// The element that opened the menu, so closing from inside can hand focus
// back to it instead of dropping it on <body> when the content unmounts.
let toggler: HTMLElement | null = null
const findToggler = (): HTMLElement | null =>
  toggler?.isConnected
    ? toggler
    : (dropdownTarget.value?.querySelector<HTMLElement>(
        `[aria-controls="${contentId}"]`,
      ) ?? null)

// Focus the toggler; if it can't take focus (a clickable wrapper `div`), try
// the element wired with `aria-controls`, then a focusable element inside it.
const focusToggler = (): void => {
  const candidates = [
    findToggler(),
    dropdownTarget.value?.querySelector<HTMLElement>(
      `[aria-controls="${contentId}"]`,
    ),
    toggler?.querySelector<HTMLElement>(
      'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ),
  ]
  for (const el of candidates) {
    if (!el) continue
    el.focus()
    if (document.activeElement === el) return
  }
}

const focusInsideContent = (): boolean => {
  const content = document.getElementById(contentId)
  return !!content && content.contains(document.activeElement)
}

// Close from inside the menu: focus goes back to the toggler (#128).
const closeFromInside = (): void => {
  const hadFocus = focusInsideContent()
  dropdownActive.value = false
  if (hadFocus) {
    focusToggler()
    // the content may still be leaving; make sure focus didn't land in it
    nextTick(() => {
      if (focusInsideContent()) focusToggler()
    })
  }
}

provide(dropdownInjectionKey, {
  active: dropdownActive,
  buttonHeight: dropdownBtnHeight,
  closeDropdown: closeFromInside,
  contentId,
})
const toggle = (e?: Event): void => {
  if (e?.currentTarget instanceof HTMLElement) toggler = e.currentTarget
  dropdownActive.value = !dropdownActive.value
  // `toggle()` may be called without an event; listeners still get one
  emit('toggle', e ?? new Event('toggle'))
}
const onClickOutside = (e: Event): void => {
  dropdownActive.value = false
  emit('click-outside', e)
}
// Escape contract (#128): act only when open, and mark the event handled so
// an enclosing Modal or Sidebar leaves it alone.
const onKeydown = (e: KeyboardEvent): void => {
  if (e.key !== 'Escape' || !dropdownActive.value || e.defaultPrevented) return
  e.preventDefault()
  const hadFocus =
    focusInsideContent() || !!findToggler()?.contains(document.activeElement)
  dropdownActive.value = false
  if (hadFocus) focusToggler()
}
const attrs = computed<DropdownTogglerAttrs>(() => ({
  'aria-expanded': dropdownActive.value,
  'aria-controls': contentId,
}))
onMounted(() => {
  dropdownBtnHeight.value = dropdownTarget.value!.scrollHeight
})
</script>

<template>
  <div
    class="relative"
    ref="dropdownTarget"
    v-click-outside="onClickOutside"
    @keydown="onKeydown"
  >
    <slot
      name="toggler"
      :toggle="toggle"
      :dropdown-state="dropdownActive"
      :attrs="attrs"
    />
    <slot></slot>
  </div>
</template>
