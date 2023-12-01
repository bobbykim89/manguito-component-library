import type { ColorPalette, HeadingSize } from '@bobbykim/manguito-theme';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    title: {
        type: import("vue").PropType<string>;
        required: true;
    };
    visible: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    accordion: {
        type: import("vue").PropType<string>;
    };
    titleColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    collapseId: {
        type: import("vue").PropType<string>;
        required: true;
    };
    titleSize: {
        type: import("vue").PropType<HeadingSize>;
        default: string;
    };
    borderColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    bgColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    btnColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    iconColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    rounded: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    displayShadow: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "accordion-open": (...args: any[]) => void;
    "accordion-close": (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: import("vue").PropType<string>;
        required: true;
    };
    visible: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    accordion: {
        type: import("vue").PropType<string>;
    };
    titleColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    collapseId: {
        type: import("vue").PropType<string>;
        required: true;
    };
    titleSize: {
        type: import("vue").PropType<HeadingSize>;
        default: string;
    };
    borderColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    bgColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    btnColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    iconColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    rounded: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    displayShadow: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
}>> & {
    "onAccordion-open"?: ((...args: any[]) => any) | undefined;
    "onAccordion-close"?: ((...args: any[]) => any) | undefined;
}, {
    visible: boolean;
    titleColor: ColorPalette;
    titleSize: HeadingSize;
    borderColor: ColorPalette;
    bgColor: ColorPalette;
    btnColor: ColorPalette;
    iconColor: ColorPalette;
    rounded: boolean;
    displayShadow: boolean;
}, {}>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
