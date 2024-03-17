<script setup lang="ts">
import { Transition, computed, ref } from 'vue'
import type { ColorPalette } from '../../'
import generateClass from '../../'
import NavDrawer from './NavDrawer.vue'
const props = withDefaults(
  defineProps<{
    bgColor?: ColorPalette
    drawerBtnColor?: ColorPalette
    drawerBtnBorder?: boolean
    headerWidth?: number
  }>(),
  {
    bgColor: 'light-1',
    drawerBtnColor: 'dark-1',
    drawerBtnBorder: true,
    headerWidth: 160,
  }
)

const slots = defineSlots<{
  default: any
  content: any
  'content-bottom': any
  'mobile-content'(props: { headerClose: () => void }): any
}>()
const emit = defineEmits<{
  (e: 'toggle-drawer', event: Event, open: boolean): void
}>()
const navOpen = ref<boolean>(false)

const toggleNavButton = (e: Event): void => {
  navOpen.value = !navOpen.value
  emit('toggle-drawer', e, navOpen.value)
}

const closeNav = (): void => {
  navOpen.value = false
}

const componentWidth = computed(() => {
  return { '--header-width': `${props.headerWidth}px` }
})

defineExpose({
  headerClose: closeNav,
})
</script>

<template>
  <section class="lg:flex">
    <header class="relative" :style="componentWidth">
      <nav
        class="hidden lg:block lg:sticky lg:top-0 lg:left-0 lg:h-[100vh] py-sm header-desktop"
        :class="[generateClass('BGCOLOR', bgColor)]"
      >
        <div class="flex flex-col justify-between h-full">
          <div>
            <slot name="content" />
          </div>
          <div v-if="slots['content-bottom']">
            <slot name="content-bottom" />
          </div>
        </div>
      </nav>

      <div class="block fixed lg:hidden top-0 right-0 mr-xs mt-xs z-20">
        <NavDrawer
          :color="drawerBtnColor"
          :display-border="drawerBtnBorder"
          class="block lg:hidden relative"
          @hbg-click="toggleNavButton"
          :toggle="navOpen"
          :nav-color="bgColor"
        ></NavDrawer>
      </div>

      <!-- mobile menu -->

      <div class="block lg:hidden relative overscroll-contain">
        <Transition name="slide-down" appear>
          <div
            class="fixed inset-0 overflow-y-scroll py-lg px-sm"
            v-if="navOpen"
            :class="generateClass('BGCOLOR', bgColor)"
          >
            <div v-if="slots['mobile-content']">
              <slot name="mobile-content" :header-close="closeNav" />
            </div>
          </div>
        </Transition>
      </div>
    </header>
    <div class="w-full">
      <slot />
    </div>
  </section>
</template>

<style scoped lang="scss">
.header-desktop {
  width: 100%;
  @media screen and (min-width: 1024px) {
    width: var(--header-width);
  }
}
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.5s ease-in, opacity 0.5s ease-in;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
