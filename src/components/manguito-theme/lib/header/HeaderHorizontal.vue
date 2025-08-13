<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed, ref } from 'vue'
import { generateClass } from '../theme'
import type { ColorPalette } from '../theme/static/theme.types'
import NavDrawer from './NavDrawer.vue'
import type { HeaderStickyOptionType } from './index.types'

const props = withDefaults(
  defineProps<{
    bgColor?: ColorPalette
    mobileMenuBgColor?: ColorPalette
    drawerBtnColor?: ColorPalette
    drawerBtnBorder?: boolean
    fadeInOnScroll?: boolean
    scrollDistance?: number
    sticky?: HeaderStickyOptionType
  }>(),
  {
    bgColor: 'light-1',
    mobileMenuBgColor: 'light-2',
    drawerBtnColor: 'dark-1',
    drawerBtnBorder: true,
    fadeInOnScroll: true,
    scrollDistance: 50,
    sticky: 'all',
  },
)

const slots = defineSlots<{
  content: any
  'content-right': any
  'mobile-content'(props: { headerClose: () => void }): any
}>()
const navOpen = ref<boolean>(false)
const { y } = useWindowScroll()
const emit = defineEmits<{
  (e: 'toggle-drawer', event: Event, open: boolean): void
}>()

const closeNav = (): void => {
  navOpen.value = false
}

const toggleNavButton = (e: Event): void => {
  navOpen.value = !navOpen.value
  emit('toggle-drawer', e, navOpen.value)
}

/**
 * @TransitionFunctions
 * @param {HTMLElement} el - passed any since transition handlers don't accept HTMLElement (accepts Element)
 */
const onEnter = (el: any) => {
  el.style.height = 'auto'
  const endWidth = getComputedStyle(el).height
  el.style.height = '0px'
  el.offsetHeight // force repaint
  el.style.height = endWidth
}
const onAfterEnter = (el: any) => {
  el.style.height = 'auto'
}
const onLeave = (el: any) => {
  el.style.height = getComputedStyle(el).height
  el.offsetHeight // force repaint
  el.style.height = '0px'
}

const handleHeaderClass = computed<string>(() => {
  const { bgColor, sticky } = props
  const classArray: string[] = [generateClass('BGCOLOR', bgColor)]
  if (sticky === 'all') {
    classArray.push('sticky top-0')
    return classArray.join(' ')
  }
  if (sticky === 'tablet') {
    classArray.push('md:sticky top-0')
    return classArray.join(' ')
  }
  if (sticky === 'pc') {
    classArray.push('lg:sticky top-0')
    return classArray.join(' ')
  }
  return classArray.join(' ')
})

const handleFadeInOnScroll = computed(() => {
  const { fadeInOnScroll, scrollDistance } = props
  if (!fadeInOnScroll) {
    return ''
  }
  return y.value >= scrollDistance
    ? 'lg:shadow-md bg-opacity-70'
    : 'bg-opacity-100'
})

defineExpose<{
  headerClose: () => void
}>({
  headerClose: closeNav,
})
</script>

<template>
  <header
    class="z-50 w-full items-center transition delay-150 duration-500 ease-in"
    :class="[handleFadeInOnScroll, handleHeaderClass]"
  >
    <nav
      class="py-xs md:py-2xs mx-xs md:mx-sm flex flex-wrap items-center justify-between align-middle sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px]"
    >
      <div class="min-h-[24px]">
        <slot name="content"></slot>
      </div>
      <div class="ml-auto">
        <NavDrawer
          :color="drawerBtnColor"
          :display-border="drawerBtnBorder"
          class="block lg:hidden"
          @hbg-click="toggleNavButton"
          :toggle="navOpen"
          :nav-color="bgColor"
        ></NavDrawer>
        <div v-if="slots['content-right']" class="hidden lg:block">
          <slot name="content-right"></slot>
        </div>
      </div>
    </nav>
    <!-- mobile menu -->

    <div class="overflow-hidden lg:hidden">
      <transition
        name="collapse"
        @enter="onEnter"
        @after-enter="onAfterEnter"
        @leave="onLeave"
      >
        <div
          class="my-2xs mx-xs overflow-hidden rounded-md bg-opacity-80"
          v-if="navOpen"
          :class="generateClass('BGCOLOR', mobileMenuBgColor)"
        >
          <div v-if="slots['mobile-content']">
            <slot name="mobile-content" :header-close="closeNav"></slot>
          </div>
        </div>
      </transition>
    </div>
  </header>
</template>

<style scoped lang="scss">
.collapse-enter-active {
  transition: height 0.5s ease-in;
}
.collapse-leave-active {
  transition: height 0.5s ease-out;
}
</style>
