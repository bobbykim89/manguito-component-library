<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  Transition,
  onMounted,
  onBeforeUnmount,
} from 'vue'
import generateClass, {
  ColorPalette,
  vClickOutside,
  VerticalAlignment,
} from '../../index.js'
import { observeVisibleAttr } from '../composables/index.js'

const props = withDefaults(
  defineProps<{
    title?: string
    titleColor?: ColorPalette
    className?: string
    visible?: boolean
    noBackdrop?: boolean
    noHeader?: boolean
    color?: ColorPalette
    backdropColor?: ColorPalette
    placement?: VerticalAlignment
  }>(),
  {
    titleColor: 'dark-3',
    className: '',
    visible: false,
    noBackdrop: false,
    noHeader: false,
    color: 'light-1',
    backdropColor: 'dark-4',
    placement: 'center',
  }
)

const emit = defineEmits(['open', 'close'])
const modalRef = ref<HTMLElement | undefined>()
const toggle = ref<boolean>(props.visible)
const toggleComplete = ref<boolean>(false)

// const handleToggleEvent = (): void => {
//   toggle.value = !toggle.value
// }
const toggleModal = (): void => {
  toggle.value = !toggle.value
}
const openModal = (): void => {
  toggle.value = true
}
const closeModal = (): void => {
  if (toggleComplete.value === true) {
    toggle.value = false
  }
}
const emitOpenEvent = () => {
  emit('open', { visible: true })
}
const emitCloseEvent = () => {
  emit('close', { visible: false })
}
const handlePlacementVar = computed(() => {
  let placementVariable: number
  if (props.placement === 'top') {
    placementVariable = 25
  } else if (props.placement === 'bottom') {
    placementVariable = 75
  } else {
    placementVariable = 50
  }
  return { '--vertical-placement': placementVariable + '%' }
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
  } else if (newValue === false && toggleComplete.value === true) {
    emitCloseEvent()
  }
})
defineExpose({
  toggle: toggleModal,
  close: closeModal,
  open: openModal,
})
onMounted(() => {
  if (modalRef.value) {
    observer.observe(modalRef.value, { attributes: true })
  }
})
onBeforeUnmount(() => {
  observer.disconnect()
})
</script>

<template>
  <div :style="handlePlacementVar" :visible="toggle" ref="modalRef">
    <!-- <button :id="modalId" @click="handleToggleEvent" class="hidden"></button> -->
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
        class="vertical-placement fixed w-full max-w-md z-[110] px-xs"
      >
        <div
          v-click-outside="closeModal"
          :class="[generateClass('BGCOLOR', color), className]"
          class="relative overscroll-contain overflow-y-scroll max-h-[80vh] md:max-h-[60vh]"
        >
          <div v-if="!noHeader" class="sticky top-0">
            <slot name="header" :close="closeModal" :status="toggle">
              <div
                class="flex justify-between items-center p-xs border-b-2"
                :class="generateClass('BGCOLOR', color)"
              >
                <h3
                  v-if="title"
                  class="h3-md"
                  :class="generateClass('TEXTCOLOR', titleColor)"
                >
                  {{ title }}
                </h3>
                <button @click="closeModal">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 384 512"
                    class="hover:opacity-75 focus:opacity-75 transition-opacity duration-300 ease-in h-sm"
                    :class="[generateClass('SVGFILL', titleColor)]"
                  >
                    <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                    <path
                      d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                    />
                  </svg>
                </button>
              </div>
            </slot>
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
.vertical-placement {
  top: var(--vertical-placement);
  left: 50%;
  transform: translateY(calc(-1 * var(--vertical-placement))) translateX(-50%);
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
    transform: translateY(calc(-1 * var(--vertical-placement))) translateX(-50%);
  }
}
</style>
