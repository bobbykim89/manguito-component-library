import MCLTheme from './theme'
import type {
  ColorPalette,
  HeadingSize,
  BodyText,
  FontWeight,
  Range,
} from './theme.types'

/**
 * @TailwindCSS - Good practice is to let all of used classes to be in full instead of generated dynamically using methods such as string literal.
 * @Interface - ClassType to define the case, and Input type to generate tailwind clssname.
 * @Export GenerateRDSClass - extends RDSTheme class
 */

export type ClassType =
  | 'BGCOLOR'
  | 'TEXTCOLOR'
  | 'SVGFILL'
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

export type InputType =
  | ColorPalette
  | HeadingSize
  | BodyText
  | FontWeight
  | Range<12>

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
      case 'TEXTCOLOR':
      case 'SVGFILL':
        return this.getColorClass()
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
      default:
        return
    }
  }
  getColorClass(): string {
    const { bgColor, textColor, svgFillColor } = MCLTheme
    if (this.classType === 'BGCOLOR') {
      return bgColor[this.classValue]
    }
    if ((this.classType = 'TEXTCOLOR')) {
      return textColor[this.classValue]
    }
    return svgFillColor[this.classValue]
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
}

export default GenerateMCLClass
