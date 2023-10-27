<script setup lang="ts">
import { ref, computed, watch, Transition } from 'vue'
import generateClass, { ColorPalette, vClickOutside, DirectionX } from '../../'

const props = withDefaults(
  defineProps<{
    sidebarId: string
    title?: string
    titleColor?: ColorPalette
    className?: string
    visible?: boolean
    noBackdrop?: boolean
    noHeader?: boolean
    color?: ColorPalette
    backdropColor?: ColorPalette
    placement?: DirectionX
    width?: string | number
  }>(),
  {
    titleColor: 'dark-3',
    className: '',
    visible: false,
    noBackdrop: false,
    noHeader: false,
    color: 'light-1',
    backdropColor: 'dark-4',
    placement: 'left',
    width: 300,
  }
)

const emit = defineEmits(['toggle', 'close'])
const toggle = ref<boolean>(props.visible)
const toggleComplete = ref<boolean>(false)
const headerRef = ref<HTMLElement>()
const footerRef = ref<HTMLElement>()

const handleToggleEvent = (e: Event): void => {
  toggle.value = !toggle.value
  emit('toggle', e)
}
const openSidebar = (): void => {
  toggle.value = true
}
const closeSidebar = (e: Event): void => {
  if (toggleComplete.value === true) {
    toggle.value = false
    emit('close', e)
  }
}
const handleStyleVariables = computed(() => {
  return {
    '--sidebar-width': `${props.width}px`,
    '--header-height':
      headerRef.value && toggle.value
        ? headerRef.value.scrollHeight + 'px'
        : '0px',
    '--footer-height':
      footerRef.value && toggle.value
        ? footerRef.value.scrollHeight + 'px'
        : '0px',
  }
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
defineExpose({
  toggle: handleToggleEvent,
  open: openSidebar,
  close: closeSidebar,
})
</script>

<template>
  <div :style="handleStyleVariables">
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
        :class="[placement === 'left' ? 'left-0' : 'right-0']"
      >
        <div
          class="relative h-full overscroll-contain overflow-y-scroll"
          :class="[generateClass('BGCOLOR', color), className]"
        >
          <div v-if="!noHeader" class="sticky top-0" ref="headerRef">
            <slot name="header" :close="closeSidebar" :status="toggle">
              <div
                class="flex justify-between items-center p-xs"
                :class="generateClass('BGCOLOR', color)"
              >
                <h3
                  v-if="title"
                  class="h3-md"
                  :class="generateClass('TEXTCOLOR', titleColor)"
                >
                  {{ title }}
                </h3>
                <button @click="closeSidebar">
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

          <div class="sidebar-body-height">
            <slot name="body" :close="closeSidebar" :status="toggle" />
          </div>

          <div class="sticky bottom-0" ref="footerRef">
            <slot name="footer" :close="closeSidebar" :status="toggle" />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.sidebar-body {
  width: 100%;
}
.sidebar-body-height {
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
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