import type { ColorPalette, HeadingSize } from '@bobbykim/manguito-theme';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    displayHeader?: boolean | undefined;
    headerText?: string | undefined;
    headerSize?: HeadingSize | undefined;
    headerColor?: ColorPalette | undefined;
    backdropColor?: ColorPalette | undefined;
    bgColor?: ColorPalette | undefined;
    rounded?: boolean | undefined;
    displayShadow?: boolean | undefined;
    modelValue?: boolean | undefined;
}>, {
    displayHeader: boolean;
    headerSize: string;
    headerColor: string;
    backdropColor: string;
    bgColor: string;
    rounded: boolean;
    displayShadow: boolean;
    modelValue: boolean;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    "modal-close": (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    displayHeader?: boolean | undefined;
    headerText?: string | undefined;
    headerSize?: HeadingSize | undefined;
    headerColor?: ColorPalette | undefined;
    backdropColor?: ColorPalette | undefined;
    bgColor?: ColorPalette | undefined;
    rounded?: boolean | undefined;
    displayShadow?: boolean | undefined;
    modelValue?: boolean | undefined;
}>, {
    displayHeader: boolean;
    headerSize: string;
    headerColor: string;
    backdropColor: string;
    bgColor: string;
    rounded: boolean;
    displayShadow: boolean;
    modelValue: boolean;
}>>> & {
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
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
