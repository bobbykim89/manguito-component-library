import MCLTheme from './theme'
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
 * @Export GenerateRDSClass - extends RDSTheme class
 */

export type ClassType =
  // color class
  | 'BGCOLOR'
  | 'BEFOREBG'
  | 'AFTERBG'
  | 'HVBGCOLOR'
  | 'ACTIVEBG'
  | 'TEXTCOLOR'
  | 'HVTEXTCOLOR'
  | 'DISABLEDTEXTCOLOR'
  | 'SVGFILL'
  | 'RINGCOLOR'
  | 'FOCUSRING'
  | 'ACTIVERING'
  | 'BTNCOLOR'
  | 'LISTCOLOR'
  // header text class
  | 'H1'
  | 'H2'
  | 'H3'
  | 'H4'
  // body text class
  | 'BODYTEXT'
  // font weight class
  | 'FONTWEIGHT'
  // border color class
  | 'BORDER'
  | 'BORDERX'
  | 'BORDERY'
  | 'BORDERT'
  | 'BORDERB'
  | 'BORDERL'
  | 'BORDERR'
  // border width class
  | 'BORDERW'
  | 'BORDERXW'
  | 'BORDERYW'
  | 'BORDERTW'
  | 'BORDERBW'
  | 'BORDERLW'
  | 'BORDERRW'
  // opacity class
  | 'BGOPACITY'
  | 'OPACITY'
  // spacing class
  | 'MARGIN'
  | 'MARGINX'
  | 'MARGINY'
  | 'MARGINT'
  | 'MARGINB'
  | 'MARGINL'
  | 'MARGINR'
  | 'PADDING'
  | 'PADDINGX'
  | 'PADDINGY'
  | 'PADDINGT'
  | 'PADDINGB'
  | 'PADDINGL'
  | 'PADDINGR'
  | 'GAP'
  // text align class
  | 'TEXTALIGN'

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
  generateClassName(): string {
    switch (this.classType) {
      // case: color class
      case 'BGCOLOR':
        return this.getBgColorClass()
      case 'HVBGCOLOR':
        return this.getHoverBgColorClass()
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
      case 'BTNCOLOR':
        return this.getBtnColorClass()
      case 'LISTCOLOR':
        return this.getRingColorClass()
      // case: border color class
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
      // case: border width class
      case 'BORDERW':
      case 'BORDERXW':
      case 'BORDERYW':
      case 'BORDERTW':
      case 'BORDERBW':
      case 'BORDERLW':
      case 'BORDERRW':
      // case: opacity class
      case 'BGOPACITY':
      case 'OPACITY':
      // case: spacing class
      // margins
      case 'MARGIN':
      case 'MARGINX':
      case 'MARGINY':
      case 'MARGINT':
      case 'MARGINB':
      case 'MARGINL':
      case 'MARGINR':
      // paddings
      case 'PADDING':
      case 'PADDINGX':
      case 'PADDINGY':
      case 'PADDINGT':
      case 'PADDINGB':
      case 'PADDINGL':
      case 'PADDINGR':
      // gap
      case 'GAP':
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
  // handle opacity classes
  // handle spacing classes
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
}

export default GenerateMCLClass
