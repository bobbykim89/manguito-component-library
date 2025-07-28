<script setup lang="ts">
import { useScrollLock } from "@vueuse/core";
import { computed, onMounted, ref, watch } from "vue";
import type { ColorPalette, SizeOption, VerticalAlignment } from "..";
import generateClass, { vClickOutside } from "..";
import { observeVisibleAttr } from "../composables";

const props = withDefaults(
  defineProps<{
    title?: string;
    titleColor?: ColorPalette;
    className?: string | string[];
    visible?: boolean;
    noBackdrop?: boolean;
    noHeader?: boolean;
    color?: ColorPalette;
    backdropColor?: ColorPalette;
    placement?: VerticalAlignment;
    modalWidth?: SizeOption;
  }>(),
  {
    titleColor: "dark-3",
    className: "",
    visible: false,
    noBackdrop: false,
    noHeader: false,
    color: "light-1",
    backdropColor: "dark-4",
    placement: "center",
    modalWidth: "small",
  },
);

const slots = defineSlots<{
  header(props: { close: () => void; status: boolean }): any;
  body(props: { close: () => void; status: boolean }): any;
  footer(props: { close: () => void; status: boolean }): any;
}>();
const emit = defineEmits<{
  (e: "open", visible: boolean): void;
  (e: "close", visible: boolean): void;
}>();
const modalRef = ref<HTMLElement | undefined>();
const toggle = ref<boolean>(props.visible);
const toggleComplete = ref<boolean>(false);

const toggleModal = (): void => {
  toggle.value = !toggle.value;
};
const openModal = (): void => {
  toggle.value = true;
};
const closeModal = (): void => {
  if (toggleComplete.value === true) {
    toggle.value = false;
  }
};
const emitOpenEvent = () => {
  emit("open", true);
};
const emitCloseEvent = () => {
  emit("close", false);
};
const handlePlacementVar = computed(() => {
  const modalPlacementObj: Record<VerticalAlignment, number> = {
    top: 25,
    center: 50,
    bottom: 75,
  };
  const { placement } = props;
  const placemenntNumber =
    modalPlacementObj[placement] ?? modalPlacementObj["center"];
  return { "--vertical-placement": placemenntNumber + "%" };
});
const handleModalWidth = computed(() => {
  const { modalWidth } = props;
  const modalWidthClassObj: Record<SizeOption, string> = {
    small: "max-w-[28rem]",
    medium: "max-w-[28rem] md:max-w-[36rem]",
    large: "max-w-[28rem] md:max-w-[56rem]",
  };
  return modalWidthClassObj[modalWidth] ?? modalWidthClassObj["small"];
});

/**
 * @TransitionFunctions
 * @summary Handle toggleComplete value after completion of animation
 */
const onAfterEnter = () => {
  toggleComplete.value = true;
};
const onAfterLeave = () => {
  toggleComplete.value = false;
};

// set mutation observer watching `visible` attribute in element
const handleVisibility = (visible: boolean = false) => {
  toggle.value = visible;
};

observeVisibleAttr(modalRef, handleVisibility);

watch(
  () => props.visible,
  (newValue) => {
    toggle.value = newValue;
  },
);
watch(toggle, (newValue) => {
  if (newValue === true) {
    emitOpenEvent();
  } else if (newValue === false && toggleComplete.value === true) {
    emitCloseEvent();
  }
});
onMounted(() => {
  const scrollLock = useScrollLock(document);
  watch(toggle, (newVal) => {
    scrollLock.value = newVal;
  });
});
defineExpose<{
  toggle: () => void;
  close: () => void;
  open: () => void;
}>({
  toggle: toggleModal,
  close: closeModal,
  open: openModal,
});
</script>

<template>
  <div :style="handlePlacementVar" :visible="toggle" ref="modalRef">
    <Transition name="fade" appear tag="div" v-if="!noBackdrop">
      <section
        v-if="toggle"
        @click="closeModal"
        class="fixed inset-0 z-[100] overflow-y-auto bg-opacity-70 backdrop-blur"
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
        class="vertical-placement px-xs fixed z-[110] w-full"
        :class="handleModalWidth"
      >
        <div
          v-click-outside="closeModal"
          :class="[generateClass('BGCOLOR', color), className]"
          class="relative max-h-[80vh] overflow-y-scroll overscroll-contain md:max-h-[60vh]"
        >
          <div v-if="!noHeader" class="sticky top-0">
            <slot name="header" :close="closeModal" :status="toggle">
              <div
                class="p-xs flex items-center justify-between border-b-2"
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
          <slot name="body" :close="closeModal" :status="toggle" />
          <div class="sticky bottom-0" v-if="slots['footer']">
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
