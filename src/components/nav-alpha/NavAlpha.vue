<script setup lang="ts">
import { ref, withDefaults } from 'vue'

const props = withDefaults(
  defineProps<{
    logo: string
    title: string
  }>(),
  {}
)

const navScroll = ref<boolean>(false)
const navOpen = ref<boolean>(false)
</script>

<template>
  <nav
    :class="[
      navScroll ? 'lg:shadow-md bg-opacity-70' : 'bg-opacity-80',
      'bg-white w-full top-0 md:sticky items-center z-50 transition ease-in duration-500 delay-150',
    ]"
  >
    <div
      class="flex flex-wrap items-center py-sm mx-6 align-middle justify-between sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px]"
    >
      <div class="flex flex-shrink-0 mr-md self-center">
        <div class="inline-block h-8 align-middle">
          <img :src="logo" alt="" class="h-full" />
        </div>
        <h1 class="inline-block font-bold text-xl align-middle ml-2">
          {{ title }}
        </h1>
      </div>
      <div>end</div>
    </div>
  </nav>
</template>

<style lang="scss" scoped></style>
