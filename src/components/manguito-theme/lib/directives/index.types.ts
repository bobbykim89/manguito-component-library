import type { ColorPalette } from '../../index.js'

export interface TooltipElementType extends HTMLElement {
  __HandleTooltip: Function
  __UnmountTooltip: Function
}

interface TooltipValueObjectType {
  title?: string
  color?: ColorPalette
  textColor?: ColorPalette
  width?: number | string
  className?: string
}
export type TooltipValueType = TooltipValueObjectType | string
