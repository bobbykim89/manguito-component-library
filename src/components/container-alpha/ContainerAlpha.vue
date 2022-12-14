<script setup lang="ts">
import { withDefaults } from 'vue'
import type {
  ColorPalette,
  Position,
  ColumnWidth,
} from '@bobbykim/manguito-theme/theme/theme.types'
import generateClass from '@bobbykim/manguito-theme'

type PositionY = 'top' | 'bottom'

const props = withDefaults(
  defineProps<{
    sectionBg?: ColorPalette
    containerBg?: ColorPalette
    topDirection?: Position
    bottomDirection?: Position
    displayRightColumn?: boolean
    leftColumnWidth?: ColumnWidth
  }>(),
  {
    sectionBg: 'light-1',
    containerBg: 'primary',
    topDirection: 'left',
    bottomDirection: 'left',
    displayRightColumn: true,
    leftColumnWidth: 50,
  }
)
const generatePoints = (location: PositionY, direction: Position): string => {
  /**
   * @location - 'top'||'bottom'
   * @direction - topDirection || bottomDirection
   */
  if (location === 'top') {
    return direction === 'left' ? '0,0 100,100 0,100' : '100,0 100,100 0,100'
  }
  if (location === 'bottom') {
    return direction === 'left' ? '0,0 100,0 0,100' : '0,0 100,0 100,100'
  }
}
const getLeftColumnWidth = (
  dRightCol: boolean,
  lColWidth: ColumnWidth
): string => {
  /**
   * @drightCol - displayRightColumn
   * @lColWidth - leftColumnWidth
   */
  if (!dRightCol) {
    return 'md:col-span-4'
  }
  if (dRightCol) {
    switch (lColWidth) {
      case 25:
        return 'md:col-span-1'
      case 50:
        return 'md:col-span-2'
      case 75:
        return 'md:col-span-3'
      case 100:
        return 'md:col-span-4'
      default:
        return
    }
  }
}
const getRightColumnWIdth = (
  dRightCol: boolean,
  lColWidth: ColumnWidth
): string => {
  if (!dRightCol) {
    return
  }
  if (dRightCol) {
    switch (lColWidth) {
      case 25:
        return 'md:col-span-3'
      case 50:
        return 'md:col-span-2'
      case 75:
        return 'md:col-span-1'
      case 100:
      default:
        return
    }
  }
}
</script>

<template>
  <section class="py-lg lg:py-xl" :class="generateClass('BGCOLOR', sectionBg)">
    <div class="relative min-h-[36px] md:min-h-[48px] lg:min-h-[60px]">
      <svg
        class="block absolute left-0 inset-x-0 h-full w-full"
        :class="generateClass('SVGFILL', containerBg)"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon :points="generatePoints('top', topDirection)" />
      </svg>
    </div>
    <div
      class="py-md md:py-lg lg:py-xl px-sm md:px-md lg:px-lg"
      :class="generateClass('BGCOLOR', containerBg)"
    >
      <div class="container grid md:grid-cols-4 gap-4">
        <div :class="getLeftColumnWidth(displayRightColumn, leftColumnWidth)">
          <slot name="left-column"></slot>
        </div>
        <div
          v-if="displayRightColumn && leftColumnWidth !== 100"
          :class="getRightColumnWIdth(displayRightColumn, leftColumnWidth)"
        >
          <slot name="right-column"></slot>
        </div>
      </div>
    </div>
    <div class="relative min-h-[36px] md:min-h-[48px] lg:min-h-[60px]">
      <svg
        class="block absolute left-0 inset-x-0 h-full w-full"
        :class="generateClass('SVGFILL', containerBg)"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon :points="generatePoints('bottom', bottomDirection)" />
      </svg>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
