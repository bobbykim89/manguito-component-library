<script setup lang="ts">
import { ref, computed, watch, Transition } from 'vue'
import generateClass, { ColorPalette, vClickOutside, DirectionX } from '../../'

const props = withDefaults(
  defineProps<{
    sidebarId: string
    className?: string
    visible?: boolean
    noBackdrop?: boolean
    backdropColor?: ColorPalette
    placement?: DirectionX
    width?: string | number
  }>(),
  {
    className: '',
    visible: false,
    noBackdrop: false,
    backdropColor: 'dark-4',
    placement: 'left',
    width: 300,
  }
)

const emit = defineEmits(['toggle', 'close'])
const toggle = ref<boolean>(props.visible)
const toggleComplete = ref<boolean>(false)

const handleToggleEvent = (e: Event): void => {
  toggle.value = !toggle.value
  emit('toggle', e)
}
const closeSidebar = (e: Event): void => {
  if (toggleComplete.value === true) {
    toggle.value = false
    emit('close', e)
  }
}
const handleSidebarWidth = computed(() => {
  return { '--sidebar-width': `${props.width}px` }
})
const sidebarClass = computed(() => {
  return props.placement === 'left' ? 'sidebar-left' : 'sidebar-right'
})

/**
 * @TransitionFunctions
 * Handle toggleComplete value after completion of animation
 */
const onAfterEnter = () => {
  toggleComplete.value = true
}
const onAfterLeave = () => {
  toggleComplete.value = false
}
watch(
  () => props.visible,
  (newValue) => {
    toggle.value = newValue
  }
)
</script>

<template>
  <div :style="handleSidebarWidth">
    <button :id="sidebarId" @click="handleToggleEvent" class="hidden"></button>
    <Transition name="fade" appear tag="div" v-if="!noBackdrop">
      <section
        v-if="toggle"
        @click="closeSidebar"
        class="fixed inset-0 overflow-y-auto bg-opacity-70 backdrop-blur z-[100]"
        :class="generateClass('BGCOLOR', backdropColor)"
      ></section>
    </Transition>
    <Transition
      :name="sidebarClass"
      @after-enter="onAfterEnter"
      @after-leave="onAfterLeave"
      appear
    >
      <div
        v-if="toggle"
        v-click-outside="closeSidebar"
        class="sidebar-body fixed h-full overflow-hidden inset-y-0 shadow z-[110]"
        :class="[placement === 'left' ? 'left-0' : 'right-0', className]"
      >
        <slot :close="closeSidebar" :status="toggle" />
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.sidebar-body {
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 300ms;
  transition-timing-function: linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.sidebar-left-enter-active,
.sidebar-left-leave-active,
.sidebar-right-enter-active,
.sidebar-right-leave-active {
  transition-property: transform, opacity;
  transition-duration: 300ms;
  transition-timing-function: linear;
}

.sidebar-left-enter-from,
.sidebar-left-leave-to {
  transform: translateX(-100%);
}
.sidebar-right-enter-from,
.sidebar-right-leave-to {
  transform: translateX(100%);
}

@media screen and (min-width: 768px) {
  .sidebar-body {
    width: var(--sidebar-width);
  }
  .sidebar-left-enter-from,
  .sidebar-left-leave-to {
    transform: translateX(calc(-1 * var(--sidebar-width)));
  }
  .sidebar-right-enter-from,
  .sidebar-right-leave-to {
    transform: translateX(var(--sidebar-width));
  }
}
</style>
