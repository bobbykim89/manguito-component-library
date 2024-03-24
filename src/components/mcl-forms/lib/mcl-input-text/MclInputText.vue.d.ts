import type { ColorPalette, InputType } from '@bobbykim/manguito-theme';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    id: string;
    displayBorder?: boolean | undefined;
    borderColor?: ColorPalette | undefined;
    rounded?: boolean | undefined;
    displayHighlight?: boolean | undefined;
    highlightColor?: ColorPalette | undefined;
    textcolor?: ColorPalette | undefined;
    bgColor?: ColorPalette | undefined;
    placeholder?: string | undefined;
    type?: InputType | undefined;
    displayShadow?: boolean | undefined;
    required?: boolean | undefined;
    modelValue?: string | undefined;
    invalidFeedback?: string | undefined;
    minLength?: number | undefined;
    maxLength?: number | undefined;
    pattern?: string | undefined;
}>, {
    displayBorder: boolean;
    borderColor: string;
    rounded: boolean;
    displayHighlight: boolean;
    highlightColor: string;
    textcolor: string;
    bgColor: string;
    placeholder: string;
    type: string;
    displayShadow: boolean;
    required: boolean;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    id: string;
    displayBorder?: boolean | undefined;
    borderColor?: ColorPalette | undefined;
    rounded?: boolean | undefined;
    displayHighlight?: boolean | undefined;
    highlightColor?: ColorPalette | undefined;
    textcolor?: ColorPalette | undefined;
    bgColor?: ColorPalette | undefined;
    placeholder?: string | undefined;
    type?: InputType | undefined;
    displayShadow?: boolean | undefined;
    required?: boolean | undefined;
    modelValue?: string | undefined;
    invalidFeedback?: string | undefined;
    minLength?: number | undefined;
    maxLength?: number | undefined;
    pattern?: string | undefined;
}>, {
    displayBorder: boolean;
    borderColor: string;
    rounded: boolean;
    displayHighlight: boolean;
    highlightColor: string;
    textcolor: string;
    bgColor: string;
    placeholder: string;
    type: string;
    displayShadow: boolean;
    required: boolean;
}>>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    type: InputType;
    required: boolean;
    placeholder: string;
    displayBorder: boolean;
    bgColor: ColorPalette;
    rounded: boolean;
    borderColor: ColorPalette;
    displayShadow: boolean;
    displayHighlight: boolean;
    highlightColor: ColorPalette;
    textcolor: ColorPalette;
}, {}>, {
    "invalid-feedback"?(_: {}): any;
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
