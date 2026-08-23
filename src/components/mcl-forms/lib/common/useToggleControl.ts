import { generateClass, type ColorPalette } from '@bobbykim/manguito-theme'
import { computed, type ComputedRef } from 'vue'
import type { InputSizeType } from './index.types'

export interface ToggleControlOptions {
  size: InputSizeType
  bgColor: ColorPalette
  checkedBgColor: ColorPalette
  indicatorColor: ColorPalette
  borderColor: ColorPalette
  showShadow: boolean
  /**
   * Optional because MclInputRadio deliberately has no `rounded` prop — shape
   * is how users tell a radio from a checkbox, so it stays circular. Absent
   * means `false`.
   */
  rounded?: boolean
}

export interface ToggleControl {
  boxClass: ComputedRef<string>
  sizeClass: ComputedRef<string>
  switchVars: ComputedRef<Record<string, string>>
}

// Box and indicator dimensions per size. The indicator is half the box at every
// size: sm 16px->8px, md 24px->12px, lg 32px->16px. The token scale jumps from
// 2xs (8px) straight to xs (16px), so md's 12px has no token and stays an
// arbitrary value. 3xs is 4px, not 12px.
const SIZE_CLASSES: Record<InputSizeType, string> = {
  sm: 'h-xs w-xs before:h-2xs before:w-2xs',
  md: 'h-sm w-sm before:h-[12px] before:w-[12px]',
  lg: 'h-md w-md before:h-xs before:w-xs',
}

// MclInputSwitch is driven by CSS custom properties rather than utilities,
// because the knob translation distance has to match the track dimensions.
const SWITCH_VARS: Record<InputSizeType, Record<string, string>> = {
  sm: {
    '--switch-width': '30px',
    '--switch-height': '17px',
    '--slider-size': '13px',
    '--gutter-size': '2px',
  },
  md: {
    '--switch-width': '45px',
    '--switch-height': '25.5px',
    '--slider-size': '19.5px',
    '--gutter-size': '3px',
  },
  lg: {
    '--switch-width': '60px',
    '--switch-height': '34px',
    '--slider-size': '26px',
    '--gutter-size': '4px',
  },
}

/**
 * Builds the shared visual classes for the three toggle controls
 * (MclCheckbox, MclInputRadio, MclInputSwitch), whose native input is
 * overlaid at opacity-0 and whose visible box is an aria-hidden span
 * styled entirely through peer-* variants.
 *
 * @param options - the component's reactive `props` object. Pass your `props`
 *   proxy directly; a spread literal (`{ ...props }`) snapshots every value at
 *   setup and freezes the classes at their mount-time values.
 * @returns `boxClass` for the visual span, `sizeClass` for its dimensions,
 *   and `switchVars` for MclInputSwitch's CSS custom properties.
 */
export const useToggleControl = (
  options: ToggleControlOptions,
): ToggleControl => {
  const boxClass = computed<string>(() => {
    const { bgColor, borderColor, indicatorColor, checkedBgColor, showShadow } =
      options
    // Defaults live here rather than in the type so callers without the prop
    // (MclInputRadio has no `rounded`) can pass their props proxy as-is.
    const rounded = options.rounded ?? false
    const classArray: string[] = [
      generateClass.bgColorVariant({ color: bgColor }),
      generateClass.borderColorVariant({ color: borderColor }),
      generateClass.beforeBgColorVariant({ color: indicatorColor }),
      generateClass.peerCheckedBgColorVariant({ color: checkedBgColor }),
      // The native input is visually transparent, so the focus indicator has to
      // be projected onto this span. Without it there is none at all.
      'peer-focus-visible:ring-2 ring-offset-2',
      generateClass.peerFocusVisibleRingColorVariant({ color: borderColor }),
    ]
    if (showShadow) {
      classArray.push('drop-shadow-md')
    }
    if (rounded) {
      classArray.push('rounded-md before:rounded-[3px]')
    }
    return classArray.join(' ')
  })

  const sizeClass = computed<string>(() => SIZE_CLASSES[options.size])

  // Copied, not returned by reference: SWITCH_VARS is module-level shared
  // state, and handing it out lets one component's style binding mutate the
  // table every other component reads from.
  const switchVars = computed<Record<string, string>>(() => ({
    ...SWITCH_VARS[options.size],
  }))

  return { boxClass, sizeClass, switchVars }
}
