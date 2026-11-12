<script setup lang="ts">
import { toRef, useId, watch } from 'vue'
import { useCollapseState } from '../composables'

const props = withDefaults(
  defineProps<{
    id?: string
    customClass?: string | string[]
    visible?: boolean
  }>(),
  {
    customClass: '',
    visible: false,
  },
)
defineSlots<{
  default: any
}>()
const emit = defineEmits<{
  (e: 'open', visible: boolean): void
  (e: 'close', visible: boolean): void
}>()

const collapseId = props.id ?? useId()

const { isOpen, toggle, open, close } = useCollapseState(
  collapseId,
  toRef(props, 'visible'),
)

/**
 * @TransitionFunctions
 * @param {HTMLElement} el - passed any since transition handlers don't accept HTMLElement (accepts Element)
 */
const onEnter = (el: any) => {
  el.style.height = 'auto'
  el.style.opacity = '0'
  const endWidth = getComputedStyle(el).height
  el.style.height = '0px'
  void el.offsetHeight // force repaint
  el.style.height = endWidth
  el.style.opacity = '1'
}
const onAfterEnter = (el: any) => {
  el.style.height = 'auto'
  el.style.opacity = '1'
}
const onLeave = (el: any) => {
  el.style.height = getComputedStyle(el).height
  void el.offsetHeight // force repaint
  el.style.height = '0px'
  el.style.opacity = '0'
}

watch(isOpen, (newValue) => {
  if (newValue) emit('open', true)
  else emit('close', false)
})

defineExpose<{
  /** Whether the panel is open. Read-only; use open/close/toggle to change it. */
  isOpen: typeof isOpen
  toggle: () => void
  open: () => void
  close: () => void
}>({
  isOpen,
  toggle,
  open,
  close,
})
</script>

<template>
  <div :id="collapseId">
    <Transition
      name="collapse"
      tag="div"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @leave="onLeave"
      class="overflow-y-clip"
    >
      <div v-show="isOpen">
        <div :class="customClass">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.collapse-enter-active,
.collapse-leave-active {
  transition-property: height, opacity;
  transition-duration: 500ms;
  transition-timing-function: ease;
}

/* Reduced motion: open and close instantly (the JS hooks still run, and Vue
   finishes the transition at once when there is no duration). */
@media (prefers-reduced-motion: reduce) {
  .collapse-enter-active,
  .collapse-leave-active {
    transition: none;
  }
}
</style>
