<script setup lang="ts">
import { reactive, ref } from 'vue'
import ModalAlpha from '@/components/modal-alpha'
import MclInput from '@/components/mcl-input'
import type {
  ColorPalette,
  HeadingSize,
} from '@/components/manguito-theme/theme/theme.types'
import { colors, headingTextSize } from '@/assets/options'

const stateAlpha = reactive<{
  displayHeader?: boolean
  headerText?: string
  headerSize?: HeadingSize
  headerColor?: ColorPalette
  backdropColor?: ColorPalette
  bgColor?: ColorPalette
  rounded?: boolean
  displayShadow?: boolean
  modelValue?: boolean
  slotText?: string
}>({
  displayHeader: true,
  headerText: 'Modal Alpha',
  headerSize: 'md',
  headerColor: 'dark-3',
  backdropColor: 'dark-4',
  bgColor: 'light-1',
  rounded: true,
  displayShadow: true,
  modelValue: false,
  slotText:
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum, praesentium aspernatur illo molestias magni labore corporis odio ipsa minima optio.',
})

interface FormData {
  name: string
  email: string
  password: string
}
const modalState = ref(false)
const formInput = reactive<FormData>({
  name: '',
  email: '',
  password: '',
})
const outputInfo = reactive<FormData>({
  name: '',
  email: '',
  password: '',
})

const openModal = (): void => {
  modalState.value = true
}
const formSubmit = (): void => {
  Object.assign(outputInfo, formInput)

  Object.assign(formInput, {
    name: '',
    email: '',
    password: '',
  })
  modalState.value = false
}
const modalCancel = (): void => {
  Object.assign(formInput, {
    name: '',
    email: '',
    password: '',
  })

  modalState.value = false
}
</script>

<template>
  <Story title="Modal" group="base-comp">
    <Variant title="modal-alpha">
      <div class="relative w-screen h-screen">
        <div class="p-sm">
          <button class="btn" @click="openModal">Open Modal</button>
          <div class="flex flex-col justify-center items-center mt-md">
            <p class="mb-xs">Name: {{ outputInfo.name }}</p>
            <p class="mb-xs">Email: {{ outputInfo.email }}</p>
            <p class="mb-xs">Password: {{ outputInfo.password }}</p>
          </div>
        </div>
        <modal-alpha
          v-model="modalState"
          :display-header="stateAlpha.displayHeader"
          :header-text="stateAlpha.headerText"
          :header-size="stateAlpha.headerSize"
          :header-color="stateAlpha.headerColor"
          :backdrop-color="stateAlpha.backdropColor"
          :bg-color="stateAlpha.bgColor"
          :rounded="stateAlpha.rounded"
          :display-shadow="stateAlpha.displayShadow"
          @modal-close="modalCancel"
        >
          <div v-html="stateAlpha.slotText" class="mb-sm"></div>
          <form @submit.prevent="formSubmit">
            <mcl-input
              identifier="name"
              label-text="Name: "
              highlight-color="warning"
              bg-color="light-2"
              placeholder="John Doe"
              :is-required="true"
              v-model="formInput.name"
            ></mcl-input>
            <mcl-input
              identifier="email"
              label-text="Email: "
              highlight-color="warning"
              bg-color="light-2"
              type="email"
              placeholder="example@email.com"
              :is-required="true"
              v-model="formInput.email"
            ></mcl-input>
            <mcl-input
              identifier="password"
              label-text="Password: "
              highlight-color="warning"
              bg-color="light-2"
              type="password"
              :is-required="true"
              v-model="formInput.password"
            ></mcl-input>

            <div class="flex justify-end">
              <button type="submit" class="btn btn-warning mr-xs">
                Submit
              </button>
              <button type="button" @click="modalCancel" class="btn btn-danger">
                Cancel
              </button>
            </div>
          </form>
        </modal-alpha>
      </div>
      <template #controls>
        <HstCheckbox
          title="display-header"
          v-model="stateAlpha.displayHeader"
        />
        <HstText title="header-text" v-model="stateAlpha.headerText" />
        <HstSelect
          title="header-size"
          v-model="stateAlpha.headerSize"
          :options="headingTextSize"
        />
        <HstSelect
          title="header-color"
          v-model="stateAlpha.headerColor"
          :options="colors"
        />
        <HstSelect
          title="backdrop-color"
          v-model="stateAlpha.backdropColor"
          :options="colors"
        />
        <HstSelect
          title="bg-color"
          v-model="stateAlpha.bgColor"
          :options="colors"
        />
        <HstCheckbox title="rounded" v-model="stateAlpha.rounded" /><HstCheckbox
          title="display-shadow"
          v-model="stateAlpha.displayShadow"
        />
        <HstTextarea v-model="stateAlpha.slotText" title="Slot Text" />
      </template>
    </Variant>
  </Story>
</template>
