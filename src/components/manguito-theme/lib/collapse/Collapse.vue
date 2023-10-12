<script setup lang="ts">
import { ref, watch, Transition } from 'vue'
import type { CollapseEvent } from './index.types'
const props = withDefaults(
  defineProps<{
    collapseId: string
    accordion?: string
    className?: string
    visible?: boolean
  }>(),
  {
    className: '',
    visible: false,
  }
)
const emit = defineEmits(['toggle'])
const toggle = ref<boolean>(props.visible)

const handleToggleEvent = (e: Event): void => {
  toggle.value = !toggle.value
  emit('toggle', { ...e, visible: toggle.value } as CollapseEvent)
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

watch(
  () => props.visible,
  (newValue) => {
    toggle.value = newValue
  }
)
</script>

<template>
  <div>
    <button
      :id="collapseId"
      @click="handleToggleEvent"
      class="hidden"
      :accordion="accordion"
      :visible="toggle"
    ></button>
    <transition
      name="collapse"
      tag="div"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @leave="onLeave"
      class="overflow-hidden"
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
