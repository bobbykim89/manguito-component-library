import type { ColorPalette, HeadingSize } from '@bobbykim/manguito-theme';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    backdropColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    displayHeader: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    headerText: {
        type: import("vue").PropType<string>;
    };
    headerSize: {
        type: import("vue").PropType<HeadingSize>;
        default: string;
    };
    headerColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    bgColor: {
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
    modelValue: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    "modal-close": (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    backdropColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    displayHeader: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    headerText: {
        type: import("vue").PropType<string>;
    };
    headerSize: {
        type: import("vue").PropType<HeadingSize>;
        default: string;
    };
    headerColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    bgColor: {
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
    modelValue: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onModal-close"?: ((...args: any[]) => any) | undefined;
}, {
    backdropColor: ColorPalette;
    displayHeader: boolean;
    headerSize: HeadingSize;
    headerColor: ColorPalette;
    bgColor: ColorPalette;
    rounded: boolean;
    displayShadow: boolean;
    modelValue: boolean;
}, {}>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
