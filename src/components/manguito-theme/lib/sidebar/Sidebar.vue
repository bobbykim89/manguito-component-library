<script setup lang="ts">
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { computed, ref, useId, watch } from 'vue'
import { observeVisibleAttr, useModalScrollLock } from '../composables'
import { vClickOutside } from '../directives'
import { generateClass } from '../theme'
import type { ColorPalette, DirectionX } from '../theme/static/theme.types'

const props = withDefaults(
  defineProps<{
    title?: string
    titleColor?: ColorPalette
    className?: string | string[]
    visible?: boolean
    noBackdrop?: boolean
    noHeader?: boolean
    color?: ColorPalette
    backdropColor?: ColorPalette
    placement?: DirectionX
    width?: number
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
  },
)

const slots = defineSlots<{
  header(props: { close: () => void; status: boolean }): any
  body(props: { close: () => void; status: boolean }): any
  footer(props: { close: () => void; status: boolean }): any
}>()
const emit = defineEmits<{
  (e: 'open', visible: boolean): void
  (e: 'close', visible: boolean): void
}>()
const toggle = ref<boolean>(props.visible)
const toggleComplete = ref<boolean>(false)
const sidebarRef = ref<HTMLElement | undefined>()
const dialogRef = ref<HTMLElement>()
const headerRef = ref<HTMLElement>()
const footerRef = ref<HTMLElement>()
const titleId = useId()
let prevFocus: HTMLElement | null = null

const { activate: activateTrap, deactivate: deactivateTrap } = useFocusTrap(
  dialogRef,
  { immediate: false },
)

const toggleSidebar = (): void => {
  toggle.value = !toggle.value
}
const openSidebar = (): void => {
  toggle.value = true
}
const closeSidebar = (): void => {
  if (toggleComplete.value === true) {
    toggle.value = false
  }
}
const emitOpenEvent = () => {
  emit('open', true)
}
const emitCloseEvent = () => {
  emit('close', false)
}
const handleStyleVariables = computed(() => {
  const getHeight = (elem?: HTMLElement | null) =>
    elem && toggle.value ? `${elem.scrollHeight}px` : '0px'
  return {
    '--sidebar-width': `${props.width}px`,
    '--header-height': getHeight(headerRef.value),
    '--footer-height': getHeight(footerRef.value),
  }
})
const sidebarClass = computed(() => {
  return props.placement === 'left' ? 'sidebar-left' : 'sidebar-right'
})

const onAfterEnter = () => {
  toggleComplete.value = true
  if (dialogRef.value) {
    activateTrap()
  }
}
const onAfterLeave = () => {
  toggleComplete.value = false
}

// set mutation observer watching `visible` attribute in element
const handleVisibility = (visible: boolean = false) => {
  toggle.value = visible
}

observeVisibleAttr(sidebarRef, handleVisibility)

watch(
  () => props.visible,
  (newValue) => {
    toggle.value = newValue
  },
)
watch(toggle, (newValue) => {
  if (newValue === true) {
    if (typeof document !== 'undefined') {
      prevFocus = document.activeElement as HTMLElement | null
    }
    emitOpenEvent()
  } else if (newValue === false) {
    deactivateTrap()
    prevFocus?.focus()
    prevFocus = null
    if (toggleComplete.value === true) {
      emitCloseEvent()
    }
  }
})
useModalScrollLock(toggle)
defineExpose<{
  toggle: () => void
  open: () => void
  close: () => void
}>({
  toggle: toggleSidebar,
  open: openSidebar,
  close: closeSidebar,
})
</script>

<template>
  <div :style="handleStyleVariables" :visible="toggle" ref="sidebarRef">
    <Transition name="fade" appear tag="div" v-if="!noBackdrop">
      <section
        v-if="toggle"
        @click="closeSidebar"
        aria-hidden="true"
        class="fixed inset-0 z-[100] overflow-y-auto bg-opacity-70 backdrop-blur"
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
        ref="dialogRef"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="title ? titleId : undefined"
        v-click-outside="closeSidebar"
        class="sidebar-body fixed inset-y-0 z-[110] h-full overflow-hidden shadow"
        :class="[placement === 'left' ? 'left-0' : 'right-0']"
      >
        <div
          class="relative h-full overflow-y-scroll overscroll-contain"
          :class="[generateClass('BGCOLOR', color), className]"
        >
          <div v-if="!noHeader" class="sticky top-0 z-10" ref="headerRef">
            <slot name="header" :close="closeSidebar" :status="toggle">
              <div
                class="p-xs flex items-center justify-between"
                :class="generateClass('BGCOLOR', color)"
              >
                <button
                  type="button"
                  aria-label="Close"
                  @click="closeSidebar"
                  v-if="placement === 'right'"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 384 512"
                    aria-hidden="true"
                    class="h-sm transition-opacity duration-300 ease-in hover:opacity-75 focus:opacity-75"
                    :class="[generateClass('SVGFILL', titleColor)]"
                  >
                    <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                    <path
                      d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                    />
                  </svg>
                </button>
                <h3
                  v-if="title"
                  :id="titleId"
                  class="h3-md"
                  :class="generateClass('TEXTCOLOR', titleColor)"
                >
                  {{ title }}
                </h3>
                <button
                  type="button"
                  aria-label="Close"
                  @click="closeSidebar"
                  v-if="placement === 'left'"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 384 512"
                    aria-hidden="true"
                    class="h-sm transition-opacity duration-300 ease-in hover:opacity-75 focus:opacity-75"
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

          <div class="sticky bottom-0" ref="footerRef" v-if="slots['footer']">
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
