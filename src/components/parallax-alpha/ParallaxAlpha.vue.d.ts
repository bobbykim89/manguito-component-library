import type { ColorPalette, HeadingLevel, HeadingSize } from '@bobbykim/manguito-theme';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    title: {
        type: import("vue").PropType<string>;
        required: true;
    };
    titleColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    sectionBgColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    containerBgColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    bgImage: {
        type: import("vue").PropType<string>;
        required: true;
    };
    imgHeightSm: {
        type: import("vue").PropType<number>;
        default: number;
    };
    imgHeightLg: {
        type: import("vue").PropType<number>;
        default: number;
    };
    titleLevel: {
        type: import("vue").PropType<HeadingLevel>;
        default: string;
    };
    titleSize: {
        type: import("vue").PropType<HeadingSize>;
        default: string;
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
    sectionBgColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    containerBgColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    bgImage: {
        type: import("vue").PropType<string>;
        required: true;
    };
    imgHeightSm: {
        type: import("vue").PropType<number>;
        default: number;
    };
    imgHeightLg: {
        type: import("vue").PropType<number>;
        default: number;
    };
    titleLevel: {
        type: import("vue").PropType<HeadingLevel>;
        default: string;
    };
    titleSize: {
        type: import("vue").PropType<HeadingSize>;
        default: string;
    };
}>>, {
    titleColor: ColorPalette;
    sectionBgColor: ColorPalette;
    containerBgColor: ColorPalette;
    imgHeightSm: number;
    imgHeightLg: number;
    titleLevel: HeadingLevel;
    titleSize: HeadingSize;
}, {}>, {
    content?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
