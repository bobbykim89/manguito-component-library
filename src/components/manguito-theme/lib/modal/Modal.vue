<script setup lang="ts">
import { ref, computed, watch, Transition } from 'vue'
import generateClass, { ColorPalette, vClickOutside } from '../../'

const props = withDefaults(
  defineProps<{
    modalId: string
    className?: string
    visible?: boolean
    noBackdrop?: boolean
    backdropColor?: ColorPalette
    width?: string | number
  }>(),
  {
    className: '',
    visible: false,
    noBackdrop: false,
    backdropColor: 'dark-4',
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
const closeModal = (e: Event): void => {
  if (toggleComplete.value === true) {
    toggle.value = false
    emit('close', e)
  }
}

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
  <div>
    <button :id="modalId" @click="handleToggleEvent" class="hidden"></button>
    <Transition name="fade" appear tag="div" v-if="!noBackdrop">
      <section
        v-if="toggle"
        @click="closeModal"
        class="fixed inset-0 overflow-y-auto bg-opacity-70 backdrop-blur z-[100]"
        :class="generateClass('BGCOLOR', backdropColor)"
      ></section>
    </Transition>
    <Transition
      name="slide-down"
      tag="div"
      @after-enter="onAfterEnter"
      @after-leave="onAfterLeave"
      appear
    >
      <div
        v-if="toggle"
        class="fixed w-full max-w-md max-h-[80vh] overflow-hidden shadow z-[110] px-xs top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div v-click-outside="closeModal" :class="className" class="relative">
          <div class="sticky top-0">
            <slot name="header" :close="closeModal" :status="toggle" />
          </div>
          <slot name="body" :close="closeModal" :status="toggle" />
          <div class="sticky bottom-0">
            <slot name="footer" :close="closeModal" :status="toggle" />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
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

.slide-down-enter-active {
  animation: slide-down 300ms ease;
}
.slide-down-leave-active {
  animation: slide-down reverse 300ms ease;
}

@keyframes slide-down {
  0% {
    opacity: 0;
    transform: translateY(-100%) translateX(-50%);
  }
  100% {
    opacity: 1;
    transform: translateY(-50%) translateX(-50%);
  }
}
</style>
