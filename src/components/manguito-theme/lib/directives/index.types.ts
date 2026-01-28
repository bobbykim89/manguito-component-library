import type { DirectiveBinding } from 'vue'
import type { ColorPalette } from '../theme/static/theme.types'

// click outside
/**
 * Type for the click outside handler function
 */
export type ClickOutsideHandler = (event: MouseEvent | TouchEvent) => void

/**
 * Extends HTMLElement to include the custom handler attached by the directive
 */
export interface ClickOutsideElement extends HTMLElement {
  __ClickOutsideHandler?: (event: MouseEvent | TouchEvent) => void
}

/**
 * Configuration options for click outside directive
 */
export interface ClickOutsideOptions {
  handler: ClickOutsideHandler
  events?: ('click' | 'mousedown' | 'touchstart')[]
  excludeElements?: HTMLElement[]
}

/**
 * Type for the directive value - can be a function or options object
 */
export type ClickOutsideValue = ClickOutsideHandler | ClickOutsideOptions

// toggle
/**
 * Extends HTMLElement to include the custom handler attached by the directive
 */
export interface ToggleElement extends HTMLElement {
  __ClickToggleHandler?: (event: Event) => void
}

// collapse
/**
 * Extends HTMLElement to include the custom handler attached by the directive
 */
export interface CollapseElement extends HTMLElement {
  __HandleToggler?: (event: Event) => void
}

// tooltip
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
