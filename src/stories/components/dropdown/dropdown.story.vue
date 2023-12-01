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

const collapseContent = [
  {
    id: '1',
    title: 'Accordion 1',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga quo incidunt a blanditiis mollitia ea est? Fugit voluptate expedita magni vitae iste. Nulla aperiam voluptate ullam dolor officiis earum quis aliquam at ducimus porro. Quidem, molestias! Voluptates perferendis distinctio ipsam dicta optio non praesentium, maiores commodi. Natus, ducimus doloremque?',
  },
  {
    id: '2',
    title: 'Accordion 2',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga quo incidunt a blanditiis mollitia ea est? Fugit voluptate expedita magni vitae iste. Nulla aperiam voluptate ullam dolor officiis earum quis aliquam at ducimus porro. Quidem, molestias! Voluptates perferendis distinctio ipsam dicta optio non praesentium, maiores commodi. Natus, ducimus doloremque?',
  },
  {
    id: '3',
    title: 'Accordion 3',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga quo incidunt a blanditiis mollitia ea est? Fugit voluptate expedita magni vitae iste. Nulla aperiam voluptate ullam dolor officiis earum quis aliquam at ducimus porro. Quidem, molestias! Voluptates perferendis distinctio ipsam dicta optio non praesentium, maiores commodi. Natus, ducimus doloremque?',
  },
  {
    id: '4',
    title: 'Accordion 4',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga quo incidunt a blanditiis mollitia ea est? Fugit voluptate expedita magni vitae iste. Nulla aperiam voluptate ullam dolor officiis earum quis aliquam at ducimus porro. Quidem, molestias! Voluptates perferendis distinctio ipsam dicta optio non praesentium, maiores commodi. Natus, ducimus doloremque?',
  },
]
const customButtonColor = (idx: number): string => {
  switch (idx) {
    case 0:
      return 'btn-primary'
    case 1:
      return 'btn-secondary'
    case 2:
      return 'btn-success'
    case 3:
      return 'btn-danger'
    default:
      return ' '
  }
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
  </Story>
</template>

<style scoped></style>
