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
        <btn-alpha @btn-click="openModal">Click to open modal</btn-alpha>
        <modal-alpha v-model="modalState"></modal-alpha>
      </div>
    </Variant>
  </Story>
</template>
