<script setup lang="ts">
import { reactive, ref } from 'vue'
import MclDropdown, {
  DropdownItem,
  ItemClickEvent,
} from '@/components/mcl-dropdown'
import type {
  ColorPalette,
  BodyText,
  FontWeight,
} from '@/components/manguito-theme'
import { colors, bodyTextSize, fontWeightOptions } from '@/assets/options'

// test
import { Sidebar, vToggle, Modal } from '@/components/manguito-theme'

const selectedInfoRef = ref<string>('')
const selectedLinkRef = ref<string>('')
const dropdownItems: DropdownItem[] = [
  {
    title: 'Dropdown item example 1',
    link: '#',
  },
  {
    title: 'Dropdown item example 2',
    link: '#',
  },
  {
    title: 'Dropdown item example 3',
    link: '#',
  },
  {
    title: 'Dropdown item example 4',
    link: '#',
  },
]
const stateAlpha = reactive<{
  title: string
  buttonColor?: ColorPalette
  buttonRounded?: boolean
  buttonTextColor?: ColorPalette
  buttonInvert?: boolean
  dropdownItems: DropdownItem[]
  dropdownColor?: ColorPalette
  displayBorder?: boolean
  rounded?: boolean
  displayShadow?: boolean
  hoverBgColor?: ColorPalette
  dropdownTextSize?: BodyText
  dropdownFontWeight?: FontWeight
  dropdownTextColor?: ColorPalette
  displaySeparator?: boolean
}>({
  title: 'MCL Dropdown',
  buttonColor: 'warning',
  buttonRounded: false,
  buttonTextColor: 'black',
  buttonInvert: false,
  dropdownItems,
  dropdownColor: 'white',
  displayBorder: true,
  rounded: true,
  displayShadow: true,
  hoverBgColor: 'light-4',
  dropdownTextSize: 'md',
  dropdownFontWeight: 'normal',
  dropdownTextColor: 'dark-3',
  displaySeparator: false,
})
const handleItemClick = (e: ItemClickEvent): void => {
  selectedInfoRef.value = e.item.title
  selectedLinkRef.value = e.item.link
}
const handleClearButtonClick = (): void => {
  selectedInfoRef.value = ''
  selectedLinkRef.value = ''
}
</script>

<template>
  <Story title="Dropdown" group="base-comp">
    <Variant title="mcl-dropdown">
      <div
        class="border-2 rounded-lg p-lg border-dark-3 max-w-[500px] bg-white"
      >
        <mcl-dropdown
          :title="stateAlpha.title"
          :button-color="stateAlpha.buttonColor"
          :button-rounded="stateAlpha.buttonRounded"
          :button-text-color="stateAlpha.buttonTextColor"
          :button-invert="stateAlpha.buttonInvert"
          :dropdown-items="stateAlpha.dropdownItems"
          :dropdown-color="stateAlpha.dropdownColor"
          :display-border="stateAlpha.displayBorder"
          :rounded="stateAlpha.rounded"
          :display-shadow="stateAlpha.displayShadow"
          :hover-bg-color="stateAlpha.hoverBgColor"
          :dropdown-text-color="stateAlpha.dropdownTextColor"
          :dropdown-text-size="stateAlpha.dropdownTextSize"
          :dropdown-font-weight="stateAlpha.dropdownFontWeight"
          :display-separator="stateAlpha.displaySeparator"
          @item-click="handleItemClick"
        ></mcl-dropdown>
        <div class="my-md">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat odio
          voluptate fuga quibusdam nostrum veritatis similique aperiam nobis
          debitis, excepturi id culpa quasi quos totam obcaecati deserunt ea
          quis sit quisquam alias nihil omnis! Aut culpa architecto repellat
          minima adipisci porro consequatur, officiis facere ea quos officia
          fugiat atque quia?
        </div>
        <div>
          <p>Selected Item Title: {{ selectedInfoRef }}</p>
          <p>Selected Item Link: {{ selectedLinkRef }}</p>
        </div>
        <div>
          <button
            class="btn btn-invert btn-danger mt-sm btn-round"
            @click="handleClearButtonClick"
          >
            Clear
          </button>
        </div>
      </div>
      <template #controls>
        <HstText title="title" v-model="stateAlpha.title" />
        <HstSelect
          title="button-color"
          v-model="stateAlpha.buttonColor"
          :options="colors"
        />
        <HstCheckbox
          title="button-rounded"
          v-model="stateAlpha.buttonRounded"
        />
        <HstSelect
          title="button-text-color"
          v-model="stateAlpha.buttonTextColor"
          :options="colors"
        />
        <HstCheckbox title="button-invert" v-model="stateAlpha.buttonInvert" />
        <HstSelect
          title="dropdown-color"
          v-model="stateAlpha.dropdownColor"
          :options="colors"
        />
        <HstCheckbox
          title="display-border"
          v-model="stateAlpha.displayBorder"
        />
        <HstCheckbox title="rounded" v-model="stateAlpha.rounded" />
        <HstCheckbox
          title="display-shadow"
          v-model="stateAlpha.displayShadow"
        />
        <HstSelect
          title="hover-bg-color"
          v-model="stateAlpha.hoverBgColor"
          :options="colors"
        />
        <HstSelect
          title="dropdown-text-color"
          v-model="stateAlpha.dropdownTextColor"
          :options="colors"
        />
        <HstSelect
          title="dropdown-text-size"
          v-model="stateAlpha.dropdownTextSize"
          :options="bodyTextSize"
        />
        <HstSelect
          title="dropdown-font-weight"
          v-model="stateAlpha.dropdownFontWeight"
          :options="fontWeightOptions"
        />
        <HstCheckbox
          title="display-separator"
          v-model="stateAlpha.displaySeparator"
        />
      </template>
    </Variant>
    <Variant title="test">
      <div>
        <button v-toggle:my-modal>Toggle button</button>
        <modal
          modal-id="my-modal"
          class-name="bg-primary px-xs overflow-scroll rounded-md max-h-[80vh]"
        >
          <template #header="{ close }">
            <button class="btn btn-secondary" @click="close">
              Close button
            </button>
          </template>
          <template #body>
            <h2 class="h2-md mb-md">This is Modal</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              fermentum commodo dolor eget aliquet. Donec malesuada lorem
              dictum, varius augue ut, congue lacus. Proin ornare nisl cursus
              vehicula bibendum. Maecenas gravida semper erat quis posuere.
              Suspendisse eu interdum orci. Suspendisse pellentesque finibus
              lacus, ac ultrices libero placerat sed. Vestibulum ac purus velit.
              Duis at euismod mi, quis malesuada erat. Sed feugiat cursus massa,
              et posuere tellus sagittis non. Suspendisse consectetur ligula eu
              nunc malesuada bibendum. Maecenas quis leo a tellus vulputate
              imperdiet. Suspendisse suscipit lobortis massa, nec tristique quam
              sagittis sed. Nulla eget accumsan orci, laoreet mollis quam. Proin
              neque velit, suscipit ac tortor ut, mattis rhoncus massa.
              Suspendisse non eros mi. Sed ut urna sed ex finibus consectetur.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              fermentum commodo dolor eget aliquet. Donec malesuada lorem
              dictum, varius augue ut, congue lacus. Proin ornare nisl cursus
              vehicula bibendum. Maecenas gravida semper erat quis posuere.
              Suspendisse eu interdum orci. Suspendisse pellentesque finibus
              lacus, ac ultrices libero placerat sed. Vestibulum ac purus velit.
              Duis at euismod mi, quis malesuada erat. Sed feugiat cursus massa,
              et posuere tellus sagittis non. Suspendisse consectetur ligula eu
              nunc malesuada bibendum. Maecenas quis leo a tellus vulputate
              imperdiet. Suspendisse suscipit lobortis massa, nec tristique quam
              sagittis sed. Nulla eget accumsan orci, laoreet mollis quam. Proin
              neque velit, suscipit ac tortor ut, mattis rhoncus massa.
              Suspendisse non eros mi. Sed ut urna sed ex finibus consectetur.
            </p>
          </template>
          <template #footer="{ close }">
            <div class="bg-primary border-t-2 p-xs">
              This is footer
              <button class="btn btn-warning" @click="close">
                Close button
              </button>
            </div>
          </template>
        </modal>
      </div>
    </Variant>
  </Story>
</template>

<style scoped></style>
