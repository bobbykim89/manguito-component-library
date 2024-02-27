import type { ColorPalette } from '@bobbykim/manguito-theme';
declare const _default: import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    id: string;
    displayBorder?: boolean | undefined;
    borderColor?: ColorPalette | undefined;
    rounded?: boolean | undefined;
    displayHighlight?: boolean | undefined;
    highlightColor?: ColorPalette | undefined;
    bgColor?: ColorPalette | undefined;
    textcolor?: ColorPalette | undefined;
    placeholder?: string | undefined;
    displayShadow?: boolean | undefined;
    required?: boolean | undefined;
    rows?: number | undefined;
    modelValue?: string | undefined;
}>, {
    displayBorder: boolean;
    borderColor: string;
    rounded: boolean;
    displayHighlight: boolean;
    highlightColor: string;
    bgColor: string;
    textcolor: string;
    placeholder: string;
    displayShadow: boolean;
    required: boolean;
    rows: number;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    id: string;
    displayBorder?: boolean | undefined;
    borderColor?: ColorPalette | undefined;
    rounded?: boolean | undefined;
    displayHighlight?: boolean | undefined;
    highlightColor?: ColorPalette | undefined;
    bgColor?: ColorPalette | undefined;
    textcolor?: ColorPalette | undefined;
    placeholder?: string | undefined;
    displayShadow?: boolean | undefined;
    required?: boolean | undefined;
    rows?: number | undefined;
    modelValue?: string | undefined;
}>, {
    displayBorder: boolean;
    borderColor: string;
    rounded: boolean;
    displayHighlight: boolean;
    highlightColor: string;
    bgColor: string;
    textcolor: string;
    placeholder: string;
    displayShadow: boolean;
    required: boolean;
    rows: number;
}>>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    required: boolean;
    placeholder: string;
    displayBorder: boolean;
    rounded: boolean;
    borderColor: ColorPalette;
    bgColor: ColorPalette;
    displayShadow: boolean;
    displayHighlight: boolean;
    highlightColor: ColorPalette;
    textcolor: ColorPalette;
    rows: number;
}, {}>;
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
