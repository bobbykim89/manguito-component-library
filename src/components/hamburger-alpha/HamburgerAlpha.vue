<script setup lang="ts">
import { withDefaults } from 'vue'
import type { ColorPalette } from '@mcl/manguito-theme/theme/theme.types'
import generateClass from '@mcl/manguito-theme'

const props = withDefaults(
  defineProps<{
    color?: ColorPalette
    bgColor?: ColorPalette
  }>(),
  {
    color: 'dark-3',
    bgColor: 'light-1',
  }
)
</script>

<template>
  <div class="relative">
    <input type="checkbox" id="nav-toggle" class="mobile__checkbox" />
    <label for="nav-toggle" class="relative mobile__button">
      <span class="mobile__icon">&nbsp;</span>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.mobile {
  &__checkbox {
    display: none;
  }
  &__button {
    // background-color: rgba(#fff, 0.7);
    // height: 4rem;
    // width: 4rem;
    // border-radius: 50%;
    z-index: 100;
    // text-align: center;
    cursor: pointer;
    // box-shadow: 0 0.6rem 2rem rgba(#000, 0.1);
  }
  &__icon {
    position: relative;
    margin-top: 1rem;

    &,
    &::before,
    &::after {
      width: 2rem;
      height: 3px;
      background-color: #000;
      display: inline-block;
    }

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 0;
      transition: all 0.3s;
    }

    &::before {
      top: -0.6rem;
    }

    &::after {
      top: 0.6rem;
    }
  }
  &__checkbox:checked + &__button &__icon {
    background-color: transparent;
  }

  &__checkbox:checked + &__button &__icon::before {
    top: 0;
    transform: rotate(135deg);
  }

  &__checkbox:checked + &__button &__icon::after {
    top: 0;
    transform: rotate(-135deg);
  }
}
</style>
