import type { ColorPalette, HeadingSize, HeadingLevel } from '@bobbykim/manguito-theme';
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
    showTitleHighlight: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    titleHighlightColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    fullWidth: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    bgImage: {
        type: import("vue").PropType<string>;
        required: true;
    };
    displayGradients: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    gradientColor: {
        type: import("vue").PropType<ColorPalette>;
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
    titleLevel: {
        type: import("vue").PropType<HeadingLevel>;
        default: string;
    };
    titleSize: {
        type: import("vue").PropType<HeadingSize>;
        default: string;
    };
    showTitleHighlight: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    titleHighlightColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    fullWidth: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    bgImage: {
        type: import("vue").PropType<string>;
        required: true;
    };
    displayGradients: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    gradientColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
}>>, {
    titleColor: ColorPalette;
    titleLevel: HeadingLevel;
    titleSize: HeadingSize;
    showTitleHighlight: boolean;
    titleHighlightColor: ColorPalette;
    fullWidth: boolean;
    displayGradients: boolean;
    gradientColor: ColorPalette;
}, {}>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
