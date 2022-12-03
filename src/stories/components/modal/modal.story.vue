<script setup lang="ts">
import { reactive, ref } from 'vue'
import ModalAlpha from '@/components/modal-alpha'
import BtnAlpha from '@/components/btn-alpha'
import type {
  ColorPalette,
  HeadingSize,
  CtaTarget,
  CrossOrigin,
} from '@/components/manguito-theme/theme/theme.types'
import {
  colors,
  bodyTextSize,
  buttonSize,
  targetOption,
  headingTextSize,
  corsOptions,
} from '@/assets/options'

const modalState = ref(false)

const openModal = (): void => {
  modalState.value = true
}
</script>

<template>
  <Story title="Modal" group="base-comp">
    <Variant title="modal-alpha">
      <div class="relative w-screen h-screen">
        <div class="p-sm">
          <btn-alpha @btn-click="openModal">Click to open modal</btn-alpha>
        </div>
        <modal-alpha v-model="modalState">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum
          dignissimos, rem sint optio odit minima voluptatum tempore fuga eum
          cum molestias. Alias dignissimos numquam enim necessitatibus doloribus
          ab sit sunt.
        </modal-alpha>
      </div>
    </Variant>
  </Story>
</template>
