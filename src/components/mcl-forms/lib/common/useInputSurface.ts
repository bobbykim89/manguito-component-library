import { generateClass, type ColorPalette } from '@bobbykim/manguito-theme'
import { computed, type ComputedRef } from 'vue'

export interface InputSurfaceOptions {
  bgColor: ColorPalette
  textColor: ColorPalette
  borderColor: ColorPalette
  showBorder: boolean
  showShadow: boolean
  showHighlight: boolean
  rounded: boolean
}

/**
 * Builds the shared surface classes for the text-like form controls
 * (MclInputText, MclTextArea, MclSelect, MclInputFile).
 *
 * @param options - the component's reactive `props` object. Values are read
 *   inside the computed, so reactivity is tracked without passing refs.
 * @returns a computed space-joined class string, in a fixed order:
 *   background, text, border, focus-visible ring, shadow, rounded.
 */
export const useInputSurface = (
  options: InputSurfaceOptions,
): ComputedRef<string> =>
  computed<string>(() => {
    const {
      bgColor,
      textColor,
      borderColor,
      showBorder,
      showShadow,
      showHighlight,
      rounded,
    } = options
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
    // is only the fallback for when it is switched off.
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
