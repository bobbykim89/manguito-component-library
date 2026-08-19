<script setup lang="ts">
import type {
  ColorPalette,
  HeaderStickyOptionType,
} from '@/components/manguito-theme/lib'
import { HeaderHorizontal } from '@/components/manguito-theme/lib'
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    bgColor?: ColorPalette
    mobileMenuBgColor?: ColorPalette
    drawerBtnColor?: ColorPalette
    showDrawerBorder?: boolean
    fadeInOnScroll?: boolean
    scrollDistance?: number
    sticky?: HeaderStickyOptionType
  }>(),
  {
    bgColor: 'light-1',
    mobileMenuBgColor: 'light-2',
    drawerBtnColor: 'dark-1',
    showDrawerBorder: true,
    fadeInOnScroll: true,
    scrollDistance: 50,
    sticky: 'all',
  },
)
const headerRef = ref<InstanceType<typeof HeaderHorizontal>>()

const handleMenuClick = (e: Event) => {
  e.preventDefault()
  headerRef.value!.headerClose()
  console.log('Item Clicked!')
}
</script>

<template>
  <section>
    <HeaderHorizontal ref="headerRef" v-bind="props">
      <template #content>
        <div class="flex flex-shrink-0 items-center self-center">
          <div class="mr-2xs h-md align-middle md:mr-sm md:h-lg lg:h-xl">
            <a href="#" target="_self" @click="handleMenuClick">
              <img
                src="https://res.cloudinary.com/dwgni1x3t/image/upload/v1670275930/MCL/mcl-logo-square_jvgyxx.png"
                alt="MCL Logo"
                class="inline-block h-full"
              />
            </a>
          </div>
          <div class="ml-2 flex flex-col justify-center">
            <a href="#" target="_self" @click="handleMenuClick">
              <h2 class="h2-md inline-block align-middle tracking-wider">
                Header Horizontal
              </h2>
            </a>
          </div>
        </div>
      </template>
      <template #nav-desktop-right>
        <div class="flex items-center gap-xs">
          <button class="btn btn-primary">Button A</button>
          <button class="btn btn-secondary">Button B</button>
        </div>
      </template>
      <template #mobile-content="{ headerClose }">
        <div>
          <div class="flex flex-col items-center justify-center gap-xs py-md">
            <a href="#" @click="handleMenuClick($event)">Mobile Menu 1</a>
            <a href="#" @click="handleMenuClick($event)">Mobile Menu 2</a>
            <a href="#" @click="handleMenuClick($event)">Mobile Menu 3</a>
          </div>
          <div class="flex items-center justify-center gap-xs">
            <button class="btn btn-primary" @click="headerClose">
              Button A
            </button>
            <button class="btn btn-secondary" @click="headerClose">
              Button B
            </button>
          </div>
        </div>
      </template>
    </HeaderHorizontal>
    <div class="h-[1000px] bg-primary"></div>
    <div class="h-[1000px] bg-secondary"></div>
  </section>
</template>

<style scoped></style>
