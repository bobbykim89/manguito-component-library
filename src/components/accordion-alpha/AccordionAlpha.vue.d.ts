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
    borderColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    rounded: {
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
    titleSize: {
        type: import("vue").PropType<HeadingSize>;
        default: string;
    };
    iconColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    bgColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    slotBgColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
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
    borderColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    rounded: {
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
    titleSize: {
        type: import("vue").PropType<HeadingSize>;
        default: string;
    };
    iconColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    bgColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    slotBgColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
}>> & {
    "onAccordion-open"?: ((...args: any[]) => any) | undefined;
    "onAccordion-close"?: ((...args: any[]) => any) | undefined;
}, {
    visible: boolean;
    titleColor: ColorPalette;
    borderColor: ColorPalette;
    rounded: boolean;
    displayHighlight: boolean;
    highlightColor: ColorPalette;
    titleSize: HeadingSize;
    iconColor: ColorPalette;
    bgColor: ColorPalette;
    slotBgColor: ColorPalette;
}, {}>, {
    tab?(_: {}): any;
    content?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
