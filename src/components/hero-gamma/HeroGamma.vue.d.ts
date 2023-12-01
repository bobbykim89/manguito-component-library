import type { HeadingSize, HeadingLevel, ColorPalette, BodyText } from '@bobbykim/manguito-theme';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    title: {
        type: import("vue").PropType<string>;
        required: true;
    };
    titleColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    titleLevel: {
        type: import("vue").PropType<HeadingLevel>;
        default: string;
    };
    titleSize: {
        type: import("vue").PropType<HeadingSize>;
        default: string;
    };
    displayTitleShadow: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    displayHighlight: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    highlightColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    imageSource: {
        type: import("vue").PropType<string>;
        required: true;
    };
    displayGradient: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    gradientColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    displayLabel: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    labelText: {
        type: import("vue").PropType<string>;
    };
    labelTextSize: {
        type: import("vue").PropType<BodyText>;
        default: string;
    };
    labelTextColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    labelBgColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    displaySlot: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: import("vue").PropType<string>;
        required: true;
    };
    titleColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    titleLevel: {
        type: import("vue").PropType<HeadingLevel>;
        default: string;
    };
    titleSize: {
        type: import("vue").PropType<HeadingSize>;
        default: string;
    };
    displayTitleShadow: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    displayHighlight: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    highlightColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    imageSource: {
        type: import("vue").PropType<string>;
        required: true;
    };
    displayGradient: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    gradientColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    displayLabel: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    labelText: {
        type: import("vue").PropType<string>;
    };
    labelTextSize: {
        type: import("vue").PropType<BodyText>;
        default: string;
    };
    labelTextColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    labelBgColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    displaySlot: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
}>>, {
    titleColor: ColorPalette;
    titleLevel: HeadingLevel;
    titleSize: HeadingSize;
    displayTitleShadow: boolean;
    displayHighlight: boolean;
    highlightColor: ColorPalette;
    displayGradient: boolean;
    gradientColor: ColorPalette;
    displayLabel: boolean;
    labelTextSize: BodyText;
    labelTextColor: ColorPalette;
    labelBgColor: ColorPalette;
    displaySlot: boolean;
}, {}>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
