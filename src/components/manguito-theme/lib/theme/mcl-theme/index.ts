import {
  MclColor,
  MclHeadingSize,
  MclOpacityClass,
  MclSpacingClass,
  MclText,
  MclBorderWidthClass,
} from '../static'
import type {
  Alignment,
  BodyText,
  ColorPalette,
  FontWeight,
  HeadingSize,
  OpacityRange,
  Range,
  SpacingLevel,
} from '../static/theme.types'
import { ValidateMclClass } from '../validator'

export const typeGroup = {
  colorType: [
    'BGCOLOR',
    'BEFOREBG',
    'AFTERBG',
    'HVBGCOLOR',
    'FCBGCOLOR',
    'ACTIVEBG',
    'TEXTCOLOR',
    'HVTEXTCOLOR',
    'FCTEXTCOLOR',
    'DISABLEDTEXTCOLOR',
    'SVGFILL',
    'RINGCOLOR',
    'FOCUSRING',
    'ACTIVERING',
    'OFFSETRING',
    'BTNCOLOR',
    'LISTCOLOR',
    'BORDER',
    'BORDERX',
    'BORDERY',
    'BORDERT',
    'BORDERB',
    'BORDERL',
    'BORDERR',
  ] as const,
  textType: ['BODYTEXT'] as const,
  fontWeightType: ['FONTWEIGHT'] as const,
  textAlignType: ['TEXTALIGN'] as const,
  headingSizeType: ['H1', 'H2', 'H3', 'H4'] as const,
  borderWidthType: [
    'BORDERW',
    'BORDERXW',
    'BORDERYW',
    'BORDERTW',
    'BORDERBW',
    'BORDERLW',
    'BORDERRW',
  ] as const,
  scaleType: ['BGOPACITY', 'OPACITY'] as const,
  spacingType: [
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
  ] as const,
}

const allType = [
  ...typeGroup.colorType,
  ...typeGroup.textType,
  ...typeGroup.fontWeightType,
  ...typeGroup.textAlignType,
  ...typeGroup.headingSizeType,
  ...typeGroup.borderWidthType,
  ...typeGroup.scaleType,
  ...typeGroup.spacingType,
] as const

export type ClassType = (typeof allType)[number]

type GroupTypes = typeof typeGroup
type ClassTypesMap = {
  [K in keyof GroupTypes]: (typeof typeGroup)[K][number]
}
export type ColorClassType = ClassTypesMap['colorType']
export type HeadingClassType = ClassTypesMap['headingSizeType']
export type TextClassType = ClassTypesMap['textType']
export type FontWeightClassType = ClassTypesMap['fontWeightType']
export type TextAlignmentClassType = ClassTypesMap['textAlignType']
export type BorderWidthClassType = ClassTypesMap['borderWidthType']
export type ScaleClassType = ClassTypesMap['scaleType']
export type SpacingClassType = ClassTypesMap['spacingType']

export type InputType<T extends ClassType> = T extends ColorClassType
  ? ColorPalette
  : T extends HeadingClassType
    ? HeadingSize
    : T extends TextClassType
      ? BodyText
      : T extends FontWeightClassType
        ? FontWeight
        : T extends TextAlignmentClassType
          ? Alignment
          : T extends BorderWidthClassType
            ? Range<1, 12>
            : T extends ScaleClassType
              ? OpacityRange
              : T extends SpacingClassType
                ? SpacingLevel
                : never

export class MclClass<T extends ClassType> {
  classType: T
  classValue: InputType<T>
  colorClass: MclColor
  headingSizeClass: MclHeadingSize
  borderWidthClass: MclBorderWidthClass
  opacityClass: MclOpacityClass
  spacingClass: MclSpacingClass
  textClass: MclText
  validator: ValidateMclClass<T>

  constructor(classType: T, classValue: InputType<T>) {
    this.classType = classType
    this.classValue = classValue
    this.colorClass = new MclColor()
    this.headingSizeClass = new MclHeadingSize()
    this.borderWidthClass = new MclBorderWidthClass()
    this.opacityClass = new MclOpacityClass()
    this.spacingClass = new MclSpacingClass()
    this.textClass = new MclText()
    this.validator = new ValidateMclClass(classType)
  }
  public generateClass(): string {
    switch (this.classType) {
      // case: color classes
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
      case 'FCTEXTCOLOR':
        return this.getFocusTextColorClass()
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
        return this.getListColorClass()
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
      // case: heading classes
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
      // case: border width classes
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
        return this.getBorderRightWidthClass()
      // case: opacity classes
      case 'OPACITY':
        return this.getOpacityClass()
      case 'BGOPACITY':
        return this.getBgOpacityClass()
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
  private getBgColorClass(): string {
    if (this.validator.validateColorType(this.classValue)) {
      return this.colorClass.bgColor[this.classValue]
    }
    return ' '
  }
  private getHoverBgColorClass(): string {
    if (this.validator.validateColorType(this.classValue)) {
      return this.colorClass.hoverBgColor[this.classValue]
    }
    return ' '
  }
  private getFocusBgColorClass(): string {
    if (this.validator.validateColorType(this.classValue)) {
      return this.colorClass.focusBgColor[this.classValue]
    }
    return ' '
  }
  private getBeforeBgColorClass(): string {
    if (this.validator.validateColorType(this.classValue)) {
      return this.colorClass.beforeBgColor[this.classValue]
    }
    return ' '
  }
  private getAfterBgColorClass(): string {
    if (this.validator.validateColorType(this.classValue)) {
      return this.colorClass.afterBgColor[this.classValue]
    }
    return ' '
  }
  private getActiveBgColorClass(): string {
    if (this.validator.validateColorType(this.classValue)) {
      return this.colorClass.bgActiveColor[this.classValue]
    }
    return ' '
  }
  // text color
  private getTextColorClass(): string {
    if (this.validator.validateColorType(this.classValue)) {
      return this.colorClass.textColor[this.classValue]
    }
    return ' '
  }
  private getHoverTextColorClass(): string {
    if (this.validator.validateColorType(this.classValue)) {
      return this.colorClass.hoverTextColor[this.classValue]
    }
    return ' '
  }
  private getFocusTextColorClass(): string {
    if (this.validator.validateColorType(this.classValue)) {
      return this.colorClass.focusTextColor[this.classValue]
    }
    return ' '
  }
  private getDisabledTextColorClass(): string {
    if (this.validator.validateColorType(this.classValue)) {
      return this.colorClass.disabledTextColor[this.classValue]
    }
    return ' '
  }
  // svg color
  private getSvgFillColorClass(): string {
    if (this.validator.validateColorType(this.classValue)) {
      return this.colorClass.svgFillColor[this.classValue]
    }
    return ' '
  }
  // ring color
  private getRingColorClass(): string {
    if (this.validator.validateColorType(this.classValue)) {
      return this.colorClass.ringColor[this.classValue]
    }
    return ' '
  }
  private getFocusRingColorClass(): string {
    if (this.validator.validateColorType(this.classValue)) {
      return this.colorClass.ringFocusColor[this.classValue]
    }
    return ' '
  }
  private getActiveRingColorClass(): string {
    if (this.validator.validateColorType(this.classValue)) {
      return this.colorClass.ringActiveColor[this.classValue]
    }
    return ' '
  }
  private getRingOffsetColorClass(): string {
    if (this.validator.validateColorType(this.classValue)) {
      return this.colorClass.ringOffsetColor[this.classValue]
    }
    return ' '
  }
  // btn & list
  private getBtnColorClass(): string {
    if (this.validator.validateColorType(this.classValue)) {
      return this.colorClass.btnColor[this.classValue]
    }
    return ' '
  }
  private getListColorClass(): string {
    if (this.validator.validateColorType(this.classValue)) {
      return this.colorClass.listColor[this.classValue]
    }
    return ' '
  }
  // border color
  private getBorderColorClass(): string {
    if (this.validator.validateColorType(this.classValue)) {
      return this.colorClass.borderColor[this.classValue]
    }
    return ' '
  }
  private getBorderXColorClass(): string {
    if (this.validator.validateColorType(this.classValue)) {
      return this.colorClass.borderXColor[this.classValue]
    }
    return ' '
  }
  private getBorderYColorClass(): string {
    if (this.validator.validateColorType(this.classValue)) {
      return this.colorClass.borderYColor[this.classValue]
    }
    return ' '
  }
  private getBorderTopColorClass(): string {
    if (this.validator.validateColorType(this.classValue)) {
      return this.colorClass.borderTopColor[this.classValue]
    }
    return ' '
  }
  private getBorderBottomColorClass(): string {
    if (this.validator.validateColorType(this.classValue)) {
      return this.colorClass.borderBottomColor[this.classValue]
    }
    return ' '
  }
  private getBorderLeftColorClass(): string {
    if (this.validator.validateColorType(this.classValue)) {
      return this.colorClass.borderLeftColor[this.classValue]
    }
    return ' '
  }
  private getBorderRightColorClass(): string {
    if (this.validator.validateColorType(this.classValue)) {
      return this.colorClass.borderRightColor[this.classValue]
    }
    return ' '
  }
  // handle heading classes
  private getH1Class(): string {
    if (this.validator.validateHeadingTextSizeType(this.classValue)) {
      return this.headingSizeClass.heading1[this.classValue]
    }
    return ' '
  }
  private getH2Class(): string {
    if (this.validator.validateHeadingTextSizeType(this.classValue)) {
      return this.headingSizeClass.heading2[this.classValue]
    }
    return ' '
  }
  private getH3Class(): string {
    if (this.validator.validateHeadingTextSizeType(this.classValue)) {
      return this.headingSizeClass.heading3[this.classValue]
    }
    return ' '
  }
  private getH4Class(): string {
    if (this.validator.validateHeadingTextSizeType(this.classValue)) {
      return this.headingSizeClass.heading4[this.classValue]
    }
    return ' '
  }
  // handle body text size classes
  private getBodyTextSizeClass(): string {
    if (this.validator.validateBodyTextSizeType(this.classValue)) {
      return this.textClass.bodyText[this.classValue]
    }
    return ' '
  }
  // handle font weight classes
  private getFontWeightClass(): string {
    if (this.validator.validateFontWeightType(this.classValue)) {
      return this.textClass.fontweight[this.classValue]
    }
    return ' '
  }
  // handle text align classes
  private getTextAlignClass(): string {
    if (this.validator.validateAlignment(this.classValue)) {
      return this.textClass.textAlign[this.classValue]
    }
    return ' '
  }
  // handle border width class
  private getBorderWidthClass(): string {
    if (this.validator.validateRangeType(this.classValue)) {
      return this.borderWidthClass.borderWidth[this.classValue]
    }
    return ' '
  }
  private getBorderXWidthClass(): string {
    if (this.validator.validateRangeType(this.classValue)) {
      return this.borderWidthClass.borderXWidth[this.classValue]
    }
    return ' '
  }
  private getBorderYWidthClass(): string {
    if (this.validator.validateRangeType(this.classValue)) {
      return this.borderWidthClass.borderYWidth[this.classValue]
    }
    return ' '
  }
  private getBorderTopWidthClass(): string {
    if (this.validator.validateRangeType(this.classValue)) {
      return this.borderWidthClass.borderTopWidth[this.classValue]
    }
    return ' '
  }
  private getBorderBottomWidthClass(): string {
    if (this.validator.validateRangeType(this.classValue)) {
      return this.borderWidthClass.borderBottomWidth[this.classValue]
    }
    return ' '
  }
  private getBorderLeftWidthClass(): string {
    if (this.validator.validateRangeType(this.classValue)) {
      return this.borderWidthClass.borderLeftWidth[this.classValue]
    }
    return ' '
  }
  private getBorderRightWidthClass(): string {
    if (this.validator.validateRangeType(this.classValue)) {
      return this.borderWidthClass.borderRightWidth[this.classValue]
    }
    return ' '
  }
  // handle opacity classes
  private getOpacityClass(): string {
    if (this.validator.validateOpacityType(this.classValue)) {
      return this.opacityClass.opacity[this.classValue]
    }
    return ' '
  }
  private getBgOpacityClass(): string {
    if (this.validator.validateOpacityType(this.classValue)) {
      return this.opacityClass.backgroundOpacity[this.classValue]
    }
    return ' '
  }
  // spacing classes
  // margins
  private getMarginClass(): string {
    if (this.validator.validateSpaceType(this.classValue)) {
      return this.spacingClass.margin[this.classValue]
    }
    return ' '
  }
  private getMarginXClass(): string {
    if (this.validator.validateSpaceType(this.classValue)) {
      return this.spacingClass.marginX[this.classValue]
    }
    return ' '
  }
  private getMarginYClass(): string {
    if (this.validator.validateSpaceType(this.classValue)) {
      return this.spacingClass.marginY[this.classValue]
    }
    return ' '
  }
  private getMarginTopClass(): string {
    if (this.validator.validateSpaceType(this.classValue)) {
      return this.spacingClass.marginTop[this.classValue]
    }
    return ' '
  }
  private getMarginBottomClass(): string {
    if (this.validator.validateSpaceType(this.classValue)) {
      return this.spacingClass.marginBottom[this.classValue]
    }
    return ' '
  }
  private getMarginLeftClass(): string {
    if (this.validator.validateSpaceType(this.classValue)) {
      return this.spacingClass.marginLeft[this.classValue]
    }
    return ' '
  }
  private getMarginRightClass(): string {
    if (this.validator.validateSpaceType(this.classValue)) {
      return this.spacingClass.marginRight[this.classValue]
    }
    return ' '
  }
  // paddings
  private getPaddingClass(): string {
    if (this.validator.validateSpaceType(this.classValue)) {
      return this.spacingClass.padding[this.classValue]
    }
    return ' '
  }
  private getPaddingXClass(): string {
    if (this.validator.validateSpaceType(this.classValue)) {
      return this.spacingClass.paddingX[this.classValue]
    }
    return ' '
  }
  private getPaddingYClass(): string {
    if (this.validator.validateSpaceType(this.classValue)) {
      return this.spacingClass.paddingY[this.classValue]
    }
    return ' '
  }
  private getPaddingTopClass(): string {
    if (this.validator.validateSpaceType(this.classValue)) {
      return this.spacingClass.paddingTop[this.classValue]
    }
    return ' '
  }
  private getPaddingBottomClass(): string {
    if (this.validator.validateSpaceType(this.classValue)) {
      return this.spacingClass.paddingBottom[this.classValue]
    }
    return ' '
  }
  private getPaddingLeftClass(): string {
    if (this.validator.validateSpaceType(this.classValue)) {
      return this.spacingClass.paddingLeft[this.classValue]
    }
    return ' '
  }
  private getPaddingRightClass(): string {
    if (this.validator.validateSpaceType(this.classValue)) {
      return this.spacingClass.paddingRight[this.classValue]
    }
    return ' '
  }
  // gaps
  private getGapClass(): string {
    if (this.validator.validateSpaceType(this.classValue)) {
      return this.spacingClass.gap[this.classValue]
    }
    return ' '
  }
}
