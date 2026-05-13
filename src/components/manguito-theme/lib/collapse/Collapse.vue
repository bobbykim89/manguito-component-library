<script setup lang="ts">
import { toRef, useId, watch } from 'vue'
import { useCollapseState } from '../composables'
import { ClientSideRender } from '../util'

const props = withDefaults(
  defineProps<{
    id?: string
    className?: string | string[]
    visible?: boolean
  }>(),
  {
    className: '',
    visible: false,
  }
)
const slots = defineSlots<{
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
  el.offsetHeight // force repaint
  el.style.height = endWidth
  el.style.opacity = '1'
}
const onAfterEnter = (el: any) => {
  el.style.height = 'auto'
  el.style.opacity = '1'
}
const onLeave = (el: any) => {
  el.style.height = getComputedStyle(el).height
  el.offsetHeight // force repaint
  el.style.height = '0px'
  el.style.opacity = '0'
}

watch(isOpen, (newValue) => {
  if (newValue) emit('open', true)
  else emit('close', false)
})

defineExpose<{
  toggle: () => void
  open: () => void
  close: () => void
}>({
  toggle,
  open,
  close,
})
</script>

<template>
  <div :id="collapseId">
    <ClientSideRender>
      <Transition
        name="collapse"
        tag="div"
        @enter="onEnter"
        @after-enter="onAfterEnter"
        @leave="onLeave"
        class="overflow-y-clip"
      >
        <div v-show="isOpen">
          <div :class="className">
            <slot />
          </div>
        </div>
      </Transition>
    </ClientSideRender>
  </div>
</template>

<style scoped lang="scss">
.collapse-enter-active,
.collapse-leave-active {
  transition-property: height, opacity;
  transition-duration: 500ms;
  transition-timing-function: ease;
}
</style>
