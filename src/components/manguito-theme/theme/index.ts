import MCLTheme from './theme.js'
import type {
  ColorPalette,
  HeadingSize,
  BodyText,
  FontWeight,
  Range,
  OpacityRange,
  SpacingLevel,
  Position,
} from './theme.types'

/**
 * @TailwindCSS - Good practice is to let all of used classes to be in full instead of generated dynamically using methods such as string literal.
 * @Interface - ClassType to define the case, and Input type to generate tailwind clssname.
 * @Export GenerateMCLClass - extends MCLTheme class
 */

export const colorType = [
  'BGCOLOR',
  'BEFOREBG',
  'AFTERBG',
  'HVBGCOLOR',
  'FCBGCOLOR',
  'ACTIVEBG',
  'TEXTCOLOR',
  'HVTEXTCOLOR',
  'DISABLEDTEXTCOLOR',
  'SVGFILL',
  'RINGCOLOR',
  'FOCUSRING',
  'ACTIVERING',
  'OFFSETRING',
  'DUMMYCOLOR',
  'BTNCOLOR',
  'LISTCOLOR',
  'BORDER',
  'BORDERX',
  'BORDERY',
  'BORDERT',
  'BORDERB',
  'BORDERL',
  'BORDERR',
] as const

export const textType = [
  'H1',
  'H2',
  'H3',
  'H4',
  'BODYTEXT',
  'FONTWEIGHT',
  'TEXTALIGN',
] as const
export const borderWidthType = [
  'BORDERW',
  'BORDERXW',
  'BORDERYW',
  'BORDERTW',
  'BORDERBW',
  'BORDERLW',
  'BORDERRW',
] as const
export const scaleType = ['BGOPACITY', 'OPACITY'] as const
export const spacingType = [
  'MARGIN',
  'MARGINX',
  'MARGINY',
  'MARGINT',
  'MARGINB',
  'MARGINL',
  'MARGINR',
  'PADDING',
  'PADDINGX',
  'PADDINGY',
  'PADDINGT',
  'PADDINGB',
  'PADDINGL',
  'PADDINGR',
  'GAP',
] as const
const allType = [
  ...colorType,
  ...textType,
  ...borderWidthType,
  ...scaleType,
  ...spacingType,
] as const

export type ClassType = (typeof allType)[number]
export type ColorClassType = (typeof colorType)[number]
export type TextClassType = (typeof textType)[number]
export type BorderWidthClassType = (typeof borderWidthType)[number]
export type ScaleClassType = (typeof scaleType)[number]
export type SpacingClassType = (typeof spacingType)[number]

export type InputType =
  | ColorPalette
  | HeadingSize
  | BodyText
  | FontWeight
  | Range<1, 12>
  | OpacityRange
  | SpacingLevel
  | Position

class GenerateMCLClass extends MCLTheme {
  classType: ClassType
  classValue: InputType

  constructor(classType: ClassType, classValue: InputType) {
    super()
    this.classType = classType
    this.classValue = classValue
  }
  // handle color classes types
  generateColorClass(): string {
    switch (this.classType) {
      case 'BGCOLOR':
        return this.getBgColorClass()
      case 'HVBGCOLOR':
        return this.getHoverBgColorClass()
      case 'FCBGCOLOR':
        return this.getFocusBgColorClass()
      case 'BEFOREBG':
        return this.getBeforeBgColorClass()
      case 'AFTERBG':
        return this.getAfterBgColorClass()
      case 'ACTIVEBG':
        return this.getActiveBgColorClass()
      case 'TEXTCOLOR':
        return this.getTextColorClass()
      case 'HVTEXTCOLOR':
        return this.getHoverTextColorClass()
      case 'DISABLEDTEXTCOLOR':
        return this.getDisabledTextColorClass()
      case 'SVGFILL':
        return this.getSvgFillColorClass()
      case 'RINGCOLOR':
        return this.getRingColorClass()
      case 'FOCUSRING':
        return this.getFocusRingColorClass()
      case 'ACTIVERING':
        return this.getActiveRingColorClass()
      case 'OFFSETRING':
        return this.getRingOffsetColorClass()
      case 'BTNCOLOR':
        return this.getBtnColorClass()
      case 'LISTCOLOR':
        return this.getRingColorClass()
      case 'BORDER':
        return this.getBorderColorClass()
      case 'BORDERX':
        return this.getBorderXColorClass()
      case 'BORDERY':
        return this.getBorderYColorClass()
      case 'BORDERT':
        return this.getBorderTopColorClass()
      case 'BORDERB':
        return this.getBorderBottomColorClass()
      case 'BORDERL':
        return this.getBorderLeftColorClass()
      case 'BORDERR':
        return this.getBorderRightColorClass()
      default:
        return ' '
    }
  }
  // handle text class types
  generateTextClass(): string {
    switch (this.classType) {
      // case: heading text class
      case 'H1':
        return this.getH1Class()
      case 'H2':
        return this.getH2Class()
      case 'H3':
        return this.getH3Class()
      case 'H4':
        return this.getH4Class()
      // case: body text class
      case 'BODYTEXT':
        return this.getBodyTextSizeClass()
      // case: font weight class
      case 'FONTWEIGHT':
        return this.getFontWeightClass()
      // case: text alignment class
      case 'TEXTALIGN':
        return this.getTextAlignClass()
      default:
        return ' '
    }
  }
  // handle border width class types
  generateBorderWidthClass(): string {
    switch (this.classType) {
      // case: border width class
      case 'BORDERW':
        return this.getBorderWidthClass()
      case 'BORDERXW':
        return this.getBorderXWidthClass()
      case 'BORDERYW':
        return this.getBorderYWidthClass()
      case 'BORDERTW':
        return this.getBorderTopWidthClass()
      case 'BORDERBW':
        return this.getBorderBottomWidthClass()
      case 'BORDERLW':
        return this.getBorderLeftWidthClass()
      case 'BORDERRW':
        return this.getBorderWidthClass()
      default:
        return ' '
    }
  }
  generateScaleClass(): string {
    switch (this.classType) {
      // case: opacity class
      case 'OPACITY':
        return this.getOpacityClass()
      case 'BGOPACITY':
        return this.getBgOpacityClass()
      default:
        return ' '
    }
  }
  generateSpacingClass(): string {
    switch (this.classType) {
      // case: margins
      case 'MARGIN':
        return this.getMarginClass()
      case 'MARGINX':
        return this.getMarginXClass()
      case 'MARGINY':
        return this.getMarginYClass()
      case 'MARGINT':
        return this.getMarginTopClass()
      case 'MARGINB':
        return this.getMarginBottomClass()
      case 'MARGINL':
        return this.getMarginLeftClass()
      case 'MARGINR':
        return this.getMarginRightClass()
      // case: paddings
      case 'PADDING':
        return this.getPaddingClass()
      case 'PADDINGX':
        return this.getPaddingXClass()
      case 'PADDINGY':
        return this.getPaddingYClass()
      case 'PADDINGT':
        return this.getPaddingTopClass()
      case 'PADDINGB':
        return this.getPaddingBottomClass()
      case 'PADDINGL':
        return this.getPaddingLeftClass()
      case 'PADDINGR':
        return this.getPaddingRightClass()
      // case: gap
      case 'GAP':
        return this.getGapClass()
      default:
        return ' '
    }
  }
  // handle color class
  // bg color
  getBgColorClass(): string {
    if (!this.validateColorType) {
      return ' '
    }
    return MCLTheme.bgColor[this.classValue as ColorPalette]
  }
  getHoverBgColorClass(): string {
    if (!this.validateColorType) {
      return ' '
    }
    return MCLTheme.hoverBgColor[this.classValue as ColorPalette]
  }
  getFocusBgColorClass(): string {
    if (!this.validateColorType) {
      return ' '
    }
    return MCLTheme.focusBgColor[this.classValue as ColorPalette]
  }
  getBeforeBgColorClass(): string {
    if (!this.validateColorType) {
      return ' '
    }
    return MCLTheme.beforeBgColor[this.classValue as ColorPalette]
  }
  getAfterBgColorClass(): string {
    if (!this.validateColorType) {
      return ' '
    }
    return MCLTheme.afterBgColor[this.classValue as ColorPalette]
  }
  getActiveBgColorClass(): string {
    if (!this.validateColorType) {
      return ' '
    }
    return MCLTheme.bgActiveColor[this.classValue as ColorPalette]
  }
  // text color
  getTextColorClass(): string {
    if (!this.validateColorType) {
      return ' '
    }
    return MCLTheme.textColor[this.classValue as ColorPalette]
  }
  getHoverTextColorClass(): string {
    if (!this.validateColorType) {
      return ' '
    }
    return MCLTheme.hoverTextColor[this.classValue as ColorPalette]
  }
  getDisabledTextColorClass(): string {
    if (!this.validateColorType) {
      return ' '
    }
    return MCLTheme.disabledTextColor[this.classValue as ColorPalette]
  }
  // svg color
  getSvgFillColorClass(): string {
    if (!this.validateColorType) {
      return ' '
    }
    return MCLTheme.svgFillColor[this.classValue as ColorPalette]
  }
  // ring color
  getRingColorClass(): string {
    if (!this.validateColorType) {
      return ' '
    }
    return MCLTheme.ringColor[this.classValue as ColorPalette]
  }
  getFocusRingColorClass(): string {
    if (!this.validateColorType) {
      return ' '
    }
    return MCLTheme.ringFocusColor[this.classValue as ColorPalette]
  }
  getActiveRingColorClass(): string {
    if (!this.validateColorType) {
      return ' '
    }
    return MCLTheme.ringActiveColor[this.classValue as ColorPalette]
  }
  getRingOffsetColorClass(): string {
    if (!this.validateColorType) {
      return ' '
    }
    return MCLTheme.ringOffsetColor[this.classValue as ColorPalette]
  }
  // btn & list
  getBtnColorClass(): string {
    if (!this.validateColorType) {
      return ' '
    }
    return MCLTheme.btnColor[this.classValue as ColorPalette]
  }
  getListColorClass(): string {
    if (!this.validateColorType) {
      return ' '
    }
    return MCLTheme.listColor[this.classValue as ColorPalette]
  }
  // border color
  getBorderColorClass(): string {
    if (!this.validateColorType) {
      return ' '
    }
    return MCLTheme.borderColor[this.classValue as ColorPalette]
  }
  getBorderXColorClass(): string {
    if (!this.validateColorType) {
      return ' '
    }
    return MCLTheme.borderXColor[this.classValue as ColorPalette]
  }
  getBorderYColorClass(): string {
    if (!this.validateColorType) {
      return ' '
    }
    return MCLTheme.borderYColor[this.classValue as ColorPalette]
  }
  getBorderTopColorClass(): string {
    if (!this.validateColorType) {
      return ' '
    }
    return MCLTheme.borderTopColor[this.classValue as ColorPalette]
  }
  getBorderBottomColorClass(): string {
    if (!this.validateColorType) {
      return ' '
    }
    return MCLTheme.borderBottomColor[this.classValue as ColorPalette]
  }
  getBorderLeftColorClass(): string {
    if (!this.validateColorType) {
      return ' '
    }
    return MCLTheme.borderLeftColor[this.classValue as ColorPalette]
  }
  getBorderRightColorClass(): string {
    if (!this.validateColorType) {
      return ' '
    }
    return MCLTheme.borderRightColor[this.classValue as ColorPalette]
  }
  // handle heading classes
  getH1Class(): string {
    if (!this.validateHeadingTextSizeType) {
      return ' '
    }
    return MCLTheme.heading1[this.classValue as HeadingSize]
  }
  getH2Class(): string {
    if (!this.validateHeadingTextSizeType) {
      return ' '
    }
    return MCLTheme.heading2[this.classValue as HeadingSize]
  }
  getH3Class(): string {
    if (!this.validateHeadingTextSizeType) {
      return ' '
    }
    return MCLTheme.heading3[this.classValue as HeadingSize]
  }
  getH4Class(): string {
    if (!this.validateHeadingTextSizeType) {
      return ' '
    }
    return MCLTheme.heading4[this.classValue as HeadingSize]
  }
  // handle body text size classes
  getBodyTextSizeClass(): string {
    if (!this.validateBodyTextSizeType) {
      return ' '
    }
    return MCLTheme.bodyText[this.classValue as BodyText]
  }
  // handle font weight classes
  getFontWeightClass(): string {
    if (!this.validateFontWeightType) {
      return ' '
    }
    return MCLTheme.fontweight[this.classValue as FontWeight]
  }
  // handle text align classes
  getTextAlignClass(): string {
    return MCLTheme.textAlign[this.classValue as Position]
  }
  // handle border width classes
  getBorderWidthClass(): string {
    if (!this.validateRangeType) {
      return ' '
    }
    return MCLTheme.borderWidth[this.classValue as Range<1, 12>]
  }
  getBorderXWidthClass(): string {
    if (!this.validateRangeType) {
      return ' '
    }
    return MCLTheme.borderXWidth[this.classValue as Range<1, 12>]
  }
  getBorderYWidthClass(): string {
    if (!this.validateRangeType) {
      return ' '
    }
    return MCLTheme.borderYWidth[this.classValue as Range<1, 12>]
  }
  getBorderTopWidthClass(): string {
    if (!this.validateRangeType) {
      return ' '
    }
    return MCLTheme.borderTopWidth[this.classValue as Range<1, 12>]
  }
  getBorderBottomWidthClass(): string {
    if (!this.validateRangeType) {
      return ' '
    }
    return MCLTheme.borderBottomWidth[this.classValue as Range<1, 12>]
  }
  getBorderLeftWidthClass(): string {
    if (!this.validateRangeType) {
      return ' '
    }
    return MCLTheme.borderLeftWidth[this.classValue as Range<1, 12>]
  }
  getBorderRightWidthClass(): string {
    if (!this.validateRangeType) {
      return ' '
    }
    return MCLTheme.borderRightWidth[this.classValue as Range<1, 12>]
  }
  // handle opacity classes
  getOpacityClass(): string {
    if (!this.validateOpacityType) {
      return ' '
    }
    return MCLTheme.opacity[this.classValue as OpacityRange]
  }
  getBgOpacityClass(): string {
    if (!this.validateOpacityType) {
      return ' '
    }
    return MCLTheme.backgroundOpacity[this.classValue as OpacityRange]
  }
  // handle spacing classes
  // margins
  getMarginClass(): string {
    if (!this.validateSpaceType) {
      return ' '
    }
    return MCLTheme.margin[this.classValue as SpacingLevel]
  }
  getMarginXClass(): string {
    if (!this.validateSpaceType) {
      return ' '
    }
    return MCLTheme.marginX[this.classValue as SpacingLevel]
  }
  getMarginYClass(): string {
    if (!this.validateSpaceType) {
      return ' '
    }
    return MCLTheme.marginY[this.classValue as SpacingLevel]
  }
  getMarginTopClass(): string {
    if (!this.validateSpaceType) {
      return ' '
    }
    return MCLTheme.marginTop[this.classValue as SpacingLevel]
  }
  getMarginBottomClass(): string {
    if (!this.validateSpaceType) {
      return ' '
    }
    return MCLTheme.marginBottom[this.classValue as SpacingLevel]
  }
  getMarginLeftClass(): string {
    if (!this.validateSpaceType) {
      return ' '
    }
    return MCLTheme.marginLeft[this.classValue as SpacingLevel]
  }
  getMarginRightClass(): string {
    if (!this.validateSpaceType) {
      return ' '
    }
    return MCLTheme.marginRight[this.classValue as SpacingLevel]
  }
  // padding
  getPaddingClass(): string {
    if (!this.validateSpaceType) {
      return ' '
    }
    return MCLTheme.padding[this.classValue as SpacingLevel]
  }
  getPaddingXClass(): string {
    if (!this.validateSpaceType) {
      return ' '
    }
    return MCLTheme.paddingX[this.classValue as SpacingLevel]
  }
  getPaddingYClass(): string {
    if (!this.validateSpaceType) {
      return ' '
    }
    return MCLTheme.paddingY[this.classValue as SpacingLevel]
  }
  getPaddingTopClass(): string {
    if (!this.validateSpaceType) {
      return ' '
    }
    return MCLTheme.paddingTop[this.classValue as SpacingLevel]
  }
  getPaddingBottomClass(): string {
    if (!this.validateSpaceType) {
      return ' '
    }
    return MCLTheme.paddingBottom[this.classValue as SpacingLevel]
  }
  getPaddingLeftClass(): string {
    if (!this.validateSpaceType) {
      return ' '
    }
    return MCLTheme.paddingLeft[this.classValue as SpacingLevel]
  }
  getPaddingRightClass(): string {
    if (!this.validateSpaceType) {
      return ' '
    }
    return MCLTheme.paddingRight[this.classValue as SpacingLevel]
  }
  // gap
  getGapClass(): string {
    if (!this.validateSpaceType) {
      return ' '
    }
    return MCLTheme.gap[this.classValue as SpacingLevel]
  }
  // input validation
  validateColorType(): boolean {
    const validatorRe =
      /(primary|secondary|success|info|warning|danger|light-1|light-2|light-3|light-4|dark-1|dark-2|dark-3|dark-4|black|white|transparent)/
    if (typeof this.classValue !== 'string') {
      return false
    }
    return validatorRe.test(this.classValue)
  }
  validateSpaceType(): boolean {
    const validatorRe = /(0|3xs|2xs|xs|sm|md|lg|xl|2xl|3xl)/
    if (typeof this.classValue !== 'string') {
      return false
    }
    return validatorRe.test(this.classValue)
  }
  validateHeadingTextSizeType(): boolean {
    const validatorRe = /(sm|md|lg|xl)/
    if (typeof this.classValue !== 'string') {
      return false
    }
    return validatorRe.test(this.classValue)
  }
  validateBodyTextSizeType(): boolean {
    const validatorRe = /(xs|sm|md|lg|xl)/
    if (typeof this.classValue !== 'string') {
      return false
    }
    return validatorRe.test(this.classValue)
  }
  validateFontWeightType(): boolean {
    const validatorRe = /(light|normal|bold)/
    if (typeof this.classValue !== 'string') {
      return false
    }
    return validatorRe.test(this.classValue)
  }
  validateOpacityType(): boolean {
    const validatorRe = /\b(0|[1-9]0|100)\b/
    if (typeof this.classValue !== 'number') {
      return false
    }
    return validatorRe.test(this.classValue.toString())
  }
  validateRangeType(): boolean {
    const validatorRe = /\b([1-9]|1[0-2])\b/
    if (typeof this.classValue !== 'number') {
      return false
    }
    return validatorRe.test(this.classValue.toString())
  }
  validateAlignment(): boolean {
    const validatorRe = /(left|center|right)/
    if (typeof this.classValue !== 'string') {
      return false
    }
    return validatorRe.test(this.classValue)
  }
  dummyMethod(): any {
    return this.getRingOffsetColorClass()
  }
}

export default GenerateMCLClass
