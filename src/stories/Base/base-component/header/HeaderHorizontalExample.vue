<script setup lang="ts">
import type {
  ColorPalette,
  HeaderStickyOptionType,
} from '@/components/manguito-theme'
import { HeaderHorizontal } from '@/components/manguito-theme/lib'
import { ref } from 'vue'

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
  }
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
          <div class="h-md md:h-lg lg:h-xl mr-2xs md:mr-sm align-middle">
            <a href="#" target="_self" @click="handleMenuClick">
              <img
                src="https://res.cloudinary.com/dwgni1x3t/image/upload/v1670275930/MCL/mcl-logo-square_jvgyxx.png"
                alt="MCL Logo"
                class="h-full inline-block"
              />
            </a>
          </div>
          <div class="flex flex-col justify-center ml-2">
            <a href="#" target="_self" @click="handleMenuClick">
              <h2 class="inline-block align-middle tracking-wider h2-md">
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
          <div class="flex flex-col justify-center items-center gap-xs py-md">
            <a href="#" @click="handleMenuClick($event)">Mobile Menu 1</a>
            <a href="#" @click="handleMenuClick($event)">Mobile Menu 2</a>
            <a href="#" @click="handleMenuClick($event)">Mobile Menu 3</a>
          </div>
          <div class="flex justify-center items-center gap-xs">
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
