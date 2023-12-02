/**
 * @TailwindCSS - Good practice is to let all of used classes to be in full instead of generated dynamically using methods such as string literal.
 * @Interface - Classes for color, header text, body text, border color, border width(top, left).
 * @Export RDSTheme - an abstract class
 */
import type { ColorPalette, HeadingSize, BodyText, FontWeight, Range, OpacityRange, SpacingLevel, Alignment as Position } from './theme.types.js';
export type ColorClass = {
    [key in ColorPalette]: string;
};
export type HeaderSizeClass = {
    [key in HeadingSize]: string;
};
export type BodyTextClass = {
    [key in BodyText]: string;
};
export type FontWeightClass = {
    [key in FontWeight]: string;
};
export type BorderWidth = {
    [key in Range<1, 12>]: string;
};
export type Opacity = {
    [key in OpacityRange]: string;
};
export type Spacing = {
    [key in SpacingLevel]: string;
};
export type Alignment = {
    [key in Position]: string;
};
declare abstract class MCLTheme {
    protected static bgColor: ColorClass;
    protected static hoverBgColor: ColorClass;
    protected static focusBgColor: ColorClass;
    protected static beforeBgColor: ColorClass;
    protected static afterBgColor: ColorClass;
    protected static bgActiveColor: ColorClass;
    protected static textColor: ColorClass;
    protected static hoverTextColor: ColorClass;
    protected static disabledTextColor: ColorClass;
    protected static svgFillColor: ColorClass;
    protected static ringColor: ColorClass;
    protected static ringFocusColor: ColorClass;
    protected static ringActiveColor: ColorClass;
    protected static ringOffsetColor: ColorClass;
    protected static dummyColor: ColorClass;
    protected static btnColor: ColorClass;
    protected static listColor: ColorClass;
    protected static heading1: HeaderSizeClass;
    protected static heading2: HeaderSizeClass;
    protected static heading3: HeaderSizeClass;
    protected static heading4: HeaderSizeClass;
    protected static bodyText: BodyTextClass;
    protected static fontweight: FontWeightClass;
    protected static borderColor: ColorClass;
    protected static borderXColor: ColorClass;
    protected static borderYColor: ColorClass;
    protected static borderTopColor: ColorClass;
    protected static borderBottomColor: ColorClass;
    protected static borderLeftColor: ColorClass;
    protected static borderRightColor: ColorClass;
    protected static borderWidth: BorderWidth;
    protected static borderXWidth: BorderWidth;
    protected static borderYWidth: BorderWidth;
    protected static borderTopWidth: BorderWidth;
    protected static borderBottomWidth: BorderWidth;
    protected static borderLeftWidth: BorderWidth;
    protected static borderRightWidth: BorderWidth;
    protected static backgroundOpacity: Opacity;
    protected static opacity: Opacity;
    protected static margin: Spacing;
    protected static marginX: Spacing;
    protected static marginY: Spacing;
    protected static marginTop: Spacing;
    protected static marginBottom: Spacing;
    protected static marginLeft: Spacing;
    protected static marginRight: Spacing;
    protected static padding: Spacing;
    protected static paddingX: Spacing;
    protected static paddingY: Spacing;
    protected static paddingTop: Spacing;
    protected static paddingBottom: Spacing;
    protected static paddingLeft: Spacing;
    protected static paddingRight: Spacing;
    protected static gap: Spacing;
    protected static textAlign: Alignment;
}
export default MCLTheme;
