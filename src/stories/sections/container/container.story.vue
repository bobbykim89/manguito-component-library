<script setup lang="ts">
import { reactive } from 'vue'
import ContainerAlpha from '@/components/container-alpha'
import AccordionBeta from '@/components/accordion-beta'
import BtnAlpha from '@/components/btn-alpha'
import type {
  ColorPalette,
  Position,
  ColumnWidth,
} from '@/components/manguito-theme/theme/theme.types'
import { colors, directionsX, columnWidth } from '@/assets/options'

const stateAlpha = reactive<{
  sectionBg?: ColorPalette
  containerBg?: ColorPalette
  topDirection?: Position
  bottomDirection?: Position
  displayRightColumn?: boolean
  leftColumnWidth?: ColumnWidth
  slotText?: string
}>({
  sectionBg: 'light-1',
  containerBg: 'primary',
  topDirection: 'left',
  bottomDirection: 'left',
  displayRightColumn: true,
  leftColumnWidth: 50,
  slotText:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga quo incidunt a blanditiis mollitia ea est? Fugit voluptate expedita magni vitae iste. Nulla aperiam voluptate ullam dolor officiis earum quis aliquam at ducimus porro.',
})

const handleButtonClick = (): void => {
  window.open('https://manguitopage.herokuapp.com/', '_blank')
}
</script>

<template>
  <Story title="Container" group="section-comp">
    <Variant title="container-alpha">
      <container-alpha
        :section-bg="stateAlpha.sectionBg"
        :container-bg="stateAlpha.containerBg"
        :top-direction="stateAlpha.topDirection"
        :bottom-direction="stateAlpha.bottomDirection"
        :display-right-column="stateAlpha.displayRightColumn"
        :left-column-width="stateAlpha.leftColumnWidth"
      >
        <template #left-column>
          <div class="md:p-2xs">
            <img
              class="aspect-square object-cover object-top rounded-md drop-shadow-lg"
              src="https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1666385584/ManguitoPage/tveqbper01iikyrfvgie.jpg"
              alt="manguito sitting on the top of fridge"
            />
          </div>
        </template>
        <template #right-column>
          <div class="h-full flex items-center">
            <div
              class="md:m-2xs bg-light-3 p-xs md:p-sm rounded-md aspect-square"
            >
              <h2 class="h2-md mb-sm">Container Alpha</h2>
              <div v-html="stateAlpha.slotText" class="mb-xs"></div>
              <accordion-beta title="Love Manguito?" btn-color="success">
                <div>
                  <p class="mb-xs">
                    You are always welcomed to Manguito page if you love this
                    pretty little birb! 🦜
                  </p>
                  <div class="flex justify-end">
                    <btn-alpha color="success" @btn-click="handleButtonClick"
                      >Let's go!</btn-alpha
                    >
                  </div>
                </div>
              </accordion-beta>
            </div>
          </div>
        </template>
      </container-alpha>
      <template #controls>
        <HstSelect
          title="section-bg"
          v-model="stateAlpha.sectionBg"
          :options="colors"
        />
        <HstSelect
          title="container-bg"
          v-model="stateAlpha.containerBg"
          :options="colors"
        />
        <HstSelect
          title="top-direction"
          v-model="stateAlpha.topDirection"
          :options="directionsX"
        />
        <HstSelect
          title="bottom-direction"
          v-model="stateAlpha.bottomDirection"
          :options="directionsX"
        />
        <HstCheckbox
          title="display-right-column"
          v-model="stateAlpha.displayRightColumn"
        />
        <HstSelect
          title="left-column-width"
          v-model="stateAlpha.leftColumnWidth"
          :options="columnWidth"
        />
        <HstTextarea v-model="stateAlpha.slotText" title="Slot Text" />
      </template>
    </Variant>
  </Story>
</template>

<style lang="scss" scoped></style>
