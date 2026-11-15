import { generateClass, type ColorPalette } from '@bobbykim/manguito-theme'
import { computed, type ComputedRef } from 'vue'

export interface InputSurfaceOptions {
  bgColor: ColorPalette
  textColor: ColorPalette
  borderColor: ColorPalette
  showBorder: boolean
  showShadow: boolean
  /**
   * Whether the caller draws the animated highlight bar. Optional because
   * MclInputFile has no bar and therefore no such prop. Since #122 it no longer
   * affects these classes: the bar is decoration, and the shared keyboard
   * focus ring (`mcl-focus-ring`) is always emitted.
   *
   * That ring is only a real focus affordance when the caller puts the surface
   * class on the focusable element itself, as MclInputText and MclTextArea do.
   * MclInputFile applies it to a wrapper `<div>` — the right place for the
   * surface of a composite control, whose file input sits between two buttons —
   * so the ring class is inert there and its input and buttons keep their
   * native UA focus outlines. MclSelect also wraps, and rings that wrapper
   * itself when its text input has keyboard focus.
   */
  showHighlight?: boolean
  rounded: boolean
}

/**
 * Builds the shared surface classes for the text-like form controls
 * (MclInputText, MclTextArea, MclSelect, MclInputFile).
 *
 * @param options - the component's reactive `props` object. Values are read
 *   inside the computed, so reactivity is tracked without passing refs. Pass
 *   your `props` proxy directly; a spread literal (`{ ...props }`) snapshots
 *   every value at setup and freezes the classes at their mount-time values.
 * @returns a computed space-joined class string, in a fixed order:
 *   background, text, border, focus ring, shadow, rounded.
 */
export const useInputSurface = (
  options: InputSurfaceOptions,
): ComputedRef<string> =>
  computed<string>(() => {
    const { bgColor, textColor, borderColor, showBorder, showShadow, rounded } =
      options
    const classArray: string[] = [
      generateClass.bgColorVariant({ color: bgColor }),
      generateClass.textColorVariant({ color: textColor }),
    ]
    if (showBorder) {
      classArray.push(
        'border-2',
        generateClass.borderColorVariant({ color: borderColor }),
      )
    }
    // The shared two-tone keyboard focus ring (#122), whatever the highlight
    // bar does. Only effective on the focusable element; see `showHighlight`.
    classArray.push('focus-visible:mcl-focus-ring')
    if (showShadow) {
      classArray.push('shadow-md')
    }
    if (rounded) {
      classArray.push('rounded-md')
    }
    return classArray.join(' ')
  })
