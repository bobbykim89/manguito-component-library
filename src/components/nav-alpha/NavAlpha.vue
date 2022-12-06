<script setup lang="ts">
import { ref, withDefaults, computed, onMounted, onBeforeUnmount } from 'vue'
import type {
  ColorPalette,
  CtaTarget,
  HeadingSize,
} from '@mcl/manguito-theme/theme/theme.types'
import generateClass from '@mcl/manguito-theme'
// Import hamburgerMenu
import HamburgerMenu from './lib/HamburgerMenu.vue'

export interface NavItemType {
  title: string
  url: string
  target?: CtaTarget
}

const props = withDefaults(
  defineProps<{
    logo: string
    logoSmall?: string
    title: string
    titleSize?: HeadingSize
    titleColor?: ColorPalette
    navItems: NavItemType[]
    navItemAsLink?: boolean
    bgColor?: ColorPalette
    hamburgerColor?: ColorPalette
    hamburgerBorder?: boolean
  }>(),
  {
    titleSize: 'md',
    titleColor: 'dark-3',
    bgColor: 'light-1',
    hamburgerColor: 'dark-1',
    hamburgerBorder: true,
  }
)

const navScroll = ref<boolean>(false)
const navOpen = ref<boolean>(false)
const emit = defineEmits(['toggle-menu', 'menu-click'])

const toggleNavButton = (e: Event): void => {
  navOpen.value = !navOpen.value
  emit('toggle-menu', e)
}

const navItemClick = (
  e: Event,
  link: string,
  target: string,
  itemLink: boolean
): void => {
  /**
   * @e - $event
   * @link - navItems[#].url
   * @target - navItems[#].target
   * @itemlink - navItemAsLink
   */
  e.preventDefault()
  navOpen.value = false
  if (itemLink) {
    window.open(link, target)
  } else {
    emit('menu-click', e)
    console.log('emit menu click: ', e, link, target)
  }
}

// collapse/expand mobile menu
const mobileMenu = ref()
const mobileMenuHeight = ref<number>()

const initObserver = (): ResizeObserver => {
  const observer = new ResizeObserver(() => {
    mobileMenuHeight.value = mobileMenu.value.scrollHeight
  })
  return observer
}

const menuHeightVal = computed(() => {
  return {
    height:
      mobileMenu.value && navOpen.value ? mobileMenuHeight.value + 'px' : '0px',
  }
})

onMounted(() => {
  initObserver().observe(mobileMenu.value)
})
onBeforeUnmount(() => {
  initObserver().unobserve(mobileMenu.value)
})
</script>

<template>
  <nav
    :class="[
      navScroll ? 'lg:shadow-md bg-opacity-70' : 'bg-opacity-80',
      'bg-light-1 w-full top-0 md:sticky items-center z-50 transition ease-in duration-500 delay-150',
    ]"
  >
    <div
      class="flex flex-wrap items-center py-xs mx-xs md:mx-sm align-middle justify-between sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px]"
    >
      <div class="flex flex-shrink-0 items-center self-center">
        <div class="h-lg mr-2xs md:mr-sm align-middle">
          <img
            :src="logo"
            alt=""
            class="h-full"
            :class="[logoSmall ? 'hidden md:inline-block' : 'inline-block']"
          />
          <img
            v-if="logoSmall"
            :src="logoSmall"
            alt=""
            class="inline-block md:hidden h-full"
          />
        </div>
        <div class="flex flex-col justify-center ml-2">
          <h1
            class="inline-block font-bold text-xl align-middle tracking-wider"
            v-html="title"
          ></h1>
          <li class="hidden md:flex flex-wrap">
            <ul
              class="mr-xs last:mr-0"
              v-for="(item, index) in navItems"
              :key="`menu-${index}`"
            >
              <a
                :href="item.url"
                :target="item.target"
                v-html="item.title"
                class="tracking-wider outline-none nav__text"
                @click="
                  navItemClick($event, item.url, item.target, navItemAsLink)
                "
              ></a>
              <div
                class="relative -top-[2px] nav__decorator before:bg-primary"
              ></div>
            </ul>
          </li>
        </div>
      </div>
      <div>
        <hamburger-menu
          :color="hamburgerColor"
          :display-border="hamburgerBorder"
          @hbg-click="toggleNavButton"
        ></hamburger-menu>
        <div class="hidden md:block">end</div>
      </div>
    </div>
    <!-- mobile menu -->
    <div
      class="h-auto overflow-hidden"
      :class="[
        navOpen
          ? 'transition-all duration-500 ease-in'
          : 'transition-all duration-500 ease-out',
        ,
      ]"
      ref="mobileMenu"
      :style="menuHeightVal"
    >
      <div
        class="bg-light-2 bg-opacity-80 rounded-md my-2xs mx-xs overflow-hidden"
      >
        <ul class="flex flex-col items-center justify-center p-xs">
          <li
            class="mb-2xs last:mb-0"
            v-for="(item, index) in navItems"
            :key="`mobile-${index}`"
          >
            <a
              :href="item.url"
              :target="item.target"
              v-html="item.title"
              class="tracking-wider outline-none nav__text"
              @click="
                navItemClick($event, item.url, item.target, navItemAsLink)
              "
            ></a>
            <div
              class="relative -top-[2px] nav__decorator before:bg-primary"
            ></div>
          </li>
        </ul>
        <div>
          <slot name="mobile-slot"></slot>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.nav__decorator {
  height: 6px;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 0;
    transition: width 0.3s linear;
  }
}

.nav__text:focus + .nav__decorator::before,
.nav__text:hover + .nav__decorator::before {
  width: 100%;
}
</style>
