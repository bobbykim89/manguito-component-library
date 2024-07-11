<script setup lang="ts">
import { computed, provide, ref, Transition, watch } from 'vue'
import { tabInjectionKey } from './InjectionKey'

withDefaults(
  defineProps<{
    bodyClass?: string | string[]
    btnContainerClass?: string | string[]
    contentContainerClass?: string | string[]
  }>(),
  {
    bodyClass: '',
    btnContainerClass: '',
    contentContainerClass: '',
  }
)

const slots = defineSlots<{
  'tab-button'(props: { update: (num: number) => void; activeTab: number }): any
  'tab-content': any
}>()

const activeTabIdx = ref<number>(0)
const containerHts = ref<number>(0)
const slideDirection = ref<'slide-next' | 'slide-prev'>('slide-next')

const updateHeight = (height: number) => {
  containerHts.value = height
}

/**
 * @summary init injection key, shared with TabContent component
 */
provide(tabInjectionKey, {
  activeTabIdx,
  containerHeight: containerHts,
  updateHeight,
})

const updateActiveTab = (num: number) => {
  activeTabIdx.value = num
}

/**
 * @summary fetch containerHts value updated from child component and update var(--container-hts) accordingly
 */

const containerHeightVar = computed(() => {
  return { '--container-hts': `${containerHts.value}px` }
})

defineExpose<{
  update: (arg: number) => void
}>({
  update: updateActiveTab,
})

/**
 * @summary watch value of activeIdx and determine the direction of slide animation
 */

watch(
  () => activeTabIdx!.value,
  (newValue, oldValue) => {
    if (newValue > oldValue) {
      slideDirection.value = 'slide-next'
    } else {
      slideDirection.value = 'slide-prev'
    }
  }
)
</script>

<template>
  <div :class="bodyClass" :style="containerHeightVar">
    <div :class="btnContainerClass" role="tablist">
      <slot
        name="tab-button"
        :update="updateActiveTab"
        :activeTab="activeTabIdx"
      ></slot>
    </div>
    <div :class="contentContainerClass">
      <div
        class="container-hts transition-[max-height] duration-300 grid grid-cols-1 grid-rows-1"
      >
        <Transition :name="slideDirection">
          <div
            :key="activeTabIdx"
            class="col-start-1 col-end-1 row-start-1 row-end-1 relative"
          >
            <slot name="tab-content"></slot>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container-hts {
  max-height: var(--container-hts);
}
/* transition animations */
.slide-prev-enter-active {
  transition: all 0.5s linear;
}
.slide-prev-leave-active {
  transition: all 0.5s;
}
.slide-prev-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-prev-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.slide-next-enter-active {
  transition: all 0.5s linear;
}
.slide-next-leave-active {
  transition: all 0.5s;
}
.slide-next-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-next-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
