import MCLTheme from './theme'
import type {
  ColorPalette,
  HeadingSize,
  BodyText,
  FontWeight,
  Range,
  OpacityRange,
  SpacingLevel,
} from './theme.types'

/**
 * @TailwindCSS - Good practice is to let all of used classes to be in full instead of generated dynamically using methods such as string literal.
 * @Interface - ClassType to define the case, and Input type to generate tailwind clssname.
 * @Export GenerateRDSClass - extends RDSTheme class
 */

export type ClassType =
  | 'BGCOLOR'
  | 'BEFOREBG'
  | 'AFTERBG'
  | 'TEXTCOLOR'
  | 'DISABLEDTEXTCOLOR'
  | 'SVGFILL'
  | 'RINGCOLOR'
  | 'FOCUSRING'
  | 'ACTIVERING'
  | 'ACTIVEBG'
  | 'H1'
  | 'H2'
  | 'H3'
  | 'H4'
  | 'BODYTEXT'
  | 'FONTWEIGHT'
  | 'BORDER'
  | 'BORDERX'
  | 'BORDERY'
  | 'BORDERT'
  | 'BORDERL'
  | 'BORDERB'
  | 'BORDERTW'
  | 'BORDERLW'
  | 'HVBGCOLOR'
  | 'HVTEXTCOLOR'
  | 'BGOPACITY'
  | 'OPACITY'
  | 'MARGINB'
  | 'GAP'

export type InputType =
  | ColorPalette
  | HeadingSize
  | BodyText
  | FontWeight
  | Range<12>
  | OpacityRange
  | SpacingLevel

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
      case 'BGCOLOR':
      case 'BEFOREBG':
      case 'AFTERBG':
      case 'TEXTCOLOR':
      case 'DISABLEDTEXTCOLOR':
      case 'SVGFILL':
      case 'RINGCOLOR':
      case 'FOCUSRING':
      case 'ACTIVERING':
      case 'ACTIVEBG':
        return this.getColorClass()
      case 'HVBGCOLOR':
      case 'HVTEXTCOLOR':
        return this.getHoverColorClass()
      case 'H1':
      case 'H2':
      case 'H3':
      case 'H4':
        return this.getHeadingTextSizeClass()
      case 'BODYTEXT':
        return this.getBodyTextSizeClass()
      case 'FONTWEIGHT':
        return this.getFontWeightClass()
      case 'BORDER':
      case 'BORDERX':
      case 'BORDERY':
      case 'BORDERT':
      case 'BORDERB':
      case 'BORDERL':
        return this.getBorderColorClass()
      case 'BORDERTW':
      case 'BORDERLW':
        return this.getBorderWidthClass()
      case 'BGOPACITY':
        return this.getBgOpacityClass()
      case 'OPACITY':
        return this.getOpacityClass()
      case 'MARGINB':
      case 'GAP':
        return this.getSpacingClass()
      default:
        return
    }
  }
  getColorClass(): string {
    const {
      bgColor,
      beforeBgColor,
      afterBgColor,
      textColor,
      disabledTextColor,
      svgFillColor,
      ringColor,
      ringFocusColor,
      ringActiveColor,
      bgActiveColor,
    } = MCLTheme
    if (this.classType === 'BGCOLOR') {
      return bgColor[this.classValue]
    }
    if (this.classType === 'BEFOREBG') {
      return beforeBgColor[this.classValue]
    }
    if (this.classType === 'AFTERBG') {
      return afterBgColor[this.classValue]
    }
    if (this.classType === 'TEXTCOLOR') {
      return textColor[this.classValue]
    }
    if (this.classType === 'DISABLEDTEXTCOLOR') {
      return disabledTextColor[this.classValue]
    }
    if (this.classType === 'SVGFILL') {
      return svgFillColor[this.classValue]
    }
    if (this.classType === 'FOCUSRING') {
      return ringFocusColor[this.classValue]
    }
    if (this.classType === 'ACTIVERING') {
      return ringActiveColor[this.classValue]
    }
    if (this.classType === 'ACTIVEBG') {
      return bgActiveColor[this.classValue]
    }
    return ringColor[this.classValue]
  }
  getHoverColorClass(): string {
    const { hoverBgColor, hoverTextColor } = MCLTheme
    if (this.classType === 'HVBGCOLOR') {
      return hoverBgColor[this.classValue]
    }
    return hoverTextColor[this.classValue]
  }
  getHeadingTextSizeClass(): string {
    const { heading1, heading2, heading3, heading4 } = MCLTheme
    if (this.classType === 'H1') {
      return heading1[this.classValue]
    }
    if (this.classType === 'H2') {
      return heading2[this.classValue]
    }
    if (this.classType === 'H3') {
      return heading3[this.classValue]
    }
    return heading4[this.classValue]
  }
  getBodyTextSizeClass(): string {
    const { bodyText } = MCLTheme
    return bodyText[this.classValue]
  }
  getFontWeightClass(): string {
    const { fontweight } = MCLTheme
    return fontweight[this.classValue]
  }
  getBorderColorClass(): string {
    const {
      borderColor,
      borderXColor,
      borderYColor,
      borderTopColor,
      borderBottomColor,
      borderLeftColor,
    } = MCLTheme
    if (this.classType === 'BORDERX') {
      return borderXColor[this.classValue]
    }
    if (this.classType === 'BORDERY') {
      return borderYColor[this.classValue]
    }
    if (this.classType === 'BORDERT') {
      return borderTopColor[this.classValue]
    }
    if (this.classType === 'BORDERB') {
      return borderBottomColor[this.classValue]
    }
    if (this.classType === 'BORDERL') {
      return borderLeftColor[this.classValue]
    }
    return borderColor[this.classValue]
  }
  getBorderWidthClass(): string {
    const { borderTopWidth, borderLeftWidth } = MCLTheme
    if (this.classType === 'BORDERTW') {
      return borderTopWidth[this.classValue]
    }
    return borderLeftWidth[this.classValue]
  }
  getBgOpacityClass(): string {
    const { backgroundOpacity } = MCLTheme
    return backgroundOpacity[this.classValue]
  }
  getOpacityClass(): string {
    const { opacity } = MCLTheme
    return opacity[this.classValue]
  }
  getSpacingClass(): string {
    const { marginBottom, gap } = MCLTheme
    if (this.classType === 'MARGINB') {
      return marginBottom[this.classValue]
    }
    return gap[this.classValue]
  }
}

export default GenerateMCLClass
