import type { ColorPalette } from '@bobbykim/manguito-theme';
declare const _default: import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    id: string;
    displayBorder?: boolean | undefined;
    borderColor?: ColorPalette | undefined;
    rounded?: boolean | undefined;
    bgColor?: ColorPalette | undefined;
    buttonText?: string | undefined;
    buttonTextColor?: ColorPalette | undefined;
    buttonColor?: ColorPalette | undefined;
    displayShadow?: boolean | undefined;
    textColor?: ColorPalette | undefined;
    displayClear?: boolean | undefined;
    isRequired?: boolean | undefined;
    accept?: string | undefined;
    modelValue?: File | undefined;
}>, {
    displayBorder: boolean;
    borderColor: string;
    rounded: boolean;
    bgColor: string;
    buttonText: string;
    buttonTextColor: string;
    buttonColor: string;
    displayShadow: boolean;
    textColor: string;
    displayClear: boolean;
    isRequired: boolean;
    accept: string;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    id: string;
    displayBorder?: boolean | undefined;
    borderColor?: ColorPalette | undefined;
    rounded?: boolean | undefined;
    bgColor?: ColorPalette | undefined;
    buttonText?: string | undefined;
    buttonTextColor?: ColorPalette | undefined;
    buttonColor?: ColorPalette | undefined;
    displayShadow?: boolean | undefined;
    textColor?: ColorPalette | undefined;
    displayClear?: boolean | undefined;
    isRequired?: boolean | undefined;
    accept?: string | undefined;
    modelValue?: File | undefined;
}>, {
    displayBorder: boolean;
    borderColor: string;
    rounded: boolean;
    bgColor: string;
    buttonText: string;
    buttonTextColor: string;
    buttonColor: string;
    displayShadow: boolean;
    textColor: string;
    displayClear: boolean;
    isRequired: boolean;
    accept: string;
}>>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    textColor: ColorPalette;
    accept: string;
    displayBorder: boolean;
    bgColor: ColorPalette;
    rounded: boolean;
    borderColor: ColorPalette;
    buttonText: string;
    buttonTextColor: ColorPalette;
    buttonColor: ColorPalette;
    displayShadow: boolean;
    displayClear: boolean;
    isRequired: boolean;
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
