import MCLTheme from './theme.js';
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
];
export const textType = [
    'H1',
    'H2',
    'H3',
    'H4',
    'BODYTEXT',
    'FONTWEIGHT',
    'TEXTALIGN',
];
export const borderWidthType = [
    'BORDERW',
    'BORDERXW',
    'BORDERYW',
    'BORDERTW',
    'BORDERBW',
    'BORDERLW',
    'BORDERRW',
];
export const scaleType = ['BGOPACITY', 'OPACITY'];
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
];
const allType = [
    ...colorType,
    ...textType,
    ...borderWidthType,
    ...scaleType,
    ...spacingType,
];
class GenerateMCLClass extends MCLTheme {
    classType;
    classValue;
    constructor(classType, classValue) {
        super();
        this.classType = classType;
        this.classValue = classValue;
    }
    // handle color classes types
    generateColorClass() {
        switch (this.classType) {
            case 'BGCOLOR':
                return this.getBgColorClass();
            case 'HVBGCOLOR':
                return this.getHoverBgColorClass();
            case 'FCBGCOLOR':
                return this.getFocusBgColorClass();
            case 'BEFOREBG':
                return this.getBeforeBgColorClass();
            case 'AFTERBG':
                return this.getAfterBgColorClass();
            case 'ACTIVEBG':
                return this.getActiveBgColorClass();
            case 'TEXTCOLOR':
                return this.getTextColorClass();
            case 'HVTEXTCOLOR':
                return this.getHoverTextColorClass();
            case 'DISABLEDTEXTCOLOR':
                return this.getDisabledTextColorClass();
            case 'SVGFILL':
                return this.getSvgFillColorClass();
            case 'RINGCOLOR':
                return this.getRingColorClass();
            case 'FOCUSRING':
                return this.getFocusRingColorClass();
            case 'ACTIVERING':
                return this.getActiveRingColorClass();
            case 'OFFSETRING':
                return this.getRingOffsetColorClass();
            case 'BTNCOLOR':
                return this.getBtnColorClass();
            case 'LISTCOLOR':
                return this.getRingColorClass();
            case 'BORDER':
                return this.getBorderColorClass();
            case 'BORDERX':
                return this.getBorderXColorClass();
            case 'BORDERY':
                return this.getBorderYColorClass();
            case 'BORDERT':
                return this.getBorderTopColorClass();
            case 'BORDERB':
                return this.getBorderBottomColorClass();
            case 'BORDERL':
                return this.getBorderLeftColorClass();
            case 'BORDERR':
                return this.getBorderRightColorClass();
            default:
                return ' ';
        }
    }
    // handle text class types
    generateTextClass() {
        switch (this.classType) {
            // case: heading text class
            case 'H1':
                return this.getH1Class();
            case 'H2':
                return this.getH2Class();
            case 'H3':
                return this.getH3Class();
            case 'H4':
                return this.getH4Class();
            // case: body text class
            case 'BODYTEXT':
                return this.getBodyTextSizeClass();
            // case: font weight class
            case 'FONTWEIGHT':
                return this.getFontWeightClass();
            // case: text alignment class
            case 'TEXTALIGN':
                return this.getTextAlignClass();
            default:
                return ' ';
        }
    }
    // handle border width class types
    generateBorderWidthClass() {
        switch (this.classType) {
            // case: border width class
            case 'BORDERW':
                return this.getBorderWidthClass();
            case 'BORDERXW':
                return this.getBorderXWidthClass();
            case 'BORDERYW':
                return this.getBorderYWidthClass();
            case 'BORDERTW':
                return this.getBorderTopWidthClass();
            case 'BORDERBW':
                return this.getBorderBottomWidthClass();
            case 'BORDERLW':
                return this.getBorderLeftWidthClass();
            case 'BORDERRW':
                return this.getBorderWidthClass();
            default:
                return ' ';
        }
    }
    generateScaleClass() {
        switch (this.classType) {
            // case: opacity class
            case 'OPACITY':
                return this.getOpacityClass();
            case 'BGOPACITY':
                return this.getBgOpacityClass();
            default:
                return ' ';
        }
    }
    generateSpacingClass() {
        switch (this.classType) {
            // case: margins
            case 'MARGIN':
                return this.getMarginClass();
            case 'MARGINX':
                return this.getMarginXClass();
            case 'MARGINY':
                return this.getMarginYClass();
            case 'MARGINT':
                return this.getMarginTopClass();
            case 'MARGINB':
                return this.getMarginBottomClass();
            case 'MARGINL':
                return this.getMarginLeftClass();
            case 'MARGINR':
                return this.getMarginRightClass();
            // case: paddings
            case 'PADDING':
                return this.getPaddingClass();
            case 'PADDINGX':
                return this.getPaddingXClass();
            case 'PADDINGY':
                return this.getPaddingYClass();
            case 'PADDINGT':
                return this.getPaddingTopClass();
            case 'PADDINGB':
                return this.getPaddingBottomClass();
            case 'PADDINGL':
                return this.getPaddingLeftClass();
            case 'PADDINGR':
                return this.getPaddingRightClass();
            // case: gap
            case 'GAP':
                return this.getGapClass();
            default:
                return ' ';
        }
    }
    // handle color class
    // bg color
    getBgColorClass() {
        if (!this.validateColorType) {
            return ' ';
        }
        return MCLTheme.bgColor[this.classValue];
    }
    getHoverBgColorClass() {
        if (!this.validateColorType) {
            return ' ';
        }
        return MCLTheme.hoverBgColor[this.classValue];
    }
    getFocusBgColorClass() {
        if (!this.validateColorType) {
            return ' ';
        }
        return MCLTheme.focusBgColor[this.classValue];
    }
    getBeforeBgColorClass() {
        if (!this.validateColorType) {
            return ' ';
        }
        return MCLTheme.beforeBgColor[this.classValue];
    }
    getAfterBgColorClass() {
        if (!this.validateColorType) {
            return ' ';
        }
        return MCLTheme.afterBgColor[this.classValue];
    }
    getActiveBgColorClass() {
        if (!this.validateColorType) {
            return ' ';
        }
        return MCLTheme.bgActiveColor[this.classValue];
    }
    // text color
    getTextColorClass() {
        if (!this.validateColorType) {
            return ' ';
        }
        return MCLTheme.textColor[this.classValue];
    }
    getHoverTextColorClass() {
        if (!this.validateColorType) {
            return ' ';
        }
        return MCLTheme.hoverTextColor[this.classValue];
    }
    getDisabledTextColorClass() {
        if (!this.validateColorType) {
            return ' ';
        }
        return MCLTheme.disabledTextColor[this.classValue];
    }
    // svg color
    getSvgFillColorClass() {
        if (!this.validateColorType) {
            return ' ';
        }
        return MCLTheme.svgFillColor[this.classValue];
    }
    // ring color
    getRingColorClass() {
        if (!this.validateColorType) {
            return ' ';
        }
        return MCLTheme.ringColor[this.classValue];
    }
    getFocusRingColorClass() {
        if (!this.validateColorType) {
            return ' ';
        }
        return MCLTheme.ringFocusColor[this.classValue];
    }
    getActiveRingColorClass() {
        if (!this.validateColorType) {
            return ' ';
        }
        return MCLTheme.ringActiveColor[this.classValue];
    }
    getRingOffsetColorClass() {
        if (!this.validateColorType) {
            return ' ';
        }
        return MCLTheme.ringOffsetColor[this.classValue];
    }
    // btn & list
    getBtnColorClass() {
        if (!this.validateColorType) {
            return ' ';
        }
        return MCLTheme.btnColor[this.classValue];
    }
    getListColorClass() {
        if (!this.validateColorType) {
            return ' ';
        }
        return MCLTheme.listColor[this.classValue];
    }
    // border color
    getBorderColorClass() {
        if (!this.validateColorType) {
            return ' ';
        }
        return MCLTheme.borderColor[this.classValue];
    }
    getBorderXColorClass() {
        if (!this.validateColorType) {
            return ' ';
        }
        return MCLTheme.borderXColor[this.classValue];
    }
    getBorderYColorClass() {
        if (!this.validateColorType) {
            return ' ';
        }
        return MCLTheme.borderYColor[this.classValue];
    }
    getBorderTopColorClass() {
        if (!this.validateColorType) {
            return ' ';
        }
        return MCLTheme.borderTopColor[this.classValue];
    }
    getBorderBottomColorClass() {
        if (!this.validateColorType) {
            return ' ';
        }
        return MCLTheme.borderBottomColor[this.classValue];
    }
    getBorderLeftColorClass() {
        if (!this.validateColorType) {
            return ' ';
        }
        return MCLTheme.borderLeftColor[this.classValue];
    }
    getBorderRightColorClass() {
        if (!this.validateColorType) {
            return ' ';
        }
        return MCLTheme.borderRightColor[this.classValue];
    }
    // handle heading classes
    getH1Class() {
        if (!this.validateHeadingTextSizeType) {
            return ' ';
        }
        return MCLTheme.heading1[this.classValue];
    }
    getH2Class() {
        if (!this.validateHeadingTextSizeType) {
            return ' ';
        }
        return MCLTheme.heading2[this.classValue];
    }
    getH3Class() {
        if (!this.validateHeadingTextSizeType) {
            return ' ';
        }
        return MCLTheme.heading3[this.classValue];
    }
    getH4Class() {
        if (!this.validateHeadingTextSizeType) {
            return ' ';
        }
        return MCLTheme.heading4[this.classValue];
    }
    // handle body text size classes
    getBodyTextSizeClass() {
        if (!this.validateBodyTextSizeType) {
            return ' ';
        }
        return MCLTheme.bodyText[this.classValue];
    }
    // handle font weight classes
    getFontWeightClass() {
        if (!this.validateFontWeightType) {
            return ' ';
        }
        return MCLTheme.fontweight[this.classValue];
    }
    // handle text align classes
    getTextAlignClass() {
        return MCLTheme.textAlign[this.classValue];
    }
    // handle border width classes
    getBorderWidthClass() {
        if (!this.validateRangeType) {
            return ' ';
        }
        return MCLTheme.borderWidth[this.classValue];
    }
    getBorderXWidthClass() {
        if (!this.validateRangeType) {
            return ' ';
        }
        return MCLTheme.borderXWidth[this.classValue];
    }
    getBorderYWidthClass() {
        if (!this.validateRangeType) {
            return ' ';
        }
        return MCLTheme.borderYWidth[this.classValue];
    }
    getBorderTopWidthClass() {
        if (!this.validateRangeType) {
            return ' ';
        }
        return MCLTheme.borderTopWidth[this.classValue];
    }
    getBorderBottomWidthClass() {
        if (!this.validateRangeType) {
            return ' ';
        }
        return MCLTheme.borderBottomWidth[this.classValue];
    }
    getBorderLeftWidthClass() {
        if (!this.validateRangeType) {
            return ' ';
        }
        return MCLTheme.borderLeftWidth[this.classValue];
    }
    getBorderRightWidthClass() {
        if (!this.validateRangeType) {
            return ' ';
        }
        return MCLTheme.borderRightWidth[this.classValue];
    }
    // handle opacity classes
    getOpacityClass() {
        if (!this.validateOpacityType) {
            return ' ';
        }
        return MCLTheme.opacity[this.classValue];
    }
    getBgOpacityClass() {
        if (!this.validateOpacityType) {
            return ' ';
        }
        return MCLTheme.backgroundOpacity[this.classValue];
    }
    // handle spacing classes
    // margins
    getMarginClass() {
        if (!this.validateSpaceType) {
            return ' ';
        }
        return MCLTheme.margin[this.classValue];
    }
    getMarginXClass() {
        if (!this.validateSpaceType) {
            return ' ';
        }
        return MCLTheme.marginX[this.classValue];
    }
    getMarginYClass() {
        if (!this.validateSpaceType) {
            return ' ';
        }
        return MCLTheme.marginY[this.classValue];
    }
    getMarginTopClass() {
        if (!this.validateSpaceType) {
            return ' ';
        }
        return MCLTheme.marginTop[this.classValue];
    }
    getMarginBottomClass() {
        if (!this.validateSpaceType) {
            return ' ';
        }
        return MCLTheme.marginBottom[this.classValue];
    }
    getMarginLeftClass() {
        if (!this.validateSpaceType) {
            return ' ';
        }
        return MCLTheme.marginLeft[this.classValue];
    }
    getMarginRightClass() {
        if (!this.validateSpaceType) {
            return ' ';
        }
        return MCLTheme.marginRight[this.classValue];
    }
    // padding
    getPaddingClass() {
        if (!this.validateSpaceType) {
            return ' ';
        }
        return MCLTheme.padding[this.classValue];
    }
    getPaddingXClass() {
        if (!this.validateSpaceType) {
            return ' ';
        }
        return MCLTheme.paddingX[this.classValue];
    }
    getPaddingYClass() {
        if (!this.validateSpaceType) {
            return ' ';
        }
        return MCLTheme.paddingY[this.classValue];
    }
    getPaddingTopClass() {
        if (!this.validateSpaceType) {
            return ' ';
        }
        return MCLTheme.paddingTop[this.classValue];
    }
    getPaddingBottomClass() {
        if (!this.validateSpaceType) {
            return ' ';
        }
        return MCLTheme.paddingBottom[this.classValue];
    }
    getPaddingLeftClass() {
        if (!this.validateSpaceType) {
            return ' ';
        }
        return MCLTheme.paddingLeft[this.classValue];
    }
    getPaddingRightClass() {
        if (!this.validateSpaceType) {
            return ' ';
        }
        return MCLTheme.paddingRight[this.classValue];
    }
    // gap
    getGapClass() {
        if (!this.validateSpaceType) {
            return ' ';
        }
        return MCLTheme.gap[this.classValue];
    }
    // input validation
    validateColorType() {
        const validatorRe = /(primary|secondary|success|info|warning|danger|light-1|light-2|light-3|light-4|dark-1|dark-2|dark-3|dark-4|black|white|transparent)/;
        if (typeof this.classValue !== 'string') {
            return false;
        }
        return validatorRe.test(this.classValue);
    }
    validateSpaceType() {
        const validatorRe = /(0|3xs|2xs|xs|sm|md|lg|xl|2xl|3xl)/;
        if (typeof this.classValue !== 'string') {
            return false;
        }
        return validatorRe.test(this.classValue);
    }
    validateHeadingTextSizeType() {
        const validatorRe = /(sm|md|lg|xl)/;
        if (typeof this.classValue !== 'string') {
            return false;
        }
        return validatorRe.test(this.classValue);
    }
    validateBodyTextSizeType() {
        const validatorRe = /(xs|sm|md|lg|xl)/;
        if (typeof this.classValue !== 'string') {
            return false;
        }
        return validatorRe.test(this.classValue);
    }
    validateFontWeightType() {
        const validatorRe = /(light|normal|bold)/;
        if (typeof this.classValue !== 'string') {
            return false;
        }
        return validatorRe.test(this.classValue);
    }
    validateOpacityType() {
        const validatorRe = /\b(0|[1-9]0|100)\b/;
        if (typeof this.classValue !== 'number') {
            return false;
        }
        return validatorRe.test(this.classValue.toString());
    }
    validateRangeType() {
        const validatorRe = /\b([1-9]|1[0-2])\b/;
        if (typeof this.classValue !== 'number') {
            return false;
        }
        return validatorRe.test(this.classValue.toString());
    }
    validateAlignment() {
        const validatorRe = /(left|center|right)/;
        if (typeof this.classValue !== 'string') {
            return false;
        }
        return validatorRe.test(this.classValue);
    }
    dummyMethod() {
        return this.getRingOffsetColorClass();
    }
}
export default GenerateMCLClass;
//# sourceMappingURL=index.js.map