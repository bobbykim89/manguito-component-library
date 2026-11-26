<script setup lang="ts">
import { computed, nextTick, provide, reactive, ref, useId, watch } from 'vue'
import { tabInjectionKey } from './InjectionKey'
import type { TabAttrs } from './index.types'

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
  },
)

defineSlots<{
  'tab-button'(props: {
    update: (num: number) => void
    activeTab: number
    /** Bind on each tab: `v-bind="tabAttrs(i)"` (#128). */
    tabAttrs: (index: number) => TabAttrs
  }): any
  'tab-content': any
}>()

const activeTabIdx = ref<number>(0)
const containerHts = ref<number>(0)
// false until a tab reports a real (> 0) height; server render and hydration stay unmeasured
const measured = ref<boolean>(false)
const slideDirection = ref<'slide-next' | 'slide-prev'>('slide-next')

const updateHeight = (height: number) => {
  if (height > 0) measured.value = true
  containerHts.value = height
}

const updateActiveTab = (num: number) => {
  activeTabIdx.value = num
}

// Tab semantics for consumer-rendered tabs (#128). Ids are SSR-stable.
const baseId = useId()
const tabId = (index: number): string => `${baseId}-tab-${index}`

// The panel id registered for each tabNumber. Each registration gets its own
// token: the keyed slide transition mounts the new panels before the leaving
// ones unmount, so a leaving panel's withdrawal must not drop its successor.
const panels = reactive(new Map<number, { id: string; token: symbol }>())
const registerPanel = (tabNumber: number, id: string): (() => void) => {
  const token = Symbol()
  panels.set(tabNumber, { id, token })
  return () => {
    if (panels.get(tabNumber)?.token === token) panels.delete(tabNumber)
  }
}

// Indexes whose tab bound `tabAttrs`. Filled while the `tab-button` slot
// renders, which is before `tab-content` in the same pass, on the server too.
// A panel points `aria-labelledby` only at a tab that exists with that id, so
// a consumer that renders its own tabs gets no dangling reference.
const boundTabs = new Set<number>()
const labelledBy = (tabNumber: number): string | undefined =>
  boundTabs.has(tabNumber) ? tabId(tabNumber) : undefined

const focusTab = (index: number): void => {
  updateActiveTab(index)
  nextTick(() => document.getElementById(tabId(index))?.focus())
}

const onTabKeydown = (index: number, e: KeyboardEvent): void => {
  const count = panels.size
  if (count === 0) return
  let target: number
  switch (e.key) {
    case 'ArrowRight':
      target = (index + 1) % count
      break
    case 'ArrowLeft':
      target = (index - 1 + count) % count
      break
    case 'Home':
      target = 0
      break
    case 'End':
      target = count - 1
      break
    default:
      return
  }
  e.preventDefault()
  focusTab(target)
}

const tabAttrs = (index: number): TabAttrs => {
  boundTabs.add(index)
  const selected = activeTabIdx.value === index
  return {
    id: tabId(index),
    role: 'tab',
    'aria-selected': selected,
    'aria-controls': panels.get(index)?.id,
    tabindex: selected ? 0 : -1,
    onClick: () => updateActiveTab(index),
    onKeydown: (e: KeyboardEvent) => onTabKeydown(index, e),
  }
}

/**
 * @summary init injection key, shared with TabContent component
 */
provide(tabInjectionKey, {
  activeTabIdx,
  containerHeight: containerHts,
  updateHeight,
  registerPanel,
  labelledBy,
})

/**
 * @summary fetch containerHts value updated from child component and update var(--container-hts) accordingly
 */

const containerHeightVar = computed(() => {
  // until the first real height is measured, leave the body unclamped; after that
  // always emit a px value (including 0px) so max-height animates between tabs
  return measured.value
    ? { '--container-hts': `${containerHts.value}px` }
    : undefined
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
  },
)
</script>

<template>
  <div :class="bodyClass" :style="containerHeightVar">
    <div :class="btnContainerClass" role="tablist">
      <slot
        name="tab-button"
        :update="updateActiveTab"
        :activeTab="activeTabIdx"
        :tab-attrs="tabAttrs"
      ></slot>
    </div>
    <div :class="contentContainerClass">
      <div
        class="container-hts grid grid-cols-1 grid-rows-1 transition-[max-height] duration-300"
      >
        <Transition :name="slideDirection">
          <div
            :key="activeTabIdx"
            class="relative col-start-1 col-end-1 row-start-1 row-end-1"
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
  max-height: var(--container-hts, none);
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

/* Reduced motion: crossfade slides in place instead of sliding them. */
@media (prefers-reduced-motion: reduce) {
  .slide-prev-enter-active,
  .slide-prev-leave-active,
  .slide-next-enter-active,
  .slide-next-leave-active {
    transition-property: opacity;
  }
  .slide-prev-enter-from,
  .slide-prev-leave-to,
  .slide-next-enter-from,
  .slide-next-leave-to {
    transform: none;
  }
}
</style>
