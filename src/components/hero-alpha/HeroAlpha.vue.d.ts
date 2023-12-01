import type { HeadingLevel, HeadingSize, ColorPalette, DirectionX, OpacityRange } from '@bobbykim/manguito-theme';
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
    displaySubTitle: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    subTitle: {
        type: import("vue").PropType<string>;
    };
    subTitleLevel: {
        type: import("vue").PropType<HeadingLevel>;
        default: string;
    };
    subTitleSize: {
        type: import("vue").PropType<HeadingSize>;
        default: string;
    };
    subTitleColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    displayHighlight: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    highlightColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    bgImage: {
        type: import("vue").PropType<string>;
        required: true;
    };
    bgColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    mobileImageBlur: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    imgPosition: {
        type: import("vue").PropType<DirectionX>;
        default: string;
    };
    displayFilter: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    filterOpacity: {
        type: import("vue").PropType<OpacityRange>;
        default: number;
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
    displaySubTitle: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    subTitle: {
        type: import("vue").PropType<string>;
    };
    subTitleLevel: {
        type: import("vue").PropType<HeadingLevel>;
        default: string;
    };
    subTitleSize: {
        type: import("vue").PropType<HeadingSize>;
        default: string;
    };
    subTitleColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    displayHighlight: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    highlightColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    bgImage: {
        type: import("vue").PropType<string>;
        required: true;
    };
    bgColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    mobileImageBlur: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    imgPosition: {
        type: import("vue").PropType<DirectionX>;
        default: string;
    };
    displayFilter: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    filterOpacity: {
        type: import("vue").PropType<OpacityRange>;
        default: number;
    };
}>>, {
    titleColor: ColorPalette;
    titleLevel: HeadingLevel;
    titleSize: HeadingSize;
    displaySubTitle: boolean;
    subTitleLevel: HeadingLevel;
    subTitleSize: HeadingSize;
    subTitleColor: ColorPalette;
    displayHighlight: boolean;
    highlightColor: ColorPalette;
    bgColor: ColorPalette;
    mobileImageBlur: boolean;
    imgPosition: DirectionX;
    displayFilter: boolean;
    filterOpacity: OpacityRange;
}, {}>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
