import type { DirectiveBinding } from 'vue'
import type { ColorPalette } from '..'

// Defines the properties that can be passed via the directive value object
export interface TooltipValueObjectType {
  title?: string
  color?: ColorPalette
  textColor?: ColorPalette
  width?: number | string
  className?: string
}

// Defines the valid types for the directive value
export type TooltipValueType = TooltipValueObjectType | string

// Extends HTMLElement to include the custom functions attached by the directive
export interface TooltipElementType extends HTMLElement {
  __HandleTooltip: (binding: DirectiveBinding<TooltipValueType>) => void
  __UnmountTooltip: () => void
}
