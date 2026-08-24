import { generateClass, type ColorPalette } from '@bobbykim/manguito-theme'
import { computed, type ComputedRef } from 'vue'

export interface InputSurfaceOptions {
  bgColor: ColorPalette
  textColor: ColorPalette
  borderColor: ColorPalette
  showBorder: boolean
  showShadow: boolean
  /**
   * Optional because MclInputFile has no highlight bar and therefore no such
   * prop. Absent means `false` — no highlight bar, so the focus-visible ring
   * is emitted instead.
   *
   * That ring is only a real focus affordance when the caller puts the surface
   * class on the focusable element itself, as MclInputText and MclTextArea do.
   * MclInputFile applies it to a wrapper `<div>` — the right place for the
   * surface of a composite control, whose file input sits between two buttons —
   * so the ring classes are inert there and its input and buttons keep their
   * native UA focus outlines. MclSelect also wraps, and supplies its own
   * open-state ring on that wrapper instead.
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
 *   background, text, border, focus-visible ring, shadow, rounded.
 */
export const useInputSurface = (
  options: InputSurfaceOptions,
): ComputedRef<string> =>
  computed<string>(() => {
    const { bgColor, textColor, borderColor, showBorder, showShadow, rounded } =
      options
    // Defaults live here rather than in the type so callers without the prop
    // (MclInputFile has no highlight bar) can pass their props proxy as-is.
    const showHighlight = options.showHighlight ?? false
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
    // The animated highlight bar is the focus affordance when enabled; the ring
    // is only the fallback for when it is switched off — and only for callers
    // that put this class on the focusable element. See `showHighlight`.
    if (!showHighlight) {
      classArray.push(
        'focus-visible:ring-4 ring-offset-2 transition-all duration-300 ease-linear',
        generateClass.focusVisibleRingColorVariant({ color: borderColor }),
      )
    }
    if (showShadow) {
      classArray.push('shadow-md')
    }
    if (rounded) {
      classArray.push('rounded-md')
    }
    return classArray.join(' ')
  })
