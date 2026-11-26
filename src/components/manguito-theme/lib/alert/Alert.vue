<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { generateClass } from '../theme'
import type { ColorPalette } from '../theme/static/theme.types'
const props = withDefaults(
  defineProps<{
    color?: ColorPalette
    rounded?: boolean
    shadow?: boolean
    show?: boolean
    dismissible?: boolean
    /** Accessible name of the dismiss button. */
    dismissLabel?: string
    /**
     * Where focus goes when the dismiss button removes the alert, as a CSS
     * selector or an element. Without it, focus moves to the next focusable
     * element after the alert, else the one before it (#128). A `close`
     * handler that moves focus itself wins over both.
     */
    returnFocus?: string | HTMLElement
    /**
     * How urgently screen readers announce the alert: `'assertive'` renders
     * `role="alert"`, `'polite'` renders `role="status"`.
     */
    live?: 'assertive' | 'polite'
  }>(),
  {
    color: 'danger',
    rounded: true,
    shadow: true,
    show: false,
    dismissible: false,
    dismissLabel: 'Dismiss',
    live: 'assertive',
  },
)

defineSlots<{
  default: any
}>()

const emit = defineEmits<{
  (e: 'close', event: Event): void
}>()

const showAlert = ref<boolean>(props.show)
const componentClass = computed<string>(() => {
  const { color, rounded, shadow } = props
  const classArray: string[] = [generateClass.bgColorVariant({ color })]
  if (rounded) {
    classArray.push('rounded-md')
  }
  if (shadow) {
    classArray.push('drop-shadow-md')
  }
  return classArray.join(' ')
})
const rootRef = ref<HTMLElement>()

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

// The focusable elements just after and just before the alert, in document
// order, found while the alert is still in the page.
const neighbours = (): {
  next: HTMLElement | null
  prev: HTMLElement | null
} => {
  const root = rootRef.value
  if (!root) return { next: null, prev: null }
  const all = Array.from(document.querySelectorAll<HTMLElement>(FOCUSABLE))
  const outside = all.filter((el) => !root.contains(el))
  const follows = (el: HTMLElement) =>
    !!(root.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING)
  return {
    next: outside.find(follows) ?? null,
    prev: outside.filter((el) => !follows(el)).pop() ?? null,
  }
}

const resolveReturnFocus = (): HTMLElement | null => {
  const target = props.returnFocus
  if (!target) return null
  return typeof target === 'string'
    ? document.querySelector<HTMLElement>(target)
    : target
}

// The dismiss button removes the whole alert while it has focus. Emit first,
// so a `close` handler can move focus; if focus is still in the alert after
// that, move it to `returnFocus`, else the next, else the previous focusable
// element, instead of letting it fall to <body> (#128).
const handleClose = (e: Event) => {
  const root = rootRef.value
  const { next, prev } = neighbours()
  emit('close', e)
  const stillInside = !!root?.contains(document.activeElement)
  showAlert.value = false
  if (!stillInside) return
  nextTick(() => {
    const active = document.activeElement
    if (active && active !== document.body && active.isConnected) return
    for (const el of [resolveReturnFocus(), next, prev]) {
      if (el?.isConnected) {
        el.focus()
        if (document.activeElement === el) return
      }
    }
  })
}
const closeAlert = () => {
  showAlert.value = false
}
watch(
  () => props.show,
  (newValue) => {
    showAlert.value = newValue
  },
)
defineExpose<{
  close: () => void
}>({
  close: closeAlert,
})
</script>

<template>
  <div
    v-if="showAlert"
    ref="rootRef"
    :role="live === 'polite' ? 'status' : 'alert'"
    aria-atomic="true"
    class="relative px-[1.25rem] py-[0.75rem]"
    :class="[componentClass]"
  >
    <div class="flex w-full justify-between gap-2xs">
      <div class="w-full">
        <slot></slot>
      </div>
      <button
        v-if="dismissible"
        type="button"
        :aria-label="dismissLabel"
        @click="handleClose"
        class="flex items-center opacity-60 transition-opacity duration-300 ease-linear hover:opacity-40"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
          class="h-xs"
        >
          <!-- !Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
          <path
            d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
