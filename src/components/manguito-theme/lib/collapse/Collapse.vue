<script setup lang="ts">
import { Transition, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { observeVisibleAttr } from '../composables'

const props = withDefaults(
  defineProps<{
    accordion?: string
    className?: string
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
const collapseRef = ref<HTMLElement | undefined>()
const toggle = ref<boolean>(props.visible)

const toggleCollapse = (): void => {
  toggle.value = !toggle.value
}
const openCollapse = (): void => {
  toggle.value = true
}
const closeCollapse = (): void => {
  toggle.value = false
}
const emitOpenEvent = () => {
  emit('open', true)
}
const emitCloseEvent = () => {
  emit('close', false)
}

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

// set nutation observer watching `visible` attribute in element
const handleVisibility = (visible: boolean = false) => {
  toggle.value = visible
}
const observer = observeVisibleAttr(handleVisibility)

watch(
  () => props.visible,
  (newValue) => {
    toggle.value = newValue
  }
)
watch(toggle, (newValue) => {
  if (newValue === true) {
    emitOpenEvent()
  } else if (newValue === false) {
    emitCloseEvent()
  }
})
defineExpose({
  toggle: toggleCollapse,
  close: closeCollapse,
  open: openCollapse,
})
onMounted(() => {
  if (collapseRef.value) {
    observer.observe(collapseRef.value, { attributes: true })
  }
})
onBeforeUnmount(() => {
  observer.disconnect()
})
</script>

<template>
  <div :accordion="accordion" :visible="toggle" ref="collapseRef">
    <transition
      name="collapse"
      tag="div"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @leave="onLeave"
      class="overflow-y-clip"
    >
      <div v-show="toggle">
        <div :class="[className]">
          <slot />
        </div>
      </div>
    </transition>
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
