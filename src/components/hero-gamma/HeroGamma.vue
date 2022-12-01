<script setup lang="ts">
import { withDefaults } from 'vue'
import type {
  HeadingSize,
  ColorPalette,
} from '@mcl/manguito-theme/theme/theme.types'
import generateClass from '@mcl/manguito-theme'

const props = withDefaults(
  defineProps<{
    title: string
    titleSize?: HeadingSize
    titleColor?: ColorPalette
    imageSource: string
  }>(),
  {
    titleSize: 'md',
    titleColor: 'dark-3',
  }
)

const getBgImage = (img: string) => {
  /**
   * @img - bgImage
   */
  return {
    '--bg-image': `url('${img}')`,
  }
}
</script>

<template>
  <section class="h-[1000px]">HeroGamma</section>
  <section class="h-[80vh] flex flex-col justify-evenly items-center relative">
    <div class="section-bg" :style="getBgImage(imageSource)"></div>
    <div
      class="absolute bg-gradient-to-t inset-0 top-1/3 -bottom-0 from-secondary/80 to-transparent"
    ></div>
    <h1
      class="relative text-5xl text-center font-bold text-white tracking-wide py-12"
      v-html="title"
    ></h1>
  </section>
  <section class="h-[1000px]">HeroGamma</section>
</template>

<style lang="scss" scoped>
.section-bg {
  height: 80vh;
  position: relative;
  // webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);

  // content: "";
  // width: 100%;
  // height: 100%;
  // position: absolute;
  // top: 0;
  // left: 0;
  // background-position: center 5%;
  // background-size: cover;
  // background-repeat: no-repeat;

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 0;
    position: fixed;
    background-position: center 5%;
    background-size: cover;
    background-repeat: no-repeat;
    // will-change: transform;
    background-image: var(--bg-image);
  }
}
</style>
