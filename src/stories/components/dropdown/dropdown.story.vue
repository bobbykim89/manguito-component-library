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
import ModalTest from '@/components/manguito-theme/lib/modal/ModalTest.vue'
import { vToggleTest } from '@/components/manguito-theme'

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
    <Variant title="Modal">
      <div>
        <div class="flex justify-center gap-xs my-md">
          <button class="btn btn-danger" v-toggle-test:modal-1>Modal 1</button>
          <button class="btn btn-danger" v-toggle-test:modal-2>Modal 2</button>
          Modal Default Header
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dui
          neque, malesuada sit amet lacus sit amet, mollis vestibulum justo.
          Duis vel elit eget ligula condimentum feugiat ut vel magna. Curabitur
          consequat, nibh quis commodo suscipit, nulla nibh dapibus quam, non
          dictum elit mauris sed diam. Suspendisse orci arcu, placerat ut ante
          pellentesque, efficitur cursus dui. Mauris laoreet consequat
          hendrerit. Morbi et venenatis enim. Donec quis hendrerit ipsum. In
          nunc dui, interdum at orci rhoncus, scelerisque finibus risus.
        </p>
        <p>
          Mauris in gravida tellus. In vestibulum, odio tempor posuere
          sollicitudin, lorem diam imperdiet augue, vel efficitur lacus quam vel
          justo. Nam finibus gravida turpis, vitae efficitur arcu pharetra eu.
          Ut eget urna ligula. Proin id urna quis diam vehicula commodo eget
          vitae nisi. Ut ut nibh sed justo dignissim pharetra et vel ipsum.
          Mauris tortor tortor, vehicula sed mattis quis, sagittis ac velit.
          Curabitur a posuere metus, at consequat libero. Aliquam laoreet
          scelerisque tellus, at auctor nibh porttitor sed. Vivamus rhoncus
          scelerisque ligula, in tristique orci volutpat vitae. Ut porta dapibus
          nulla, non tristique ante accumsan ac. Suspendisse nec congue lorem.
          Vivamus bibendum accumsan lorem, ac pretium leo blandit vitae.
          Maecenas accumsan commodo nisi ut tincidunt. Etiam sit amet lacus nec
          lorem lobortis fringilla. Aenean tempor commodo finibus.
        </p>
        <p>
          Fusce sit amet faucibus arcu. Ut id sem at ipsum porttitor commodo
          quis ac mi. Pellentesque varius mattis neque, a ornare odio hendrerit
          ut. Curabitur tempus feugiat ex non fringilla. Proin facilisis ac nisi
          eu egestas. Nunc vitae egestas dui. Cras in ligula ut est tristique
          iaculis ac non lectus. Vestibulum ut enim nisi. Suspendisse rutrum,
          enim sit amet faucibus facilisis, ante dolor scelerisque diam, in
          faucibus nisi ante ac magna.
        </p>
        <p>
          Morbi vestibulum dolor nisi, quis cursus enim ornare id. Quisque
          egestas sit amet lectus quis congue. Duis diam velit, dignissim nec
          pharetra et, dignissim ac eros. Nam lacus est, congue vel rutrum sit
          amet, pulvinar at mauris. Donec quis dignissim leo. Aenean condimentum
          eleifend felis, ac pharetra diam vehicula vel. Proin eget pretium
          nunc. Nulla facilisi. Maecenas augue est, ultricies non urna eu,
          ornare accumsan tellus. Nullam faucibus lorem libero, in faucibus ex
          suscipit sed. Maecenas sed luctus est, ut finibus lectus. Etiam nec
          sollicitudin lacus. Mauris dapibus massa vitae placerat porttitor.
          Mauris imperdiet mollis purus. Quisque ac sem risus.
        </p>
        <p>
          Pellentesque feugiat urna sit amet arcu elementum ultricies. Curabitur
          tempor ligula aliquet, suscipit turpis ut, dignissim velit. Nunc lorem
          turpis, rutrum ac lacus eu, tristique viverra magna. Integer est
          turpis, posuere vitae tellus nec, efficitur commodo magna. Vestibulum
          tristique justo quis nulla venenatis, quis posuere neque finibus.
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia curae; Mauris at neque turpis. Interdum et malesuada
          fames ac ante ipsum primis in faucibus. Sed eu facilisis purus,
          rhoncus efficitur dolor. Duis vitae ultricies mauris. Donec quis
          luctus tortor. Cras eu pretium arcu. Cras ut turpis eros. Mauris
          venenatis eros diam.
        </p>
        <modal-test id="modal-1" class-name="px-xs rounded-md" color="light-1">
          <template #header="{ close }">
            <div class="flex justify-between py-xs bg-light-1 border-b-2">
              <h3 class="h3-md">Modal 1</h3>
              <button @click="close">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 384 512"
                  class="fill-dark-2 hover:fill-dark-1 focus:fill-dark-1 transition-colors duration-300 ease-linear h-sm"
                >
                  <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                  <path
                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                  />
                </svg>
              </button>
            </div>
          </template>
          <template #body>
            <div class="my-sm">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                fermentum commodo dolor eget aliquet. Donec malesuada lorem
                dictum, varius augue ut, congue lacus. Proin ornare nisl cursus
                vehicula bibendum. Maecenas gravida semper erat quis posuere.
                Suspendisse eu interdum orci. Suspendisse pellentesque finibus
                lacus, ac ultrices libero placerat sed. Vestibulum ac purus
                velit. Duis at euismod mi, quis malesuada erat. Sed feugiat
                cursus massa, et posuere tellus sagittis non. Suspendisse
                consectetur ligula eu nunc malesuada bibendum. Maecenas quis leo
                a tellus vulputate imperdiet. Suspendisse suscipit lobortis
                massa, nec tristique quam sagittis sed. Nulla eget accumsan
                orci, laoreet mollis quam. Proin neque velit, suscipit ac tortor
                ut, mattis rhoncus massa. Suspendisse non eros mi. Sed ut urna
                sed ex finibus consectetur.
              </p>
            </div>
          </template>
          <template #footer="{ close }">
            <div
              class="bg-light-1 border-t-2 flex justify-between items-center py-xs"
            >
              <h4 class="h4-md">Footer Text</h4>
              <button class="btn btn-round btn-warning" @click="close">
                Close
              </button>
            </div>
          </template>
        </modal-test>
        <modal-test id="modal-2" class-name="px-xs rounded-md" color="warning">
          <template #header="{ close }">
            <div class="flex justify-between py-xs bg-light-1 border-b-2">
              <h3 class="h3-md">Modal 2</h3>
              <button @click="close">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 384 512"
                  class="fill-dark-2 hover:fill-dark-1 focus:fill-dark-1 transition-colors duration-300 ease-linear h-sm"
                >
                  <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                  <path
                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                  />
                </svg>
              </button>
            </div>
          </template>
          <template #body>
            <div class="my-sm">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                fermentum commodo dolor eget aliquet. Donec malesuada lorem
                dictum, varius augue ut, congue lacus. Proin ornare nisl cursus
                vehicula bibendum. Maecenas gravida semper erat quis posuere.
                Suspendisse eu interdum orci. Suspendisse pellentesque finibus
                lacus, ac ultrices libero placerat sed. Vestibulum ac purus
                velit. Duis at euismod mi, quis malesuada erat. Sed feugiat
                cursus massa, et posuere tellus sagittis non. Suspendisse
                consectetur ligula eu nunc malesuada bibendum. Maecenas quis leo
                a tellus vulputate imperdiet. Suspendisse suscipit lobortis
                massa, nec tristique quam sagittis sed. Nulla eget accumsan
                orci, laoreet mollis quam. Proin neque velit, suscipit ac tortor
                ut, mattis rhoncus massa. Suspendisse non eros mi. Sed ut urna
                sed ex finibus consectetur.
              </p>
            </div>
          </template>
          <template #footer="{ close }">
            <div
              class="bg-light-1 border-t-2 flex justify-between items-center py-xs"
            >
              <h4 class="h4-md">Footer Text</h4>
              <button class="btn btn-round btn-warning" @click="close">
                Close
              </button>
            </div>
          </template>
        </modal-test>
      </div>
    </Variant>
  </Story>
</template>

<style scoped></style>
